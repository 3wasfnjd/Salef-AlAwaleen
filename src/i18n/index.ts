import ar from '../../locales/ar.json';
import en from '../../locales/en.json';

/**
 * Interface language only. Speech-recognition language, response language,
 * voice and persona are configured separately (see src/core/voice.ts, Phase 2).
 */
export type Locale = 'ar' | 'en';
export type MessageKey = keyof typeof ar;

const catalogs: Record<Locale, Record<MessageKey, string>> = { ar, en };
const STORAGE_KEY = 'salef.locale';

let current: Locale = detectLocale();

function detectLocale(): Locale {
  const fromQuery = new URLSearchParams(globalThis.location?.search ?? '').get('lang');
  if (fromQuery === 'ar' || fromQuery === 'en') return fromQuery;
  try {
    const stored = globalThis.localStorage?.getItem(STORAGE_KEY);
    if (stored === 'ar' || stored === 'en') return stored;
  } catch {
    // Storage can be unavailable (private mode); Arabic stays the default.
  }
  return 'ar';
}

export function locale(): Locale {
  return current;
}

export function isRtl(l: Locale = current): boolean {
  return l === 'ar';
}

export function setLocale(l: Locale): void {
  current = l;
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, l);
  } catch {
    // Ignore storage errors; the choice still applies for this visit.
  }
}

export function t(key: MessageKey, params: Record<string, string> = {}, l: Locale = current): string {
  const template = catalogs[l][key] ?? catalogs.ar[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, name: string) => params[name] ?? `{${name}}`);
}
