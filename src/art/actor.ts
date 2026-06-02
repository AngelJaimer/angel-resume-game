import { P, css, type RGB } from './palette';

// Pixel helpers shared by every character drawer.
function px(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: RGB) {
  ctx.fillStyle = css(c);
  ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
}
function blk(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: RGB, o: RGB = P.black) {
  ctx.fillStyle = css(o);
  ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
  ctx.fillStyle = css(c);
  ctx.fillRect((x | 0) + 1, (y | 0) + 1, Math.max(0, (w | 0) - 2), Math.max(0, (h | 0) - 2));
}

// ----------------------------------------------------------------
//  THE PLAYER — a recruiter in a blazer with a lanyard badge.
//  Drawn from the feet up at (fx,fy); `facing` mirrors; walk cycle on `t`.
// ----------------------------------------------------------------
const TROUSER: RGB = [58, 62, 72], TROUSER_D: RGB = [42, 46, 56], SHOE: RGB = [40, 34, 30];
const BLAZER: RGB = [64, 74, 98], BLAZER_D: RGB = [46, 54, 74], SHIRT: RGB = [226, 228, 232];

export function drawActor(
  ctx: CanvasRenderingContext2D, fx: number, fy: number,
  facing: 'left' | 'right' = 'right', moving = false, t = 0, idleBob = 0,
) {
  const cx = Math.round(fx);
  const fyR = Math.round(fy);
  ctx.save();
  if (facing === 'left') { ctx.translate(cx * 2, 0); ctx.scale(-1, 1); }

  const swing = moving ? Math.round(Math.sin(t * 11) * 2) : 0;
  const aswing = moving ? Math.round(Math.sin(t * 11) * 1.5) : 0;
  const bob = moving ? (Math.sin(t * 11) > 0 ? 1 : 0) : Math.round(idleBob);

  // legs + shoes
  blk(ctx, cx - 6 + swing, fyR - 20, 5, 16, TROUSER);
  blk(ctx, cx + 1 - swing, fyR - 20, 5, 16, TROUSER);
  px(ctx, cx - 5 + swing, fyR - 19, 2, 14, TROUSER_D);
  px(ctx, cx + 2 - swing, fyR - 19, 2, 14, TROUSER_D);
  blk(ctx, cx - 7 + swing, fyR - 5, 7, 5, SHOE);
  blk(ctx, cx + 0 - swing, fyR - 5, 7, 5, SHOE);

  // torso (blazer over a shirt)
  const ty = fyR - 38 + bob;
  blk(ctx, cx - 7, ty, 14, 19, BLAZER);
  px(ctx, cx - 1, ty + 1, 2, 17, SHIRT);     // open-collar shirt strip
  px(ctx, cx - 7, ty + 1, 2, 17, BLAZER_D);
  px(ctx, cx + 4, ty + 1, 2, 17, BLAZER_D);
  // lanyard + badge
  px(ctx, cx - 1, ty + 1, 1, 8, P.amber);
  blk(ctx, cx - 3, ty + 8, 5, 5, [244, 236, 220]);
  px(ctx, cx - 2, ty + 9, 3, 1, P.amber);

  // arms
  blk(ctx, cx - 10, ty + 2 + aswing, 4, 13, BLAZER);
  blk(ctx, cx + 6, ty + 2 - aswing, 4, 13, BLAZER);
  px(ctx, cx - 10, ty + 13 + aswing, 4, 3, P.skin);
  px(ctx, cx + 6, ty + 13 - aswing, 4, 3, P.skin);

  // neck + head
  px(ctx, cx - 2, ty - 2, 4, 3, P.skin);
  const hy = fyR - 50 + bob;
  blk(ctx, cx - 5, hy, 10, 11, P.skin);
  px(ctx, cx - 4, hy + 1, 3, 9, P.skinShadow);
  px(ctx, cx - 5, hy - 1, 11, 3, P.hair);
  px(ctx, cx - 6, hy, 2, 5, P.hair);
  px(ctx, cx + 1, hy + 4, 1, 2, P.black);   // eye
  px(ctx, cx + 1, hy + 8, 3, 1, P.skinShadow); // mouth
  ctx.restore();
}

