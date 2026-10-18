import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { BehaviorState } from '../../core/behavior';
import { toStandard } from '../assets';
import type { CharacterRig, Expression, Gesture, Posture } from './CharacterRig';
import { Blinker, Gaze, damp } from './gaze';

/** The source model is 1.7 m tall; «جيلو» is a small alien, about a metre. */
const MODEL_SCALE = 0.6;
/** Ground speed (m/s) at which the authored walk cycle plays at 1×; faster switches to the run. */
const WALK_CLIP_SPEED = 0.8;
const RUN_FROM = 1.3;
const FADE = 0.3;
const BODY_COLOR = new THREE.Color('#45d2ec');
const RIM_COLOR = new THREE.Color('#b9a8ff');

type Clip = 'idle' | 'sit' | 'walk' | 'run' | 'wave' | 'celebrate' | 'dance';
const CLIP_NAMES: Record<Clip, string> = {
  idle: 'Idle',
  sit: 'Sit_Idle',
  walk: 'Walk',
  run: 'Run',
  wave: 'Wave',
  celebrate: 'Celebrate',
  dance: 'Dance',
};

/** Ellipsoid of one eye in world (rest-pose) space. */
interface EyeShape {
  center: THREE.Vector3;
  radii: THREE.Vector3;
  /** Front-most eye vertices, to sit highlights on the surface. */
  front: THREE.Vector3[];
}

/**
 * «جيلو», the jelly alien (owner's model Alien_Jelly.glb, optimised by
 * scripts/optimize-alien.mjs) behind the CharacterRig contract.
 *
 * The authored face morphs distort the head, so the face is rebuilt here:
 * - a mouth-open morph generated from the mouth cavity (lower lip and chin
 *   follow it), driven by the real voice level
 * - eyelids in the body colour that close from the top for blinking
 * - clean glossy eyes with two highlights instead of the noisy texture
 * Body: authored clips (sit, idle, walk/run matched to speed, a wave when he
 * first speaks, a celebration when something makes him happy), plus a jelly
 * wobble and springy antennae on top.
 */
export class AlienRig implements CharacterRig {
  readonly object = new THREE.Group();

  private readonly model: THREE.Object3D;
  private readonly mixer: THREE.AnimationMixer;
  private readonly actions: Partial<Record<Clip, THREE.AnimationAction>> = {};
  private current?: THREE.AnimationAction;
  private base?: THREE.AnimationAction;
  private oneShot = false;
  private readonly gaze: Gaze;
  private readonly blinker = new Blinker();
  private readonly mouths: THREE.Mesh[] = [];
  /** Eyelid pivots and their rest scale (they live under the scaled head bone). */
  private readonly lids: Array<{ pivot: THREE.Object3D; sy: number }> = [];
  /** Eye highlights and how closed the lid must be to cover each. */
  private readonly shines: Array<{ dot: THREE.Object3D; coveredAt: number }> = [];
  private readonly antennae: THREE.Object3D[][] = [[], []];
  /** Sway applied last frame per antenna bone, undone before the mixer runs (not every clip keys them). */
  private readonly sway = new Map<THREE.Object3D, THREE.Quaternion>();
  private posture: Posture = 'seated';
  private speed = 0;
  private state: BehaviorState = 'idle';
  private expression: Expression = 'neutral';
  private mouthTarget = 0;
  private mouth01 = 0;
  private wobble = 0;
  private greeted = false;

  static async load(url: string): Promise<AlienRig> {
    const gltf = await new GLTFLoader().loadAsync(url);
    return new AlienRig(gltf.scene, gltf.animations);
  }

