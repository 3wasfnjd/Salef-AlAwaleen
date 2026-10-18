import { rms } from './pcm';

/**
 * Gapless playback of streamed PCM chunks with instant stop (for
 * interruptions) and a live output level for the mouth.
 *
 * Echo cancellation: browsers cancel echo for audio they play through WebRTC.
 * On Chromium (Quest Browser) Web Audio output is not reliably part of that
 * reference, so the voice is routed through a local RTCPeerConnection
 * loopback into an <audio> element. Safari/iOS uses the system voice
 * processing for all output, so it plays directly.
 */
/**
 * Light colouring on top of the provider's prebuilt voice (not a voice clone):
 * - elder: ≈8% slower/lower with a warmer EQ (more low end, softer highs);
 * - child: ≈12% faster/higher with a brighter EQ.
 */
export type VoiceTone = 'elder' | 'child' | 'alien' | 'none';

const TONES: Record<VoiceTone, { rate: number; low: number; high: number }> = {
  elder: { rate: 0.92, low: 4, high: -5 },
  child: { rate: 1.12, low: -3, high: 3 },
  alien: { rate: 1.07, low: -4, high: 5 },
  none: { rate: 1, low: 0, high: 0 },
};

export class AudioPlayer {
  private readonly gain: GainNode;
  private readonly low: BiquadFilterNode;
  private readonly high: BiquadFilterNode;
  private rate = 1;
  private readonly analyser: AnalyserNode;
  private readonly levelBuf: Float32Array<ArrayBuffer>;
  private readonly sources = new Set<AudioBufferSourceNode>();
  private playhead = 0;
  private drainedCallbacks: Array<() => void> = [];
  private loopback: { pcs: RTCPeerConnection[]; el: HTMLAudioElement } | null = null;

  constructor(
    private readonly ctx: AudioContext,
    tone: VoiceTone = 'none',
  ) {
    this.low = ctx.createBiquadFilter();
    this.low.type = 'lowshelf';
    this.low.frequency.value = 220;
    this.high = ctx.createBiquadFilter();
    this.high.type = 'highshelf';
    this.high.frequency.value = 4500;
    this.gain = ctx.createGain();
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 512;
    this.levelBuf = new Float32Array(this.analyser.fftSize);
    this.low.connect(this.high).connect(this.gain);
    this.gain.connect(this.analyser);
    this.setTone(tone);
  }

  setTone(tone: VoiceTone): void {
    const t = TONES[tone];
    this.rate = t.rate;
    this.low.gain.value = t.low;
    this.high.gain.value = t.high;
  }

  /** Connects the output, via the WebRTC loopback where it helps echo cancellation. */
  async connectOutput(useLoopback: boolean): Promise<'loopback' | 'direct'> {
    if (useLoopback) {
      try {
        this.loopback = await createLoopback(this.ctx, this.gain);
        return 'loopback';
      } catch (err) {
        console.warn('Echo-cancellation loopback unavailable, playing directly', err);
      }
    }
    this.gain.connect(this.ctx.destination);
    return 'direct';
  }

  get playing(): boolean {
    return this.sources.size > 0;
  }

  enqueue(samples: Float32Array<ArrayBuffer>, sampleRate: number): number {
    const buffer = this.ctx.createBuffer(1, samples.length, sampleRate);
    buffer.copyToChannel(samples, 0);
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.playbackRate.value = this.rate;
    src.connect(this.low);
    const startAt = Math.max(this.ctx.currentTime + 0.03, this.playhead);
    src.start(startAt);
    const duration = buffer.duration / this.rate;
    this.playhead = startAt + duration;
    this.sources.add(src);
    src.onended = () => {
      this.sources.delete(src);
      if (this.sources.size === 0) this.flushDrained();
    };
    return duration;
  }

  /** Runs `fn` once everything queued so far has finished playing. */
  whenDrained(fn: () => void): void {
    if (this.sources.size === 0) fn();
    else this.drainedCallbacks.push(fn);
  }

  /** Stops immediately and drops anything queued. */
  stop(): void {
    for (const src of this.sources) {
      src.onended = null;
      try {
        src.stop();
      } catch {
        // already stopped
      }
    }
    this.sources.clear();
    this.playhead = 0;
    this.drainedCallbacks = [];
  }

  /** Current output level, roughly 0..1, scaled for mouth animation. */
  level(): number {
    if (!this.playing) return 0;
    this.analyser.getFloatTimeDomainData(this.levelBuf);
    return Math.min(1, rms(this.levelBuf) * 4);
  }

  dispose(): void {
    this.stop();
    this.low.disconnect();
    this.high.disconnect();
    this.gain.disconnect();
    if (this.loopback) {
      this.loopback.pcs.forEach((pc) => pc.close());
      this.loopback.el.srcObject = null;
      this.loopback = null;
    }
  }

  private flushDrained(): void {
    const callbacks = this.drainedCallbacks;
    this.drainedCallbacks = [];
    callbacks.forEach((fn) => fn());
  }
}

async function createLoopback(ctx: AudioContext, source: AudioNode): Promise<{ pcs: RTCPeerConnection[]; el: HTMLAudioElement }> {
  const dest = ctx.createMediaStreamDestination();
  source.connect(dest);
  const sender = new RTCPeerConnection();
  const receiver = new RTCPeerConnection();
  sender.onicecandidate = (e) => e.candidate && void receiver.addIceCandidate(e.candidate);
  receiver.onicecandidate = (e) => e.candidate && void sender.addIceCandidate(e.candidate);
  const el = new Audio();
  el.autoplay = true;
  const gotTrack = new Promise<void>((resolve) => {
    receiver.ontrack = (e) => {
      el.srcObject = e.streams[0] ?? new MediaStream([e.track]);
      resolve();
    };
  });
  for (const track of dest.stream.getAudioTracks()) sender.addTrack(track, dest.stream);
  const offer = await sender.createOffer();
  // Voice-quality Opus without the default low bitrate.
  offer.sdp = offer.sdp?.replace(/(a=fmtp:\d+ .*)/, '$1;maxaveragebitrate=96000;useinbandfec=1');
  await sender.setLocalDescription(offer);
  await receiver.setRemoteDescription(offer);
  const answer = await receiver.createAnswer();
  await receiver.setLocalDescription(answer);
  await sender.setRemoteDescription(answer);
  await Promise.race([gotTrack, new Promise((_, reject) => setTimeout(() => reject(new Error('loopback timeout')), 4000))]);
  await el.play();
  return { pcs: [sender, receiver], el };
}
