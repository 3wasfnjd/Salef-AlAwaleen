import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/**
 * Collects many coloured primitives and merges them into ONE mesh with vertex
 * colours, so a whole static group costs a single draw call on Quest.
 */
export class MergedBuilder {
  private parts: THREE.BufferGeometry[] = [];
  private readonly tmp = new THREE.Object3D();

  add(
    geometry: THREE.BufferGeometry,
    color: THREE.ColorRepresentation,
    position: [number, number, number] = [0, 0, 0],
    rotation: [number, number, number] = [0, 0, 0],
    scale: [number, number, number] = [1, 1, 1],
  ): this {
    const g = geometry.index ? geometry.toNonIndexed() : geometry.clone();
    geometry.dispose();
    g.deleteAttribute('uv');
    this.tmp.position.set(...position);
    this.tmp.rotation.set(...rotation);
    this.tmp.scale.set(...scale);
    this.tmp.updateMatrix();
    g.applyMatrix4(this.tmp.matrix);
    const c = new THREE.Color(color);
    const count = g.getAttribute('position').count;
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) colors.set([c.r, c.g, c.b], i * 3);
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.parts.push(g);
    return this;
  }

  get size(): number {
    return this.parts.length;
  }

  build(material: THREE.Material = sharedVertexColorMaterial()): THREE.Mesh {
    const merged = mergeGeometries(this.parts, false);
    if (!merged) throw new Error('MergedBuilder: incompatible geometries');
    this.parts.forEach((p) => p.dispose());
    this.parts = [];
    merged.computeBoundingSphere();
    return new THREE.Mesh(merged, material);
  }
}

let sharedMaterial: THREE.MeshLambertMaterial | null = null;

/** One Lambert material for all vertex-coloured meshes (cheap on mobile GPUs). */
export function sharedVertexColorMaterial(): THREE.MeshLambertMaterial {
  return (sharedMaterial ??= new THREE.MeshLambertMaterial({ vertexColors: true }));
}

export const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);
export const sphere = (r: number, w = 12, h = 10) => new THREE.SphereGeometry(r, w, h);
export const cylinder = (rt: number, rb: number, h: number, seg = 12, open = false) =>
  new THREE.CylinderGeometry(rt, rb, h, seg, 1, open);
