import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { BehaviorState } from '../../core/behavior';
import { toStandard } from '../assets';
import type { CharacterRig, Expression, Gesture } from './CharacterRig';

/** Morph targets authored on the elder's Body mesh (Mafateeh `shaib.glb`). */
type Morph =
  | 'blink'
  | 'eyes_wide'
  | 'eyes_happy'
  | 'brows_up'
  | 'brows_angry'
  | 'brows_sad'
  | 'brow_raise_L'
  | 'smile'
  | 'frown'
  | 'mouth_oo'
  | 'mouth_open';

/**
 * The Mafateeh rig is authored at puzzle-game scale (seated head ≈ 0.53 m).
 * Scale to a believable seated adult and lift him onto the floor cushion.
 */
const MODEL_SCALE = 1.5;
const SEAT_HEIGHT = 0.1;

const damp = (current: number, target: number, rate: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-rate * dt));

/** Three.js strips '.' from node names (PropertyBinding.sanitizeNodeName). */
const bone = (root: THREE.Object3D, name: string) =>
  root.getObjectByName(name) ?? root.getObjectByName(name.replace(/\./g, ''));

/**
 * The professional rigged elder (shaib.glb from the owner's Mafateeh project)
 * behind the same CharacterRig contract as the procedural fallback.
 *
 * Body: the authored `sit_idle` loop. On top of it, procedurally:
 * head/neck/eye gaze toward the player, blinking, facial morphs per state,
 * mouth driven by the real voice level, and the `think` clip blended for
 * thinking when it is a seated-compatible upper-body motion.
 */
export class GlbElder implements CharacterRig {
  readonly object = new THREE.Group();

  private readonly mixer: THREE.AnimationMixer;
  private readonly faces: THREE.Mesh[] = [];
  private readonly head?: THREE.Object3D;
  private readonly neck?: THREE.Object3D;
  private readonly eyes: THREE.Object3D[] = [];
  private readonly baseAction?: THREE.AnimationAction;

  private state: BehaviorState = 'idle';
  private expression: Expression = 'neutral';
  private mouthTarget = 0;
  private mouth01 = 0;
  private readonly morph: Record<Morph, number> = {
    blink: 0, eyes_wide: 0, eyes_happy: 0, brows_up: 0, brows_angry: 0, brows_sad: 0,
    brow_raise_L: 0, smile: 0, frown: 0, mouth_oo: 0, mouth_open: 0,
  };
  private readonly lookTarget = new THREE.Vector3(0, 1.1, 1.5);
  private yaw = 0;
  private pitch = 0;
  private nextBlink = 2;
  private blinkT = -1;
  private wanderT = 0;
  private readonly wander = new THREE.Vector2();
  private readonly tmpV = new THREE.Vector3();
  private readonly tmpQ = new THREE.Quaternion();
  private readonly tmpQ2 = new THREE.Quaternion();
  private readonly rootQ = new THREE.Quaternion();
  private readonly up = new THREE.Vector3(0, 1, 0);
  private readonly right = new THREE.Vector3();

  static async load(url: string): Promise<GlbElder> {
    const gltf = await new GLTFLoader().loadAsync(url);
    return new GlbElder(gltf.scene, gltf.animations);
  }

