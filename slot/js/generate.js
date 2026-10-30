/* Seed in, startup out. The same seed always generates the same startup,
   which is what makes share links work. */
import * as D from './data.js';

/* FNV-1a: any string becomes a 32-bit seed, so #nayed is a valid startup too. */
function hashSeed(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/* mulberry32: tiny seeded PRNG returning floats in [0, 1). */
function mulberry32(a) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SEED_CHARS = 'abcdefghijkmnpqrstuvwxyz23456789';

export function randomSeed() {
  return Array.from(crypto.getRandomValues(new Uint8Array(6)), (b) => SEED_CHARS[b % SEED_CHARS.length]).join('');
}

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const fill = (template, vars) => template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '');

/* Every rand() call below happens in a fixed order: reordering them changes
   what existing share links generate. */
export function generateStartup(seed) {
  const rand = mulberry32(hashSeed(seed));
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];
  const pickN = (arr, n) => {
    const pool = [...arr];
    const out = [];
    while (out.length < n && pool.length) out.push(pool.splice(Math.floor(rand() * pool.length), 1)[0]);
    return out;
  };

  const roll = rand();
  let base;
  if (roll < 0.5) base = pick(D.nameRoots) + pick(D.nameSuffixes);
  else if (roll < 0.75) base = pick(D.nameWords);
  else if (roll < 0.93) base = pick(D.vowelless);
  else base = `${pick(D.nameWords)} ${pick(D.nameWords)}`;
  const style = base.includes(' ') ? '{N}' : pick(D.nameStyles);
  const name = style.replace('{N}', base).replace('{n}', base.toLowerCase());

  const big = pick(D.bigCompanies);
  const target = pick(D.targets);
  const industry = pick(D.industries);
  const audience = pick(D.audiences);
  const vars = { industry, Industry: capitalize(industry), task: pick(D.tasks), audience, big, target };
  const tagline = fill(pick(D.taglines), vars);

  const agents = pick(D.agentCounts);
  const pitch = `${name} is building ${pick(D.pitchAdjectives)} ${pick(D.categories)} for ${industry}. `
    + `Our ${agents.toLocaleString('en-US')} autonomous agents ${pick(D.tasks)}, `
    + `so ${pick(D.audiences)} can finally focus on ${pick(D.focuses)}.`;

  const raised = pick(D.raiseAmounts);
  const round = pick(D.rounds);
  const valuation = Math.round(raised * pick(D.multiples) * 10) / 10;
  const revenue = pick(D.revenues);
  const humans = 1 + Math.floor(rand() * 12);
  const features = pickN(D.features, 3);
  const quote = fill(pick(D.quotes), vars);
  const quoteBy = pick(D.quoteAuthors);
  const investors = pickN(D.investors, 3);
  const founder = { name: pick(D.founderNames), title: pick(D.founderTitles), bio: pick(D.founderBios) };
  const price = pick(D.prices);
  const jackpot = rand() < 0.04;
  const status = jackpot ? '💰 Profitable (our analysts are double-checking)' : pick(D.statuses);
  const waitlist = 1000 + Math.floor(rand() * 9000000);
  const logo = { shape: pick(D.logoShapes), colors: pickN(D.logoColors, 2) };

  return {
    seed, name, oneLiner: `It's ${big} for ${target}.`, pitchShort: `${big} for ${target}`,
    tagline, pitch, industry, raised, round, valuation, revenue, humans, agents,
    features, quote, quoteBy, investors, founder, price, status, jackpot, waitlist, logo,
  };
}
