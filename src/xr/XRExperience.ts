import * as THREE from 'three';
import { statusText, type Conversation } from '../conversation';
import type { Transcript, VoiceStatus } from '../core/voice';
import { t, type MessageKey } from '../i18n';
import { ENVIRONMENTS, type EnvironmentId } from '../scene/environments';
import type { SceneApp, ViewMode } from '../scene/SceneApp';
import { Companion } from './Companion';
import { EMPTY_ROOM, Room, geometryFromPlanes, type RoomGeometry } from './room';
import { XRPanel } from './XRPanel';

export interface XRCapabilities {
  vr: boolean;
  ar: boolean;
}

export interface XRCallbacks {
  onSessionEnd(): void;
  setEnvironment(id: EnvironmentId): Promise<void>;
  conversation: Conversation;
}

const ELDER_DISTANCE = 1.5;
const HIT_TEST_TIMEOUT_S = 4;

/**
 * WebXR session handling for Quest:
 * - Prefers ONE `immersive-ar` session; VR = opaque majlis drawn over
 *   passthrough, MR = majlis hidden. Switching never restarts the session,
 *   so anything else running on the page (e.g. the voice session) survives.
 * - Falls back to `immersive-vr` where AR is unavailable.
 * - MR placement: floor hit-test reticle + trigger/pinch; manual placement
 *   in front of the player when hit-test is missing or denied.
 */
export class XRExperience {
  private session: XRSession | null = null;
  private kind: 'ar' | 'vr' | null = null;
  private readonly panel = new XRPanel();
  private readonly reticle: THREE.Mesh;
  private readonly raycaster = new THREE.Raycaster();
  private readonly controllers: THREE.Group[] = [];
  private readonly tmpMatrix = new THREE.Matrix4();
  private hitTestSource: XRHitTestSource | null = null;
  private placing = false;
  private placingSince = 0;
  private needsInitialPlacement = false;
  /** Start walking together on the next frame (once the head pose is known). */
  private companionPending = false;
  private reticleValid = false;
  private lastButtons = new Map<XRInputSource, boolean>();
  private lastCut = new Map<XRInputSource, boolean>();
  private frames = 0;
  private fpsWindowStart = 0;
  private fps = 0;
  private hint = '';
  private elapsed = 0;
  private voiceStatus: VoiceStatus = { kind: 'idle' };
  /** "Walk with me" (MR only): the elder stands and walks beside the player. */
  private companionOn = false;
  private readonly companion = new Companion();
  /** Walls / floor / furniture from WebXR plane detection (Quest Space Setup). */
  private readonly room = new Room(0.25);
  private roomRefreshAt = 0;
  private roomOutline: THREE.LineSegments | null = null;
  private roomOutlineUntil = 0;
  private roomCaptureUsed = false;
  /** Latest words of the elder, shown on the panel. */
  private caption = '';

  static async capabilities(): Promise<XRCapabilities> {
    const xr = navigator.xr;
    if (!xr || !window.isSecureContext) return { vr: false, ar: false };
    const [vr, ar] = await Promise.all([
      xr.isSessionSupported('immersive-vr').catch(() => false),
      xr.isSessionSupported('immersive-ar').catch(() => false),
    ]);
    return { vr, ar };
  }