// ----------------------------------------------------------------
//  NPCs — a shared standing body + per-character colours/accessory.
// ----------------------------------------------------------------
interface Look {
  legs: RGB; torso: RGB; torsoD?: RGB; hair: RGB; skin?: RGB; skinD?: RGB;
  acc?: (ctx: CanvasRenderingContext2D, cx: number, hy: number, ty: number, fyR: number) => void;
}

function stand(ctx: CanvasRenderingContext2D, fx: number, fy: number, facing: 'left' | 'right', t: number, c: Look) {
  const cx = Math.round(fx);
  const fyR = Math.round(fy);
  const bob = Math.sin(t * 1.6) > 0.9 ? 1 : 0;
  const skin = c.skin || P.skin, skinD = c.skinD || P.skinShadow;
  ctx.save();
  if (facing === 'left') { ctx.translate(cx * 2, 0); ctx.scale(-1, 1); }
  // legs + shoes
  blk(ctx, cx - 6, fyR - 18, 5, 16, c.legs);
  blk(ctx, cx + 1, fyR - 18, 5, 16, c.legs);
  blk(ctx, cx - 7, fyR - 4, 7, 4, P.black);
  blk(ctx, cx + 0, fyR - 4, 7, 4, P.black);
  // torso
  const ty = fyR - 36 + bob;
  blk(ctx, cx - 7, ty, 15, 20, c.torso);
  px(ctx, cx - 6, ty + 1, 3, 18, c.torsoD || c.torso);
  // arms
  blk(ctx, cx - 10, ty + 2, 4, 14, c.torso);
  blk(ctx, cx + 7, ty + 2, 4, 14, c.torso);
  px(ctx, cx - 10, ty + 13, 4, 3, skin);
  px(ctx, cx + 7, ty + 13, 4, 3, skin);
  // head
  const hy = fyR - 46 + bob;
  blk(ctx, cx - 5, hy, 11, 11, skin);
  px(ctx, cx - 4, hy + 1, 3, 9, skinD);
  px(ctx, cx - 5, hy - 1, 11, 3, c.hair);
  px(ctx, cx - 6, hy, 2, 6, c.hair);
  px(ctx, cx - 2, hy + 4, 1, 2, P.black);
  px(ctx, cx + 3, hy + 4, 1, 2, P.black);
  c.acc?.(ctx, cx, hy, ty, fyR);
  ctx.restore();
}

// Lobby — a warm concierge in an amber blazer with a tie + name badge.
export function drawConcierge(ctx: CanvasRenderingContext2D, fx: number, fy: number, facing: 'left' | 'right' = 'left', t = 0) {
  stand(ctx, fx, fy, facing, t, {
    legs: [54, 50, 58], torso: [156, 120, 66], torsoD: [120, 90, 46], hair: [54, 40, 30],
    skin: [238, 202, 166], skinD: [200, 158, 122],
    acc: (c, cx, _hy, ty) => { px(c, cx - 1, ty + 1, 2, 9, [80, 56, 38]); blk(c, cx + 2, ty + 6, 4, 4, [244, 236, 220]); },
  });
}

// Scale-ups — a growth PM in a grey hoodie with headphones.
export function drawColleague(ctx: CanvasRenderingContext2D, fx: number, fy: number, facing: 'left' | 'right' = 'left', t = 0) {
  stand(ctx, fx, fy, facing, t, {
    legs: [60, 64, 74], torso: [98, 106, 118], torsoD: [72, 80, 92], hair: [40, 32, 28],
    skin: [226, 180, 150], skinD: [188, 146, 116],
    acc: (c, cx, hy) => { px(c, cx - 6, hy - 2, 12, 1, [40, 40, 44]); px(c, cx - 7, hy + 2, 2, 4, [40, 40, 44]); px(c, cx + 5, hy + 2, 2, 4, [40, 40, 44]); },
  });
}

// Big Tech — a seasoned PM, greying, navy shirt + lanyard.
export function drawVeteran(ctx: CanvasRenderingContext2D, fx: number, fy: number, facing: 'left' | 'right' = 'left', t = 0) {
  stand(ctx, fx, fy, facing, t, {
    legs: [50, 52, 62], torso: [70, 86, 116], torsoD: [50, 62, 86], hair: [150, 146, 140],
    skin: [232, 196, 160], skinD: [196, 154, 118],
    acc: (c, cx, _hy, ty) => { px(c, cx - 1, ty + 1, 1, 9, P.amber); blk(c, cx - 3, ty + 8, 5, 4, [244, 236, 220]); },
  });
}

