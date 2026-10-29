import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_MAIN_URL ||
  "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// Editorial Broadsheet Articles: Rich, Diverse, Thoughtful Essays (Including Bangla and Global Perspectives)
export const EDITORIAL_ARTICLES = [
  {
    _id: "essay-01",
    kicker: "ARCHITECTURAL ESSAY • VOL. 28",
    title: "On the Quiet Beauty of Deterministic Systems",
    sdesc: "Why modern software architecture is abandoning stochastic sprawl in search of quiet, mathematically provable simplicity.",
    ldesc: `There is a profound, almost meditative stillness in code that does exactly one thing, without side effects, across ten thousand iterations. Over the last decade, we surrendered to the temptation of endless asynchronous indirection: microservices that talked past one another, event buses drowned in telemetry noise, and architectures that required dozens of engineers merely to explain the data lifecycle.

### The Return to the Plain Ledger
When we study ancient ledger systems, from Mediterranean clay tablets to 14th-century Venetian bookkeeping, their enduring virtue was not computational velocity. It was legibility. Anyone could inspect the balance sheet and immediately discern the ground truth.

In our pursuit of distributed consensus, we often lost this legibility. In 2026, the quietest engineering breakthroughs are not more complex neural inference pipelines, but deterministic state machines: SQLite at the edge, immutability by default, and systems that can be reasoned through on a single sheet of paper.

\`\`\`javascript
// Minimalist deterministic state transition
const applyTransition = (state, event) => {
  switch (event.type) {
    case 'APPEND_DISPATCH':
      return {
        ...state,
        sequence: state.sequence + 1,
        ledger: [...state.ledger, { ...event.payload, at: event.timestamp }]
      };
    default:
      return state;
  }
};
\`\`\`

### Cultivating the Wabi-Sabi of Engineering
In traditional Japanese woodwork (Sashimono), master craftsmen join cedar and cypress planks without a single metallic nail or synthetic adhesive. The strength arises from the precision of the cut and the natural friction of the wood itself.

When we write software with that same reverence—honoring constraints rather than fighting them—the resulting applications require zero background daemons to keep alive. They sit quietly, consume fractions of a watt, and serve millions of readers with tranquil dignity.`,
    category: "Architecture",
    edition: "Autumn 2026",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-28T08:00:00Z",
    author: {
      name: "Rifat Sarker",
      location: "Dhaka Bureau",
      role: "Lead Editor",
    },
    readTime: "7 min read",
    words: 860,
  },
  {
    _id: "essay-02",
    kicker: "LITERARY INQUIRY",
    title: "The Architecture of Uninterrupted Reading",
    sdesc: "How notification-driven interfaces fractured human cognition, and the urgent necessity of white-space sanctuaries.",
    ldesc: `To read deeply is an act of quiet contemplation. Yet modern digital surfaces have spent two decades systematically dismantling the conditions under which deep reading is possible. Banners flash, popups demand subscription confirmation, sticky navigation elements consume a third of the viewport, and algorithmic tickers clamor for reflexive indignation.

### The Newspaper as an Instrument of Calm
Consider the broadsheet newspaper. When opened upon a morning table, it makes no sound. It does not vibrate. Its typography exists at fixed physical ratios honed over four centuries of typographic refinement. The eye moves across columns with natural rhythmic pacing.

When designing MixHub Dispatch, we returned to this ancestral rhythm. White space is not empty void; it is the breathable canvas that allows an argument to form in the reader's consciousness.`,
    category: "Philosophy",
    edition: "Issue 14",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-25T11:30:00Z",
    author: {
      name: "Kazi Nazrul",
      location: "Chittagong",
      role: "Contributing Essayist",
    },
    readTime: "5 min read",
    words: 640,
  },
  {
    _id: "essay-03",
    kicker: "বাংলা স্থাপত্য ও নদীমাতৃক ঐতিহ্য",
    title: "স্মৃতি ও স্থপতি: ঢাকা শহরের বিলুপ্ত জলপথের পুনর্নির্মাণ",
    sdesc: "একটি নদীর ওপর দাঁড়িয়ে গড়ে ওঠা প্রাচীন শহরের হারিয়ে যাওয়া খাল ও প্রাকৃতিক ড্রেনেজ ব্যবস্থার স্থাপত্যিক পুনর্মূল্যায়ন।",
    ldesc: `ঢাকা মূলত কোনো শুষ্ক সমভূমির শহর ছিল না; এটি ছিল এক জলজ শহর, বুড়িগঙ্গা ও শীতলক্ষ্যার সহোদরা। চারশত বছর পূর্বে সুবেদার ইসলাম খানের আমলে ধোলাই খাল যখন খনন করা হয়েছিল, তা কেবল প্রতিরক্ষাই নিশ্চিত করেনি, বরং সমগ্র শহরের ভেতরে পণ্যের চলাচল ও পানির স্বাভাবিক প্রবাহকে সচল রেখেছিল।

### ইট-কংক্রিটের ফাঁদে জলপথ
বিগত অর্ধশতাব্দীতে অপরিকল্পিত নগরায়নের নির্মম আঘাতে ঢাকার অধিকাংশ খাল ও প্রাকৃতিক জলাধার ভরাট হয়ে গেছে। কিন্তু পানি তার গতিপথ কখনো ভোলে না। প্রতি বর্ষায় যখন রাজপথ ডুবে যায়, প্রকৃতি আসলে তার হারানো খালের অধিকারই দাবি করে।

\`\`\`markdown
ঐতিহাসিক জরিপ ও আধুনিক স্যাটেলাইট ম্যাপিং:
১. ধোলাই খাল — আদি সংযোগ: বুড়িগঙ্গা থেকে বালু নদী
২. বেগুনবাড়ি খাল — বর্তমান হাতিরঝিল ওয়াটারশেড
৩. কল্যাণপুর খাল — পশ্চিম ঢাকার প্রধান নিষ্কাশন চ্যানেল
\`\`\`

### আগামী দিনের স্থাপত্য ভাবনা
২০২৬ সালে এসে টেকসই নগরায়নের প্রধান শর্ত হয়ে দাঁড়িয়েছে জলবায়ু-সহনশীল অবকাঠামো। শহরের ড্রেনগুলোকে বক্স কালভার্টে ঢেকে ফেলার ব্যর্থ নীতি ত্যাগ করে ইউরোপ ও এশিয়ার বহু শহর এখন কৃত্রিম খাল খুলে দিচ্ছে। ঢাকাকেও তার হারানো নদীমাতৃক সত্তায় ফিরিয়ে নিয়ে যাওয়াই হতে পারে আধুনিক নগর পরিকল্পনার সর্বশ্রেষ্ঠ বিজয়।`,
    category: "Architecture",
    edition: "Issue 14",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-24T09:00:00Z",
    author: {
      name: "ড. সাজেদ রহমান",
      location: "ঢাকা",
      role: "নগর পরিকল্পনাবিদ",
    },
    readTime: "6 min read",
    words: 780,
  },
  {
    _id: "essay-04",
    kicker: "DISPATCH • THE EDGE RUNTIME",
    title: "Building Without Batteries: The Zero-Dependency Doctrine",
    sdesc: "Examining the environmental and operational sanity of trimming hundreds of megabytes of nested node modules.",
    ldesc: `A standard modern web project frequently begins with fifty thousand files installed before a single line of application logic is written. We have accepted supply chain fragility as the inevitable price of modern convenience.

### The Plain Text Rebellion
What happens when we strip away the synthetic scaffolding? Modern browsers now natively support ESM, CSS Grid, container queries, and sub-second fetch APIs without a single bundler transform.

When you ship plain, handcrafted code, load times drop to single-digit milliseconds. Energy consumption at edge data centers diminishes. Most importantly, the software retains its integrity for decades without breaking under phantom deprecation cycles.`,
    category: "Engineering",
    edition: "Issue 14",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-22T14:15:00Z",
    author: {
      name: "Tariq Mansoor",
      location: "London",
      role: "Systems Architect",
    },
    readTime: "6 min read",
    words: 780,
  },
  {
    _id: "essay-05",
    kicker: "COMMENTARY • DESIGN CULTURE",
    title: "Handcrafted Digital Objects in an Age of Synthetic Abundance",
    sdesc: "As generative models flood the web with synthetic homogeneity, the deliberate human imprint becomes the rarest commodity.",
    ldesc: `When everything can be generated in three seconds by an automated prompt, the value of mechanical abundance drops to zero. What remains valuable is deliberate human intentionality: the sentence rewritten four times for clarity, the deliberate choice of a margin, the quiet restraint to leave something unsaid.

The craftsmanship of the web is returning to its roots—not as disposable corporate collateral, but as personal ateliers and broadsheet publications maintained with patient devotion.`,
    category: "Culture",
    edition: "Issue 13",
    image: "https://images.unsplash.com/photo-1507842229451-7f01be837a27?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-18T09:00:00Z",
    author: {
      name: "Samira Khan",
      location: "Singapore",
      role: "Design Critic",
    },
    readTime: "4 min read",
    words: 520,
  },
  {
    _id: "essay-06",
    kicker: "FIELD NOTES • LIFESTYLE",
    title: "The Art of the Evening Walk Without a Screen",
    sdesc: "Reclaiming the twilight hour for analog observation, stillness, and conversational presence.",
    ldesc: `In old Mediterranean and Persian towns, the promenade at dusk was a communal institution. People did not step outside to photograph the sunset for unseen audiences; they stepped outside to feel the evening breeze against their temples and greet their neighbors in quiet recognition.

When we leave the glowing glass behind, even for forty minutes, the nervous system downshifts from reactive vigilance into restorative awareness.`,
    category: "Stillness",
    edition: "Issue 12",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-12T17:40:00Z",
    author: {
      name: "Zayn Al-Hassan",
      location: "Istanbul",
      role: "Cultural Fellow",
    },
    readTime: "4 min read",
    words: 490,
  },
  {
    _id: "essay-07",
    kicker: "COMPUTATIONAL LINGUISTICS • বাংলা প্রযুক্তি",
    title: "বাংলা ভাষার কম্পিউটেশনাল ব্যাকরণ ও প্রাকৃতিক ভাষা প্রক্রিয়াকরণ",
    sdesc: "বাংলা ভাষার জটিল বাক্যগঠন, সন্ধি ও সমাসের গঠনকে কীভাবে বড় ল্যাঙ্গুয়েজ মডেলে নিখুঁতভাবে ইনজেক্ট করা যায়।",
    ldesc: `বাংলা পৃথিবীর সপ্তম সর্বাধিক প্রচলিত ভাষা হলেও কৃত্রিম বুদ্ধিমত্তার ক্ষেত্রে দীর্ঘকাল বাংলা ছিল আন্ডার-রিসোর্সড। ইংরেজির তুলনায় বাংলা ভাষায় শব্দের গঠনরূপ (Morphology) অত্যন্ত সমৃদ্ধ ও বৈচিত্র্যময়। একটি একক ক্রিয়াপদ বা নামশব্দ বিভিন্ন বিভক্তি ও প্রত্যয় যোগে অসংখ্য রূপ ধারণ করতে পারে।

### মরফোলজিক্যাল অ্যানালাইসিস
বাংলা ব্যাকরণের 'যুক্তাক্ষর' ও 'কারচিহ্ন' কেবল লিপির সৌন্দর্য নয়, এটি ধ্বনিতত্ত্ব ও অর্থতত্ত্বের প্রত্যক্ষ বাহক। টোকেনাইজেশনের সময় ভুলভাবে শব্দ ভাঙলে মূল অর্থের অপমৃত্যু ঘটে। আধুনিক সাব-ওয়ার্ড টোকেনাইজারগুলোকে বাংলা ভাষার ধ্বনিতাত্ত্বিক নিয়ম মেনেই প্রশিক্ষিত করা অপরিহার্য।`,
    category: "Engineering",
    edition: "Issue 11",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-08T15:20:00Z",
    author: {
      name: "তানভীর হাসান",
      location: "সিলেট",
      role: "রিসার্চ সায়েন্টিস্ট",
    },
    readTime: "8 min read",
    words: 920,
  },
  {
    _id: "essay-08",
    kicker: "INFRASTRUCTURE & ENERGY",
    title: "The Physics of Low-Latency Consensus in Autonomous Edge Arrays",
    sdesc: "How regional fiber density and atomic clocks are reshaping transaction finality without centralized datacenter round-trips.",
    ldesc: `As autonomous vehicles, smart grid power distributions, and regional logistics arrays require sub-5ms finality, the traditional pattern of shipping every packet to a distant hyperscaler cloud datacenter collapses under the speed of light.

### Synchronized Atomic Clocks at the Masthead
By integrating micro-rubidium atomic clocks directly into regional base transceiver stations, edge nodes can maintain microsecond-accurate time stamps without relying on jittery NTP servers. When consensus can assume provable wall-clock ordering, Paxos and Raft rounds drop from three network hops to a single broadcast confirmation.`,
    category: "Engineering",
    edition: "Issue 10",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-02T10:10:00Z",
    author: {
      name: "Dr. Aris Thorne",
      location: "Zurich",
      role: "Network Physicist",
    },
    readTime: "9 min read",
    words: 1100,
  },
];

