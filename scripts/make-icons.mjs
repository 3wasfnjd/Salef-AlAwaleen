// Rasterises public/icons/icon.svg into the PNG sizes used by the web manifest,
// iOS and the Quest APK. Dev-only: needs Playwright (preinstalled in the dev
// container). The generated PNGs are committed, so CI does not need this.
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const svg = await readFile(new URL('../public/icons/icon.svg', import.meta.url), 'utf8');
const browser = await chromium.launch();
const page = await browser.newPage();
const targets = [
  { file: 'icon-180.png', size: 180, pad: 0 },
  { file: 'icon-192.png', size: 192, pad: 0 },
  { file: 'icon-512.png', size: 512, pad: 0 },
  // Maskable: keep the artwork inside the central safe zone.
  { file: 'icon-512-maskable.png', size: 512, pad: 0.12 },
];
for (const { file, size, pad } of targets) {
  await page.setViewportSize({ width: size, height: size });
  const inner = Math.round(size * (1 - pad * 2));
  await page.setContent(
    `<body style="margin:0;background:#1c140e;display:grid;place-items:center;width:${size}px;height:${size}px">` +
      `<div style="width:${inner}px;height:${inner}px">${svg.replace('<svg ', `<svg width="${inner}" height="${inner}" `)}</div></body>`,
  );
  await page.screenshot({ path: new URL(`../public/icons/${file}`, import.meta.url).pathname, omitBackground: false });
  console.log('wrote', file);
}
await browser.close();
