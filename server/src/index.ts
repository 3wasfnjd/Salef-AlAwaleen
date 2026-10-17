import persona from '../../persona/ar-najdi.md';
import {
  GEMINI_API,
  LIVE_WS_URL,
  RateLimiter,
  allowedOrigin,
  buildLiveSetup,
  checkAccessCode,
  pickVoice,
  tokenRequestBody,
} from './logic';

/**
 * Salef Al-Awaleen token server (Cloudflare Worker, free plan).
 * Holds the Gemini API key and hands the app a short-lived, single-use
 * ephemeral token whose setup (persona, voice, model) is locked server-side.
 * The permanent key never reaches the browser, the APK or the repository.
 */
interface Env {
  GEMINI_API_KEY?: string;
  ACCESS_CODES?: string;
  ALLOWED_ORIGINS: string;
  GEMINI_LIVE_MODEL: string;
  GEMINI_VOICE: string;
  /** Comma-separated prebuilt voices the app may choose from. */
  VOICE_CHOICES: string;
}

const perMinute = new RateLimiter(6, 60_000);
const perDay = new RateLimiter(120, 24 * 60 * 60_000);

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = allowedOrigin(request.headers.get('Origin'), env.ALLOWED_ORIGINS);
    const cors: Record<string, string> = origin
      ? {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
          Vary: 'Origin',
        }
      : {};
    const json = (body: unknown, status = 200) =>
      new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...cors } });

    if (request.method === 'OPTIONS') return new Response(null, { status: origin ? 204 : 403, headers: cors });
    if (url.pathname === '/health') {
      return json({
        ok: true,
        model: env.GEMINI_LIVE_MODEL,
        voices: (env.VOICE_CHOICES ?? '').split(',').filter(Boolean),
        configured: Boolean(env.GEMINI_API_KEY),
      });
    }
    if (url.pathname !== '/v1/session' || request.method !== 'POST') return json({ error: 'not_found' }, 404);
    if (!origin) return json({ error: 'origin_not_allowed' }, 403);

    let code: unknown;
    let requestedVoice: unknown;
    try {
      ({ code, voice: requestedVoice } = (await request.json()) as { code?: unknown; voice?: unknown });
    } catch {
      return json({ error: 'bad_request' }, 400);
    }
    if (!checkAccessCode(code, env.ACCESS_CODES)) return json({ error: 'invalid_code' }, 401);

    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    const now = Date.now();
    if (!perMinute.allow(ip, now) || !perDay.allow(ip, now)) return json({ error: 'rate_limited' }, 429);
    if (!env.GEMINI_API_KEY) return json({ error: 'server_not_configured' }, 503);

    const voice = pickVoice(requestedVoice, env.VOICE_CHOICES ?? '', env.GEMINI_VOICE);
    const setup = buildLiveSetup({ model: env.GEMINI_LIVE_MODEL, voice, persona });
    const upstream = await fetch(`${GEMINI_API}/v1alpha/auth_tokens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
      body: JSON.stringify(tokenRequestBody(setup, new Date(now))),
    });
    if (!upstream.ok) {
      // Log Google's message server-side only; never echo it (or the key) to clients.
      console.error('auth_tokens failed', upstream.status, (await upstream.text()).slice(0, 500));
      return json({ error: 'upstream_error', status: upstream.status }, 502);
    }
    const token = (await upstream.json()) as { name?: string };
    if (!token.name) return json({ error: 'upstream_error' }, 502);
    return json({ token: token.name, model: setup.model, voice, wsUrl: LIVE_WS_URL });
  },
};
