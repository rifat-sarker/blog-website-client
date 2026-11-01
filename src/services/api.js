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

// Helper to extract localized text (defaults to English if specific lang is not found)
export const getLocalized = (field, lang = "en") => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.en || Object.values(field)[0] || "";
};

// Full-length, deep, comprehensive broadsheet essays with full English and Bangla texts
export const EDITORIAL_ARTICLES = [
  {
    _id: "essay-01",
    kicker: {
      en: "ARCHITECTURAL ESSAY • VOL. 28",
      bn: "স্থাপত্য বিষয়ক গবেষণা প্রবন্ধ • খণ্ড ২৮",
    },
    title: {
      en: "On the Quiet Beauty of Deterministic Systems: Engineering for Century-Scale Stability",
      bn: "নির্ধারণী ব্যবস্থার প্রশান্ত সৌন্দর্য: শতবর্ষের স্থায়িত্বের জন্য সফটওয়্যার আর্কিটেকচার",
    },
    sdesc: {
      en: "Why modern computing is abandoning stochastic sprawl in search of quiet, mathematically provable simplicity and immutable state ledgers.",
      bn: "অতিরিক্ত জটিলতা ও অবিরাম ট্র্যাকিংয়ের যুগে কেন আধুনিক সফটওয়্যার প্রকৌশল আবার ফিরে আসছে গাণিতিকভাবে প্রমাণিত সরলতা ও অপরিবর্তনীয় স্টেট লেজারের দিকে।",
    },
    ldesc: {
      en: `There is a profound, almost meditative stillness in code that does exactly one thing, without side effects, across ten thousand iterations. Over the last decade, the software industry surrendered to the temptation of endless asynchronous indirection: microservices that talked past one another, event buses drowned in telemetry noise, distributed tracing layers that required full teams to decipher, and architectures that collapsed under the weight of their own diagnostic tooling.

### The Historic Return to the Plain Ledger
When we study ancient ledger systems—from the cuneiform clay tablets of Sumer to the double-entry bookkeeping pioneered by 14th-century Venetian merchants—their enduring virtue was not computational velocity. It was absolute legibility. Anyone equipped with basic literacy could inspect the parchment and immediately discern ground truth without querying a distributed consensus engine.

In our pursuit of distributed micro-services, we systematically engineered away this legibility. In 2026, the quietest and most impactful engineering breakthroughs are not more complex neural inference pipelines, but deterministic state machines: SQLite at the edge, immutability by default, single-binary deployments, and architectures that can be completely reasoned through on a single legal pad.

\`\`\`javascript
// Minimalist deterministic state transition loop
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
In traditional Japanese woodwork (Sashimono), master craftsmen join cedar and cypress planks without a single metallic nail, dowel, or synthetic adhesive. The enduring strength of the joint does not arise from external fasteners, but from the mathematical precision of the cut and the natural friction of the grain itself.

When we write software with that same reverence—honoring constraints rather than fighting them—the resulting applications require zero background daemons to keep alive. They sit quietly on warm server memory, consume fractions of a milliwatt, and serve millions of readers with tranquil dignity.

### The Hidden Energy Cost of Indirection
Every layer of middleware, every unvetted npm dependency, and every telemetry heartbeat extracts a real physical toll in thermal dissipation. In a world increasingly constrained by carbon realities, software efficiency is no longer an intellectual exercise; it is an ethical imperative. When an application can boot in four milliseconds and run on an unmetered ten-dollar virtual slice for seven years without crashing, we have honored the reader's attention and the machine's physics.

### Designing for Longevity Over Novelty
The true measure of architectural elegance is not how quickly a prototype is assembled, but how quietly it runs a decade later when its original creators have moved on. Plain text, relational invariants, and human-readable serialization formats outlive every framework hype cycle. As we design the next generation of computing platforms, our highest ambition should not be complexity, but enduring, quiet stillness.`,
      bn: `দশ হাজার বার রান করার পরও কোনো অপ্রত্যাশিত সাইড-ইফেক্ট ছাড়া ঠিক একটি কাজ নির্ভুলভাবে সম্পন্ন করার মতো কোডের মধ্যে এক গভীর, ধ্যানমগ্ন প্রশান্তি লুকিয়ে থাকে। বিগত দশকে সফটওয়্যার ইন্ডাস্ট্রি এক বিভ্রান্তিকর জটিলতার মোহে আচ্ছন্ন হয়ে পড়েছিল: অসংখ্য মাইক্রোসার্ভিস যা একে অপরের সাথে সমন্বয়হীনভাবে কথা বলত, টেলিমেট্রি নয়েজে ডুবে থাকা ইভেন্ট বাস, এবং এমন এক অদ্ভুত স্থাপত্য যা কেবল চালু রাখার জন্যই ডজন ডজন ইঞ্জিনিয়ারের পুরো দল প্রয়োজন হতো।

### সাধারণ খতিয়ানে ঐতিহাসিক প্রত্যাবর্তন
আমরা যদি প্রাচীন হিসাবরক্ষণ ব্যবস্থা পর্যবেক্ষণ করি—সুমেরীয় কিউনিফর্ম মাটির ফলক থেকে শুরু করে চতুর্দশ শতাব্দীর ভেনিসীয় ব্যবসায়ীদের দ্বি-তরফা দাখিলা পদ্ধতি পর্যন্ত—তাদের মূল শক্তি ছিল না কোনো অতিরিক্ত গতি বা যান্ত্রিক প্রদর্শন। তাদের আসল শক্তি ছিল পরম স্পষ্টতা ও পাঠযোগ্যতা। যে কোনো সাধারণ হিসাবরক্ষক সেই খতিয়ান খুলে সরাসরি সত্য উপলব্ধি করতে পারতেন, কোনো কৃত্রিম ডায়াগনস্টিক টুলের প্রয়োজন হতো না।

কিন্তু অতিরিক্ত সার্ভিসের মোহে আমরা সিস্টেমের সেই মৌলিক স্বচ্ছতাকে ধ্বংস করে ফেলেছি। ২০২৬ সালে এসে সবচেয়ে শান্ত অথচ প্রভাবশালী প্রযুক্তিগত বিপ্লব ঘটছে কোনো জটিল নিউরাল পাইপলাইনে নয়, বরং ডিটারমিনিস্টিক বা সুনির্দিষ্ট স্টেট মেশিনে: এজ নোডে SQLite ব্যবহার, ডেটার অপরিবর্তনশীলতা (Immutability), এবং এমন সব সিস্টেম যা একটি মাত্র কাগজের পাতায় স্কেচ করে পুরোপুরি বোঝা সম্ভব।

\`\`\`javascript
// সম্পূর্ণ সুনির্দিষ্ট ও পরিচ্ছন্ন স্টেট ট্রানজিশন লুপ
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

### সফটওয়্যার নির্মাণে ওয়াবি-সাবি ও হস্তশিল্পের ঐতিহ্য
ঐতিহ্যবাহী জাপানি কাঠের কারুশিল্পে (শাশিমোনো), ওস্তাদ কারিগররা কোনো ধাতব পেরেক বা রাসায়নিক আঠা ছাড়াই ফার্নিচারের তক্তা জোড়া লাগান। সেই জোড়ের অতুলনীয় শক্তি কোনো কৃত্রিম বন্ধনী থেকে আসে না; তা আসে কাঠের নিখুঁত কোণ কাটা এবং নিজস্ব আঁশের ঘর্ষণ থেকে।

আমরা যখন সফটওয়্যার কোড রচনার ক্ষেত্রেও সেই পরম যত্ন ও শ্রদ্ধা বজায় রাখি—সীমাবদ্ধতাকে শত্রু না ভেবে শক্তি হিসেবে গ্রহণ করি—তখন সেই অ্যাপ্লিকেশন চালু রাখার জন্য পেছনের সার্ভারে হাজারটা ব্যাকগ্রাউন্ড ডেমন চালাতে হয় না। তা পরম শান্তিতে মেমোরিতে অবস্থান করে, অতি নগণ্য বিদ্যুৎ শক্তি খরচ করে এবং কোটি কোটি পাঠককে শান্ত গাম্ভীর্যের সাথে সেবা প্রদান করে।

### অপ্রয়োজনীয় জটিলতার অদৃশ্য পরিবেশগত মূল্য
প্রতিটি অতিরিক্ত মিডলওয়্যার, প্রতিটি অপ্রয়োজনীয় ডিপেন্ডেন্সি এবং অবিরাম অডিটের নামে পাঠানো টেলিমেট্রি প্যাকেট প্রকৃতপক্ষে বিশ্বজুড়ে বিদ্যুৎ অপচয় ও কার্বন নিঃসরণ বাড়িয়ে তোলে। জলবায়ু পরিবর্তনের বাস্তবতায় সফটওয়্যার কোডের দক্ষতা কেবল বুদ্ধিবৃত্তিক বিলাসিতা নয়, এটি এক নৈতিক দায়িত্ব। যখন একটি অ্যাপ্লিকেশন মাত্র ৪ মিলি-সেকেন্ডে বুট হতে পারে এবং সামান্য সার্ভার মেমোরিতে একটানা সাত বছর কোনো ক্র্যাশ ছাড়া চলতে পারে, তখন আমরা প্রযুক্তির মানবিক মর্যাদা রক্ষা করতে সক্ষম হই।

### ক্ষণিকের চমক নয়, শতবর্ষের স্থায়িত্ব
যেকোনো আর্কিটেকচারের শ্রেষ্ঠত্বের পরিচয় এতে নয় যে তা কত দ্রুত তৈরি করা গেল; বরং এর পরিচয় এতে যে দশ বছর পরও তা কত নির্বিঘ্নে ও প্রশান্তিতে কাজ চালিয়ে যেতে পারছে। প্লেইন টেক্সট, রিলেশনাল ইনভ্যারিয়েন্ট এবং মানুষের সহজে পড়ার উপযোগী ফরম্যাট প্রতিটি সাময়িক ফ্রেমওয়ার্ক ট্রেন্ডকে ছাড়িয়ে চিরকাল টিকে থাকে। আগামী প্রজন্মের ডিজিটাল দুনিয়া গড়ে তোলার ক্ষেত্রে আমাদের প্রধান লক্ষ্য হওয়া উচিত জটিলতা বৃদ্ধি নয়, বরং শান্ত, টেকসই ও চিরন্তন সারল্য।`,
    },
    category: {
      en: "Architecture",
      bn: "স্থাপত্যকলা",
    },
    edition: {
      en: "Autumn 2026 Edition",
      bn: "শরৎ ২০২৬ সংস্করণ",
    },
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-28T08:00:00Z",
    author: {
      name: {
        en: "Rifat Sarker",
        bn: "রিফাত সরকার",
      },
      location: {
        en: "Dhaka Bureau",
        bn: "ঢাকা ব্যুরো",
      },
      role: {
        en: "Lead Editor",
        bn: "প্রধান সম্পাদক",
      },
    },
    readTime: {
      en: "7 min read",
      bn: "৭ মিনিট পড়ার সময়",
    },
    words: 860,
  },
  {
    _id: "essay-02",
    kicker: {
      en: "LITERARY INQUIRY • COGNITION",
      bn: "মননশীল অনুসন্ধান ও পাঠসংস্কৃতি",
    },
    title: {
      en: "The Architecture of Uninterrupted Reading: Designing Sanctuaries for the Fractured Mind",
      bn: "নিরবচ্ছিন্ন পাঠের স্থাপত্য: বিক্ষিপ্ত মনের জন্য ডিজিটাল প্রশান্তির নকশা",
    },
    sdesc: {
      en: "How notification-driven interfaces fractured human cognitive endurance, and why we must build distraction-free sanctuaries of paper and quiet typography.",
      bn: "বিজ্ঞাপন ও পুশ নোটিফিকেশনের অবিরাম শব্দ কীভাবে মানুষের গভীর চিন্তার ক্ষমতাকে ধ্বংস করেছে এবং কেন আমাদের আবার ফিরে যেতে হবে সাদাকালো কাগজ ও সেরিফ টাইপোগ্রাফিতে।",
    },
    ldesc: {
      en: `To read deeply is not merely to consume alphanumeric information; it is to enter a sacred state of sustained communion with another human consciousness across time and geography. Yet modern digital platforms have spent the past two decades systematically commodifying and dismantling the cognitive stillness necessary for deep thought. Popups demand newsletter consents, banners flicker with synthetic desperation, sticky headers eat a third of the viewable screen, and algorithmically optimized tickers fight for reflexive indignation.

### The Broadsheet as an Instrument of Dignity
Consider the broadsheet newspaper. When spread open upon an oak morning table, it produces no mechanical hum. It does not vibrate against the palm. Its typography exists at classical proportions honed through four hundred years of Renaissance typographic theory. The eye traverses columns of justified text with a rhythmic, measured cadence that encourages contemplative reflection.

When we designed MixHub Dispatch, we returned unconditionally to this ancestral rhythm. The generous paper margins are not decorative emptiness; they are breathable silences that allow an argument to resonate and form within the reader’s memory.

### Typography as Hospitality
Setting type with generous leading, carefully modulated contrast, and legible letterforms is an act of deep hospitality extended by the author to an unseen stranger. When the eye does not have to fight for balance, the reader’s cognitive energy is entirely liberated to wrestle with the ideas themselves.`,
      bn: `গভীর মনোযোগ দিয়ে কোনো লেখা পড়া কেবল তথ্য সংগ্রহের বিষয় নয়; এটি মূলত দূর অতীতের কোনো চিন্তাশীল মানুষের চেতনার সাথে একাত্ম হওয়ার এক পবিত্র আত্মিক অভিজ্ঞতা। অথচ আধুনিক বাণিজ্যিক ওয়েবসাইটগুলো বিগত দুই দশকে মানুষের সেই একাগ্রতাকে নির্মমভাবে ছিন্নভিন্ন করেছে। স্ক্রিনজুড়ে ভেসে ওঠা বিজ্ঞাপনের ঝলকানি, পপ-আপের বিরক্তি এবং ক্ষণে ক্ষণে অ্যালগরিদমের কৃত্রিম নোটিফিকেশন মানুষের দীর্ঘক্ষণ কোনো বিষয়ে গভীরভাবে ভাবার ক্ষমতাকে পঙ্গু করে দিয়েছে।

### মর্যাদাপূর্ণ মাধ্যমের প্রতীক হিসেবে সংবাদপত্র
একটি ক্লাসিক্যাল ব্রডশিট পত্রিকার কথা ভাবুন। সকালের কাঠের টেবিলে যখন তা মেলে ধরা হয়, তা থেকে কোনো কৃত্রিম শব্দ বের হয় না। এটি পাঠকের হাতে কোনো নোটিফিকেশনের কাঁপুনি তোলে না। এর টাইপোগ্রাফির অনুপাত চারশত বছরের ছাপাখানার শিল্পতত্ত্ব ও রেনেসাঁ ঐতিহ্যের ওপর প্রতিষ্ঠিত। কলামজুড়ে সুবিন্যস্ত অক্ষরের ভেতর দিয়ে চোখ যখন এগিয়ে চলে, তখন মানুষের মনে এক শান্ত চিন্তার আবহ তৈরি হয়।

মিক্সহাব ডিসপ্যাচ তৈরি করার সময় আমরা নিঃসংকোচে সেই প্রাচীন পাঠের সংস্কৃতিতে ফিরে এসেছি। পাতার পাশের সাদা মার্জিন কোনো ফাঁকা অপচয় নয়; এটি মূলত সেই শ্বাস নেওয়ার মতো প্রশান্ত অবকাশ, যা একটি বড় চিন্তাকে মানুষের হৃদয়ে স্থায়ীভাবে স্থান করে দেয়।

### টাইপোগ্রাফি যখন আতিথেয়তা
নিখুঁত হরফ ও আরামদায়ক ফন্ট সাইজ দিয়ে একটি পৃষ্ঠা সাজানো মানে হচ্ছে একজন অচেনা পাঠকের প্রতি লেখকের সর্বোচ্চ আন্তরিক আতিথেয়তা প্রদর্শন করা। পাঠককে যখন ডিজাইনের সাথে যুদ্ধ করতে হয় না, তখন তিনি পুরো মনযোগ দিতে পারেন মূল দর্শনে।`,
    },
    category: {
      en: "Philosophy",
      bn: "দর্শন ও সংস্কৃতি",
    },
    edition: {
      en: "Issue 14",
      bn: "১৪তম সংখ্যা",
    },
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-25T11:30:00Z",
    author: {
      name: {
        en: "Kazi Nazrul",
        bn: "কাজী নজরুল",
      },
      location: {
        en: "Chittagong",
        bn: "চট্টগ্রাম",
      },
      role: {
        en: "Contributing Essayist",
        bn: "প্রাবন্ধিক",
      },
    },
    readTime: {
      en: "6 min read",
      bn: "৬ মিনিট পড়ার সময়",
    },
    words: 720,
  },
  {
    _id: "essay-03",
    kicker: {
      en: "REGIONAL ARCHITECTURE & HERITAGE",
      bn: "বাংলা স্থাপত্য ও নদীমাতৃক ঐতিহ্য",
    },
    title: {
      en: "Memory and Waterways: The Architectural Restoration of Dhaka's Lost Canals",
      bn: "স্মৃতি ও স্থপতি: ঢাকা শহরের বিলুপ্ত জলপথের স্থাপত্যিক পুনর্নির্মাণ",
    },
    sdesc: {
      en: "A comprehensive investigation into the forgotten canal networks of old Bengal and how modern urban resilience depends upon daylighting buried waterways.",
      bn: "একটি নদীর ওপর দাঁড়িয়ে গড়ে ওঠা প্রাচীন শহরের হারিয়ে যাওয়া খাল ও প্রাকৃতিক ড্রেনেজ ব্যবস্থার স্থাপত্যিক পুনর্মূল্যায়ন ও আগামী দিনের নগর পরিকল্পনা।",
    },
    ldesc: {
      en: `Dhaka was never designed to be an arid land city; it was conceived and engineered as an amphibious aquatic metropolis, the direct daughter of the Buriganga, the Shitalakshya, and the Turag rivers. When Mughal Subahdar Islam Khan excavated Dholai Khal more than four centuries ago, it was not merely an infrastructural fortification; it was the beating cardiovascular artery of regional commerce, sewage drainage, and natural rainwater absorption.

### The Concrete Entombment of Living Waterways
Over the past half-century, catastrophic unplanned urbanization filled, paved, and suffocated over forty historical natural canals in the name of vehicular roads and speculative development. Yet water possesses an immutable geological memory. When metropolitan streets submerge under monsoon rains, nature is not creating a crisis; it is simply re-asserting its ancestral easements.

\`\`\`markdown
Archival Survey & Satellite Hydrographic Mapping:
1. Dholai Khal — Historic Connection: Buriganga to Balu River Basin
2. Begunbari Channel — Modern Hatirjheel Retention Watershed
3. Kallyanpur Khals — Western Metropolitan Drainage System
\`\`\`

### Daylighting Waterways for 2026 and Beyond
Across the globe—from Seoul's Cheonggyecheon restoration to the daylighted canals of Amsterdam and Zurich—forward-thinking cities are tearing up concrete culverts and allowing water to breathe again in open sunlight. For Dhaka, restoring its natural arterial canals with pedestrian tree-lined promenades is not a nostalgic luxury; it is the fundamental prerequisite for ecological survival in an era of global climate intensification.`,
      bn: `ঢাকা মূলত কোনো শুষ্ক সমভূমির শহর ছিল না; এটি ছিল এক জলজ শহর, বুড়িগঙ্গা, শীতলক্ষ্যা ও তুরাগ নদীর সহোদরা। চারশত বছর পূর্বে সুবেদার ইসলাম খানের আমলে ধোলাই খাল যখন খনন করা হয়েছিল, তা কেবল প্রতিরক্ষাই নিশ্চিত করেনি, বরং সমগ্র শহরের ভেতরে পণ্যের চলাচল ও পানির স্বাভাবিক প্রবাহকে সচল রেখেছিল।

### ইট-কংক্রিটের ফাঁদে জীবন্ত জলপথ
বিগত অর্ধশতাব্দীতে অপরিকল্পিত নগরায়নের নির্মম আঘাতে ঢাকার ৪০টিরও বেশি ঐতিহাসিক খাল ও প্রাকৃতিক জলাধার ভরাট করে কালভার্ট ও রাস্তায় ঢেকে ফেলা হয়েছে। কিন্তু পানি তার আদি গতিপথ কখনো ভোলে না। প্রতি বর্ষায় যখন রাজপথ ডুবে যায়, প্রকৃতি আসলে কোনো দুর্যোগ সৃষ্টি করে না; সে কেবল তার হারানো খালের ঐতিহাসিক অধিকারই পুনর্ব্যক্ত করে।

\`\`\`markdown
ঐতিহাসিক জরিপ ও আধুনিক স্যাটেলাইট ম্যাপিং:
১. ধোলাই খাল — আদি সংযোগ: বুড়িগঙ্গা থেকে বালু নদী অববাহিকা
২. বেগুনবাড়ি খাল — বর্তমান হাতিরঝিল ওয়াটারশেড
৩. কল্যাণপুর খাল — পশ্চিম ঢাকার প্রধান নিষ্কাশন চ্যানেল
\`\`\`

### আগামী দিনের স্থাপত্য ভাবনা ও খালের মুক্তি
২০২৬ সালে এসে টেকসই নগরায়নের প্রধান শর্ত হয়ে দাঁড়িয়েছে জলবায়ু-সহনশীল অবকাঠামো। সিউলের ছংগিয়েছন খাল পুনরুদ্ধারের মতো আধুনিক নগর পরিকল্পনায় বিশ্বজুড়ে কংক্রিটের ড্রেন ভেঙে উন্মুক্ত পানির প্রবাহ ফিরিয়ে আনা হচ্ছে। ঢাকাকেও তার হারানো নদীমাতৃক সত্তায় ফিরিয়ে নিয়ে গিয়ে খালের পাড়ে বৃক্ষশোভিত পায়ে হাঁটার পথ গড়ে তোলাই হতে পারে আগামী দিনের বেঁচে থাকার একমাত্র পথ।`,
    },
    category: {
      en: "Architecture",
      bn: "স্থাপত্যকলা",
    },
    edition: {
      en: "Issue 14",
      bn: "১৪তম সংখ্যা",
    },
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-24T09:00:00Z",
    author: {
      name: {
        en: "Dr. Sajed Rahman",
        bn: "ড. সাজেদ রহমান",
      },
      location: {
        en: "Dhaka",
        bn: "ঢাকা",
      },
      role: {
        en: "Urban Planner",
        bn: "নগর পরিকল্পনাবিদ",
      },
    },
    readTime: {
      en: "8 min read",
      bn: "৮ মিনিট পড়ার সময়",
    },
    words: 910,
  },
  {
    _id: "essay-04",
    kicker: {
      en: "SYSTEMS CRAFT • RUNTIMES",
      bn: "সফটওয়্যার কারিগরি ও রানটাইম",
    },
    title: {
      en: "Building Without Batteries: The Zero-Dependency Doctrine in Modern Web Engineering",
      bn: "অতিরিক্ত কাঠামোহীন সফটওয়্যার: আধুনিক ওয়েব প্রকৌশলে জিরো-ডিপেন্ডেন্সি দর্শন",
    },
    sdesc: {
      en: "Examining the operational sanity, auditability, and speed of shipping plain code without hundreds of megabytes of nested node modules.",
      bn: "হাজার হাজার থার্ড-পার্টি লাইব্রেরির ওপর নির্ভর না করে সরাসরি ব্রাউজার ও নোডের নিজস্ব ক্ষমতা ব্যবহার করে শতগুণ দ্রুতগতির সফটওয়্যার তৈরির উপায়।",
    },
    ldesc: {
      en: `A standard commercial web repository frequently installs forty thousand files and three hundred megabytes of unvetted third-party JavaScript before a single line of business logic is typed. We have sleepwalked into a regime of extreme supply-chain fragility, phantom security advisories, and compiler pipelines that crash under their own weight.

### The Inherent Sovereignty of Plain Web Standards
Modern web engines now natively ship the most powerful standard library in the history of human computation. CSS Grid, Subgrid, Flexbox, native Fetch, URLSearchParams, Web Crypto, Web Workers, and native ES Modules require zero polyfills or heavy frameworks for 95% of editorial and application interfaces.

When you engineer an application without external dependencies, its build step takes 0.1 seconds rather than three minutes. Its attack surface drops to zero. Its memory footprint shrinks by an order of magnitude. Most importantly, the software can run without modification twenty years into the future.`,
      bn: `একটি সাধারণ বাণিজ্যিক ওয়েব প্রজেক্ট শুরু করতে গেলেই ব্যবসার আসল কোড লেখার আগেই ৪০ হাজার ফাইল ও শত শত মেগাবাইটের থার্ড-পার্টি লাইব্রেরি ডাউনলোড হয়ে যায়। আমরা এক বিপজ্জনক ডিপেন্ডেন্সি নির্ভরতায় অভ্যস্ত হয়ে পড়েছি, যেখানে ক্ষণে ক্ষণে সিকিউরিটি ঝুঁকি দেখা দেয় এবং ভারী বিল্ড প্রসেসের চাপে কম্পিউটারের গতি কমে যায়।

### ওয়েব স্ট্যান্ডার্ডের নিজস্ব রাজকীয় ক্ষমতা
বর্তমান আধুনিক ওয়েব ব্রাউজারগুলোতে এখন এমন শক্তিশালী স্ট্যান্ডার্ড বিল্ট-ইন আছে যা আগে কখনো ছিল না। নেটিভ সিএসএস গ্রিড, ফ্লেক্সবক্স, ফেচ এপিআই, ওয়েব ক্রিপ্টো ও ইএস মডিউল ব্যবহার করে কোনো থার্ড-পার্টি ফ্রেমওয়ার্ক ছাড়াই চমৎকার পারফরম্যান্স পাওয়া যায়।

যখন কোনো প্রজেক্ট অপ্রয়োজনীয় প্লাগিন ছাড়া নিখুঁতভাবে তৈরি করা হয়, তখন তার লোড হতে মাত্র কয়েক মিলি-সেকেন্ড সময় লাগে। এর সিকিউরিটি ঝুঁকি প্রায় শূন্যে নেমে আসে এবং বিশ বছর পরও সেই কোড অবিকৃতভাবে চলে।`,
    },
    category: {
      en: "Engineering",
      bn: "প্রকৌশল",
    },
    edition: {
      en: "Issue 13",
      bn: "১৩তম সংখ্যা",
    },
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-22T14:15:00Z",
    author: {
      name: {
        en: "Tariq Mansoor",
        bn: "তারেক মনসুর",
      },
      location: {
        en: "London",
        bn: "লন্ডন",
      },
      role: {
        en: "Systems Architect",
        bn: "সিস্টেম আর্কিটেক্ট",
      },
    },
    readTime: {
      en: "7 min read",
      bn: "৭ মিনিট পড়ার সময়",
    },
    words: 840,
  },
  {
    _id: "essay-05",
    kicker: {
      en: "NATURAL LANGUAGE & COMPUTING",
      bn: "বাংলা ভাষা ও কৃত্রিম বুদ্ধিমত্তা",
    },
    title: {
      en: "Computational Grammar of Bengali: Morphology and Tokenization in Large Language Models",
      bn: "বাংলা ভাষার কম্পিউটেশনাল ব্যাকরণ ও বৃহৎ ভাষা মডেলে মরফোলজি বিশ্লেষণ",
    },
    sdesc: {
      en: "How the intricate agglutinative structure, prefixes, and phonetic inflections of Bengali demand new tokenizer architectures beyond Western sub-word heuristics.",
      bn: "বাংলা ভাষার জটিল বাক্যগঠন, সন্ধি ও সমাসের গঠনকে কীভাবে বড় ল্যাঙ্গুয়েজ মডেলে নিখুঁতভাবে ইনজেক্ট করা যায় তার গভীর বিশ্লেষণ।",
    },
    ldesc: {
      en: `Bengali, spoken by over three hundred million human souls across the Indian subcontinent and global diaspora, possesses one of the richest morphological and phonetic traditions in world literature. Yet throughout the initial decades of generative AI, Bengali was relegated to poorly tokenized sub-word fragments where a single conjunct character (যুক্তাক্ষর) was fractured into six disconnected byte tokens, inflating inference latency and distorting semantic embeddings.

### The Phonetic Integrity of the Script
In Bengali phonology, the visual glyph is not an arbitrary orthographic decoration; it carries direct acoustic and semantic weight. Proper tokenization requires sub-word algorithms calibrated directly to root morphemes, case inflections (বিভক্তি), and sandhi phonetic merges. In 2026, researchers are developing language models whose token vocabulary honors the natural cadence of South Asian linguistics.`,
      bn: `বাংলা বিশ্বের সপ্তম সর্বাধিক প্রচলিত ভাষা। ইংরেজির তুলনায় বাংলা ভাষায় শব্দের গঠনরূপ (Morphology) অত্যন্ত সমৃদ্ধ ও বৈচিত্র্যময়। একটি একক ক্রিয়াপদ বা নামশব্দ বিভিন্ন বিভক্তি ও প্রত্যয় যোগে অসংখ্য রূপ ধারণ করতে পারে। পশ্চিমা টোকেনাইজার দিয়ে যখন বাংলাকে টুকরো করা হতো, তখন একটি যুক্তাক্ষর ভেঙে অর্থহীন বাইটে পরিণত হতো।

### ধ্বনিতত্ত্ব ও লিপি সংহতি
বাংলা ব্যাকরণের 'যুক্তাক্ষর' ও 'কারচিহ্ন' কেবল লিপির সৌন্দর্য নয়, এটি ধ্বনিতত্ত্ব ও অর্থতত্ত্বের প্রত্যক্ষ বাহক। টোকেনাইজেশনের সময় ভুলভাবে শব্দ ভাঙলে মূল অর্থের অপমৃত্যু ঘটে। ২০২৬ সালের আধুনিক ভাষা মডেলগুলোতে বাংলা ভাষার ধ্বনিতাত্ত্বিক নিয়ম ও সন্ধি-সমাসের নিয়ম মেনেই নতুন টোকেনাইজার আর্কিটেকচার তৈরি করা হচ্ছে।`,
    },
    category: {
      en: "Engineering",
      bn: "প্রকৌশল ও ভাষা",
    },
    edition: {
      en: "Issue 12",
      bn: "১২তম সংখ্যা",
    },
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-18T10:00:00Z",
    author: {
      name: {
        en: "Tanveer Hassan",
        bn: "তানভীর হাসান",
      },
      location: {
        en: "Sylhet",
        bn: "সিলেট",
      },
      role: {
        en: "NLP Research Fellow",
        bn: "গবেষক",
      },
    },
    readTime: {
      en: "9 min read",
      bn: "৯ মিনিট পড়ার সময়",
    },
    words: 950,
  },
  {
    _id: "essay-06",
    kicker: {
      en: "CRITICAL ESSAYS • DIGITAL MINDFULNESS",
      bn: "ডিজিটাল সুস্থতা ও মননশীলতা",
    },
    title: {
      en: "The Lost Twilight: Reclaiming the Solitude of Evening Walks in an Algorithmic Age",
      bn: "হারানো গোধূলি: স্ক্রিনহীন সান্ধ্যকালীন হাঁটার মধ্যে চিন্তার স্বাধীনতা ফিরে পাওয়া",
    },
    sdesc: {
      en: "How stepping out at dusk without digital glass restores the human nervous system from perpetual hyper-vigilance to serene contemplative clarity.",
      bn: "দিনের আলো যখন মিলিয়ে যায়, তখন মুঠোফোন পকেটে রেখে কেবল নিজের নিঃশ্বাস ও বাতাসের স্পর্শ অনুভব করে হাঁটার মধ্যে মানবমনের পরম আরোগ্য লুকিয়ে থাকে।",
    },
    ldesc: {
      en: `In traditional towns across Bengal, Persia, and the Mediterranean basin, the evening stroll—the *Hate Hata* or *Passeggiata*—was a venerated social and spiritual ritual. People did not venture outside to document the sunset for distant spectators on a digital screen. They stepped into the twilight to feel the cool breeze against their foreheads, to observe the amber light filtering through the banyan leaves, and to exchange unmediated greetings with passing neighbors.

### The Biological Cost of Eternal Daylight
Blue-light emitting pocket glass has artificially extended noon into midnight. Our biological circadian rhythms—calibrated across hundreds of thousands of years of evolutionary history—are thrown into frantic confusion. When you walk in dusk without a device, your cortisol levels drop, the prefrontal cortex resets its executive load, and the mind finds the spaciousness necessary to solve hard conceptual challenges.`,
      bn: `প্রাচীন বাংলায় বা পারস্যের পুরনো শহরে গোধূলিলগ্নে শান্ত পায়ে হেঁটে বেড়ানো ছিল এক অপূর্ব সামাজিক ও আত্মিক সংস্কৃতি। মানুষ তখন সূর্যাস্তের ছবি তুলে সামাজিক যোগাযোগ মাধ্যমে লাইক পাওয়ার জন্য বাইরে বের হতো না। তারা বের হতো সন্ধ্যার শীতল হাওয়া কপালে মাখতে, বটগাছের পাতার ফাঁক দিয়ে শেষ আলোর খেলা দেখতে এবং প্রতিবেশীর সাথে আন্তরিক কুশল বিনিময় করতে।

### কৃত্রিম আলোর ক্লান্তি ও মনের বিশ্রাম
মুঠোফোনের কৃত্রিম নীল আলো মানুষের চোখের সামনে রাতকে অন্তহীন দুপুরের মতো উজ্জ্বল করে রেখেছে। এর ফলে মানুষের মস্তিষ্কের স্বাভাবিক বিশ্রাম ব্যাহত হয়। আপনি যখন কোনো গ্যাজেট ছাড়া সন্ধ্যার নীরবতায় আধা ঘণ্টা হেঁটে আসেন, তখন চোখের স্নায়ু শান্ত হয়, মানসিক ক্লান্তি দূর হয় এবং বড় কোনো জটিল সমস্যার সমাধানের গভীর অন্তর্দৃষ্টি খুঁজে পাওয়া যায়।`,
    },
    category: {
      en: "Stillness",
      bn: "প্রশান্তি",
    },
    edition: {
      en: "Issue 11",
      bn: "১১তম সংখ্যা",
    },
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-12T17:40:00Z",
    author: {
      name: {
        en: "Zayn Al-Hassan",
        bn: "জাইন আল-হাসান",
      },
      location: {
        en: "Istanbul",
        bn: "ইস্তাম্বুল",
      },
      role: {
        en: "Cultural Fellow",
        bn: "সাংস্কৃতিক গবেষক",
      },
    },
    readTime: {
      en: "6 min read",
      bn: "৬ মিনিট পড়ার সময়",
    },
    words: 680,
  },
];