// The Live Wire Dispatches (Continuously updated real-time bulletins)
export const LIVE_WIRE_DISPATCHES = [
  {
    id: "wire-1",
    edition: "WIRE 01",
    timestamp: "15:24 GMT",
    category: "TELECOMMUNICATIONS",
    headline: "Indian Ocean submarine cable consortium activates 400Tbps coherent optical transponders connecting Chattogram to Singapore",
    location: "CHATTOGRAM",
    urgent: true,
  },
  {
    id: "wire-2",
    edition: "WIRE 02",
    timestamp: "15:10 GMT",
    category: "COMPUTING",
    headline: "Open standards group ratifies zero-overhead memory-safe compiler profiles for enterprise microkernels",
    location: "ZURICH",
    urgent: false,
  },
  {
    id: "wire-3",
    edition: "WIRE 03",
    timestamp: "14:48 GMT",
    category: "ENERGY",
    headline: "Solid-state thermal storage pilot delivers continuous zero-emission power to Scandinavian server farms",
    location: "STOCKHOLM",
    urgent: false,
  },
  {
    id: "wire-4",
    edition: "WIRE 04",
    timestamp: "14:12 GMT",
    category: "STANDARDS",
    headline: "W3C issues final specification for local cryptographic document attestation across major web engines",
    location: "GENEVA",
    urgent: false,
  },
  {
    id: "wire-5",
    edition: "WIRE 05",
    timestamp: "13:30 GMT",
    category: "AEROSPACE",
    headline: "Low-Earth orbit meteorological array deploys synthetic aperture radar for real-time climate monitoring",
    location: "TOKYO",
    urgent: true,
  },
  {
    id: "wire-6",
    edition: "WIRE 06",
    timestamp: "12:45 GMT",
    category: "OPEN SOURCE",
    headline: "Global database alliance releases pure SQLite vector embedding extension with sub-millisecond query performance",
    location: "LONDON",
    urgent: false,
  },
];