  private constructor(model: THREE.Object3D, clips: THREE.AnimationClip[]) {
    this.object.name = 'glb-elder';
    model.scale.setScalar(MODEL_SCALE);
    model.position.set(0, SEAT_HEIGHT, -0.02);
    this.object.add(model);
    model.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.frustumCulled = false; // skinned bounds don't follow the animation
        // Sheen/specular force the heavy physical shader; not worth it on Quest.
        mesh.material = Array.isArray(mesh.material) ? mesh.material.map(toStandard) : toStandard(mesh.material);
        if (mesh.morphTargetDictionary && 'mouth_open' in mesh.morphTargetDictionary) this.faces.push(mesh);
      }
    });
    this.head = bone(model, 'Head');
    this.neck = bone(model, 'Neck');
    for (const name of ['Eye.L', 'Eye.R']) {
      const eye = bone(model, name);
      if (eye) this.eyes.push(eye);
    }

    this.mixer = new THREE.AnimationMixer(model);
    const clip = THREE.AnimationClip.findByName(clips, 'sit_idle') ?? THREE.AnimationClip.findByName(clips, 'idle');
    if (clip) {
      this.baseAction = this.mixer.clipAction(clip);
      this.baseAction.play();
    }
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
    // Seated gesture clips are not authored yet; body motion comes from sit_idle.
  }

  setExpression(e: Expression): void {
    this.expression = e;
  }

  update(dt: number, time: number): void {
    this.mixer.update(dt);
    this.object.updateMatrixWorld(true);

    const speaking = this.state === 'speaking' || this.state === 'storytelling';
    this.mouth01 = damp(this.mouth01, speaking ? this.mouthTarget : 0, 18, dt);

    const target: Record<Morph, number> = {
      blink: 0, eyes_wide: 0, eyes_happy: 0, brows_up: 0, brows_angry: 0, brows_sad: 0,
      brow_raise_L: 0, smile: 0.12, frown: 0, mouth_oo: 0, mouth_open: 0,
    };
    switch (this.state) {
      case 'listening':
        target.brows_up = 0.35;
        target.eyes_wide = 0.15;
        break;
      case 'thinking':
        target.brow_raise_L = 0.6;
        target.mouth_oo = 0.15;
        break;
      case 'speaking':
      case 'storytelling':
        target.brows_up = 0.15 + this.mouth01 * 0.35;
        target.smile = this.state === 'storytelling' ? 0.25 : 0.15;
        break;
      case 'reacting':
        target.smile = 1;
        target.eyes_happy = 0.8;
        break;
      case 'interrupted':
        target.brows_up = 0.8;
        target.eyes_wide = 0.5;
        break;
      case 'idle':
        break;
    }
    if (this.expression === 'smile') target.smile = Math.max(target.smile, 0.8);
    if (this.expression === 'surprised') target.brows_up = Math.max(target.brows_up, 0.8);
    if (this.expression === 'thoughtful') target.brow_raise_L = Math.max(target.brow_raise_L, 0.5);
    target.mouth_open = this.mouth01;
    target.mouth_oo = Math.max(target.mouth_oo, this.mouth01 * 0.25 * (0.5 + 0.5 * Math.sin(time * 7)));
    target.blink = this.blinkAmount(dt);

    for (const key of Object.keys(target) as Morph[]) {
      this.morph[key] = key === 'blink' || key === 'mouth_open' ? target[key] : damp(this.morph[key], target[key], 6, dt);
    }
    for (const face of this.faces) {
      const dict = face.morphTargetDictionary!;
      const influences = face.morphTargetInfluences!;
      for (const key of Object.keys(this.morph) as Morph[]) {
        const i = dict[key];
        if (i !== undefined) influences[i] = this.morph[key];
      }
    }

    this.updateGaze(dt, time);
  }

  /**
   * Turns neck/head/eyes toward the player on top of the animated pose.
   * Works in world space relative to the character's facing (+Z), so it does
   * not depend on how each bone's local axes were authored.
   */
  private updateGaze(dt: number, time: number): void {
    if (!this.head) return;
    this.object.getWorldQuaternion(this.rootQ);
    const headPos = this.head.getWorldPosition(this.tmpV.set(0, 0, 0));
    const dir = this.tmpV.copy(this.lookTarget).sub(headPos);
    dir.applyQuaternion(this.tmpQ.copy(this.rootQ).invert()); // into character space

    this.wanderT -= dt;
    if (this.wanderT <= 0) {
      this.wanderT = 1.5 + Math.random() * 3;
      this.wander.set((Math.random() - 0.5) * 0.12, (Math.random() - 0.5) * 0.06);
    }
    let yawT = Math.atan2(dir.x, dir.z) + this.wander.x;
    let pitchT = Math.atan2(dir.y, Math.hypot(dir.x, dir.z)) + this.wander.y;
    if (this.state === 'thinking') {
      yawT += 0.35;
      pitchT += 0.22 + Math.sin(time * 0.5) * 0.03;
    }
    if (this.state === 'listening') pitchT -= 0.04; // slight attentive nod
    yawT = THREE.MathUtils.clamp(yawT, -0.9, 0.9);
    pitchT = THREE.MathUtils.clamp(pitchT, -0.45, 0.35);
    this.yaw = damp(this.yaw, yawT, 5, dt);
    this.pitch = damp(this.pitch, pitchT, 5, dt);

    // World-space axes for the character: up and right.
    this.up.set(0, 1, 0).applyQuaternion(this.rootQ);
    this.right.set(1, 0, 0).applyQuaternion(this.rootQ);
    const share: Array<[THREE.Object3D | undefined, number]> = [
      [this.neck, 0.35],
      [this.head, 0.45],
    ];
    for (const [b, k] of share) if (b) this.rotateBoneWorld(b, this.yaw * k, -this.pitch * k);
    // Eyes take the remaining 20%, a little faster.
    for (const eye of this.eyes) this.rotateBoneWorld(eye, this.yaw * 0.25, -this.pitch * 0.25);
  }

  /** Applies a yaw (about character up) then pitch (about character right) in world space. */
  private rotateBoneWorld(b: THREE.Object3D, yaw: number, pitch: number): void {
    const parent = b.parent;
    if (!parent) return;
    const world = b.getWorldQuaternion(this.tmpQ);
    const delta = this.tmpQ2.setFromAxisAngle(this.up, yaw);
    delta.multiply(new THREE.Quaternion().setFromAxisAngle(this.right, pitch));
    world.premultiply(delta);
    const parentWorld = parent.getWorldQuaternion(new THREE.Quaternion());
    b.quaternion.copy(parentWorld.invert().multiply(world));
    b.updateMatrixWorld(true);
  }

  private blinkAmount(dt: number): number {
    this.nextBlink -= dt;
    if (this.blinkT < 0 && this.nextBlink <= 0) {
      this.blinkT = 0;
      this.nextBlink = 2.5 + Math.random() * 4;
    }
    if (this.blinkT < 0) return 0;
    this.blinkT += dt;
    const d = 0.16;
    if (this.blinkT >= d) {
      this.blinkT = -1;
      return 0;
    }
    return 1 - Math.abs(1 - (this.blinkT / d) * 2);
  }

  dispose(): void {
    this.mixer.stopAllAction();
    this.object.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.geometry.dispose();
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const m of mats) {
        for (const v of Object.values(m)) if (v instanceof THREE.Texture) v.dispose();
        m.dispose();
      }
    });
    this.object.removeFromParent();
  }
}
