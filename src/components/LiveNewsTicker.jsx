import { useEffect, useState } from "react";
import { editorialService, getLocalized } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { Radio, ArrowUpRight, RefreshCw, X, ChevronRight, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LiveNewsTicker = () => {
  const { currentLang, t } = useLanguage();
  const [wireList, setWireList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchWire = async () => {
    setIsRefreshing(true);
    const data = await editorialService.getLiveWire();
    setWireList(data);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  useEffect(() => {
    fetchWire();
    const interval = setInterval(fetchWire, 35000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (wireList.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wireList.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [wireList]);

  const currentItem = wireList[currentIndex] || {
    headline: {
      en: "Connecting to real-time dispatch teleprinter...",
      bn: "রিয়েল-টাইম টেলিপ্রিন্টারের সাথে সংযোগ স্থাপন করা হচ্ছে...",
    },
    timestamp: "LIVE",
    category: { en: "WIRE", bn: "ওয়্যার" },
    location: "GLOBAL",
    report: {
      en: "Live telemetry stream active.",
      bn: "সরাসরি টেলিমেট্রি সম্প্রচার সক্রিয়।",
    },
  };

  const currentHeadline = getLocalized(currentItem.headline, currentLang);

  return (
    <>
      {/* Newspaper Wire Banner */}
      <div className="w-full bg-[#f4f1ea] border-b border-[#e8e4dc] py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Wire Label with Vermilion Dot */}
          <div className="flex items-center gap-2 flex-shrink-0 font-sans">
            <span className="w-2 h-2 rounded-full bg-[#b91c1c] animate-pulse" />
            <span className="font-semibold tracking-wider text-[#b91c1c] text-[11px] uppercase">
              {t("theWire")}
            </span>
            <span className="text-[#8c867c] hidden sm:inline">/</span>
            <span className="text-[#5e5a54] text-[11px] hidden sm:inline">
              {t("liveTelemetry")}
            </span>
          </div>

          {/* Cycling Wire Headline */}
          <div className="flex-1 overflow-hidden min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2 truncate cursor-pointer hover:underline text-[#141414] font-sans"
                onClick={() => setModalOpen(true)}
              >
                <span className="text-[10px] uppercase tracking-wider text-[#5e5a54] bg-[#e8e4dc] px-1.5 py-0.5 rounded-sm font-medium">
                  {currentItem.location || "WIRE"} • {currentItem.timestamp}
                </span>
                <span className="font-serif italic text-sm text-[#141414] truncate font-medium">
                  {currentHeadline}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action */}
          <div className="flex-shrink-0 flex items-center gap-2 font-sans">
            <button
              onClick={() => setModalOpen(true)}
              className="text-[11px] uppercase tracking-wider text-[#5e5a54] hover:text-[#141414] underline flex items-center gap-1 font-semibold"
            >
              <span>{currentLang === "bn" ? `সব দেখুন (${wireList.length})` : `View All (${wireList.length})`}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Broadsheet Wire Modal / Ledger */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141414]/60 backdrop-blur-sm">
          <div className="bg-[#faf8f5] border-2 border-[#141414] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#141414] flex items-center justify-between bg-[#f4f1ea]">
              <div>
                <div className="flex items-center gap-2 mb-1 font-sans">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#b91c1c] animate-pulse" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#b91c1c]">
                    {currentLang === "bn" ? "টেলিপ্রিন্টার লগ" : "Teleprinter Log"}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#141414]">
                  {t("theWire")}
                </h3>
                <p className="font-serif italic text-xs text-[#5e5a54] mt-0.5">
                  {currentLang === "bn"
                    ? "বিশ্বব্যাপী প্রযুক্তি ও অবকাঠামো গবেষণা কেন্দ্রের সরাসরি সম্প্রচারিত বুলেটিন ও পূর্ণাঙ্গ রিপোর্ট।"
                    : "Continuous incoming dispatches from global technical and economic centers."}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchWire}
                  disabled={isRefreshing}
                  className="p-1.5 border border-[#141414] hover:bg-[#141414] hover:text-[#faf8f5] transition-colors"
                  title="Reload Wire"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 border border-[#141414] hover:bg-[#141414] hover:text-[#faf8f5] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Dispatches List with Full Reports */}
            <div className="p-6 overflow-y-auto divide-y divide-[#e8e4dc] space-y-4">
              {wireList.map((item, idx) => {
                const localizedCategory = getLocalized(item.category, currentLang);
                const localizedHeadline = getLocalized(item.headline, currentLang);
                const localizedReport = getLocalized(item.report, currentLang);

                return (
                  <div key={item.id || idx} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-sans font-medium text-[#5e5a54]">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#141414]">[{item.edition || `WIRE 0${idx + 1}`}]</span>
                        <span className="bg-[#e8e4dc] px-1.5 py-0.5 uppercase tracking-wider text-[10px] text-[#141414] font-medium rounded">
                          {item.location || "GLOBAL"}
                        </span>
                        <span>•</span>
                        <span>{localizedCategory}</span>
                      </div>
                      <span>{item.timestamp}</span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-[#141414] leading-snug">
                      {localizedHeadline}
                    </h4>

                    {localizedReport && (
                      <p className="font-serif text-sm text-[#5e5a54] leading-relaxed bg-[#f4f1ea] p-3 border-l-2 border-[#141414]">
                        {localizedReport}
                      </p>
                    )}

                    {item.url && (
                      <div className="pt-1 flex items-center justify-between text-xs font-sans text-[#5e5a54]">
                        {item.points !== undefined ? <span>▲ {item.points} points • {item.numComments || 0} comments</span> : <span />}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#b91c1c] hover:underline font-semibold"
                        >
                          <span>{currentLang === "bn" ? "মূল সূত্র পড়ুন" : "Read Original Source"}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#f4f1ea] border-t border-[#141414] flex items-center justify-between text-xs font-sans text-[#5e5a54]">
              <span>Verified Wire Stream • 2026 Telecommunications Edition</span>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-1.5 border border-[#141414] bg-[#141414] text-[#faf8f5] uppercase tracking-wider text-[11px] font-semibold hover:bg-transparent hover:text-[#141414] transition-colors"
              >
                Close Wire
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveNewsTicker;
