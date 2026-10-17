import * as THREE from 'three';
import { shortestAngle } from './Companion';
import { Room } from './room';

export interface FlyOptions {
  /** Preferred horizontal distance from the player's head (metres). */
  distance: number;
  /** Never closer than this to the player's head (3D). */
  minDistance: number;
  /** Rig origin height relative to the player's eyes (her body sits ~0.3 m above it). */
  heightBelowEyes: number;
  /** How far left/right of straight ahead she roams (radians). */
  roam: number;
  maxSpeed: number;
  /** How quickly her "front" follows where the player looks (1/s). */
  headingRate: number;
}

const DEFAULTS: FlyOptions = {
  distance: 1.4,
  minDistance: 0.9,
  heightBelowEyes: 0.55,
  roam: 0.6,
  maxSpeed: 1.6,
  headingRate: 1.2,
};

/**
 * Flying companion for mixed reality: a small character that hovers and
 * roams in front of the player (a lazy figure-eight with a gentle bob), keeps
 * a comfortable distance from their face, always faces them, and stays out
 * of walls and tall furniture (pass `room.forFlight(height)`). Pure logic, unit-tested.
 */
export class FlyCompanion {
  readonly position = new THREE.Vector3();
  yaw = 0;
  speed = 0;
  private readonly velocity = new THREE.Vector3();
  private readonly heading = new THREE.Vector3(0, 0, -1);
  private t = 0;
  private readonly opts: FlyOptions;

  constructor(options: Partial<FlyOptions> = {}) {
    this.opts = { ...DEFAULTS, ...options };
  }

  reset(position: THREE.Vector3, lookForward: THREE.Vector3): void {
    this.position.copy(position);
    this.velocity.set(0, 0, 0);
    this.speed = 0;
    this.heading.set(lookForward.x, 0, lookForward.z);
    if (this.heading.lengthSq() < 1e-6) this.heading.set(0, 0, -1);
    this.heading.normalize();
  }

  /** The spot she is drifting toward this frame (exposed for tests). */
  readonly target = new THREE.Vector3();

  update(dt: number, head: THREE.Vector3, lookForward: THREE.Vector3, room: Room = new Room()): void {
    if (dt <= 0) return;
    const o = this.opts;
    this.t += dt;

    // Her "front" slowly turns toward where the player looks (by angle, so a full turn-around works).
    if (lookForward.x * lookForward.x + lookForward.z * lookForward.z > 1e-6) {
      const current = Math.atan2(this.heading.x, this.heading.z);
      const wanted = Math.atan2(lookForward.x, lookForward.z);
      const a = current + shortestAngle(current, wanted) * Math.min(1, dt * o.headingRate);
      this.heading.set(Math.sin(a), 0, Math.cos(a));
    }

    // Lazy figure-eight in front of the player, with a bob.
    const t = this.t;
    let theta = Math.sin(t * 0.35) * o.roam + Math.sin(t * 0.9) * 0.15;
    const r0 = o.distance + Math.sin(t * 0.5) * 0.2;
    const y = head.y - o.heightBelowEyes + Math.sin(t * 0.7) * 0.12;
    const spot = (angle: number, r: number) => {
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      // Rotate the heading around +Y by angle.
      const dx = this.heading.x * c + this.heading.z * s;
      const dz = -this.heading.x * s + this.heading.z * c;
      return { x: head.x + dx * r, z: head.z + dz * r };
    };
    const from = { x: head.x, z: head.z };
    let goal = spot(theta, r0);
    if (room.known && (room.isBlocked(goal) || room.crosses(from, goal))) {
      // Try closer, then the other side, then closer on the other side.
      // Last resort: come in close on whichever side she is now, so she never just waits behind.
      const bearing = Math.atan2(this.position.x - head.x, this.position.z - head.z);
      const near = o.minDistance + 0.1;
      const beside = { x: head.x + Math.sin(bearing) * near, z: head.z + Math.cos(bearing) * near };
      const options = [
        spot(theta, r0 * 0.8),
        spot(-theta, r0),
        spot(-theta, r0 * 0.8),
        spot(0, near),
        spot(0.9, near),
        spot(-0.9, near),
        beside,
        spot(Math.PI / 2, near),
        spot(-Math.PI / 2, near),
      ];
      const free = room.firstFree(options, from);
      if (free) goal = free;
      else goal = { x: this.position.x, z: this.position.z };
      theta = -theta;
    }
    this.target.set(goal.x, y, goal.z);

    // Spring toward the target, capped speed: smooth, floaty flight.
    const toTarget = new THREE.Vector3().subVectors(this.target, this.position);
    const desired = toTarget.multiplyScalar(2.2);
    if (desired.length() > o.maxSpeed) desired.setLength(o.maxSpeed);
    this.velocity.lerp(desired, Math.min(1, dt * 3));
    const next = this.position.clone().addScaledVector(this.velocity, dt);
    const stepped = room.step({ x: this.position.x, z: this.position.z }, { x: next.x, z: next.z });
    next.x = stepped.x;
    next.z = stepped.z;

    // Keep her away from the player's face.
    const away = new THREE.Vector3().subVectors(next, head);
    if (away.length() < o.minDistance) {
      if (away.lengthSq() < 1e-6) away.copy(this.heading);
      next.copy(head).addScaledVector(away.normalize(), o.minDistance);
    }
    this.speed = next.distanceTo(this.position) / dt;
    this.position.copy(next);

    // Always face the player.
    this.yaw = Math.atan2(head.x - this.position.x, head.z - this.position.z);
  }
}