export const editorialService = {
  async getArticles() {
    try {
      const res = await apiClient.get("/blogs");
      if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
    } catch {
      // Local fallback
    }
    const local = JSON.parse(localStorage.getItem("mixhub_editorial_articles") || "[]");
    return [...local, ...EDITORIAL_ARTICLES];
  },

  async getArticleById(id) {
    try {
      const res = await apiClient.get(`/blogs/${id}`);
      if (res.data) return res.data;
    } catch {
      // Fallback
    }
    const all = await this.getArticles();
    return all.find((a) => (a._id || a.id) === id) || all[0];
  },

  async publishArticle(data) {
    try {
      const res = await apiClient.post("/blogs", data);
      if (res.data) return res.data;
    } catch {
      // Fallback
    }
    const local = JSON.parse(localStorage.getItem("mixhub_editorial_articles") || "[]");
    const newDoc = {
      ...data,
      _id: `article-${Date.now()}`,
      date: new Date().toISOString(),
    };
    localStorage.setItem("mixhub_editorial_articles", JSON.stringify([newDoc, ...local]));
    return newDoc;
  },

  async getSavedArticles() {
    return JSON.parse(localStorage.getItem("mixhub_saved_reading_shelf") || "[]");
  },

  async saveArticle(article) {
    const list = await this.getSavedArticles();
    if (!list.some((a) => (a._id || a.id) === (article._id || article.id))) {
      list.push(article);
      localStorage.setItem("mixhub_saved_reading_shelf", JSON.stringify(list));
    }
    return true;
  },

  async removeSavedArticle(id) {
    const list = await this.getSavedArticles();
    const filtered = list.filter((a) => (a._id || a.id) !== id);
    localStorage.setItem("mixhub_saved_reading_shelf", JSON.stringify(filtered));
    return true;
  },

  async getLiveWire() {
    try {
      const res = await apiClient.get("/news/live");
      if (Array.isArray(res.data) && res.data.length > 0) return res.data;
    } catch {
      // Fallback
    }
    return LIVE_WIRE_DISPATCHES;
  },
};

export const blogService = editorialService;
