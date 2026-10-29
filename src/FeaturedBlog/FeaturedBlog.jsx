import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogService } from "../services/api";
import { Trophy, Clock, FileText, ArrowRight, Sparkles, Flame, User } from "lucide-react";
import { motion } from "framer-motion";

const FeaturedBlog = () => {
  const [blogs, setBlogs] = useState([]);
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

  // Sort by content length (deepest articles)
  const ranked = [...blogs]
    .sort((a, b) => {
      const lenA = (a.ldesc || a.sdesc || "").split(" ").length;
      const lenB = (b.ldesc || b.sdesc || "").split(" ").length;
      return lenB - lenA;
    })
    .slice(0, 10);

  const getRankBadge = (rank) => {
    if (rank === 0)
      return {
        bg: "bg-amber-500/20 text-amber-400 border-amber-500/40",
        label: "#1 Deep Dive",
        icon: Trophy,
      };
    if (rank === 1)
      return {
        bg: "bg-slate-300/20 text-slate-300 border-slate-300/40",
        label: "#2 Rank",
        icon: Trophy,
      };
    if (rank === 2)
      return {
        bg: "bg-amber-700/20 text-amber-600 border-amber-700/40",
        label: "#3 Rank",
        icon: Trophy,
      };
    return {
      bg: "bg-slate-800 text-slate-400 border-slate-700/60",
      label: `#${rank + 1}`,
      icon: Sparkles,
    };
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
          <Flame className="w-3.5 h-3.5" />
          Hall of Deep Reads
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Top 10 Most In-Depth Essays
        </h1>
        <p className="text-sm text-slate-400">
          Ranked purely by analytical depth, word count, and comprehensive architectural documentation.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4 max-w-4xl mx-auto">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="h-24 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4 max-w-4xl mx-auto">
          {ranked.map((blog, index) => {
            const badge = getRankBadge(index);
            const words = (blog.ldesc || blog.sdesc || "").split(" ").length;
            const readMinutes = Math.max(3, Math.ceil(words / 180));

            return (
              <motion.div
                key={blog._id || blog.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-900 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg"
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  {/* Rank Badge */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold font-mono text-sm border flex-shrink-0 ${badge.bg}`}
                  >
                    #{index + 1}
                  </div>

                  {/* Info */}
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="badge badge-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono text-[10px] uppercase">
                        {blog.category?.replace("_", " ") || "Article"}
                      </span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-indigo-400" /> {readMinutes} min read
                      </span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                        <FileText className="w-3 h-3 text-emerald-400" /> {words} words
                      </span>
                    </div>

                    <Link to={`/blog/${blog._id || blog.id}`}>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
                        {blog.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>By {blog.author?.name || "MixHub Contributor"}</span>
                      <span>•</span>
                      <span>{blog.date ? new Date(blog.date).toLocaleDateString() : "2026"}</span>
                    </div>
                  </div>
                </div>

                {/* Read Button */}
                <Link
                  to={`/blog/${blog._id || blog.id}`}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 self-end sm:self-center"
                >
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FeaturedBlog;
