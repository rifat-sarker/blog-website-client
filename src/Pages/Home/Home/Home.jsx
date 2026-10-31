import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { editorialService, getLocalized } from "../../../services/api";
import { useLanguage } from "../../../context/LanguageContext";
import { AuthContext } from "../../../providers/AuthProvider";
import { Bookmark } from "lucide-react";

const TOPICS = [
  "For you",
  "Technology",
  "Architecture",
  "Philosophy",
  "Engineering",
  "Programming",
  "Culture",
  "Design",
];

const Home = () => {
  const { currentLang } = useLanguage();
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [wireItems, setWireItems] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());
  const [activeTopic, setActiveTopic] = useState("For you");
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const [arts, wires, saved] = await Promise.all([
        editorialService.getArticles(),
        editorialService.getLiveWire(),
        editorialService.getSavedArticles(user?.email),
      ]);
      setArticles(arts);
      setWireItems(wires);
      const ids = new Set(saved.map((s) => s._id || s.id || s.blogId));
      setSavedIds(ids);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user?.email]);

  const handleToggleBookmark = async (article) => {
    const aId = article._id || article.id;
    const isCurrentlySaved = savedIds.has(aId);

    // Optimistic UI update
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (isCurrentlySaved) {
        next.delete(aId);
      } else {
        next.add(aId);
      }
      return next;
    });

    if (isCurrentlySaved) {
      await editorialService.removeSavedArticle(aId);
    } else {
      await editorialService.saveArticle(article, user?.email);
    }
  };

  const filteredArticles = articles.filter((a) => {
    if (activeTopic === "For you") return true;
    const cat = typeof a.category === "object" ? a.category.en : a.category;
    return cat?.toLowerCase() === activeTopic.toLowerCase();
  });

  return (
    <div className="max-w-[1336px] mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Main Feed Column (Left / 8 cols) */}
        <main className="lg:col-span-8 lg:pr-8">
          {/* Topic Navigation Bar */}
          <div className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto pb-3 sm:pb-4 mb-6 sm:mb-8 border-b border-[#f2f2f2] text-xs sm:text-sm text-[#6b6b6b] no-scrollbar">
            {TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`flex-shrink-0 transition-colors pb-2 -mb-2 border-b whitespace-nowrap ${
                  activeTopic === topic
                    ? "border-[#242424] text-[#242424] font-medium"
                    : "border-transparent hover:text-[#242424]"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="space-y-8 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-[#f2f2f2]">
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="h-4 w-28 bg-[#f0f0f0] rounded" />
                    <div className="h-6 w-3/4 bg-[#f0f0f0] rounded" />
                    <div className="h-4 w-full bg-[#f0f0f0] rounded" />
                  </div>
                  <div className="w-20 h-20 sm:w-36 sm:h-24 bg-[#f0f0f0] rounded flex-shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-[#f2f2f2]">
              {filteredArticles.map((article) => {
                const articleId = article._id || article.id;
                const title = getLocalized(article.title, currentLang);
                const sdesc = getLocalized(article.sdesc, currentLang);
                const category = getLocalized(article.category, currentLang) || "Essay";
                const readTime = getLocalized(article.readTime, currentLang) || "5 min read";
                const authorName = getLocalized(article.author?.name, currentLang) || "Rifat Sarker";
                const authorLoc = getLocalized(article.author?.location, currentLang) || "Dhaka Bureau";
                const isSaved = savedIds.has(articleId);

                return (
                  <article key={articleId} className="py-6 sm:py-8 first:pt-0">
                    <div className="flex flex-row justify-between items-start gap-3 sm:gap-6 md:gap-8">
                      {/* Story Text */}
                      <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
                        {/* Author Info */}
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#242424]">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                            alt={authorName}
                            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover flex-shrink-0"
                          />
                          <span className="font-medium truncate max-w-[120px] sm:max-w-none">{authorName}</span>
                          <span className="text-[#6b6b6b]">•</span>
                          <span className="text-[#6b6b6b] hidden sm:inline">{authorLoc}</span>
                          <span className="text-[#6b6b6b] sm:hidden">{category}</span>
                        </div>

                        {/* Title */}
                        <Link to={`/blog/${articleId}`} className="group block">
                          <h2 className="font-bold text-base sm:text-xl md:text-[22px] leading-snug sm:leading-[1.3] text-[#242424] group-hover:text-[#6b6b6b] transition-colors line-clamp-2">
                            {title}
                          </h2>
                        </Link>

                        {/* Subtitle */}
                        <p className="font-serif text-xs sm:text-sm md:text-[15px] text-[#6b6b6b] line-clamp-2 leading-relaxed">
                          {sdesc}
                        </p>

                        {/* Footer Meta: Read Time, Tag, Dynamic Bookmark */}
                        <div className="pt-2 sm:pt-3 flex items-center justify-between text-xs text-[#6b6b6b]">
                          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
                            <span>{readTime}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline bg-[#f2f2f2] px-2.5 py-1 rounded-full text-[#242424]">
                              {category}
                            </span>
                          </div>

                          {/* Dynamic Visual Bookmark Button */}
                          <button
                            onClick={() => handleToggleBookmark(article)}
                            className={`p-1.5 rounded transition-all flex items-center gap-1 ${
                              isSaved
                                ? "text-[#1a8917] bg-[#f0fdf4]"
                                : "text-[#6b6b6b] hover:text-[#242424] hover:bg-[#f9f9f9]"
                            }`}
                            title={isSaved ? "Saved to Reading List" : "Save story"}
                          >
                            <Bookmark
                              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.8] ${
                                isSaved ? "fill-[#1a8917] text-[#1a8917]" : ""
                              }`}
                            />
                            {isSaved && <span className="text-[11px] font-medium hidden sm:inline">Saved</span>}
                          </button>
                        </div>
                      </div>

                      {/* Story Thumbnail (Medium-Style Responsive Ratio) */}
                      {article.image && (
                        <Link
                          to={`/blog/${articleId}`}
                          className="flex-shrink-0 w-20 h-20 sm:w-32 sm:h-24 md:w-40 md:h-28 overflow-hidden rounded"
                        >
                          <img
                            src={article.image}
                            alt={title}
                            className="w-full h-full object-cover hover:opacity-95 transition-opacity"
                          />
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>

        {/* Medium Right Sidebar Column */}
        <aside className="lg:col-span-4 lg:border-l border-[#f2f2f2] lg:pl-10 space-y-10">
          {/* Live Wire Box */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#242424]">
              <span className="w-2 h-2 rounded-full bg-[#1a8917] animate-pulse" />
              <span>The Live Wire (Real-time updates)</span>
            </div>

            <div className="space-y-4">
              {wireItems.slice(0, 4).map((wire, idx) => (
                <div key={wire.id || idx} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-[#6b6b6b] font-mono">
                    <span className="font-semibold text-[#242424]">{wire.location}</span>
                    <span>{wire.timestamp}</span>
                  </div>
                  <Link
                    to="/live-wire"
                    className="block text-sm font-medium text-[#242424] hover:underline leading-snug"
                  >
                    {getLocalized(wire.headline, currentLang)}
                  </Link>
                </div>
              ))}
            </div>

            <Link
              to="/live-wire"
              className="inline-block text-xs text-[#1a8917] font-medium hover:underline pt-1"
            >
              See all live wire dispatches →
            </Link>
          </div>

          {/* Recommended Topics */}
          <div className="space-y-3 pt-6 border-t border-[#f2f2f2]">
            <h3 className="text-sm font-semibold text-[#242424]">Recommended topics</h3>
            <div className="flex flex-wrap gap-2">
              {["Technology", "Architecture", "Design", "Writing", "AI & NLP", "Philosophy"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTopic(tag)}
                    className="bg-[#f2f2f2] hover:bg-[#e6e6e6] text-xs text-[#242424] px-4 py-2 rounded-full transition-colors"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-[#f2f2f2] text-xs text-[#6b6b6b] space-y-2 leading-relaxed">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link to="/allBlog" className="hover:text-[#242424]">Help</Link>
              <Link to="/featuredBlog" className="hover:text-[#242424]">Status</Link>
              <Link to="/wishlist" className="hover:text-[#242424]">About</Link>
              <Link to="/addBlog" className="hover:text-[#242424]">Write</Link>
              <Link to="/" className="hover:text-[#242424]">Privacy</Link>
            </div>
            <p className="text-[11px] pt-1">© 2026 MixHub Press</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
