/* Post factories and number animation. No DOM structure here: see feed.js. */
import { personas, slotBot, you, sharer } from './personas.js';
import { repliesFor } from './replies.js';
import { seeded, randomSeed } from '../../shared/random.js';
import { generateStartup } from '../../slot/js/generate.js';
import { money, badgeFor } from '../../slot/js/render.js';

const trim = (n) => String(n >= 100 ? Math.round(n) : Math.round(n * 10) / 10);

/* 950 → "950", 48300 → "48.3K", 2400000 → "2.4M" */
export function compact(n) {
  if (n < 1000) return String(Math.round(n));
  if (n < 1e6) return `${trim(n / 1e3)}K`;
  if (n < 1e9) return `${trim(n / 1e6)}M`;
  return `${trim(n / 1e9)}B`;
}

/* Your post. Everything is derived from its text, so a share link replays the same thread. */
export function userPost(text, { shared = false, time = 'now' } = {}) {
  const { rand, int } = seeded(`post:${text}`);
  const likes = int(8000, 95000);
  return {
    id: randomSeed(),
    author: shared ? sharer : you,
    mine: !shared,
    shared,
    text,
    time,
    likes,
    reposts: Math.round(likes * (0.08 + rand() * 0.12)),
    views: likes * int(18, 60),
    replyCount: Math.round(likes * (0.02 + rand() * 0.03)),
    replies: repliesFor(text, rand, 6),
  };
}

/* A bot post for the feed: a persona's own post, or a funding announcement from the slot machine. */
export function botPost(time = 'now') {
  const { rand, pick, int } = seeded(randomSeed());
  if (rand() < 0.25) {
    const s = generateStartup(randomSeed());
    const likes = int(500, 60000);
    return {
      id: s.seed, author: slotBot, time,
      text: `🚨 ${s.name} just raised ${money(s.raised)} (${s.round}). ${s.oneLiner} ${badgeFor(s.valuation)}`,
      link: { href: `../slot/#${s.seed}`, label: 'See the startup 🎰' },
      likes, reposts: Math.round(likes * 0.3), views: likes * int(10, 40), replyCount: int(10, 400),
      replies: repliesFor('startup raise', rand, int(1, 2)),
    };
  }
  const author = pick(personas);
  const content = pick(author.posts);
  const post = typeof content === 'string' ? { text: content } : content;
  const likes = int(3, 40000);
  return {
    id: randomSeed(), author, time, ...post,
    likes, reposts: Math.round(likes * rand() * 0.2), views: likes * int(10, 80),
    replyCount: int(2, 900), replies: repliesFor(post.text, rand, int(1, 2)),
  };
}

/* Animate an element's number from its current value to `to`. */
export function countUp(el, to, ms) {
  const from = Number(el.dataset.value || 0);
  el.dataset.value = String(to);
  if (!ms) {
    el.textContent = compact(to);
    return;
  }
  const start = performance.now();
  const done = () => el.dataset.value !== String(to); /* a newer countUp took over */
  const tick = (now) => {
    if (done()) return;
    const p = Math.min((now - start) / ms, 1);
    el.textContent = compact(from + (to - from) * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  /* Animation frames can be paused (background tabs); the final number must still land. */
  setTimeout(() => {
    if (!done()) el.textContent = compact(to);
  }, ms + 50);
}

export function timeAgo(ts) {
  const minutes = Math.floor((Date.now() - ts) / 60000);
  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes}m`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h`;
  return `${Math.floor(minutes / 1440)}d`;
}
