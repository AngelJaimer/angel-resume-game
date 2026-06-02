// The classic nine-verb set, in English.
export const VERB_GRID = [
  ['Open', 'Close', 'Give'],
  ['Pick up', 'Look at', 'Talk to'],
  ['Use', 'Push', 'Pull'],
];
export const VERBS = VERB_GRID.flat();

// Fallback lines when a verb has no specific response for an object — kept light
// and in character (a recruiter wandering a building, mildly amused).
export const DEFAULT_RESPONSES: Record<string, string> = {
  Open: "It's not that kind of door.",
  Close: 'Best left open.',
  Give: "I don't think they take bribes.",
  'Pick up': "That's part of the exhibit — better leave it.",
  'Look at': 'Nothing jumps out at me.',
  'Talk to': "They're not in a chatty mood.",
  Use: "I wouldn't know where to start.",
  Push: 'I push. The building wins.',
  Pull: "It doesn't budge.",
};
