// ============================================================
//  GAME CONFIG — Angel Jaime: The Playable Résumé
// ============================================================

export const CONFIG = {
  // --- Title screen text ---
  titleSmall: 'The Playable Résumé of',   // small line above the logo (scale 2)
  title: 'ANGEL JAIME',                    // the big logo word (scale 3)
  subtitle: 'A point-and-click tour of a product career',
  credit: 'click to step inside',

  // --- Per-scene music (theme keys: town | gate | sardana | medieval) ---
  // No bespoke office score yet — every room uses a calm default. Tune later.
  roomTheme: { rooftop: 'sardana', outside: 'town' } as Record<string, string>,
  defaultTheme: 'town',

  // --- Save slot (localStorage) ---
  saveKey: 'angel_resume_game_v1',

  // --- About / legal panel (gear -> About). Keep lines ~40 chars. ---
  aboutTitle: 'ABOUT',
  about: [
    'An interactive résumé. You play a',
    'recruiter touring Angel Jaime\'s career,',
    'floor by floor.',
    '',
    'Product leader, 10 years plus. Booking,',
    'Just Eat, Revolut, Hopper, Yayzy, Engine.',
    '',
    'Made with Claude Code and pointclick-kit.',
    '',
    '(c) 2026 Angel Jaime.',
    'angeljaime.com',
    'linkedin.com/in/angel-jaime-3054b632',
  ],
};