// The Live Wire Dispatches: Full Detailed Wire Reports in Both English and Bangla
export const LIVE_WIRE_DISPATCHES = [
  {
    id: "wire-01",
    edition: "WIRE 01",
    timestamp: "15:24 GMT",
    category: {
      en: "TELECOMMUNICATIONS",
      bn: "টেলিকমিউনিকেশন",
    },
    location: "CHATTOGRAM",
    headline: {
      en: "Indian Ocean submarine cable consortium activates 400Tbps coherent optical transponders connecting Chattogram directly to Singapore and Marseille",
      bn: "চট্টগ্রাম থেকে সিঙ্গাপুর ও মার্সেই পর্যন্ত ৪০০ টেরাবিট অপটিক্যাল সাবমেরিন কেবল লাইন সফলভাবে চালু করেছে আন্তর্জাতিক কনসোর্টিয়াম",
    },
    report: {
      en: "CHATTOGRAM — The Bay of Bengal subsea connectivity consortium has concluded trial telemetry for the South Asian trans-oceanic fiber corridor. The newly deployed optical line bypasses terrestrial bottlenecks and provides redundant latency below 18ms across Singapore hubs, providing unprecedented infrastructural reliability for regional cloud operations.",
      bn: "চট্টগ্রাম — বঙ্গোপসাগর সাবমেরিন ক্যাবল কনসোর্টিয়াম দক্ষিণ এশিয়ার নতুন ট্রান্স-ওশেনিক ফাইবার লাইনের সফল ট্রায়াল সম্পন্ন করেছে। এই নতুন অপটিক্যাল লাইনটি সিঙ্গাপুর পর্যন্ত ১৮ মিলি-সেকেন্ডের কম লেটেন্সিতে নিরবচ্ছিন্ন ইন্টারনেট ব্যান্ডউইথ সরবরাহ করবে, যা বাংলাদেশের ডিজিটাল অবকাঠামোকে বিশ্বমানের শক্তিতে রূপান্তর করবে।",
    },
    urgent: true,
  },
  {
    id: "wire-02",
    edition: "WIRE 02",
    timestamp: "15:10 GMT",
    category: {
      en: "COMPUTING",
      bn: "কম্পিউটিং ও সিস্টেমস",
    },
    location: "ZURICH",
    headline: {
      en: "Open standards group ratifies zero-overhead memory-safe compiler profiles for enterprise microkernels",
      bn: "মেমোরি-নিরাপদ কম্পাইলার প্রোফাইলের নতুন বিশ্বমান অনুমোদন করেছে আন্তর্জাতিক ওপেন স্ট্যান্ডার্ড গ্রুপ",
    },
    report: {
      en: "ZURICH — In a historic unanimous ballot, the international computer systems council finalized standard specifications eliminating buffer overflow vulnerabilities at compile time with zero runtime execution penalty. The profile is already being integrated into critical aviation and hospital operating kernels.",
      bn: "জুরিখ — আন্তর্জাতিক কম্পিউটার সিস্টেম কাউন্সিল সর্বসম্মতিক্রমে এমন এক কম্পাইলার স্ট্যান্ডার্ড অনুমোদন করেছে যা মেমোরি লিক ও বাফার ওভারফ্লোর মতো বিপজ্জনক ত্রুটি প্রোগ্রাম চলাকালীন সময়েই সম্পূর্ণ নির্মূল করবে, কোনো অতিরিক্ত সিস্টেম লোড ছাড়াই।",
    },
    urgent: false,
  },
  {
    id: "wire-03",
    edition: "WIRE 03",
    timestamp: "14:48 GMT",
    category: {
      en: "ENERGY & CLIMATE",
      bn: "শক্তি ও জলবায়ু",
    },
    location: "STOCKHOLM",
    headline: {
      en: "Solid-state thermal storage pilot delivers continuous zero-emission power to Scandinavian server farms throughout Arctic night",
      bn: "স্ক্যান্ডিনেভিয়ার ডেটাসেন্টারগুলোতে শতভাগ পরিবেশবান্ধব থার্মাল শক্তির সফল পাইলট প্রকল্প বাস্তবায়ন",
    },
    report: {
      en: "STOCKHOLM — Swedish renewable engineering labs announced that deep sand thermal batteries maintained 99.999% uptime for cloud server clusters over a thirty-day continuous testing window, proving the commercial viability of baseload green computing.",
      bn: "স্টকহোম — সুইডিশ নবায়নযোগ্য জ্বালানি গবেষণাগার জানিয়েছে যে মাটির নিচের বিশেষ থার্মাল ব্যাটারি টানা এক মাস কোনো গ্রিড বিদ্যুৎ ছাড়াই সার্ভার ক্লাস্টার সচল রাখতে সক্ষম হয়েছে, যা ডেটাসেন্টারের কার্বন নিঃসরণ শূন্যে নামিয়ে আনবে।",
    },
    urgent: false,
  },
  {
    id: "wire-04",
    edition: "WIRE 04",
    timestamp: "14:12 GMT",
    category: {
      en: "WEB STANDARDS",
      bn: "ওয়েব স্ট্যান্ডার্ড",
    },
    location: "GENEVA",
    headline: {
      en: "W3C issues final specification for local cryptographic document attestation across major web engines",
      bn: "ব্রাউজারে স্থানীয় ক্রিপ্টোগ্রাফিক ডকুমেন্ট যাচাইকরণের নতুন বৈশ্বিক মান জারি করেছে ডব্লিউথ্রিসি",
    },
    report: {
      en: "GENEVA — The World Wide Web Consortium released the permanent recommendation for client-side digital signatures, enabling readers to verify the authentic origin and author signatures of articles without pinging remote verification servers.",
      bn: "জেনেভা — ওয়ার্ল্ড ওয়াইড ওয়েব কনসোর্টিয়াম ব্রাউজারের ভেতর ডিজিটাল সিগনেচার যাচাইয়ের নিয়ম জারি করেছে, যার ফলে কোনো প্রবন্ধ মূল লেখক পরিবর্তন ছাড়াই প্রকাশ করেছেন কিনা তা দূরবর্তী সার্ভারে না গিয়েও পাঠক নিজেই নিশ্চিত হতে পারবেন।",
    },
    urgent: false,
  },
  {
    id: "wire-05",
    edition: "WIRE 05",
    timestamp: "13:30 GMT",
    category: {
      en: "AEROSPACE",
      bn: "মহাকাশ ও আবহাওয়া",
    },
    location: "TOKYO",
    headline: {
      en: "Low-Earth orbit meteorological array deploys synthetic aperture radar for real-time climate monitoring",
      bn: "রিয়েল-টাইম জলবায়ু ও বন্যা পর্যবেক্ষণে নতুন সিন্থেটিক রাডার স্যাটেলাইট সফলভাবে কক্ষপথে স্থাপন",
    },
    report: {
      en: "TOKYO — Meteorological scientists confirmed successful signal reception from the new multi-spectral satellite array, which tracks tropical storm surges and river delta silt movements with centimeter-level precision.",
      bn: "টোকিও — আবহাওয়া বিজ্ঞানীরা নিশ্চিত করেছেন যে নতুন স্যাটেলাইট বহর সফলভাবে সক্রিয় হয়েছে, যা বঙ্গোপসাগর ও ভারত মহাসাগরের সাইক্লোন এবং নদীর গতিপথ নিখুঁতভাবে পরিমাপ করে দুর্যোগের আগাম সতর্কবার্তা প্রদান করবে।",
    },
    urgent: true,
  },
  {
    id: "wire-06",
    edition: "WIRE 06",
    timestamp: "12:45 GMT",
    category: {
      en: "OPEN SOURCE",
      bn: "ওপেন সোর্স",
    },
    location: "LONDON",
    headline: {
      en: "Global database alliance releases pure SQLite vector embedding extension with sub-millisecond query performance",
      bn: "এসকিউলাইট ডেটাবেজের জন্য উচ্চগতির ভেক্টর এক্সটেনশন উন্মুক্ত করেছে ওপেন সোর্স ডেভেলপার কমিউনিটি",
    },
    report: {
      en: "LONDON — Software engineers have released a standalone, zero-dependency C extension for SQLite that allows full vector search inside single-file databases, eliminating the need for bulky vector cloud services for personal and local AI apps.",
      bn: "লন্ডন — সম্পূর্ণ সিঙ্গেল-ফাইল ডেটাবেজে কৃত্রিম বুদ্ধিমত্তার ভেক্টর সার্চ চালানোর মতো হালকা ও দ্রুতগতির ওপেন সোর্স এক্সটেনশন উন্মুক্ত করা হয়েছে, যা লোকাল ডিভাইসে ডাটা খোঁজা শতগুণ সহজ করবে।",
    },
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

  async getSavedArticles(email = null) {
    try {
      const url = email ? `/wishlist?email=${encodeURIComponent(email)}` : "/wishlist";
      const res = await apiClient.get(url);
      if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
    } catch {
      // Local fallback
    }
    return JSON.parse(localStorage.getItem("mixhub_saved_reading_shelf") || "[]");
  },

  async saveArticle(article, userEmail = null) {
    const list = JSON.parse(localStorage.getItem("mixhub_saved_reading_shelf") || "[]");
    const articleId = article._id || article.id;
    if (!list.some((a) => (a._id || a.id) === articleId)) {
      list.push(article);
      localStorage.setItem("mixhub_saved_reading_shelf", JSON.stringify(list));
    }

    try {
      await apiClient.post("/wishlist", {
        blogId: articleId,
        title: article.title,
        sdesc: article.sdesc,
        ldesc: article.ldesc,
        category: article.category,
        image: article.image || article.imageURL,
        imageURL: article.imageURL || article.image,
        author: article.author,
        readTime: article.readTime,
        words: article.words,
        edition: article.edition,
        email: userEmail || "reader@mixhub.press",
      });
    } catch {
      // Offline / Local save suffices
    }
    return true;
  },

  async removeSavedArticle(id) {
    const list = JSON.parse(localStorage.getItem("mixhub_saved_reading_shelf") || "[]");
    const filtered = list.filter((a) => (a._id || a.id) !== id && a.blogId !== id);
    localStorage.setItem("mixhub_saved_reading_shelf", JSON.stringify(filtered));

    try {
      await apiClient.delete(`/wishlist/${id}`);
    } catch {
      // Ignored
    }
    return true;
  },

  async getLiveWire() {
    // 1. Live Global Tech & Engineering Telemetry from Hacker News Open Stream
    try {
      const response = await fetch("https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=25", {
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        if (Array.isArray(json?.hits) && json.hits.length > 0) {
          return json.hits.map((item, idx) => {
            const rawUrl = item.url || `https://news.ycombinator.com/item?id=${item.objectID}`;
            let domain = "GLOBAL WIRE";
            try {
              const parsed = new URL(rawUrl);
              domain = parsed.hostname.replace(/^www\./, "").toUpperCase();
            } catch {
              domain = "GLOBAL WIRE";
            }

            // Intelligent Category Classifier
            const titleLower = (item.title || "").toLowerCase();
            let catEn = "COMPUTING";
            let catBn = "কম্পিউটিং ও সিস্টেমস";

            if (/(ai|llm|gpt|model|neural|vision|openai|anthropic|deepmind|agent|intelligence|reasoning)/.test(titleLower)) {
              catEn = "AI & MACHINE LEARNING";
              catBn = "এআই ও মেশিন লার্নিং";
            } else if (/(github|open-source|linux|kernel|rust|python|release|git|foss|compiler)/.test(titleLower)) {
              catEn = "OPEN SOURCE";
              catBn = "ওপেন সোর্স";
            } else if (/(web|html|css|browser|chrome|http|dns|wasm|react|typescript|javascript|api|frontend)/.test(titleLower)) {
              catEn = "WEB STANDARDS";
              catBn = "ওয়েব স্ট্যান্ডার্ডস";
            } else if (/(network|5g|6g|fiber|cable|telecom|wireless|cellular|transponder)/.test(titleLower)) {
              catEn = "TELECOMMUNICATIONS";
              catBn = "টেলিকমিউনিকেশন";
            } else if (/(space|nasa|starship|physics|astronomy|rocket|quantum|satellite)/.test(titleLower)) {
              catEn = "AEROSPACE";
              catBn = "মহাকাশ ও পদার্থবিজ্ঞান";
            } else if (/(climate|energy|solar|battery|grid|carbon|nuclear|power)/.test(titleLower)) {
              catEn = "ENERGY & CLIMATE";
              catBn = "জ্বালানি ও জলবায়ু";
            }

            // Elapsed time calculation
            const createdMs = item.created_at_i ? item.created_at_i * 1000 : new Date(item.created_at).getTime();
            const diffMin = Math.max(1, Math.floor((Date.now() - createdMs) / 60000));
            const timeStr = diffMin < 60 ? `${diffMin}m ago` : `${Math.floor(diffMin / 60)}h ago`;

            return {
              id: `hn-${item.objectID || idx}`,
              edition: `WIRE 0${idx + 1}`,
              timestamp: timeStr,
              category: {
                en: catEn,
                bn: catBn,
              },
              location: domain,
              headline: {
                en: item.title,
                bn: item.title,
              },
              report: {
                en: `${domain} — ${item.title}. Live community telemetry logs ${item.points || 0} verification points and ${item.num_comments || 0} active engineer discussions on international dispatch channels. Dispatched by @${item.author || "researcher"}.`,
                bn: `${domain} — ${item.title}। আন্তর্জাতিক ইঞ্জিনিয়ারিং ফোরামে এই টেক রিপোর্টে ${item.points || 0}টি সিগন্যাল পয়েন্ট ও ${item.num_comments || 0}টি সক্রিয় আলোচনা নিবন্ধিত হয়েছে। প্রেরক: @${item.author || "রিসার্চার"}।`,
              },
              url: rawUrl,
              points: item.points || 0,
              numComments: item.num_comments || 0,
              author: item.author || "researcher",
              urgent: (item.points || 0) >= 200,
            };
          });
        }
      }
    } catch (e) {
      console.warn("Real-time live wire fetch fallback to cached/local dispatches:", e);
    }

    // 2. Secondary fallback: backend API
    try {
      const res = await apiClient.get("/news/live");
      if (Array.isArray(res.data) && res.data.length > 0) return res.data;
    } catch {
      // Fallback
    }

    // 3. Final fallback: curated dispatches
    return LIVE_WIRE_DISPATCHES;
  },

  // Dynamic Likes (Claps) & Comments
  async clapStory(id, action = "like") {
    try {
      const res = await apiClient.post(`/blogs/${id}/clap`, { action });
      return res.data;
    } catch {
      return { claps: action === "unlike" ? 0 : 1 };
    }
  },

  async addComment(id, comment) {
    try {
      const res = await apiClient.post(`/blogs/${id}/comments`, comment);
      return res.data;
    } catch {
      return [comment];
    }
  },

  // Auth Integration
  async requestEmailOTP(email) {
    const res = await apiClient.post("/auth/send-otp", { email });
    return res.data;
  },

  async verifyEmailOTP(email, otp) {
    const res = await apiClient.post("/auth/verify-otp", { email, otp });
    return res.data;
  },

  async verifyGoogleLogin(payload) {
    const res = await apiClient.post("/auth/google", payload);
    return res.data;
  },

  // Image Upload from Local Computer to Cloudinary via Backend
  async uploadImage(file) {
    const toBase64 = (f) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    const base64Data = await toBase64(file);
    const res = await apiClient.post("/upload", { image: base64Data });
    return res.data;
  },
};

export const blogService = editorialService;
