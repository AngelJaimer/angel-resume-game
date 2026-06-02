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

// Persistent top-right bar (site link + Overview button).
export function showGameUI(on: boolean) {
  const u = el('ui');
  if (u) u.style.display = on ? 'flex' : 'none';
  if (!on) contact(false);
}

// Contextual external links for the exhibit being viewed (case study + company site).
export function setLinks(links: Array<{ url: string; label: string }>) {
  const box = el('uiLinks');
  if (!box) return;
  box.innerHTML = '';
  for (const l of links) {
    const a = document.createElement('a');
    a.className = 'pill pillhot';
    a.href = l.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = l.label + '  ↗';
    box.appendChild(a);
  }
  box.style.display = links.length ? 'flex' : 'none';
}
export function clearLinks() {
  const b = el('uiLinks');
  if (b) { b.innerHTML = ''; b.style.display = 'none'; }
}

// The finale contact links (site / email / LinkedIn).
export function contact(on: boolean) {
  const c = el('uiContact');
  if (c) c.style.display = on ? 'flex' : 'none';
}
