import * as THREE from 'three';
import type { BehaviorState } from '../../core/behavior';

export const damp = (current: number, target: number, rate: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-rate * dt));

/**
 * Turns neck/head/eyes of a rigged character toward a point on top of the
 * animated pose, with small idle wanders and state-specific offsets
 * (looking up-and-aside while thinking, an attentive nod while listening).
 * Works in world space relative to the character's facing (+Z), so it does
 * not depend on how each bone's local axes were authored.
 */
export class Gaze {
  readonly target = new THREE.Vector3(0, 1.1, 1.5);
  private yaw = 0;
  private pitch = 0;
  private wanderT = 0;
  private readonly wander = new THREE.Vector2();
  private readonly tmpV = new THREE.Vector3();
  private readonly tmpQ = new THREE.Quaternion();
  private readonly tmpQ2 = new THREE.Quaternion();
  private readonly rootQ = new THREE.Quaternion();
  private readonly up = new THREE.Vector3(0, 1, 0);
  private readonly right = new THREE.Vector3();
  /** Each turned bone's pose before the turn, restored before the next animation step. */
  private readonly rest = new Map<THREE.Object3D, THREE.Quaternion>();

  constructor(
    private readonly root: THREE.Object3D,
    private readonly head?: THREE.Object3D,
    private readonly neck?: THREE.Object3D,
    private readonly eyes: THREE.Object3D[] = [],
  ) {}

  /**
   * Undoes last frame's turn. Call before the animation mixer: bones a clip
   * does not key would otherwise keep turning further every frame.
   */
  restore(): void {
    for (const [b, q] of this.rest) b.quaternion.copy(q);
  }

  update(dt: number, time: number, state: BehaviorState): void {
    if (!this.head) return;
    this.root.getWorldQuaternion(this.rootQ);
    const headPos = this.head.getWorldPosition(this.tmpV.set(0, 0, 0));
    const dir = this.tmpV.copy(this.target).sub(headPos);
    dir.applyQuaternion(this.tmpQ.copy(this.rootQ).invert()); // into character space

    this.wanderT -= dt;
    if (this.wanderT <= 0) {
      this.wanderT = 1.5 + Math.random() * 3;
      this.wander.set((Math.random() - 0.5) * 0.12, (Math.random() - 0.5) * 0.06);
    }
    let yawT = Math.atan2(dir.x, dir.z) + this.wander.x;
    let pitchT = Math.atan2(dir.y, Math.hypot(dir.x, dir.z)) + this.wander.y;
    if (state === 'thinking') {
      yawT += 0.35;
      pitchT += 0.22 + Math.sin(time * 0.5) * 0.03;
    }
    if (state === 'listening') pitchT -= 0.04; // slight attentive nod
    yawT = THREE.MathUtils.clamp(yawT, -0.9, 0.9);
    pitchT = THREE.MathUtils.clamp(pitchT, -0.45, 0.35);
    this.yaw = damp(this.yaw, yawT, 5, dt);
    this.pitch = damp(this.pitch, pitchT, 5, dt);

    // World-space axes for the character: up and right.
    this.up.set(0, 1, 0).applyQuaternion(this.rootQ);
    this.right.set(1, 0, 0).applyQuaternion(this.rootQ);
    // Without eye bones the head and neck take the whole turn.
    const k = this.eyes.length ? 1 : 1 / 0.8;
    const share: Array<[THREE.Object3D | undefined, number]> = [
      [this.neck, 0.35 * k],
      [this.head, 0.45 * k],
    ];
    for (const [b, s] of share) if (b) this.rotateBoneWorld(b, this.yaw * s, -this.pitch * s);
    // Eyes take the remaining 20%, a little faster.
    for (const eye of this.eyes) this.rotateBoneWorld(eye, this.yaw * 0.25, -this.pitch * 0.25);
  }

  /** Applies a yaw (about character up) then pitch (about character right) in world space. */
  private rotateBoneWorld(b: THREE.Object3D, yaw: number, pitch: number): void {
    const parent = b.parent;
    if (!parent) return;
    const rest = this.rest.get(b) ?? new THREE.Quaternion();
    this.rest.set(b, rest.copy(b.quaternion));
    const world = b.getWorldQuaternion(this.tmpQ);
    const delta = this.tmpQ2.setFromAxisAngle(this.up, yaw);
    delta.multiply(new THREE.Quaternion().setFromAxisAngle(this.right, pitch));
    world.premultiply(delta);
    const parentWorld = parent.getWorldQuaternion(new THREE.Quaternion());
    b.quaternion.copy(parentWorld.invert().multiply(world));
    b.updateMatrixWorld(true);
  }
}

/** Natural blinking: a quick close-open every 2.5–6.5 s. Returns 0 (open) … 1 (closed). */
export class Blinker {
  private next = 2;
  private t = -1;

  update(dt: number): number {
    this.next -= dt;
    if (this.t < 0 && this.next <= 0) {
      this.t = 0;
      this.next = 2.5 + Math.random() * 4;
    }
    if (this.t < 0) return 0;
    this.t += dt;
    const d = 0.16;
    if (this.t >= d) {
      this.t = -1;
      return 0;
    }
    return 1 - Math.abs(1 - (this.t / d) * 2);
  }
}
