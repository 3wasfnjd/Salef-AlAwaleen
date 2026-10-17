// Fills android/twa-manifest.template.json for one CI build.
// Usage: node scripts/make-twa-manifest.mjs <outDir> <mode: immersive|2D> <versionCode> <assetBaseUrl> <keystorePath>
// assetBaseUrl serves the built site locally in CI (icons + web manifest), so the
// APK build does not depend on GitHub Pages being deployed first.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const [outDir, mode, versionCode, base, keystore] = process.argv.slice(2);
if (!outDir || !['immersive', '2D'].includes(mode) || !/^\d+$/.test(versionCode ?? '') || !base || !keystore) {
  console.error('usage: make-twa-manifest.mjs <outDir> <immersive|2D> <versionCode> <assetBaseUrl> <keystorePath>');
  process.exit(1);
}
const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const template = await readFile(new URL('../android/twa-manifest.template.json', import.meta.url), 'utf8');
const manifest = JSON.parse(
  template
    .replace('__ICON_URL__', `${base}/icons/icon-512.png`)
    .replace('__MASKABLE_ICON_URL__', `${base}/icons/icon-512-maskable.png`)
    .replace('__WEB_MANIFEST_URL__', `${base}/manifest.webmanifest`)
    .replace('__KEYSTORE_PATH__', keystore)
    .replace('__VERSION_NAME__', `${pkg.version}+${versionCode}`)
    .replace('__APP_MODE__', mode),
);
manifest.appVersionCode = Number(versionCode);
// The immersive build asks the page to enter WebXR immediately on launch.
if (mode === '2D') manifest.startUrl = manifest.startUrl.replace('?app=quest&mode=mr', '?app=quest-2d');
await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, 'twa-manifest.json'), JSON.stringify(manifest, null, 2));
console.log(JSON.stringify(manifest, null, 2));
