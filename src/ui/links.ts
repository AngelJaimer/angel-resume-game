// Controls the HTML overlays that float over the game canvas (a <canvas> can't
// hold real <a> links). Elements live in index.html. Called from main.ts.

function el(id: string): HTMLElement | null { return document.getElementById(id); }

export function initLinks() {
  el('uiOverview')?.addEventListener('click', () => overview(true));
  el('ovClose')?.addEventListener('click', () => overview(false));
  el('overview')?.addEventListener('click', (e) => { if ((e.target as HTMLElement).id === 'overview') overview(false); });
  el('exClose')?.addEventListener('click', () => hideExhibit());
  el('exhibit')?.addEventListener('click', (e) => { if ((e.target as HTMLElement).id === 'exhibit') hideExhibit(); });
}

export function overview(show: boolean) {
  const m = el('overview');
  if (m) m.style.display = show ? 'flex' : 'none';
}

// Persistent top-right bar (site link + Overview button).
export function showGameUI(on: boolean) {
  const u = el('ui');
  if (u) u.style.display = on ? 'flex' : 'none';
}

// The exhibit message card: title + body + clickable links, all in one card.
export function showExhibit(title: string, body: string, links: Array<{ url: string; label: string }>) {
  const t = el('exTitle'); if (t) t.textContent = title;
  const b = el('exBody'); if (b) b.textContent = body;
  const box = el('exLinks');
  if (box) {
    box.innerHTML = '';
    for (const l of links) {
      const a = document.createElement('a');
      a.href = l.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = l.label + ' ↗';
      box.appendChild(a);
    }
    box.style.display = links.length ? 'flex' : 'none';
  }
  const m = el('exhibit'); if (m) m.style.display = 'flex';
}
export function hideExhibit() {
  const m = el('exhibit');
  if (m) m.style.display = 'none';
}
