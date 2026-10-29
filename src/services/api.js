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
  timeout: 6000,
});

// Fallback high-quality curated sample blogs for 2026
export const INITIAL_FALLBACK_BLOGS = [
  {
    _id: "blog-1",
    title: "The Architecture of Autonomous AI Agents in 2026",
    sdesc: "How multi-agent systems and real-time inference loops are replacing traditional static APIs in production workloads.",
    ldesc: `Autonomous agents have shifted from simple prompt wrappers to distributed event-driven systems. In 2026, building software around agentic architectures requires new mental models for state machines, tool registries, and real-time human-in-the-loop validation.

### The Shift to Event Loops
Traditional REST APIs respond statically to explicit client requests. Agentic workflows, by contrast, rely on durable execution runtimes that can suspend, resume, and invoke auxiliary tools asynchronously.

\`\`\`javascript
// Event-driven agent dispatch loop
async function dispatchAgentTurn(agentId, prompt, tools) {
  const context = await memoryStore.load(agentId);
  const stream = await llmClient.stream({ prompt, tools, context });
  for await (const delta of stream) {
    if (delta.toolCall) {
      const result = await registry.execute(delta.toolCall);
      yield { status: 'running_tool', tool: delta.toolCall.name, result };
    }
  }
}
\`\`\`

### Distributed Memory and Context Pruning
Managing long-horizon context remains the key engineering bottleneck. Sliding window token compaction combined with vector vector-similarity lookups allows agents to sustain multi-day planning sessions without degrading coherence.`,
    category: "software_development",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    imageURL: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    date: "2026-10-24T10:00:00Z",
    author: {
      name: "Rifat Sarker",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      role: "Lead Engineer",
    },
    readTime: "6 min read",
    claps: 342,
  },
  {
    _id: "blog-2",
    title: "Vite 6 and Micro-Frontends: Fast Builds at Scale",
    sdesc: "A deep dive into sub-second module replacement and lightning fast SSR pipelines for enterprise applications.",
    ldesc: `Development speed directly correlates with team happiness. As codebases scale past hundreds of thousands of lines, developer tooling needs to remain instantaneous.

Vite's native ESM-based development server eliminated the tedious bundling step that plagued earlier web tooling. Now with modern Rollup improvements and Rust-powered compiler plugins, bundling for production completes in seconds rather than minutes.

### Key Performance Patterns
1. Native ES module serving during local dev.
2. Smart code-splitting per route boundary.
3. Edge-rendered hydration shells.`,
    category: "software_development",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    imageURL: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    date: "2026-10-20T14:30:00Z",
    author: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      role: "Frontend Architect",
    },
    readTime: "4 min read",
    claps: 215,
  },
  {
    _id: "blog-3",
    title: "Mindful Remote Work: Designing Deep Work Rituals",
    sdesc: "Combatting asynchronous notification fatigue with intentional calendar architectures and asynchronous collaboration habits.",
    ldesc: `The hyper-connected workplace often creates an illusion of productivity while fracturing deep cognitive focus. True creative engineering breakthroughs require sustained, uninterrupted blocks of attention.

### The 4-Hour Focus Block Rule
Reserving mornings exclusively for uninterrupted creative problem solving—leaving meetings, email triaging, and chat checks to late afternoons—consistently yields higher output with lower mental burnout.`,
    category: "motivation",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    imageURL: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    date: "2026-10-18T09:15:00Z",
    author: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      role: "Product Strategist",
    },
    readTime: "5 min read",
    claps: 189,
  },
  {
    _id: "blog-4",
    title: "Nordic Minimalist Living: Lessons from Scandinavian Spaces",
    sdesc: "How clean lines, intentional lighting, and natural wood grain shape calmer, more creative living spaces.",
    ldesc: `Scandinavian design is fundamentally an exploration of light and warm restraint. In regions where winter days are short, spaces are designed to maximize every ray of natural sunlight using warm pale oak, breathable linen, and open sightlines.`,
    category: "travel",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    imageURL: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    date: "2026-10-14T11:00:00Z",
    author: {
      name: "Astrid Lindgren",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      role: "Spatial Designer",
    },
    readTime: "3 min read",
    claps: 124,
  },
  {
    _id: "blog-5",
    title: "High-Performance Plant Nutrition for Active Developers",
    sdesc: "Clean recipes and balanced macronutrient strategies engineered for sustained cognitive stamina throughout high-intensity sprint cycles.",
    ldesc: `Brain fog is often directly tied to blood glucose spikes and electrolyte deficits. Whole-food complex carbs paired with healthy omega fats provide a slow, steady burn of glucose without mid-afternoon energy crashes.`,
    category: "recipes",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
    imageURL: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
    date: "2026-10-10T08:20:00Z",
    author: {
      name: "Dr. Maya Patel",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      role: "Nutrition Scientist",
    },
    readTime: "4 min read",
    claps: 147,
  },
  {
    _id: "blog-6",
    title: "Mastering Distributed Systems: Consensus and CAP in Practice",
    sdesc: "Demystifying Raft, Paxos, and eventual consistency when designing resilient real-time applications.",
    ldesc: `Building fault-tolerant systems requires accepting that network partitions are inevitable. The true test of distributed engineering lies in graceful degradation and partition recovery without data corruption.`,
    category: "software_development",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    imageURL: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    date: "2026-10-06T16:45:00Z",
    author: {
      name: "Devon Reed",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      role: "Cloud Architect",
    },
    readTime: "7 min read",
    claps: 412,
  },
];

