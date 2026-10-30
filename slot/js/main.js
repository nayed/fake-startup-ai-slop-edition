/* Startup Slot Machine 🎰: lever, reels, share links, portfolio. */
import { generateStartup, randomSeed } from './generate.js';
import { money, renderStartup, renderPortfolio } from './render.js';
import { toast } from '../../shared/toast.js';

const $ = (sel, root = document) => root.querySelector(sel);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollBehavior = reducedMotion ? 'auto' : 'smooth';

const machine = $('.machine');
const lever = $('#lever');
const result = $('#result');
const card = $('#startup');
const reels = { name: $('#reel-name'), pitch: $('#reel-pitch'), raise: $('#reel-raise') };
let current = null;
let spinning = false;

/* ---------- Portfolio (per-browser, best effort) ---------- */
const STORAGE_KEY = 'fakestartup-slot-portfolio';
let portfolio = [];
try {
  portfolio = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
} catch {
  portfolio = [];
}
function savePortfolio() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
  } catch {
    /* private mode: the portfolio lives as long as the tab, like most startups */
  }
}

function addToPortfolio(s) {
  const entry = { seed: s.seed, name: s.name, pitch: s.pitchShort, valuation: s.valuation, raised: s.raised };
  portfolio = [entry, ...portfolio.filter((p) => p.seed !== s.seed)].slice(0, 12);
  savePortfolio();
}

function showPortfolio() {
  $('#portfolio').hidden = portfolio.length === 0;
  if (!portfolio.length) return;
  const valuation = portfolio.reduce((sum, p) => sum + p.valuation, 0);
  const raised = portfolio.reduce((sum, p) => sum + p.raised, 0);
  const count = `${portfolio.length} startup${portfolio.length === 1 ? '' : 's'}`;
  $('#portfolio-summary').textContent = `${count} · ${money(valuation)} combined valuation · ${money(raised)} raised · $0 combined revenue`;
  renderPortfolio(portfolio, current?.seed, $('#portfolio-list'));
}

/* ---------- Reels ---------- */
const reelValues = (s) => ({ name: s.name, pitch: s.pitchShort, raise: `${money(s.raised)} ${s.round}` });

function setReels(values) {
  for (const key of Object.keys(reels)) reels[key].textContent = values[key];
}

async function spin(final) {
  const decoys = Array.from({ length: 24 }, () => reelValues(generateStartup(randomSeed())));
  const keys = Object.keys(reels);
  keys.forEach((key) => {
    reels[key].parentElement.classList.remove('landed');
    reels[key].parentElement.classList.add('spinning');
  });
  let tick = 0;
  const timer = setInterval(() => {
    keys.forEach((key, i) => {
      if (reels[key].parentElement.classList.contains('spinning')) {
        reels[key].textContent = decoys[(tick + i * 7) % decoys.length][key];
      }
    });
    tick++;
  }, 70);
  for (const [i, key] of keys.entries()) {
    await sleep(i === 0 ? 900 : 450);
    const reel = reels[key].parentElement;
    reel.classList.remove('spinning');
    reels[key].textContent = final[key];
    reel.classList.add('landed');
  }
  clearInterval(timer);
}

/* ---------- Showing a startup ---------- */
function show(startup) {
  current = startup;
  renderStartup(startup, card);
  result.hidden = false;
  $('#seed-label').textContent = `Seed #${startup.seed}`;
  document.title = `${startup.name}: ${startup.oneLiner} 🎰`;
  showPortfolio();
}

async function pull() {
  if (spinning) return;
  spinning = true;
  try {
    const box = machine.getBoundingClientRect();
    if (box.bottom < 0 || box.top > innerHeight) {
      machine.scrollIntoView({ behavior: scrollBehavior, block: 'center' });
      await sleep(reducedMotion ? 0 : 500);
    }
    lever.classList.add('pulled');
    setTimeout(() => lever.classList.remove('pulled'), 450);

    const startup = generateStartup(randomSeed());
    if (reducedMotion) setReels(reelValues(startup));
    else await spin(reelValues(startup));

    addToPortfolio(startup);
    show(startup);
    location.hash = startup.seed;
    if (startup.jackpot) {
      machine.classList.add('jackpot');
      setTimeout(() => machine.classList.remove('jackpot'), 2000);
      toast('🎰 JACKPOT! A profitable AI startup! …Our analysts are double-checking.', 5000);
    }
    await sleep(reducedMotion ? 0 : 350);
    result.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
  } finally {
    spinning = false;
  }
}

function readSeed() {
  try {
    return decodeURIComponent(location.hash.slice(1)).trim().slice(0, 64) || null;
  } catch {
    return null;
  }
}

/* Back/forward, portfolio links and hand-edited URLs (#nayed works too). */
addEventListener('hashchange', () => {
  const seed = readSeed();
  if (!seed || seed === current?.seed) return;
  const startup = generateStartup(seed);
  setReels(reelValues(startup));
  show(startup);
  result.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
});

/* ---------- Controls ---------- */
$('#pull-btn').addEventListener('click', pull);
$('#pull-again').addEventListener('click', pull);
lever.addEventListener('click', pull);
document.addEventListener('keydown', (e) => {
  if (e.code !== 'Space' || e.repeat || e.target.closest('button, a, input, textarea, select')) return;
  e.preventDefault();
  pull();
});

$('#copy-link').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    toast('🔗 Link copied. Send it to an investor.');
  } catch {
    toast(`🔗 ${location.href}`, 6000);
  }
});

const shareButton = $('#share-btn');
if (navigator.share) {
  shareButton.hidden = false;
  shareButton.addEventListener('click', () => {
    if (!current) return;
    navigator.share({
      title: current.name,
      text: `I just generated ${current.name}. ${current.oneLiner} Already raised ${money(current.raised)}.`,
      url: location.href,
    }).catch(() => {});
  });
}

card.addEventListener('click', (e) => {
  const button = e.target.closest('[data-act]');
  if (!button || !current) return;
  const messages = {
    waitlist: `🎉 You're #${current.waitlist.toLocaleString('en-US')} on the ${current.name} waitlist.`,
    invest: `💸 You invested in ${current.name}. It pivoted 4 minutes later.`,
    demo: `📅 ${current.name}'s sales agent booked 9 demos with you. Attendance is mandatory.`,
  };
  toast(messages[button.dataset.act]);
});

$('#clear-portfolio').addEventListener('click', () => {
  portfolio = [];
  savePortfolio();
  showPortfolio();
  toast('📉 Portfolio written off. Your LPs have been notified.');
});

document.addEventListener('pointermove', (e) => {
  const target = e.target instanceof Element && e.target.closest('.card');
  if (!target) return;
  const rect = target.getBoundingClientRect();
  target.style.setProperty('--x', `${e.clientX - rect.left}px`);
  target.style.setProperty('--y', `${e.clientY - rect.top}px`);
}, { passive: true });

/* ---------- Start ---------- */
const sharedSeed = readSeed();
if (sharedSeed) {
  const startup = generateStartup(sharedSeed);
  setReels(reelValues(startup));
  show(startup);
  toast('👀 Someone sent you a startup. Due diligence: skipped.');
} else {
  showPortfolio();
}
