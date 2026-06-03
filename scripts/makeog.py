#!/usr/bin/env python3
"""Generate public/og.png — the 1200x630 social-share card.

A dusk-lit skyline (the "Angel Jaime Building" among the towers) with the title,
matching the game's look. This is what shows when the link is shared on LinkedIn,
Slack, X, etc. Re-run after edits:  python3 scripts/makeog.py
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630
GROUND = H
img = Image.new("RGB", (W, H), (24, 20, 34))
d = ImageDraw.Draw(img)

# ---- dusk gradient ----
sky = [(26, 22, 40), (40, 30, 58), (96, 60, 84), (188, 110, 92), (236, 166, 110), (250, 206, 150)]
def ramp(t):
    t = max(0.0, min(0.999, t))
    seg = t * (len(sky) - 1); i = int(seg); f = seg - i
    a = sky[i]; b = sky[min(i + 1, len(sky) - 1)]
    return tuple(int(a[k] + (b[k] - a[k]) * f) for k in range(3))
for y in range(H):
    d.line([(0, y), (W, y)], fill=ramp(y / H))

# ---- low sun + soft glow on the horizon ----
sun_x, sun_y = 884, 452
glow = Image.new("L", (W, H), 0)
gd = ImageDraw.Draw(glow)
for rad in range(300, 0, -3):
    gd.ellipse([sun_x - rad, sun_y - rad, sun_x + rad, sun_y + rad], fill=int(110 * (1 - rad / 300)))
glow = glow.filter(ImageFilter.GaussianBlur(46))
img = Image.composite(Image.new("RGB", (W, H), (255, 226, 156)), img, glow)
d = ImageDraw.Draw(img)
d.ellipse([sun_x - 34, sun_y - 34, sun_x + 34, sun_y + 34], fill=(252, 224, 158))

# ---- skyline ----
def building(x, w, h, body, lit=(245, 206, 120), dim=(44, 38, 56), sign=False, density=3, step=20):
    top = GROUND - h
    d.rectangle([x, top, x + w, GROUND], fill=body)
    d.rectangle([x, top, x + w, top + 2], fill=tuple(min(255, c + 26) for c in body))
    if sign:
        d.rectangle([x + w * 0.16, top - 11, x + w * 0.84, top - 2], fill=(214, 170, 8))
        d.rectangle([x + w * 0.16, top - 11, x + w * 0.84, top - 9], fill=(245, 206, 96))
    wy = top + 14
    while wy < GROUND - 12:
        wx = x + 12
        while wx < x + w - 11:
            on = ((int(wx) * 7 + int(wy) * 13) % 5) < density
            d.rectangle([wx, wy, wx + 9, wy + 12], fill=lit if on else dim)
            wx += step
        wy += 24

# back row (dimmer, shorter) then a varied front row
i = 0; x = -24
while x < W + 24:
    w = 70 + (i * 31) % 52
    h = 96 + (i * 47) % 120
    building(x, w, h, (36, 30, 52), lit=(214, 170, 110), dim=(48, 42, 62), density=2)
    x += w + 9; i += 1
i = 0; x = -10
while x < W + 24:
    w = 64 + (i * 41) % 60
    h = 140 + (i * 59) % 170
    building(x, w, h, (26, 22, 42), lit=(248, 208, 122), dim=(40, 34, 52), density=3)
    x += w + 12; i += 1
# the hero — the Angel Jaime Building, with an amber rooftop sign
building(986, 150, 384, (20, 17, 34), lit=(250, 214, 130), dim=(38, 32, 50), sign=True, density=3, step=22)

# subtle vignette
vig = Image.new("L", (W, H), 0)
vd = ImageDraw.Draw(vig)
vd.rectangle([0, 0, W, H], fill=46)
vd.ellipse([-220, -160, W + 220, H + 220], fill=0)
vig = vig.filter(ImageFilter.GaussianBlur(120))
img = Image.composite(Image.new("RGB", (W, H), (8, 6, 12)), img, vig)
d = ImageDraw.Draw(img)

# ---- text ----
def font(paths, size):
    for p in paths:
        if os.path.exists(p):
            try: return ImageFont.truetype(p, size)
            except Exception: pass
    return ImageFont.load_default()

GEORGIA_B = ["/System/Library/Fonts/Supplemental/Georgia Bold.ttf", "/Library/Fonts/Georgia Bold.ttf"]
ARIAL_B = ["/System/Library/Fonts/Supplemental/Arial Bold.ttf", "/System/Library/Fonts/Helvetica.ttc"]
ARIAL = ["/System/Library/Fonts/Supplemental/Arial.ttf", "/System/Library/Fonts/Helvetica.ttc"]

PAD = 76
AMBER = (242, 198, 70)
CREAM = (248, 240, 222)
SOFT = (230, 216, 194)
MUTED = (206, 188, 166)
SHADOW = (14, 9, 14)

def text(xy, s, fnt, fill, shadow=SHADOW):
    x, y = xy
    if shadow: d.text((x + 2, y + 3), s, font=fnt, fill=shadow)
    d.text((x, y), s, font=fnt, fill=fill)

def spaced(x, y, s, fnt, fill, gap=8):
    for ch in s:
        d.text((x + 2, y + 2), ch, font=fnt, fill=SHADOW)
        d.text((x, y), ch, font=fnt, fill=fill)
        x += d.textlength(ch, font=fnt) + gap
    return x

# eyebrow
spaced(PAD, 92, "ANGEL JAIME", font(ARIAL_B, 30), AMBER, gap=9)

# title — auto-fit to the column left of the hero building
maxw = 986 - 34 - PAD
title = "The Playable Résumé"
tsize = 104
while tsize > 56:
    tf = font(GEORGIA_B, tsize)
    if d.textlength(title, font=tf) <= maxw: break
    tsize -= 2
text((PAD, 138), title, tf, CREAM)

# subtitle
sub = font(ARIAL, 27)
text((PAD, 138 + tsize + 22), "A point-and-click tour of a product career —", sub, SOFT)
text((PAD, 138 + tsize + 58), "AI · Fintech · Travel · Marketplaces.", sub, SOFT)

# footer: play pill + url
py = 470
label = "Play in your browser"
pf = font(ARIAL_B, 26)
lw = d.textlength(label, font=pf)
pill_w = lw + 92
pill_h = 56
d.rounded_rectangle([PAD, py, PAD + pill_w, py + pill_h], radius=28, fill=AMBER)
# play triangle
d.polygon([(PAD + 30, py + 16), (PAD + 30, py + 40), (PAD + 50, py + 28)], fill=(30, 21, 12))
d.text((PAD + 62, py + 15), label, font=pf, fill=(30, 21, 12))
# url on a dark chip so it stays legible over the skyline
uf = font(ARIAL, 22)
url = "angeljaimer.github.io/angel-resume-game"
uw = d.textlength(url, font=uf)
ux = PAD + pill_w + 22
d.rounded_rectangle([ux, py + 6, ux + uw + 36, py + pill_h - 6], radius=22, fill=(22, 18, 32))
d.text((ux + 18, py + 16), url, font=uf, fill=(228, 212, 188))

out = os.path.join(os.path.dirname(__file__), "..", "public", "og.png")
img.save(out)
print("wrote public/og.png  (title size %dpx)" % tsize)
