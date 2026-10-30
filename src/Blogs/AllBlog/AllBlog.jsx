import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { editorialService, getLocalized } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";
import { Search, X, Bookmark } from "lucide-react";

const SECTIONS = [
  "All Stories",
  "Technology",
  "Architecture",
  "Philosophy",
  "Engineering",
  "Culture",
];

const AllBlog = () => {
  const { currentLang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [articles, setArticles] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());
  const [activeSection, setActiveSection] = useState("All Stories");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      editorialService.getArticles(),
      editorialService.getSavedArticles(),
    ]).then(([data, saved]) => {
      if (isMounted) {
        setArticles(data || []);
        const ids = new Set((saved || []).map((s) => s._id || s.id || s.blogId));
        setSavedIds(ids);
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

  const handleToggleBookmark = async (article) => {
    const aId = article._id || article.id;
    const isCurrentlySaved = savedIds.has(aId);

    setSavedIds((prev) => {
      const next = new Set(prev);
      if (isCurrentlySaved) next.delete(aId);
      else next.add(aId);
      return next;
    });

    if (isCurrentlySaved) {
      await editorialService.removeSavedArticle(aId);
    } else {
      await editorialService.saveArticle(article);
    }
  };

  const filtered = articles
    .filter((a) => {
      if (activeSection === "All Stories") return true;
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
    setActiveSection("All Stories");
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      {/* Header */}
      <div className="pb-6 mb-8 border-b border-[#f2f2f2]">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#242424] mb-2 tracking-tight">
          Explore Stories
        </h1>
        <p className="text-sm text-[#6b6b6b]">
          Discover thoughtful essays, technical investigations, and independent ideas.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#6b6b6b] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stories..."
            className="w-full bg-[#f9f9f9] border border-[#e6e6e6] rounded-full pl-9 pr-8 py-2 text-sm text-[#242424] placeholder-[#6b6b6b] focus:outline-none focus:border-[#242424] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b6b] hover:text-[#242424]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Section Chips */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
          {SECTIONS.map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`px-3.5 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors ${
                activeSection === sec
                  ? "bg-[#242424] text-[#ffffff] font-medium"
                  : "bg-[#f2f2f2] text-[#6b6b6b] hover:text-[#242424]"
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Count Meta */}
      <div className="flex items-center justify-between text-xs text-[#6b6b6b] mb-6 pb-2 border-b border-[#f2f2f2]">
        <span>
          Showing {filtered.length} {filtered.length === 1 ? "story" : "stories"}
        </span>
        {(searchQuery || activeSection !== "All Stories") && (
          <button
            onClick={clearFilters}
            className="text-[#1a8917] hover:underline flex items-center gap-1 font-medium"
          >
            Clear filters <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Catalogue List */}
      {isLoading ? (
        <div className="space-y-6 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-28 bg-[#f9f9f9] rounded-lg" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="divide-y divide-[#f2f2f2]">
          {filtered.map((item, idx) => {
            const articleId = item._id || item.id || idx;
            const isSaved = savedIds.has(articleId);
            const title = getLocalized(item.title, currentLang);
            const sdesc = getLocalized(item.sdesc, currentLang);
            const authorName = getLocalized(item.author?.name, currentLang) || "Rifat Sarker";
            const readTime = getLocalized(item.readTime, currentLang) || "5 min read";
            const category = getLocalized(item.category, currentLang) || "Essay";

            return (
              <article key={articleId} className="py-7 first:pt-0">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#6b6b6b]">
                      <span className="text-[#242424] font-medium">{authorName}</span>
                      <span>•</span>
                      <span>{category}</span>
                    </div>

                    <Link to={`/blog/${articleId}`} className="group block">
                      <h2 className="font-bold text-xl leading-snug text-[#242424] group-hover:text-[#6b6b6b] transition-colors">
                        {title}
                      </h2>
                    </Link>

                    <p className="font-serif text-sm text-[#6b6b6b] line-clamp-2 leading-relaxed">
                      {sdesc}
                    </p>

                    <div className="pt-3 flex items-center justify-between text-xs text-[#6b6b6b]">
                      <span>{readTime}</span>
                      <button
                        onClick={() => handleToggleBookmark(item)}
                        className={`p-1.5 rounded transition-all flex items-center gap-1 ${
                          isSaved ? "text-[#1a8917] bg-[#f0fdf4]" : "text-[#6b6b6b] hover:text-[#242424]"
                        }`}
                        title={isSaved ? "Saved" : "Save story"}
                      >
                        <Bookmark
                          className={`w-4 h-4 stroke-[1.8] ${isSaved ? "fill-[#1a8917] text-[#1a8917]" : ""}`}
                        />
                        {isSaved && <span className="text-[11px] font-medium">Saved</span>}
                      </button>
                    </div>
                  </div>

                  {item.image && (
                    <Link to={`/blog/${articleId}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={title}
                        className="w-24 h-24 sm:w-32 sm:h-24 object-cover rounded-md"
                        loading="lazy"
                      />
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border border-[#f2f2f2] rounded-lg p-8 space-y-3 bg-[#fafafa]">
          <h3 className="font-serif text-lg text-[#242424]">No stories found</h3>
          <p className="text-sm text-[#6b6b6b]">
            Try adjusting your search keywords or resetting your section filters.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-[#242424] text-[#ffffff] text-xs font-medium rounded-full hover:bg-[#1a8917] transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBlog;
