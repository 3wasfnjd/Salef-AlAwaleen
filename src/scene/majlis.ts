import * as THREE from 'three';
import { MergedBuilder, box, cylinder, sphere } from './builder';
import { saduTexture } from './textures';

/**
 * Procedural Najdi majlis. The elder sits at the origin facing +Z; the player
 * sits around z = +1.5. Everything static is merged into a few draw calls.
 *
 * - `full`: walls, ceiling, floor, furniture (VR only).
 * - `core`: the elder's rug, cushion and coffee set (kept in MR).
 */
export interface Majlis {
  full: THREE.Group;
  core: THREE.Group;
  lights: THREE.Group;
}

const CLAY = '#b98a5c';
const CLAY_DARK = '#9c7048';
const CLAY_FLOOR = '#a67c55';
const WOOD = '#4a3020';
const PALM = '#8a6a3c';
const CUSHION = '#7d1f24';
const CUSHION_TRIM = '#c9a35a';
const BRASS = '#c79a3b';

const ROOM = { halfW: 3.2, back: -2.6, front: 3.4, height: 3.2 };

export function createMajlis(): Majlis {
  const full = new THREE.Group();
  full.name = 'majlis-full';
  const core = new THREE.Group();
  core.name = 'majlis-core';

  full.add(buildShell());
  full.add(buildFurniture());
  full.add(buildSky());
  full.add(buildLanternGlow());

  core.add(buildRug());
  core.add(buildElderSeat());
  core.add(buildCoffeeSet());

  return { full, core, lights: buildLights() };
}

function buildShell(): THREE.Mesh {
  const b = new MergedBuilder();
  const { halfW, back, front, height } = ROOM;
  const depth = front - back;
  const midZ = (front + back) / 2;
  const t = 0.25;

  // Floor and ceiling.
  b.add(box(halfW * 2, 0.05, depth), CLAY_FLOOR, [0, -0.025, midZ]);
  b.add(box(halfW * 2 + t * 2, 0.12, depth + t * 2), PALM, [0, height + 0.06, midZ]);

  // Walls: back, left, right, and a front wall with a doorway.
  b.add(box(halfW * 2 + t * 2, height, t), CLAY, [0, height / 2, back - t / 2]);
  b.add(box(t, height, depth), CLAY, [-halfW - t / 2, height / 2, midZ]);
  b.add(box(t, height, depth), CLAY, [halfW + t / 2, height / 2, midZ]);
  const doorW = 1.1;
  const sideW = halfW - doorW / 2;
  b.add(box(sideW, height, t), CLAY, [-(doorW / 2 + sideW / 2), height / 2, front + t / 2]);
  b.add(box(sideW, height, t), CLAY, [doorW / 2 + sideW / 2, height / 2, front + t / 2]);
  b.add(box(doorW, height - 2.1, t), CLAY, [0, 2.1 + (height - 2.1) / 2, front + t / 2]);
  b.add(box(doorW, 2.1, 0.08), WOOD, [0, 1.05, front + t - 0.04]);

  // Low skirting band (darker clay) all around.
  b.add(box(halfW * 2, 0.35, 0.04), CLAY_DARK, [0, 0.175, back + 0.02]);
  b.add(box(0.04, 0.35, depth), CLAY_DARK, [-halfW + 0.02, 0.175, midZ]);
  b.add(box(0.04, 0.35, depth), CLAY_DARK, [halfW - 0.02, 0.175, midZ]);

  // Athl wood ceiling beams.
  for (let z = back + 0.4; z < front; z += 0.55) {
    b.add(cylinder(0.06, 0.06, halfW * 2, 6), WOOD, [0, height - 0.06, z], [0, 0, Math.PI / 2]);
  }

  // Triangular wall vents (Najdi "kuwwa") and recessed niches.
  for (const x of [-1.6, 0, 1.6]) {
    b.add(cylinder(0.14, 0.14, 0.05, 3), '#2a3550', [x, height - 0.45, back + 0.01], [Math.PI / 2, 0, 0]);
  }
  for (const z of [-1.2, 0.6, 2.2]) {
    b.add(box(0.03, 0.5, 0.32), '#7a5634', [-halfW + 0.015, 1.5, z]);
    b.add(box(0.03, 0.5, 0.32), '#7a5634', [halfW - 0.015, 1.5, z]);
  }

  // Two round clay columns.
  for (const x of [-1.9, 1.9]) {
    b.add(cylinder(0.17, 0.2, height, 12), CLAY, [x, height / 2, 0.9]);
    b.add(box(0.5, 0.12, 0.5), CLAY_DARK, [x, height - 0.06, 0.9]);
  }
  return named(b.build(), 'shell');
}

