import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { Companion, shortestAngle } from '../src/xr/Companion';

const head = (x: number, z: number) => new THREE.Vector3(x, 1.6, z);
const run = (c: Companion, seconds: number, path: (t: number) => THREE.Vector3, t0 = 0) => {
  const dt = 1 / 72;
  for (let t = 0; t < seconds; t += dt) c.update(dt, path(t0 + t));
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

  it('computes shortest angles across ±π', () => {
    expect(shortestAngle(3, -3)).toBeCloseTo(2 * Math.PI - 6);
    expect(shortestAngle(0, 1)).toBeCloseTo(1);
  });
});
