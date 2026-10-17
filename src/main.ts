import './ui/style.css';
import type { BehaviorState, ConversationEvent } from './core/behavior';
import { t } from './i18n';
import { ProceduralElder } from './scene/character/ProceduralElder';
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

async function boot(): Promise<void> {
  const stage = document.getElementById('stage');
  const ui = document.getElementById('ui');
  if (!stage || !ui) throw new Error('Missing #stage or #ui');

  const app = new SceneApp(stage);
  const params = new URLSearchParams(location.search);
  if (params.get('character') === 'procedural') app.setCharacter(new ProceduralElder());
  else void app.loadCharacter(new URL('models/shaib.glb', document.baseURI).href);
  const caps = await XRExperience.capabilities();
  const xr = new XRExperience(app, caps, {
    onSessionEnd: () => document.body.classList.remove('in-xr'),
  });

  const overlay = new Overlay(ui, caps, {
    enterXR: (mode) => {
      xr.start(mode)
        .then(() => document.body.classList.add('in-xr'))
        .catch((err: unknown) => overlay.showError(t('xr.sessionError', { error: String((err as Error)?.message ?? err) })));
    },
    previewState: (state) => {
      const now = performance.now();
      app.behavior.dispatch({ type: 'reset' }, now);
      for (const event of PREVIEW_PATH[state]) app.behavior.dispatch(event, now);
    },
  });

  // Debug handle for automated render checks (?debug).
  if (params.has('debug')) Object.assign(window, { __salef: app });

  // The packaged Quest app (immersive mode) asks to enter XR straight away.
  // If the runtime still requires a user gesture, the buttons remain available.
  if (params.get('app') === 'quest' && (caps.ar || caps.vr)) {
    xr.start(params.get('mode') === 'mr' ? 'mr' : 'vr')
      .then(() => document.body.classList.add('in-xr'))
      .catch(() => undefined);
  }
}

boot().catch((err) => {
  console.error(err);
  document.body.textContent = String(err);
});