function buildFurniture(): THREE.Mesh {
  const b = new MergedBuilder();
  const { halfW, back, front } = ROOM;

  // Long floor cushions (masnad) along the side and back walls, with armrests.
  const seat = (x: number, z: number, len: number, alongX: boolean) => {
    const w = alongX ? len : 0.55;
    const d = alongX ? 0.55 : len;
    b.add(box(w, 0.12, d), CUSHION, [x, 0.06, z]);
    b.add(box(alongX ? w : 0.04, 0.02, alongX ? 0.04 : d), CUSHION_TRIM, [x, 0.125, alongX ? z + 0.26 : z]);
    const backX = alongX ? x : x + (x < 0 ? -0.22 : 0.22);
    const backZ = alongX ? z - 0.22 : z;
    b.add(box(alongX ? w : 0.14, 0.42, alongX ? 0.14 : d), CUSHION, [backX, 0.33, backZ]);
  };
  seat(0, back + 0.3, 3.4, true);
  seat(-halfW + 0.3, 0.6, 3.6, false);
  seat(halfW - 0.3, 0.6, 3.6, false);

  // Round armrest bolsters (taka).
  for (const z of [-0.6, 0.6, 1.8]) {
    b.add(cylinder(0.1, 0.1, 0.4, 10), CUSHION_TRIM, [-halfW + 0.55, 0.2, z], [Math.PI / 2, 0, 0]);
    b.add(cylinder(0.1, 0.1, 0.4, 10), CUSHION_TRIM, [halfW - 0.55, 0.2, z], [Math.PI / 2, 0, 0]);
  }

  // Player's floor cushion, facing the elder.
  b.add(box(0.7, 0.1, 0.6), CUSHION, [0, 0.05, 1.5]);
  b.add(box(0.72, 0.02, 0.04), CUSHION_TRIM, [0, 0.1, 1.2]);

  // Coffee hearth (wjar) in the corner: stone base and ash bed.
  b.add(box(0.8, 0.25, 0.6), '#8e7a66', [halfW - 0.75, 0.125, back + 0.6]);
  b.add(box(0.5, 0.02, 0.35), '#3a2c22', [halfW - 0.75, 0.26, back + 0.6]);
  for (let i = 0; i < 3; i++) {
    b.add(cylinder(0.11, 0.08, 0.26, 10), BRASS, [halfW - 0.95 + i * 0.2, 0.39, back + 0.6]);
  }

  // Wooden chest and incense burner (mabkhara) by the left wall.
  b.add(box(0.6, 0.4, 0.35), WOOD, [-halfW + 0.4, 0.2, back + 0.45]);
  b.add(box(0.62, 0.04, 0.37), BRASS, [-halfW + 0.4, 0.41, back + 0.45]);
  b.add(cylinder(0.05, 0.08, 0.14, 8), '#5a3a26', [-halfW + 0.4, 0.5, back + 0.45]);
  b.add(cylinder(0.09, 0.05, 0.06, 8), BRASS, [-halfW + 0.4, 0.6, back + 0.45]);

  // Standing lantern (fanous) frame; the glowing core is separate (emissive).
  b.add(box(0.2, 0.03, 0.2), WOOD, [1.1, 0.015, -0.9]);
  for (const [dx, dz] of [[-0.08, -0.08], [0.08, -0.08], [-0.08, 0.08], [0.08, 0.08]] as const) {
    b.add(box(0.015, 0.36, 0.015), BRASS, [1.1 + dx, 0.2, -0.9 + dz]);
  }
  b.add(cylinder(0.0, 0.13, 0.12, 4), BRASS, [1.1, 0.44, -0.9], [0, Math.PI / 4, 0]);

  // Door frame lintel outside the doorway.
  b.add(box(1.3, 0.12, 0.3), WOOD, [0, 2.16, front + 0.12]);
  return named(b.build(), 'furniture');
}

