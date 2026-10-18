import type { BehaviorState } from '../core/behavior';
import type { InterruptMode, Transcript, VoiceStatus } from '../core/voice';
import { CHARACTER_IDS, CHARACTERS, type CharacterId } from '../characters';
import { statusText, type ConversationView } from '../conversation';
import { ENVIRONMENTS, type EnvironmentId } from '../scene/environments';
import { isRtl, locale, setLocale, t, type MessageKey } from '../i18n';
import type { XRCapabilities } from '../xr/XRExperience';

export interface OverlayActions {
  enterXR(mode: 'vr' | 'mr'): void;
  previewState(state: BehaviorState): void;
  setEnvironment(id: EnvironmentId): void;
  currentEnvironment(): EnvironmentId;
  voice: {
    configured: boolean;
    active(): boolean;
    toggle(): void;
    interrupt(): void;
    getCode(): string;
    setCode(code: string): void;
    getMode(): InterruptMode;
    setMode(mode: InterruptMode): void;
    getVoice(): string;
    setVoice(v: string): void;
    getTone(): boolean;
    setTone(on: boolean): void;
  };
  getCharacter(): CharacterId;
  setCharacter(id: CharacterId): void;
}

const PREVIEW_STATES: BehaviorState[] = ['idle', 'listening', 'thinking', 'speaking', 'storytelling', 'reacting', 'interrupted'];

/** 2D HTML overlay for phones and the flat Quest browser view. RTL by default. */
export class Overlay implements ConversationView {
  private error = '';
  private voiceStatus: VoiceStatus = { kind: 'idle' };
  private speaking = false;
  /** The side drawer with the options; closed so the scene stays open. */
  private menuOpen = false;
  private lines: Record<Transcript['role'], string> = { user: '', character: '' };
  private refs: {
    status?: HTMLElement;
    talk?: HTMLButtonElement;
    cut?: HTMLButtonElement;
    captions?: HTMLElement;
    user?: HTMLElement;
    character?: HTMLElement;
  } = {};

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

  // ConversationView
  status(s: VoiceStatus): void {
    this.voiceStatus = s;
    if (s.kind === 'connecting') this.lines = { user: '', character: '' };
    this.updateVoice();
  }

  transcript(tr: Transcript): void {
    this.lines[tr.role] = tr.text;
    this.updateVoice();
  }

  speakingChanged(speaking: boolean): void {
    this.speaking = speaking;
    this.updateVoice();
  }

  private updateVoice(): void {
    const { status, talk, cut, captions, user, character } = this.refs;
    if (status) {
      status.textContent = statusText(this.voiceStatus);
      status.classList.toggle('error', this.voiceStatus.kind === 'error');
    }
    if (talk) talk.textContent = this.actions.voice.active() ? t('talk.stop') : t('talk.start');
    if (cut) cut.hidden = !(this.speaking && this.actions.voice.active());
    if (captions && user && character) {
      user.textContent = this.lines.user ? `${t('caption.you')}: ${this.lines.user}` : '';
      const name = t(CHARACTERS[this.actions.getCharacter()].nameKey).split(' — ')[0];
      character.textContent = this.lines.character ? `${name}: ${this.lines.character}` : '';
      captions.hidden = !this.lines.user && !this.lines.character;
    }
  }

