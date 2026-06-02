// Dialogue trees. Each node: an NPC line + the player's response options.
// `to` points to the next node ('end' closes). `set` raises a flag; `if`/`ifNot`
// gate visibility; `once` hides after use; `card`/`goto` show an ending card.
export interface Opt {
  text: string;
  to: string;
  set?: string;
  give?: string;
  if?: string;
  ifNot?: string;
  once?: boolean;
  card?: string[];
  goto?: string;
}
export interface DialogueNode {
  npc: string;
  options: Opt[];
}
export type Dialogue = Record<string, DialogueNode>;

// ---- The closing contact card (shown from Angel's dialogue on the roof) ----
const CARD = [
  'GET IN TOUCH', '',
  'Angel Jaime - Product Leader',
  'AI · Fintech · Travel · Marketplaces', '',
  'angeljaimer@gmail.com',
  'linkedin.com/in/angel-jaime-3054b632', '',
  'Thanks for touring the building.',
];

// ---- Lobby: the concierge orients the recruiter ----
export const CONCIERGE_DIALOGUE: Dialogue = {
  start: {
    npc: "Welcome to the Angel Jaime Building. You're here to size up his work, I take it. Where shall I point you?",
    options: [
      { text: 'What is this place?', to: 'about' },
      { text: 'How do I get around?', to: 'nav' },
      { text: 'And who am I here?', to: 'who', once: true },
      { text: "I'll look around. (Leave)", to: 'end' },
    ],
  },
  about: {
    npc: 'Every floor is a chapter of his career. This ground floor is the headline: his AI work at Engine. The rest is upstairs.',
    options: [
      { text: 'Got it.', to: 'start' },
    ],
  },
  nav: {
    npc: "The lift is on your left. Big Tech, Scale-ups, Startup, and Education down in the basement. Tour them all and the roof opens up — that's where you'll find him.",
    options: [
      { text: 'Thanks.', to: 'start' },
    ],
  },
  who: {
    npc: "You're a recruiter, of course. Best job in the building: you get to decide who builds the future.",
    options: [
      { text: 'Flatterer.', to: 'start' },
    ],
  },
};

// ---- Scale-ups: a growth PM ----
export const SCALEUPS_DIALOGUE: Dialogue = {
  start: {
    npc: "Scale-up life: everything's on fire, in a good way. Angel ran Rewards and Referrals here. Revolut Points started on this floor.",
    options: [
      { text: 'What was the hard part?', to: 'hard' },
      { text: '(Leave)', to: 'end' },
    ],
  },
  hard: {
    npc: 'Shipping fast without breaking trust. He line-managed twenty-odd people across two teams and still sweated the details.',
    options: [{ text: 'Nice.', to: 'end' }],
  },
};

// ---- Startup: the founder ----
export const STARTUP_DIALOGUE: Dialogue = {
  start: {
    npc: 'Welcome to the startup floor. Yayzy — we measured your carbon footprint straight from your bank data. Tiny team, enormous ambition.',
    options: [
      { text: 'How did it go?', to: 'go' },
      { text: '(Leave)', to: 'end' },
    ],
  },
  go: {
    npc: 'Apple App of the Day, a Product Hunt award, the BBC, thirty-plus countries. Angel was CPO: strategy one minute, hiring the next, support tickets after lunch.',
    options: [{ text: 'Respect.', to: 'end' }],
  },
};

// ---- Big Tech: a seasoned PM ----
export const BIGTECH_DIALOGUE: Dialogue = {
  start: {
    npc: 'The big leagues: Booking, Just Eat, Philips. This is where Angel learned to ship at scale. A partner app he built here has over a million users.',
    options: [
      { text: "What's he proudest of?", to: 'proud' },
      { text: '(Leave)', to: 'end' },
    ],
  },
  proud: {
    npc: "Taking Pulse from a sketch to a million users, and co-authoring a published paper on Just Eat's ranking. Engineers respect him. Users barely notice him. That's the job.",
    options: [{ text: 'Impressive.', to: 'end' }],
  },
};

// ---- Education: the professor ----
export const EDU_DIALOGUE: Dialogue = {
  start: {
    npc: 'Ah, the archive. An Executive MBA, a master in Business Intelligence, and — where it all began — a hospitality degree in Barcelona.',
    options: [
      { text: 'Hospitality to product?', to: 'path' },
      { text: '(Leave)', to: 'end' },
    ],
  },
  path: {
    npc: "Hotels teach you to obsess over the guest. Swap 'guest' for 'user' and you have a product manager. He teaches them now, too.",
    options: [{ text: 'Makes sense.', to: 'end' }],
  },
};

// ---- Rooftop: Angel himself (the finale) ----
export const ANGEL_DIALOGUE: Dialogue = {
  start: {
    npc: 'You made it to the roof. So — the whole building in one breath: I take fuzzy, high-stakes problems and ship products that move real numbers.',
    options: [
      { text: 'Why should we hire you?', to: 'why' },
      { text: 'What are you looking for?', to: 'want' },
      { text: "Let's talk. (Finish)", to: 'end', card: CARD, goto: 'rooftop' },
    ],
  },
  why: {
    npc: "Ten years, four countries, AI to fintech to travel. I've built zero-to-one and scaled one-to-millions. I hire well, I ship, and I sweat the user. The rest is detail.",
    options: [
      { text: 'What are you after?', to: 'want' },
      { text: "Let's talk.", to: 'end', card: CARD, goto: 'rooftop' },
    ],
  },
  want: {
    npc: 'A product leadership role where AI actually matters and the problems are genuinely hard. Bonus points if it is good for the world.',
    options: [
      { text: 'Tell me again why you?', to: 'why' },
      { text: "Let's talk.", to: 'end', card: CARD, goto: 'rooftop' },
    ],
  },
};
