import type { ConversationEvent } from '../core/behavior';
import type { CommandResult } from '../core/commands';
import { Emitter } from '../core/emitter';
import type { InterruptMode, Transcript, VoiceErrorCode, VoiceSession, VoiceStatus } from '../core/voice';
import { AudioPlayer, type VoiceTone } from './AudioPlayer';
import { base64ToBytes, bytesToBase64, pcm16ToFloat32, rateFromMime } from './pcm';

export interface GeminiLiveOptions {
  /** Token server base URL (Cloudflare Worker). */
  apiBase: string;
  /** Invite code checked by the token server. */
  accessCode: string;
  interruptMode: InterruptMode;
  /** Prebuilt voice name; the server only accepts voices on its allow-list. */
  voice?: string;
  /** Playback colouring (elder / child / none). */
  tone: VoiceTone;
  /** Which persona the server should use. */
  character: string;
  /** Hidden first user turn that makes the character greet the player. */
  greeting: string;
  /** Carries out a command the model called (move, gesture…); the result goes back to the model. */
  onCommand?(name: string, args: unknown): CommandResult;
}

interface TokenResponse {
  token: string;
  model: string;
  wsUrl: string;
}

/** Replies longer than this are shown as storytelling (gestures, livelier face). */
const STORY_AFTER_SECONDS = 8;
/** Local voice-activity thresholds, only used for the "listening" animation. */
const VAD_ON = 0.02;
const VAD_ON_CHUNKS = 3;
const VAD_OFF_MS = 700;
const MAX_RECONNECTS = 3;

type Events = {
  event: ConversationEvent;
  status: VoiceStatus;
  transcript: Transcript;
};

class VoiceError extends Error {
  constructor(readonly code: VoiceErrorCode) {
    super(code);
  }
}

/**
 * Gemini Live API (free tier) over a raw WebSocket using a single-use
 * ephemeral token from our server. Mic → 16 kHz PCM; voice ← 24 kHz PCM.
 * Turn-taking and barge-in use Gemini's server-side voice activity detection.
 */
export class GeminiLiveSession implements VoiceSession {
  private readonly emitter = new Emitter<Events>();
  private ctx: AudioContext | null = null;
  private player: AudioPlayer | null = null;
  private mic: MediaStream | null = null;
  private capture: AudioWorkletNode | null = null;
  private ws: WebSocket | null = null;
  /** True once Gemini acknowledged the setup on the current socket. */
  private ready = false;
  private resumeHandle: string | null = null;
  private closedByUser = false;
  private reconnects = 0;
  private greeted = false;
  private mode: InterruptMode;

  // Turn state.
  private speaking = false;
  private story = false;
  private turnSeconds = 0;
  private dropUntilTurnEnd = false;
  private userLine = '';
  private characterLine = '';

  // Local VAD state (animation only).
  private loudChunks = 0;
  private userActive = false;
  private lastLoudAt = 0;

  constructor(private readonly options: GeminiLiveOptions) {
    this.mode = options.interruptMode;
  }

  onEvent(fn: (e: ConversationEvent) => void) {
    return this.emitter.on('event', fn);
  }

  onStatus(fn: (s: VoiceStatus) => void) {
    return this.emitter.on('status', fn);
  }

  onTranscript(fn: (t: Transcript) => void) {
    return this.emitter.on('transcript', fn);
  }

  outputLevel(): number {
    return this.player?.level() ?? 0;
  }

  setInterruptMode(mode: InterruptMode): void {
    this.mode = mode;
  }

  setTone(tone: VoiceTone): void {
    this.options.tone = tone;
    this.player?.setTone(tone);
  }

  async start(): Promise<void> {
    // Create and resume the AudioContext synchronously inside the user gesture (iOS).
    const ctx = new AudioContext();
    this.ctx = ctx;
    void ctx.resume();
    this.closedByUser = false;
    this.status({ kind: 'connecting' });
    try {
      await this.startAudio(ctx);
      await this.connect();
    } catch (err) {
      const code = err instanceof VoiceError ? err.code : 'server_unreachable';
      this.status({ kind: 'error', code });
      this.teardown();
      throw err;
    }
  }

  interrupt(): void {
    if (!this.speaking && !this.player?.playing) return;
    this.player?.stop();
    this.dropUntilTurnEnd = true;
    this.endTurn('responseCancelled');
  }

  close(): void {
    this.closedByUser = true;
    this.teardown();
    this.status({ kind: 'closed' });
  }

  // ---------------------------------------------------------------- audio