  private constructor(model: THREE.Object3D, clips: THREE.AnimationClip[]) {
    this.object.name = 'alien';
    this.model = model;
    model.scale.multiplyScalar(MODEL_SCALE);
    this.object.add(model);
    this.object.updateMatrixWorld(true);

    const meshes: Record<string, THREE.SkinnedMesh> = {};
    model.traverse((o) => {
      const mesh = o as THREE.SkinnedMesh;
      if (!mesh.isMesh) return;
      mesh.frustumCulled = false; // skinned bounds don't follow the animation
      const name = (mesh.material as THREE.Material).name;
      meshes[name] = mesh;
    });
    const body = meshes.Jelly_Cyan_Violet;
    const eyes = meshes.Eyes;
    const cavity = meshes.Mouth_Cavity;
    const head = model.getObjectByName('Head');

    if (body) body.material = jelly(toStandard(body.material as THREE.Material) as THREE.MeshStandardMaterial);
    if (eyes) {
      // The baked eye texture is noisy up close; clean glossy dark eyes read better.
      eyes.material = new THREE.MeshStandardMaterial({ color: '#1d1838', roughness: 0.12, metalness: 0 });
    }
    if (cavity) cavity.material = toStandard(cavity.material as THREE.Material);

    if (body && cavity) this.buildMouth([body, cavity], cavity);
    if (eyes && head) for (const shape of eyeShapes(eyes)) this.buildEye(shape, head);

    for (const [side, list] of [['L', this.antennae[0]], ['R', this.antennae[1]]] as const) {
      for (let i = 1; i <= 5; i++) {
        const b = model.getObjectByName(`Antenna_0${i}_${side}`);
        if (b) list.push(b);
      }
    }
    this.gaze = new Gaze(this.object, head, model.getObjectByName('Neck'));

    this.mixer = new THREE.AnimationMixer(model);
    for (const [key, name] of Object.entries(CLIP_NAMES) as Array<[Clip, string]>) {
      const clip = THREE.AnimationClip.findByName(clips, name);
      if (clip) this.actions[key] = this.mixer.clipAction(clip);
    }
    for (const key of ['wave', 'celebrate'] as const) {
      const a = this.actions[key];
      if (a) {
        a.setLoop(THREE.LoopOnce, 1);
        a.clampWhenFinished = true;
      }
    }
    this.mixer.addEventListener('finished', () => {
      this.oneShot = false;
      this.play(this.base, 0.4);
    });
    this.setBase(this.actions.sit, 0);
  }

  // ------------------------------------------------------------ face build

  /**
   * Generates a "mouth open" morph: the cavity stretches down from its top
   * edge and the jelly around and below it (lower lip, chin) follows, fading
   * out to the sides and downwards so nothing tears.
   */
  private buildMouth(meshes: THREE.SkinnedMesh[], cavity: THREE.SkinnedMesh): void {
    const cavityWorld = restPositions(cavity);
    const box = new THREE.Box3().setFromPoints(cavityWorld);
    const cx = (box.min.x + box.max.x) / 2;
    const top = box.max.y;
    const bottom = box.min.y;
    const h = Math.max(top - bottom, 1e-4);
    const halfW = (box.max.x - box.min.x) / 2;
    const front = box.min.z - h * 1.5;
    const drop = h * 1.6; // fully open: the mouth about two and a half times as tall
    const smooth = THREE.MathUtils.smoothstep;

    for (const mesh of meshes) {
      const world = mesh === cavity ? cavityWorld : restPositions(mesh);
      const toLocal = restLinearInverse(mesh);
      const deltas = new Float32Array(world.length * 3);
      const d = new THREE.Vector3();
      world.forEach((p, i) => {
        if (p.z < front || p.y > top || p.y < bottom - h * 2.2) return;
        const fx = 1 - smooth(Math.abs(p.x - cx), halfW * 0.75, halfW * 1.35);
        if (fx <= 0) return;
        const fy = p.y >= bottom ? (top - p.y) / h : 1 - smooth(bottom - p.y, 0, h * 2.2);
        d.set(0, -drop * fx * fy, 0).applyMatrix3(toLocal);
        deltas.set([d.x, d.y, d.z], i * 3);
      });
      const geometry = mesh.geometry;
      geometry.morphAttributes = { position: [new THREE.Float32BufferAttribute(deltas, 3)] };
      geometry.morphTargetsRelative = true;
      mesh.updateMorphTargets();
      mesh.morphTargetDictionary = { mouthOpen: 0 };
      mesh.morphTargetInfluences = [0];
      this.mouths.push(mesh);
    }
  }

