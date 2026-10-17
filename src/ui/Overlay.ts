import type { BehaviorState } from '../core/behavior';
import { isRtl, locale, setLocale, t, type MessageKey } from '../i18n';
import type { XRCapabilities } from '../xr/XRExperience';

export interface OverlayActions {
  enterXR(mode: 'vr' | 'mr'): void;
  previewState(state: BehaviorState): void;
}

const PREVIEW_STATES: BehaviorState[] = ['idle', 'listening', 'thinking', 'speaking', 'storytelling', 'reacting', 'interrupted'];

/** 2D HTML overlay for phones and the flat Quest browser view. RTL by default. */
export class Overlay {
  private error = '';

  constructor(
    private readonly root: HTMLElement,
    private readonly caps: XRCapabilities,
    private readonly actions: OverlayActions,
  ) {
    this.render();
  }

  showError(message: string): void {
    this.error = message;
    this.render();
  }

  private render(): void {
    document.documentElement.lang = locale();
    document.documentElement.dir = isRtl() ? 'rtl' : 'ltr';
    document.title = t('app.title');
    this.root.replaceChildren();

    const top = el('header', 'top');
    const titles = el('div');
    titles.append(el('h1', '', t('app.title')), el('p', '', t('app.subtitle')));
    const lang = button(t('btn.language'), 'small', () => {
      setLocale(locale() === 'ar' ? 'en' : 'ar');
      this.render();
    });
    top.append(titles, lang);

    const bottom = el('section', 'bottom');
    if (this.caps.vr || this.caps.ar) {
      const row = el('div', 'row');
      row.append(button(t('btn.enterVR'), 'primary', () => this.actions.enterXR('vr')));
      if (this.caps.ar) row.append(button(t('btn.enterMR'), 'primary', () => this.actions.enterXR('mr')));
      bottom.append(row);
    } else {
      bottom.append(el('p', 'notice', t('xr.unsupported')));
      bottom.append(el('p', 'hint', t('touch.hint')));
    }
    bottom.append(el('p', 'notice', t('app.phaseNotice')));

    // Developer preview of animation states. Clearly labelled: not an AI conversation.
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = t('btn.states');
    details.append(summary);
    const states = el('label', 'states');
    const select = document.createElement('select');
    for (const s of PREVIEW_STATES) {
      const option = document.createElement('option');
      option.value = s;
      option.textContent = t(`state.${s}` as MessageKey);
      select.append(option);
    }
    select.addEventListener('change', () => this.actions.previewState(select.value as BehaviorState));
    states.append(document.createTextNode(t('states.title')), select);
    details.append(states);
    bottom.append(details);

    if (this.error) bottom.append(el('p', 'notice error', this.error));
    this.root.append(top, bottom);
  }
}

function el(tag: string, className = '', text?: string): HTMLElement {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function button(label: string, className: string, onClick: () => void): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = className;
  b.textContent = label;
  b.addEventListener('click', onClick);
  return b;
}
