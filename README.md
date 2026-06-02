# Angel Jaime — The Playable Résumé

A point-and-click adventure where **you play a recruiter** touring Angel Jaime's product career, floor by floor — in the 90s LucasArts / *Monkey Island* style, entirely code-drawn, built with [Claude Code](https://claude.com/claude-code).

**▶ Play it in your browser → https://angeljaimer.github.io/angel-resume-game/**

*Take the elevator. Read the exhibits. Tour every floor and the rooftop opens up.*

## The building

| Floor | Chapter |
|---|---|
| **Ground — AI & Now** | Engine: the central AI platform, the smart-search rebuild, ML personalization |
| **1 — Big Tech** | Booking.com (Pulse, 1M users), Just Eat (Search, a published paper), Philips |
| **2 — Startup** | Yayzy — climate-fintech, CPO, zero-to-one (Apple App of the Day, 30+ countries) |
| **3 — Scale-ups** | Revolut (Rewards, Revolut Points) and Hopper (international expansion) |
| **B — Education** | Executive MBA, MSc Business Intelligence, and where it began in Barcelona |
| **Outside — Off the clock** | Newsletters, teaching, indie games, and Henry |
| **Rooftop** | Meet Angel (unlocks once you've toured everything) |

Free exploration with the classic nine-verb SCUMM interface — no puzzles gating the content.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

No runtime dependencies — TypeScript, Vite, and a `<canvas>`. The whole game (sprites, backgrounds, music, text) is generated in code; there are no image or audio asset files.

## How it was built

Built with **Claude Code** using the [pointclick-adventure](https://github.com/AngelJaimer/pointclick-adventure) skill and its pointclick-kit engine: give Claude a story — here, a résumé — and it designs the rooms, draws the sprites and backgrounds, writes the content, and verifies the whole thing plays end to end.

## Credits

Original code, art, and writing © 2026 Ángel Jaime. Engine: [pointclick-kit](https://github.com/AngelJaimer/pointclick-adventure).
