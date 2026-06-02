import { P, css, type RGB } from '../art/palette';
import { drawText, textWidth } from '../art/font';

export const PANEL_Y = 144;
export const PANEL_H = 56;

function bevelBox(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: RGB) {
  ctx.fillStyle = css(fill);
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = css(P.panelWoodLit);
  ctx.fillRect(x, y, w, 1); ctx.fillRect(x, y, 1, h);
  ctx.fillStyle = css(P.black);
  ctx.fillRect(x, y + h - 1, w, 1); ctx.fillRect(x + w - 1, y, 1, h);
}

// The bottom bar: the action line (what a click will do) + a gentle how-to.
// Clicking is smart (exhibit -> read, person -> talk, door -> go), so there's
// no verb grid or inventory to manage.
export function drawPanel(ctx: CanvasRenderingContext2D, sentence: string) {
  ctx.fillStyle = css(P.panelWood);
  ctx.fillRect(0, PANEL_Y, 320, PANEL_H);
  ctx.fillStyle = css(P.panelWoodLit);
  ctx.fillRect(0, PANEL_Y, 320, 1);
  ctx.fillStyle = css(P.panelWoodDark);
  ctx.fillRect(0, 199, 320, 1);

  // the action line — what clicking will do
  bevelBox(ctx, 4, PANEL_Y + 4, 312, 12, P.panelWoodDark);
  if (sentence) drawText(ctx, sentence, 9, PANEL_Y + 5, P.verbHot, 1, P.black, 1);

  // a quiet how-to, centred
  const h1 = 'Click anything: exhibits, people, the doors.';
  const h2 = 'Ride the elevator to change floors.';
  drawText(ctx, h1, Math.round(160 - textWidth(h1, 1, 1) / 2), PANEL_Y + 26, P.verbIdle, 1, P.black, 1);
  drawText(ctx, h2, Math.round(160 - textWidth(h2, 1, 1) / 2), PANEL_Y + 40, P.verbIdle, 1, P.black, 1);
}

// No interactive controls in the bar any more (clicking is smart).
export function hitPanel(_mx: number, _my: number): { type: 'verb'; verb: string } | { type: 'inv'; index: number } | null {
  return null;
}
