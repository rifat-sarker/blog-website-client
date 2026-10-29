import { useEffect, useState } from "react";
import { editorialService } from "../../services/api";
import { RefreshCw, Radio, Filter } from "lucide-react";

const LiveWire = () => {
  const [wireList, setWireList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [lastCheck, setLastCheck] = useState(new Date());

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

  const categories = ["ALL", "COMPUTING", "INFRASTRUCTURE", "ENERGY", "STANDARDS", "AEROSPACE"];

  const filtered =
    activeCategory === "ALL"
      ? wireList
      : wireList.filter(
          (w) => w.category?.toUpperCase() === activeCategory.toUpperCase()
        );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 min-h-[75vh]">
      {/* Wire Masthead */}
      <div className="border-b-2 border-[#141414] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b91c1c] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#b91c1c] font-bold">
              The Real-Time Teleprinter
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#141414]">
            The Live Wire Bureau
          </h1>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#5e5a54] uppercase tracking-wider">
          <span>Synced: {lastCheck.toLocaleTimeString()}</span>
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

      {/* Wire Control Bar */}
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
          Showing {filtered.length} Dispatches
        </span>
      </div>

      {/* Dispatches Bulletin */}
      <div className="border-2 border-[#141414] bg-[#ffffff] divide-y divide-[#e8e4dc]">
        {filtered.map((wire, idx) => (
          <div key={wire.id || idx} className="p-6 space-y-2 hover:bg-[#faf8f5] transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-[#5e5a54] uppercase tracking-wider">
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-[#b91c1c]">[{wire.edition || `WIRE 0${idx + 1}`}]</span>
                <span className="bg-[#e8e4dc] px-1.5 py-0.5 text-[#141414] font-bold text-[10px]">
                  {wire.location}
                </span>
                <span>•</span>
                <span>{wire.category}</span>
              </div>
              <span>{wire.timestamp}</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#141414] font-normal leading-snug">
              {wire.headline}
            </h3>

            <div className="text-[11px] font-mono text-[#8c867c] flex items-center justify-between pt-1">
              <span>Verified Wire Dispatch • Direct Telemetry Feed</span>
              <span>Ref: 2026-DISP-0{idx + 1}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Colophon */}
      <div className="mt-8 p-4 border border-[#e8e4dc] bg-[#f4f1ea] text-center font-serif italic text-xs text-[#5e5a54]">
        The Live Wire transmits unadorned technical, infrastructural, and scientific bulletins continuously.
      </div>
    </div>
  );
};

export default LiveWire;

