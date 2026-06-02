import { P, css, type RGB } from '../art/palette';
import { drawText } from '../art/font';

// Shared room-drawing helpers. Coordinates are internal pixels; the room canvas
// is 320x144 (the SCUMM panel owns y=144..200, outside this canvas).

export function r(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: RGB) {
  ctx.fillStyle = css(c);
  ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
}

// A generic interior: a flat back wall + a textured floor band.
export function interior(
  ctx: CanvasRenderingContext2D,
  wall: RGB = P.wall, wallLit: RGB = P.wallLit, floor: RGB = P.floor, floorDark: RGB = P.floorDark,
) {
  r(ctx, 0, 0, 320, 144, wall);
  r(ctx, 0, 0, 320, 3, wallLit);
  r(ctx, 0, 100, 320, 2, P.wallShadow);
  r(ctx, 0, 104, 320, 40, floor);
  r(ctx, 0, 104, 320, 1, wallLit);
  for (let y = 112; y < 144; y += 8) for (let x = ((y / 8) % 2) * 12; x < 320; x += 24) r(ctx, x, y, 20, 1, floorDark);
}

// A framed exhibit panel with a small title painted on it.
export function exhibit(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: RGB, title?: string) {
  r(ctx, x - 2, y - 2, w + 4, h + 4, P.ink);
  r(ctx, x - 1, y - 1, w + 2, h + 2, P.amberDark);
  r(ctx, x, y, w, h, fill);
  r(ctx, x, y, w, 1, P.wallLit);
  r(ctx, x, y + h - 1, w, 1, P.black);
  if (title) drawText(ctx, title, x + 4, y + 4, P.inkLight, 1, P.black, 1);
}

// A steel lift door (left wall of every content floor).
export function liftDoor(ctx: CanvasRenderingContext2D, x = 2) {
  r(ctx, x, 78, 26, 62, P.steelDark);
  r(ctx, x + 2, 80, 22, 58, P.steel);
  r(ctx, x + 12, 80, 1, 58, P.steelDark);
  r(ctx, x + 2, 80, 22, 2, P.steelLit);
  r(ctx, x + 24, 104, 5, 9, P.ink);
  r(ctx, x + 25, 106, 3, 2, P.amberLit);
}
