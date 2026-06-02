import { P, css, type RGB } from '../art/palette';
import { Pixels, rampPick, ditherPick } from '../art/dither';

function r(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: RGB) {
  ctx.fillStyle = css(c);
  ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
}

// Title: a glass HQ tower at dusk, in the brand's warm palette. The logo text
// is drawn over the top third (kept clear) by main.ts.
export function buildTitleScene(): HTMLCanvasElement {
  const cv = document.createElement('canvas'); cv.width = 320; cv.height = 200;
  const ctx = cv.getContext('2d')!; ctx.imageSmoothingEnabled = false;

  // dusk sky
  const img = ctx.createImageData(320, 150);
  const px = new Pixels(img, 320, 150);
  const sky: RGB[] = [P.duskA, P.duskB, P.duskC, P.duskD];
  const glow: RGB = P.glow, core: RGB = [255, 244, 214];
  for (let y = 0; y < 150; y++) {
    for (let x = 0; x < 320; x++) {
      let c = rampPick(sky, y / 150, x, y);
      const dx = x - 160, dy = (y - 120) * 1.3;
      const d = Math.sqrt(dx * dx + dy * dy);
      const g1 = 1 - d / 120; if (g1 > 0) c = ditherPick(c, glow, g1 * 0.7, x, y);
      const g2 = 1 - d / 40; if (g2 > 0) c = ditherPick(c, core, g2 * 0.5, x, y);
      px.set(x, y, c);
    }
  }
  ctx.putImageData(img, 0, 0);

  // side skyline
  const roofs = [30, 54, 20, 64, 38];
  for (let i = 0; i < roofs.length; i++) {
    const bx = i * 30 - 6, h = roofs[i];
    r(ctx, bx, 150 - h, 28, h, P.cityDark);
    r(ctx, bx + 4, 150 - h + 8, 3, 4, P.winLit);
  }
  for (let i = 0; i < roofs.length; i++) {
    const bx = 320 - (i * 30) - 22, h = roofs[i];
    r(ctx, bx, 150 - h, 28, h, P.cityDark);
    r(ctx, bx + 18, 150 - h + 10, 3, 4, P.winLit);
  }

  // the HQ tower (centre)
  const tx = 132, tw = 56, ttop = 84;
  r(ctx, tx - 2, ttop - 4, tw + 4, 150 - ttop + 4, [40, 38, 52]);
  r(ctx, tx, ttop, tw, 150 - ttop, P.cityLit);
  r(ctx, tx, ttop, tw, 2, [96, 86, 96]);
  // lit window grid
  for (let wy = ttop + 8; wy < 148; wy += 12) {
    for (let wx = tx + 6; wx < tx + tw - 6; wx += 12) {
      const lit = (wx * 7 + wy * 13) % 5 < 3;
      r(ctx, wx, wy, 7, 8, lit ? P.winLit : [40, 38, 50]);
    }
  }
  // amber rooftop sign
  r(ctx, tx + 8, ttop - 10, tw - 16, 7, P.amber);
  r(ctx, tx + 8, ttop - 10, tw - 16, 1, P.amberLit);

  // foreground street + a warm entrance glow
  r(ctx, 0, 150, 320, 50, [26, 24, 30]);
  r(ctx, 0, 150, 320, 2, [44, 40, 48]);
  const g = ctx.createRadialGradient(160, 150, 4, 160, 150, 40);
  g.addColorStop(0, 'rgba(255,210,120,0.55)');
  g.addColorStop(1, 'rgba(255,210,120,0)');
  ctx.fillStyle = g; ctx.fillRect(120, 132, 80, 40);
  r(ctx, 152, 138, 16, 14, [60, 46, 30]);
  r(ctx, 154, 140, 12, 12, P.winLit);
  return cv;
}
