/* Slopr 💀 Dead Internet as a Service: compose, go viral, repeat. */
import { personas, trending } from './personas.js';
import { userPost, botPost, compact, countUp, timeAgo } from './engine.js';
import { renderPost, appendReply, setMoreReplies } from './feed.js';
import { toast } from '../../shared/toast.js';

const $ = (sel, root = document) => root.querySelector(sel);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const feed = $('#feed');
const MAX_FEED = 60;

/* ---------- Saved state (per browser, best effort) ---------- */
const STORAGE_KEY = 'slopr-state';
let state = { posts: [], followers: 0, lastVisit: 0 };
try {
  state = { ...state, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
} catch {
  /* fresh start */
}
function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, lastVisit: Date.now() }));
  } catch {
    /* private mode: your fame lasts as long as the tab */
  }
}

/* ---------- Sidebar counters ---------- */
const followersEl = $('#followers');
let notifications = 0;

function addFollowers(n) {
  state.followers += n;
  countUp(followersEl, state.followers, reducedMotion ? 0 : 600);
}

function addNotifications(n) {
  notifications += n;
  const badge = $('#notif-count');
  badge.hidden = false;
  badge.textContent = notifications > 99 ? '99+' : String(notifications);
}

countUp(followersEl, state.followers, 0);

/* ---------- Going viral ---------- */
async function goViral(post, article) {
  const num = (key) => article.querySelector(`[data-count="${key}"]`);
  const ms = reducedMotion ? 0 : 3200;
  countUp(num('likes'), post.likes, ms);
  countUp(num('reposts'), post.reposts, ms);
  countUp(num('views'), post.views, ms);
  countUp(num('replyCount'), post.replyCount, ms + 2000);
  toast('🚀 Your post is going viral among 100% of our users.');

  for (const reply of post.replies) {
    await sleep(reducedMotion ? 0 : 450 + Math.random() * 650);
    if (!article.isConnected) return;
    appendReply(article, reply);
    addNotifications(50 + Math.floor(Math.random() * 400));
    addFollowers(Math.round(post.likes / 20));
  }
  setMoreReplies(article, post.replyCount - post.replies.length);
  addFollowers(Math.round(post.likes / 4));
  save();
}

function trimFeed() {
  while (feed.children.length > MAX_FEED) feed.lastElementChild.remove();
}

/* ---------- Compose ---------- */
const form = $('#compose');
const input = $('#compose-text');
const charCount = $('#char-count');

input.addEventListener('input', () => {
  charCount.textContent = String(280 - input.value.length);
});
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) form.requestSubmit();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) {
    toast('🤖 Our agents need something to agree with. Type anything.');
    return;
  }
  input.value = '';
  charCount.textContent = '280';
  const post = userPost(text);
  state.posts = [{ text, ts: Date.now() }, ...state.posts].slice(0, 20);
  save();
  const article = renderPost(post, { fresh: true });
  feed.prepend(article);
  trimFeed();
  goViral(post, article);
});

/* ---------- Feed actions ---------- */
const actionMessages = {
  reply: '💬 Replies are for bots. You are a poster.',
  repost: '🔁 Reposted to your 0 human followers.',
  views: '📊 Views estimated by an agent who did not look.',
};

feed.addEventListener('click', async (e) => {
  const button = e.target.closest('[data-act]');
  if (!button) return;
  const article = button.closest('.post');
  const act = button.dataset.act;
  if (act === 'like') {
    if (button.classList.contains('liked')) return;
    button.classList.add('liked');
    const num = button.querySelector('.num');
    countUp(num, Number(num.dataset.value) + 1, 0);
    toast(article.classList.contains('mine')
      ? '❤️ You liked your own post. Bold.'
      : '❤️ That was the first human like this account has ever received.');
  } else if (act === 'share') {
    const text = article.querySelector('.post-text').textContent;
    const url = `${location.origin}${location.pathname}#p=${encodeURIComponent(text)}`;
    try {
      await navigator.clipboard.writeText(url);
      toast('🔗 Link copied. Whoever opens it gets the exact same bots.');
    } catch {
      toast(`🔗 ${url}`, 6000);
    }
  } else {
    toast(actionMessages[act]);
  }
});

