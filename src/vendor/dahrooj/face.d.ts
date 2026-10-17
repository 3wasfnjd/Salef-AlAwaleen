/** Dahrooj's face painter: draws eyes, mouth and blush centred on (0, 0) with radius `Rr`. */
export function drawReferenceFace(
  c: CanvasRenderingContext2D,
  Rr: number,
  face: 'joy' | 'laugh' | 'wide' | 'closed' | 'squint' | 'focus' | 'dizzy' | 'none',
  lx: number,
  ly: number,
  blushK: number,
  blinkOn: boolean,
  style: string,
  noEyes?: boolean,
): void;