function buildSky(): THREE.Mesh {
  // A dome instead of scene.background so it also works inside an AR session.
  const geo = new THREE.SphereGeometry(40, 16, 10);
  const mat = new THREE.MeshBasicMaterial({ color: '#141b33', side: THREE.BackSide, depthWrite: false });
  const sky = new THREE.Mesh(geo, mat);
  sky.renderOrder = -1;
  return named(sky, 'sky');
}

function buildRug(): THREE.Mesh {
  const mat = new THREE.MeshLambertMaterial({ map: saduTexture() });
  const rug = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.4), mat);
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0, 0.006, 0.35);
  return named(rug, 'rug');
}

function buildElderSeat(): THREE.Mesh {
  const b = new MergedBuilder();
  b.add(box(0.85, 0.1, 0.7), CUSHION, [0, 0.05, -0.05]);
  b.add(box(0.87, 0.02, 0.04), CUSHION_TRIM, [0, 0.1, 0.3]);
  b.add(box(0.85, 0.45, 0.16), CUSHION, [0, 0.33, -0.42]);
  b.add(cylinder(0.09, 0.09, 0.42, 10), CUSHION_TRIM, [-0.5, 0.18, -0.08], [Math.PI / 2, 0, 0]);
  // Soft contact shadow under the seat.
  b.add(cylinder(0.6, 0.6, 0.002, 20), '#2b1d14', [0, 0.004, -0.05]);
  return named(b.build(), 'elder-seat');
}

function buildCoffeeSet(): THREE.Mesh {
  const b = new MergedBuilder();
  const x = 0.62;
  const z = 0.32;
  // Tray.
  b.add(cylinder(0.2, 0.2, 0.02, 18), BRASS, [x, 0.015, z]);
  // Dallah: lathe body, neck, beak spout, crowned lid and handle.
  const profile = [
    [0.0, 0], [0.075, 0], [0.085, 0.03], [0.07, 0.08], [0.045, 0.11], [0.03, 0.15], [0.035, 0.2], [0.05, 0.21], [0, 0.22],
  ].map(([px, py]) => new THREE.Vector2(px, py));
  b.add(new THREE.LatheGeometry(profile, 14), BRASS, [x - 0.06, 0.025, z - 0.02]);
  b.add(cylinder(0.005, 0.016, 0.15, 6), BRASS, [x + 0.0, 0.17, z - 0.02], [0, 0, -0.9]);
  b.add(cylinder(0.0, 0.025, 0.05, 8), BRASS, [x - 0.06, 0.27, z - 0.02]);
  b.add(new THREE.TorusGeometry(0.05, 0.006, 4, 10, Math.PI), BRASS, [x - 0.13, 0.15, z - 0.02], [0, 0, Math.PI / 2]);
  // Finjan cups.
  for (let i = 0; i < 3; i++) {
    b.add(cylinder(0.022, 0.016, 0.03, 8), '#f1ece0', [x + 0.06 + (i % 2) * 0.05, 0.04, z + 0.08 - i * 0.05]);
  }
  // Date bowl.
  b.add(cylinder(0.07, 0.04, 0.04, 12), '#6b4a2c', [x - 0.02, 0.045, z + 0.13]);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    b.add(sphere(0.015, 6, 4), '#4a2412', [x - 0.02 + Math.cos(a) * 0.035, 0.07, z + 0.13 + Math.sin(a) * 0.035], [0, 0, 0], [1, 0.7, 1.6]);
  }
  return named(b.build(), 'coffee-set');
}

function buildLights(): THREE.Group {
  const g = new THREE.Group();
  g.name = 'lights';
  g.add(new THREE.HemisphereLight('#ffe6c4', '#5a3d28', 1.1));
  const key = new THREE.DirectionalLight('#ffd9a8', 1.3);
  key.position.set(1.5, 3, 2);
  g.add(key);
  const lamp = new THREE.PointLight('#ff9f45', 2.2, 5, 1.6);
  lamp.position.set(1.1, 0.35, -0.9);
  g.add(lamp);
  return g;
}

function buildLanternGlow(): THREE.Mesh {
  const glow = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.26, 0.13), new THREE.MeshBasicMaterial({ color: '#ffb35c' }));
  glow.position.set(1.1, 0.2, -0.9);
  return named(glow, 'lantern-glow');
}

function named<T extends THREE.Object3D>(o: T, name: string): T {
  o.name = name;
  return o;
}
