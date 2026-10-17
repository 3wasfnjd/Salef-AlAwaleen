import { describe, expect, it } from 'vitest';
import { Room, geometryFromPlanes, pointInPolygon, segmentsIntersect } from '../src/xr/room';

const IDENTITY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

// A 4 m × 4 m room centred on the origin, with a 1 m × 0.6 m table at (1, -1).
const square = (cx: number, cz: number, hx: number, hz: number) => [
  { x: cx - hx, z: cz - hz },
  { x: cx + hx, z: cz - hz },
  { x: cx + hx, z: cz + hz },
  { x: cx - hx, z: cz + hz },
];
const roomGeometry = {
  floorY: 0,
  floor: square(0, 0, 2, 2),
  walls: [
    { a: { x: -2, z: -2 }, b: { x: 2, z: -2 } },
    { a: { x: 2, z: -2 }, b: { x: 2, z: 2 } },
    { a: { x: 2, z: 2 }, b: { x: -2, z: 2 } },
    { a: { x: -2, z: 2 }, b: { x: -2, z: -2 } },
  ],
  obstacles: [square(1, -1, 0.5, 0.3)],
};

describe('geometry helpers', () => {
  it('detects segment crossings', () => {
    expect(segmentsIntersect({ x: 0, z: -1 }, { x: 0, z: 1 }, { x: -1, z: 0 }, { x: 1, z: 0 })).toBe(true);
    expect(segmentsIntersect({ x: 0, z: -1 }, { x: 0, z: -0.5 }, { x: -1, z: 0 }, { x: 1, z: 0 })).toBe(false);
  });

  it('tests points in polygons', () => {
    expect(pointInPolygon({ x: 0, z: 0 }, square(0, 0, 1, 1))).toBe(true);
    expect(pointInPolygon({ x: 2, z: 0 }, square(0, 0, 1, 1))).toBe(false);
  });
});

describe('Room', () => {
  const room = new Room(0.25);
  room.geometry = roomGeometry;

  it('blocks spots inside furniture, near walls, or outside the floor', () => {
    expect(room.isBlocked({ x: 0, z: 0 })).toBe(false);
    expect(room.isBlocked({ x: 1, z: -1 })).toBe(true); // on the table
    expect(room.isBlocked({ x: 1.9, z: 0 })).toBe(true); // hugging the wall
    expect(room.isBlocked({ x: 3, z: 0 })).toBe(true); // outside
  });

  it('never steps through a wall; slides along it instead', () => {
    const next = room.step({ x: 1.6, z: 0 }, { x: 2.4, z: 0.3 });
    expect(next.x).toBeLessThan(1.8);
    const along = room.step({ x: 1.6, z: 0 }, { x: 2.4, z: 0.6 });
    expect(along.z).toBeGreaterThan(0); // moved along the wall rather than freezing
    expect(along.x).toBeLessThanOrEqual(1.75);
  });

  it('does not walk through the table', () => {
    const next = room.step({ x: 1, z: -0.2 }, { x: 1, z: -1.8 });
    expect(room.crosses({ x: 1, z: -0.2 }, next)).toBe(false);
    expect(room.isBlocked(next)).toBe(false);
  });

  it('picks the first free, reachable spot', () => {
    const spot = room.firstFree([{ x: 1, z: -1 }, { x: 2.5, z: 0 }, { x: -0.8, z: 0 }], { x: 0, z: 0 });
    expect(spot).toEqual({ x: -0.8, z: 0 });
  });

  it('allows everything when the room is unknown', () => {
    const empty = new Room();
    expect(empty.step({ x: 0, z: 0 }, { x: 5, z: 5 })).toEqual({ x: 5, z: 5 });
  });
});

describe('geometryFromPlanes', () => {
  it('turns Quest planes into floor, walls and furniture', () => {
    const g = geometryFromPlanes([
      { plane: { orientation: 'horizontal', semanticLabel: 'floor', polygon: [{ x: -2, y: 0, z: -2 }, { x: 2, y: 0, z: -2 }, { x: 2, y: 0, z: 2 }, { x: -2, y: 0, z: 2 }] }, matrix: IDENTITY },
      { plane: { orientation: 'vertical', semanticLabel: 'wall', polygon: [{ x: -2, y: 0, z: -2 }, { x: 2, y: 0, z: -2 }, { x: 2, y: 2.5, z: -2 }, { x: -2, y: 2.5, z: -2 }] }, matrix: IDENTITY },
      { plane: { orientation: 'horizontal', semanticLabel: 'table', polygon: [{ x: 0.5, y: 0.75, z: -1.3 }, { x: 1.5, y: 0.75, z: -1.3 }, { x: 1.5, y: 0.75, z: -0.7 }, { x: 0.5, y: 0.75, z: -0.7 }] }, matrix: IDENTITY },
      { plane: { orientation: 'horizontal', semanticLabel: 'ceiling', polygon: [{ x: -2, y: 2.5, z: -2 }, { x: 2, y: 2.5, z: -2 }, { x: 2, y: 2.5, z: 2 }] }, matrix: IDENTITY },
      { plane: { orientation: 'vertical', semanticLabel: 'door frame', polygon: [{ x: -2, y: 0, z: 0 }, { x: -2, y: 0, z: 1 }] }, matrix: IDENTITY },
    ]);
    expect(g.floorY).toBe(0);
    expect(g.floor).toHaveLength(4);
    expect(g.walls).toHaveLength(1);
    expect(g.obstacles).toHaveLength(1);
  });

  it('applies the plane pose (translation)', () => {
    const moved = [...IDENTITY];
    moved[12] = 3; // +3 m in x
    const g = geometryFromPlanes([{ plane: { orientation: 'vertical', semanticLabel: 'wall', polygon: [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 2 }] }, matrix: moved }]);
    expect(g.walls[0].a.x).toBe(3);
  });
});
