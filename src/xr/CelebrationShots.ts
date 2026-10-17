/*
 * Celebration shots — bubbles, fireworks, water and confetti — for mixed reality.
 * Ported with the owner's authorization (Aboden Games, 2026-10-17) from
 * 3wasfnjd/Dahrooj-Quest@1c298fc: src/reference/xr-runtime.js (shot styles,
 * flight, firework bloom, sparks) and src/reference/celebration.js (confetti).
 * Water is new here. Rewritten for this app: one draw call per effect type,
 * room-aware collisions, and a hook when a shot reaches the character.
 */
import * as THREE from 'three';
import type { P2 } from './room';

export type ShotKind = 'bubble' | 'firework' | 'water' | 'confetti';
export const SHOT_KINDS: ShotKind[] = ['bubble', 'firework', 'water', 'confetti'];

interface ShotSpec {
  speed: number;
  /** Fraction of gravity (negative floats up, as Dahrooj's bubbles do). */
  grav: number;
  life: number;
  r: number;
  /** Seconds between shots while the trigger is held. */
  cool: number;
}

/** Bubble and firework values are Dahrooj's SHOT_STYLE; water and the confetti popper are tuned to match. */
export const SHOT_SPEC: Record<ShotKind, ShotSpec> = {
  bubble: { speed: 4.2, grav: -0.06, life: 3.6, r: 0.06, cool: 0.16 },
  firework: { speed: 20, grav: 0.35, life: 0.85, r: 0.025, cool: 0.2 },
  water: { speed: 7.5, grav: 1, life: 1.6, r: 0.015, cool: 0.03 },
  confetti: { speed: 8, grav: 0.4, life: 0.45, r: 0.03, cool: 0.45 },
};

const G = 9.8;
const FIRE_COLS = [0xe2603f, 0xf2c14e, 0x6fa8d6, 0x7bbf8a, 0xc9a2e6, 0xfffaf2];

export interface ShotWorld {
  floorY: number;
  /** True if moving from a to b (floor plane) crosses a wall or furniture. */
  crosses(a: P2, b: P2): boolean;
  /** Character centre in world space (for hits), or null. */
  target(): THREE.Vector3 | null;
}

export interface ShotEvents {
  sound(name: 'whoosh' | 'pop' | 'boom' | 'splash' | 'confetti', at: THREE.Vector3): void;
  hitCharacter(kind: ShotKind): void;
}

interface Shot {
  kind: ShotKind;
  p: THREE.Vector3;
  v: THREE.Vector3;
  t: number;
  wob: number;
}

interface Spark {
  p: THREE.Vector3;
  v: THREE.Vector3;
  c: THREE.Color;
  t: number;
  max: number;
  drag: number;
  grav: number;
}

