import * as THREE from 'three';

function canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas unavailable');
  draw(ctx);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Procedural Sadu-style weave: bands of red, black and cream with diamond motifs. */
export function saduTexture(): THREE.CanvasTexture {
  return canvasTexture(512, 256, (ctx) => {
    const bands = ['#7a1c1c', '#1d1410', '#e9dcc0', '#1d1410', '#a3262a', '#e9dcc0', '#1d1410', '#7a1c1c'];
    const bh = 256 / bands.length;
    bands.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(0, i * bh, 512, bh);
    });
    // Diamond chain in the central band.
    ctx.fillStyle = '#e9dcc0';
    const cy = 128;
    for (let x = 0; x < 512; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, cy);
      ctx.lineTo(x + 16, cy - 14);
      ctx.lineTo(x + 32, cy);
      ctx.lineTo(x + 16, cy + 14);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = '#a3262a';
    for (let x = 0; x < 512; x += 32) ctx.fillRect(x + 13, cy - 3, 6, 6);
    // Triangular teeth along the edge bands.
    ctx.fillStyle = '#c9a76a';
    for (let x = 0; x < 512; x += 16) {
      for (const y of [bh, 256 - bh]) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 8, y + (y < 128 ? 8 : -8));
        ctx.lineTo(x + 16, y);
        ctx.fill();
      }
    }
  });
}

/** Red-and-white shemagh check for the head covering. */
export function shemaghTexture(): THREE.CanvasTexture {
  const tex = canvasTexture(128, 128, (ctx) => {
    ctx.fillStyle = '#f4f1ea';
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = '#b3202a';
    for (let i = 0; i < 128; i += 16) {
      ctx.fillRect(i, 0, 6, 128);
      ctx.fillRect(0, i, 128, 6);
    }
    ctx.fillStyle = '#f4f1ea';
    for (let x = 0; x < 128; x += 16) for (let y = 0; y < 128; y += 16) ctx.fillRect(x + 2, y + 2, 2, 2);
  });
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}
