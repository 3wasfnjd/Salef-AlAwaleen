import * as THREE from 'three';
import type { BehaviorState } from '../../core/behavior';
import { MergedBuilder, box, sphere } from '../builder';
import type { CharacterRig, Expression, Gesture, Posture } from './CharacterRig';

/**
 * «نوّارة» — a small fantasy fairy from the "Oasis of Colours", built entirely
 * in code for children: big glossy eyes, rosy cheeks, pigtails with
 * turquoise ribbons, a palm-frond crown with a glowing star, a Sadu-striped
 * dress, rainbow wings and a few sparkles. Toon (cel) shading.
 * Stands about 0.95 m tall and hovers a little above the floor.
 */

const SKIN = '#f3c39a';
const SKIN_SHADE = '#e7a983';
const HAIR = '#3a2216';
const RIBBON = '#20c5b5';
const CHEEK = '#ff8fb1';
const IRIS = '#7b4a1f';
const SHOE = '#8e4ce0';
const LEAF = '#3fbf5f';
const LEAF_DARK = '#2a9a49';
const STAR = '#ffd23f';
const SLEEVE = '#ff6f61';
const MOUTH = '#8a2537';

const HOVER = 0.12;
const SEAT = 0.1;
/** She is a little fairy: about half a metre tall. */
const SCALE = 0.55;

const damp = (c: number, t: number, rate: number, dt: number) => c + (t - c) * (1 - Math.exp(-rate * dt));

function toonGradient(): THREE.DataTexture {
  const data = new Uint8Array([90, 170, 255]);
  const tex = new THREE.DataTexture(data, data.length, 1, THREE.RedFormat);
  tex.minFilter = tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

function canvasTexture(w: number, h: number, draw: (c: CanvasRenderingContext2D) => void): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas unavailable');
  draw(ctx);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Bright Sadu-inspired dress bands (coral, turquoise, sun yellow, violet) with diamonds. */
function dressTexture(): THREE.CanvasTexture {
  return canvasTexture(256, 256, (c) => {
    const bands = ['#ff6f61', '#ffbf3c', '#20c5b5', '#9b5de5', '#ff6f61', '#ffbf3c'];
    const bh = 256 / bands.length;
    bands.forEach((col, i) => {
      c.fillStyle = col;
      c.fillRect(0, i * bh, 256, bh);
    });
    c.fillStyle = '#fff6e0';
    for (let row = 0; row < bands.length; row++) {
      const cy = row * bh + bh / 2;
      for (let x = 0; x < 256; x += 32) {
        c.beginPath();
        c.moveTo(x + 4, cy);
        c.lineTo(x + 16, cy - bh * 0.3);
        c.lineTo(x + 28, cy);
        c.lineTo(x + 16, cy + bh * 0.3);
        c.closePath();
        c.fill();
      }
    }
  });
}

/** Pastel rainbow wing with a soft edge. */
function wingTexture(): THREE.CanvasTexture {
  return canvasTexture(128, 128, (c) => {
    const g = c.createLinearGradient(0, 0, 128, 128);
    g.addColorStop(0, 'rgba(255,143,177,0.85)');
    g.addColorStop(0.35, 'rgba(255,210,63,0.75)');
    g.addColorStop(0.65, 'rgba(32,197,181,0.75)');
    g.addColorStop(1, 'rgba(155,93,229,0.85)');
    c.fillStyle = g;
    c.fillRect(0, 0, 128, 128);
    c.strokeStyle = 'rgba(255,255,255,0.9)';
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(4, 124);
    c.quadraticCurveTo(70, 70, 120, 8);
    c.stroke();
  });
}

function sparkleTexture(): THREE.CanvasTexture {
  return canvasTexture(64, 64, (c) => {
    const g = c.createRadialGradient(32, 32, 0, 32, 32, 30);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.3, 'rgba(255,230,140,0.8)');
    g.addColorStop(1, 'rgba(255,230,140,0)');
    c.fillStyle = g;
    c.fillRect(0, 0, 64, 64);
  });
}

function wingShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(0.05, 0.22, 0.3, 0.32, 0.36, 0.2);
  s.bezierCurveTo(0.4, 0.1, 0.22, 0.02, 0.18, -0.02);
  s.bezierCurveTo(0.26, -0.08, 0.24, -0.2, 0.14, -0.2);
  s.bezierCurveTo(0.06, -0.2, 0.02, -0.1, 0, 0);
  return s;
}

interface Limb {
  root: THREE.Group;
  lower: THREE.Group;
}

export class NawwaraRig implements CharacterRig {
  readonly object = new THREE.Group();

  private readonly hover = new THREE.Group();
  private readonly body = new THREE.Group();
  private readonly dress: THREE.Mesh;
  private readonly head = new THREE.Group();
  private readonly eyes: THREE.Group[] = [];
  private readonly pupils: THREE.Group[] = [];
  private readonly brows: THREE.Mesh[] = [];
  private readonly smile: THREE.Mesh;
  private readonly mouthOpen: THREE.Mesh;
  private readonly star: THREE.Mesh;
  private readonly wings: THREE.Mesh[] = [];
  private readonly sparkles: THREE.Points;
  private readonly sparkleBase: Float32Array;
  private readonly armL: Limb;
  private readonly armR: Limb;
  private readonly legs: THREE.Group[] = [];

  private state: BehaviorState = 'idle';
  private expression: Expression = 'neutral';
  private posture: Posture = 'seated';
  private walk = 0;
  private walkPhase = 0;
  private mouthTarget = 0;
  private mouth01 = 0;
  private readonly lookTarget = new THREE.Vector3(0, 1.1, 1.5);
  private yaw = 0;
  private pitch = 0;
  private nextBlink = 1.5;
  private blinkT = -1;
  private lean = 0;
  private tilt = 0;
  private browUp = 0;
  private happy = 0;
  private hoverY = SEAT;
  /** A gesture the player asked for, and how long it has been playing. */
  private act: { kind: 'wave' | 'celebrate' | 'dance'; t: number } | null = null;
  private readonly tmp = new THREE.Vector3();
  private readonly tmpM = new THREE.Matrix4();
  private readonly disposables: Array<{ dispose(): void }> = [];

