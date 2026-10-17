import { describe, expect, it } from 'vitest';
import ar from '../locales/ar.json';
import en from '../locales/en.json';
import { t } from '../src/i18n';

describe('i18n', () => {
  it('has the same keys in every locale', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(ar).sort());
  });

  it('defaults to Arabic and interpolates parameters', () => {
    expect(t('app.title')).toBe('سوالف الأولين');
    expect(t('xr.sessionError', { error: 'X' }, 'en')).toBe('Could not start the session: X');
  });
});
