import type { ConversationEvent } from './behavior';

/**
 * Provider-agnostic voice session contract (implemented in Phase 2).
 * Adapters: Gemini Live (default, free tier), OpenAI Realtime, cascaded STT→LLM→TTS.
 * The rendering layer only ever sees these callbacks — never a provider SDK.
 */
export interface VoiceSession {
  start(): Promise<void>;
  /** Stop the character's current speech immediately and cancel the response. */
  interrupt(): void;
  close(): void;
  onEvent(fn: (event: ConversationEvent) => void): () => void;
  /** Live output level 0..1 of the character's voice, used to drive the mouth. */
  onOutputLevel(fn: (level: number) => void): () => void;
  onTranscript(fn: (t: { role: 'user' | 'character'; text: string; final: boolean }) => void): () => void;
}
