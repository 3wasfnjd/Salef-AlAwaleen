/**
 * Pure helpers for the token server (no Workers runtime APIs), so they can be
 * unit-tested with vitest.
 */

export const GEMINI_API = 'https://generativelanguage.googleapis.com';
export const LIVE_WS_URL =
  'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContentConstrained';

export interface LiveSetupOptions {
  model: string;
  voice: string;
  persona: string;
}

/**
 * Live API session setup. Everything here is locked into the ephemeral token,
 * so a client cannot change the persona, voice or model.
 */
export function buildLiveSetup({ model, voice, persona }: LiveSetupOptions): Record<string, unknown> {
  return {
    model: model.startsWith('models/') ? model : `models/${model}`,
    generationConfig: {
      responseModalities: ['AUDIO'],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } },
    },
    systemInstruction: { parts: [{ text: persona }] },
    inputAudioTranscription: {},
    outputAudioTranscription: {},
    // Keeps long storytelling sessions going past the raw context limit.
    contextWindowCompression: { slidingWindow: {} },
  };
}

/** Same rule as the official SDK: one level deep, comma separated. */
export function fieldMask(setup: Record<string, unknown>): string {
  const fields: string[] = [];
  for (const [key, value] of Object.entries(setup)) {
    if (value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0) {
      fields.push(...Object.keys(value).map((k) => `${key}.${k}`));
    } else {
      fields.push(key);
    }
  }
  return fields.join(',');
}

/** Body for POST v1alpha/auth_tokens: one session, 1 min to start, 30 min to talk. */
export function tokenRequestBody(setup: Record<string, unknown>, now: Date): Record<string, unknown> {
  return {
    uses: 1,
    expireTime: new Date(now.getTime() + 30 * 60_000).toISOString(),
    newSessionExpireTime: new Date(now.getTime() + 60_000).toISOString(),
    bidiGenerateContentSetup: setup,
    fieldMask: fieldMask(setup),
  };
}

export interface CharacterConfig {
  persona: string;
  defaultVoice: string;
}

/** The requested character if known, otherwise the first (default) one. */
export function pickCharacter(requested: unknown, characters: Record<string, CharacterConfig>): string {
  const ids = Object.keys(characters);
  return typeof requested === 'string' && ids.includes(requested) ? requested : ids[0];
}

/** A voice the client asked for, if it is on the server's allow-list; otherwise the default. */
export function pickVoice(requested: unknown, allowedCsv: string, fallback: string): string {
  if (typeof requested !== 'string') return fallback;
  const allowed = allowedCsv.split(',').map((v) => v.trim()).filter(Boolean);
  return allowed.includes(requested) ? requested : fallback;
}

/** Constant-time check of an invite code against a comma-separated list. */
export function checkAccessCode(code: unknown, codesCsv: string | undefined): boolean {
  if (typeof code !== 'string' || !codesCsv) return false;
  const candidate = code.trim();
  let ok = false;
  for (const allowed of codesCsv.split(',').map((c) => c.trim()).filter(Boolean)) {
    if (allowed.length !== candidate.length) continue;
    let diff = 0;
    for (let i = 0; i < allowed.length; i++) diff |= allowed.charCodeAt(i) ^ candidate.charCodeAt(i);
    if (diff === 0) ok = true;
  }
  return ok;
}

export function allowedOrigin(origin: string | null, allowedCsv: string): string | null {
  if (!origin) return null;
  return allowedCsv.split(',').map((o) => o.trim()).includes(origin) ? origin : null;
}

/** Sliding-window limiter. Per Worker isolate: a soft guard for the free quota, not a hard global cap. */
export class RateLimiter {
  private readonly hits = new Map<string, number[]>();

  constructor(
    private readonly max: number,
    private readonly windowMs: number,
  ) {}

  allow(key: string, nowMs: number): boolean {
    const recent = (this.hits.get(key) ?? []).filter((t) => nowMs - t < this.windowMs);
    if (recent.length >= this.max) {
      this.hits.set(key, recent);
      return false;
    }
    recent.push(nowMs);
    this.hits.set(key, recent);
    return true;
  }
}
