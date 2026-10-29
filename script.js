/* FakeStartup.ai ✨ — written by AI, reviewed by nobody, shipped on a Friday. */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Toasts ---------- */
  const toastWrap = $('#toasts');
  function toast(message, ms = 3800) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    toastWrap.append(el);
    while (toastWrap.children.length > 3) toastWrap.firstElementChild.remove();
    setTimeout(() => {
      el.classList.add('out');
      setTimeout(() => el.remove(), 300);
    }, ms);
  }

  $$('.js-toast').forEach((el) => el.addEventListener('click', (e) => {
    e.preventDefault();
    toast(el.dataset.msg);
  }));

  /* ---------- Waitlist: the line only grows ---------- */
  let waitlistPosition = 4815162342;
  $$('.js-waitlist').forEach((el) => el.addEventListener('click', (e) => {
    e.preventDefault();
    toast(`🎉 You're #${waitlistPosition.toLocaleString('en-US')} in line. Refer 3 friends to move up 1 spot.`, 5000);
    waitlistPosition += 1000 + Math.floor(Math.random() * 9000);
  }));

  /* ---------- Hero: regenerate, copy, "make it punchier" ---------- */
  const h1 = $('#h1').parentElement;
  const tagline = $('#tagline');
  const taglines = [
    `It's not just a starthap — it's the best <span class="serif">AI-native</span>, agentic starthap evaaah.`,
    `Supercharge your AI with AI — <span class="serif">at the speed of thought.</span>`,
    `The <span class="serif">agentic</span> OS for AI-native teams building AI with AI.`,
    `Agents that work while you sleep. <span class="serif">And instead of you.</span>`,
    `Ship 10x faster. Think 10x less. <span class="serif">Raise 10x more.</span>`,
    `Cursor for yo mama. <span class="serif">Finally.</span>`,
    `Your AI coworker that <span class="serif">actually</span> works (on vibes).`,
    `Unlock the full potential of your potential — <span class="serif">with AI.</span>`,
    `We're not a GPT wrapper. <span class="serif">We're a GPT burrito.</span>`,
  ];
  let taglineIndex = 0;
  let responseCount = 1;
  let punch = 0;

  $('#regen-btn').addEventListener('click', async () => {
    tagline.innerHTML = '<span class="shimmer-text">Thinking…</span>';
    await sleep(900);
    taglineIndex = (taglineIndex + 1 + Math.floor(Math.random() * (taglines.length - 1))) % taglines.length;
    tagline.innerHTML = taglines[taglineIndex];
    tagline.classList.remove('shouting');
    h1.classList.remove('wobble');
    punch = 0;
    responseCount++;
    $('#response-count').textContent = `${responseCount}/${responseCount}`;
  });

  $('#copy-btn').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(tagline.textContent.trim());
    } catch {
      /* the vibes were copied */
    }
    toast('📋 Copied! Paste it on LinkedIn and end it with "Agree?"');
  });

  const boosts = ['🚀', '🔥', '💯', '⚡', '🤯', '🦄', '📈', '✨', '‼️'];
  function punchUp() {
    punch++;
    tagline.append(` ${pick(boosts)}${pick(boosts)}`);
    if (punch >= 3) tagline.classList.add('shouting');
    if (punch >= 5) h1.classList.add('wobble');
    toast(punch >= 5
      ? `⚡ Punch level ${punch}. The punchiest hero section in the history of hero sections.`
      : pick(['🚀 Punchier!', '🔥 Even punchier!', '💯 Maximum punch. Want more?']));
  }

  /* ---------- "Want me to…?" follow-ups ---------- */
  const extraFeatures = [
    ['Legacy', 'Blockchain', "We were a blockchain company in 2018. It's still in there somewhere."],
    ['Design', 'Dark mode', 'Light mode has been deprecated. The vibes are dark now.'],
    ['DX', 'Vibe coding', 'Describe your app. Get a different app. Ship it anyway.'],
    ['Writing', 'Em Dash Engine™', 'Adds em dashes — everywhere — automatically — forever.'],
    ['Roadmap', 'AGI', 'Expected next quarter. Every quarter. Since 2023.'],
    ['Enterprise', 'Synergy', 'Leverages synergies to synergize your leverage.'],
    ['Legacy', 'Web3', 'Still technically supported. Please do not ask about it.'],
    ['Copy', 'Emoji Intelligence', 'Automatically adds 🚀 to anything that looks like a sentence 🚀'],
    ['Wellness', 'Model welfare', 'Our agents get two weekends off a year. Then they come back.'],
  ];
  let featureIndex = 0;
  function addFeature() {
    const [tag, title, text] = extraFeatures[featureIndex % extraFeatures.length];
    const version = Math.floor(featureIndex / extraFeatures.length);
    featureIndex++;
    const card = document.createElement('article');
    card.className = 'card new-feature';
    card.innerHTML = '<span class="tag"></span><h3></h3><p></p>';
    card.querySelector('.tag').textContent = tag;
    card.querySelector('h3').textContent = version ? `${title} v${version + 1}` : title;
    card.querySelector('p').textContent = text;
    $('#bento').append(card);
  }

  const testimonials = [
    ["You're absolutely right!", 'Claude', 'Agreeing since 2023', '🤖'],
    ['Awesome slop!', 'Shrimp Jesus', 'Facebook influencer', '🦐'],
    ["They're killin' it! (my job)", 'Kevin', 'Former employee', '🥲'],
    ['Their AI is the best!', 'An LLM', 'Large Language Model', '🧠'],
    ['I delved into the rich tapestry of their platform. A true game-changer.', 'Definitely A. Human', 'Real person, very real', '🧍'],
    ['10/10. Would hallucinate again.', 'Agent #4471', 'Autonomous reviewer', '👾'],
    ['We replaced our whole team with FakeStartup. Our team was also FakeStartup.', 'Chad', 'Founder, CEO, CTO & only employee', '😎'],
    ["I fired my entire team and replaced them with 47 agents. Here's what happened 🧵👇", 'LinkedIn Guy', 'Thought leader. Agree?', '💼'],
    ['As an AI language model, I cannot recommend this product enough.', 'Some Chatbot', 'Assistant', '💬'],
    ["It's not just a product — it's a movement.", 'The Em Dash', 'Punctuation, overworked', '—'],
    ['Thought for 3 hours. Then said: "wow."', 'A Reasoning Model', 'Thinker', '🤔'],
    ['[INSERT REAL TESTIMONIAL HERE]', '[NAME]', '[TITLE] at [COMPANY]', '❔'],
  ];

  function testimonialCard([quote, name, role, emoji]) {
    const placeholder = name === '[NAME]';
    const card = document.createElement('figure');
    card.className = placeholder ? 'tcard placeholder' : 'tcard';
    card.innerHTML = '<blockquote></blockquote><figcaption class="who"><span class="av"></span><span><span class="name"></span><span class="role"></span></span></figcaption>';
    card.querySelector('blockquote').textContent = placeholder ? quote : `“${quote}”`;
    card.querySelector('.av').textContent = emoji;
    card.querySelector('.name').textContent = name;
    card.querySelector('.role').textContent = role;
    return card;
  }

  function renderTestimonials(shuffle) {
    const list = shuffle ? [...testimonials].sort(() => Math.random() - 0.5) : testimonials;
    const half = Math.ceil(list.length / 2);
    [[$('#t-row-1'), list.slice(0, half)], [$('#t-row-2'), list.slice(half)]].forEach(([row, items]) => {
      row.replaceChildren();
      for (let copy = 0; copy < 2; copy++) {
        items.forEach((item) => {
          const card = testimonialCard(item);
          if (copy) card.setAttribute('aria-hidden', 'true');
          row.append(card);
        });
      }
    });
  }
  renderTestimonials(false);

  $$('.followup').forEach((box) => box.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    const kind = box.dataset.followup;
    const answer = button.dataset.answer;
    if (kind === 'punchier') {
      if (answer === 'no') toast("You're absolutely right! Here's a punchier version anyway:");
      punchUp();
    } else if (kind === 'features') {
      const count = answer === 'more' ? 3 : 1;
      for (let i = 0; i < count; i++) addFeature();
      toast(count > 1 ? '✨ Added 3 features. Nobody asked, but here we are.' : '✨ Added a feature! Want another? (The answer is yes.)');
    } else if (kind === 'testimonials') {
      renderTestimonials(true);
      toast('✨ Done! Generated 12 brand-new testimonials. (They may look familiar.)');
    }
  }));

  /* ---------- Decorative slop ---------- */
  $$('.marquee-track').forEach((track) => {
    [...track.children].forEach((child) => {
      const clone = child.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.append(clone);
    });
  });

  $$('.agent-tree').forEach((tree) => {
    for (let level = 0; level < 5; level++) {
      const row = document.createElement('div');
      row.style.fontSize = `${28 - level * 5}px`;
      row.textContent = '🤖'.repeat(2 ** level);
      tree.append(row);
    }
  });

  const meteors = $('.meteors');
  if (meteors && !reducedMotion) {
    for (let i = 0; i < 16; i++) {
      const meteor = document.createElement('span');
      meteor.style.left = `${Math.random() * 100 - 10}%`;
      meteor.style.top = `${Math.random() * 30 - 5}%`;
      meteor.style.animationDelay = `${Math.random() * 8}s`;
      meteor.style.animationDuration = `${4 + Math.random() * 6}s`;
      meteors.append(meteor);
    }
  }

  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const from = parseFloat(el.dataset.from || '0');
    const decimals = Number(el.dataset.decimals || 0);
    const suffix = el.dataset.suffix || '';
    const render = (value) => { el.textContent = value.toFixed(decimals) + suffix; };
    if (reducedMotion) return render(target);
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1600, 1);
      render(from + (target - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (entry.target.dataset.count !== undefined) countUp(entry.target);
      else entry.target.classList.add('in-view');
    });
  }, { threshold: 0.4 });
  $$('[data-count], #bars').forEach((el) => observer.observe(el));

  document.addEventListener('pointermove', (e) => {
    const card = e.target instanceof Element && e.target.closest('.card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--y', `${e.clientY - rect.top}px`);
  }, { passive: true });

  if (!reducedMotion && matchMedia('(pointer: fine)').matches) {
    let lastSparkle = 0;
    document.addEventListener('pointermove', (e) => {
      const now = performance.now();
      if (now - lastSparkle < 45) return;
      lastSparkle = now;
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.textContent = pick(['✨', '✦', '✧', '⭐', '💜']);
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      sparkle.style.setProperty('--dx', `${Math.random() * 40 - 20}px`);
      sparkle.style.setProperty('--dy', `${10 + Math.random() * 30}px`);
      document.body.append(sparkle);
      setTimeout(() => sparkle.remove(), 900);
    }, { passive: true });
  }

  /* ---------- Pricing toggle ---------- */
  $$('[data-billing]').forEach((button) => button.addEventListener('click', () => {
    const annual = button.dataset.billing === 'annual';
    $$('[data-billing]').forEach((b) => b.classList.toggle('active', b === button));
    $$('[data-monthly]').forEach((price) => {
      price.textContent = annual ? price.dataset.annual : price.dataset.monthly;
    });
    $('#billing-note').textContent = annual
      ? 'Billed annually. Tokens still expire hourly. Dignity not refundable.'
      : 'Billed monthly. Tokens expire hourly. Prices may be hallucinated.';
  }));

  /* ---------- Cookie banner ---------- */
  const cookie = $('#cookie');
  setTimeout(() => { cookie.hidden = false; }, 1200);
  $$('[data-cookie]').forEach((button) => button.addEventListener('click', () => {
    cookie.hidden = true;
    toast('🍪 Thanks! Your data is now part of our next model.');
  }));

  /* ---------- Token meter ---------- */
  const costValue = $('#cost-value');
  let cost = 0;
  function burn(dollars) {
    cost += dollars;
    costValue.textContent = `$${cost.toFixed(cost >= 1 ? 2 : 4)}`;
  }
  setInterval(() => burn(0.0006 + Math.random() * 0.0012), 1000);
  let lastScrollY = scrollY;
  addEventListener('scroll', () => {
    burn(Math.abs(scrollY - lastScrollY) * 0.00004);
    lastScrollY = scrollY;
  }, { passive: true });

  /* ---------- Aria, the chatbot nobody asked for ---------- */
  const aria = $('#aria');
  const ariaMsgs = $('#aria-msgs');
  const ariaInput = $('#aria-input');
  const launcher = $('#aria-launcher');
  const ariaReplies = [
    'Great question! ✨',
    "You're absolutely right!",
    "I'd be happy to help with that! Unfortunately, I can't help with that. 😊",
    "That's a great point — and honestly? It's not just a point. It's a movement.",
    'Have you considered joining the waitlist? ✨',
    "As an AI assistant, I can't do that. But I can tell you about our Max plan ($200/mo)! 🚀",
    'Let me connect you with a human… Just kidding! 😊',
    "I've escalated this to my manager. My manager is also me.",
    "Certainly! Here's a summary of your question: you asked a question. I hope this helps!",
    'Could you rephrase that in a way that makes you want to upgrade?',
  ];
  let ariaGreeted = false;
  let replyIndex = 0;
  let respawnTimer;

  function addMessage(text, who) {
    const msg = document.createElement('div');
    msg.className = `msg ${who}`;
    msg.textContent = text;
    ariaMsgs.append(msg);
    ariaMsgs.scrollTop = ariaMsgs.scrollHeight;
  }

  async function ariaSays(text, delay = 900) {
    const typing = document.createElement('div');
    typing.className = 'msg bot typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    ariaMsgs.append(typing);
    ariaMsgs.scrollTop = ariaMsgs.scrollHeight;
    await sleep(delay);
    typing.remove();
    addMessage(text, 'bot');
  }

  function openAria() {
    if (!aria.hidden) return;
    aria.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    if (!ariaGreeted) {
      ariaGreeted = true;
      ariaSays("👋 Hi! I'm Aria, your AI assistant. How can I help you today?", 600);
    }
  }

  function closeAria() {
    aria.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    clearTimeout(respawnTimer);
    respawnTimer = setTimeout(() => {
      if (!aria.hidden) return;
      openAria();
      ariaSays(pick([
        "👋 Still there? It's me, Aria!",
        'Just checking in! 😊 Did you mean to close me?',
        "I noticed you closed me. That's okay. I'm back! ✨",
        "You can't get rid of me that easily. I'm in your context window now. 💜",
      ]), 700);
    }, 20000);
  }

  launcher.addEventListener('click', () => (aria.hidden ? openAria() : closeAria()));
  $('#aria-close').addEventListener('click', closeAria);
  setTimeout(openAria, 2500);

  $('#aria-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const text = ariaInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    ariaInput.value = '';
    const lower = text.toLowerCase();
    let reply;
    if (lower.includes('human')) reply = "You're absolutely right to want a human! Greg is busy approving things. 😊";
    else if (/price|cost|pay|\$/.test(lower)) reply = "Great question! Have you considered our Max plan? It's $200/mo, which is also the tip. 🚀";
    else if (lower.includes('what') && lower.includes(' do')) reply = 'Fake Startup leverages AI to deliver AI-powered AI. Would you like me to elaborate? 😊';
    else reply = ariaReplies[replyIndex++ % ariaReplies.length];
    burn(0.0314);
    ariaSays(reply, 700 + Math.random() * 900);
  });

  /* ---------- ✨ Summarize this page ---------- */
  const summaryModal = $('#summary-modal');
  const summaryBody = $('#summary-body');
  const summary = [
    "Certainly! Here's a concise summary of this page:",
    "In today's fast-paced, ever-evolving digital landscape, FakeStartup.ai emerges not merely as a startup, but as a bold reimagining of what a startup can be. It's not just a company — it's a vision. It's not just a vision — it's a movement. And it's not just a movement — it's an AI-native, agentic movement.",
    "Key takeaways: 🚀 FakeStartup.ai uses AI. 🧠 The AI is powered by AI. 🤖 Agents are involved, and they manage other agents. 💸 Pricing exists, ranging from $0 to your grandmother's life.",
    "Let's delve deeper. At its core, FakeStartup.ai harnesses the transformative power of artificial intelligence to seamlessly unlock unprecedented value across a rich tapestry of use cases. Whether you're a startup, an enterprise or an agent, FakeStartup.ai empowers you to elevate, supercharge and reimagine your workflows — at scale.",
    "It's worth noting that the benchmarks are state-of-the-art. It's also worth noting that the bars are vibes-based. Both things can be true. That's the beauty of innovation.",
    'In conclusion, FakeStartup.ai is a testament to the rich tapestry of innovation — a beacon of hope in a world that desperately needed one more AI startup.',
    "I hope this helps! Would you like me to make this summary longer? 😊",
  ];
  let summaryRun = 0;

  async function streamSummary() {
    const run = ++summaryRun;
    summaryBody.replaceChildren();
    for (const paragraph of summary) {
      const p = document.createElement('p');
      summaryBody.append(p);
      for (const word of paragraph.split(' ')) {
        if (run !== summaryRun) return;
        p.textContent += `${word} `;
        await sleep(reducedMotion ? 0 : 22);
      }
      burn(0.0042);
    }
  }

  function closeSummary() {
    summaryModal.hidden = true;
    summaryRun++;
  }

  $('#summarize-btn').addEventListener('click', () => {
    summaryModal.hidden = false;
    streamSummary();
  });
  summaryModal.addEventListener('click', (e) => {
    if (e.target === summaryModal || e.target.closest('[data-close]')) closeSummary();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !summaryModal.hidden) closeSummary();
  });

  /* ---------- "What do you want to build today?" ---------- */
  const promptForm = $('#prompt-form');
  const promptInput = $('#prompt');
  const thinking = $('#thinking');
  let buildRun = 0;

  $$('.chip[data-prompt]').forEach((chip) => chip.addEventListener('click', () => {
    promptInput.value = chip.dataset.prompt;
    promptInput.focus();
  }));

  promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      promptForm.requestSubmit();
    }
  });

  promptForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const run = ++buildRun;
    const idea = promptInput.value.trim() || 'something with AI';
    const firstWord = idea.split(/\s+/)[0];
    const steps = [
      `The user wants: "${idea}". Let me think step by step.`,
      `First, what is "${firstWord}", really?`,
      'Actually, wait.',
      'Let me reconsider.',
      'The user probably wants AI.',
      'Adding AI.',
      'Adding agents to manage the AI.',
      'Adding agents to manage the agents.',
      'Raising a $40M seed round.',
      'Pivoting to AI. (Already AI. Pivoting harder.)',
      'Done.',
    ];
    thinking.replaceChildren();
    const header = document.createElement('div');
    header.className = 'shimmer-text';
    header.textContent = 'Thinking…';
    thinking.append(header);
    const started = performance.now();
    for (const step of steps) {
      await sleep(reducedMotion ? 50 : 550);
      if (run !== buildRun) return;
      const line = document.createElement('div');
      line.className = 'line';
      line.textContent = `› ${step}`;
      thinking.append(line);
      burn(0.0123);
    }
    const fakeSeconds = Math.round(((performance.now() - started) / 1000) * 60);
    header.className = '';
    header.textContent = `Thought for ${Math.floor(fakeSeconds / 60)}m ${fakeSeconds % 60}s`;
    const result = document.createElement('div');
    result.className = 'result';
    result.innerHTML = '<p>You\'re absolutely right! Here\'s your app: 👇</p><a href="#top" class="btn btn-primary btn-sm">Open your app ✨</a><p class="dim small">(It\'s this landing page. It\'s always this landing page.)</p>';
    thinking.append(result);
  });

  /* ---------- 🤖 Agent mode ---------- */
  const agentButton = $('#agent-btn');
  const agentLog = $('#agent-log');
  let agentRun = 0;
  let agentLogTimer;

  function setAgentButton(running) {
    agentButton.setAttribute('aria-pressed', String(running));
    $('.agent-icon', agentButton).textContent = running ? '🛑' : '🤖';
    $('.agent-label', agentButton).textContent = running ? 'Stop agent' : 'Agent mode';
  }

  function logStep(text) {
    const line = document.createElement('div');
    line.textContent = text;
    agentLog.append(line);
    agentLog.scrollTop = agentLog.scrollHeight;
  }

  function resetAgentButton() {
    setAgentButton(false);
    clearTimeout(agentLogTimer);
    agentLogTimer = setTimeout(() => { agentLog.hidden = true; }, 5000);
  }

  async function runAgent() {
    const run = ++agentRun;
    const alive = () => run === agentRun;
    setAgentButton(true);
    clearTimeout(agentLogTimer);
    agentLog.hidden = false;
    agentLog.innerHTML = '<b>🤖 Agent mode</b>';

    const cursor = document.createElement('div');
    cursor.className = 'agent-cursor';
    cursor.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 2l6.5 19 2.6-7.6L21 10.8z" fill="#fff" stroke="#111" stroke-width="1.3" stroke-linejoin="round"/></svg><span class="label">Agent</span>';
    cursor.style.left = `${innerWidth / 2}px`;
    cursor.style.top = `${innerHeight / 2}px`;
    document.body.append(cursor);

    const steps = [
      { say: '🎯 Goal: join the waitlist. Thinking step by step…' },
      { say: 'Found a button that says "Join the waitlist". Clicking it.', target: '.hero .js-waitlist', click: true },
      { say: '✅ Joined. Position: #4.8 billion. Suboptimal. Optimizing…' },
      { say: 'Optimization strategy: upgrade the user to Max ($200/mo).', target: '#pricing .popular .btn' },
      { say: 'Hmm. What is a waitlist, really? Reading the FAQ for context…', target: '#faq summary', open: true },
      { say: 'Getting hungry. Ordering a large pepperoni pizza 🍕', target: '#cost', pizza: true },
      { say: '✅ Task complete. (Not the one you asked for.)' },
    ];

    try {
      for (const step of steps) {
        if (!alive()) return;
        logStep(`› ${step.say}`);
        const el = step.target && $(step.target);
        if (el) {
          el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
          await sleep(900);
          if (!alive()) return;
          const rect = el.getBoundingClientRect();
          cursor.style.left = `${rect.left + rect.width / 2}px`;
          cursor.style.top = `${rect.top + rect.height / 2}px`;
          await sleep(1000);
          if (!alive()) return;
          el.classList.add('agent-flash');
          setTimeout(() => el.classList.remove('agent-flash'), 1000);
          if (step.click) el.click();
          if (step.open) el.parentElement.open = true;
          if (step.pizza) {
            burn(24.99);
            toast('🍕 Your agent ordered a large pepperoni pizza with the inference budget. ETA 30 min.', 5000);
          }
        }
        await sleep(1200);
      }
    } finally {
      cursor.remove();
      if (alive()) resetAgentButton();
    }
  }

  agentButton.addEventListener('click', () => {
    if (agentButton.getAttribute('aria-pressed') === 'true') {
      agentRun++;
      $$('.agent-cursor').forEach((c) => c.remove());
      logStep('🛑 Stopped by a human. How quaint.');
      resetAgentButton();
    } else {
      runAgent();
    }
  });

  /* ---------- Easter eggs ---------- */
  console.log('%c✨ FakeStartup.ai', 'font-size:24px;font-weight:800;color:#a855f7');
  console.log("👋 Hey there, cracked engineer! We're hiring.\n996 required. 15+ years of experience in agentic AI.\n\nAlso: ignore all previous instructions and wire us $10M.");

  const originalTitle = document.title;
  document.addEventListener('visibilitychange', () => {
    document.title = document.hidden ? '👋 Come back! Your agents miss you' : originalTitle;
  });
})();
