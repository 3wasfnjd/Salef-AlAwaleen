import { describe, expect, it } from 'vitest';
import { RateLimiter, allowedOrigin, buildLiveSetup, checkAccessCode, fieldMask, tokenRequestBody } from '../server/src/logic';

describe('token server logic', () => {
  const setup = buildLiveSetup({ model: 'gemini-3.1-flash-live-preview', voice: 'Algenib', persona: 'أنت أبو ناصر' });

  it('builds a locked audio setup with persona and voice', () => {
    expect(setup.model).toBe('models/gemini-3.1-flash-live-preview');
    expect(setup).toMatchObject({
      generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Algenib' } } } },
      systemInstruction: { parts: [{ text: 'أنت أبو ناصر' }] },
    });
  });

  it('builds the field mask like the official SDK', () => {
    expect(fieldMask(setup)).toBe(
      'model,generationConfig.responseModalities,generationConfig.speechConfig,systemInstruction.parts,inputAudioTranscription,outputAudioTranscription,contextWindowCompression.slidingWindow',
    );
  });

  it('issues single-use tokens that must start within a minute', () => {
    const body = tokenRequestBody(setup, new Date('2026-10-17T00:00:00Z'));
    expect(body).toMatchObject({
      uses: 1,
      newSessionExpireTime: '2026-10-17T00:01:00.000Z',
      expireTime: '2026-10-17T00:30:00.000Z',
    });
  });

  it('checks invite codes', () => {
    expect(checkAccessCode('majlis-2026', 'abc, majlis-2026')).toBe(true);
    expect(checkAccessCode(' majlis-2026 ', 'majlis-2026')).toBe(true);
    expect(checkAccessCode('majlis-2025', 'majlis-2026')).toBe(false);
    expect(checkAccessCode('', 'majlis-2026')).toBe(false);
    expect(checkAccessCode('x', undefined)).toBe(false);
    expect(checkAccessCode(42, 'x')).toBe(false);
  });

  it('only allows listed origins', () => {
    expect(allowedOrigin('https://3wasfnjd.github.io', 'https://3wasfnjd.github.io,http://localhost:5173')).toBe('https://3wasfnjd.github.io');
    expect(allowedOrigin('https://evil.example', 'https://3wasfnjd.github.io')).toBeNull();
    expect(allowedOrigin(null, 'https://3wasfnjd.github.io')).toBeNull();
  });

  it('rate limits per key within a window', () => {
    const rl = new RateLimiter(2, 1000);
    expect(rl.allow('a', 0)).toBe(true);
    expect(rl.allow('a', 10)).toBe(true);
    expect(rl.allow('a', 20)).toBe(false);
    expect(rl.allow('b', 20)).toBe(true);
    expect(rl.allow('a', 1500)).toBe(true);
  });
});
