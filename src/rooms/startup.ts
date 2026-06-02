import { P } from '../art/palette';
import { drawText, textWidth } from '../art/font';
import { r, interior, exhibit, liftDoor } from './_util';
import { drawFounder } from '../art/actor';
import { STARTUP_DIALOGUE } from '../content/dialogues';
import { markSeen } from './progress';
import type { Room, Hotspot, NPC, Exit } from '../engine/types';

// FLOOR 2 — Startup: Yayzy (climate-fintech, 0 to 1, CPO).
export function buildStartupScene(): HTMLCanvasElement {
  const cv = document.createElement('canvas'); cv.width = 320; cv.height = 144;
  const ctx = cv.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  interior(ctx, [196, 170, 150], [216, 192, 172], [120, 96, 70], [96, 74, 52]);
  // exposed-brick upper wall
  for (let by = 4; by < 96; by += 9) for (let bx = ((by / 9) % 2) * 16; bx < 320; bx += 32) { r(ctx, bx, by, 30, 7, P.brick); r(ctx, bx, by, 30, 1, P.brickLit); }
  r(ctx, 0, 0, 320, 14, [40, 64, 46]);
  drawText(ctx, 'STARTUP  ·  0 to 1', 36, 4, [150, 210, 160], 1, P.black, 1);

  exhibit(ctx, 50, 26, 92, 50, [40, 70, 50], 'YAYZY');
  drawText(ctx, 'climate-fintech', 50 + Math.round((92 - textWidth('climate-fintech', 1, 1)) / 2), 58, [150, 210, 160], 1, P.black, 1);

  // a whiteboard (wood frame, then the white surface on top, then marker text)
  r(ctx, 158, 24, 98, 54, P.woodDark);
  r(ctx, 160, 26, 94, 50, P.cream);
  r(ctx, 160, 26, 94, 2, [230, 230, 224]);
  const wl1 = 'PMF or bust', wl2 = 'ship on Fridays';
  drawText(ctx, wl1, 160 + Math.round((94 - textWidth(wl1, 1, 1)) / 2), 36, [60, 70, 120], 1, P.cream, 1);
  drawText(ctx, wl2, 160 + Math.round((94 - textWidth(wl2, 1, 1)) / 2), 48, [150, 90, 70], 1, P.cream, 1);
  ctx.strokeStyle = 'rgb(90,150,100)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(172, 68); ctx.lineTo(190, 62); ctx.lineTo(206, 65); ctx.lineTo(226, 56); ctx.stroke();

  // a potted plant (sustainability)
  r(ctx, 286, 92, 14, 12, P.brickDark);
  ctx.fillStyle = 'rgb(' + P.leaf[0] + ',' + P.leaf[1] + ',' + P.leaf[2] + ')';
  ctx.beginPath(); ctx.arc(293, 86, 9, 0, Math.PI * 2); ctx.fill();

  liftDoor(ctx, 2);
  return cv;
}

const HOTSPOTS: Hotspot[] = [
  { id: 'yayzy', name: 'Yayzy', x: 50, y: 26, w: 92, h: 50, walkTo: { x: 90, y: 138 }, url: 'https://angeljaime.com/case-study/yayzy',
    look: 'Yayzy, London and LA. Chief Product Officer. Climate-fintech, zero to one. We calculated carbon emissions straight from bank data via Open Banking, and shipped a B2C app plus B2B APIs. Over 20k organic downloads, Apple App of the Day, a Product Hunt award, BBC coverage, live in 30-plus countries. I hired the first senior product, engineering and design.' },
  { id: 'whiteboard', name: 'the whiteboard', x: 158, y: 24, w: 98, h: 54, walkTo: { x: 200, y: 138 },
    look: 'Zero-to-one means wearing every hat: company strategy in the morning, hiring at noon, support tickets after lunch, and shipping something real on Friday.' },
  { id: 'plant', name: 'the plant', x: 284, y: 80, w: 22, h: 26, walkTo: { x: 290, y: 138 },
    look: 'A stubborn little plant. Fitting for a company whose whole point was measuring your footprint on the planet.' },
];

const NPCS: NPC[] = [
  { id: 'founder', name: 'a co-founder', x: 224, y: 96, w: 24, h: 44,
    feet: { x: 236, y: 130 }, walkTo: { x: 216, y: 138 }, facing: 'left', color: [150, 210, 160],
    look: 'A co-founder running on cold brew and conviction. Tiny team, enormous ambition.',
    draw: drawFounder, dialogue: STARTUP_DIALOGUE },
];

const EXITS: Exit[] = [
  { id: 'toElevator', name: 'the elevator', x: 2, y: 80, w: 26, h: 58, walkTo: { x: 32, y: 138 }, to: 'elevator', entry: { x: 60, y: 136 }, arrow: 'left' },
];

export const STARTUP: Room = {
  id: 'startup',
  build: buildStartupScene,
  hotspots: HOTSPOTS,
  npcs: NPCS,
  exits: EXITS,
  walk: { minX: 16, maxX: 304, minY: 120, maxY: 140 },
  start: { x: 60, y: 136 },
  onEnter: (state) => markSeen(state, 'startup'),
};
