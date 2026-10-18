import * as THREE from 'three';
import { Room } from './room';

export interface CompanionOptions {
  /** Where he walks relative to the player's walking direction (metres). */
  side: number;
  ahead: number;
  /** Hysteresis: start walking beyond `start`, stop within `stop` of his spot. */
  start: number;
  stop: number;
  maxSpeed: number;
  accel: number;
  /** Yaw follow rate (1/s). */
  turnRate: number;
  /** Never closer than this to the player's head (horizontal). */
  personalSpace: number;
  /** Player speed (m/s) above which their walking direction updates. */
  headingSpeed: number;
  /** Stuck (furniture in the way) this long, or this far behind: hop to his spot. */
  stuckFor: number;
  catchUpDistance: number;
}

const DEFAULTS: CompanionOptions = {
  side: 0.75,
  ahead: 0.25,
  start: 0.5,
  stop: 0.2,
  maxSpeed: 1.2,
  accel: 2.0,
  turnRate: 5,
  personalSpace: 0.55,
  headingSpeed: 0.25,
  stuckFor: 1.2,
  catchUpDistance: 3.5,
};

/**
 * "Walk with me" behaviour for mixed reality: the elder keeps a spot beside
 * the player, following their walking direction (not every head turn), and
 * stops and turns to face them when they stand still. Pure logic: feed it
 * the player's head pose each frame; read position / yaw / speed back.
 * Works on the floor plane. With a known `Room` he walks around walls and
 * furniture: his spot falls back to the other side / behind the player when
 * the preferred one is blocked, and each step slides along obstacles. If
 * furniture keeps him from getting there, he hops to his spot beside the
 * player rather than standing still behind it.
 */
export class Companion {
  readonly position = new THREE.Vector3();
  yaw = 0;
  speed = 0;
  private walking = false;
  private stuck = 0;
  /** True on the frame he hopped to catch up (for an effect or sound). */
  hopped = false;
  private readonly heading = new THREE.Vector3(0, 0, -1);
  private readonly lastHead = new THREE.Vector3();
  private hasLastHead = false;
  private readonly opts: CompanionOptions;
  private readonly tmp = new THREE.Vector3();
  private readonly target = new THREE.Vector3();

  constructor(options: Partial<CompanionOptions> = {}) {
    this.opts = { ...DEFAULTS, ...options };
  }

  /** Start from the elder's current spot, walking direction = where the player looks. */
  reset(position: THREE.Vector3, yaw: number, head: THREE.Vector3, lookForward: THREE.Vector3): void {
    this.position.set(position.x, 0, position.z);
    this.yaw = yaw;
    this.speed = 0;
    this.walking = false;
    this.heading.set(lookForward.x, 0, lookForward.z);
    if (this.heading.lengthSq() < 1e-6) this.heading.set(0, 0, -1);
    this.heading.normalize();
    this.lastHead.copy(head);
    this.hasLastHead = true;
  }

  update(dt: number, head: THREE.Vector3, room: Room = new Room()): void {
    if (dt <= 0) return;
    const o = this.opts;
    const floorHead = this.tmp.set(head.x, 0, head.z);

    // Walking direction follows how the player moves, not where they glance.
    if (this.hasLastHead) {
      const dx = head.x - this.lastHead.x;
      const dz = head.z - this.lastHead.z;
      const v = Math.hypot(dx, dz) / dt;
      if (v > o.headingSpeed) this.heading.lerp(new THREE.Vector3(dx, 0, dz).normalize(), Math.min(1, dt * 3)).normalize();
    }
    this.lastHead.copy(head);
    this.hasLastHead = true;

    // His spot: beside the player (to their right), slightly ahead; if a wall or
    // furniture is there, the left side, then behind, then where he stands.
    const right = new THREE.Vector3(-this.heading.z, 0, this.heading.x);
    const spot = (side: number, ahead: number) => ({
      x: floorHead.x + right.x * side + this.heading.x * ahead,
      z: floorHead.z + right.z * side + this.heading.z * ahead,
    });
    const here = { x: this.position.x, z: this.position.z };
    // A spot counts if it is free and the player could reach it: the path from
    // where *he* stands may be blocked by a table; he walks around or hops.
    const chosen =
      room.firstFree(
        [spot(o.side, o.ahead), spot(-o.side, o.ahead), spot(o.side, -0.6), spot(-o.side, -0.6), spot(0, -0.9)],
        { x: floorHead.x, z: floorHead.z },
      ) ?? here;
    this.target.set(chosen.x, 0, chosen.z);
    this.hopped = false;

    const toTarget = new THREE.Vector3().subVectors(this.target, this.position);
    const dist = toTarget.length();
    this.walking = dist > (this.walking ? o.stop : o.start);
    const desired = this.walking ? Math.min(o.maxSpeed, dist * 1.6 + 0.2) : 0;
    const dv = THREE.MathUtils.clamp(desired - this.speed, -o.accel * dt * 2, o.accel * dt);
    this.speed = Math.max(0, this.speed + dv);

    let desiredYaw: number;
    if (this.speed > 0.05 && dist > 1e-3) {
      const step = Math.min(dist, this.speed * dt);
      const dir = toTarget.normalize();
      const wanted = { x: here.x + dir.x * step, z: here.z + dir.z * step };
      // If he somehow starts inside an obstacle, let him walk out of it.
      const next = room.isBlocked(here) ? wanted : room.step(here, wanted);
      const progress = Math.hypot(next.x - here.x, next.z - here.z);
      this.stuck = progress < step * 0.3 ? this.stuck + dt : 0;
      this.position.set(next.x, 0, next.z);
      desiredYaw = Math.atan2(dir.x, dir.z);
      if (this.stuck > o.stuckFor || dist > o.catchUpDistance) {
        this.position.copy(this.target);
        this.stuck = 0;
        this.speed = 0;
        this.hopped = true;
      }
    } else {
      desiredYaw = Math.atan2(floorHead.x - this.position.x, floorHead.z - this.position.z);
    }

    // Personal space.
    const away = new THREE.Vector3().subVectors(this.position, floorHead);
    const gap = away.length();
    if (gap < o.personalSpace) {
      if (gap < 1e-4) away.copy(right);
      const pushed = floorHead.clone().addScaledVector(away.normalize(), o.personalSpace);
      if (!room.isBlocked({ x: pushed.x, z: pushed.z })) this.position.copy(pushed);
    }

    this.yaw += shortestAngle(this.yaw, desiredYaw) * Math.min(1, dt * o.turnRate);
  }
}

export function shortestAngle(from: number, to: number): number {
  let d = (to - from) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}
