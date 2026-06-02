// Tracks which floors the recruiter has toured. When all are seen, the gated
// Rooftop button appears in the elevator (the optional finale). Called from
// each floor's `onEnter`.
const FLOORS = ['lobby', 'bigtech', 'scaleups', 'startup', 'basement', 'outside'];

export function markSeen(state: any, id: string) {
  state.flags['seen_' + id] = true;
  if (FLOORS.every((f) => state.flags['seen_' + f])) state.flags.seen_all = true;
}
