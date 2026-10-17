import type * as THREE from 'three';
import type { BehaviorState } from '../../core/behavior';

export type Expression = 'neutral' | 'smile' | 'surprised' | 'thoughtful';
export type Gesture = 'none' | 'explain' | 'point' | 'beard';
export type Posture = 'seated' | 'standing';

/**
 * Contract between the conversation/behaviour layer and any character model.
 * The procedural elder implements it now; a rigged GLB/glTF model will
 * implement the same interface later without touching the conversation code.
 */
export interface CharacterRig {
  readonly object: THREE.Object3D;
  setState(state: BehaviorState): void;
  /** 0 (closed) … 1 (fully open). Driven by the real output audio level. */
  setMouthOpen(amount: number): void;
  /** World-space point the character should look at (usually the player's head). */
  lookAt(target: THREE.Vector3): void;
  gesture(g: Gesture): void;
  /** Seated in the majlis, or standing (to walk along in mixed reality). */
  setPosture(p: Posture): void;
  /** Walking speed in m/s while standing (0 = standing still). */
  setLocomotion(speed: number): void;
  setExpression(e: Expression): void;
  update(dtSeconds: number, timeSeconds: number): void;
  dispose(): void;
}
