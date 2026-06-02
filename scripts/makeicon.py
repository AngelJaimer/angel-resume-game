#!/usr/bin/env python3
"""Generate the PWA icons (public/icon-180.png and icon-512.png).

Draws a chunky pixel-art compass star on a dithered deep-blue field —
a generic "adventure" mark. Repaint per game (a key, a skull, a crown...)
by editing the shape below, then re-run:  python scripts/makeicon.py
"""
import math, os
from PIL import Image, ImageDraw

N = 64  # render small for crisp pixels, then upscale with NEAREST
img = Image.new("RGB", (N, N), (22, 20, 44))
d = ImageDraw.Draw(img)

# radial deep-blue background
cx = cy = N / 2
for y in range(N):
    for x in range(N):
        r = math.hypot(x - cx, y - cy) / (N / 2)
        t = max(0.0, min(1.0, r))
        col = (int(40 - 20 * t), int(32 - 16 * t), int(70 - 30 * t))
        # 2x2 ordered dither between two shades for a VGA feel
        if ((x ^ y) & 1) and r < 0.9:
            col = (col[0] + 8, col[1] + 6, col[2] + 10)
        img.putpixel((x, y), col)

# 8-point compass star
pts = []
for i in range(16):
    ang = math.pi * i / 8 - math.pi / 2
    rad = 26 if i % 2 == 0 else 10
    pts.append((cx + math.cos(ang) * rad, cy + math.sin(ang) * rad))
d.polygon(pts, fill=(245, 200, 90), outline=(20, 14, 8))
# inner core
d.polygon([(cx, cy - 9), (cx + 5, cy), (cx, cy + 9), (cx - 5, cy)], fill=(255, 240, 200))
d.ellipse([cx - 2, cy - 2, cx + 2, cy + 2], fill=(120, 80, 20))

out = os.path.join(os.path.dirname(__file__), "..", "public")
for size in (180, 512):
    img.resize((size, size), Image.NEAREST).save(os.path.join(out, f"icon-{size}.png"))
print("wrote public/icon-180.png and public/icon-512.png")
