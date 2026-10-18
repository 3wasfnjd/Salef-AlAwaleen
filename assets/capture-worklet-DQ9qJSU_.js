// AudioWorklet: resamples the microphone to 16 kHz mono Int16 and posts
// ~40 ms chunks (with their RMS level) to the main thread.
const TARGET_RATE = 16000;
const CHUNK = 640; // 40 ms at 16 kHz

class CaptureProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.step = sampleRate / TARGET_RATE;
    this.pos = 0; // fractional read position into `carry`
    this.carry = new Float32Array(0);
    this.out = new Int16Array(CHUNK);
    this.outLen = 0;
    this.sumSq = 0;
  }

  process(inputs) {
    const channel = inputs[0] && inputs[0][0];
    if (!channel) return true;
    const data = new Float32Array(this.carry.length + channel.length);
    data.set(this.carry);
    data.set(channel, this.carry.length);

    let pos = this.pos;
    while (pos + 1 < data.length) {
      const i = Math.floor(pos);
      const frac = pos - i;
      const s = data[i] * (1 - frac) + data[i + 1] * frac;
      const clamped = Math.max(-1, Math.min(1, s));
      this.out[this.outLen++] = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;
      this.sumSq += clamped * clamped;
      if (this.outLen === CHUNK) {
        const level = Math.sqrt(this.sumSq / CHUNK);
        const buffer = this.out.slice().buffer;
        this.port.postMessage({ pcm: buffer, level }, [buffer]);
        this.outLen = 0;
        this.sumSq = 0;
      }
      pos += this.step;
    }
    const keepFrom = Math.floor(pos);
    this.carry = data.slice(keepFrom);
    this.pos = pos - keepFrom;
    return true;
  }
}

registerProcessor('salef-capture', CaptureProcessor);
