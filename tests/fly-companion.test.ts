import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { FlyCompanion } from '../src/xr/FlyCompanion';
import { Room } from '../src/xr/room';

const dt = 1 / 72;
const head = new THREE.Vector3(0, 1.6, 0);
const ahead = new THREE.Vector3(0, 0, -1);

describe('FlyCompanion', () => {
  it('roams in front of the player at a comfortable distance and height, facing them', () => {
    const f = new FlyCompanion();
    f.reset(new THREE.Vector3(0, 1, -1.4), ahead);
    let minDist = Infinity;
    let minX = Infinity;
    let maxX = -Infinity;
    for (let t = 0; t < 20; t += dt) {
      f.update(dt, head, ahead);
      if (t > 3) {
        minDist = Math.min(minDist, f.position.distanceTo(head));
        minX = Math.min(minX, f.position.x);
        maxX = Math.max(maxX, f.position.x);
        expect(f.position.z).toBeLessThan(-0.5); // stays in front
        expect(f.position.y).toBeGreaterThan(0.8);
        expect(f.position.y).toBeLessThan(1.4);
      }
    }
    expect(minDist).toBeGreaterThanOrEqual(0.9 - 1e-6); // never in the player's face
    expect(maxX - minX).toBeGreaterThan(0.8); // she actually roams side to side
    const facing = Math.atan2(head.x - f.position.x, head.z - f.position.z);
    expect(Math.abs(f.yaw - facing)).toBeLessThan(1e-6);
  });

  it('follows when the player turns around', () => {
    const f = new FlyCompanion();
    f.reset(new THREE.Vector3(0, 1, -1.4), ahead);
    for (let t = 0; t < 8; t += dt) f.update(dt, head, new THREE.Vector3(0, 0, 1));
    expect(f.position.z).toBeGreaterThan(0.5);
  });

  it('stays out of a wall right in front of the player', () => {
    const room = new Room(0.2);
    room.geometry = { floorY: 0, floor: null, walls: [{ a: { x: -5, z: -1.2 }, b: { x: 5, z: -1.2 } }], obstacles: [] };
    const f = new FlyCompanion();
    f.reset(new THREE.Vector3(0.3, 1, -0.9), ahead);
    for (let t = 0; t < 15; t += dt) {
      f.update(dt, head, ahead, room);
      expect(f.position.z).toBeGreaterThan(-1.2); // never on/through the wall
    }
  });

  it('follows the player walking across a furnished room and past the scanned floor', () => {
    const room = new Room(0.2);
    // 4 × 4 m scanned floor, a table (0.75 m) and a couch (0.45 m) in the way, walls far off.
    room.geometry = {
      floorY: 0,
      floor: [
        { x: -2, z: 2 },
        { x: 2, z: 2 },
        { x: 2, z: -2 },
        { x: -2, z: -2 },
      ],
      walls: [{ a: { x: -6, z: -6 }, b: { x: 6, z: -6 } }],
      obstacles: [
        [
          { x: -0.6, z: -0.8 },
          { x: 0.6, z: -0.8 },
          { x: 0.6, z: -1.6 },
          { x: -0.6, z: -1.6 },
        ],
        [
          { x: -1, z: -2.4 },
          { x: 1, z: -2.4 },
          { x: 1, z: -3.2 },
          { x: -1, z: -3.2 },
        ],
      ],
      obstacleHeights: [0.75, 0.45],
    };
    const f = new FlyCompanion();
    const walker = head.clone();
    f.reset(new THREE.Vector3(0, 1, -1.4), ahead);
    // Walk 4 m forward (out of the scanned floor) at 0.6 m/s.
    for (let t = 0; t < 12; t += dt) {
      if (walker.z > -4) walker.z -= 0.6 * dt;
      f.update(dt, walker, ahead, room.forFlight(f.position.y - 0.1));
    }
    expect(walker.z).toBeLessThanOrEqual(-4);
    expect(f.position.z).toBeLessThan(walker.z - 0.5); // still in front of the player
    expect(f.position.distanceTo(walker)).toBeLessThan(2.2);
  });

  it('flight room keeps walls and tall furniture only', () => {
    const room = new Room(0.2);
    const box = (x: number) => [
      { x, z: 0 },
      { x: x + 1, z: 0 },
      { x: x + 1, z: 1 },
      { x, z: 1 },
    ];
    room.geometry = { floorY: 0, floor: box(-5), walls: [{ a: { x: 0, z: 0 }, b: { x: 1, z: 0 } }], obstacles: [box(0), box(3)], obstacleHeights: [0.7, 1.8] };
    const flight = room.forFlight(1);
    expect(flight.geometry.floor).toBeNull();
    expect(flight.geometry.walls).toHaveLength(1);
    expect(flight.geometry.obstacles).toEqual([box(3)]);
  });

  it('never freezes when it ends up too close to a wall', () => {
    const room = new Room(0.2);
    room.geometry = { floorY: 0, floor: null, walls: [{ a: { x: -5, z: -1.5 }, b: { x: 5, z: -1.5 } }], obstacles: [] };
    // Moving away from the wall is allowed even though it starts inside the margin.
    const moved = room.step({ x: 0, z: -1.4 }, { x: 0, z: -1.3 });
    expect(moved.z).toBeCloseTo(-1.3);
    // Moving deeper toward it is not.
    expect(room.step({ x: 0, z: -1.4 }, { x: 0, z: -1.45 }).z).toBeCloseTo(-1.4);
  });
});
