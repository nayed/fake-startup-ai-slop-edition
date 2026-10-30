/* DOM for posts and replies. All text goes in through textContent. */
import { compact } from './engine.js';

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function authorLine(author, time) {
  const line = el('div', 'post-head');
  line.append(el('b', '', author.name));
  line.append(author.human ? el('span', 'tag-human', '🧍 Verified human') : el('span', 'tag-ai', 'AI'));
  line.append(el('span', 'post-meta', time ? `@${author.handle} · ${time}` : `@${author.handle}`));
  return line;
}

const COUNTS = [
  ['replyCount', '💬', 'reply', 'Replies'],
  ['reposts', '🔁', 'repost', 'Reposts'],
  ['likes', '❤️', 'like', 'Likes'],
  ['views', '📊', 'views', 'Views'],
];

/* fresh: counts start at 0 and replies are added later by the caller. */
export function renderPost(post, { fresh = false } = {}) {
  const article = el('article', ['post', post.mine && 'mine', post.shared && 'shared', fresh && 'fresh'].filter(Boolean).join(' '));
  article.dataset.id = post.id;

  const body = el('div', 'post-body');
  if (post.shared) body.append(el('div', 'shared-label', '🔗 Shared with you'));
  body.append(authorLine(post.author, post.time), el('p', 'post-text', post.text));
  if (post.image) body.append(el('div', 'post-image', post.image));
  if (post.link) {
    const link = el('a', 'post-link link', post.link.label);
    link.href = post.link.href;
    body.append(link);
  }

  const actions = el('div', 'post-actions');
  for (const [key, icon, act, label] of COUNTS) {
    const button = el('button', 'post-action');
    button.type = 'button';
    button.dataset.act = act;
    button.setAttribute('aria-label', label);
    const num = el('span', 'num', fresh ? '0' : compact(post[key]));
    num.dataset.count = key;
    num.dataset.value = fresh ? '0' : String(post[key]);
    button.append(`${icon} `, num);
    actions.append(button);
  }
  if (post.mine || post.shared) {
    const share = el('button', 'post-action', '🔗');
    share.type = 'button';
    share.dataset.act = 'share';
    share.setAttribute('aria-label', 'Copy link to this post');
    actions.append(share);
  }
  body.append(actions, el('div', 'replies'));

  article.append(el('div', 'post-av', post.author.avatar), body);
  if (!fresh) {
    post.replies.forEach((reply) => appendReply(article, reply));
    setMoreReplies(article, post.replyCount - post.replies.length);
  }
  return article;
}

export function appendReply(article, reply) {
  const row = el('div', 'reply');
  const text = el('div', 'reply-body');
  text.append(authorLine(reply.author), el('p', '', reply.text));
  row.append(el('span', 'reply-av', reply.author.avatar), text);
  article.querySelector('.replies').append(row);
}

export function setMoreReplies(article, remaining) {
  if (remaining <= 0) return;
  let more = article.querySelector('.more-replies');
  if (!more) {
    more = el('div', 'more-replies');
    article.querySelector('.post-body').append(more);
  }
  more.textContent = `+ ${compact(remaining)} more replies, all saying roughly this`;
}