  /** Eyelid (body-coloured, closes from the top) and two highlights, riding on the head bone. */
  private buildEye(eye: EyeShape, head: THREE.Object3D): void {
    const attach = (obj: THREE.Object3D, worldPos: THREE.Vector3) => {
      const m = new THREE.Matrix4().compose(worldPos, this.object.getWorldQuaternion(new THREE.Quaternion()), new THREE.Vector3(1, 1, 1));
      m.premultiply(head.matrixWorld.clone().invert());
      m.decompose(obj.position, obj.quaternion, obj.scale);
      head.add(obj);
    };

    const lidPivot = new THREE.Group();
    const lid = new THREE.Mesh(
      new THREE.SphereGeometry(1, 24, 16),
      // Same brightness as the glowing jelly skin around it.
      new THREE.MeshStandardMaterial({ color: BODY_COLOR, emissive: BODY_COLOR.clone().multiplyScalar(0.45), roughness: 0.3 }),
    );
    lid.scale.copy(eye.radii).multiplyScalar(1.07);
    lid.position.y = -eye.radii.y * 1.07;
    lidPivot.add(lid);
    lidPivot.visible = false;
    attach(lidPivot, eye.center.clone().setY(eye.center.y + eye.radii.y * 1.07));
    this.lids.push({ pivot: lidPivot, sy: lidPivot.scale.y });

    const shine = new THREE.MeshBasicMaterial({ color: '#ffffff' });
    for (const [ox, oy, r] of [
      [-0.3, 0.38, 0.3],
      [0.28, -0.3, 0.13],
    ]) {
      const want = new THREE.Vector2(eye.center.x + ox * eye.radii.x, eye.center.y + oy * eye.radii.y);
      // Sit on the eye's surface there (nearest front vertex), just proud of it.
      let z = eye.center.z + eye.radii.z * 0.8;
      let best = Infinity;
      for (const p of eye.front) {
        const dd = (p.x - want.x) ** 2 + (p.y - want.y) ** 2;
        if (dd < best) {
          best = dd;
          z = p.z;
        }
      }
      const dot = new THREE.Mesh(new THREE.CircleGeometry(r * eye.radii.x, 20), shine);
      attach(dot, new THREE.Vector3(want.x, want.y, z + eye.radii.z * 0.04));
      this.shines.push({ dot, coveredAt: (1 - oy) / 2 });
    }
  }

  // ------------------------------------------------------------- contract

  private play(next: THREE.AnimationAction | undefined, fade = FADE): void {
    if (!next || next === this.current) return;
    next.reset().setEffectiveWeight(1).play();
    if (this.current) this.current.crossFadeTo(next, fade, false);
    this.current = next;
  }

  private setBase(next: THREE.AnimationAction | undefined, fade = FADE): void {
    this.base = next;
    if (!this.oneShot) this.play(next, fade);
  }

  private playOnce(clip: 'wave' | 'celebrate'): void {
    const a = this.actions[clip];
    if (!a || this.posture === 'seated') return; // both are standing clips
    this.oneShot = true;
    this.current = undefined; // force a restart even if it is the same clip
    a.reset();
    this.base?.crossFadeTo(a, 0.25, false);
    a.play();
    this.current = a;
  }

  setPosture(requested: Posture): void {
    const p: Posture = requested === 'flying' ? 'standing' : requested;
    if (p === this.posture) return;
    this.posture = p;
    this.oneShot = false;
    this.setBase(p === 'seated' ? this.actions.sit : this.actions.idle);
  }

  setLocomotion(speed: number): void {
    this.speed = speed;
    if (this.posture !== 'standing') return;
    if (speed > 0.08) {
      const run = speed > RUN_FROM && this.actions.run;
      const clip = run ? this.actions.run : this.actions.walk;
      this.oneShot = false;
      this.setBase(clip, 0.25);
      if (clip) clip.timeScale = THREE.MathUtils.clamp(speed / (run ? RUN_FROM * 1.6 : WALK_CLIP_SPEED), 0.6, 1.6);
    } else {
      this.setBase(this.actions.idle, 0.3);
    }
  }

  setState(state: BehaviorState): void {
    if (state === this.state) return;
    if (state === 'speaking' && !this.greeted) {
      this.greeted = true;
      if (this.speed < 0.08) this.playOnce('wave');
    }
    if (state === 'reacting') {
      this.wobble = 1;
      if (this.speed < 0.08) this.playOnce('celebrate');
    }
    this.state = state;
  }

  setMouthOpen(amount: number): void {
    this.mouthTarget = THREE.MathUtils.clamp(amount, 0, 1);
  }

  lookAt(target: THREE.Vector3): void {
    this.gaze.target.copy(target);
  }

  gesture(_g: Gesture): void {
    // Body language comes from the authored clips (wave, celebrate).
  }

  setExpression(e: Expression): void {
    this.expression = e;
  }

