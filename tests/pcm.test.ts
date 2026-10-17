import { describe, expect, it } from 'vitest';
import { base64ToBytes, bytesToBase64, pcm16ToFloat32, rateFromMime, rms } from '../src/voice/pcm';

describe('pcm helpers', () => {
  it('round-trips base64', () => {
    const bytes = new Uint8Array([0, 1, 2, 250, 255, 128]);
    expect(Array.from(base64ToBytes(bytesToBase64(bytes)))).toEqual(Array.from(bytes));
  });

  it('decodes little-endian int16 to float', () => {
    const bytes = new Uint8Array([0x00, 0x40, 0x00, 0xc0, 0xff, 0x7f]); // 16384, -16384, 32767
    const f = pcm16ToFloat32(bytes);
    expect(f[0]).toBeCloseTo(0.5);
    expect(f[1]).toBeCloseTo(-0.5);
    expect(f[2]).toBeCloseTo(1, 3);
  });

  it('reads the sample rate from the mime type', () => {
    expect(rateFromMime('audio/pcm;rate=24000')).toBe(24000);
    expect(rateFromMime('audio/pcm')).toBe(24000);
  });

  it('computes rms', () => {
    expect(rms(new Float32Array([0.5, -0.5]))).toBeCloseTo(0.5);
    expect(rms(new Float32Array())).toBe(0);
  });
});