  private render(): void {
    document.documentElement.lang = locale();
    document.documentElement.dir = isRtl() ? 'rtl' : 'ltr';
    document.title = t('app.title');
    this.root.replaceChildren();
    this.refs = {};

    // Kept minimal so the characters have the screen: a menu button and a small title.
    const top = el('header', 'top');
    const menu = button('☰', 'icon', () => this.setMenu(!this.menuOpen));
    menu.setAttribute('aria-expanded', String(this.menuOpen));
    menu.setAttribute('aria-label', t('btn.options'));
    menu.title = t('btn.options');
    top.append(menu, el('h1', '', t('app.title')));
    const lang = button(t('btn.language'), 'small', () => {
      setLocale(locale() === 'ar' ? 'en' : 'ar');
      this.render();
    });

    const bottom = el('section', 'bottom');

    // Voice conversation.
    const voice = this.actions.voice;
    if (voice.configured) {
      const captions = el('div', 'captions');
      this.refs.user = el('p', 'caption user');
      this.refs.character = el('p', 'caption elder');
      captions.append(this.refs.character, this.refs.user);
      this.refs.captions = captions;
      this.refs.status = el('p', 'status');
      const row = el('div', 'row');
      this.refs.talk = button('', 'primary', () => {
        voice.toggle();
        this.updateVoice();
      });
      this.refs.cut = button(t('talk.cut'), '', () => voice.interrupt());
      row.append(this.refs.talk, this.refs.cut);
      this.xrButtons(row);
      bottom.append(captions, this.refs.status, row);
    } else {
      const row = el('div', 'row');
      this.xrButtons(row);
      bottom.append(el('p', 'notice', t('voice.notConfigured')), row);
    }

    // Everything secondary lives in a side drawer, closed by default.
    const options = el('aside', 'drawer');
    options.id = 'options';
    options.hidden = !this.menuOpen;
    const head = el('div', 'drawer-head');
    const headButtons = el('div', 'row');
    headButtons.append(lang, button(t('btn.close'), 'small', () => this.setMenu(false)));
    head.append(el('h2', '', t('btn.options')), headButtons);
    options.append(head);
    const current = this.actions.getCharacter();
    options.append(
      this.select(t('settings.character'), CHARACTER_IDS.map((id) => [id, t(CHARACTERS[id].nameKey)]), current, (v) => {
        this.actions.setCharacter(v as CharacterId);
        this.lines = { user: '', character: '' };
        this.render();
      }),
    );
    options.append(this.select(t('env.label'), ENVIRONMENTS.map((id) => [id, t(`env.${id}` as MessageKey)]), this.actions.currentEnvironment(), (v) =>
      this.actions.setEnvironment(v as EnvironmentId),
    ));
    if (voice.configured) {
      const codeLabel = el('label', 'states');
      const code = document.createElement('input');
      code.type = 'password';
      code.autocomplete = 'off';
      code.value = voice.getCode();
      code.addEventListener('change', () => voice.setCode(code.value));
      codeLabel.append(document.createTextNode(t('settings.code')), code);
      options.append(
        codeLabel,
        this.select(t('settings.interrupt'), [['auto', t('interrupt.auto')], ['tap', t('interrupt.tap')]], voice.getMode(), (v) =>
          voice.setMode(v as InterruptMode),
        ),
        this.select(t('settings.voice'), CHARACTERS[current].voices.map((v) => [v, t(`voice.${v}` as MessageKey)]), voice.getVoice(), (v) =>
          voice.setVoice(v),
        ),
        el('p', 'hint', t('settings.voiceNote')),
        this.select(t('settings.tone'), [['on', t('tone.on')], ['off', t('tone.off')]], voice.getTone() ? 'on' : 'off', (v) =>
          voice.setTone(v === 'on'),
        ),
        el('p', 'hint', t('talk.hint')),
      );
      if (this.caps.vr || this.caps.ar) options.append(el('p', 'hint', t('talk.xrHint')));
    }
    if (!this.caps.vr && !this.caps.ar) options.append(el('p', 'hint', t('touch.hint')));
    // Developer preview of animation states. Clearly labelled: not an AI conversation.
    options.append(this.select(t('states.title'), PREVIEW_STATES.map((s) => [s, t(`state.${s}` as MessageKey)]), 'idle', (v) =>
      this.actions.previewState(v as BehaviorState),
    ));
    options.append(el('p', 'notice', t('app.phaseNotice')));
    if (CHARACTERS[current].kids) options.append(el('p', 'notice', t('kids.notice', { name: t(CHARACTERS[current].nameKey).split(' — ')[0] })));

    if (this.error) bottom.append(el('p', 'notice error', this.error));
    this.root.append(top, bottom, options);
    this.updateVoice();
  }

  private xrButtons(row: HTMLElement): void {
    if (this.caps.vr) row.append(button(t('btn.enterVR'), '', () => this.actions.enterXR('vr')));
    if (this.caps.ar) row.append(button(t('btn.enterMR'), '', () => this.actions.enterXR('mr')));
  }

  private setMenu(open: boolean): void {
    this.menuOpen = open;
    const drawer = this.root.querySelector<HTMLElement>('.drawer');
    if (drawer) drawer.hidden = !open;
    this.root.querySelector('.top button[aria-expanded]')?.setAttribute('aria-expanded', String(open));
  }

  private select(label: string, options: Array<[string, string]>, value: string, onChange: (v: string) => void): HTMLElement {
    const wrap = el('label', 'states');
    const select = document.createElement('select');
    for (const [v, text] of options) {
      const option = document.createElement('option');
      option.value = v;
      option.textContent = text;
      option.selected = v === value;
      select.append(option);
    }
    select.addEventListener('change', () => onChange(select.value));
    wrap.append(document.createTextNode(label), select);
    return wrap;
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
  if (className) b.className = className;
  b.textContent = label;
  b.addEventListener('click', onClick);
  return b;
}