// Startup — a founder in a green tee with a coffee cup.
export function drawFounder(ctx: CanvasRenderingContext2D, fx: number, fy: number, facing: 'left' | 'right' = 'left', t = 0) {
  stand(ctx, fx, fy, facing, t, {
    legs: [70, 74, 84], torso: [86, 140, 100], torsoD: [56, 98, 64], hair: [60, 44, 32],
    skin: [240, 200, 160], skinD: [200, 158, 120],
    acc: (c, cx, _hy, ty) => { blk(c, cx + 8, ty + 10, 4, 5, [232, 226, 214]); px(c, cx + 9, ty + 9, 2, 1, [220, 220, 220]); },
  });
}

// Education — a professor in a cardigan with glasses + a book.
export function drawProfessor(ctx: CanvasRenderingContext2D, fx: number, fy: number, facing: 'left' | 'right' = 'left', t = 0) {
  stand(ctx, fx, fy, facing, t, {
    legs: [72, 60, 50], torso: [150, 122, 84], torsoD: [118, 92, 60], hair: [156, 150, 142],
    skin: [236, 198, 160], skinD: [198, 156, 120],
    acc: (c, cx, hy, ty) => {
      px(c, cx - 4, hy + 4, 3, 2, [40, 40, 44]); px(c, cx + 2, hy + 4, 3, 2, [40, 40, 44]); px(c, cx - 1, hy + 4, 1, 1, [40, 40, 44]); // glasses
      blk(c, cx + 7, ty + 9, 5, 6, [150, 70, 56]); // a book in hand
    },
  });
}

// Rooftop — Angel himself: charcoal henley, short beard, an amber wristband.
export function drawAngel(ctx: CanvasRenderingContext2D, fx: number, fy: number, facing: 'left' | 'right' = 'left', t = 0) {
  const cx = Math.round(fx);
  const fyR = Math.round(fy);
  const bob = Math.sin(t * 1.6) > 0.9 ? 1 : 0;
  ctx.save();
  if (facing === 'left') { ctx.translate(cx * 2, 0); ctx.scale(-1, 1); }
  blk(ctx, cx - 6, fyR - 18, 5, 16, [52, 54, 62]);
  blk(ctx, cx + 1, fyR - 18, 5, 16, [52, 54, 62]);
  blk(ctx, cx - 7, fyR - 4, 7, 4, P.black);
  blk(ctx, cx + 0, fyR - 4, 7, 4, P.black);
  const ty = fyR - 36 + bob;
  blk(ctx, cx - 7, ty, 15, 20, [74, 76, 84]);          // henley
  px(ctx, cx - 6, ty + 1, 3, 18, [54, 56, 64]);
  px(ctx, cx - 1, ty + 1, 1, 6, [40, 42, 48]);         // placket
  blk(ctx, cx - 10, ty + 2, 4, 14, [74, 76, 84]);
  blk(ctx, cx + 7, ty + 2, 4, 14, [74, 76, 84]);
  px(ctx, cx - 10, ty + 13, 4, 3, [236, 198, 160]);
  px(ctx, cx + 7, ty + 13, 4, 3, [236, 198, 160]);
  px(ctx, cx + 7, ty + 11, 4, 2, P.amber);             // amber wristband
  const hy = fyR - 46 + bob;
  blk(ctx, cx - 5, hy, 11, 11, [236, 198, 160]);
  px(ctx, cx - 4, hy + 1, 3, 9, [198, 156, 120]);
  px(ctx, cx - 5, hy - 1, 11, 3, [50, 40, 32]);        // hair
  px(ctx, cx - 6, hy, 2, 6, [50, 40, 32]);
  px(ctx, cx - 4, hy + 8, 9, 2, [120, 92, 70]);        // short beard
  px(ctx, cx - 2, hy + 4, 1, 2, P.black);
  px(ctx, cx + 3, hy + 4, 1, 2, P.black);
  ctx.restore();
}
