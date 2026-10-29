import { useEffect, useState } from "react";
import { editorialService, getLocalized } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";
import { RefreshCw, Radio, ChevronDown, ChevronUp, FileText } from "lucide-react";

const LiveWire = () => {
  const { t, currentLang } = useLanguage();
  const [wireList, setWireList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [lastCheck, setLastCheck] = useState(new Date());
  const [expandedId, setExpandedId] = useState(null);

  const fetchWire = async () => {
    setIsRefreshing(true);
    const data = await editorialService.getLiveWire();
    setWireList(data);
    setLastCheck(new Date());
    setTimeout(() => setIsRefreshing(false), 400);
  };

  useEffect(() => {
    fetchWire();
    const interval = setInterval(fetchWire, 35000);
    return () => clearInterval(interval);
  }, []);

  const categories = ["ALL", "TELECOMMUNICATIONS", "COMPUTING", "ENERGY & CLIMATE", "WEB STANDARDS", "AEROSPACE", "OPEN SOURCE"];

  const filtered =
    activeCategory === "ALL"
      ? wireList
      : wireList.filter((w) => {
          const cat = typeof w.category === "object" ? w.category.en : w.category;
          return cat?.toUpperCase() === activeCategory.toUpperCase();
        });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 min-h-[75vh]">
      {/* Wire Masthead */}
      <div className="border-b-2 border-[#141414] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b91c1c] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#b91c1c] font-bold">
              {currentLang === "bn" ? "রিয়েল-টাইম বৈশ্বিক টেলিপ্রিন্টার ব্যুরো" : "The Real-Time Teleprinter Bureau"}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#141414]">
            {t("theWire")}
          </h1>
          <p className="font-serif italic text-sm text-[#5e5a54] mt-1">
            {currentLang === "bn"
              ? "বিশ্বব্যাপী প্রযুক্তি, টেলিযোগাযোগ, ওপেন সোর্স ও মহাকাশ গবেষণার সার্বক্ষণিক সরাসরি সংবাদ বুলেটিন।"
              : "Continuous real-time investigative dispatches and bulletins transmitted from global technical and economic centers."}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#5e5a54] uppercase tracking-wider">
          <span>{currentLang === "bn" ? "সর্বশেষ স্ক্যান" : "Synced"}: {lastCheck.toLocaleTimeString()}</span>
          <button
            onClick={fetchWire}
            disabled={isRefreshing}
            className="p-1.5 border border-[#141414] hover:bg-[#141414] hover:text-[#faf8f5] transition-colors"
            title="Poll Teleprinter"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Wire Notice Box Explaining what this is */}
      <div className="border border-[#141414] p-4 bg-[#f4f1ea] mb-8 text-xs font-serif text-[#5e5a54] leading-relaxed flex items-start gap-3">
        <FileText className="w-4 h-4 text-[#b91c1c] flex-shrink-0 mt-0.5" />
        <p>
          {currentLang === "bn"
            ? "লাইভ ওয়্যার কী? এটি মূলত সংবাদ সংস্থাগুলোর (যেমন রয়টার্স বা এপি) টেলিপ্রিন্টারের মতো ২৪/৭ রিয়েল-টাইম বুলেটিন ফিড। এখানে প্রতিটি সংবাদের শিরোনামের নিচে পূর্ণাঙ্গ সংক্ষিপ্ত প্রতিবেদন (Report Dispatch) সংযুক্ত থাকে। শিরোনামে ক্লিক করে যেকোনো প্রতিবেদনের বিস্তারিত পাঠ করুন।"
            : "What is The Live Wire? Modeled after international press teleprinters (Reuters / AP Wire), this bureau delivers unadorned, verified technical bulletins around the clock. Each entry includes both the breaking headline and a full contextual dispatch report below."}
        </p>
      </div>

      {/* Wire Category Filters */}
      <div className="border border-[#141414] p-3 bg-[#ffffff] mb-8 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-[#141414] text-[#faf8f5] font-bold"
                  : "bg-[#faf8f5] text-[#5e5a54] hover:text-[#141414] border border-[#e8e4dc]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="font-mono text-[11px] text-[#5e5a54] uppercase tracking-wider hidden md:inline flex-shrink-0">
          {filtered.length} {currentLang === "bn" ? "টি বুলেটিন" : "Dispatches"}
        </span>
      </div>

      {/* Dispatches Bulletin List */}
      <div className="border-2 border-[#141414] bg-[#ffffff] divide-y divide-[#e8e4dc]">
        {filtered.map((wire, idx) => {
          const isExpanded = expandedId === (wire.id || idx);
          const localizedCategory = getLocalized(wire.category, currentLang);
          const localizedHeadline = getLocalized(wire.headline, currentLang);
          const localizedReport = getLocalized(wire.report, currentLang);

          return (
            <div
              key={wire.id || idx}
              className="p-6 space-y-3 hover:bg-[#faf8f5] transition-colors cursor-pointer"
              onClick={() => setExpandedId(isExpanded ? null : (wire.id || idx))}
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#5e5a54] uppercase tracking-wider">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-[#b91c1c]">[{wire.edition || `WIRE 0${idx + 1}`}]</span>
                  <span className="bg-[#e8e4dc] px-1.5 py-0.5 text-[#141414] font-bold text-[10px]">
                    {wire.location}
                  </span>
                  <span>•</span>
                  <span>{localizedCategory}</span>
                </div>
                <span>{wire.timestamp}</span>
              </div>

              {/* Headline */}
              <h3 className="font-serif text-xl sm:text-2xl text-[#141414] font-normal leading-snug">
                {localizedHeadline}
              </h3>

              {/* Full Detailed Report Paragraph */}
              <div className="pt-2 border-t border-[#e8e4dc] text-sm font-serif text-[#2e2e2e] leading-relaxed bg-[#f4f1ea]/50 p-4 rounded-sm">
                <span className="font-mono text-[10px] uppercase font-bold text-[#b91c1c] block mb-1">
                  {currentLang === "bn" ? "টেলিপ্রিন্টার পূর্ণাঙ্গ প্রতিবেদন" : "Official Wire Dispatch Report"}:
                </span>
                <p>{localizedReport}</p>
              </div>

              <div className="text-[11px] font-mono text-[#8c867c] flex items-center justify-between pt-1">
                <span>Verified Wire Stream • Direct Telemetry Feed</span>
                <span>Ref: 2026-DISP-0{idx + 1}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Colophon */}
      <div className="mt-8 p-4 border border-[#e8e4dc] bg-[#f4f1ea] text-center font-serif italic text-xs text-[#5e5a54]">
        {currentLang === "bn"
          ? "দ্য লাইভ ওয়্যার নিয়মিত বিরতিতে নতুন সংবাদ বুলেটিন সম্প্রচার করে থাকে।"
          : "The Live Wire bureau transmits verified technical, infrastructural, and scientific bulletins continuously."}
      </div>
    </div>
  );
};

export default LiveWire;
