/**
 * Room awareness for mixed reality, on the floor plane (x, z).
 * Fed by WebXR plane detection (Quest "Space Setup": floor, walls, tables,
 * couches…); pure geometry otherwise, so it is unit-tested without a headset.
 */

export interface P2 {
  x: number;
  z: number;
}

export interface Segment {
  a: P2;
  b: P2;
}

export interface RoomGeometry {
  /** Floor height in the reference space (local-floor ≈ 0). */
  floorY: number;
  /** Floor outline, if known (character stays inside it). */
  floor: P2[] | null;
  /** Wall lines (vertical planes). */
  walls: Segment[];
  /** Furniture footprints (tables, couches, beds…). */
  obstacles: P2[][];
  /** Top of each obstacle above the floor (metres), same order; unknown = always blocks. */
  obstacleHeights?: number[];
}

export const EMPTY_ROOM: RoomGeometry = { floorY: 0, floor: null, walls: [], obstacles: [] };

// ------------------------------------------------------------- geometry

export function cross(o: P2, a: P2, b: P2): number {
  return (a.x - o.x) * (b.z - o.z) - (a.z - o.z) * (b.x - o.x);
}

export function segmentsIntersect(p1: P2, p2: P2, q1: P2, q2: P2): boolean {
  const d1 = cross(q1, q2, p1);
  const d2 = cross(q1, q2, p2);
  const d3 = cross(p1, p2, q1);
  const d4 = cross(p1, p2, q2);
  return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0));
}

export function pointInPolygon(p: P2, poly: P2[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i];
    const b = poly[j];
    if (a.z > p.z !== b.z > p.z && p.x < ((b.x - a.x) * (p.z - a.z)) / (b.z - a.z) + a.x) inside = !inside;
  }
  return inside;
}

export function closestOnSegment(p: P2, s: Segment): P2 {
  const dx = s.b.x - s.a.x;
  const dz = s.b.z - s.a.z;
  const len2 = dx * dx + dz * dz;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - s.a.x) * dx + (p.z - s.a.z) * dz) / len2));
  return { x: s.a.x + t * dx, z: s.a.z + t * dz };
}

const dist = (a: P2, b: P2) => Math.hypot(a.x - b.x, a.z - b.z);

function edges(poly: P2[]): Segment[] {
  return poly.map((a, i) => ({ a, b: poly[(i + 1) % poly.length] }));
}

// ----------------------------------------------------------------- room

/**
 * Collision queries for a character of radius `radius` walking on the floor.
 */
export class Room {
  geometry: RoomGeometry = EMPTY_ROOM;

  constructor(readonly radius = 0.25) {}

  get known(): boolean {
    const g = this.geometry;
    return g.walls.length > 0 || g.floor !== null || g.obstacles.length > 0;
  }

  /**
   * The same room for something flying `height` metres above the floor: only
   * walls and furniture taller than that matter, and no floor outline (so it
   * keeps following when the player walks past the scanned area).
   */
  forFlight(height: number): Room {
    const g = this.geometry;
    const flight = new Room(this.radius);
    flight.geometry = {
      floorY: g.floorY,
      floor: null,
      walls: g.walls,
      obstacles: g.obstacles.filter((_, i) => (g.obstacleHeights?.[i] ?? Infinity) > height),
    };
    return flight;
  }

  /**
   * The room for someone walking: walls and furniture, but no floor outline,
   * so they keep following when the player walks past the scanned area.
   */
  forWalking(): Room {
    return this.forFlight(-Infinity);
  }

  /** Distance from `p` to the nearest wall, furniture edge or floor edge. */
  private clearance(p: P2): number {
    return this.blockers().reduce((m, s) => Math.min(m, dist(p, closestOnSegment(p, s))), Infinity);
  }

  private blockers(): Segment[] {
    const g = this.geometry;
    return [...g.walls, ...g.obstacles.flatMap(edges), ...(g.floor ? edges(g.floor) : [])];
  }

  /** True if a character standing at `p` would overlap a wall or furniture, or be outside the floor. */
  isBlocked(p: P2): boolean {
    const g = this.geometry;
    if (g.floor && !pointInPolygon(p, g.floor)) return true;
    if (g.obstacles.some((o) => pointInPolygon(p, o))) return true;
    return this.blockers().some((s) => dist(p, closestOnSegment(p, s)) < this.radius);
  }

  /** True if walking straight from `a` to `b` crosses a wall, furniture or the floor edge. */
  crosses(a: P2, b: P2): boolean {
    return this.blockers().some((s) => segmentsIntersect(a, b, s.a, s.b));
  }

