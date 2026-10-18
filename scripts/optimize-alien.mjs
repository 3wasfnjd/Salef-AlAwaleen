/**
 * Builds public/models/alien.glb from the owner's source model
 * (assets-src/Alien_Jelly.glb) for Quest:
 * - drops the authored morph targets (they distort the face; mouth and
 *   blink are rebuilt at runtime in AlienRig) and the clips we never play
 * - drops transmission/volume/IOR (an extra render pass on Quest)
 * - resamples and dedupes animation, quantizes geometry, WebP texture
 * Run: node scripts/optimize-alien.mjs
 */
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, prune, quantize, resample, textureCompress } from '@gltf-transform/functions';
import sharp from 'sharp';

const KEEP_CLIPS = new Set(['Idle', 'Walk', 'Run', 'Sit_Idle', 'Wave', 'Celebrate', 'Dance']);
const DROP_EXTENSIONS = ['KHR_materials_transmission', 'KHR_materials_volume', 'KHR_materials_ior'];

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read('assets-src/Alien_Jelly.glb');
const root = doc.getRoot();

for (const anim of root.listAnimations()) if (!KEEP_CLIPS.has(anim.getName())) anim.dispose();
for (const mesh of root.listMeshes()) {
  mesh.setWeights([]);
  mesh.setExtras({});
  for (const prim of mesh.listPrimitives()) for (const target of prim.listTargets()) target.dispose();
}
for (const name of DROP_EXTENSIONS) root.listExtensionsUsed().find((e) => e.extensionName === name)?.dispose();

await doc.transform(
  resample(),
  prune(),
  dedup(),
  quantize({ quantizeNormal: 10, quantizePosition: 14 }),
  textureCompress({ encoder: sharp, targetFormat: 'webp', quality: 88 }),
);
await io.write('public/models/alien.glb', doc);
console.log('wrote public/models/alien.glb');
