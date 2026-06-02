// Controls the HTML link layer that floats over the game canvas (a <canvas>
// can't hold real <a> links). The elements live in index.html; this module
// shows/hides/updates them based on game state, called from main.ts.

function el(id: string): HTMLElement | null { return document.getElementById(id); }

export function initLinks() {
  el('uiOverview')?.addEventListener('click', () => overview(true));
  el('ovClose')?.addEventListener('click', () => overview(false));
  el('overview')?.addEventListener('click', (e) => { if ((e.target as HTMLElement).id === 'overview') overview(false); });
}

export function overview(show: boolean) {
  const m = el('overview');
  if (m) m.style.display = show ? 'flex' : 'none';
}

// Show/hide the persistent top-right bar (site link + Overview button).
export function showGameUI(on: boolean) {
  const u = el('ui');
  if (u) u.style.display = on ? 'flex' : 'none';
  if (!on) contact(false);
}

// A contextual "case study" link for the exhibit currently being looked at.
export function setCaseLink(url: string, label: string) {
  const a = el('uiCase') as HTMLAnchorElement | null;
  if (!a) return;
  a.href = url;
  a.textContent = label + '  ↗';
  a.style.display = 'inline-flex';
}
export function clearCaseLink() {
  const a = el('uiCase');
  if (a) a.style.display = 'none';
}

// The finale contact links (site / email / LinkedIn).
export function contact(on: boolean) {
  const c = el('uiContact');
  if (c) c.style.display = on ? 'flex' : 'none';
}
