import * as THREE from 'three';
import type { BehaviorState } from '../../core/behavior';
import { MergedBuilder, box, cylinder, sphere } from '../builder';
import { shemaghTexture } from '../textures';
import type { CharacterRig, Expression, Gesture } from './CharacterRig';

const SKIN = '#a8714c';
const SKIN_DARK = '#8f5d3d';
const THOBE = '#f3f0e8';
const BISHT = '#3a281b';
const GOLD = '#c9a35a';
const BEARD = '#d9d5cc';
const BROW = '#bdb8ae';
const EGAL = '#141210';

/** Exponential smoothing that is frame-rate independent. */
const damp = (current: number, target: number, rate: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-rate * dt));

interface Arm {
  shoulder: THREE.Group;
  elbow: THREE.Group;
}

interface Pose {
  lean: number;
  headTilt: number;
  browRaise: number;
  browAngle: number;
  smile: number;
  rightShoulder: number;
  rightElbow: number;
  rightOut: number;
  leftShoulder: number;
  leftElbow: number;
  leftOut: number;
}

const REST: Pose = {
  lean: 0,
  headTilt: 0,
  browRaise: 0,
  browAngle: 0,
  smile: 0,
  rightShoulder: -0.35,
  rightElbow: -1.15,
  rightOut: 0.12,
  leftShoulder: -0.35,
  leftElbow: -1.15,
  leftOut: 0.12,
};

/**
 * Elderly Saudi man built from primitives: white thobe, dark bisht with gold
 * trim, red-white shemagh with black egal, grey beard. Seated cross-legged at
 * the origin facing +Z. Implements CharacterRig so it can be swapped for a GLB.
 */
export class ProceduralElder implements CharacterRig {
  readonly object = new THREE.Group();

  private readonly torso = new THREE.Group();
  private readonly chest: THREE.Mesh;
  private readonly neck = new THREE.Group();
  private readonly head = new THREE.Group();
  private readonly eyes: THREE.Group[] = [];
  private readonly pupils: THREE.Mesh[] = [];
  private readonly brows: THREE.Mesh[] = [];
  private readonly jaw = new THREE.Group();
  private readonly mouth: THREE.Mesh;
  private readonly right: Arm;
  private readonly left: Arm;

  private state: BehaviorState = 'idle';
  private expression: Expression = 'neutral';
  private currentGesture: Gesture = 'none';
  private mouthTarget = 0;
  private mouth01 = 0;
  private readonly lookTarget = new THREE.Vector3(0, 1.1, 1.5);
  private yaw = 0;
  private pitch = 0;
  private nextBlink = 2;
  private blinkT = -1;
  private wanderT = 0;
  private wander = new THREE.Vector2();
  private pose: Pose = { ...REST };
  private readonly materials: THREE.Material[] = [];
  private readonly geometries: THREE.BufferGeometry[] = [];
  private readonly textures: THREE.Texture[] = [];
  private readonly tmp = new THREE.Vector3();
  private readonly tmpMatrix = new THREE.Matrix4();

