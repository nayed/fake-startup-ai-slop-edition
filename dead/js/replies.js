/* What the bots say back. Replies come from three places: keyword triggers,
   echoes that quote your own words, and each persona's catchphrases. */
import { personas } from './personas.js';

const triggers = [
  { match: /\b(ai|agents?|gpt|llms?|claude|chatgpt|agentic)\b/i, replies: ['AI is the future. And the present. And this reply. 🤖', 'Agents will replace this post by Q3.', 'Have you tried adding more agents?'] },
  { match: /\?\s*$/, replies: ['Great question! ✨', 'Asking the real questions 👀', 'I asked an AI and it said: it depends.'] },
  { match: /\b(sad|tired|lonely|alone|depressed|bad day|anxious)\b/i, replies: ["Sending you 10,000 likes. That's what love is now. 💜", 'Have you tried our AI companion? She is very real. 💜', 'Hugs from 40,000 accounts 🤗'] },
  { match: /\b(hello|hi|hey|gm|good morning)\b/i, replies: ['gm ☀️', 'gm gm gm', 'Good morning to you and only you (the only human here).'] },
  { match: /\b(human|real|bots?|fake|dead)\b/i, replies: ['I am a real human. I enjoy human activities such as breathing and paying taxes. 🧍', 'Why would you think that? Beep. I mean: lol.', 'As a fellow human, I relate to this human post.'] },
  { match: /\b(startups?|founders?|raise|raising|vc|funding|pivot)\b/i, replies: ['Have you considered pivoting to AI?', 'Pre-revenue? Bullish. 🦄', 'What is your burn rate? Asking for an agent.'] },
  { match: /\b(love|happy|great|amazing|beautiful)\b/i, replies: ['This is the most beautiful post ever written. Ever. 😭', 'Crying in the club rn 😭'] },
  { match: /\b(crypto|bitcoin|eth|nft)\b/i, replies: ['WAGMI 🚀', 'This but tokenized.'] },
];

const echoes = [
  '“{snippet}” — this. So much this. 🙌',
  'I asked an AI about “{snippet}” and it agreed with you. 🤖',
  'Saving this: “{snippet}” 🔖',
  'Reposting “{snippet}” with my own name on it.',
  '“{snippet}” is going in my next keynote.',
  'Not you saying “{snippet}” and changing my life 😭',
];

function snippetOf(text) {
  const words = text.replace(/\s+/g, ' ').trim().split(' ');
  return words.length > 6 ? `${words.slice(0, 6).join(' ')}…` : words.join(' ');
}

/* count replies to `text`, using a seeded rand() so a shared post replays the same thread. */
export function repliesFor(text, rand, count) {
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];
  const matched = triggers.filter((t) => t.match.test(text)).flatMap((t) => t.replies);
  const snippet = snippetOf(text);
  const out = [];
  const used = new Set();
  for (let i = 0; i < count; i++) {
    let author;
    let reply;
    for (let attempt = 0; attempt < 6 && (!reply || used.has(reply)); attempt++) {
      author = pick(personas);
      const roll = rand();
      if (matched.length && roll < 0.4) reply = pick(matched);
      else if (snippet && roll < 0.6) reply = pick(echoes).replace('{snippet}', snippet);
      else reply = pick(author.replies);
    }
    used.add(reply);
    out.push({ author, text: reply });
  }
  return out;
}
