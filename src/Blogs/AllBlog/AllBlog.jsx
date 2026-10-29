import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { editorialService, getLocalized } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";
import { Search, X, ArrowUpRight } from "lucide-react";

const SECTIONS = [
  "All Sections",
  "Architecture",
  "Philosophy",
  "Engineering",
  "Culture",
  "Stillness",
];

const AllBlog = () => {
  const { t, currentLang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [articles, setArticles] = useState([]);
  const [activeSection, setActiveSection] = useState("All Sections");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    editorialService.getArticles().then((data) => {
      if (isMounted) {
        setArticles(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const filtered = articles
    .filter((a) => {
      if (activeSection === "All Sections") return true;
      const cat = typeof a.category === "object" ? a.category.en : a.category;
      return cat?.toLowerCase() === activeSection.toLowerCase();
    })
    .filter((a) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const title = getLocalized(a.title, currentLang).toLowerCase();
      const sdesc = getLocalized(a.sdesc, currentLang).toLowerCase();
      const author = getLocalized(a.author?.name, currentLang).toLowerCase();
      return title.includes(q) || sdesc.includes(q) || author.includes(q);
    });

  const clearFilters = () => {
    setActiveSection("All Sections");
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Archive Header */}
      <div className="border-b-2 border-[#141414] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#b91c1c] font-bold block mb-1">
            {currentLang === "bn" ? "সম্পূর্ণ প্রবন্ধ নির্ঘণ্ট" : "Complete Ledger"}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#141414]">
            {t("archive")}
          </h1>
        </div>
        <p className="font-serif italic text-sm text-[#5e5a54] max-w-sm sm:text-right">
          {currentLang === "bn"
            ? "প্রকাশিত সকল গবেষণা প্রবন্ধ, স্থাপত্য সমীক্ষা ও মননশীল চিন্তার কালানুক্রমিক সাধারণ সূচি।"
            : "A permanent chronological index of published essays, architectural monographs, and critical inquiries."}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="border border-[#141414] p-4 bg-[#ffffff] mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8c867c] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={currentLang === "bn" ? "প্রবন্ধ বা লেখক খুঁজুন..." : "Search by keywords, title, author..."}
            className="w-full bg-[#faf8f5] border border-[#e8e4dc] pl-9 pr-8 py-2 text-xs font-serif text-[#141414] placeholder-[#8c867c] focus:outline-none focus:border-[#141414]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8c867c] hover:text-[#141414]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Section Chips */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
          {SECTIONS.map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeSection === sec
                  ? "bg-[#141414] text-[#faf8f5] font-bold"
                  : "bg-[#faf8f5] text-[#5e5a54] hover:text-[#141414] border border-[#e8e4dc]"
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Count Meta */}
      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#5e5a54] mb-6 pb-2 border-b border-[#e8e4dc]">
        <span>
          {currentLang === "bn"
            ? `${filtered.length}টি প্রবন্ধ প্রদর্শিত হচ্ছে`
            : `Showing ${filtered.length} ${filtered.length === 1 ? "Dispatch" : "Dispatches"}`}
        </span>
        {(searchQuery || activeSection !== "All Sections") && (
          <button
            onClick={clearFilters}
            className="text-[#b91c1c] hover:underline flex items-center gap-1 font-bold"
          >
            Reset Filters <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Catalogue List */}
      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-16 bg-[#e8e4dc]" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="divide-y divide-[#e8e4dc] border-b border-[#e8e4dc]">
          {filtered.map((item, idx) => (
            <article
              key={item._id || item.id || idx}
              className="py-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4 group hover:bg-[#f4f1ea]/50 transition-colors px-2"
            >
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#5e5a54] uppercase tracking-wider">
                  <span className="font-bold text-[#b91c1c]">[{getLocalized(item.category, currentLang) || "Essay"}]</span>
                  <span>•</span>
                  <span>{getLocalized(item.readTime, currentLang) || "5 min read"}</span>
                  <span>•</span>
                  <span>{item.date ? new Date(item.date).toLocaleDateString(currentLang === "bn" ? "bn-BD" : "en-US") : "2026"}</span>
                </div>

                <Link to={`/blog/${item._id || item.id}`} className="block">
                  <h3 className="font-serif text-2xl font-normal text-[#141414] group-hover:underline leading-tight">
                    {getLocalized(item.title, currentLang)}
                  </h3>
                </Link>

                <p className="font-serif text-sm text-[#5e5a54] leading-relaxed line-clamp-2">
                  {getLocalized(item.sdesc, currentLang)}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-[#5e5a54] uppercase tracking-wider flex-shrink-0 self-start md:self-center">
                <span>By {getLocalized(item.author?.name, currentLang) || "Rifat Sarker"}</span>
                <Link
                  to={`/blog/${item._id || item.id}`}
                  className="inline-flex items-center gap-1 text-[#141414] font-bold hover:underline"
                >
                  {t("readEssay")} <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-[#e8e4dc] p-8 space-y-3 bg-[#ffffff]">
          <h3 className="font-serif text-xl text-[#141414]">No entries found in archive</h3>
          <p className="font-serif italic text-sm text-[#5e5a54]">
            Try adjusting your search keywords or resetting your section filters.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 border border-[#141414] bg-[#141414] text-[#faf8f5] text-xs font-mono uppercase tracking-wider font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBlog;
