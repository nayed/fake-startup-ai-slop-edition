/* Turns a generated startup into a landing page card. */

const esc = (value) => String(value).replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

/* Amounts are stored in millions: 6.9 → "$6.9M", 2760 → "$2.8B". */
export function money(millions) {
  const trim = (n) => String(Math.round(n * 10) / 10);
  return millions >= 1000 ? `$${trim(millions / 1000)}B` : `$${trim(millions)}M`;
}

export function badgeFor(valuation) {
  if (valuation >= 100000) return '🦄🦄🦄 Hectocorn';
  if (valuation >= 10000) return '🦄🦄 Decacorn';
  if (valuation >= 1000) return '🦄 Unicorn';
  return '🚀 Just raised';
}

/* Every AI logo is a sparkle, an asterisk-flower or a glowing orb. */
export function logoSvg({ shape, colors: [from, to] }) {
  const defs = `<defs><linearGradient id="su-grad" x1="0" y1="0" x2="1" y2="1">`
    + `<stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs>`;
  const shapes = {
    sparkle: '<path fill="url(#su-grad)" d="M12 1C12.8 8 16 11.2 23 12C16 12.8 12.8 16 12 23C11.2 16 8 12.8 1 12C8 11.2 11.2 8 12 1Z"/>',
    flower: `<g fill="url(#su-grad)">${[0, 30, 60, 90, 120, 150]
      .map((a) => `<ellipse cx="12" cy="12" rx="2.6" ry="10.5" transform="rotate(${a} 12 12)"/>`).join('')}</g>`,
    orb: '<circle cx="12" cy="12" r="10.5" fill="url(#su-grad)"/><circle cx="8.6" cy="8.2" r="3.4" fill="#fff" opacity=".35"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${defs}${shapes[shape]}</svg>`;
}

const stat = (label, value, note) => `<div class="su-stat"><small>${esc(label)}</small>`
  + `<strong>${esc(value)}</strong><span>${esc(note)}</span></div>`;
const meta = (label, value) => `<div><small>${esc(label)}</small><p>${esc(value)}</p></div>`;

export function renderStartup(s, root) {
  root.innerHTML = `
    <div class="su-head">
      <div class="su-logo">${logoSvg(s.logo)}</div>
      <div>
        <h2 class="su-name">${esc(s.name)}</h2>
        <p class="su-oneliner">${esc(s.oneLiner)}</p>
      </div>
      <span class="su-badge">${esc(badgeFor(s.valuation))}</span>
    </div>
    <h3 class="su-tagline gradient-text">${esc(s.tagline)}</h3>
    <p class="su-pitch">${esc(s.pitch)}</p>
    <div class="su-ctas">
      <button class="btn btn-primary" data-act="waitlist">Join the waitlist ✨</button>
      <button class="btn btn-ghost" data-act="invest">Invest now 💸</button>
      <button class="btn btn-ghost" data-act="demo">Book a demo →</button>
    </div>
    <div class="su-stats">
      ${stat('Raised', money(s.raised), s.round)}
      ${stat('Valuation', money(s.valuation), 'post-money, pre-product')}
      ${stat('Revenue', s.revenue[0], s.revenue[1])}
      ${stat('Team', `${s.humans} human${s.humans === 1 ? '' : 's'}`, `+ ${s.agents.toLocaleString('en-US')} agents`)}
    </div>
    <div class="su-features">
      ${s.features.map(([title, text]) => `<div class="su-feature"><h4>${esc(title)}</h4><p>${esc(text)}</p></div>`).join('')}
    </div>
    <blockquote class="su-quote">“${esc(s.quote)}”<cite>— ${esc(s.quoteBy)}</cite></blockquote>
    <div class="su-meta">
      ${meta('Backed by', s.investors.join(', '))}
      ${meta('Founder', `${s.founder.name}, ${s.founder.title}. ${s.founder.bio}`)}
      ${meta('Pricing', s.price)}
      ${meta('Status', s.status)}
    </div>`;
}

export function renderPortfolio(items, currentSeed, list) {
  list.innerHTML = items.map((p) => `
    <li><a href="#${encodeURIComponent(p.seed)}"${p.seed === currentSeed ? ' class="current" aria-current="true"' : ''}>
      <span><b>${esc(p.name)}</b> <span>${esc(p.pitch)}</span></span>
      <em>${esc(money(p.valuation))}</em>
    </a></li>`).join('');
}
