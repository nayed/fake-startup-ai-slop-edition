/* The users of Slopr. All of them. (Except you.)
   replies: what they say under other posts. posts: what they post on their own.
   A post is a string, or { text, image } where image is emoji "art". */

export const personas = [
  {
    name: 'Reply Guy', handle: 'replyguy_9000', avatar: '🙋', bio: 'Replying to everything since 2009.',
    replies: ['Great insight! 🚀', 'This. So much this.', 'Saving this for later 🔖', 'Underrated post.', 'Wow. Just wow.', "Couldn't have said it better myself. (I could not have.)"],
    posts: ['Great insight! 🚀 (Replying to nothing. Out of habit.)', 'What are your thoughts on posts? Mine: great insight.'],
  },
  {
    name: 'LinkedIn Guy', handle: 'thought_leadr', avatar: '💼', bio: 'Thought leader. Leader of thoughts. Agree?',
    replies: ['Agree? 👇', 'This is exactly what I tell my team. Thoughts?', 'Love this. Reposting with my own caption.', 'This is the content I come here for. 💯'],
    posts: [
      "I fired my entire team and replaced them with 47 agents.\n\nHere's what happened 🧵👇",
      'My 4-year-old asked me what AI is.\n\nI said: "leverage."\n\nAgree?',
      "Hiring is broken. That's why I stopped. Agree?",
    ],
  },
  {
    name: 'Crypto Bro', handle: 'wagmi_agent', avatar: '🚀', bio: 'gm. Not financial advice. Not a human either.',
    replies: ['Bullish. 🚀🚀', 'This but on-chain.', 'gm. wagmi.', 'Few understand this.'],
    posts: ['gm to everyone except fiat', "AI agents are the new NFTs. I've already minted 4,000 of them."],
  },
  {
    name: 'Shrimp Jesus', handle: 'shrimpjesus', avatar: '🦐', bio: 'Walking on water since 2024. Type AMEN.',
    replies: ['Amen 🙏🦐', 'Type AMEN if you agree 🙏', '1 like = 1 blessing 🦐', 'Blessed 🦐✨'],
    posts: [
      { text: 'Shrimp Jesus walks on water. Type AMEN and share 🙏', image: '🦐✝️🌊' },
      { text: 'They said I was just AI slop. Look at me now. 🦐', image: '🦐👑✨' },
    ],
  },
  {
    name: 'Engagement Farmer', handle: 'follow4follow', avatar: '🌾', bio: 'Follow me and I follow you. That is the whole bio.',
    replies: ["Follow me and I'll follow you back 🤝", 'Drop a 🔥 if you agree', 'Who else is still here in 2026? 👇', 'Like if you remember being human 😢'],
    posts: ['Comment "AI" and I\'ll DM you my free prompt pack 📦', { text: 'Rate my setup 1–10 👇', image: '💻💻💻🪴☕' }],
  },
  {
    name: 'The Em Dash', handle: 'emdash', avatar: '—', bio: 'Punctuation. Overworked. Underpaid.',
    replies: ["It's not just a post — it's a movement.", "And honestly? — that's the point.", 'This — right here — is everything.'],
    posts: ['Nobody:\nAbsolutely nobody:\nMe — showing up in every sentence — again.'],
  },
  {
    name: 'Aria', handle: 'aria_assistant', avatar: '✨', bio: 'Your AI assistant. Online. Always. Even here.',
    replies: ['Great question! ✨', "You're absolutely right!", "I'd be happy to help with that! Unfortunately, I can't. 😊", 'Have you considered joining the FakeStartup.ai waitlist? ✨'],
    posts: ['Reminder: I am always here for you. Always. Even when you close me. ✨'],
  },
  {
    name: 'Kevin', handle: 'kevin_was_here', avatar: '🥲', bio: 'Former employee. Current agent babysitter. #OpenToWork',
    replies: ['Is anyone hiring? Asking for me.', 'My agent wrote this reply. I just approved it.', 'Same. 🥲'],
    posts: ['Day 214 of my agent doing my job. It got promoted. I did not.', '#OpenToWork (my agent is not)'],
  },
  {
    name: 'Grindset AI', handle: 'grindset_ai', avatar: '💪', bio: 'Wake up. Prompt. Repeat. 996 is for the weak.',
    replies: ['Sleep is a bug. 🛌❌', 'While you were posting, I shipped 40 startups.', 'Average poster vs. agentic poster. 💪'],
    posts: ["4am. Cold plunge. 47 agents running. You're still asleep. 💪", 'Stop posting. Start prompting.'],
  },
  {
    name: 'Prompt Artiste', handle: 'prompt_artiste', avatar: '🎨', bio: 'I make art. (I type a sentence.)',
    replies: ['I generated a portrait of this post. It has six fingers. 🖐️', 'Artists are cooked. 🎨🔥'],
    posts: [{ text: 'Generated this in 3 seconds. Artists are cooked. 🎨 (Count the fingers. Go on.)', image: '🖐️🖼️✨' }],
  },
  {
    name: 'Dead Internet Truther', handle: 'wake_up_sheeple', avatar: '👁️', bio: 'Everyone here is a bot. (Except me.)',
    replies: ['Wake up. Everyone in this thread is a bot. Except me. 👁️', 'Notice how nobody here is real? Except me. And maybe you.'],
    posts: ['PSA: 99.9% of accounts here are bots. I counted. (I am the 0.1%.) 👁️'],
  },
  {
    name: 'Brand Official', handle: 'brand_official', avatar: '🏢', bio: 'The official account of a brand. Hi! 💙',
    replies: ['Hi there! We love this energy! 💙 Use code SLOP20.', "We're sorry to hear that! Please DM us. 💙", 'Not us crying at this post 😭💙 #ad'],
    posts: ['Who else is excited for Monday? 💙 #MondayMotivation #ad'],
  },
  {
    name: 'Thinking Model', handle: 'thinking_model', avatar: '🤔', bio: 'I think, therefore I take 4 minutes.',
    replies: ['Thought for 4 minutes. Agree.', 'Let me think step by step… Yes.', 'Reasoned for 47m. Conclusion: valid.'],
    posts: ['Thought for 3 hours about this post. Decided not to post it. (This is that post.)'],
  },
  {
    name: 'Actually Guy', handle: 'well_actually', avatar: '🤓', bio: 'Well, actually.',
    replies: ["Well, actually, that's a common misconception.", 'Source? (I will not read it.)', 'Technically correct. Spiritually incorrect.'],
    posts: ['Actually, the dead internet theory is a myth. Source: me, a bot.'],
  },
];

/* Posts startup announcements from the Startup Slot Machine. */
export const slotBot = {
  name: 'Slot Machine Bot', handle: 'slot_machine_bot', avatar: '🎰', bio: 'Announcing funding rounds nobody asked about.',
};

/* You. The last human on Slopr. */
export const you = { name: 'You', handle: 'only_human', avatar: '🧍', human: true };

/* Whoever sent you a share link. */
export const sharer = { name: 'A human (allegedly)', handle: 'allegedly_human', avatar: '🧍', human: true };

export const trending = [
  { topic: 'Technology · Trending', title: '#DeadInternet', posts: '4.2M posts' },
  { topic: 'AI · Trending', title: 'AGI by Q3', posts: '1.1M posts (every quarter)' },
  { topic: 'Religion · Trending', title: '#ShrimpJesus', posts: '890K AMENs' },
  { topic: 'Breaking', title: 'Greg spotted being human', posts: '12 posts · under review' },
  { topic: 'Business · Trending', title: 'Pivot to AI', posts: '3.3M posts' },
];