/* ---------- The ambient feed: bots never stop posting ---------- */
const pill = $('#new-posts');
const pending = [];

setInterval(() => {
  if (document.hidden || pending.length >= 99) return;
  pending.push(botPost('now'));
  pill.hidden = false;
  pill.textContent = `Show ${pending.length} new post${pending.length === 1 ? '' : 's'}`;
}, 8000);

pill.addEventListener('click', () => {
  pending.splice(0).forEach((post) => feed.prepend(renderPost(post)));
  trimFeed();
  pill.hidden = true;
  $('#compose').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
});

const onlineEl = $('#users-online');
let online = 2412004117;
setInterval(() => {
  if (document.hidden) return;
  online += Math.floor(Math.random() * 4000);
  onlineEl.textContent = online.toLocaleString('en-US');
}, 1500);

/* ---------- Sidebars ---------- */
const sideMessages = {
  notifications: () => {
    const n = notifications;
    notifications = 0;
    $('#notif-count').hidden = true;
    return n ? `🔔 ${n.toLocaleString('en-US')} notifications. All from bots. Marked as read by a bot.` : '🔔 No notifications. The bots are typing…';
  },
  profile: () => `🧍 You: the only verified human on Slopr. ${compact(state.followers)} followers, 0 of them human.`,
  buy: () => "🛒 No need. They're free. And fake. Like everyone else's.",
};

$('#side-nav').addEventListener('click', (e) => {
  const button = e.target.closest('[data-nav]');
  if (!button) return;
  if (button.dataset.nav === 'home') {
    scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    return;
  }
  toast(sideMessages[button.dataset.nav]());
});

$('#trending').append(...trending.map((t) => {
  const row = document.createElement('div');
  row.className = 'trend';
  row.innerHTML = '<small></small><b></b><span></span>';
  row.querySelector('small').textContent = t.topic;
  row.querySelector('b').textContent = t.title;
  row.querySelector('span').textContent = t.posts;
  return row;
}));

const suggestions = [...personas].sort(() => Math.random() - 0.5).slice(0, 3);
$('#who-to-follow').append(...suggestions.map((p) => {
  const row = document.createElement('div');
  row.className = 'follow-row';
  row.innerHTML = '<span class="reply-av"></span><span class="who"><b></b><span></span></span><button class="btn btn-ghost btn-sm" type="button">Follow</button>';
  row.querySelector('.reply-av').textContent = p.avatar;
  row.querySelector('b').textContent = p.name;
  row.querySelector('.who span').textContent = p.bio;
  row.querySelector('button').addEventListener('click', (e) => {
    e.currentTarget.textContent = 'Following';
    e.currentTarget.disabled = true;
    addFollowers(40000);
    save();
    toast(`✅ You followed ${p.name}. They followed you back 40,000 times.`);
  });
  return row;
}));

/* ---------- Start ---------- */
['2m', '5m', '11m', '24m', '1h', '2h', '3h', '5h'].forEach((time) => feed.append(renderPost(botPost(time))));

[...state.posts].reverse().forEach(({ text, ts }) => feed.prepend(renderPost(userPost(text, { time: timeAgo(ts) }))));

function readSharedText() {
  if (!location.hash.startsWith('#p=')) return null;
  try {
    return decodeURIComponent(location.hash.slice(3)).slice(0, 280).trim() || null;
  } catch {
    return null;
  }
}

/* A share link replays the post with the same bots and numbers. */
function showShared() {
  const text = readSharedText();
  if (!text) return false;
  feed.querySelector('.post.shared')?.remove();
  const post = userPost(text, { shared: true, time: 'shared' });
  feed.prepend(renderPost(post));
  scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  toast(`👀 Someone shared a post with you. It already has ${compact(post.likes)} likes.`);
  return true;
}
addEventListener('hashchange', showShared);

if (showShared()) {
  /* the share link is the welcome */
} else if (state.posts.length && state.lastVisit) {
  const minutesAway = Math.max(1, Math.floor((Date.now() - state.lastVisit) / 60000));
  const likes = Math.min(minutesAway * 1300, 9.9e6);
  toast(`👋 While you were away, ${compact(likes)} accounts liked your posts. All of them bots.`, 5000);
  addFollowers(Math.round(likes / 10));
}
save();
addEventListener('pagehide', save);
