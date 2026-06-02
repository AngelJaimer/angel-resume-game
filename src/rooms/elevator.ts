import { P, type RGB } from '../art/palette';
import { drawText } from '../art/font';
import { r, interior } from './_util';
import type { Room, Hotspot, Exit } from '../engine/types';

// THE ELEVATOR — one clickable directory (full floor names) on the left is the
// navigation; the doors on the right are decor. Click a floor to ride to it.
const STEEL: RGB = [78, 82, 90], STEEL_L: RGB = [104, 108, 116], STEEL_F: RGB = [62, 66, 74], STEEL_D: RGB = [44, 48, 56];

const FLOORS: Array<{ token: string; name: string; to: string }> = [
  { token: 'R', name: 'Rooftop', to: 'rooftop' },
  { token: '3', name: 'Scale-ups', to: 'scaleups' },
  { token: '2', name: 'Startup', to: 'startup' },
  { token: '1', name: 'Big Tech', to: 'bigtech' },
  { token: 'G', name: 'AI and Now', to: 'lobby' },
  { token: 'B', name: 'Education', to: 'basement' },
];
const ROW_Y = (i: number) => 24 + i * 10;

export function buildElevatorScene(): HTMLCanvasElement {
  const cv = document.createElement('canvas'); cv.width = 320; cv.height = 144;
  const ctx = cv.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  interior(ctx, STEEL, STEEL_L, STEEL_F, STEEL_D);
  for (let x = 170; x < 212; x += 13) r(ctx, x, 4, 1, 92, STEEL_D); // brushed-steel seams

  // directory call panel — each row is a clickable floor (kept above head height)
  r(ctx, 14, 8, 142, 80, P.ink);
  r(ctx, 14, 8, 142, 1, P.amberLit);
  drawText(ctx, 'DIRECTORY', 22, 12, P.amberLit, 1, P.black, 1);
  for (let i = 0; i < FLOORS.length; i++) {
    const ry = ROW_Y(i);
    r(ctx, 20, ry, 128, 9, STEEL_D);
    r(ctx, 20, ry, 128, 1, STEEL_L);
    r(ctx, 23, ry + 2, 3, 5, P.amberLit);   // floor light
    drawText(ctx, FLOORS[i].token + '  ' + FLOORS[i].name, 31, ry + 1, P.inkLight, 1, P.black, 1);
  }

  // elevator doors (decor) + floor indicator
  r(ctx, 224, 22, 80, 110, [58, 62, 70]);
  r(ctx, 228, 26, 35, 102, P.steel); r(ctx, 265, 26, 35, 102, P.steel);
  r(ctx, 262, 26, 4, 102, STEEL_D);
  r(ctx, 228, 26, 72, 2, P.steelLit);
  r(ctx, 246, 12, 40, 8, P.ink); r(ctx, 246, 12, 40, 1, P.amberDark);
  drawText(ctx, 'G', 262, 13, P.amberLit, 1, P.black, 1);
  return cv;
}

const HOTSPOTS: Hotspot[] = [
  { id: 'doors', name: 'the elevator doors', x: 224, y: 22, w: 80, h: 110, walkTo: { x: 200, y: 138 },
    look: 'The elevator doors slide open between floors with a soft chime. Pick a floor from the directory on the left, and up (or down) you go.' },
];

const EXITS: Exit[] = FLOORS.map((f, i): Exit => ({
  id: 'to_' + f.to,
  name: f.to === 'lobby' ? 'AI and Now' : f.to === 'basement' ? 'Education' : f.to === 'rooftop' ? 'the Rooftop' : `the ${f.name} floor`,
  x: 20, y: ROW_Y(i), w: 128, h: 9,
  walkTo: { x: 92, y: 138 },
  to: f.to,
  entry: { x: f.to === 'lobby' ? 44 : 46, y: f.to === 'rooftop' ? 134 : 136 },
  arrow: 'none',
}));

export const ELEVATOR: Room = {
  id: 'elevator',
  build: buildElevatorScene,
  hotspots: HOTSPOTS,
  npcs: [],
  exits: EXITS,
  walk: { minX: 16, maxX: 236, minY: 120, maxY: 140 },
  start: { x: 60, y: 136 },
};
