/* Word banks for the Startup Slot Machine 🎰
   The joke scales with these lists: add entries freely.
   Changing the order or removing entries changes what old share links generate. */

export const nameRoots = [
  'Nex', 'Syn', 'Cog', 'Lum', 'Vec', 'Agen', 'Neur', 'Quant', 'Hyper', 'Omni',
  'Flux', 'Astr', 'Zeph', 'Aur', 'Nov', 'Lyr', 'Cort', 'Synth', 'Tens', 'Lat',
  'Infer', 'Vibe', 'Delv', 'Prompt', 'Tok', 'Mind', 'Kai', 'Sol', 'Orb', 'Hallu',
];

export const nameSuffixes = [
  'ora', 'ify', 'ly', 'ix', 'io', 'os', 'ia', 'ex', 'eon', 'ient', 'stack',
  'flow', 'mind', 'base', 'verse', 'pilot', 'forge', 'loop', 'wise', 'era', 'yx', 'ence',
];

export const nameWords = [
  'Delve', 'Cognition', 'Latent', 'Vector', 'Sapient', 'Tapestry', 'Paradigm', 'Emergent',
  'Liminal', 'Lucid', 'Context', 'Gradient', 'Synapse', 'Inference', 'Tensor', 'Prism',
  'Nimbus', 'Halo', 'Echo', 'Nexus', 'Vertex', 'Quantum', 'Singularity', 'Epoch',
];

export const vowelless = [
  'Thinkr', 'Prmpt', 'Agntly', 'Shippr', 'Scalr', 'Vybe', 'Pivtr', 'Dreamr',
  'Tokn', 'Bldr', 'Hustlr', 'Cntxt', 'Dlvr', 'Infrr', 'Vbecode',
];

/* {N} = Name, {n} = name */
export const nameStyles = [
  '{N}', '{N}.ai', '{N}.ai', '{N} AI', '{n}', '{n}.', '{N} Labs',
  '{N}.io', 'Get{N}', 'Try{N}', '{N}HQ', '{n}.so', '{N}.dev', '{N}.xyz',
];

export const bigCompanies = [
  'Cursor', 'Uber', 'Tinder', 'Figma', 'Stripe', 'Notion', 'Duolingo', 'Airbnb', 'Spotify',
  'Slack', 'Netflix', 'Shopify', 'LinkedIn', 'Strava', 'ChatGPT', 'Claude Code', 'Lovable', 'Perplexity',
];

export const targets = [
  'plumbers', 'dentists', 'your cat', 'yo mama', 'other AI agents', 'people who hate AI',
  'landlords', 'your inner child', 'goats', 'middle managers', 'LinkedIn influencers',
  'divorce lawyers', 'kombucha brewers', 'funeral homes', 'horoscopes', 'your ex',
  'dog walkers', 'astrologers', 'medieval peasants', 'procrastination', "your grandma's recipes",
  'meetings about meetings', 'breathing', 'naps', 'fantasy football', 'parking tickets',
  'wedding speeches', 'breakup texts', 'toddlers', 'houseplants', 'the DMV', 'pickleball',
  'cold emails', 'other startups', 'VCs',
];

export const industries = [
  'dental insurance', 'B2B invoicing', 'dog walking', 'real estate', 'HR compliance',
  'accounting', 'legal discovery', 'plumbing', 'wedding planning', 'funeral planning',
  'restaurant reservations', 'sales prospecting', 'customer support', 'recruiting',
  'procurement', 'tax prep', 'veterinary care', 'pickleball', 'meal prep', 'dating',
  'parking', 'insurance claims', 'home inspection', 'yoga', 'kombucha', 'astrology',
  'lawn care', 'podcasting', 'cold email', 'spreadsheets',
];

export const tasks = [
  'file your taxes', 'reply to your emails', 'attend your meetings', 'date for you',
  'argue with your landlord', 'write your LinkedIn posts', 'call your mom', 'do your job',
  'apply to 4,000 jobs', 'negotiate with other agents', 'order pizza', 'hallucinate invoices',
  'schedule meetings with other agents', 'rewrite your emails to sound like a TED talk',
  'water your houseplants (badly)', 'pivot the company',
];

/* {industry}, {Industry}, {task}, {audience} */
export const taglines = [
  'The agentic OS for {industry}.',
  '{Industry}, but agentic.',
  '{Industry} is broken. We fixed it with a chatbot.',
  'Agents that {task} while you sleep.',
  'Reimagining {industry} from first principles. With AI.',
  'Supercharge {industry} with autonomous agents.',
  "We put an LLM in {industry}. You're welcome.",
  "The last {industry} tool you'll ever need. Until our next pivot.",
  'Stop hiring humans. Start deploying agents for {industry}.',
  'AI-native {industry} for AI-native {audience}.',
  'Ship {industry} at the speed of thought.',
  "It's not just {industry} — it's a movement.",
];

export const audiences = [
  'founders', 'enterprises', 'Gen Z', 'dentists', 'other startups', 'agents', 'your mom',
  'middle managers', 'VCs', 'solopreneurs', 'Fortune 500 interns',
];

export const focuses = [
  'what matters', 'vibes', 'fundraising', 'their podcast', 'raising the next round',
  'touching grass', 'absolutely nothing', 'posting on LinkedIn', 'the next pivot', 'their personal brand',
];

export const pitchAdjectives = [
  'the agentic', 'the AI-native', 'the first reasoning', 'a fully autonomous',
  "the world's first vibe-coded", 'an MCP-native', 'a post-AGI', 'a self-healing', 'a multi-agent',
];

