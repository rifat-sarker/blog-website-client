import { useEffect, useState } from "react";
import { editorialService, getLocalized } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";
import { RefreshCw, ChevronDown, ChevronUp, Radio, ArrowUpRight, Flame } from "lucide-react";

const CATEGORIES = [
  "ALL",
  "AI & MACHINE LEARNING",
  "COMPUTING",
  "OPEN SOURCE",
  "WEB STANDARDS",
  "TELECOMMUNICATIONS",
  "ENERGY & CLIMATE",
  "AEROSPACE",
];

const LiveWire = () => {
  const { currentLang } = useLanguage();
  const [wireList, setWireList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [lastCheck, setLastCheck] = useState(new Date());
  const [expandedId, setExpandedId] = useState(null);

  const fetchWire = async () => {
    setIsRefreshing(true);
    const data = await editorialService.getLiveWire();
    setWireList(data || []);
    setLastCheck(new Date());
    setTimeout(() => setIsRefreshing(false), 400);
  };

  useEffect(() => {
    fetchWire();
    const interval = setInterval(fetchWire, 35000);
    return () => clearInterval(interval);
  }, []);

  const filtered =
    activeCategory === "ALL"
      ? wireList
      : wireList.filter((w) => {
          const cat = typeof w.category === "object" ? w.category.en : w.category;
          return cat?.toUpperCase() === activeCategory.toUpperCase();
        });

  return (
    <div className="max-w-[860px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-12 min-h-[75vh]">
      {/* Header */}
      <div className="pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-[#f2f2f2] flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1a8917] animate-pulse" />
            <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#1a8917]">
              Real-Time Global Feed • Live Stream
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#242424] mb-1.5 sm:mb-2 tracking-tight">
            The Live Wire
          </h1>
          <p className="text-xs sm:text-sm text-[#6b6b6b]">
            Continuous live dispatches, research bulletins, and engineering telemetry from across the web.
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-[#6b6b6b] pt-2 sm:pt-0 border-t sm:border-t-0 border-[#f2f2f2]">
          <span className="font-mono">Synced: {lastCheck.toLocaleTimeString()}</span>
          <button
            onClick={fetchWire}
            disabled={isRefreshing}
            className="p-1.5 rounded-full hover:bg-[#f2f2f2] text-[#242424] transition-colors"
            title="Refresh feed"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-[#f2f2f2]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? "bg-[#242424] text-[#ffffff] font-medium"
                : "bg-[#f2f2f2] text-[#6b6b6b] hover:text-[#242424]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dispatches List */}
      <div className="divide-y divide-[#f2f2f2]">
        {filtered.map((wire, idx) => {
          const wireId = wire.id || idx;
          const isExpanded = expandedId === wireId;
          const localizedCategory = getLocalized(wire.category, currentLang);
          const localizedHeadline = getLocalized(wire.headline, currentLang);
          const localizedReport = getLocalized(wire.report, currentLang);

          return (
            <div
              key={wireId}
              className="py-6 first:pt-0 space-y-2 cursor-pointer group"
              onClick={() => setExpandedId(isExpanded ? null : wireId)}
            >
              <div className="flex items-center justify-between text-xs text-[#6b6b6b]">
                <div className="flex items-center gap-2 flex-wrap">
                  {wire.urgent && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca] animate-pulse">
                      <Flame className="w-3 h-3 text-[#b91c1c]" />
                      BREAKING
                    </span>
                  )}
                  <span className="font-medium text-[#1a8917]">{localizedCategory}</span>
                  <span>•</span>
                  <span className="font-mono text-[11px] uppercase text-[#6b6b6b]">{wire.location || "GLOBAL"}</span>
                </div>
                <span className="font-mono text-[11px]">{wire.timestamp || "LIVE"}</span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <h3 className="font-bold text-lg sm:text-xl text-[#242424] group-hover:text-[#6b6b6b] transition-colors leading-snug">
                  {localizedHeadline}
                </h3>
                <div className="text-[#6b6b6b] pt-1 flex-shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {isExpanded && (
                <div className="mt-3 p-4 bg-[#f9f9f9] rounded-lg border border-[#f2f2f2] text-sm text-[#404040] space-y-3">
                  <p className="leading-relaxed font-serif text-[15px]">{localizedReport}</p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e6e6e6] text-xs text-[#6b6b6b]">
                    <div className="flex items-center gap-3">
                      {wire.points !== undefined && (
                        <span className="font-mono font-medium text-[#1a8917]">
                          ▲ {wire.points} points
                        </span>
                      )}
                      {wire.numComments !== undefined && (
                        <span className="font-mono">
                          💬 {wire.numComments} comments
                        </span>
                      )}
                      {wire.author && (
                        <span>by @{wire.author}</span>
                      )}
                    </div>
                    {wire.url && (
                      <a
                        href={wire.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 font-medium text-[#1a8917] hover:text-[#156d12] underline underline-offset-2"
                      >
                        <span>Read original source</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveWire;
