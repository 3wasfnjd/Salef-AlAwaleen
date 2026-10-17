import { Emitter } from './emitter';

/**
 * Character behaviour states. These are driven by conversation events
 * (from the voice session in Phase 2) and consumed by any CharacterRig.
 */
export type BehaviorState =
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'storytelling'
  | 'reacting'
  | 'interrupted';

/** Conversation events that move the character between states. */
export type ConversationEvent =
  | { type: 'userStartedSpeaking' }
  | { type: 'userStoppedSpeaking' }
  | { type: 'responseStarted'; story: boolean }
  | { type: 'responseFinished' }
  | { type: 'responseCancelled' }
  | { type: 'react' }
  | { type: 'reset' };

/** How long the transient states last before falling back. */
export const TRANSIENT_MS = { interrupted: 600, reacting: 1200 } as const;

const ALLOWED: Record<BehaviorState, ReadonlyArray<ConversationEvent['type']>> = {
  idle: ['userStartedSpeaking', 'responseStarted', 'react', 'reset'],
  listening: ['userStoppedSpeaking', 'responseStarted', 'reset'],
  thinking: ['userStartedSpeaking', 'responseStarted', 'responseCancelled', 'reset'],
  // responseStarted while speaking upgrades a long reply to storytelling.
  speaking: ['userStartedSpeaking', 'responseStarted', 'responseFinished', 'responseCancelled', 'reset'],
  storytelling: ['userStartedSpeaking', 'responseFinished', 'responseCancelled', 'reset'],
  reacting: ['userStartedSpeaking', 'responseStarted', 'reset'],
  interrupted: ['userStoppedSpeaking', 'responseStarted', 'reset'],
};

type Events = { change: { from: BehaviorState; to: BehaviorState } };

/**
 * Deterministic behaviour state machine. Time is passed in explicitly
 * (`update(nowMs)`) so it is fully testable and frame-loop friendly.
 */
export class BehaviorMachine extends Emitter<Events> {
  private current: BehaviorState = 'idle';
  private enteredAt = 0;
  /** True when the user cut the character off and is still talking. */
  private userTalkingAfterInterrupt = false;

  get state(): BehaviorState {
    return this.current;
  }

  dispatch(event: ConversationEvent, nowMs: number): BehaviorState {
    if (!ALLOWED[this.current].includes(event.type)) return this.current;
    switch (event.type) {
      case 'userStartedSpeaking':
        if (this.current === 'speaking' || this.current === 'storytelling') {
          this.userTalkingAfterInterrupt = true;
          this.set('interrupted', nowMs);
        } else {
          this.set('listening', nowMs);
        }
        break;
      case 'userStoppedSpeaking':
        this.userTalkingAfterInterrupt = false;
        this.set('thinking', nowMs);
        break;
      case 'responseStarted':
        this.set(event.story ? 'storytelling' : 'speaking', nowMs);
        break;
      case 'responseFinished':
      case 'responseCancelled':
        this.set('idle', nowMs);
        break;
      case 'react':
        this.set('reacting', nowMs);
        break;
      case 'reset':
        this.userTalkingAfterInterrupt = false;
        this.set('idle', nowMs);
        break;
    }
    return this.current;
  }

  /** Advances transient states (interrupted → listening, reacting → idle). */
  update(nowMs: number): void {
    const elapsed = nowMs - this.enteredAt;
    if (this.current === 'interrupted' && elapsed >= TRANSIENT_MS.interrupted) {
      this.set(this.userTalkingAfterInterrupt ? 'listening' : 'idle', nowMs);
    } else if (this.current === 'reacting' && elapsed >= TRANSIENT_MS.reacting) {
      this.set('idle', nowMs);
    }
  }

  private set(to: BehaviorState, nowMs: number): void {
    if (to === this.current) return;
    const from = this.current;
    this.current = to;
    this.enteredAt = nowMs;
    this.emit('change', { from, to });
  }
}