  update(dt: number, time: number): void {
    for (const [b, q] of this.sway) b.quaternion.multiply(q.invert());
    this.gaze.restore();
    this.mixer.update(dt);
    this.object.updateMatrixWorld(true);

    const speaking = this.state === 'speaking' || this.state === 'storytelling';
    this.mouth01 = damp(this.mouth01, speaking ? this.mouthTarget : 0, 18, dt);
    let open = this.mouth01;
    if (this.state === 'interrupted' || this.expression === 'surprised') open = Math.max(open, 0.35);
    for (const m of this.mouths) m.morphTargetInfluences![0] = open;

    let blink = this.blinker.update(dt);
    if (this.state === 'reacting') blink = Math.max(blink, 0.55); // happy squint
    for (const { pivot, sy } of this.lids) {
      pivot.visible = blink > 0.02;
      pivot.scale.y = sy * Math.max(blink, 0.001);
    }
    for (const { dot, coveredAt } of this.shines) dot.visible = blink < coveredAt;

    // Jelly: a soft breathing squash, a jiggle while talking, a big wobble when delighted.
    this.wobble = Math.max(0, this.wobble - dt * 0.9);
    const squash =
      Math.sin(time * 2.2) * 0.012 + this.mouth01 * Math.sin(time * 17) * 0.012 + this.wobble * Math.sin(time * 14) * 0.06;
    const s = MODEL_SCALE;
    this.model.scale.set(s * (1 - squash * 0.5), s * (1 + squash), s * (1 - squash * 0.5));

    // Springy antennae: each segment sways a little more than the one below it.
    const energy = 0.6 + this.mouth01 * 0.8 + this.wobble * 2 + Math.min(this.speed, 1.5) * 0.5;
    this.antennae.forEach((chain, side) => {
      chain.forEach((b, i) => {
        const k = (i + 1) * 0.022 * energy;
        const q = this.sway.get(b) ?? new THREE.Quaternion();
        q.setFromEuler(new THREE.Euler(Math.sin(time * 3.1 + i * 0.7 + side) * k, 0, Math.sin(time * 2.3 + i * 0.9 + side * 2) * k * 0.8));
        b.quaternion.multiply(q);
        this.sway.set(b, q);
      });
    });

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

// ---------------------------------------------------------------- helpers

/** World positions of a skinned mesh's vertices in the current (rest) pose. */
function restPositions(mesh: THREE.SkinnedMesh): THREE.Vector3[] {
  const pos = mesh.geometry.attributes.position;
  const out: THREE.Vector3[] = [];
  for (let i = 0; i < pos.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(pos, i);
    mesh.applyBoneTransform(i, v);
    out.push(v.applyMatrix4(mesh.matrixWorld));
  }
  return out;
}

/**
 * Inverse of the (uniform, rest-pose) linear map from geometry space to world
 * space, so world-space morph offsets can be stored in geometry units (the
 * optimised model's positions are quantized and rescaled by its skin).
 */
function restLinearInverse(mesh: THREE.SkinnedMesh): THREE.Matrix3 {
  const at = (v: THREE.Vector3) => mesh.applyBoneTransform(0, v.clone()).applyMatrix4(mesh.matrixWorld);
  const o = at(new THREE.Vector3());
  const cols = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)].map((e) => at(e).sub(o));
  const m = new THREE.Matrix3().set(cols[0].x, cols[1].x, cols[2].x, cols[0].y, cols[1].y, cols[2].y, cols[0].z, cols[1].z, cols[2].z);
  return m.invert();
}

/** Splits the eyes mesh into left/right ellipsoids (rest pose, world space). */
function eyeShapes(eyes: THREE.SkinnedMesh): EyeShape[] {
  const pts = restPositions(eyes);
  const midX = pts.reduce((s, p) => s + p.x, 0) / pts.length;
  return [pts.filter((p) => p.x < midX), pts.filter((p) => p.x >= midX)].map((side) => {
    const box = new THREE.Box3().setFromPoints(side);
    const center = box.getCenter(new THREE.Vector3());
    const radii = box.getSize(new THREE.Vector3()).multiplyScalar(0.5);
    const front = side.filter((p) => p.z > center.z);
    return { center, radii, front };
  });
}

/** Jelly look without transmission: a soft lilac rim and a faint inner glow. */
function jelly(material: THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  material.roughness = 0.28;
  // Glow from its own colours, so the cyan→violet jelly stays bright without
  // the transmission pass (and in passthrough, where there is no environment map).
  material.emissiveMap = material.map;
  material.emissive = new THREE.Color(0.42, 0.42, 0.42);
  material.onBeforeCompile = (shader) => {
    shader.uniforms.rimColor = { value: RIM_COLOR };
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec3 rimColor;')
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        float rim = 1.0 - saturate(dot(normal, normalize(vViewPosition)));
        totalEmissiveRadiance += rimColor * pow(rim, 2.5) * 0.55;`,
      );
  };
  material.customProgramCacheKey = () => 'jelly-rim';
  return material;
}