  constructor(
    private readonly app: SceneApp,
    private readonly caps: XRCapabilities,
    private readonly callbacks: XRCallbacks,
  ) {
    this.reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.12, 0.16, 32).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: '#f3d58a' }),
    );
    this.reticle.matrixAutoUpdate = false;
    this.reticle.visible = false;
    app.scene.add(this.reticle);

    // Panel sits beside the elder, angled toward the player.
    this.panel.mesh.position.set(0.62, 0.95, 0.75);
    this.panel.mesh.rotation.set(-0.3, -0.45, 0);
    this.panel.mesh.visible = false;
    app.stage.add(this.panel.mesh);

    this.setupControllers();
    callbacks.conversation.addView({
      status: (s: VoiceStatus) => {
        this.voiceStatus = s;
        if (s.kind === 'connecting') this.caption = '';
        this.refreshPanel();
      },
      transcript: (tr: Transcript) => {
        if (tr.role === 'character') this.caption = tr.text;
      },
      speakingChanged: () => this.refreshPanel(),
    });
    app.onFrame((dt, _time, frame) => this.onFrame(dt, frame));
  }

  get active(): boolean {
    return this.session !== null;
  }

  async start(mode: ViewMode): Promise<void> {
    if (this.session) return this.setMode(mode);
    const xr = navigator.xr;
    if (!xr) throw new Error('WebXR unavailable');

    let session: XRSession;
    if (this.caps.ar) {
      session = await xr.requestSession('immersive-ar', {
        requiredFeatures: ['local-floor'],
        optionalFeatures: ['hit-test', 'hand-tracking', 'plane-detection', 'anchors'],
      });
      this.kind = 'ar';
    } else if (mode === 'vr' && this.caps.vr) {
      session = await xr.requestSession('immersive-vr', {
        requiredFeatures: ['local-floor'],
        optionalFeatures: ['hand-tracking'],
      });
      this.kind = 'vr';
    } else {
      throw new Error(t('xr.mrUnavailable'));
    }

    this.session = session;
    session.addEventListener('end', () => this.onSessionEnd());
    await this.app.renderer.xr.setSession(session);
    this.preferFrameRate(session, 72);

    if (this.kind === 'ar') {
      try {
        const viewer = await session.requestReferenceSpace('viewer');
        this.hitTestSource = (await session.requestHitTestSource?.({ space: viewer })) ?? null;
      } catch {
        // Hit-test missing or permission denied: manual placement is used instead.
        this.hitTestSource = null;
      }
    }

    this.needsInitialPlacement = true;
    this.panel.mesh.visible = true;
    this.applyMode(mode);
  }

  async setMode(mode: ViewMode): Promise<void> {
    if (!this.session) return this.start(mode);
    if (mode === 'mr' && this.kind !== 'ar') throw new Error(t('xr.mrUnavailable'));
    this.applyMode(mode);
  }

  end(): void {
    void this.session?.end();
  }

  /**
   * MR = the player is up and moving around their room, so the character
   * stands and walks along straight away ("Sit down" is still available).
   * VR = seated in the majlis; never walk around blind.
   */
  private applyMode(mode: ViewMode): void {
    if (mode === 'mr') this.companionPending = true;
    else this.setCompanion(false);
    this.app.setViewMode(mode);
    this.setPlacing(false);
    this.refreshPanel();
  }

  private setPlacing(on: boolean): void {
    this.placing = on;
    this.placingSince = this.elapsed;
    this.reticle.visible = false;
    this.hint = on ? t('xr.placeHint') : '';
  }

  private refreshPanel(): void {
    const buttons = [];
    if (this.kind === 'ar') {
      buttons.push(
        this.app.mode === 'vr'
          ? { id: 'mode', label: t('btn.switchToMR') }
          : { id: 'mode', label: t('btn.switchToVR') },
      );
    }
    if (this.app.mode === 'vr') buttons.push({ id: 'env', label: t(`env.${this.app.environments.current}` as MessageKey) });
    if (this.app.mode === 'mr' && !this.companionOn) buttons.push({ id: 'place', label: t('btn.place') });
    if (this.app.mode === 'mr') buttons.push({ id: 'walk', label: this.companionOn ? t('companion.stop') : t('companion.start') });
    if (this.app.mode === 'mr' && !this.room.known && this.session?.initiateRoomCapture && !this.roomCaptureUsed) {
      buttons.push({ id: 'scan', label: t('btn.scan') });
    }
    const voice = this.callbacks.conversation;
    if (voice.configured) {
      if (voice.active && voice.isSpeaking) buttons.push({ id: 'cut', label: t('talk.cut') });
      else buttons.push({ id: 'talk', label: voice.active ? t('talk.stop') : t('talk.start') });
    }
    buttons.push({ id: 'exit', label: t('btn.exit') });
    this.panel.setButtons(buttons);
    this.panel.setStatus(voice.configured && this.voiceStatus.kind !== 'idle' ? statusText(this.voiceStatus) : t('app.title'));
  }

  private activate(id: string): void {
    if (id === 'mode') void this.setMode(this.app.mode === 'vr' ? 'mr' : 'vr');
    else if (id === 'place') this.setPlacing(true);
    else if (id === 'walk') this.setCompanion(!this.companionOn);
    else if (id === 'scan') {
      this.roomCaptureUsed = true; // the API allows one call per session
      void this.session?.initiateRoomCapture?.().catch(() => undefined);
      this.refreshPanel();
    }
    else if (id === 'env') {
      const next = ENVIRONMENTS[(ENVIRONMENTS.indexOf(this.app.environments.current) + 1) % ENVIRONMENTS.length];
      this.hint = t('env.loading');
      void this.callbacks.setEnvironment(next).finally(() => {
        this.hint = '';
        this.refreshPanel();
      });
      this.refreshPanel();
    }
    else if (id === 'talk') {
      this.callbacks.conversation.toggle();
      this.refreshPanel();
    } else if (id === 'cut') this.callbacks.conversation.interrupt();
    else if (id === 'exit') this.end();
  }

  private setupControllers(): void {
    const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)]);
    const lineMat = new THREE.LineBasicMaterial({ color: '#f3e6cc', transparent: true, opacity: 0.6 });
    for (let i = 0; i < 2; i++) {
      const controller = this.app.renderer.xr.getController(i);
      const line = new THREE.Line(lineGeo, lineMat);
      line.scale.z = 2;
      controller.add(line);
      controller.addEventListener('select', () => this.onSelect(controller));
      this.app.scene.add(controller);
      this.controllers.push(controller);
    }
  }

  private panelHit(controller: THREE.Object3D): string | null {
    if (!this.panel.mesh.visible) return null;
    this.tmpMatrix.identity().extractRotation(controller.matrixWorld);
    this.raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    this.raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this.tmpMatrix);
    const hit = this.raycaster.intersectObject(this.panel.mesh, false)[0];
    return hit?.uv ? this.panel.buttonAt(hit.uv) : null;
  }

  private onSelect(controller: THREE.Object3D): void {
    const button = this.panelHit(controller);
    if (button) {
      this.activate(button);
      return;
    }
    if (this.placing && this.reticleValid) {
      const p = new THREE.Vector3().setFromMatrixPosition(this.reticle.matrix);
      this.placeStageAt(p);
      this.setPlacing(false);
    }
  }

  private onFrame(dt: number, frame?: XRFrame): void {
    if (!this.session || !frame) return;
    this.elapsed += dt;
    const camera = this.app.renderer.xr.getCamera();

    if (this.needsInitialPlacement) {
      this.needsInitialPlacement = false;
      this.placeInFrontOf(camera);
    }
    if (this.companionPending) {
      this.companionPending = false;
      if (this.app.mode === 'mr') this.setCompanion(true);
    }

    // Floor reticle for MR placement.
    this.reticleValid = false;
    if (this.placing && this.hitTestSource) {
      const ref = this.app.renderer.xr.getReferenceSpace();
      const result = ref ? frame.getHitTestResults(this.hitTestSource)[0] : undefined;
      const pose = result && ref ? result.getPose(ref) : undefined;
      if (pose) {
        this.reticle.matrix.fromArray(pose.transform.matrix);
        this.reticleValid = true;
      }
    }
    this.reticle.visible = this.reticleValid;
    if (this.placing && !this.reticleValid && this.elapsed - this.placingSince > HIT_TEST_TIMEOUT_S) {
      this.placeInFrontOf(camera);
      this.setPlacing(false);
      this.hint = t('xr.placedManual');
    }

    if (this.kind === 'ar' && this.elapsed >= this.roomRefreshAt) {
      this.roomRefreshAt = this.elapsed + 1;
      this.refreshRoom(frame);
    }
    if (this.roomOutline) this.roomOutline.visible = this.app.mode === 'mr' && (this.placing || this.elapsed < this.roomOutlineUntil);

    if (this.companionOn) {
      const head = new THREE.Vector3().setFromMatrixPosition(camera.matrixWorld);
      this.companion.update(dt, head, this.room);
      this.app.stage.position.copy(this.companion.position).setY(this.room.geometry.floorY);
      this.app.stage.rotation.set(0, this.companion.yaw, 0);
      this.app.character?.setLocomotion(this.companion.speed);
      // Keep the panel out of the way while he walks.
      this.panel.mesh.visible = this.companion.speed < 0.1;
    }

    // Hover feedback; A/X toggles VR/MR, B/Y cuts the elder off.
    let hovered: string | null = null;
    for (const c of this.controllers) hovered ??= this.panelHit(c);
    this.panel.setHovered(hovered);
    for (const source of this.session.inputSources) {
      const pressed = Boolean(source.gamepad?.buttons[4]?.pressed);
      if (pressed && !this.lastButtons.get(source) && this.kind === 'ar') this.activate('mode');
      this.lastButtons.set(source, pressed);
      const cut = Boolean(source.gamepad?.buttons[5]?.pressed);
      if (cut && !this.lastCut.get(source)) this.callbacks.conversation.interrupt();
      this.lastCut.set(source, cut);
    }

    // Frame-rate measurement shown on the panel (real numbers from the device).
    this.frames++;
    if (this.elapsed - this.fpsWindowStart >= 1) {
      this.fps = Math.round(this.frames / (this.elapsed - this.fpsWindowStart));
      this.frames = 0;
      this.fpsWindowStart = this.elapsed;
    }
    const words = this.caption.length > 70 ? `…${this.caption.slice(-70)}` : this.caption;
    this.panel.setInfo([this.hint || words, `${this.fps} fps`].filter(Boolean).join(' · '));
  }

  private setCompanion(on: boolean): void {
    if (on === this.companionOn) return;
    this.companionOn = on;
    const rig = this.app.character;
    const camera = this.app.renderer.xr.getCamera();
    const head = new THREE.Vector3().setFromMatrixPosition(camera.matrixWorld);
    if (on) {
      this.setPlacing(false);
      this.hint = this.room.known ? this.roomStatus() : t('room.none');
      this.roomOutlineUntil = this.elapsed + 6;
      this.app.majlis.core.visible = false;
      this.app.setPosture('standing');
      const look = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.getWorldQuaternion(new THREE.Quaternion()));
      this.companion.reset(this.app.stage.position, this.app.stage.rotation.y, head, look);
    } else {
      this.hint = '';
      rig?.setLocomotion(0);
      this.app.setPosture('seated');
      this.app.majlis.core.visible = true;
      this.panel.mesh.visible = this.session !== null;
      // Sit down right where he is, facing the player.
      this.placeStageAt(this.app.stage.position.clone().setY(0), head);
    }
    this.refreshPanel();
  }

  /** Puts the elder ELDER_DISTANCE in front of the player, on the floor, facing them. */
  private placeInFrontOf(camera: THREE.Camera): void {
    const head = new THREE.Vector3().setFromMatrixPosition(camera.matrixWorld);
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.getWorldQuaternion(new THREE.Quaternion()));
    forward.y = 0;
    if (forward.lengthSq() < 1e-4) forward.set(0, 0, -1);
    forward.normalize();
    const at = (d: number, side = 0) => ({
      x: head.x + forward.x * d - forward.z * side,
      z: head.z + forward.z * d + forward.x * side,
    });
    const from = { x: head.x, z: head.z };
    const spot = this.room.firstFree([at(ELDER_DISTANCE), at(1.2), at(1.0, 0.6), at(1.0, -0.6), at(0.9)], from) ?? at(ELDER_DISTANCE);
    this.placeStageAt(new THREE.Vector3(spot.x, this.room.geometry.floorY, spot.z), head);
  }

  private roomStatus(): string {
    const g = this.room.geometry;
    return t('room.status', { walls: String(g.walls.length), items: String(g.obstacles.length) });
  }

  /** Rebuilds the room model from the planes the headset reports (Space Setup). */
  private refreshRoom(frame: XRFrame): void {
    const ref = this.app.renderer.xr.getReferenceSpace();
    const planes = frame.detectedPlanes;
    if (!ref || !planes || planes.size === 0) return;
    const items: Array<{ plane: XRPlane; matrix: Float32Array }> = [];
    planes.forEach((plane) => {
      const pose = frame.getPose(plane.planeSpace, ref);
      if (pose) items.push({ plane, matrix: pose.transform.matrix });
    });
    const wasKnown = this.room.known;
    this.room.geometry = geometryFromPlanes(items);
    this.updateRoomOutline(this.room.geometry);
    if (!wasKnown && this.room.known) this.refreshPanel(); // hides the scan button
  }

  private updateRoomOutline(g: RoomGeometry): void {
    const pts: number[] = [];
    const y = g.floorY + 0.02;
    const loop = (poly: Array<{ x: number; z: number }>, h: number) =>
      poly.forEach((a, i) => {
        const b = poly[(i + 1) % poly.length];
        pts.push(a.x, h, a.z, b.x, h, b.z);
      });
    g.walls.forEach((w) => pts.push(w.a.x, y, w.a.z, w.b.x, y, w.b.z, w.a.x, y + 1, w.a.z, w.b.x, y + 1, w.b.z));
    g.obstacles.forEach((o) => loop(o, y));
    if (g.floor) loop(g.floor, y);
    if (!this.roomOutline) {
      this.roomOutline = new THREE.LineSegments(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({ color: '#f3d58a', transparent: true, opacity: 0.7 }),
      );
      this.roomOutline.visible = false;
      this.app.scene.add(this.roomOutline);
    }
    this.roomOutline.geometry.dispose();
    this.roomOutline.geometry = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  }

  private placeStageAt(point: THREE.Vector3, facing?: THREE.Vector3): void {
    const head = facing ?? new THREE.Vector3().setFromMatrixPosition(this.app.renderer.xr.getCamera().matrixWorld);
    this.app.stage.position.copy(point);
    this.app.stage.rotation.set(0, Math.atan2(head.x - point.x, head.z - point.z), 0);
  }

  private preferFrameRate(session: XRSession, hz: number): void {
    const rates = session.supportedFrameRates;
    if (rates && Array.from(rates).includes(hz)) void session.updateTargetFrameRate?.(hz).catch(() => undefined);
  }

  private onSessionEnd(): void {
    this.companionPending = false;
    this.setCompanion(false);
    this.room.geometry = EMPTY_ROOM;
    this.roomCaptureUsed = false;
    if (this.roomOutline) this.roomOutline.visible = false;
    this.session = null;
    this.kind = null;
    this.hitTestSource = null;
    this.placing = false;
    this.reticle.visible = false;
    this.panel.mesh.visible = false;
    this.app.stage.position.set(0, 0, 0);
    this.app.stage.rotation.set(0, 0, 0);
    this.app.setViewMode('vr');
    this.callbacks.onSessionEnd();
  }
}
