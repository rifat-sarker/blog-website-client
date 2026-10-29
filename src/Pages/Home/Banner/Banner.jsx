import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Search, Radio, Compass, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/allBlog?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/allBlog");
    }
  };

  return (
    <div className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-pink-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -top-10 right-10 w-72 h-72 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>The Modern Publication for Engineers & Creators</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
          >
            Where deep ideas meet the{" "}
            <span className="text-gradient">live pulse of tech.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
          >
            Curated long-form essays, distributed systems engineering, thoughtful design principles, and an auto-updating real-time global news ticker.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearchSubmit}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-lg mx-auto relative mt-4"
          >
            <div className="relative flex items-center shadow-xl shadow-indigo-950/40 rounded-2xl bg-slate-900/90 border border-slate-800/80 p-1.5 focus-within:border-indigo-500/60 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-3 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search distributed systems, AI agents, architecture..."
                className="w-full bg-transparent px-3 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all flex-shrink-0"
              >
                Search <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.form>

          {/* CTA Buttons & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/allBlog"
              className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-white text-sm font-semibold flex items-center gap-2 transition-all hover:border-slate-600"
            >
              <Compass className="w-4 h-4 text-indigo-400" />
              Browse All Stories
            </Link>
            <Link
              to="/addBlog"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
            >
              <Terminal className="w-4 h-4" />
              Write an Article
            </Link>
          </motion.div>

          {/* Metrics strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-800/60 max-w-4xl mx-auto"
          >
            <div className="space-y-1">
              <p className="text-2xl font-extrabold text-white font-mono">150+</p>
              <p className="text-xs text-slate-400">Published Essays</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-extrabold text-white font-mono">52k</p>
              <p className="text-xs text-slate-400">Monthly Engineers</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-extrabold text-white font-mono flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                Live
              </p>
              <p className="text-xs text-slate-400">Continuous Dispatches</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-extrabold text-white font-mono">100%</p>
              <p className="text-xs text-slate-400">Community Owned</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
