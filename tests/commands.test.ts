import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { CHARACTER_TOOLS } from '../server/src/tools';
import { COMMAND_ENUMS, parseCommand } from '../src/core/commands';
import { Companion } from '../src/xr/Companion';
import { FlyCompanion } from '../src/xr/FlyCompanion';

const dt = 1 / 72;
const head = new THREE.Vector3(0, 1.6, 0);
const ahead = new THREE.Vector3(0, 0, -1);

describe('voice commands', () => {
  it('client and server declare the same commands and values', () => {
    const server = Object.fromEntries(
      CHARACTER_TOOLS.map((t) => {
        const [key, prop] = Object.entries(t.parameters.properties)[0];
        return [t.name, { key, values: [...prop.enum] }];
      }),
    );
    const client = Object.fromEntries(Object.entries(COMMAND_ENUMS).map(([n, s]) => [n, { key: s.key, values: [...s.values] }]));
    expect(server).toEqual(client);
  });

  it('accepts only known commands and values', () => {
    expect(parseCommand('gesture', { gesture: 'dance' })).toEqual({ name: 'gesture', value: 'dance' });
    expect(parseCommand('move', { action: 'come' })).toEqual({ name: 'move', value: 'come' });
    expect(parseCommand('gesture', { gesture: 'backflip' })).toBeNull();
    expect(parseCommand('gesture', {})).toBeNull();
    expect(parseCommand('delete_everything', { x: 1 })).toBeNull();
    expect(parseCommand('move', null)).toBeNull();
  });
});

describe('walking companion commands', () => {
  const start = () => {
    const c = new Companion();
    c.reset(new THREE.Vector3(0.8, 0, 0), 0, head, ahead);
    return c;
  };
  const run = (c: Companion, seconds: number, h = head) => {
    for (let t = 0; t < seconds; t += dt) c.update(dt, h);
  };

  it('come: walks to just in front of the player and waits there', () => {
    const c = start();
    c.command('come', head, ahead);
    run(c, 4);
    expect(c.position.distanceTo(new THREE.Vector3(0, 0, -0.95))).toBeLessThan(0.3);
    expect(c.speed).toBeLessThan(0.05);
  });

  it('stay: waits while the player walks away; follow: catches up', () => {
    const c = start();
    c.command('stay', head, ahead);
    const away = new THREE.Vector3(0, 1.6, -2.5);
    run(c, 3, away);
    expect(c.position.distanceTo(new THREE.Vector3(0.8, 0, 0))).toBeLessThan(0.1);
    c.command('follow', away, ahead);
    run(c, 5, away);
    expect(Math.hypot(c.position.x - away.x, c.position.z - away.z)).toBeLessThan(1.1);
  });

  it('circle: walks once around the player, then follows again', () => {
    const c = start();
    c.command('circle', head, ahead);
    const seen = new Set<number>();
    for (let t = 0; t < 8; t += dt) {
      c.update(dt, head);
      seen.add(Math.floor(((Math.atan2(c.position.x, c.position.z) + Math.PI) / (Math.PI * 2)) * 8));
    }
    expect(seen.size).toBeGreaterThanOrEqual(7); // went (nearly) all the way round
    run(c, 1);
    expect(c.currentMode).toBe('follow');
  });
});

describe('flying companion commands', () => {
  const start = () => {
    const f = new FlyCompanion();
    f.reset(new THREE.Vector3(0.3, 1.1, -1.4), ahead);
    return f;
  };

  it('come: flies in close but never into the face', () => {
    const f = start();
    f.command('come', head);
    let min = Infinity;
    for (let t = 0; t < 4; t += dt) {
      f.update(dt, head, ahead);
      min = Math.min(min, f.position.distanceTo(head));
    }
    expect(f.position.distanceTo(head)).toBeLessThan(1.2);
    expect(min).toBeGreaterThanOrEqual(0.9 - 1e-6);
  });

  it('stay: hovers where she is', () => {
    const f = start();
    for (let t = 0; t < 2; t += dt) f.update(dt, head, ahead);
    const here = f.position.clone();
    f.command('stay', head);
    for (let t = 0; t < 4; t += dt) f.update(dt, new THREE.Vector3(2, 1.6, 2), new THREE.Vector3(1, 0, 0));
    expect(Math.hypot(f.position.x - here.x, f.position.z - here.z)).toBeLessThan(0.15);
  });

  it('circle: flies all the way around the player', () => {
    const f = start();
    f.command('circle', head);
    const seen = new Set<number>();
    for (let t = 0; t < 7; t += dt) {
      f.update(dt, head, ahead);
      seen.add(Math.floor(((Math.atan2(f.position.x, f.position.z) + Math.PI) / (Math.PI * 2)) * 8));
    }
    expect(seen.size).toBeGreaterThanOrEqual(7);
  });
});
