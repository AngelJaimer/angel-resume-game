import { P } from '../art/palette';
import { drawText } from '../art/font';
import { r, interior, exhibit, liftDoor } from './_util';
import { drawColleague } from '../art/actor';
import { SCALEUPS_DIALOGUE } from '../content/dialogues';
import { markSeen } from './progress';
import type { Room, Hotspot, NPC, Exit } from '../engine/types';

// FLOOR 3 — Scale-ups: Revolut and Hopper (hyper-growth).
export function buildScaleupsScene(): HTMLCanvasElement {
  const cv = document.createElement('canvas'); cv.width = 320; cv.height = 144;
  const ctx = cv.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  interior(ctx, [224, 216, 208], [240, 234, 226], P.floor, P.floorDark);
  r(ctx, 0, 0, 320, 14, [60, 44, 70]);
  drawText(ctx, 'SCALE-UPS  ·  hyper-growth', 36, 4, [210, 170, 230], 1, P.black, 1);

  exhibit(ctx, 44, 28, 64, 44, [40, 50, 92], 'REVOLUT');
  exhibit(ctx, 120, 28, 64, 44, [150, 90, 60], 'HOPPER');

  // a growth chart on the wall (up and to the right)
  r(ctx, 206, 26, 70, 46, P.ink);
  r(ctx, 206, 26, 70, 1, P.amberLit);
  for (let i = 0; i < 6; i++) r(ctx, 212 + i * 10, 66 - i * 6 - 4, 6, i * 6 + 4, P.amberLit);
  ctx.strokeStyle = 'rgb(126,184,214)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(212, 64); ctx.lineTo(270, 34); ctx.stroke();

  liftDoor(ctx, 2);
  return cv;
}

const HOTSPOTS: Hotspot[] = [
  { id: 'revolut', name: 'Revolut', x: 44, y: 28, w: 64, h: 44, walkTo: { x: 72, y: 138 }, url: 'https://angeljaime.com/case-study/revolut',
    look: 'Revolut, London. Senior Product Owner for Revolut Business. I launched and scaled a Rewards platform across web, iOS and Android, shipped cross-product referrals (consumer to business), and created Revolut Points, later rolled out to Consumer. Two teams, twenty-plus people.' },
  { id: 'hopper', name: 'Hopper', x: 120, y: 28, w: 64, h: 44, walkTo: { x: 148, y: 138 },
    look: 'Hopper, NY and LA. Senior PM, International Expansion. I led international Hotels and Fintech: doubled conversion on some fintech products, launched a travel-rewards program, and powered partnerships putting Hopper inventory inside NuBank, SMCC and Lloyds.' },
  { id: 'chart', name: 'the growth chart', x: 206, y: 26, w: 70, h: 46, walkTo: { x: 240, y: 138 },
    look: 'Up and to the right. Scale-up product work: move the metric, keep the trust, do it across three platforms at once.' },
];

const NPCS: NPC[] = [
  { id: 'colleague', name: 'a growth PM', x: 268, y: 96, w: 24, h: 44,
    feet: { x: 280, y: 130 }, walkTo: { x: 258, y: 138 }, facing: 'left', color: [210, 200, 220],
    look: 'A growth PM in a hoodie and headphones, mid-experiment. Everything here is an A/B test.',
    draw: drawColleague, dialogue: SCALEUPS_DIALOGUE },
];

const EXITS: Exit[] = [
  { id: 'toElevator', name: 'the elevator', x: 2, y: 80, w: 26, h: 58, walkTo: { x: 32, y: 138 }, to: 'elevator', entry: { x: 60, y: 136 }, arrow: 'left' },
];

export const SCALEUPS: Room = {
  id: 'scaleups',
  build: buildScaleupsScene,
  hotspots: HOTSPOTS,
  npcs: NPCS,
  exits: EXITS,
  walk: { minX: 16, maxX: 304, minY: 120, maxY: 140 },
  start: { x: 60, y: 136 },
  onEnter: (state) => markSeen(state, 'scaleups'),
};