  constructor() {
    this.object.name = 'procedural-elder';
    const solid = this.track(new THREE.MeshLambertMaterial({ vertexColors: true }));
    const doubleSided = this.track(new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }));

    // Crossed legs under the thobe.
    this.object.add(
      this.mesh(
        new MergedBuilder()
          .add(sphere(1, 16, 10), THOBE, [0, 0.2, 0.06], [0, 0, 0], [0.4, 0.11, 0.3])
          .add(sphere(0.045, 8, 6), SKIN_DARK, [-0.24, 0.13, 0.26], [0, 0, 0], [1, 0.6, 1.5])
          .add(sphere(0.045, 8, 6), SKIN_DARK, [0.24, 0.13, 0.26], [0, 0, 0], [1, 0.6, 1.5]),
        solid,
      ),
    );

    // Torso pivots at the waist.
    this.torso.position.set(0, 0.24, -0.02);
    this.object.add(this.torso);
    this.chest = this.mesh(
      new MergedBuilder()
        .add(cylinder(0.16, 0.21, 0.46, 14), THOBE, [0, 0.23, 0])
        .add(sphere(0.165, 14, 8), THOBE, [0, 0.46, 0], [0, 0, 0], [1.2, 0.45, 0.85])
        .add(box(0.012, 0.16, 0.005), '#e2ddd2', [0, 0.38, 0.152]),
      solid,
    );
    this.torso.add(this.chest);

    // Bisht: open-front cloak shell with gold trim along the opening.
    const open = THREE.MathUtils.degToRad(32);
    const bisht = new MergedBuilder().add(
      new THREE.CylinderGeometry(0.2, 0.27, 0.6, 18, 1, true, open, Math.PI * 2 - open * 2),
      BISHT,
      [0, 0.2, -0.005],
    );
    for (const side of [-1, 1]) {
      const a = side * open;
      bisht.add(box(0.02, 0.6, 0.012), GOLD, [Math.sin(a) * 0.235, 0.2, Math.cos(a) * 0.235], [-0.116, a, 0]);
    }
    bisht.add(sphere(0.2, 14, 6, ), BISHT, [0, 0.46, -0.02], [0, 0, 0], [1.25, 0.35, 0.95]);
    this.torso.add(this.mesh(bisht, doubleSided));

    // Neck and head.
    this.neck.position.set(0, 0.53, 0.01);
    this.torso.add(this.neck);
    this.neck.add(this.mesh(new MergedBuilder().add(cylinder(0.045, 0.055, 0.1, 10), SKIN, [0, 0.03, 0]), solid));
    this.head.position.set(0, 0.15, 0.0);
    this.neck.add(this.head);

    this.head.add(
      this.mesh(
        new MergedBuilder()
          .add(sphere(1, 16, 12), SKIN, [0, 0, 0], [0, 0, 0], [0.095, 0.12, 0.105])
          .add(sphere(1, 8, 6), SKIN_DARK, [0, -0.005, 0.1], [0.3, 0, 0], [0.018, 0.03, 0.022])
          .add(sphere(1, 6, 4), SKIN_DARK, [-0.012, -0.025, 0.103], [0, 0, 0], [0.008, 0.006, 0.01])
          .add(sphere(1, 6, 4), SKIN_DARK, [0.012, -0.025, 0.103], [0, 0, 0], [0.008, 0.006, 0.01])
          // Moustache and upper beard on the cheeks.
          .add(box(0.07, 0.014, 0.02), BEARD, [0, -0.04, 0.1], [0, 0, 0])
          .add(sphere(1, 10, 8), BEARD, [-0.058, -0.05, 0.055], [0, 0, 0], [0.03, 0.045, 0.035])
          .add(sphere(1, 10, 8), BEARD, [0.058, -0.05, 0.055], [0, 0, 0], [0.03, 0.045, 0.035])
          // Black egal (double cord) on top of the shemagh.
          .add(new THREE.TorusGeometry(0.098, 0.009, 6, 20), EGAL, [0, 0.09, -0.01], [Math.PI / 2 - 0.12, 0, 0])
          .add(new THREE.TorusGeometry(0.098, 0.009, 6, 20), EGAL, [0, 0.108, -0.012], [Math.PI / 2 - 0.12, 0, 0]),
        solid,
      ),
    );

    // Shemagh: cap + draped shell open at the face.
    const shemagh = this.track(shemaghTexture());
    const shemaghMat = this.track(new THREE.MeshLambertMaterial({ map: shemagh, side: THREE.DoubleSide }));
    const cap = new THREE.SphereGeometry(0.112, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    cap.translate(0, 0.02, -0.005);
    const faceOpen = THREE.MathUtils.degToRad(48);
    const drape = new THREE.CylinderGeometry(0.112, 0.2, 0.3, 18, 1, true, faceOpen, Math.PI * 2 - faceOpen * 2);
    drape.translate(0, -0.13, -0.02);
    const shemaghGeo = mergeTextured([cap, drape]);
    this.head.add(this.track(new THREE.Mesh(shemaghGeo, shemaghMat)));
    this.geometries.push(shemaghGeo);

    // Eyes: white + pupil per eye, grouped so blinking squashes the group.
    for (const side of [-1, 1]) {
      const eye = new THREE.Group();
      eye.position.set(side * 0.036, 0.018, 0.088);
      const white = this.mesh(new MergedBuilder().add(sphere(0.015, 10, 8), '#ece6da'), solid);
      const pupil = this.mesh(new MergedBuilder().add(sphere(0.008, 8, 6), '#2a1a10', [0, 0, 0.0105]), solid);
      eye.add(white, pupil);
      this.head.add(eye);
      this.eyes.push(eye);
      this.pupils.push(pupil);

      const brow = this.mesh(new MergedBuilder().add(box(0.038, 0.009, 0.012), BROW), solid);
      brow.position.set(side * 0.037, 0.045, 0.098);
      this.head.add(brow);
      this.brows.push(brow);
    }

    // Jaw: mouth + chin beard move together when speaking.
    this.jaw.position.set(0, -0.055, 0.085);
    this.head.add(this.jaw);
    this.mouth = this.mesh(new MergedBuilder().add(sphere(1, 10, 6), '#3a1a14', [0, 0, 0.018], [0, 0, 0], [0.022, 0.006, 0.01]), solid);
    this.jaw.add(this.mouth);
    this.jaw.add(
      this.mesh(new MergedBuilder().add(sphere(1, 12, 10), BEARD, [0, -0.04, -0.01], [0.25, 0, 0], [0.068, 0.075, 0.055]), solid),
    );

    // Arms.
    this.right = this.buildArm(-1, solid);
    this.left = this.buildArm(1, solid);

    // Walking cane resting beside him.
    this.object.add(
      this.mesh(
        new MergedBuilder()
          .add(cylinder(0.012, 0.012, 0.95, 6), '#5a3a22', [0.5, 0.47, -0.15], [0.25, 0, -0.32])
          .add(new THREE.TorusGeometry(0.04, 0.012, 6, 10, Math.PI), '#5a3a22', [0.68, 0.91, -0.03], [0.25, 0, -0.32]),
        solid,
      ),
    );
  }

  private buildArm(side: 1 | -1, mat: THREE.Material): Arm {
    // side = -1 → character's right (on viewer's left).
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 0.215, 0.44, 0);
    this.torso.add(shoulder);
    shoulder.add(
      this.mesh(
        new MergedBuilder()
          .add(sphere(0.06, 10, 8), BISHT, [0, 0, 0])
          .add(cylinder(0.05, 0.06, 0.27, 10), THOBE, [0, -0.135, 0]),
        mat,
      ),
    );
    const elbow = new THREE.Group();
    elbow.position.set(0, -0.27, 0);
    shoulder.add(elbow);
    elbow.add(
      this.mesh(
        new MergedBuilder()
          .add(cylinder(0.042, 0.05, 0.25, 10), THOBE, [0, -0.125, 0])
          .add(sphere(1, 10, 8), SKIN, [0, -0.28, 0.005], [0, 0, 0], [0.035, 0.05, 0.022])
          .add(box(0.012, 0.04, 0.012), SKIN, [side * -0.03, -0.27, 0.012], [0, 0, side * 0.5]),
        mat,
      ),
    );
    return { shoulder, elbow };
  }

  setState(state: BehaviorState): void {
    this.state = state;
    if (state === 'interrupted') this.currentGesture = 'none';
  }

  setMouthOpen(amount: number): void {
    this.mouthTarget = THREE.MathUtils.clamp(amount, 0, 1);
  }

  lookAt(target: THREE.Vector3): void {
    this.lookTarget.copy(target);
  }

  gesture(g: Gesture): void {
    this.currentGesture = g;
  }

  setExpression(e: Expression): void {
    this.expression = e;
  }

  update(dt: number, time: number): void {
    const target = this.targetPose(time);
    const k = this.state === 'interrupted' ? 14 : 4;
    for (const key of Object.keys(target) as (keyof Pose)[]) {
      this.pose[key] = damp(this.pose[key], target[key], k, dt);
    }
    const p = this.pose;

    // Breathing.
    const breath = Math.sin(time * 1.6);
    this.chest.scale.set(1 + breath * 0.008, 1 + breath * 0.012, 1 + breath * 0.01);
    this.torso.rotation.x = p.lean + breath * 0.008;

    // Laugh bounce while reacting.
    this.torso.position.y = 0.24 + (this.state === 'reacting' ? Math.abs(Math.sin(time * 9)) * 0.008 : 0);

    this.updateGaze(dt, time);
    this.head.rotation.z = p.headTilt;

    // Speaking nods follow the real voice level.
    const speaking = this.state === 'speaking' || this.state === 'storytelling';
    this.mouth01 = damp(this.mouth01, speaking ? this.mouthTarget : 0, 18, dt);
    this.jaw.rotation.x = this.mouth01 * 0.22;
    this.mouth.scale.y = 1 + this.mouth01 * 2.6;
    this.mouth.scale.x = 1 + p.smile * 0.35 - this.mouth01 * 0.15;

    // Brows.
    this.brows.forEach((brow, i) => {
      const side = i === 0 ? -1 : 1;
      brow.position.y = 0.045 + p.browRaise * 0.008;
      brow.rotation.z = side * p.browAngle;
    });

    this.updateBlink(dt);

    // Arms.
    this.right.shoulder.rotation.set(p.rightShoulder, 0, -p.rightOut);
    this.right.elbow.rotation.x = p.rightElbow;
    this.left.shoulder.rotation.set(p.leftShoulder, 0, p.leftOut);
    this.left.elbow.rotation.x = p.leftElbow;
  }

  private targetPose(time: number): Pose {
    const p: Pose = { ...REST };
    switch (this.state) {
      case 'listening':
        p.lean = 0.1;
        p.headTilt = 0.09;
        p.browRaise = 0.4;
        break;
      case 'thinking':
        p.browAngle = 0.12;
        p.headTilt = -0.05;
        break;
      case 'speaking':
        p.browRaise = 0.2 + this.mouth01 * 0.5;
        break;
      case 'storytelling':
        p.lean = 0.05;
        p.browRaise = 0.3 + this.mouth01 * 0.6;
        p.headTilt = Math.sin(time * 0.7) * 0.05;
        break;
      case 'reacting':
        p.smile = 1;
        p.lean = -0.05;
        p.browRaise = 0.5;
        break;
      case 'interrupted':
        p.lean = -0.04;
        p.browRaise = 1;
        break;
      case 'idle':
        break;
    }

    const expression = this.state === 'thinking' ? 'thoughtful' : this.state === 'reacting' ? 'smile' : this.expression;
    if (expression === 'smile') p.smile = 1;
    if (expression === 'surprised') p.browRaise = 1;
    if (expression === 'thoughtful') p.browAngle = 0.15;

    const gesture: Gesture =
      this.state === 'thinking'
        ? 'beard'
        : this.state === 'storytelling' || this.state === 'speaking'
          ? this.currentGesture === 'none' ? 'explain' : this.currentGesture
          : this.state === 'interrupted'
            ? 'none'
            : this.currentGesture;

    const amp = this.state === 'storytelling' ? 1 : 0.5;
    switch (gesture) {
      case 'explain':
        p.rightShoulder = -0.75 - Math.sin(time * 1.3) * 0.18 * amp;
        p.rightElbow = -1.5 + Math.sin(time * 2.1) * 0.25 * amp;
        p.rightOut = 0.3 + Math.sin(time * 0.9) * 0.12 * amp;
        if (this.state === 'storytelling') {
          p.leftShoulder = -0.5 - Math.sin(time * 1.1 + 1.7) * 0.12;
          p.leftElbow = -1.35 + Math.sin(time * 1.7 + 0.6) * 0.15;
          p.leftOut = 0.2;
        }
        break;
      case 'point':
        p.rightShoulder = -1.25;
        p.rightElbow = -0.4;
        p.rightOut = 0.15;
        break;
      case 'beard':
        p.rightShoulder = -0.95;
        p.rightElbow = -2.25;
        p.rightOut = -0.3;
        break;
      case 'none':
        break;
    }
    return p;
  }

  private updateGaze(dt: number, time: number): void {
    // Target in the neck's local frame.
    this.neck.updateWorldMatrix(true, false);
    this.tmpMatrix.copy(this.neck.matrixWorld).invert();
    const local = this.tmp.copy(this.lookTarget).applyMatrix4(this.tmpMatrix);
    local.y -= this.head.position.y;

    // Small natural wander, and a glance up/aside while thinking.
    this.wanderT -= dt;
    if (this.wanderT <= 0) {
      this.wanderT = 1.5 + Math.random() * 3;
      this.wander.set((Math.random() - 0.5) * 0.12, (Math.random() - 0.5) * 0.06);
    }
    let yawT = Math.atan2(local.x, local.z) + this.wander.x;
    let pitchT = Math.atan2(local.y, Math.hypot(local.x, local.z)) + this.wander.y;
    if (this.state === 'thinking') {
      yawT += 0.35;
      pitchT += 0.25 + Math.sin(time * 0.5) * 0.03;
    }
    yawT = THREE.MathUtils.clamp(yawT, -0.9, 0.9);
    pitchT = THREE.MathUtils.clamp(pitchT, -0.4, 0.35);

    this.yaw = damp(this.yaw, yawT, 5, dt);
    this.pitch = damp(this.pitch, pitchT, 5, dt);
    // Head takes most of the turn; eyes lead slightly and take the remainder.
    this.head.rotation.y = this.yaw * 0.8;
    this.head.rotation.x = -this.pitch * 0.7;
    const eyeYaw = THREE.MathUtils.clamp((yawT - this.head.rotation.y) * 1.2, -0.45, 0.45);
    const eyePitch = THREE.MathUtils.clamp((pitchT + this.head.rotation.x) * 1.2, -0.3, 0.3);
    for (const pupil of this.pupils) {
      pupil.position.set(Math.sin(eyeYaw) * 0.006, Math.sin(eyePitch) * 0.005, 0);
    }
  }

  private updateBlink(dt: number): void {
    this.nextBlink -= dt;
    if (this.blinkT < 0 && this.nextBlink <= 0) {
      this.blinkT = 0;
      this.nextBlink = 2.5 + Math.random() * 4;
    }
    let lid = 1;
    if (this.blinkT >= 0) {
      this.blinkT += dt;
      const d = 0.16;
      lid = this.blinkT < d ? Math.abs(1 - (this.blinkT / d) * 2) : 1;
      if (this.blinkT >= d) this.blinkT = -1;
    }
    const squint = this.pose.smile * 0.35;
    for (const eye of this.eyes) eye.scale.y = Math.max(0.08, lid - squint);
  }

  private mesh(builder: MergedBuilder, material: THREE.Material): THREE.Mesh {
    const m = builder.build(material);
    this.geometries.push(m.geometry);
    return m;
  }

  private track<T extends THREE.Material | THREE.Texture | THREE.Mesh>(x: T): T {
    if (x instanceof THREE.Material) this.materials.push(x);
    else if (x instanceof THREE.Texture) this.textures.push(x);
    return x;
  }

  dispose(): void {
    this.geometries.forEach((g) => g.dispose());
    this.materials.forEach((m) => m.dispose());
    this.textures.forEach((t) => t.dispose());
    this.object.removeFromParent();
  }
}

function mergeTextured(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const nonIndexed = parts.map((g) => {
    const n = g.index ? g.toNonIndexed() : g;
    if (n !== g) g.dispose();
    return n;
  });
  const total = nonIndexed.reduce((s, g) => s + g.getAttribute('position').count, 0);
  const merged = new THREE.BufferGeometry();
  for (const name of ['position', 'normal', 'uv'] as const) {
    const itemSize = nonIndexed[0].getAttribute(name).itemSize;
    const data = new Float32Array(total * itemSize);
    let offset = 0;
    for (const g of nonIndexed) {
      const attr = g.getAttribute(name);
      data.set(attr.array as Float32Array, offset);
      offset += attr.array.length;
    }
    merged.setAttribute(name, new THREE.BufferAttribute(data, itemSize));
  }
  nonIndexed.forEach((g) => g.dispose());
  merged.computeBoundingSphere();
  return merged;
}
