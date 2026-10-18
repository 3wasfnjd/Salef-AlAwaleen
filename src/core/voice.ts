import type { ConversationEvent } from './behavior';

export type VoiceStatus =
  | { kind: 'idle' }
  | { kind: 'connecting' }
  | { kind: 'ready' }
  | { kind: 'reconnecting'; attempt: number }
  | { kind: 'error'; code: VoiceErrorCode }
  | { kind: 'closed' };

export type VoiceErrorCode =
  | 'mic_denied'
  | 'mic_unavailable'
  | 'invalid_code'
  | 'rate_limited'
  | 'server_not_configured'
  | 'server_unreachable'
  | 'upstream'
  | 'connection_lost';

export interface Transcript {
  role: 'user' | 'character';
  text: string;
  final: boolean;
}

/**
 * Interruption handling:
 * - `auto`: full duplex; speaking over the elder interrupts him (needs good
 *   echo cancellation on the device).
 * - `tap`: the mic is paused while he speaks; the player taps / presses to
 *   cut him off. For devices where his own voice would trigger interruptions.
 */
export type InterruptMode = 'auto' | 'tap';

/**
 * Provider-agnostic voice session contract. Adapters: Gemini Live (default,
 * free tier); later OpenAI Realtime or a cascaded STT→LLM→TTS pipeline.
 * The rendering layer only sees these events — never a provider SDK.
 */
export interface VoiceSession {
  /** Must be called from a user gesture (unlocks audio on iOS). */
  start(): Promise<void>;
  /** Stops the elder's current speech immediately and drops the rest of the reply. */
  interrupt(): void;
  close(): void;
  setInterruptMode(mode: InterruptMode): void;
  setTone(tone: 'elder' | 'child' | 'alien' | 'none'): void;
  onEvent(fn: (event: ConversationEvent) => void): () => void;
  onStatus(fn: (status: VoiceStatus) => void): () => void;
  onTranscript(fn: (t: Transcript) => void): () => void;
  /** Live output level 0..1 of the elder's voice, polled every frame for the mouth. */
  outputLevel(): number;
}