// Live News Feeds with real-time timestamps
export const LIVE_NEWS_FEED = [
  {
    id: "news-1",
    tag: "AI & HARDWARE",
    title: "Next-gen neuromorphic chips hit 4x inference efficiency per watt in server testing",
    timeAgo: "Just now",
    source: "TechPulse Wire",
    urgent: true,
  },
  {
    id: "news-2",
    tag: "WEB TECH",
    title: "W3C finalizes new CSS anchor positioning and scroll-driven animation standards across major engines",
    timeAgo: "4m ago",
    source: "Web Dev Weekly",
    urgent: false,
  },
  {
    id: "news-3",
    tag: "CLOUD & EDGE",
    title: "Global serverless latency drops below 12ms as edge WASM runtimes deploy globally",
    timeAgo: "11m ago",
    source: "Cloud Native Dispatch",
    urgent: false,
  },
  {
    id: "news-4",
    tag: "OPEN SOURCE",
    title: "Major open-source database alliance announces native vector quantization standard",
    timeAgo: "23m ago",
    source: "OSS Chronicle",
    urgent: false,
  },
  {
    id: "news-5",
    tag: "CYBERSECURITY",
    title: "Post-quantum cryptographic key exchanges successfully adopted by 70% of major cloud providers",
    timeAgo: "39m ago",
    source: "Security Brief",
    urgent: true,
  },
];

export const blogService = {
  // Fetch all blogs
  async getAllBlogs() {
    try {
      const response = await apiClient.get("/blogs");
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
    } catch (err) {
      console.warn("Using local fallback blogs:", err.message);
    }
    // Check localStorage for any user added blogs
    const local = JSON.parse(localStorage.getItem("mixhub_local_blogs") || "[]");
    return [...local, ...INITIAL_FALLBACK_BLOGS];
  },

  // Fetch blog by ID
  async getBlogById(id) {
    try {
      const response = await apiClient.get(`/blogs/${id}`);
      if (response.data) return response.data;
    } catch (err) {
      console.warn(`Falling back for blog ${id}:`, err.message);
    }
    const all = await this.getAllBlogs();
    return all.find((b) => b._id === id || b.id === id) || all[0];
  },

  // Create new blog
  async createBlog(blogData) {
    try {
      const response = await apiClient.post("/blogs", blogData);
      if (response.data) return response.data;
    } catch (err) {
      console.warn("Saving blog locally:", err.message);
    }
    const local = JSON.parse(localStorage.getItem("mixhub_local_blogs") || "[]");
    const newEntry = {
      ...blogData,
      _id: `local-${Date.now()}`,
      createdAt: new Date().toISOString(),
      date: blogData.date || new Date().toISOString(),
    };
    localStorage.setItem("mixhub_local_blogs", JSON.stringify([newEntry, ...local]));
    return newEntry;
  },

  // Wishlist / Bookmarks
  async getWishlist(email) {
    try {
      const response = await apiClient.get(`/wishlist?email=${email || ""}`);
      if (Array.isArray(response.data)) return response.data;
    } catch (err) {
      console.warn("Using local wishlist storage:", err.message);
    }
    return JSON.parse(localStorage.getItem(`mixhub_wishlist_${email || "guest"}`) || "[]");
  },

  async addToWishlist(item, email) {
    try {
      const response = await apiClient.post("/wishlist", { ...item, email });
      if (response.data) return response.data;
    } catch (err) {
      console.warn("Adding to local wishlist:", err.message);
    }
    const key = `mixhub_wishlist_${email || "guest"}`;
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    if (!list.some((b) => b._id === item._id || b.title === item.title)) {
      list.push({ ...item, email, addedAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(list));
    }
    return { success: true };
  },

  async removeFromWishlist(id, email) {
    try {
      await apiClient.delete(`/wishlist/${id}`);
    } catch (err) {
      console.warn("Removing from local wishlist:", err.message);
    }
    const key = `mixhub_wishlist_${email || "guest"}`;
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    const filtered = list.filter((b) => b._id !== id);
    localStorage.setItem(key, JSON.stringify(filtered));
    return { success: true };
  },

  // Live News
  async getLiveNews() {
    try {
      const res = await apiClient.get("/news/live");
      if (Array.isArray(res.data) && res.data.length > 0) return res.data;
    } catch (err) {
      // Return built-in live feed
    }
    return LIVE_NEWS_FEED;
  },
};

