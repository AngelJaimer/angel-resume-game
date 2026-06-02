import { P, css, type RGB } from '../art/palette';
import { drawText } from '../art/font';
import { Pixels, rampPick } from '../art/dither';
import { r } from './_util';
import { drawAngel } from '../art/actor';
import { ANGEL_DIALOGUE } from '../content/dialogues';
import type { Room, Hotspot, NPC, Exit } from '../engine/types';

// ROOFTOP — the finale. Unlocked once every floor has been toured. Meet Angel.
export function buildRooftopScene(): HTMLCanvasElement {
  const cv = document.createElement('canvas'); cv.width = 320; cv.height = 144;
  const ctx = cv.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  r(ctx, 0, 0, 320, 144, P.duskB);

  // dusk sky
  const img = ctx.createImageData(320, 96);
  const px = new Pixels(img, 320, 96);
  const sky: RGB[] = [P.duskA, P.duskB, P.duskC, P.duskD];
  for (let y = 0; y < 96; y++) for (let x = 0; x < 320; x++) px.set(x, y, rampPick(sky, y / 96, x, y));
  ctx.putImageData(img, 0, 0);

  // city skyline silhouette
  const roofs = [22, 40, 14, 52, 30, 44, 18, 56, 26, 48, 16, 38];
  for (let i = 0; i < roofs.length; i++) {
    const bx = i * 28 - 8, h = roofs[i];
    r(ctx, bx, 96 - h, 26, h, P.cityDark);
    r(ctx, bx, 96 - h, 26, 1, P.cityLit);
    if (i % 2 === 0) { r(ctx, bx + 5, 96 - h + 6, 3, 4, P.winLit); r(ctx, bx + 14, 96 - h + 12, 3, 4, P.winLit); }
  }

  // roof deck
  r(ctx, 0, 100, 320, 44, [42, 38, 44]);
  r(ctx, 0, 100, 320, 2, [70, 64, 70]);
  for (let x = 0; x < 320; x += 18) r(ctx, x, 104, 1, 40, [30, 28, 34]);
  // parapet
  r(ctx, 0, 96, 320, 5, [54, 48, 54]);
  r(ctx, 0, 96, 320, 1, [86, 78, 84]);

  // rooftop access hatch (left) -> elevator
  r(ctx, 4, 72, 32, 30, [40, 44, 52]);
  r(ctx, 6, 74, 28, 26, P.steel);
  r(ctx, 19, 74, 1, 26, P.steelDark);
  r(ctx, 6, 74, 28, 2, P.steelLit);
  drawText(ctx, 'LIFT', 9, 90, P.ink, 1, P.steelLit, 1);

  // string-light poles + sagging wire
  r(ctx, 70, 40, 2, 60, [40, 36, 40]);
  r(ctx, 250, 40, 2, 60, [40, 36, 40]);
  ctx.strokeStyle = 'rgb(40,36,40)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(71, 42); ctx.quadraticCurveTo(160, 60, 251, 42); ctx.stroke();

  // two chairs by the parapet
  r(ctx, 150, 96, 10, 4, [70, 60, 56]); r(ctx, 150, 96, 2, 8, [70, 60, 56]);
  r(ctx, 174, 96, 10, 4, [70, 60, 56]); r(ctx, 182, 96, 2, 8, [70, 60, 56]);
  return cv;
}

// twinkling string lights
export function rooftopOverlays(ctx: CanvasRenderingContext2D, t: number) {
  for (let i = 0; i < 10; i++) {
    const x = 78 + i * 18;
    const y = 44 + Math.sin(i * 0.9) * 6 + 6;
    const tw = 0.5 + 0.5 * Math.sin(t * 3 + i);
    ctx.fillStyle = `rgba(255,224,150,${(0.4 + 0.6 * tw).toFixed(2)})`;
    ctx.fillRect(x, y, 2, 2);
  }
}

const HOTSPOTS: Hotspot[] = [
  { id: 'view', name: 'the view', x: 40, y: 30, w: 220, h: 60, walkTo: { x: 150, y: 138 },
    look: 'The whole city at dusk. Ten years, four countries, big tech to zero-to-one and back. The throughline: take fuzzy, high-stakes problems and ship products that move real numbers.' },
  { id: 'chairs', name: 'the chairs', x: 148, y: 92, w: 40, h: 14, walkTo: { x: 168, y: 138 },
    look: 'Two chairs and a good view. Pull one up.' },
];

const NPCS: NPC[] = [
  { id: 'angel', name: 'Angel', x: 198, y: 96, w: 26, h: 46,
    feet: { x: 210, y: 132 }, walkTo: { x: 188, y: 138 }, facing: 'left', color: [250, 214, 158],
    look: 'Angel Jaime. Product leader, builder, recent father, occasional game-maker. He looks like he has a pitch ready.',
    draw: drawAngel, dialogue: ANGEL_DIALOGUE },
];

const EXITS: Exit[] = [
  { id: 'toElevator', name: 'the elevator', x: 4, y: 72, w: 32, h: 30, walkTo: { x: 40, y: 138 }, to: 'elevator', entry: { x: 60, y: 136 }, arrow: 'left' },
];

export const ROOFTOP: Room = {
  id: 'rooftop',
  build: buildRooftopScene,
  overlays: rooftopOverlays,
  hotspots: HOTSPOTS,
  npcs: NPCS,
  exits: EXITS,
  walk: { minX: 16, maxX: 300, minY: 122, maxY: 140 },
  start: { x: 60, y: 134 },
};
