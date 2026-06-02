import { P, type RGB } from '../art/palette';
import { drawText } from '../art/font';
import { r, interior } from './_util';
import type { Room, Hotspot, Exit } from '../engine/types';

// THE ELEVATOR — the hub. A button per floor; the Rooftop button only works
// once every floor has been toured (handled by the `showIf: 'seen_all'` exit).
const STEEL: RGB = [78, 82, 90], STEEL_L: RGB = [104, 108, 116], STEEL_F: RGB = [62, 66, 74], STEEL_D: RGB = [44, 48, 56];

// label, y, lit-accent  (top -> bottom on the call panel)
const BUTTONS: Array<[string, number]> = [
  ['R  Roof', 24], ['3  Scale', 40], ['2  Start', 56],
  ['1  Big', 72], ['G  Now', 88], ['B  Edu', 104],
];

export function buildElevatorScene(): HTMLCanvasElement {
  const cv = document.createElement('canvas'); cv.width = 320; cv.height = 144;
  const ctx = cv.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  interior(ctx, STEEL, STEEL_L, STEEL_F, STEEL_D);

  // brushed-steel back wall seams
  for (let x = 24; x < 240; x += 28) r(ctx, x, 4, 1, 96, STEEL_D);

  // directory sign (left)
  r(ctx, 20, 16, 150, 84, P.ink);
  r(ctx, 20, 16, 150, 1, P.amberLit);
  drawText(ctx, 'DIRECTORY', 30, 22, P.amberLit, 1, P.black, 1);
  const dir = ['R   Rooftop', '3   Scale-ups', '2   Startup', '1   Big Tech', 'G   AI and Now', 'B   Education'];
  for (let i = 0; i < dir.length; i++) drawText(ctx, dir[i], 30, 36 + i * 10, P.inkLight, 1, P.black, 1);

  // call panel (right)
  r(ctx, 244, 18, 68, 104, P.ink);
  r(ctx, 244, 18, 68, 1, P.steelLit);
  for (const [label, y] of BUTTONS) {
    r(ctx, 248, y, 58, 13, STEEL_D);
    r(ctx, 248, y, 58, 1, STEEL_L);
    r(ctx, 250, y + 2, 3, 9, P.amberLit);      // button light
    drawText(ctx, label, 256, y + 3, P.inkLight, 1, P.black, 1);
  }
  return cv;
}

// A locked-roof message sits under the R button until `seen_all` unlocks the
// real exit (exits are hit-tested before hotspots, so the exit wins once active).
const HOTSPOTS: Hotspot[] = [
  { id: 'panel', name: 'the call panel', x: 244, y: 18, w: 68, h: 104, walkTo: { x: 214, y: 138 },
    look: 'A polished brass call panel. Pick any floor - the car hums into motion. The roof is always open: that is where you will find Angel.' },
];

const EXITS: Exit[] = [
  { id: 'toRooftop', name: 'the Rooftop', x: 248, y: 24, w: 58, h: 13, walkTo: { x: 214, y: 138 }, to: 'rooftop', entry: { x: 46, y: 134 }, arrow: 'up' },
  { id: 'toScaleups', name: 'the Scale-ups floor', x: 248, y: 40, w: 58, h: 13, walkTo: { x: 214, y: 138 }, to: 'scaleups', entry: { x: 46, y: 136 }, arrow: 'right' },
  { id: 'toStartup', name: 'the Startup floor', x: 248, y: 56, w: 58, h: 13, walkTo: { x: 214, y: 138 }, to: 'startup', entry: { x: 46, y: 136 }, arrow: 'right' },
  { id: 'toBigtech', name: 'the Big Tech floor', x: 248, y: 72, w: 58, h: 13, walkTo: { x: 214, y: 138 }, to: 'bigtech', entry: { x: 46, y: 136 }, arrow: 'right' },
  { id: 'toLobby', name: 'the lobby', x: 248, y: 88, w: 58, h: 13, walkTo: { x: 214, y: 138 }, to: 'lobby', entry: { x: 44, y: 138 }, arrow: 'right' },
  { id: 'toBasement', name: 'Education', x: 248, y: 104, w: 58, h: 13, walkTo: { x: 214, y: 138 }, to: 'basement', entry: { x: 46, y: 136 }, arrow: 'right' },
];

export const ELEVATOR: Room = {
  id: 'elevator',
  build: buildElevatorScene,
  hotspots: HOTSPOTS,
  npcs: [],
  exits: EXITS,
  walk: { minX: 16, maxX: 236, minY: 120, maxY: 140 },
  start: { x: 60, y: 136 },
};
