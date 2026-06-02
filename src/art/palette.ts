// Warm "editorial" interior palette for Angel Jaime's playable résumé.
// Cream walls, ink, and amber/gold accents (from BRAND.md), plus a small set
// of material colours for each floor. Every colour in the game is picked from
// here to keep the painted-VGA cohesion. RGB = [r,g,b].
export type RGB = [number, number, number];

export const P = {
  // --- core brand ---
  black:      [24, 20, 18]    as RGB,
  white:      [246, 244, 238] as RGB,
  ink:        [28, 24, 22]    as RGB,
  inkSoft:    [54, 48, 44]    as RGB,
  cream:      [249, 246, 240] as RGB,
  inkLight:   [246, 238, 222] as RGB,
  parchment:  [232, 224, 206] as RGB,

  // --- amber / gold accents ---
  amber:      [176, 132, 32]  as RGB,
  amberLit:   [226, 182, 74]  as RGB,
  amberDark:  [120, 86, 16]   as RGB,
  gold:       [214, 170, 8]   as RGB,
  glow:       [255, 226, 150] as RGB,

  // --- interior walls ---
  wall:       [228, 219, 200] as RGB,
  wallLit:    [242, 236, 221] as RGB,
  wallShadow: [198, 188, 166] as RGB,
  wallDeep:   [168, 158, 138] as RGB,

  // --- floors / wood ---
  floor:      [156, 120, 82]  as RGB,
  floorLit:   [180, 144, 102] as RGB,
  floorDark:  [120, 90, 60]   as RGB,
  carpet:     [150, 118, 82]  as RGB,
  carpetDark: [120, 92, 62]   as RGB,
  wood:       [138, 96, 60]   as RGB,
  woodLit:    [170, 122, 78]  as RGB,
  woodDark:   [92, 60, 38]    as RGB,
  woodShadow: [62, 40, 26]    as RGB,

  // --- glass / steel / screens (modern offices, elevator) ---
  steel:      [150, 156, 164] as RGB,
  steelLit:   [192, 198, 204] as RGB,
  steelDark:  [92, 100, 108]  as RGB,
  glass:      [120, 150, 160] as RGB,
  glassLit:   [176, 200, 206] as RGB,
  glassDark:  [78, 104, 114]  as RGB,
  screen:     [52, 106, 138]  as RGB,
  screenLit:  [126, 184, 214] as RGB,

  // --- startup / sustainability / outdoors greens ---
  green:      [96, 140, 96]   as RGB,
  greenLit:   [142, 178, 132] as RGB,
  greenDark:  [56, 98, 62]    as RGB,
  leaf:       [92, 140, 94]   as RGB,
  leafDark:   [54, 96, 60]    as RGB,
  trunk:      [120, 86, 56]   as RGB,

  // --- exposed brick (startup loft) ---
  brick:      [158, 94, 68]   as RGB,
  brickLit:   [188, 122, 92]  as RGB,
  brickDark:  [112, 62, 46]   as RGB,

  // --- outdoor day sky (ramp) ---
  skyDay1:    [108, 146, 188] as RGB,
  skyDay2:    [150, 180, 208] as RGB,
  skyDay3:    [192, 212, 226] as RGB,
  skyDay4:    [222, 230, 234] as RGB,

  // --- rooftop dusk (ramp) ---
  duskA:      [58, 52, 88]    as RGB,
  duskB:      [150, 96, 108]  as RGB,
  duskC:      [226, 150, 110] as RGB,
  duskD:      [250, 206, 150] as RGB,
  cityDark:   [44, 40, 58]    as RGB,
  cityLit:    [64, 56, 76]    as RGB,

  // --- windows / signage glints (also used by the title) ---
  winLit:     [244, 206, 120] as RGB,
  winDark:    [54, 46, 42]    as RGB,
  flagRed:    [192, 96, 56]   as RGB,
  cloud:      [244, 238, 224] as RGB,

  // --- SCUMM panel / UI (dark charcoal with amber verbs) ---
  panelWood:     [40, 34, 32]  as RGB,
  panelWoodLit:  [74, 64, 58]  as RGB,
  panelWoodDark: [22, 18, 16]  as RGB,
  verbIdle:      [198, 170, 110] as RGB,
  verbHot:       [240, 202, 96]  as RGB,

  // --- characters (defaults; restyled per sprite in actor.ts) ---
  skin:       [234, 196, 160] as RGB,
  skinShadow: [198, 156, 120] as RGB,
  hair:       [96, 70, 48]    as RGB,
  hairShadow: [70, 50, 34]    as RGB,
  shirt:      [232, 232, 228] as RGB,
  shirtShadow:[196, 196, 190] as RGB,
  pants:      [70, 84, 110]   as RGB,
  pantsShadow:[50, 60, 84]    as RGB,
  boots:      [60, 46, 36]    as RGB,
  belt:       [120, 84, 48]   as RGB,
};

export function css(c: RGB): string {
  return 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
}

export function mix(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}
