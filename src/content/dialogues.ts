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
  contact?: boolean; // reveal the finale contact links (site / email / LinkedIn)
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
  'angeljaime.com',
  'angeljaimer@gmail.com',
  'linkedin.com/in/angel-jaime-3054b632', '',
  'The links up top are clickable.',
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
    npc: "I designed alongside Angel on Revolut Business. Scale-up life: everything's on fire, in a good way. He ran Rewards and Referrals - Revolut Points started right here on this floor.",
    options: [
      { text: 'What was he like to work with?', to: 'hard' },
      { text: '(Leave)', to: 'end' },
    ],
  },
  hard: {
    npc: 'Decisive, but he listened. He line-managed twenty-odd of us across two teams, shipped fast, and still caught the details the rest of us missed.',
    options: [{ text: 'Good to know.', to: 'end' }],
  },
};

// ---- Startup: the founder ----
export const STARTUP_DIALOGUE: Dialogue = {
  start: {
    npc: 'I was one of the first hires at Yayzy - Angel hired me himself. We measured your carbon footprint straight from your bank data. Tiny team, enormous ambition.',
    options: [
      { text: 'What was he like as CPO?', to: 'go' },
      { text: '(Leave)', to: 'end' },
    ],
  },
  go: {
    npc: 'He wore every hat: company strategy one minute, interviewing me the next, answering support tickets after lunch. We hit Apple App of the Day, a Product Hunt award, the BBC, thirty-plus countries.',
    options: [{ text: 'Respect.', to: 'end' }],
  },
};

// ---- Big Tech: a seasoned PM ----
export const BIGTECH_DIALOGUE: Dialogue = {
  start: {
    npc: "I'm an engineer - I built Pulse with Angel at Booking. The big leagues: Booking, Just Eat, Philips. This is where he learned to ship at scale. That app has over a million users now.",
    options: [
      { text: 'What was he like to build with?', to: 'proud' },
      { text: '(Leave)', to: 'end' },
    ],
  },
  proud: {
    npc: "He took Pulse from a sketch to a million users and never lost the plot. Later, at Just Eat, he co-authored a published paper on the ranking algorithm. Engineers respect him. Users barely notice him. That is the job.",
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
      { text: "Let's talk. (Finish)", to: 'end', card: CARD, goto: 'rooftop', contact: true },
    ],
  },
  why: {
    npc: "Ten years, four countries, AI to fintech to travel. I've built zero-to-one and scaled one-to-millions. I hire well, I ship, and I sweat the user. The rest is detail.",
    options: [
      { text: 'What are you after?', to: 'want' },
      { text: "Let's talk.", to: 'end', card: CARD, goto: 'rooftop', contact: true },
    ],
  },
  want: {
    npc: 'A product leadership role where AI actually matters and the problems are genuinely hard. Bonus points if it is good for the world.',
    options: [
      { text: 'Tell me again why you?', to: 'why' },
      { text: "Let's talk.", to: 'end', card: CARD, goto: 'rooftop', contact: true },
    ],
  },
};
