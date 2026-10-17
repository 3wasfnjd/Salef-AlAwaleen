/*
 * «حمى الدحاريج»: Dahrooj balls floating like balloons around Nawwara.
 * Colours and faces come from 3wasfnjd/Dahrooj-Quest (palette.js DAHROOJ_SWATCHES,
 * face.js), used with the owner's authorization (Aboden Games, 2026-10-17).
 */
import * as THREE from 'three';
import { drawReferenceFace } from '../vendor/dahrooj/face.js';

const STYLES: Array<{ style: string; light: string; dark: string }> = [
  { style: 'jelly', light: '#ffb3d7', dark: '#f54b9a' },
  { style: 'fabric', light: '#d7b5ff', dark: '#a45cf0' },
  { style: 'clay', light: '#ffd094', dark: '#ff922e' },
  { style: 'fur', light: '#fffaf2', dark: '#d9cfc0' },
  { style: 'bubble', light: '#e9f6ff', dark: '#9fcbe8' },
];

interface Balloon {
  group: THREE.Group;
  body: THREE.Mesh;
  color: THREE.Color;
  r: number;
  angle: number;
  orbit: number;
  height: number;
  speed: number;
  phase: number;
  /** Seconds until it comes back after being popped (0 = alive). */
  respawn: number;
  pos: THREE.Vector3;
}

function faceTexture(face: 'joy' | 'laugh'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const c = canvas.getContext('2d')!;
  c.translate(64, 64);
  drawReferenceFace(c, 56, face, 0, 0, 0.9, false, 'jelly');
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Glossy two-tone balloon skin (light top, deeper bottom, a highlight). */
function skinTexture(light: string, dark: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 64;
  const c = canvas.getContext('2d')!;
  const g = c.createLinearGradient(0, 0, 0, 64);
  g.addColorStop(0, light);
  g.addColorStop(1, dark);
  c.fillStyle = g;
  c.fillRect(0, 0, 128, 64);
  // Glint on the upper front-left (u ≈ 0.25 faces +Z, which turns to the viewer).
  const h = c.createRadialGradient(26, 18, 0, 26, 18, 12);
  h.addColorStop(0, 'rgba(255,255,255,0.9)');
  h.addColorStop(1, 'rgba(255,255,255,0)');
  c.fillStyle = h;
  c.fillRect(0, 0, 128, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class DahroojBalloons {
  readonly group = new THREE.Group();
  private readonly balloons: Balloon[] = [];
  private readonly anchor = new THREE.Vector3();
  private readonly viewer = new THREE.Vector3();
  private time = 0;

  constructor(count = 7) {
    this.group.name = 'dahrooj-balloons';
    const faces = [faceTexture('joy'), faceTexture('laugh')];
    const faceGeo = new THREE.CircleGeometry(1, 24);
    const bodyGeo = new THREE.SphereGeometry(1, 20, 14);
    const knotGeo = new THREE.ConeGeometry(0.12, 0.2, 8);
    for (let i = 0; i < count; i++) {
      const s = STYLES[i % STYLES.length];
      const r = 0.055 + Math.random() * 0.03;
      const group = new THREE.Group();
      const bodyMat = new THREE.MeshBasicMaterial({ map: skinTexture(s.light, s.dark), transparent: s.style === 'bubble', opacity: s.style === 'bubble' ? 0.75 : 1 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.scale.set(r, r * 1.1, r);
      const face = new THREE.Mesh(faceGeo, new THREE.MeshBasicMaterial({ map: faces[i % 2], transparent: true, depthWrite: false }));
      face.scale.setScalar(r * 0.85);
      face.position.z = r * 0.97;
      const knot = new THREE.Mesh(knotGeo, new THREE.MeshBasicMaterial({ color: s.dark }));
      knot.scale.setScalar(r);
      knot.position.y = -r * 1.15;
      knot.rotation.x = Math.PI;
      // A short curly string.
      const pts = Array.from({ length: 12 }, (_, k) => new THREE.Vector3(Math.sin(k * 0.9) * 0.008, -r * 1.2 - k * 0.012, 0));
      const string = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: '#f5f0e6' }));
      group.add(body, face, knot, string);
      this.group.add(group);
      this.balloons.push({
        group,
        body,
        color: new THREE.Color(s.dark),
        r,
        angle: (i / count) * Math.PI * 2,
        orbit: 0.3 + Math.random() * 0.25,
        height: -0.05 + Math.random() * 0.45,
        speed: (0.35 + Math.random() * 0.3) * (i % 2 ? 1 : -1),
        phase: Math.random() * 6,
        respawn: 0,
        pos: new THREE.Vector3(),
      });
    }
  }

  /**
   * Floats the balloons around `center` (Nawwara), each turning its face to the viewer.
   * They trail a little behind when she moves, like real balloons.
   */
  update(dt: number, center: THREE.Vector3, viewer: THREE.Vector3): void {
    this.time += dt;
    this.anchor.lerp(center, Math.min(1, dt * 2.5));
    if (this.anchor.lengthSq() === 0) this.anchor.copy(center);
    this.viewer.copy(viewer);
    for (const b of this.balloons) {
      if (b.respawn > 0) {
        b.respawn -= dt;
        b.group.visible = false;
        if (b.respawn <= 0) {
          b.respawn = 0;
          b.pos.copy(this.anchor);
          b.group.scale.setScalar(0.01);
        }
        continue;
      }
      b.group.visible = true;
      b.angle += b.speed * dt;
      const bob = Math.sin(this.time * 1.3 + b.phase) * 0.05;
      const want = new THREE.Vector3(
        this.anchor.x + Math.cos(b.angle) * b.orbit,
        this.anchor.y + b.height + bob,
        this.anchor.z + Math.sin(b.angle) * b.orbit,
      );
      b.pos.lerp(want, Math.min(1, dt * 3));
      b.group.position.copy(b.pos);
      b.group.lookAt(this.viewer.x, b.pos.y, this.viewer.z);
      b.group.rotation.z = Math.sin(this.time * 1.7 + b.phase) * 0.12;
      const grow = b.group.scale.x + (1 - b.group.scale.x) * Math.min(1, dt * 4);
      b.group.scale.setScalar(grow);
    }
  }

  /** Pops the first balloon a moving point touches; returns its colour (for sparks) or null. */
  hit(p: THREE.Vector3, radius: number): THREE.Color | null {
    for (const b of this.balloons) {
      if (b.respawn > 0 || !b.group.visible) continue;
      if (b.pos.distanceTo(p) < b.r * 1.1 + radius) {
        b.respawn = 3 + Math.random() * 2;
        b.group.visible = false;
        return b.color;
      }
    }
    return null;
  }

  get alive(): number {
    return this.balloons.filter((b) => b.respawn === 0).length;
  }

  /** Positions of the balloons that are up (for tests). */
  positions(): THREE.Vector3[] {
    return this.balloons.filter((b) => b.respawn === 0).map((b) => b.pos.clone());
  }
}
