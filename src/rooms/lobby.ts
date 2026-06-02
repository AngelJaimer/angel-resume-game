import { P } from '../art/palette';
import { drawText } from '../art/font';
import { r, interior, exhibit, liftDoor } from './_util';
import { drawConcierge } from '../art/actor';
import { CONCIERGE_DIALOGUE } from '../content/dialogues';
import { markSeen } from './progress';
import type { Room, Hotspot, NPC, Exit } from '../engine/types';

// GROUND FLOOR — "AI & Now": Angel's current work at Engine (the headline).
export function buildLobbyScene(): HTMLCanvasElement {
  const cv = document.createElement('canvas'); cv.width = 320; cv.height = 144;
  const ctx = cv.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  interior(ctx, P.wall, P.wallLit, P.floor, P.floorDark);

  // header band
  r(ctx, 0, 0, 320, 15, P.ink);
  drawText(ctx, 'ENGINE  ·  AI and NOW', 36, 4, P.amberLit, 1, P.black, 1);
  drawText(ctx, 'Staff PM, AI Products', 188, 4, P.inkLight, 1, P.black, 1);

  // case-study exhibits (glowing screens) + an award plaque
  exhibit(ctx, 38, 30, 50, 40, P.screen, 'PLATFORM');
  exhibit(ctx, 100, 30, 50, 40, P.screen, 'SEARCH');
  exhibit(ctx, 162, 30, 50, 40, P.screen, 'ML');
  exhibit(ctx, 224, 34, 48, 30, P.amberDark, 'AWARD');
  // a few "data" glints on the screens
  for (const sx of [44, 106, 168]) { r(ctx, sx, 56, 38, 1, P.screenLit); r(ctx, sx, 60, 26, 1, P.screenLit); r(ctx, sx, 64, 32, 1, P.screenLit); }

  liftDoor(ctx, 2);
  // front glass doors (to the street)
  r(ctx, 286, 38, 30, 66, P.glassDark);
  r(ctx, 288, 40, 26, 62, P.glass);
  r(ctx, 300, 40, 1, 62, P.glassDark);
  r(ctx, 288, 40, 26, 2, P.glassLit);
  drawText(ctx, 'EXIT', 289, 92, P.inkLight, 1, P.black, 1);
  return cv;
}

const HOTSPOTS: Hotspot[] = [
  { id: 'platform', name: 'the AI Platform', x: 38, y: 30, w: 50, h: 40, walkTo: { x: 63, y: 138 },
    look: 'I built Engine\'s central AI platform, so any product team can ship LLM features in days instead of months. It now powers 6 or more AI products. The trick was treating those teams as customers.' },
  { id: 'search', name: 'Smart Search', x: 100, y: 30, w: 50, h: 40, walkTo: { x: 125, y: 138 },
    look: 'I rebuilt our AI hotel-search assistant. Unanswered questions dropped about 6x, answer quality jumped, and replies stayed fast. The lesson: the context you feed a model matters more than the model.' },
  { id: 'ml', name: 'ML Personalization', x: 162, y: 30, w: 50, h: 40, walkTo: { x: 187, y: 138 },
    look: 'I stood up real-time ML personalization and the infrastructure behind it, so data scientists iterate in days and travelers see stays that fit. In ML products, the infrastructure IS the product.' },
  { id: 'award', name: 'the award', x: 224, y: 34, w: 48, h: 30, walkTo: { x: 248, y: 138 },
    look: 'An AI assistant built on that platform won Salesforce\'s Customer Success Award at Dreamforce 2025, on stage in front of tens of thousands of people.' },
];

const NPCS: NPC[] = [
  { id: 'concierge', name: 'the concierge', x: 150, y: 96, w: 24, h: 44,
    feet: { x: 162, y: 130 }, walkTo: { x: 140, y: 138 }, facing: 'left', color: [232, 210, 168],
    look: 'The building concierge — sharp blazer, sharper memory. He knows every floor by heart.',
    draw: drawConcierge, dialogue: CONCIERGE_DIALOGUE },
];

const EXITS: Exit[] = [
  { id: 'toElevator', name: 'the elevator', x: 2, y: 80, w: 26, h: 58, walkTo: { x: 32, y: 138 }, to: 'elevator', entry: { x: 60, y: 136 }, arrow: 'left' },
  { id: 'toOutside', name: 'the street', x: 286, y: 38, w: 30, h: 66, walkTo: { x: 286, y: 138 }, to: 'outside', entry: { x: 50, y: 138 }, arrow: 'right' },
];

export const LOBBY: Room = {
  id: 'lobby',
  build: buildLobbyScene,
  hotspots: HOTSPOTS,
  npcs: NPCS,
  exits: EXITS,
  walk: { minX: 16, maxX: 300, minY: 120, maxY: 140 },
  start: { x: 96, y: 136 },
  onEnter: (state) => markSeen(state, 'lobby'),
};
