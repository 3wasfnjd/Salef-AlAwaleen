import type { MessageKey } from './i18n';
import type { CharacterRig } from './scene/character/CharacterRig';
import { GlbElder } from './scene/character/GlbElder';
import { NawwaraRig } from './scene/character/NawwaraRig';
import { ProceduralElder } from './scene/character/ProceduralElder';
import type { VoiceTone } from './voice/AudioPlayer';

export type CharacterId = 'abu-nasser' | 'nawwara';

export interface CharacterDef {
  id: CharacterId;
  nameKey: MessageKey;
  /** Prebuilt voices offered for this character (the server allow-lists them too). */
  voices: readonly string[];
  defaultVoice: string;
  /** Playback colouring that suits the character. */
  tone: Exclude<VoiceTone, 'none'>;
  /** Sent once when a session starts so the character greets the player. */
  greeting: string;
  load(): Promise<CharacterRig>;
}

/**
 * Characters the player can talk to. Each has its own persona on the server
 * (persona/*.md), voices, tone and 3D rig; everything else is shared.
 */
export const CHARACTERS: Record<CharacterId, CharacterDef> = {
  'abu-nasser': {
    id: 'abu-nasser',
    nameKey: 'char.abu-nasser',
    voices: ['Algenib', 'Charon', 'Sadaltager', 'Enceladus', 'Orus', 'Iapetus', 'Schedar', 'Umbriel'],
    defaultVoice: 'Algenib',
    tone: 'elder',
    greeting: '(دخل الضيف المجلس الآن وجلس قدامك. رحّب به باختصار.)',
    async load() {
      try {
        return await GlbElder.load(new URL('models/shaib.glb', document.baseURI).href);
      } catch (err) {
        console.warn('Elder model failed to load, using procedural fallback', err);
        return new ProceduralElder();
      }
    },
  },
  nawwara: {
    id: 'nawwara',
    nameKey: 'char.nawwara',
    voices: ['Leda', 'Laomedeia', 'Zephyr', 'Autonoe', 'Achernar', 'Aoede', 'Puck'],
    defaultVoice: 'Leda',
    tone: 'child',
    greeting: '(جاء صديقك الآن. رحّبي به بفرح وبجملة قصيرة.)',
    load: async () => new NawwaraRig(),
  },
};

export const CHARACTER_IDS = Object.keys(CHARACTERS) as CharacterId[];

export const isCharacterId = (v: unknown): v is CharacterId => typeof v === 'string' && v in CHARACTERS;
