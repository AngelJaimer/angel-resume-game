import { P, type RGB } from '../art/palette';
import { drawText } from '../art/font';
import { Pixels, rampPick } from '../art/dither';
import { r } from './_util';
import { markSeen } from './progress';
import type { Room, Hotspot, Exit } from '../engine/types';

// OUTSIDE — "Off the clock": newsletters, teaching, indie games, and Henry.
export function buildOutsideScene(): HTMLCanvasElement {
  const cv = document.createElement('canvas'); cv.width = 320; cv.height = 144;
  const ctx = cv.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  r(ctx, 0, 0, 320, 144, P.skyDay3);

  // dithered day sky
  const img = ctx.createImageData(320, 76);
  const px = new Pixels(img, 320, 76);
  const sky: RGB[] = [P.skyDay1, P.skyDay2, P.skyDay3, P.skyDay4];
  for (let y = 0; y < 76; y++) for (let x = 0; x < 320; x++) px.set(x, y, rampPick(sky, y / 76, x, y));
  ctx.putImageData(img, 0, 0);

  // the building facade (left), with the lobby door
  r(ctx, 0, 8, 96, 96, P.wallShadow);
  r(ctx, 0, 8, 96, 3, P.wall);
  for (let wy = 18; wy < 70; wy += 18) for (let wx = 8; wx < 84; wx += 22) { r(ctx, wx, wy, 14, 11, P.glassDark); r(ctx, wx + 1, wy + 1, 12, 9, P.glass); }
  r(ctx, 18, 70, 30, 34, P.ink);            // doorway
  r(ctx, 20, 72, 26, 32, P.glass);
  r(ctx, 32, 72, 1, 32, P.glassDark);
  drawText(ctx, 'LOBBY', 21, 60, P.ink, 1, P.cream, 1);

  // pavement + grass strip
  r(ctx, 0, 104, 320, 40, [150, 142, 124]);
  r(ctx, 0, 104, 320, 1, [180, 172, 154]);
  r(ctx, 96, 116, 224, 8, P.greenDark);
  r(ctx, 96, 116, 224, 2, P.green);

  // a tree
  r(ctx, 118, 70, 6, 40, P.trunk);
  for (const [ox, oy, rad] of [[121, 60, 16], [110, 66, 11], [132, 66, 11]] as Array<[number, number, number]>) {
    ctx.fillStyle = 'rgb(' + P.leafDark[0] + ',' + P.leafDark[1] + ',' + P.leafDark[2] + ')';
    ctx.beginPath(); ctx.arc(ox, oy, rad, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgb(' + P.leaf[0] + ',' + P.leaf[1] + ',' + P.leaf[2] + ')';
    ctx.beginPath(); ctx.arc(ox - 2, oy - 2, rad - 3, 0, Math.PI * 2); ctx.fill();
  }

  // a bench
  r(ctx, 150, 96, 30, 4, P.woodDark); r(ctx, 150, 96, 30, 1, P.woodLit);
  r(ctx, 152, 100, 3, 8, P.woodDark); r(ctx, 175, 100, 3, 8, P.woodDark);

  // a newsstand (newsletters / writing)
  r(ctx, 196, 64, 40, 40, P.brickDark);
  r(ctx, 198, 66, 36, 24, P.cream);
  drawText(ctx, 'EL', 204, 70, P.amberDark, 1, P.cream, 1);
  drawText(ctx, 'PROD', 204, 80, P.amberDark, 1, P.cream, 1);
  r(ctx, 196, 60, 40, 5, P.amber);

  // an arcade cabinet (the indie games)
  r(ctx, 250, 60, 26, 44, P.ink);
  r(ctx, 253, 64, 20, 14, P.screenLit);
  r(ctx, 253, 80, 20, 6, P.amberDark);
  r(ctx, 256, 88, 14, 3, P.steelDark);
  drawText(ctx, 'PLAY', 254, 95, P.amberLit, 1, P.black, 1);

  // a baby stroller (Henry)
  r(ctx, 290, 92, 22, 12, P.ink);
  r(ctx, 292, 88, 18, 8, [120, 150, 200]);
  ctx.fillStyle = 'rgb(40,36,34)';
  ctx.beginPath(); ctx.arc(295, 106, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(307, 106, 3, 0, Math.PI * 2); ctx.fill();
  return cv;
}

const HOTSPOTS: Hotspot[] = [
  { id: 'newsstand', name: 'the newsstand', x: 196, y: 58, w: 40, h: 46, walkTo: { x: 210, y: 138 },
    look: 'Writing and teaching. I write a product newsletter (El Producto, over a thousand weekly readers) and Week in Product, and I coach and teach PMs at Mento, Product School and EADA.' },
  { id: 'arcade', name: 'the arcade cabinet', x: 250, y: 60, w: 26, h: 44, walkTo: { x: 263, y: 138 },
    look: 'I build tiny point-and-click adventures for fun: El Secreto de Montjuic and Martohell. And, well, this resume is one of them.' },
  { id: 'stroller', name: 'the stroller', x: 288, y: 86, w: 24, h: 20, walkTo: { x: 298, y: 138 },
    look: 'Henry. My most important launch of 2026. I am also building him an app to track the newborn chaos. Currently in production. Sleep is the main bug.' },
  { id: 'bench', name: 'the bench', x: 148, y: 94, w: 34, h: 16, walkTo: { x: 165, y: 138 },
    look: 'A quiet bench in the sun. Angel investing happens here too: a small portfolio in fintech, edtech and climate-tech.' },
  { id: 'tree', name: 'the tree', x: 104, y: 48, w: 40, h: 60, walkTo: { x: 130, y: 138 },
    look: 'A good tree. Ten years across four countries, and the roots are still in Barcelona.' },
];

const EXITS: Exit[] = [
  { id: 'toLobby', name: 'the lobby', x: 18, y: 70, w: 30, h: 34, walkTo: { x: 42, y: 138 }, to: 'lobby', entry: { x: 272, y: 136 }, arrow: 'left' },
];

export const OUTSIDE: Room = {
  id: 'outside',
  build: buildOutsideScene,
  hotspots: HOTSPOTS,
  npcs: [],
  exits: EXITS,
  walk: { minX: 16, maxX: 312, minY: 122, maxY: 140 },
  start: { x: 160, y: 138 },
  onEnter: (state) => markSeen(state, 'outside'),
};