function softDot(rgb: string, ring = false): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const c = canvas.getContext('2d')!;
  if (ring) {
    // Soap bubble: clear middle, rainbow rim, a white glint.
    const g = c.createRadialGradient(32, 32, 18, 32, 32, 31);
    g.addColorStop(0, 'rgba(255,255,255,0.04)');
    g.addColorStop(0.55, 'rgba(160,220,255,0.25)');
    g.addColorStop(0.8, 'rgba(255,170,230,0.6)');
    g.addColorStop(0.92, 'rgba(255,240,150,0.75)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = g;
    c.fillRect(0, 0, 64, 64);
    c.fillStyle = 'rgba(255,255,255,0.85)';
    c.beginPath();
    c.ellipse(22, 20, 7, 4, -0.6, 0, Math.PI * 2);
    c.fill();
  } else {
    const g = c.createRadialGradient(32, 32, 0, 32, 32, 31);
    g.addColorStop(0, `rgba(${rgb},1)`);
    g.addColorStop(0.4, `rgba(${rgb},0.8)`);
    g.addColorStop(1, `rgba(${rgb},0)`);
    c.fillStyle = g;
    c.fillRect(0, 0, 64, 64);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** A fixed-capacity point cloud; slots beyond `count` are parked out of sight. */
class PointPool {
  readonly points: THREE.Points;
  private readonly pos: THREE.BufferAttribute;
  private readonly col: THREE.BufferAttribute;
  count = 0;

  constructor(
    readonly capacity: number,
    material: THREE.PointsMaterial,
  ) {
    const geo = new THREE.BufferGeometry();
    this.pos = new THREE.BufferAttribute(new Float32Array(capacity * 3), 3);
    this.col = new THREE.BufferAttribute(new Float32Array(capacity * 3).fill(1), 3);
    this.pos.setUsage(THREE.DynamicDrawUsage);
    this.col.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute('position', this.pos);
    geo.setAttribute('color', this.col);
    geo.setDrawRange(0, 0);
    this.points = new THREE.Points(geo, material);
    this.points.frustumCulled = false;
  }

  begin(): void {
    this.count = 0;
  }

  add(p: THREE.Vector3, c?: THREE.Color): void {
    if (this.count >= this.capacity) return;
    this.pos.setXYZ(this.count, p.x, p.y, p.z);
    if (c) this.col.setXYZ(this.count, c.r, c.g, c.b);
    this.count++;
  }

  end(): void {
    this.points.geometry.setDrawRange(0, this.count);
    this.pos.needsUpdate = true;
    this.col.needsUpdate = true;
  }
}

/** Dahrooj's confetti: pooled instanced bursts of rainbow paper. */
class Confetti {
  private static readonly COUNT = 180;
  private static readonly DUR = 3.5;
  private readonly pool: Array<{
    mesh: THREE.InstancedMesh;
    rp: Float32Array;
    ang: Float32Array;
    qs: THREE.Quaternion[];
    t: number;
    active: boolean;
    radius: number;
    elev: number;
  }> = [];
  private readonly m4 = new THREE.Matrix4();
  private readonly pv = new THREE.Vector3();
  private readonly sv = new THREE.Vector3();

  constructor(scene: THREE.Object3D) {
    const geo = new THREE.PlaneGeometry(0.03, 0.06);
    const mat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    const cols = ['#ff4040', '#ff9638', '#ffe14a', '#46d56c', '#38baff', '#5754e8', '#b65bff'].map((c) => new THREE.Color(c));
    const eul = new THREE.Euler();
    for (let k = 0; k < 4; k++) {
      const mesh = new THREE.InstancedMesh(geo, mat, Confetti.COUNT);
      mesh.visible = false;
      mesh.frustumCulled = false;
      const rp = new Float32Array(Confetti.COUNT);
      const ang = new Float32Array(Confetti.COUNT);
      const qs: THREE.Quaternion[] = [];
      for (let i = 0; i < Confetti.COUNT; i++) {
        rp[i] = Math.random();
        ang[i] = Math.random() * Math.PI * 2;
        qs.push(new THREE.Quaternion().setFromEuler(eul.set(Math.random() * 6.283, Math.random() * 6.283, Math.random() * 6.283)));
        mesh.setColorAt(i, cols[i % cols.length]);
      }
      scene.add(mesh);
      this.pool.push({ mesh, rp, ang, qs, t: 0, active: false, radius: 1, elev: 1 });
    }
  }

  pop(at: THREE.Vector3, radius = 1.2, elevation = 1.1): void {
    const c = this.pool.find((x) => !x.active) ?? this.pool[0];
    c.active = true;
    c.t = 0;
    c.radius = radius;
    c.elev = elevation;
    c.mesh.position.copy(at);
    c.mesh.visible = true;
  }

  update(dt: number): void {
    const AMP = 0.7;
    const REST = 1 - AMP;
    for (const c of this.pool) {
      if (!c.active) continue;
      c.t += dt;
      const lin = Math.min(1, c.t / Confetti.DUR);
      const p = 1 - (1 - lin) * (1 - lin);
      for (let i = 0; i < Confetti.COUNT; i++) {
        const start = REST * c.rp[i];
        let pr = Math.max(0, Math.min(1, (p - start) / AMP));
        pr = 1 - Math.pow(1 - pr, 3);
        const sc = Math.min(1, (1 - Math.abs(pr - 0.5) * 2) * 20);
        const strength = (c.rp[i] * 99) % 1;
        this.pv.set(
          Math.sin(c.ang[i]) * pr * strength * c.radius,
          (1 - Math.pow(1 - pr * 2, 2)) * strength * c.elev,
          Math.cos(c.ang[i]) * pr * strength * c.radius,
        );
        this.sv.setScalar(Math.max(0.0001, sc));
        this.m4.compose(this.pv, c.qs[i], this.sv);
        c.mesh.setMatrixAt(i, this.m4);
      }
      c.mesh.instanceMatrix.needsUpdate = true;
      if (lin >= 1) {
        c.active = false;
        c.mesh.visible = false;
      }
    }
  }
}

export class CelebrationShots {
  readonly group = new THREE.Group();
  private readonly shots: Shot[] = [];
  private readonly sparks: Spark[] = [];
  private readonly rings: Array<{ mesh: THREE.Mesh; t: number }> = [];
  private readonly bubbles: PointPool;
  private readonly glows: PointPool;
  private readonly drops: PointPool;
  private readonly confetti: Confetti;
  private lastShot = new Map<unknown, number>();
  private clock = 0;
  private readonly tmp = new THREE.Vector3();

  constructor(
    private readonly world: ShotWorld,
    private readonly events: ShotEvents,
  ) {
    this.group.name = 'celebration-shots';
    this.bubbles = new PointPool(
      48,
      new THREE.PointsMaterial({ map: softDot('', true), size: 0.12, transparent: true, depthWrite: false, vertexColors: false }),
    );
    this.glows = new PointPool(
      512,
      new THREE.PointsMaterial({
        map: softDot('255,255,255'),
        size: 0.035,
        transparent: true,
        depthWrite: false,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      }),
    );
    this.drops = new PointPool(
      256,
      new THREE.PointsMaterial({ map: softDot('120,200,255'), size: 0.04, transparent: true, depthWrite: false, color: '#9ad8ff' }),
    );
    this.group.add(this.bubbles.points, this.glows.points, this.drops.points);
    for (let i = 0; i < 8; i++) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.06, 0.08, 24).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial({ color: '#bfe8ff', transparent: true, opacity: 0, depthWrite: false }),
      );
      ring.visible = false;
      this.group.add(ring);
      this.rings.push({ mesh: ring, t: 1 });
    }
    this.confetti = new Confetti(this.group);
  }

  /**
   * Fires from `origin` along `dir` if the hand's cooldown allows.
   * Returns true when something was fired (for haptics).
   */
  fire(kind: ShotKind, origin: THREE.Vector3, dir: THREE.Vector3, hand: unknown): boolean {
    const spec = SHOT_SPEC[kind];
    if (this.clock - (this.lastShot.get(hand) ?? -1) < spec.cool) return false;
    this.lastShot.set(hand, this.clock);
    if (this.shots.length >= 64) this.shots.shift();
    const start = origin.clone().addScaledVector(dir, 0.08);
    const n = kind === 'water' ? 2 : 1;
    for (let i = 0; i < n; i++) {
      const d = dir.clone();
      if (kind === 'water') d.add(new THREE.Vector3((Math.random() - 0.5) * 0.06, (Math.random() - 0.5) * 0.06, (Math.random() - 0.5) * 0.06)).normalize();
      this.shots.push({ kind, p: start.clone(), v: d.multiplyScalar(spec.speed), t: 0, wob: Math.random() * 6 });
    }
    if (kind !== 'bubble' && kind !== 'water') this.spark(start, new THREE.Vector3(), 0xffe9b0, 0.07, 0, 0, 1);
    this.events.sound(kind === 'water' ? 'splash' : kind === 'bubble' ? 'pop' : 'whoosh', start);
    return true;
  }

  update(dt: number): void {
    this.clock += dt;
    const floor = this.world.floorY;
    const target = this.world.target();
    for (let i = this.shots.length - 1; i >= 0; i--) {
      const s = this.shots[i];
      const spec = SHOT_SPEC[s.kind];
      s.t += dt;
      const prev = this.tmp.copy(s.p);
      const a = { x: prev.x, z: prev.z };
      s.v.y -= G * spec.grav * dt;
      if (s.kind === 'bubble') {
        s.wob += dt * 3;
        s.v.x += Math.sin(s.wob) * 0.25 * dt;
        s.v.z += Math.cos(s.wob * 0.8) * 0.25 * dt;
      }
      s.p.addScaledVector(s.v, dt);
      let done = false;

      if (target && s.p.distanceTo(target) < 0.22 + spec.r) {
        this.events.hitCharacter(s.kind);
        done = true;
      } else if (this.world.crosses(a, { x: s.p.x, z: s.p.z })) {
        s.p.copy(prev);
        done = true;
      } else if (s.p.y < floor + spec.r) {
        s.p.y = floor + (s.kind === 'water' ? 0.002 : spec.r);
        done = true;
      }
      if (s.kind === 'firework' && !done && Math.random() < 0.6) this.spark(s.p, this.randomDir(0.3), 0xffc070, 0.25, 0.5, 0.92);

      if (done || s.t > spec.life) {
        this.finish(s, done);
        this.shots.splice(i, 1);
      }
    }

    // Sparks: fade by shrinking their colour (additive blending).
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const sp = this.sparks[i];
      sp.t += dt;
      sp.v.y -= G * sp.grav * dt;
      sp.v.multiplyScalar(Math.pow(sp.drag, dt * 60));
      sp.p.addScaledVector(sp.v, dt);
      if (sp.t >= sp.max) this.sparks.splice(i, 1);
    }
    for (const r of this.rings) {
      if (r.t >= 1) continue;
      r.t += dt / 0.6;
      r.mesh.scale.setScalar(1 + r.t * 4);
      (r.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.8 * (1 - r.t));
      if (r.t >= 1) r.mesh.visible = false;
    }
    this.confetti.update(dt);
    this.draw();
  }

  private finish(s: Shot, hit: boolean): void {
    switch (s.kind) {
      case 'bubble':
        this.burst(s.p, 0xcfeaff, 8, 0.8);
        this.events.sound('pop', s.p);
        break;
      case 'firework':
        // Dahrooj's bloom: coloured sparks every way.
        for (let i = 0; i < 26; i++) {
          this.spark(s.p, this.randomDir(1.6 + Math.random() * 1.6), FIRE_COLS[i % FIRE_COLS.length], 0.5 + Math.random() * 0.35, 0.5, 0.97);
        }
        this.events.sound('boom', s.p);
        break;
      case 'water':
        if (hit) {
          this.ripple(s.p);
          for (let i = 0; i < 3; i++) this.spark(s.p, this.randomDir(0.9).setY(Math.random() * 1.2), 0x9ad8ff, 0.35, 1, 0.97, 0);
        }
        break;
      case 'confetti':
        this.confetti.pop(s.p, 1.0, 0.9);
        this.events.sound('confetti', s.p);
        break;
    }
  }

  private ripple(at: THREE.Vector3): void {
    const r = this.rings.find((x) => x.t >= 1);
    if (!r) return;
    r.t = 0;
    r.mesh.position.set(at.x, this.world.floorY + 0.004, at.z);
    r.mesh.scale.setScalar(1);
    r.mesh.visible = true;
  }

  private burst(at: THREE.Vector3, color: number, n: number, speed: number): void {
    for (let i = 0; i < n; i++) this.spark(at, this.randomDir(speed * (0.5 + Math.random())), color, 0.3 + Math.random() * 0.2, 0.3, 0.95);
  }

  private spark(p: THREE.Vector3, v: THREE.Vector3, color: number, max: number, grav = 0.5, drag = 0.97, kind: 0 | 1 = 1): void {
    if (this.sparks.length >= 480) return;
    this.sparks.push({ p: p.clone(), v: v.clone(), c: new THREE.Color(color), t: 0, max, drag, grav: kind === 0 ? 1 : grav });
  }

  private randomDir(len: number): THREE.Vector3 {
    return new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(len);
  }

  private draw(): void {
    this.bubbles.begin();
    this.drops.begin();
    const fire = new THREE.Color(0xfff4d6);
    this.glows.begin();
    for (const s of this.shots) {
      if (s.kind === 'bubble') this.bubbles.add(s.p);
      else if (s.kind === 'water') this.drops.add(s.p);
      else this.glows.add(s.p, s.kind === 'confetti' ? new THREE.Color(0xff9ad5) : fire);
    }
    const c = new THREE.Color();
    for (const sp of this.sparks) this.glows.add(sp.p, c.copy(sp.c).multiplyScalar(Math.max(0, 1 - sp.t / sp.max)));
    this.bubbles.end();
    this.drops.end();
    this.glows.end();
  }

  /** Clears everything in flight (e.g. when the session ends). */
  clear(): void {
    this.shots.length = 0;
    this.sparks.length = 0;
    this.draw();
  }
}
