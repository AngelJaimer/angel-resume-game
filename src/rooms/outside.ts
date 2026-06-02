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

  // a couple of soft clouds
  for (const [cxp, cyp] of [[58, 22], [250, 15]] as Array<[number, number]>) {
    ctx.fillStyle = 'rgba(250,250,248,0.82)';
    ctx.beginPath(); ctx.ellipse(cxp, cyp, 15, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cxp + 11, cyp + 2, 10, 5, 0, 0, Math.PI * 2); ctx.fill();
  }

  // the office building (left) with the lobby entrance
  r(ctx, 0, 6, 96, 98, P.wallShadow);
  r(ctx, 0, 6, 96, 3, P.wall);
  for (let wy = 16; wy < 66; wy += 17) for (let wx = 8; wx < 84; wx += 21) { r(ctx, wx, wy, 14, 11, P.glassDark); r(ctx, wx + 1, wy + 1, 12, 9, P.glass); r(ctx, wx + 1, wy + 1, 12, 2, P.glassLit); }
  r(ctx, 16, 66, 34, 4, P.steelDark);
  r(ctx, 18, 70, 30, 34, P.ink);
  r(ctx, 20, 72, 26, 32, P.glass);
  r(ctx, 33, 72, 1, 32, P.glassDark);
  r(ctx, 20, 72, 26, 2, P.glassLit);
  drawText(ctx, 'LOBBY', 21, 59, P.ink, 1, P.cream, 1);

  // pavement + grass verge
  r(ctx, 0, 104, 320, 40, [150, 142, 124]);
  r(ctx, 0, 104, 320, 1, [180, 172, 154]);
  for (let x = 4; x < 320; x += 28) r(ctx, x, 117, 1, 7, [132, 124, 108]);
  r(ctx, 96, 116, 224, 8, P.greenDark);
  r(ctx, 96, 116, 224, 2, P.green);

  // a leafy tree
  r(ctx, 118, 66, 6, 44, P.trunk);
  r(ctx, 119, 68, 2, 40, [150, 110, 70]);
  for (const [ox, oy, rad] of [[121, 54, 17], [108, 62, 12], [134, 62, 12], [121, 48, 12]] as Array<[number, number, number]>) {
    ctx.fillStyle = 'rgb(' + P.leafDark[0] + ',' + P.leafDark[1] + ',' + P.leafDark[2] + ')';
    ctx.beginPath(); ctx.arc(ox, oy, rad, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgb(' + P.leaf[0] + ',' + P.leaf[1] + ',' + P.leaf[2] + ')';
    ctx.beginPath(); ctx.arc(ox - 2, oy - 2, rad - 3, 0, Math.PI * 2); ctx.fill();
  }

  // a bench with a coffee cup
  r(ctx, 148, 94, 34, 4, P.woodDark); r(ctx, 148, 94, 34, 1, P.woodLit);
  r(ctx, 150, 98, 3, 8, P.woodDark); r(ctx, 177, 98, 3, 8, P.woodDark);
  r(ctx, 167, 90, 3, 4, P.cream); r(ctx, 167, 89, 4, 1, [210, 210, 206]);

  // a newsstand kiosk (newsletters / writing)
  r(ctx, 194, 72, 44, 32, P.woodDark);
  r(ctx, 196, 74, 40, 28, P.wood);
  for (let i = 0; i < 6; i++) r(ctx, 192 + i * 8, 64, 4, 8, i % 2 ? P.cream : P.flagRed);
  r(ctx, 192, 71, 48, 2, P.woodShadow);
  const covers: Array<[number, number, RGB]> = [[200, 80, P.cream], [212, 80, [212, 226, 236]], [224, 80, [246, 236, 202]]];
  for (const [cxx, cyy, col] of covers) { r(ctx, cxx, cyy, 10, 16, col); r(ctx, cxx + 1, cyy + 3, 8, 1, P.woodDark); r(ctx, cxx + 1, cyy + 6, 8, 1, P.woodShadow); r(ctx, cxx + 1, cyy + 9, 6, 1, P.woodShadow); }
  r(ctx, 205, 54, 28, 8, P.ink); r(ctx, 205, 54, 28, 1, P.amberDark);
  drawText(ctx, 'NEWS', 209, 55, P.amberLit, 1, P.black, 1);

  // an arcade cabinet (the indie games)
  r(ctx, 248, 58, 30, 46, P.ink);
  r(ctx, 250, 59, 26, 8, P.flagRed); r(ctx, 251, 60, 24, 1, P.glow);
  drawText(ctx, 'PLAY', 251, 60, [245, 235, 210], 1, P.black, 1);
  r(ctx, 251, 70, 24, 18, P.screen); r(ctx, 252, 71, 22, 16, P.screenLit);
  r(ctx, 251, 84, 24, 3, P.greenDark);
  r(ctx, 261, 78, 3, 6, [60, 70, 100]); r(ctx, 261, 75, 3, 3, [220, 180, 140]);
  r(ctx, 252, 90, 22, 8, P.steelDark);
  r(ctx, 256, 92, 3, 3, P.flagRed); r(ctx, 262, 92, 3, 3, P.amberLit);
  r(ctx, 268, 91, 2, 5, P.steelLit);

  // a pram / stroller (Henry)
  ctx.fillStyle = 'rgb(40,36,34)';
  ctx.beginPath(); ctx.arc(294, 101, 5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(307, 102, 3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgb(120,120,124)';
  ctx.beginPath(); ctx.arc(294, 101, 2, 0, Math.PI * 2); ctx.fill();
  r(ctx, 290, 90, 20, 9, [70, 110, 170]);
  r(ctx, 290, 90, 20, 2, [110, 150, 200]);
  r(ctx, 290, 83, 13, 8, [60, 95, 150]);
  r(ctx, 291, 81, 11, 3, [74, 110, 168]);
  r(ctx, 293, 80, 7, 2, [86, 122, 178]);
  r(ctx, 305, 80, 2, 12, [56, 56, 60]);
  r(ctx, 305, 80, 9, 2, [56, 56, 60]);
  r(ctx, 296, 86, 4, 4, [235, 197, 162]);
  r(ctx, 297, 87, 1, 1, P.black);
  return cv;
}

const HOTSPOTS: Hotspot[] = [
  { id: 'newsstand', name: 'the newsstand', x: 196, y: 58, w: 40, h: 46, walkTo: { x: 210, y: 138 }, url: 'https://angeljaime.com/writing', linkLabel: 'Read the writing',
    look: 'Writing and teaching. I write a product newsletter (El Producto, over a thousand weekly readers) and Week in Product, and I coach and teach PMs at Mento, Product School and EADA.' },
  { id: 'arcade', name: 'the arcade cabinet', x: 250, y: 60, w: 26, h: 44, walkTo: { x: 263, y: 138 }, url: 'https://angeljaimer.github.io/montjuic-game/', linkLabel: 'Play the game',
    look: 'I build tiny point-and-click adventures for fun: El Secreto de Montjuic and Martohell. And, well, this resume is one of them.' },
  { id: 'stroller', name: 'the stroller', x: 288, y: 86, w: 24, h: 20, walkTo: { x: 298, y: 138 }, url: 'https://angeljaime.com/case-study/henry',
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
