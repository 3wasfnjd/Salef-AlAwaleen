import * as THREE from 'three';
import { isRtl } from '../i18n';

export interface PanelButton {
  id: string;
  label: string;
}

const W = 1024;
const H = 384;
const BTN_Y = 210;
const BTN_H = 120;

/**
 * Small world-space panel drawn on a canvas (Arabic shaping and RTL come from
 * the browser's canvas text engine). Buttons are hit-tested by UV.
 */
export class XRPanel {
  readonly mesh: THREE.Mesh;
  private readonly canvas = document.createElement('canvas');
  private readonly ctx: CanvasRenderingContext2D;
  private readonly texture: THREE.CanvasTexture;
  private buttons: PanelButton[] = [];
  private status = '';
  private info = '';
  private hovered: string | null = null;

  constructor() {
    this.canvas.width = W;
    this.canvas.height = H;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('2D canvas unavailable');
    this.ctx = ctx;
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.225), mat);
    this.mesh.name = 'xr-panel';
    this.draw();
  }

  setButtons(buttons: PanelButton[]): void {
    this.buttons = buttons;
    this.draw();
  }

  setStatus(status: string): void {
    if (status === this.status) return;
    this.status = status;
    this.draw();
  }

  setInfo(info: string): void {
    if (info === this.info) return;
    this.info = info;
    this.draw();
  }

  setHovered(id: string | null): void {
    if (id === this.hovered) return;
    this.hovered = id;
    this.draw();
  }

  /** Returns the button id under a UV coordinate on the panel, if any. */
  buttonAt(uv: THREE.Vector2): string | null {
    const x = uv.x * W;
    const y = (1 - uv.y) * H;
    if (y < BTN_Y || y > BTN_Y + BTN_H) return null;
    const rect = this.buttonRects().find((r) => x >= r.x && x <= r.x + r.w);
    return rect?.id ?? null;
  }

  private buttonRects(): Array<{ id: string; x: number; w: number; label: string }> {
    const n = Math.max(this.buttons.length, 1);
    const gap = 24;
    const w = (W - gap * (n + 1)) / n;
    const ordered = isRtl() ? [...this.buttons].reverse() : this.buttons;
    return ordered.map((b, i) => ({ id: b.id, label: b.label, x: gap + i * (w + gap), w }));
  }

  private draw(): void {
    const c = this.ctx;
    c.clearRect(0, 0, W, H);
    c.fillStyle = 'rgba(28, 20, 14, 0.86)';
    roundRect(c, 0, 0, W, H, 36);
    c.fill();
    c.direction = isRtl() ? 'rtl' : 'ltr';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillStyle = '#f3e6cc';
    c.font = '600 46px system-ui, "Noto Sans Arabic", sans-serif';
    c.fillText(this.status, W / 2, 70);
    c.fillStyle = '#c9b48f';
    c.font = '34px system-ui, "Noto Sans Arabic", sans-serif';
    c.fillText(this.info, W / 2, 145);
    for (const r of this.buttonRects()) {
      c.fillStyle = r.id === this.hovered ? '#c9a35a' : '#6e4a2c';
      roundRect(c, r.x, BTN_Y, r.w, BTN_H, 24);
      c.fill();
      c.fillStyle = r.id === this.hovered ? '#1c140e' : '#f3e6cc';
      c.font = '600 38px system-ui, "Noto Sans Arabic", sans-serif';
      c.fillText(r.label, r.x + r.w / 2, BTN_Y + BTN_H / 2, r.w - 20);
    }
    this.texture.needsUpdate = true;
  }

  dispose(): void {
    this.texture.dispose();
    (this.mesh.material as THREE.Material).dispose();
    this.mesh.geometry.dispose();
  }
}

function roundRect(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}