  /**
   * Moves from `from` toward `to` without passing through anything: if the
   * straight step is blocked, slides along the blocking edge; if that is
   * blocked too, stays put. Returns the new position.
   */
  step(from: P2, to: P2): P2 {
    if (!this.known) return to;
    if (!this.crosses(from, to) && !this.isBlocked(to)) return to;
    // Already too close to something: let it move away instead of freezing in place.
    if (this.isBlocked(from) && !this.crosses(from, to) && this.clearance(to) >= this.clearance(from)) return to;
    const wall = this.blockers()
      .filter((s) => segmentsIntersect(from, to, s.a, s.b) || dist(to, closestOnSegment(to, s)) < this.radius)
      .sort((s1, s2) => dist(from, closestOnSegment(from, s1)) - dist(from, closestOnSegment(from, s2)))[0];
    if (wall) {
      const wx = wall.b.x - wall.a.x;
      const wz = wall.b.z - wall.a.z;
      const wl = Math.hypot(wx, wz) || 1;
      const mx = to.x - from.x;
      const mz = to.z - from.z;
      const along = (mx * wx + mz * wz) / wl;
      const slide = { x: from.x + (along * wx) / wl, z: from.z + (along * wz) / wl };
      if (!this.crosses(from, slide) && !this.isBlocked(slide)) return slide;
    }
    return from;
  }

  /**
   * First candidate spot that is free and reachable in a straight line from
   * `origin` (any free spot when `origin` is null).
   */
  firstFree(candidates: P2[], origin: P2 | null): P2 | null {
    if (!this.known) return candidates[0] ?? null;
    return candidates.find((c) => !this.isBlocked(c) && (!origin || !this.crosses(origin, c))) ?? null;
  }
}

// ------------------------------------------------------------- from WebXR

/** Minimal structural types so this module stays testable without a browser. */
export interface PlaneLike {
  orientation?: string;
  semanticLabel?: string;
  polygon: Array<{ x: number; y: number; z: number }>;
}

/** Transforms a plane-space polygon to world space with a column-major 4×4 matrix. */
function toWorld(m: ArrayLike<number>, p: { x: number; y: number; z: number }) {
  return {
    x: m[0] * p.x + m[4] * p.y + m[8] * p.z + m[12],
    y: m[1] * p.x + m[5] * p.y + m[9] * p.z + m[13],
    z: m[2] * p.x + m[6] * p.y + m[10] * p.z + m[14],
  };
}

const FURNITURE = new Set(['table', 'couch', 'bed', 'desk', 'storage', 'screen', 'lamp', 'plant', 'other']);

/**
 * Builds room geometry from detected planes (each with its world pose matrix).
 * Floor: the lowest horizontal plane labelled floor (or lowest horizontal).
 * Walls: vertical planes → their horizontal extent as a segment.
 * Furniture: horizontal planes between 0.15 m and 1.6 m above the floor,
 * and labelled furniture volumes.
 */
export function geometryFromPlanes(planes: Array<{ plane: PlaneLike; matrix: ArrayLike<number> }>): RoomGeometry {
  const horizontal: Array<{ label: string; y: number; poly: P2[] }> = [];
  const walls: Segment[] = [];
  for (const { plane, matrix } of planes) {
    const pts = plane.polygon.map((p) => toWorld(matrix, p));
    if (pts.length < 2) continue;
    const label = (plane.semanticLabel ?? '').toLowerCase();
    if (plane.orientation === 'vertical' || label === 'wall' || label.includes('frame')) {
      if (label.includes('door') || label.includes('window')) continue; // openings are part of a wall already
      // Horizontal extent of the wall: the two points farthest apart in x/z.
      let best: Segment = { a: { x: pts[0].x, z: pts[0].z }, b: { x: pts[1].x, z: pts[1].z } };
      let bestD = -1;
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].z - pts[j].z);
          if (d > bestD) {
            bestD = d;
            best = { a: { x: pts[i].x, z: pts[i].z }, b: { x: pts[j].x, z: pts[j].z } };
          }
        }
      if (bestD > 0.3) walls.push(best);
    } else {
      const y = pts.reduce((s, p) => s + p.y, 0) / pts.length;
      horizontal.push({ label, y, poly: pts.map((p) => ({ x: p.x, z: p.z })) });
    }
  }
  const floorPlane =
    horizontal.filter((h) => h.label === 'floor').sort((a, b) => a.y - b.y)[0] ??
    horizontal.filter((h) => h.label !== 'ceiling').sort((a, b) => a.y - b.y)[0];
  const floorY = floorPlane?.y ?? 0;
  const furniture = horizontal
    .filter((h) => h !== floorPlane && h.label !== 'ceiling' && h.label !== 'floor')
    .filter((h) => FURNITURE.has(h.label) || (h.y - floorY > 0.15 && h.y - floorY < 1.6));
  return {
    floorY,
    floor: floorPlane && floorPlane.poly.length >= 3 ? floorPlane.poly : null,
    walls,
    obstacles: furniture.map((h) => h.poly),
    obstacleHeights: furniture.map((h) => h.y - floorY),
  };
}
