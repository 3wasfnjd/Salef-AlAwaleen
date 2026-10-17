import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const cache = new Map<string, Promise<THREE.Group>>();

/** Resolves a path under public/ against the page (works under /Salef-AlAwaleen/). */
export const assetUrl = (path: string) => new URL(path, document.baseURI).href;

/**
 * Loads a static (non-skinned) GLB and merges every mesh that shares a
 * material into one, so a 140-part courtyard costs ~one draw call per
 * material on Quest. Physical materials are downgraded to standard.
 * Repeated loads of the same URL share the parsed result (cloned).
 */
export async function loadStaticModel(path: string): Promise<THREE.Group> {
  const url = assetUrl(path);
  let pending = cache.get(url);
  if (!pending) {
    pending = loader.loadAsync(url).then((gltf) => mergeByMaterial(gltf.scene));
    cache.set(url, pending);
  }
  return (await pending).clone();
}

function mergeByMaterial(root: THREE.Object3D): THREE.Group {
  root.updateMatrixWorld(true);
  const buckets = new Map<string, { material: THREE.Material; parts: THREE.BufferGeometry[] }>();
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh || (mesh as THREE.SkinnedMesh).isSkinnedMesh) return;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const groups = mesh.geometry.groups.length ? mesh.geometry.groups : [{ start: 0, count: Infinity, materialIndex: 0 }];
    const base = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
    base.applyMatrix4(mesh.matrixWorld);
    for (const g of groups) {
      const material = toStandard(materials[g.materialIndex ?? 0]);
      const part = groups.length > 1 ? sliceGeometry(base, g.start, g.count) : base;
      const key = `${material.uuid}|${Object.keys(part.attributes).sort().join(',')}`;
      const bucket = buckets.get(key) ?? { material, parts: [] };
      bucket.parts.push(part);
      buckets.set(key, bucket);
    }
  });

  const out = new THREE.Group();
  for (const { material, parts } of buckets.values()) {
    const merged = parts.length === 1 ? parts[0] : mergeGeometries(parts, false);
    if (!merged) continue;
    merged.computeBoundingSphere();
    out.add(new THREE.Mesh(merged, material));
  }
  return out;
}

function sliceGeometry(g: THREE.BufferGeometry, start: number, count: number): THREE.BufferGeometry {
  const total = g.getAttribute('position').count;
  const end = Math.min(total, start + count);
  const out = new THREE.BufferGeometry();
  for (const [name, attr] of Object.entries(g.attributes)) {
    const a = attr as THREE.BufferAttribute;
    out.setAttribute(name, new THREE.BufferAttribute(a.array.slice(start * a.itemSize, end * a.itemSize), a.itemSize, a.normalized));
  }
  return out;
}

const converted = new WeakMap<THREE.Material, THREE.Material>();

/** KHR sheen/specular force the heavy physical shader; keep maps on a standard one. */
export function toStandard(material: THREE.Material): THREE.Material {
  if (!(material instanceof THREE.MeshPhysicalMaterial)) return material;
  let standard = converted.get(material);
  if (!standard) {
    const s = new THREE.MeshStandardMaterial();
    THREE.MeshStandardMaterial.prototype.copy.call(s, material);
    converted.set(material, s);
    standard = s;
  }
  return standard;
}

/** Equirectangular sky on an inverted sphere (works inside an AR session too). */
export function skyDome(path: string): THREE.Mesh {
  const texture = new THREE.TextureLoader().load(assetUrl(path));
  texture.colorSpace = THREE.SRGBColorSpace;
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(60, 32, 16),
    new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide, depthWrite: false, fog: false }),
  );
  dome.renderOrder = -1;
  dome.name = 'sky';
  return dome;
}
