import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { editorialService, getLocalized } from "../../../services/api";
import { useLanguage } from "../../../context/LanguageContext";
import { Bookmark, Sparkles, TrendingUp } from "lucide-react";

const TOPICS = [
  "For you",
  "Technology",
  "Architecture",
  "Philosophy",
  "Engineering",
  "Programming",
  "Productivity",
];

const Home = () => {
  const { t, currentLang } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [wireItems, setWireItems] = useState([]);
  const [activeTopic, setActiveTopic] = useState("For you");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      editorialService.getArticles(),
      editorialService.getLiveWire(),
    ]).then(([arts, wires]) => {
      if (isMounted) {
        setArticles(arts);
        setWireItems(wires);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredArticles = articles.filter((a) => {
    if (activeTopic === "For you") return true;
    const cat = typeof a.category === "object" ? a.category.en : a.category;
    return cat?.toLowerCase() === activeTopic.toLowerCase();
  });

  return (
    <div className="max-w-[1336px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Feed Column (Left / 8 cols) */}
        <main className="lg:col-span-8 lg:pr-8">
          {/* Medium Topic Navigation Bar */}
          <div className="flex items-center space-x-6 overflow-x-auto pb-4 mb-8 border-b border-[#f2f2f2] text-sm text-[#6b6b6b] no-scrollbar">
            {TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`flex-shrink-0 transition-colors pb-2 -mb-2 border-b ${
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
            <div className="space-y-10 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex justify-between gap-6 pb-8 border-b border-[#f2f2f2]">
                  <div className="space-y-3 flex-1">
                    <div className="h-4 w-32 bg-[#f0f0f0] rounded" />
                    <div className="h-6 w-3/4 bg-[#f0f0f0] rounded" />
                    <div className="h-4 w-full bg-[#f0f0f0] rounded" />
                  </div>
                  <div className="w-28 h-20 bg-[#f0f0f0] rounded" />
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
                const authorLoc = getLocalized(article.author?.location, currentLang) || "Dhaka";

                return (
                  <article key={articleId} className="py-8 first:pt-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-8">
                      {/* Story Text */}
                      <div className="flex-1 space-y-2">
                        {/* Author Info & Publication Meta */}
                        <div className="flex items-center gap-2 text-xs text-[#242424]">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                            alt={authorName}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="font-medium">{authorName}</span>
                          <span className="text-[#6b6b6b]">•</span>
                          <span className="text-[#6b6b6b]">{authorLoc}</span>
                        </div>

                        {/* Title: Medium Bold/Medium Serif Title */}
                        <Link to={`/blog/${articleId}`} className="group block">
                          <h2 className="font-bold text-xl sm:text-[22px] leading-[1.3] text-[#242424] group-hover:text-[#6b6b6b] transition-colors">
                            {title}
                          </h2>
                        </Link>

                        {/* Subtitle / Excerpt */}
                        <p className="font-serif text-sm sm:text-[15px] text-[#6b6b6b] line-clamp-2 leading-relaxed">
                          {sdesc}
                        </p>

                        {/* Footer Meta: Date, Read Time, Tag, Bookmark */}
                        <div className="pt-3 flex items-center justify-between text-xs text-[#6b6b6b]">
                          <div className="flex items-center gap-3">
                            <span>{readTime}</span>
                            <span>•</span>
                            <span className="bg-[#f2f2f2] px-2.5 py-1 rounded-full text-[#242424]">
                              {category}
                            </span>
                          </div>

                          <button
                            onClick={() => editorialService.saveArticle(article)}
                            className="text-[#6b6b6b] hover:text-[#242424] transition-colors p-1"
                            title="Save to Reading List"
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Story Thumbnail (Medium 112x112 / 160x106 responsive square/rect) */}
                      {article.image && (
                        <Link
                          to={`/blog/${articleId}`}
                          className="flex-shrink-0 w-28 h-20 sm:w-40 sm:h-28 overflow-hidden rounded"
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

        {/* Medium Right Sidebar Column (4 cols) */}
        <aside className="lg:col-span-4 lg:border-l border-[#f2f2f2] lg:pl-10 space-y-10">
          {/* Live Wire Box (Substack / Medium Staff Picks style) */}
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

          {/* Recommended Topics (Medium Tag Cloud) */}
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

          {/* Medium Minimal Sidebar Footer */}
          <div className="pt-6 border-t border-[#f2f2f2] text-xs text-[#6b6b6b] space-y-2 leading-relaxed">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link to="/allBlog" className="hover:text-[#242424]">Help</Link>
              <Link to="/featuredBlog" className="hover:text-[#242424]">Status</Link>
              <Link to="/wishlist" className="hover:text-[#242424]">About</Link>
              <Link to="/addBlog" className="hover:text-[#242424]">Careers</Link>
              <Link to="/" className="hover:text-[#242424]">Privacy</Link>
              <Link to="/" className="hover:text-[#242424]">Terms</Link>
            </div>
            <p className="text-[11px] pt-1">© 2026 MixHub (Medium Clone Edition)</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
