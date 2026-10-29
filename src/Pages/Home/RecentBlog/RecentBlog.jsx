import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogService } from "../../../services/api";
import RecentBlogCard from "./RecentBlogCard";
import { Sparkles, ArrowRight, Layers, Filter } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = [
  { id: "all", label: "All Topics" },
  { id: "software_development", label: "Software & AI" },
  { id: "motivation", label: "Mindset & Growth" },
  { id: "travel", label: "Travel & Culture" },
  { id: "recipes", label: "Health & Nutrition" },
];

const RecentBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    blogService.getAllBlogs().then((data) => {
      if (isMounted) {
        setBlogs(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter and sort blogs
  const filtered = blogs.filter((b) => {
    if (activeCategory === "all") return true;
    return b.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  const sorted = [...filtered]
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 6);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Title and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Long-Reads
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Recent Publications
          </h2>
          <p className="text-sm text-slate-400 max-w-md">
            Thought leadership and hands-on case studies crafted for modern practitioners.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or Skeleton Loading */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-96 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse flex flex-col p-4 space-y-4"
            >
              <div className="h-48 rounded-xl bg-slate-800" />
              <div className="h-6 w-3/4 rounded bg-slate-800" />
              <div className="h-4 w-full rounded bg-slate-800" />
              <div className="h-4 w-2/3 rounded bg-slate-800" />
            </div>
          ))}
        </div>
      ) : sorted.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((blog) => (
            <RecentBlogCard key={blog._id || blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800/80">
          <p className="text-slate-400 text-sm">No articles found in this category yet.</p>
          <button
            onClick={() => setActiveCategory("all")}
            className="mt-3 text-xs text-indigo-400 font-semibold hover:underline"
          >
            Show All Topics
          </button>
        </div>
      )}

      {/* Bottom CTA to View All */}
      <div className="mt-14 text-center">
        <Link
          to="/allBlog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white text-sm font-semibold transition-all shadow-lg hover:shadow-indigo-500/5 group"
        >
          <span>View All Published Articles</span>
          <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default RecentBlog;
