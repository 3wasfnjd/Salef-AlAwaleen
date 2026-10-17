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
});
