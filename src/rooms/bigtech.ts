import { P } from '../art/palette';
import { drawText } from '../art/font';
import { r, interior, exhibit, liftDoor } from './_util';
import { drawVeteran } from '../art/actor';
import { BIGTECH_DIALOGUE } from '../content/dialogues';
import { markSeen } from './progress';
import type { Room, Hotspot, NPC, Exit } from '../engine/types';

// FLOOR 1 — Big Tech: Booking.com, Just Eat, Philips (shipping at scale).
export function buildBigtechScene(): HTMLCanvasElement {
  const cv = document.createElement('canvas'); cv.width = 320; cv.height = 144;
  const ctx = cv.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  interior(ctx, [206, 210, 216], [228, 232, 236], [120, 124, 132], [96, 100, 108]);
  r(ctx, 0, 0, 320, 14, [40, 50, 70]);
  drawText(ctx, 'BIG TECH  ·  shipping at scale', 36, 4, [150, 196, 240], 1, P.black, 1);

  exhibit(ctx, 40, 28, 60, 44, [52, 70, 104], 'BOOKING');
  exhibit(ctx, 116, 28, 56, 44, [70, 96, 70], 'JUST EAT');
  exhibit(ctx, 188, 28, 56, 44, [48, 78, 110], 'PHILIPS');
  drawText(ctx, '1M users', 46, 60, P.inkLight, 1, P.black, 1);

  liftDoor(ctx, 2);
  return cv;
}

const HOTSPOTS: Hotspot[] = [
  { id: 'booking', name: 'Booking.com', x: 40, y: 28, w: 60, h: 44, walkTo: { x: 66, y: 138 },
    links: [
      { url: 'https://angeljaime.com/case-study/pulse', label: 'Read the case study' },
      { url: 'https://www.booking.com', label: 'Visit booking.com' },
    ],
    look: "Booking.com - the world's largest travel platform (part of Booking Holdings, about 20,000 people). I went from operations to Product Owner, built Pulse, the partner app, from a sketch to over a million users at 4.5 stars, then validated a new Transport vertical with the CPO and launched Booking's first public-transport product." },
  { id: 'justeat', name: 'Just Eat', x: 116, y: 28, w: 56, h: 44, walkTo: { x: 142, y: 138 },
    links: [{ url: 'https://www.justeattakeaway.com', label: 'Visit justeattakeaway.com' }],
    look: "Just Eat Takeaway - one of the world's largest food-delivery groups, across more than 20 countries. As Senior PM I owned Search across web and apps: ranking, algorithms, UX. I drove an experimentation culture of hundreds of A/B tests and co-authored a published paper on the ranking algorithm." },
  { id: 'philips', name: 'Philips', x: 188, y: 28, w: 56, h: 44, walkTo: { x: 214, y: 138 },
    links: [{ url: 'https://www.philips.com', label: 'Visit philips.com' }],
    look: 'Philips - a global health-technology company (about 70,000 people), Amsterdam. As Senior Product Owner I led two full-stack teams, introduced Discovery and the first B2B e-commerce experiments, and redesigned a core SAP customer journey - lifting sales and satisfaction.' },
];

const NPCS: NPC[] = [
  { id: 'veteran', name: 'a senior engineer', x: 262, y: 96, w: 24, h: 44,
    feet: { x: 274, y: 130 }, walkTo: { x: 252, y: 138 }, facing: 'left', color: [150, 196, 240],
    look: 'A veteran engineer, greying at the temples, unbothered by fire drills. He has shipped at scale.',
    draw: drawVeteran, dialogue: BIGTECH_DIALOGUE },
];

const EXITS: Exit[] = [
  { id: 'toElevator', name: 'the elevator', x: 2, y: 80, w: 26, h: 58, walkTo: { x: 32, y: 138 }, to: 'elevator', entry: { x: 60, y: 136 }, arrow: 'left' },
];

export const BIGTECH: Room = {
  id: 'bigtech',
  build: buildBigtechScene,
  hotspots: HOTSPOTS,
  npcs: NPCS,
  exits: EXITS,
  walk: { minX: 16, maxX: 304, minY: 120, maxY: 140 },
  start: { x: 60, y: 136 },
  onEnter: (state) => markSeen(state, 'bigtech'),
};
