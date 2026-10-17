import type { InterruptMode, Transcript, VoiceSession, VoiceStatus } from './core/voice';
import { t, type MessageKey } from './i18n';
import type { SceneApp } from './scene/SceneApp';
import { GeminiLiveSession } from './voice/GeminiLiveSession';

const CODE_KEY = 'salef.accessCode';
const MODE_KEY = 'salef.interruptMode';
const VOICE_KEY = 'salef.voice';
const TONE_KEY = 'salef.elderTone';

/** Male prebuilt Gemini voices offered to the owner (must match VOICE_CHOICES on the server). */
export const VOICES = ['Algenib', 'Charon', 'Sadaltager', 'Enceladus', 'Orus', 'Iapetus', 'Schedar', 'Umbriel'] as const;
export type VoiceName = (typeof VOICES)[number];

/** Localised text for a voice status. */
export function statusText(s: VoiceStatus): string {
  switch (s.kind) {
    case 'error':
      return t(`err.${s.code}` as MessageKey);
    case 'reconnecting':
      return t('status.reconnecting', { n: String(s.attempt) });
    default:
      return t(`status.${s.kind}` as MessageKey);
  }
}

export interface ConversationView {
  status(s: VoiceStatus): void;
  transcript(t: Transcript): void;
  speakingChanged(speaking: boolean): void;
}

/**
 * Connects a VoiceSession to the scene: conversation events drive the
 * behaviour machine, the real output level drives the mouth, and the views
 * (2D overlay, XR panel) get status and captions.
 */
export class Conversation {
  private session: VoiceSession | null = null;
  private readonly views: ConversationView[] = [];
  private lastStatus: VoiceStatus = { kind: 'idle' };
  private speaking = false;

  constructor(
    private readonly app: SceneApp,
    readonly apiBase: string | undefined,
  ) {
    app.onFrame(() => app.character?.setMouthOpen(this.session?.outputLevel() ?? 0));
    app.behavior.on('change', ({ to }) => {
      const speaking = to === 'speaking' || to === 'storytelling';
      if (speaking !== this.speaking) {
        this.speaking = speaking;
        this.views.forEach((v) => v.speakingChanged(speaking));
      }
    });
  }

  get configured(): boolean {
    return Boolean(this.apiBase);
  }

  get active(): boolean {
    return this.session !== null;
  }

  get isSpeaking(): boolean {
    return this.speaking;
  }

  get status(): VoiceStatus {
    return this.lastStatus;
  }

  addView(view: ConversationView): void {
    this.views.push(view);
    view.status(this.lastStatus);
  }

  /** Must run inside a user gesture (click / XR select). */
  start(): void {
    if (this.session || !this.apiBase) return;
    const session = new GeminiLiveSession({
      apiBase: this.apiBase,
      accessCode: this.accessCode,
      interruptMode: this.interruptMode,
      voice: this.voice,
      elderTone: this.elderTone,
    });
    this.session = session;
    session.onEvent((e) => this.app.behavior.dispatch(e, performance.now()));
    session.onTranscript((t) => this.views.forEach((v) => v.transcript(t)));
    session.onStatus((s) => {
      this.lastStatus = s;
      this.views.forEach((v) => v.status(s));
      if (s.kind === 'error' || s.kind === 'closed') {
        this.session = null;
        this.app.behavior.dispatch({ type: 'reset' }, performance.now());
      }
    });
    session.start().catch(() => undefined); // errors arrive as status events
  }

  stop(): void {
    this.session?.close();
    this.session = null;
  }

  toggle(): void {
    if (this.session) this.stop();
    else this.start();
  }

  interrupt(): void {
    this.session?.interrupt();
  }

  get accessCode(): string {
    return read(CODE_KEY) ?? '';
  }

  set accessCode(code: string) {
    write(CODE_KEY, code.trim());
  }

  get interruptMode(): InterruptMode {
    return read(MODE_KEY) === 'tap' ? 'tap' : 'auto';
  }

  set interruptMode(mode: InterruptMode) {
    write(MODE_KEY, mode);
    this.session?.setInterruptMode(mode);
  }

  get voice(): VoiceName {
    const v = read(VOICE_KEY);
    return (VOICES as readonly string[]).includes(v ?? '') ? (v as VoiceName) : 'Algenib';
  }

  /** Takes effect from the next session (the voice is locked into each session's token). */
  set voice(v: VoiceName) {
    write(VOICE_KEY, v);
  }

  get elderTone(): boolean {
    return read(TONE_KEY) !== 'off';
  }

  set elderTone(on: boolean) {
    write(TONE_KEY, on ? 'on' : 'off');
    this.session?.setElderTone(on);
  }
}

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage unavailable: setting applies to this visit only.
  }
}