  private async startAudio(ctx: AudioContext): Promise<void> {
    if (!navigator.mediaDevices?.getUserMedia) throw new VoiceError('mic_unavailable');
    try {
      this.mic = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 },
      });
    } catch (err) {
      const name = (err as DOMException)?.name;
      throw new VoiceError(name === 'NotAllowedError' || name === 'SecurityError' ? 'mic_denied' : 'mic_unavailable');
    }

    this.player = new AudioPlayer(ctx, this.options.tone);
    const isAppleWebKit = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
    await this.player.connectOutput(!isAppleWebKit);

    await ctx.audioWorklet.addModule(new URL('./capture-worklet.js', import.meta.url));
    const source = ctx.createMediaStreamSource(this.mic);
    this.capture = new AudioWorkletNode(ctx, 'salef-capture');
    // Keep the worklet pulled without making the mic audible.
    const sink = ctx.createGain();
    sink.gain.value = 0;
    source.connect(this.capture).connect(sink).connect(ctx.destination);
    this.capture.port.onmessage = (e: MessageEvent<{ pcm: ArrayBuffer; level: number }>) => this.onMicChunk(e.data);
  }

  private onMicChunk({ pcm, level }: { pcm: ArrayBuffer; level: number }): void {
    const elderTalking = this.speaking || Boolean(this.player?.playing);
    // In tap mode the mic is paused while he talks, so his voice can't interrupt him.
    if (this.mode === 'tap' && elderTalking) return;
    if (this.ws?.readyState === WebSocket.OPEN && this.ready) {
      this.ws.send(JSON.stringify({ realtimeInput: { audio: { data: bytesToBase64(new Uint8Array(pcm)), mimeType: 'audio/pcm;rate=16000' } } }));
    }
    if (!elderTalking) this.localVad(level);
  }

  private localVad(level: number): void {
    const now = performance.now();
    if (level > VAD_ON) {
      this.loudChunks++;
      this.lastLoudAt = now;
      if (!this.userActive && this.loudChunks >= VAD_ON_CHUNKS) {
        this.userActive = true;
        this.emit({ type: 'userStartedSpeaking' });
      }
    } else {
      this.loudChunks = 0;
      if (this.userActive && now - this.lastLoudAt > VAD_OFF_MS) {
        this.userActive = false;
        this.emit({ type: 'userStoppedSpeaking' });
      }
    }
  }

  // ---------------------------------------------------------- connection

  private async fetchToken(): Promise<TokenResponse> {
    let res: Response;
    try {
      res = await fetch(`${this.options.apiBase.replace(/\/$/, '')}/v1/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: this.options.accessCode, voice: this.options.voice, character: this.options.character }),
      });
    } catch {
      throw new VoiceError('server_unreachable');
    }
    if (res.status === 401) throw new VoiceError('invalid_code');
    if (res.status === 429) throw new VoiceError('rate_limited');
    if (res.status === 503) throw new VoiceError('server_not_configured');
    if (!res.ok) throw new VoiceError('upstream');
    return (await res.json()) as TokenResponse;
  }

  private async connect(): Promise<void> {
    const { token, model, wsUrl } = await this.fetchToken();
    this.ready = false;
    const ws = new WebSocket(`${wsUrl}?access_token=${encodeURIComponent(token)}`);
    // ArrayBuffer frames decode synchronously, so messages are handled strictly in order.
    ws.binaryType = 'arraybuffer';
    this.ws = ws;

    await new Promise<void>((resolve, reject) => {
      const fail = () => reject(new VoiceError('upstream'));
      ws.onerror = fail;
      ws.onclose = fail;
      ws.onopen = () => {
        ws.send(JSON.stringify({ setup: { model, sessionResumption: this.resumeHandle ? { handle: this.resumeHandle } : {} } }));
      };
      ws.onmessage = (e: MessageEvent) => {
        const msg = parseMessage(e.data);
        if (!msg) return;
        if (!this.ready && msg.setupComplete) {
          ws.onerror = null;
          ws.onclose = (ev) => this.onClose(ev);
          this.ready = true;
          this.reconnects = 0;
          this.status({ kind: 'ready' });
          if (!this.greeted) {
            this.greeted = true;
            ws.send(JSON.stringify({
              clientContent: {
                turns: [{ role: 'user', parts: [{ text: this.options.greeting }] }],
                turnComplete: true,
              },
            }));
          }
          resolve();
          return;
        }
        if (this.ready) this.onServerMessage(msg);
      };
    });
  }

  private onClose(ev: CloseEvent): void {
    this.ready = false;
    if (this.closedByUser) return;
    console.warn('Live connection closed', ev.code, ev.reason);
    void this.reconnect();
  }

  private async reconnect(): Promise<void> {
    if (this.closedByUser) return;
    if (this.reconnects >= MAX_RECONNECTS) {
      this.status({ kind: 'error', code: 'connection_lost' });
      this.teardown();
      return;
    }
    this.reconnects++;
    this.status({ kind: 'reconnecting', attempt: this.reconnects });
    this.player?.stop();
    if (this.speaking) this.endTurn('responseCancelled');
    await new Promise((r) => setTimeout(r, 500 * 2 ** (this.reconnects - 1)));
    try {
      await this.connect();
    } catch {
      void this.reconnect();
    }
  }

  // ----------------------------------------------------- server messages

  private onServerMessage(msg: LiveServerMessage): void {
    if (msg.sessionResumptionUpdate?.newHandle && msg.sessionResumptionUpdate.resumable !== false) {
      this.resumeHandle = msg.sessionResumptionUpdate.newHandle;
    }
    if (msg.goAway) {
      // The server will close soon; reconnect proactively with the resume handle.
      this.ws?.close();
      return;
    }
    if (msg.toolCall?.functionCalls?.length) this.answerToolCalls(msg.toolCall.functionCalls);
    const content = msg.serverContent;
    if (!content) return;

    if (content.interrupted) {
      // Gemini heard the player start talking over the elder.
      this.player?.stop();
      this.dropUntilTurnEnd = false;
      if (this.speaking) {
        this.speaking = false;
        this.emit({ type: 'userStartedSpeaking' });
        this.flushCharacterLine();
      }
    }

    if (content.inputTranscription?.text) {
      this.userLine += content.inputTranscription.text;
      this.emitter.emit('transcript', { role: 'user', text: this.userLine, final: false });
    }

    for (const part of content.modelTurn?.parts ?? []) {
      const data = part.inlineData?.data;
      if (!data || this.dropUntilTurnEnd || !this.player) continue;
      if (!this.speaking) this.beginTurn();
      const samples = pcm16ToFloat32(base64ToBytes(data));
      this.turnSeconds += this.player.enqueue(samples, rateFromMime(part.inlineData?.mimeType));
      if (!this.story && this.turnSeconds > STORY_AFTER_SECONDS) {
        this.story = true;
        this.emit({ type: 'responseStarted', story: true });
      }
    }

    if (content.outputTranscription?.text && !this.dropUntilTurnEnd) {
      this.characterLine += content.outputTranscription.text;
      this.emitter.emit('transcript', { role: 'character', text: this.characterLine, final: false });
    }

    if (content.turnComplete) {
      this.dropUntilTurnEnd = false;
      this.player?.whenDrained(() => this.endTurn('responseFinished'));
    }
  }

  private beginTurn(): void {
    this.speaking = true;
    this.story = false;
    this.turnSeconds = 0;
    this.userActive = false;
    this.loudChunks = 0;
    if (this.userLine) {
      this.emitter.emit('transcript', { role: 'user', text: this.userLine, final: true });
      this.userLine = '';
    }
    this.emit({ type: 'responseStarted', story: false });
  }

  private endTurn(type: 'responseFinished' | 'responseCancelled'): void {
    if (!this.speaking) return;
    this.speaking = false;
    this.emit({ type });
    this.flushCharacterLine();
  }

  private flushCharacterLine(): void {
    if (!this.characterLine) return;
    this.emitter.emit('transcript', { role: 'character', text: this.characterLine, final: true });
    this.characterLine = '';
  }

  // --------------------------------------------------------------- utils

  private emit(event: ConversationEvent): void {
    this.emitter.emit('event', event);
  }

  private status(s: VoiceStatus): void {
    this.emitter.emit('status', s);
  }

  private teardown(): void {
    this.ready = false;
    if (this.ws) {
      this.ws.onclose = null;
      this.ws.onmessage = null;
      this.ws.close();
      this.ws = null;
    }
    this.capture?.port.close();
    this.capture?.disconnect();
    this.capture = null;
    this.mic?.getTracks().forEach((t) => t.stop());
    this.mic = null;
    this.player?.dispose();
    this.player = null;
    void this.ctx?.close();
    this.ctx = null;
    this.speaking = false;
    this.userActive = false;
  }

  /** Runs the model's function calls on the character and answers each one. */
  private answerToolCalls(calls: FunctionCall[]): void {
    const functionResponses = calls.map((call) => {
      let result: CommandResult;
      try {
        result = this.options.onCommand?.(call.name ?? '', call.args) ?? { ok: false, note: 'commands are not available' };
      } catch (err) {
        console.warn('Command failed', call.name, err);
        result = { ok: false, note: 'something went wrong' };
      }
      return { id: call.id, name: call.name, response: result };
    });
    this.ws?.send(JSON.stringify({ toolResponse: { functionResponses } }));
  }
}

interface FunctionCall {
  id?: string;
  name?: string;
  args?: unknown;
}

interface LiveServerMessage {
  setupComplete?: object;
  toolCall?: { functionCalls?: FunctionCall[] };
  goAway?: { timeLeft?: string };
  sessionResumptionUpdate?: { newHandle?: string; resumable?: boolean };
  serverContent?: {
    modelTurn?: { parts?: Array<{ inlineData?: { data?: string; mimeType?: string }; text?: string }> };
    turnComplete?: boolean;
    interrupted?: boolean;
    inputTranscription?: { text?: string };
    outputTranscription?: { text?: string };
  };
}

function parseMessage(data: unknown): LiveServerMessage | null {
  try {
    const text = typeof data === 'string' ? data : new TextDecoder().decode(data as ArrayBuffer);
    return JSON.parse(text) as LiveServerMessage;
  } catch {
    return null;
  }
}
