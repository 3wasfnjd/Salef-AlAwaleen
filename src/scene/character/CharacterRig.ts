import type * as THREE from 'three';
import type { BehaviorState } from '../../core/behavior';
import type { GestureName } from '../../core/commands';

export type Expression = 'neutral' | 'smile' | 'surprised' | 'thoughtful';
export type Gesture = 'none' | 'explain' | 'point' | 'beard';
export type Posture = 'seated' | 'standing' | 'flying';

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
  /** Seated in the majlis, standing (walking along in MR) or flying (characters that can). */
  setPosture(p: Posture): void;
  /** Walking speed in m/s while standing (0 = standing still). */
  setLocomotion(speed: number): void;
  setExpression(e: Expression): void;
  /**
   * Plays a body gesture the player asked for. Returns false if this rig
   * cannot do it right now (spin is done by the caller for every rig).
   */
  perform?(g: Exclude<GestureName, 'spin'>): boolean;
  update(dtSeconds: number, timeSeconds: number): void;
  dispose(): void;
}
