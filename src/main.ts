import './ui/style.css';
import { CommandRunner } from './commands';
import { Conversation } from './conversation';
import type { BehaviorState, ConversationEvent } from './core/behavior';
import { t } from './i18n';
import { CHARACTERS, isCharacterId, type CharacterId } from './characters';
import { ProceduralElder } from './scene/character/ProceduralElder';
import { ENVIRONMENTS, type EnvironmentId } from './scene/environments';
import { SceneApp } from './scene/SceneApp';
import { Overlay } from './ui/Overlay';
import { XRExperience } from './xr/XRExperience';

/** Events that drive the behaviour machine into each previewed state. */
const PREVIEW_PATH: Record<BehaviorState, ConversationEvent[]> = {
  idle: [],
  listening: [{ type: 'userStartedSpeaking' }],
  thinking: [{ type: 'userStartedSpeaking' }, { type: 'userStoppedSpeaking' }],
  speaking: [{ type: 'responseStarted', story: false }],
  storytelling: [{ type: 'responseStarted', story: true }],
  reacting: [{ type: 'react' }],
  interrupted: [{ type: 'responseStarted', story: true }, { type: 'userStartedSpeaking' }],
};

const ENV_KEY = 'salef.environment';

function savedEnvironment(): EnvironmentId {
  try {
    const saved = localStorage.getItem(ENV_KEY);
    if (saved && (ENVIRONMENTS as string[]).includes(saved)) return saved as EnvironmentId;
  } catch {
    // Storage unavailable: default place.
  }
  return 'majlis';
}

async function boot(): Promise<void> {
  const stage = document.getElementById('stage');
  const ui = document.getElementById('ui');
  if (!stage || !ui) throw new Error('Missing #stage or #ui');

  const app = new SceneApp(stage);
  const params = new URLSearchParams(location.search);

  const setEnvironment = (id: EnvironmentId) => {
    try {
      localStorage.setItem(ENV_KEY, id);
    } catch {
      // Storage unavailable (private mode): the choice still applies now.
    }
    return app.environments.show(id);
  };
  void app.environments.show(savedEnvironment());

  const conversation = new Conversation(app, import.meta.env.VITE_API_BASE || undefined);

  // Character: ?character=… for testing, otherwise the viewer's last choice.
  let loading = 0;
  const showCharacter = async (id: CharacterId) => {
    const ticket = ++loading;
    const rig = await CHARACTERS[id].load();
    if (ticket === loading) app.setCharacter(rig);
    else rig.dispose(); // a newer choice won
  };
  const requested = params.get('character');
  if (requested === 'procedural') app.setCharacter(new ProceduralElder());
  else {
    if (isCharacterId(requested)) conversation.character = requested;
    void showCharacter(conversation.character);
  }

  const caps = await XRExperience.capabilities();
  const xr = new XRExperience(app, caps, {
    onSessionEnd: () => document.body.classList.remove('in-xr'),
    setEnvironment,
    conversation,
    motion: () => CHARACTERS[conversation.character].motion,
  });

  // Voice commands ("come here", "dance"…) carried out on the character.
  conversation.setCommandHandler(new CommandRunner(app, xr, setEnvironment).run);

  const overlay = new Overlay(ui, caps, {
    enterXR: (mode) => {
      xr.start(mode)
        .then(() => document.body.classList.add('in-xr'))
        .catch((err: unknown) => overlay.showError(t('xr.sessionError', { error: String((err as Error)?.message ?? err) })));
    },
    setEnvironment: (id) => void setEnvironment(id),
    currentEnvironment: () => app.environments.current,
    voice: {
      configured: conversation.configured,
      active: () => conversation.active,
      toggle: () => conversation.toggle(),
      interrupt: () => conversation.interrupt(),
      getCode: () => conversation.accessCode,
      setCode: (code) => (conversation.accessCode = code),
      getMode: () => conversation.interruptMode,
      setMode: (mode) => (conversation.interruptMode = mode),
      getVoice: () => conversation.voice,
      setVoice: (v) => (conversation.voice = v),
      getTone: () => conversation.toneOn,
      setTone: (on) => (conversation.toneOn = on),
    },
    getCharacter: () => conversation.character,
    setCharacter: (id) => {
      conversation.character = id;
      void showCharacter(id);
    },
    previewState: (state) => {
      const now = performance.now();
      app.behavior.dispatch({ type: 'reset' }, now);
      for (const event of PREVIEW_PATH[state]) app.behavior.dispatch(event, now);
    },
  });

  conversation.addView(overlay);

  // Debug handle for automated render checks (?debug).
  if (params.has('debug')) Object.assign(window, { __salef: app, __conversation: conversation, __xr: xr });

  // The packaged Quest app (immersive mode) asks to enter XR straight away.
  // If the runtime still requires a user gesture, the buttons remain available.
  // Without an access code the voice can't start, so stay on the page to let the player enter it.
  const needsCode = conversation.configured && !conversation.accessCode;
  if (params.get('app') === 'quest' && (caps.ar || caps.vr) && !needsCode) {
    xr.start(params.get('mode') === 'mr' ? 'mr' : 'vr')
      .then(() => document.body.classList.add('in-xr'))
      .catch(() => undefined);
  }
}

boot().catch((err) => {
  console.error(err);
  document.body.textContent = String(err);
});
