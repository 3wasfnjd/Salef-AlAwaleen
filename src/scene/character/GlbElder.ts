import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { BehaviorState } from '../../core/behavior';
import { toStandard } from '../assets';
import type { CharacterRig, Expression, Gesture, Posture } from './CharacterRig';
import { Blinker, Gaze, damp } from './gaze';

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
const MODEL_SCALE = 1.65;
const SEAT_HEIGHT = 0.1;
/** Ground speed (m/s) at which the authored walk cycle plays at 1×. */
const WALK_CLIP_SPEED = 1.0;
const FADE = 0.35;

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
  private readonly gaze: Gaze;
  private readonly blinker = new Blinker();
  private readonly model: THREE.Object3D;
  private readonly actions: Partial<Record<'sit' | 'stand' | 'walk', THREE.AnimationAction>> = {};
  private current?: THREE.AnimationAction;
  private posture: Posture = 'seated';

  private state: BehaviorState = 'idle';
  private expression: Expression = 'neutral';
  private mouthTarget = 0;
  private mouth01 = 0;
  private readonly morph: Record<Morph, number> = {
    blink: 0, eyes_wide: 0, eyes_happy: 0, brows_up: 0, brows_angry: 0, brows_sad: 0,
    brow_raise_L: 0, smile: 0, frown: 0, mouth_oo: 0, mouth_open: 0,
  };

  static async load(url: string): Promise<GlbElder> {
    const gltf = await new GLTFLoader().loadAsync(url);
    return new GlbElder(gltf.scene, gltf.animations);
  }

  private constructor(model: THREE.Object3D, clips: THREE.AnimationClip[]) {
    this.object.name = 'glb-elder';
    this.model = model;
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
    const eyes = ['Eye.L', 'Eye.R'].map((name) => bone(model, name)).filter((e): e is THREE.Object3D => Boolean(e));
    this.gaze = new Gaze(this.object, bone(model, 'Head'), bone(model, 'Neck'), eyes);

    this.mixer = new THREE.AnimationMixer(model);
    const action = (name: string) => {
      const clip = THREE.AnimationClip.findByName(clips, name);
      return clip ? this.mixer.clipAction(clip) : undefined;
    };
    this.actions.sit = action('sit_idle') ?? action('idle');
    this.actions.stand = action('idle');
    this.actions.walk = action('walk');
    this.play(this.actions.sit, 0);
  }

  private play(next: THREE.AnimationAction | undefined, fade = FADE): void {
    if (!next || next === this.current) return;
    next.reset().setEffectiveWeight(1).play();
    if (this.current) this.current.crossFadeTo(next, fade, false);
    this.current = next;
  }

  setPosture(requested: Posture): void {
    const p: Posture = requested === 'flying' ? 'standing' : requested; // the elder keeps his feet on the ground
    if (p === this.posture) return;
    this.posture = p;
    this.model.position.y = p === 'seated' ? SEAT_HEIGHT : 0;
    this.play(p === 'seated' ? this.actions.sit : this.actions.stand);
  }

  setLocomotion(speed: number): void {
    if (this.posture !== 'standing') return;
    const walk = this.actions.walk;
    if (speed > 0.08) {
      this.play(walk, 0.25);
      if (walk) walk.timeScale = THREE.MathUtils.clamp(speed / WALK_CLIP_SPEED, 0.5, 1.5);
    } else {
      this.play(this.actions.stand, 0.3);
    }
  }

  setState(state: BehaviorState): void {
    this.state = state;
  }

  setMouthOpen(amount: number): void {
    this.mouthTarget = THREE.MathUtils.clamp(amount, 0, 1);
  }

  lookAt(target: THREE.Vector3): void {
    this.gaze.target.copy(target);
  }

  gesture(_g: Gesture): void {
    // Seated gesture clips are not authored yet; body motion comes from sit_idle.
  }

  setExpression(e: Expression): void {
    this.expression = e;
  }

  update(dt: number, time: number): void {
    this.gaze.restore();
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
    target.blink = this.blinker.update(dt);

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

    this.gaze.update(dt, time, this.state);
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