  constructor() {
    this.object.name = 'nawwara';
    this.object.scale.setScalar(SCALE);
    const gradient = this.keep(toonGradient());
    const toonVC = this.keep(new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: gradient }));
    const mesh = (b: MergedBuilder, mat: THREE.Material = toonVC) => {
      const m = b.build(mat);
      this.keep(m.geometry);
      return m;
    };

    this.object.add(this.hover);
    this.hover.add(this.body);

    // Dress: a bell lathe with the Sadu band texture.
    const profile = [
      [0.0, 0.0], [0.2, 0.0], [0.19, 0.04], [0.15, 0.14], [0.115, 0.24], [0.1, 0.3], [0.0, 0.31],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    const dressTex = this.keep(dressTexture());
    this.dress = new THREE.Mesh(
      this.keep(new THREE.LatheGeometry(profile, 24)),
      this.keep(new THREE.MeshToonMaterial({ map: dressTex, gradientMap: gradient })),
    );
    this.dress.position.y = 0.17;
    this.body.add(this.dress);
    this.body.add(
      mesh(
        new MergedBuilder()
          .add(sphere(1, 16, 10), SLEEVE, [0, 0.47, 0], [0, 0, 0], [0.11, 0.06, 0.095]) // collar / chest
          .add(new THREE.TorusGeometry(0.105, 0.012, 6, 24), '#ffbf3c', [0, 0.2, 0], [Math.PI / 2, 0, 0]) // hem trim
          .add(new THREE.CylinderGeometry(0.035, 0.04, 0.06, 10), SKIN, [0, 0.5, 0]), // neck
      ),
    );

    // Legs (with violet shoes), pivoting at the hip.
    for (const side of [-1, 1]) {
      const leg = new THREE.Group();
      leg.position.set(side * 0.06, 0.2, 0);
      leg.add(
        mesh(
          new MergedBuilder()
            .add(new THREE.CapsuleGeometry(0.03, 0.12, 4, 10), SKIN, [0, -0.1, 0])
            .add(sphere(1, 12, 8), SHOE, [0, -0.19, 0.025], [0, 0, 0], [0.042, 0.03, 0.06]),
        ),
      );
      this.body.add(leg);
      this.legs.push(leg);
    }

    // Arms.
    this.armR = this.buildArm(-1, mesh);
    this.armL = this.buildArm(1, mesh);

    // Head.
    this.head.position.set(0, 0.67, 0);
    this.body.add(this.head);
    this.head.add(
      mesh(
        new MergedBuilder()
          .add(sphere(0.165, 24, 18), SKIN)
          .add(sphere(1, 10, 8), SKIN_SHADE, [-0.158, -0.01, 0], [0, 0, 0], [0.025, 0.035, 0.02]) // ears
          .add(sphere(1, 10, 8), SKIN_SHADE, [0.158, -0.01, 0], [0, 0, 0], [0.025, 0.035, 0.02])
          .add(sphere(1, 8, 6), SKIN_SHADE, [0, -0.025, 0.163], [0, 0, 0], [0.016, 0.012, 0.012]) // nose
          .add(sphere(1, 12, 8), CHEEK, [-0.085, -0.05, 0.135], [0, -0.55, 0], [0.032, 0.022, 0.01]) // cheeks
          .add(sphere(1, 12, 8), CHEEK, [0.085, -0.05, 0.135], [0, 0.55, 0], [0.032, 0.022, 0.01])
          // Hair: cap, fringe and two pigtails with turquoise ribbons.
          .add(new THREE.SphereGeometry(0.172, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.42), HAIR, [0, 0.02, -0.006])
          .add(sphere(1, 16, 10), HAIR, [0, 0.118, 0.105], [0.45, 0, 0], [0.12, 0.035, 0.05])
          .add(sphere(0.075, 14, 10), HAIR, [-0.19, 0.0, -0.04])
          .add(sphere(0.075, 14, 10), HAIR, [0.19, 0.0, -0.04])
          .add(sphere(0.06, 12, 8), HAIR, [-0.22, -0.09, -0.05])
          .add(sphere(0.06, 12, 8), HAIR, [0.22, -0.09, -0.05])
          .add(new THREE.TorusGeometry(0.04, 0.013, 6, 16), RIBBON, [-0.17, 0.035, -0.035], [0, Math.PI / 2, 0])
          .add(new THREE.TorusGeometry(0.04, 0.013, 6, 16), RIBBON, [0.17, 0.035, -0.035], [0, Math.PI / 2, 0])
          // Palm-frond crown: three leaves.
          .add(new THREE.ConeGeometry(0.03, 0.14, 6), LEAF, [0, 0.21, 0.0], [0, 0, 0], [1, 1, 0.45])
          .add(new THREE.ConeGeometry(0.028, 0.12, 6), LEAF_DARK, [-0.05, 0.19, 0.0], [0, 0, 0.5], [1, 1, 0.45])
          .add(new THREE.ConeGeometry(0.028, 0.12, 6), LEAF_DARK, [0.05, 0.19, 0.0], [0, 0, -0.5], [1, 1, 0.45]),
      ),
    );
    this.star = new THREE.Mesh(
      this.keep(new THREE.OctahedronGeometry(0.035, 0)),
      this.keep(new THREE.MeshBasicMaterial({ color: STAR })),
    );
    this.star.position.set(0, 0.3, 0);
    this.head.add(this.star);

    // Big glossy eyes.
    for (const side of [-1, 1]) {
      const eye = new THREE.Group();
      eye.position.set(side * 0.058, -0.005, 0.145);
      eye.add(mesh(new MergedBuilder().add(sphere(1, 16, 12), '#ffffff', [0, 0, 0], [0, 0, 0], [0.042, 0.05, 0.022])));
      const pupil = new THREE.Group();
      pupil.add(
        mesh(
          new MergedBuilder()
            .add(sphere(1, 14, 10), IRIS, [0, 0, 0.012], [0, 0, 0], [0.029, 0.035, 0.014])
            .add(sphere(1, 12, 8), '#1d120b', [0, 0, 0.02], [0, 0, 0], [0.017, 0.021, 0.01])
            .add(sphere(0.008, 8, 6), '#ffffff', [0.01, 0.014, 0.03])
            .add(sphere(0.004, 6, 4), '#ffffff', [-0.008, -0.01, 0.03]),
        ),
      );
      eye.add(pupil);
      this.head.add(eye);
      this.eyes.push(eye);
      this.pupils.push(pupil);

      const brow = mesh(new MergedBuilder().add(box(0.045, 0.008, 0.01), HAIR));
      brow.position.set(side * 0.06, 0.062, 0.152);
      this.head.add(brow);
      this.brows.push(brow);
    }

    // Mouth: a smile arc when closed, an open "o" with tongue when speaking.
    this.smile = mesh(new MergedBuilder().add(new THREE.TorusGeometry(0.03, 0.006, 6, 16, Math.PI), MOUTH, [0, 0, 0], [0, 0, Math.PI]));
    this.smile.position.set(0, -0.075, 0.15);
    this.head.add(this.smile);
    this.mouthOpen = mesh(
      new MergedBuilder()
        .add(sphere(1, 14, 10), MOUTH, [0, 0, 0], [0, 0, 0], [0.03, 0.025, 0.012])
        .add(sphere(1, 10, 8), '#ff7a93', [0, -0.012, 0.004], [0, 0, 0], [0.018, 0.01, 0.01]),
    );
    this.mouthOpen.position.set(0, -0.075, 0.152);
    this.head.add(this.mouthOpen);

    // Rainbow wings on her back.
    const wingGeo = this.keep(new THREE.ShapeGeometry(wingShape(), 12));
    const wingMat = this.keep(
      new THREE.MeshBasicMaterial({ map: this.keep(wingTexture()), transparent: true, side: THREE.DoubleSide, depthWrite: false }),
    );
    for (const side of [-1, 1]) {
      const pivot = new THREE.Group();
      pivot.position.set(side * 0.03, 0.44, -0.08);
      const wing = new THREE.Mesh(wingGeo, wingMat);
      wing.scale.set(side * 1.25, 1.25, 1.25);
      pivot.add(wing);
      this.body.add(pivot);
      this.wings.push(wing);
    }

    // A few sparkles orbiting her.
    const n = 14;
    this.sparkleBase = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      this.sparkleBase.set([Math.random() * Math.PI * 2, 0.25 + Math.random() * 0.75, 0.22 + Math.random() * 0.15], i * 3);
    }
    const sparkleGeo = this.keep(new THREE.BufferGeometry());
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    this.sparkles = new THREE.Points(
      sparkleGeo,
      this.keep(
        new THREE.PointsMaterial({
          map: this.keep(sparkleTexture()),
          size: 0.035,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      ),
    );
    this.sparkles.frustumCulled = false;
    this.hover.add(this.sparkles);
  }

  private buildArm(side: 1 | -1, mesh: (b: MergedBuilder) => THREE.Mesh): Limb {
    const root = new THREE.Group();
    root.position.set(side * 0.105, 0.46, 0);
    root.add(
      mesh(
        new MergedBuilder()
          .add(sphere(0.042, 12, 8), SLEEVE) // puffed sleeve
          .add(new THREE.CapsuleGeometry(0.022, 0.08, 4, 8), SKIN, [0, -0.07, 0]),
      ),
    );
    const lower = new THREE.Group();
    lower.position.set(0, -0.12, 0);
    lower.add(
      mesh(
        new MergedBuilder()
          .add(new THREE.CapsuleGeometry(0.02, 0.07, 4, 8), SKIN, [0, -0.045, 0])
          .add(sphere(0.03, 10, 8), SKIN, [0, -0.1, 0.005]),
      ),
    );
    root.add(lower);
    this.body.add(root);
    return { root, lower };
  }

  private keep<T extends { dispose(): void }>(x: T): T {
    this.disposables.push(x);
    return x;
  }

  setState(state: BehaviorState): void {
    this.state = state;
  }

  setMouthOpen(amount: number): void {
    this.mouthTarget = THREE.MathUtils.clamp(amount, 0, 1);
  }

  lookAt(target: THREE.Vector3): void {
    this.lookTarget.copy(target);
  }

  gesture(_g: Gesture): void {
    // Gestures follow the behaviour state (see update).
  }

  perform(g: 'wave' | 'celebrate' | 'dance'): boolean {
    this.act = { kind: g, t: 0 };
    return true;
  }

  setPosture(p: Posture): void {
    this.posture = p;
    if (p === 'seated') this.walk = 0;
  }

  setLocomotion(speed: number): void {
    this.walk = this.posture === 'seated' ? 0 : speed;
  }

  setExpression(e: Expression): void {
    this.expression = e;
  }

  update(dt: number, time: number): void {
    const s = this.state;
    const talking = s === 'speaking' || s === 'storytelling';
    const flying = this.posture === 'flying';
    const walking = !flying && this.walk > 0.08;

    // Hover / sit and bob. Reacting = happy little hops.
    // Flying: the companion carries her through the air; here only a gentle bob.
    const baseY = this.posture === 'seated' ? SEAT : flying ? 0 : HOVER;
    const hop = s === 'reacting' ? Math.abs(Math.sin(time * 9)) * 0.06 : 0;
    this.hoverY = damp(this.hoverY, baseY, 6, dt);
    this.hover.position.y = this.hoverY + Math.sin(time * 2.3) * (this.posture === 'seated' ? 0.004 : 0.02) + hop;

    // Body lean and head tilt by state.
    const leanT = flying
      ? 0.25 * Math.min(1, this.walk / 1.2) + (s === 'listening' ? 0.08 : 0)
      : walking
        ? 0.12 * Math.min(1, this.walk)
        : s === 'listening'
          ? 0.1
          : s === 'interrupted'
            ? -0.05
            : 0;
    const tiltT = s === 'listening' ? 0.14 : s === 'thinking' ? -0.1 : talking ? Math.sin(time * 1.4) * 0.06 : 0;
    this.lean = damp(this.lean, leanT, 6, dt);
    this.tilt = damp(this.tilt, tiltT, 6, dt);
    this.body.rotation.x = this.lean;
    this.head.rotation.z = this.tilt;
    this.dress.scale.set(1 + Math.sin(time * 2) * 0.01, 1, 1 + Math.sin(time * 2) * 0.01);

    // Legs: walk cycle, or sitting with legs forward.
    this.walkPhase += dt * (4 + this.walk * 7);
    const legSwing = walking ? Math.sin(this.walkPhase) * 0.5 * Math.min(1, this.walk) : 0;
    // Seated: legs forward. Flying: legs trail back with a lazy kick.
    const seatedLegs = this.posture === 'seated' ? -1.35 : flying ? 0.45 + Math.sin(time * 3) * 0.12 : 0;
    this.legs[0].rotation.x = damp(this.legs[0].rotation.x, seatedLegs + legSwing, 10, dt);
    this.legs[1].rotation.x = damp(this.legs[1].rotation.x, seatedLegs - legSwing, 10, dt);

    // Arms per state.
    let rUp = -0.15, rOut = 0.25, rBend = -0.3, lUp = -0.15, lOut = 0.25, lBend = -0.3;
    if (s === 'thinking') {
      rUp = -1.1; rOut = -0.1; rBend = -2.0; // finger to chin
    } else if (talking) {
      const k = s === 'storytelling' ? 1 : 0.5;
      rUp = -0.6 - Math.sin(time * 2.2) * 0.35 * k;
      rOut = 0.5 + Math.sin(time * 1.3) * 0.2 * k;
      rBend = -0.9 + Math.sin(time * 3.1) * 0.3 * k;
      if (s === 'storytelling') {
        lUp = -0.6 - Math.sin(time * 1.9 + 1.2) * 0.35;
        lOut = 0.55;
        lBend = -0.8;
      }
    } else if (s === 'reacting') {
      rUp = -2.6; rOut = 0.4; rBend = -0.2; lUp = -2.6; lOut = 0.4; lBend = -0.2; // hands up, yay!
    } else if (s === 'idle' && this.expression === 'smile') {
      rUp = -2.4; rOut = 0.3; rBend = -0.4 + Math.sin(time * 8) * 0.4; // wave
    } else if (walking) {
      rUp = Math.sin(this.walkPhase) * 0.4;
      lUp = -Math.sin(this.walkPhase) * 0.4;
    }
    // Requested gestures override the state's arms: wave, a backflip, a little dance.
    let flip = 0;
    let sway = 0;
    let bounce = 0;
    if (this.act) {
      const a = this.act;
      a.t += dt;
      const len = a.kind === 'dance' ? 4 : a.kind === 'wave' ? 2.4 : 1.8;
      if (a.t >= len) this.act = null;
      else if (a.kind === 'wave') {
        rUp = -2.4; rOut = 0.3; rBend = -0.4 + Math.sin(a.t * 9) * 0.45;
      } else if (a.kind === 'celebrate') {
        rUp = -2.6; rOut = 0.4; rBend = -0.2; lUp = -2.6; lOut = 0.4; lBend = -0.2;
        const p = Math.min(1, a.t / 0.9);
        flip = -Math.PI * 2 * (p * p * (3 - 2 * p));
        bounce = Math.sin(Math.min(1, a.t / 0.9) * Math.PI) * 0.12;
      } else {
        const beat = a.t * 6;
        rUp = -1.8 - Math.sin(beat) * 0.6; lUp = -1.8 + Math.sin(beat) * 0.6;
        rOut = 0.6; lOut = 0.6; rBend = -0.6; lBend = -0.6;
        sway = Math.sin(beat) * 0.25;
        bounce = Math.abs(Math.sin(beat)) * 0.05;
      }
    }
    this.hover.rotation.x = flip;
    this.body.rotation.z = sway;
    this.hover.position.y += bounce;
    const happyAct = this.act !== null;

    const k = s === 'interrupted' ? 16 : 7;
    this.armR.root.rotation.x = damp(this.armR.root.rotation.x, rUp, k, dt);
    this.armR.root.rotation.z = damp(this.armR.root.rotation.z, -rOut, k, dt);
    this.armR.lower.rotation.x = damp(this.armR.lower.rotation.x, rBend, k, dt);
    this.armL.root.rotation.x = damp(this.armL.root.rotation.x, lUp, k, dt);
    this.armL.root.rotation.z = damp(this.armL.root.rotation.z, lOut, k, dt);
    this.armL.lower.rotation.x = damp(this.armL.lower.rotation.x, lBend, k, dt);

    // Wings flutter faster when moving, excited or telling a story.
    const flapRate = flying || walking || s === 'reacting' ? 16 : s === 'storytelling' ? 10 : 5;
    const flap = 0.35 + Math.sin(time * flapRate) * 0.3;
    this.wings[0].parent!.rotation.y = -flap - 0.4;
    this.wings[1].parent!.rotation.y = flap + 0.4;

    // Star glow.
    const pulse = 1 + Math.sin(time * 3) * 0.12 + (s === 'reacting' ? 0.3 : 0);
    this.star.scale.setScalar(pulse);
    this.star.rotation.y = time * 1.5;

    // Face.
    const browT = s === 'listening' || s === 'interrupted' ? 1 : talking ? 0.3 + this.mouth01 * 0.5 : s === 'thinking' ? 0.6 : 0;
    this.browUp = damp(this.browUp, browT, 8, dt);
    const happyT = s === 'reacting' || this.expression === 'smile' || happyAct ? 1 : talking ? 0.4 : 0.25;
    this.happy = damp(this.happy, happyT, 5, dt);
    this.brows.forEach((b, i) => {
      b.position.y = 0.062 + this.browUp * 0.012;
      b.rotation.z = (i === 0 ? 1 : -1) * (s === 'thinking' ? 0.2 : -0.1 * this.happy);
    });
    this.mouth01 = damp(this.mouth01, talking ? this.mouthTarget : s === 'interrupted' ? 0.35 : 0, 18, dt);
    this.mouthOpen.visible = this.mouth01 > 0.04;
    this.mouthOpen.scale.set(1 - this.mouth01 * 0.2, 0.25 + this.mouth01 * 1.1, 1);
    this.smile.visible = !this.mouthOpen.visible;
    this.smile.scale.set(1 + this.happy * 0.3, 0.6 + this.happy * 0.6, 1);

    this.updateGaze(dt, time);
    this.updateBlink(dt);
    this.updateSparkles(time);
  }

  private updateGaze(dt: number, time: number): void {
    this.body.updateWorldMatrix(true, false);
    this.tmpM.copy(this.body.matrixWorld).invert();
    const local = this.tmp.copy(this.lookTarget).applyMatrix4(this.tmpM);
    local.sub(this.head.position);
    let yawT = Math.atan2(local.x, local.z);
    let pitchT = Math.atan2(local.y, Math.hypot(local.x, local.z));
    if (this.state === 'thinking') {
      yawT += 0.4;
      pitchT += 0.3 + Math.sin(time * 0.6) * 0.04;
    }
    yawT = THREE.MathUtils.clamp(yawT, -1.0, 1.0);
    pitchT = THREE.MathUtils.clamp(pitchT, -0.5, 0.45);
    this.yaw = damp(this.yaw, yawT, 6, dt);
    this.pitch = damp(this.pitch, pitchT, 6, dt);
    this.head.rotation.y = this.yaw * 0.8;
    this.head.rotation.x = -this.pitch * 0.7;
    const ey = THREE.MathUtils.clamp(yawT - this.head.rotation.y, -0.5, 0.5);
    const ep = THREE.MathUtils.clamp(pitchT + this.head.rotation.x, -0.4, 0.4);
    for (const p of this.pupils) p.position.set(Math.sin(ey) * 0.012, Math.sin(ep) * 0.012, 0);
  }

  private updateBlink(dt: number): void {
    this.nextBlink -= dt;
    if (this.blinkT < 0 && this.nextBlink <= 0) {
      this.blinkT = 0;
      this.nextBlink = 2 + Math.random() * 3.5;
    }
    let lid = 1;
    if (this.blinkT >= 0) {
      this.blinkT += dt;
      lid = this.blinkT < 0.14 ? Math.abs(1 - (this.blinkT / 0.14) * 2) : 1;
      if (this.blinkT >= 0.14) this.blinkT = -1;
    }
    const squint = this.happy > 0.8 ? 0.35 : 0;
    const wide = this.state === 'interrupted' ? 0.12 : 0;
    for (const e of this.eyes) e.scale.y = Math.max(0.08, lid - squint + wide);
  }

  private updateSparkles(time: number): void {
    const pos = this.sparkles.geometry.getAttribute('position') as THREE.BufferAttribute;
    const speed = this.state === 'reacting' ? 2.5 : 0.6;
    for (let i = 0; i < pos.count; i++) {
      const a = this.sparkleBase[i * 3] + time * speed * (i % 2 ? 1 : -1);
      const h = this.sparkleBase[i * 3 + 1] + Math.sin(time * 1.3 + i) * 0.05;
      const r = this.sparkleBase[i * 3 + 2];
      pos.setXYZ(i, Math.cos(a) * r, h, Math.sin(a) * r);
    }
    pos.needsUpdate = true;
    (this.sparkles.material as THREE.PointsMaterial).opacity = 0.6 + Math.sin(time * 4) * 0.3;
  }

  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
    this.object.removeFromParent();
  }
}
