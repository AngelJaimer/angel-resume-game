import { P } from '../art/palette';
import { drawText } from '../art/font';
import { r, interior, exhibit, liftDoor } from './_util';
import { drawProfessor } from '../art/actor';
import { EDU_DIALOGUE } from '../content/dialogues';
import { markSeen } from './progress';
import type { Room, Hotspot, NPC, Exit } from '../engine/types';

// BASEMENT — Education: the archive of where it all started.
export function buildBasementScene(): HTMLCanvasElement {
  const cv = document.createElement('canvas'); cv.width = 320; cv.height = 144;
  const ctx = cv.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  interior(ctx, [120, 92, 64], [150, 116, 80], [92, 68, 46], [70, 50, 34]);
  // bookshelves along the back
  for (let sy = 16; sy < 96; sy += 26) {
    r(ctx, 8, sy, 304, 22, [86, 62, 42]);
    r(ctx, 8, sy + 21, 304, 2, [54, 38, 24]);
    const cols = [[150, 80, 64], [90, 110, 130], [140, 120, 70], [100, 140, 100], [120, 90, 130]];
    for (let i = 0; i < 60; i++) { const bx = 12 + i * 5; r(ctx, bx, sy + 3, 4, 17, cols[(i * 7) % 5] as [number, number, number]); }
  }
  r(ctx, 0, 0, 320, 14, [44, 32, 24]);
  drawText(ctx, 'EDUCATION  ·  the archive', 36, 4, [220, 196, 150], 1, P.black, 1);

  // framed diplomas (over the shelves)
  exhibit(ctx, 44, 26, 54, 34, [44, 38, 32], 'EMBA');
  exhibit(ctx, 110, 26, 54, 34, [44, 38, 32], 'MSc BI');
  exhibit(ctx, 176, 26, 54, 34, [44, 38, 32], 'MGMT');
  exhibit(ctx, 242, 26, 54, 34, [44, 38, 32], 'CETT');

  liftDoor(ctx, 2);
  return cv;
}

const HOTSPOTS: Hotspot[] = [
  { id: 'emba', name: 'the MBA', x: 44, y: 26, w: 54, h: 34, walkTo: { x: 70, y: 138 },
    look: 'Executive MBA, EADA and UOC, Barcelona (2019 to 2021). Product leadership grows up: strategy, finance, and running an org, not just a roadmap.' },
  { id: 'msc', name: 'the data master', x: 110, y: 26, w: 54, h: 34, walkTo: { x: 136, y: 138 },
    look: 'MSc in Business Intelligence, UOC (2012 to 2014). Data for decision-making: databases, data-mining, KPIs, dashboards. Where the product-meets-data instinct started.' },
  { id: 'mgmt', name: 'the management postgrad', x: 176, y: 26, w: 54, h: 34, walkTo: { x: 202, y: 138 },
    look: 'Postgraduate in Team and Management skills, UOC (2009 to 2010). Learning to lead people before leading products.' },
  { id: 'cett', name: 'the first degree', x: 242, y: 26, w: 54, h: 34, walkTo: { x: 268, y: 138 },
    look: 'Degree in Tourism and Hotel Management, CETT, Barcelona (2003 to 2007). The first chapter: hospitality, where you learn to obsess over the guest. Swap guest for user and you have a PM.' },
];

const NPCS: NPC[] = [
  { id: 'professor', name: 'a professor', x: 150, y: 96, w: 24, h: 44,
    feet: { x: 162, y: 131 }, walkTo: { x: 140, y: 138 }, facing: 'right', color: [220, 196, 150],
    look: 'A professor with reading glasses and a book that is older than you. He approves of the archive.',
    draw: drawProfessor, dialogue: EDU_DIALOGUE },
];

const EXITS: Exit[] = [
  { id: 'toElevator', name: 'the elevator', x: 2, y: 80, w: 26, h: 58, walkTo: { x: 32, y: 138 }, to: 'elevator', entry: { x: 60, y: 136 }, arrow: 'left' },
];

export const BASEMENT: Room = {
  id: 'basement',
  build: buildBasementScene,
  hotspots: HOTSPOTS,
  npcs: NPCS,
  exits: EXITS,
  walk: { minX: 16, maxX: 304, minY: 120, maxY: 140 },
  start: { x: 60, y: 136 },
  onEnter: (state) => markSeen(state, 'basement'),
};
