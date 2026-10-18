import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BehaviorMachine } from '../core/behavior';
import type { CharacterRig, Posture } from './character/CharacterRig';
import { EnvironmentManager } from './environments';
import { createMajlis, type Majlis } from './majlis';

export type ViewMode = 'vr' | 'mr';

/**
 * Owns the renderer, the scene graph and the frame loop. The `stage` group
 * holds the environment, the elder and his lights, and is what MR placement
 * moves around.
 */
export class SceneApp {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly stage = new THREE.Group();
  readonly majlis: Majlis;
  readonly environments: EnvironmentManager;
  private rig: CharacterRig | null = null;
  private posture: Posture = 'seated';
  readonly behavior = new BehaviorMachine();
  readonly controls: OrbitControls;
  private readonly timer = new THREE.Timer();
  private readonly frameHooks: Array<(dt: number, time: number, frame?: XRFrame) => void> = [];
  private readonly headWorld = new THREE.Vector3();
  private viewMode: ViewMode = 'vr';

  constructor(container: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.xr.enabled = true;
    this.renderer.xr.setReferenceSpaceType('local-floor');
    this.renderer.xr.setFoveation(1);
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.05, 100);
    this.frameCamera(container);

    this.scene.add(this.stage);
    this.majlis = createMajlis();
    this.environments = new EnvironmentManager(this.majlis.full);
    this.stage.add(this.environments.root, this.majlis.core, this.majlis.lights);

    this.behavior.on('change', ({ to }) => this.rig?.setState(to));

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0.8, 0);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.minDistance = 0.9;
    this.controls.maxDistance = 3.2;
    this.controls.minPolarAngle = Math.PI * 0.3;
    this.controls.maxPolarAngle = Math.PI * 0.55;
    this.controls.minAzimuthAngle = -Math.PI * 0.45;
    this.controls.maxAzimuthAngle = Math.PI * 0.45;
    this.controls.update();

    window.addEventListener('resize', () => this.resize(container));
    this.renderer.setAnimationLoop((timestamp, frame) => this.tick(timestamp, frame));
  }

  get character(): CharacterRig | null {
    return this.rig;
  }

  setCharacter(rig: CharacterRig): void {
    this.rig?.dispose();
    this.rig = rig;
    rig.setState(this.behavior.state);
    rig.setPosture(this.posture);
    this.stage.add(rig.object);
  }

  get currentPosture(): Posture {
    return this.posture;
  }

  /** Posture survives character swaps (e.g. switching while walking together). */
  setPosture(p: Posture): void {
    this.posture = p;
    this.rig?.setPosture(p);
  }

  /** Registers a callback that runs every frame (2D and XR). */
  onFrame(fn: (dt: number, time: number, frame?: XRFrame) => void): void {
    this.frameHooks.push(fn);
  }

  get mode(): ViewMode {
    return this.viewMode;
  }

  /** VR shows the whole environment; MR keeps only the elder, his rug and coffee set. */
  setViewMode(mode: ViewMode): void {
    this.viewMode = mode;
    this.environments.root.visible = mode === 'vr';
  }

  /** Portrait phones need the camera further back to fit the seated elder. */
  private frameCamera(container: HTMLElement): void {
    const portrait = container.clientWidth < container.clientHeight;
    this.camera.fov = portrait ? 70 : 55;
    this.camera.position.set(0, portrait ? 1.0 : 1.05, portrait ? 2.5 : 1.9);
    this.camera.updateProjectionMatrix();
  }

  private resize(container: HTMLElement): void {
    if (this.renderer.xr.isPresenting) return;
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  private tick(timestamp: number, frame?: XRFrame): void {
    this.timer.update(timestamp);
    const dt = Math.min(this.timer.getDelta(), 0.1);
    const time = this.timer.getElapsed();
    if (!this.renderer.xr.isPresenting) this.controls.update();

    // The elder looks at the player's head (XR camera when presenting).
    const viewer = this.renderer.xr.isPresenting ? this.renderer.xr.getCamera() : this.camera;
    viewer.getWorldPosition(this.headWorld);
    this.rig?.lookAt(this.headWorld);

    this.behavior.update(performance.now());
    for (const hook of this.frameHooks) hook(dt, time, frame);
    this.rig?.update(dt, time);
    this.renderer.render(this.scene, this.camera);
  }
}
