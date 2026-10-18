import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { Companion, shortestAngle } from '../src/xr/Companion';
import { Room } from '../src/xr/room';

const head = (x: number, z: number) => new THREE.Vector3(x, 1.6, z);
const run = (c: Companion, seconds: number, path: (t: number) => THREE.Vector3, t0 = 0, room?: Room) => {
  const dt = 1 / 72;
  for (let t = 0; t < seconds; t += dt) c.update(dt, path(t0 + t), room);
};

describe('Companion', () => {
  it('walks beside the player as they walk forward, then stops and faces them', () => {
    const c = new Companion();
    c.reset(new THREE.Vector3(0, 0, -1.5), 0, head(0, 0), new THREE.Vector3(0, 0, -1));
    let maxSpeed = 0;
    const dt = 1 / 72;
    // Player walks 4 m toward -Z at 0.8 m/s.
    for (let t = 0; t < 5; t += dt) {
      c.update(dt, head(0, -0.8 * t));
      maxSpeed = Math.max(maxSpeed, c.speed);
    }
    expect(maxSpeed).toBeGreaterThan(0.5);
    // Player stands still at z = -4.
    run(c, 4, () => head(0, -4));
    expect(c.speed).toBeLessThan(0.05);
    // He ends up to the player's right (+X when walking toward -Z), roughly level with them.
    expect(c.position.x).toBeGreaterThan(0.4);
    expect(Math.abs(c.position.z - -4)).toBeLessThan(0.7);
    // Facing the player.
    const facing = Math.atan2(0 - c.position.x, -4 - c.position.z);
    expect(Math.abs(shortestAngle(c.yaw, facing))).toBeLessThan(0.2);
  });

  it('does not chase head turns while the player stands still', () => {
    const c = new Companion();
    c.reset(new THREE.Vector3(0.75, 0, -0.25), 0, head(0, 0), new THREE.Vector3(0, 0, -1));
    run(c, 3, () => head(0, 0));
    const before = c.position.clone();
    run(c, 3, () => head(0, 0)); // standing still: nothing changes regardless of gaze
    expect(c.position.distanceTo(before)).toBeLessThan(0.01);
  });

  it('keeps personal space', () => {
    const c = new Companion();
    c.reset(new THREE.Vector3(0.1, 0, 0), 0, head(0, 0), new THREE.Vector3(0, 0, -1));
    c.update(1 / 72, head(0, 0));
    expect(Math.hypot(c.position.x, c.position.z)).toBeGreaterThanOrEqual(0.55 - 1e-6);
  });

  it('walks on the free side and never through a wall', () => {
    // Corridor along -Z between walls at x = -1.4 and x = 1.2; the player hugs
    // the right wall (x = 0.9), so there is no room on their right.
    const room = new Room(0.25);
    room.geometry = {
      floorY: 0,
      floor: null,
      walls: [
        { a: { x: 1.2, z: 2 }, b: { x: 1.2, z: -8 } },
        { a: { x: -1.4, z: 2 }, b: { x: -1.4, z: -8 } },
      ],
      obstacles: [],
    };
    const c = new Companion();
    c.reset(new THREE.Vector3(0, 0, -1), 0, head(0.9, 0), new THREE.Vector3(0, 0, -1));
    const dt = 1 / 72;
    for (let t = 0; t < 6; t += dt) {
      c.update(dt, head(0.9, -0.7 * t), room);
      expect(c.position.x).toBeLessThan(1.2 - 0.2); // never through/into the right wall
      expect(c.position.x).toBeGreaterThan(-1.4 + 0.2);
    }
    run(c, 3, () => head(0.9, -4.2), 0, room);
    // He settles on the player's left, the free side.
    expect(c.position.x).toBeLessThan(0.9);
  });

  it('computes shortest angles across ±π', () => {
    expect(shortestAngle(3, -3)).toBeCloseTo(2 * Math.PI - 6);
    expect(shortestAngle(0, 1)).toBeCloseTo(1);
  });

  it('keeps up across a furnished room and past the scanned floor', () => {
    const room = new Room();
    const box = (x0: number, z0: number, x1: number, z1: number) => [
      { x: x0, z: z0 },
      { x: x1, z: z0 },
      { x: x1, z: z1 },
      { x: x0, z: z1 },
    ];
    // 4 × 4 m scanned floor; a long table and a couch across the way.
    room.geometry = {
      floorY: 0,
      floor: box(-2, 2, 2, -2),
      walls: [{ a: { x: -8, z: -8 }, b: { x: 8, z: -8 } }],
      obstacles: [box(-1.5, -1.0, 1.5, -1.6), box(-1.2, -2.6, 1.2, -3.2)],
      obstacleHeights: [0.75, 0.45],
    };
    const c = new Companion();
    c.reset(new THREE.Vector3(0.8, 0, 0.5), 0, head(0, 0), new THREE.Vector3(0, 0, -1));
    // The player walks around the table's end, then on out of the scanned area.
    const path = (t: number) => (t < 3 ? head(-2 * (t / 3), 0) : head(-2, -5 * Math.min(1, (t - 3) / 6)));
    run(c, 9, path, 0, room.forWalking());
    run(c, 3, () => head(-2, -5), 0, room.forWalking());
    const p = c.position;
    expect(Math.hypot(p.x - -2, p.z - -5)).toBeLessThan(1.3); // beside the player again
    expect(room.forWalking().isBlocked({ x: p.x, z: p.z })).toBe(false); // not inside furniture
  });

  it('hops to the player when a table keeps him from getting there', () => {
    const room = new Room();
    // A wide table between him and the player.
    room.geometry = {
      floorY: 0,
      floor: null,
      walls: [],
      obstacles: [
        [
          { x: -3, z: -0.8 },
          { x: 3, z: -0.8 },
          { x: 3, z: -1.4 },
          { x: -3, z: -1.4 },
        ],
      ],
    };
    const c = new Companion();
    c.reset(new THREE.Vector3(0, 0, -2.2), 0, head(0, 0), new THREE.Vector3(0, 0, 1));
    let hopped = false;
    const dt = 1 / 72;
    for (let t = 0; t < 4; t += dt) {
      c.update(dt, head(0, 0), room);
      hopped ||= c.hopped;
    }
    expect(hopped).toBe(true);
    expect(c.position.z).toBeGreaterThan(-0.8); // on the player's side of the table
    expect(room.isBlocked({ x: c.position.x, z: c.position.z })).toBe(false);
  });
});