export const categories = [
  'operating system', 'copilot', 'infrastructure layer', 'agent swarm', 'super-app',
  'workspace', 'platform', 'orchestration layer', 'context engine', 'data moat',
];

export const rounds = [
  'Pre-seed', 'Seed', 'Seed+', 'Seed++', 'Series A', 'Series B', 'Series ✨',
  'Bridge round', 'Party round', 'Pre-Series A extension', 'Vibe round',
];

/* In millions of dollars */
export const raiseAmounts = [2, 4, 6.9, 12, 20, 42, 69, 100, 250, 420, 1000];
export const multiples = [8, 10, 15, 25, 40, 69, 100, 250];

/* [headline, footnote] */
export const revenues = [
  ['pre', 'pre-revenue, post-hype'],
  ['$0', 'but the vibes are immaculate'],
  ['$12', "one customer (it's the founder's mom)"],
  ['$100M ARR', 'annualized from our best 7 minutes'],
  ['$1M ARR', "one customer (it's our investor)"],
  ['$4.20', 'from a tip jar'],
  ['N/A', 'our agent ate the spreadsheet'],
  ['-$3M', 'negative, but agentic'],
];

export const agentCounts = [47, 404, 1337, 4096, 40000, 1000000];

/* [title, description] */
export const features = [
  ['Autonomous agents', 'They do the work. Nobody checks the work.'],
  ['Reasoning mode', 'Thinks for 40 minutes, answers in one word.'],
  ['Infinite memory', 'Remembers everything except your name.'],
  ['MCP-native', 'Connects to every tool. Uses none of them correctly.'],
  ['One-click deploy', 'Second click sold separately.'],
  ['Human-in-the-loop', 'Optional. Deprecated in v2.'],
  ['Vibe analytics', "Charts go up. We don't ask why."],
  ['Enterprise-grade', 'We added SSO and tripled the price.'],
  ['Multi-agent swarm', '47 agents, 1 meeting, 0 decisions.'],
  ['Zero hallucinations*', '*that we know of.'],
  ['Self-improving', 'Rewrites its own roadmap every Tuesday.'],
  ['Voice mode', 'Talks back. Interrupts, too.'],
  ['Privacy-first', 'Your data never leaves our training set.'],
  ['Real-time', 'Latency measured in vibes.'],
  ['Open source*', '*the README is.'],
  ['Emoji intelligence', 'Adds 🚀 to everything. Automatically.'],
];

/* {industry}, {big}, {target} */
export const quotes = [
  'This changed everything.',
  'Game-changer. It literally changed my game.',
  'I fired my whole team. No regrets. (They have some.)',
  "It 10x'd my 10x.",
  "My agents love it. I haven't asked them.",
  'Finally, AI for {industry}.',
  "I didn't understand it, so I invested.",
  "It's {big} for {target}. I didn't know I needed that. I still don't.",
  'I delved. I truly delved.',
  "You're absolutely right!",
];

export const quoteAuthors = [
  'Agent #4471, autonomous reviewer', 'A VC who invested', "The founder's mom",
  'Definitely a real customer', 'An LLM', 'LinkedIn Guy, thought leader',
  'Shrimp Jesus, Facebook influencer', 'Kevin, former employee', 'Greg, the last human',
];

export const investors = [
  'Greater Fool Partners', 'FOMO Capital', 'Hype Ventures', 'Exit Liquidity LP', 'Vibe Capital',
  'Dumb Money Partners', 'Pre-Revenue Partners', 'A guy from a podcast', "The founder's dad",
  '3 angels and a demon', 'A mystery whale', 'Moonshot Moonshot', 'Burn Rate Capital', 'Kevin (the other one)',
];

export const founderNames = [
  'Chad', 'Brad', 'Tyler', 'Kai', 'Aiden', 'Skyler', 'Jaxon', 'Bryce',
  'Max', 'Priya', 'Zoe', 'Ava', 'Sam', 'Alex', 'Jordan',
];

export const founderTitles = [
  'CEO', 'CEO & Chief Vibes Officer', 'Founder, CEO, CTO & only employee',
  'Chief Agent Officer', 'Founder & Prompt Engineer', 'CEO (Chief Executive Orchestrator)',
];

export const founderBios = [
  'Dropped out of Stanford to drop out of Harvard.', 'Ex-FAANG (summer intern).',
  'Thiel Fellow (applied).', 'Built a GPT wrapper in high school.',
  'Former crypto founder (2021–2022).', 'Has a podcast.', 'Runs a newsletter about AI newsletters.',
  "Ex-consultant, now 'building'.", '19 years old, 20 years of AI experience.',
  'Founded 7 startups. Exited 0.',
];

export const prices = [
  '$20/month', '$200/month', '$2,000/month', '$0.0003 per thought',
  '$49 per agent, per seat, per month', "Free until it isn't", 'Contact sales (an agent)',
  '1 credit per vibe', '$99/month + tips', 'Pay what your agent wants',
];

export const statuses = [
  '🛠️ Pre-product', '🔄 Pivoting', '🔄🔄 Pivoting again', '🤝 Acqui-hired (just the logo)',
  '🕶️ Stealth (but tweeting about it)', '📈 Default alive (vibes-wise)', '💸 Raising',
  '🔥 Burning $4M/month', '🚪 Exited to a bigger AI company', '🧪 In beta since 2024',
];

export const logoShapes = ['sparkle', 'sparkle', 'flower', 'orb'];

export const logoColors = [
  '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
  '#22d3ee', '#3b82f6', '#f97316', '#10b981', '#facc15',
];
