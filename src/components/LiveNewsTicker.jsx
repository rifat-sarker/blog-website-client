import { useEffect, useState } from "react";
import { blogService } from "../services/api";
import { Radio, Sparkles, ExternalLink, RefreshCw, X, ChevronRight, BellRing } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LiveNewsTicker = () => {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchNews = async () => {
    setIsRefreshing(true);
    const data = await blogService.getLiveNews();
    setNews(data);
    setLastUpdated(new Date());
    setTimeout(() => setIsRefreshing(false), 500);
  };

  useEffect(() => {
    fetchNews();
    // Auto refresh news every 45 seconds
    const interval = setInterval(fetchNews, 45000);
    return () => clearInterval(interval);
  }, []);

  // Cycle current headline every 6 seconds
  useEffect(() => {
    if (news.length === 0) return;
    const cycle = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 6000);
    return () => clearInterval(cycle);
  }, [news]);

  const currentItem = news[currentIndex] || {
    tag: "LIVE DISPATCH",
    title: "Continuous stream connecting to real-time news sources...",
    timeAgo: "Live",
    source: "MixHub Pulse",
  };

  const filteredNews =
    selectedTag === "all"
      ? news
      : news.filter((item) => item.tag.toLowerCase().includes(selectedTag.toLowerCase()));

  const allTags = ["all", "AI & HARDWARE", "WEB TECH", "CLOUD & EDGE", "CYBERSECURITY"];

  return (
    <>
      {/* Top Banner Ticker */}
      <div className="w-full bg-slate-900/90 dark:bg-slate-950/90 border-b border-indigo-500/20 text-xs py-2 px-4 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Live Indicator */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span className="font-bold tracking-wider uppercase text-rose-500 dark:text-rose-400 flex items-center gap-1">
              <Radio className="w-3.5 h-3.5" /> LIVE PULSE
            </span>
            <div className="h-3 w-px bg-slate-700 hidden sm:block" />
          </div>

          {/* Cycling Headline */}
          <div className="flex-1 overflow-hidden min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 truncate cursor-pointer hover:text-indigo-400 transition-colors"
                onClick={() => setIsOpenModal(true)}
              >
                <span className="badge badge-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono text-[10px] hidden sm:inline-block">
                  {currentItem.tag}
                </span>
                <span className="truncate text-slate-200 font-medium text-xs sm:text-sm">
                  {currentItem.title}
                </span>
                <span className="text-slate-500 text-[11px] whitespace-nowrap hidden md:inline">
                  • {currentItem.timeAgo}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setIsOpenModal(true)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors px-2 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20"
            >
              <BellRing className="w-3 h-3" />
              <span className="hidden sm:inline">Feed ({news.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live News Feed Modal / Drawer */}
      <AnimatePresence>
        {isOpenModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      Live Tech & World Pulse
                      <span className="badge badge-sm badge-secondary text-[10px]">Real-Time</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Auto-updates continuously • Last checked: {lastUpdated.toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchNews}
                    disabled={isRefreshing}
                    className="btn btn-ghost btn-sm btn-square text-slate-400 hover:text-white"
                    title="Refresh Now"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-indigo-400" : ""}`} />
                  </button>
                  <button
                    onClick={() => setIsOpenModal(false)}
                    className="btn btn-ghost btn-sm btn-square text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tag Filters */}
              <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-900/60 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-all font-medium ${
                      selectedTag === tag
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                        : "bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    {tag === "all" ? "All Updates" : tag}
                  </button>
                ))}
              </div>

              {/* News List */}
              <div className="p-5 overflow-y-auto space-y-3 divide-y divide-slate-800/50">
                {filteredNews.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="pt-3 first:pt-0 group hover:bg-slate-800/30 p-3 rounded-xl transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                          {item.tag}
                        </span>
                        {item.urgent && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase">
                            Breaking
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">{item.timeAgo}</span>
                    </div>

                    <h4 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors leading-relaxed">
                      {item.title}
                    </h4>

                    <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                      <span>Source: <strong className="text-slate-400">{item.source}</strong></span>
                      <span className="text-indigo-400 text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Verified dispatch <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Continuous 2026 Live Webhook Listener
                </span>
                <button
                  onClick={() => setIsOpenModal(false)}
                  className="btn btn-sm btn-outline border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveNewsTicker;

