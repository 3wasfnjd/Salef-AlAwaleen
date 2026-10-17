/**
 * Tiny synthesized sound effects for the celebration shots (no audio files).
 * The AudioContext must be created inside a user gesture (entering XR).
 */
export type SfxName = 'whoosh' | 'pop' | 'boom' | 'splash' | 'confetti' | 'click';

export class Sfx {
  private readonly ctx: AudioContext;
  private readonly out: GainNode;
  private noise: AudioBuffer | null = null;

  constructor() {
    this.ctx = new AudioContext();
    void this.ctx.resume();
    this.out = this.ctx.createGain();
    this.out.gain.value = 0.35;
    this.out.connect(this.ctx.destination);
  }

  play(name: SfxName): void {
    const t = this.ctx.currentTime;
    switch (name) {
      case 'pop':
        this.tone(t, 900 + Math.random() * 300, 300, 0.06, 'sine', 0.5);
        break;
      case 'whoosh':
        this.noiseBurst(t, 0.18, 1800, 0.25, 'bandpass');
        break;
      case 'boom':
        this.noiseBurst(t, 0.5, 900, 0.6, 'lowpass');
        for (let i = 0; i < 6; i++) this.noiseBurst(t + 0.08 + Math.random() * 0.35, 0.03, 5000, 0.15, 'highpass'); // crackle
        break;
      case 'splash':
        this.noiseBurst(t, 0.07, 2600, 0.08, 'bandpass');
        break;
      case 'confetti':
        this.noiseBurst(t, 0.08, 3000, 0.4, 'highpass');
        this.tone(t + 0.02, 520, 880, 0.18, 'triangle', 0.25);
        break;
      case 'click':
        this.tone(t, 1400, 1400, 0.03, 'square', 0.12);
        break;
    }
  }

  close(): void {
    void this.ctx.close();
  }

  private tone(t: number, from: number, to: number, dur: number, type: OscillatorType, vol: number): void {
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(from, t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, to), t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(g).connect(this.out);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  private noiseBurst(t: number, dur: number, freq: number, vol: number, type: BiquadFilterType): void {
    if (!this.noise) {
      this.noise = this.ctx.createBuffer(1, this.ctx.sampleRate, this.ctx.sampleRate);
      const d = this.noise.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(f).connect(g).connect(this.out);
    src.start(t, Math.random() * 0.5);
    src.stop(t + dur + 0.02);
  }
}
