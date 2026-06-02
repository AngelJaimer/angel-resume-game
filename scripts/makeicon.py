#!/usr/bin/env python3
"""Generate the PWA icons (public/icon-180/192/512.png).

Draws a dusk-lit building — the "Angel Jaime Building" — with glowing amber
windows over a warm sunset gradient, matching the game's look. Re-run after
edits:  python scripts/makeicon.py
"""
import os
from PIL import Image, ImageDraw

N = 64  # render small for crisp pixels, then upscale with NEAREST
img = Image.new("RGB", (N, N), (30, 26, 44))
d = ImageDraw.Draw(img)

# warm dusk gradient with a touch of ordered dither
sky = [(46, 40, 70), (120, 80, 96), (210, 140, 96), (244, 198, 150)]
def ramp(t):
    t = max(0.0, min(0.999, t))
    seg = t * (len(sky) - 1); i = int(seg); f = seg - i
    a = sky[i]; b = sky[min(i + 1, len(sky) - 1)]
    return tuple(int(a[k] + (b[k] - a[k]) * f) for k in range(3))
for y in range(N):
    base = ramp(y / N)
    for x in range(N):
        col = base
        if (x ^ y) & 1:
            col = tuple(min(255, c + 6) for c in col)
        img.putpixel((x, y), col)

# the building silhouette
bx0, bx1, by0, by1 = 20, 44, 14, 58
dark = (34, 30, 46)
d.rectangle([bx0, by0, bx1, by1], fill=dark)
d.rectangle([bx0, by0, bx1, by0 + 1], fill=(64, 56, 74))   # lit top edge
# amber rooftop sign
d.rectangle([bx0 + 3, by0 - 4, bx1 - 3, by0 - 1], fill=(214, 170, 8))
# glowing window grid (some lit, some dark)
win, dim = (245, 206, 120), (52, 46, 62)
for wy in range(by0 + 5, by1 - 3, 7):
    for wx in range(bx0 + 4, bx1 - 3, 7):
        lit = ((wx * 7 + wy * 13) % 5) < 3
        d.rectangle([wx, wy, wx + 2, wy + 4], fill=win if lit else dim)
# ground
d.rectangle([0, by1, N, N], fill=(24, 20, 30))
d.rectangle([0, by1, N, by1 + 1], fill=(52, 44, 58))

out = os.path.join(os.path.dirname(__file__), "..", "public")
for size in (180, 192, 512):
    img.resize((size, size), Image.NEAREST).save(os.path.join(out, f"icon-{size}.png"))
print("wrote public/icon-180.png, icon-192.png, icon-512.png")
