import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { editorialService, getLocalized } from "../../../services/api";
import { useLanguage } from "../../../context/LanguageContext";
import { ArrowUpRight } from "lucide-react";

const Home = () => {
  const { t, currentLang } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [wireItems, setWireItems] = useState([]);
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

  const leadStory = articles[0] || {};
  const secondaryStories = articles.slice(1, 4);
  const tertiaryStories = articles.slice(4);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Front Page Subtitle (Thin, subtle hairline rule) */}
      <div className="pb-6 mb-8 border-b border-[#ede6dc] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1a1917] italic">
          {t("tagline")}
        </h2>
        <span className="font-mono text-xs text-[#8c8273] uppercase tracking-wider">
          2026 Edition
        </span>
      </div>

      {isLoading ? (
        <div className="space-y-8 animate-pulse py-12">
          <div className="h-96 bg-[#ece5d8] rounded-sm" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-64 bg-[#ece5d8] rounded-sm" />
            <div className="h-64 bg-[#ece5d8] rounded-sm" />
            <div className="h-64 bg-[#ece5d8] rounded-sm" />
          </div>
        </div>
      ) : (
        <>
          {/* Main Grid: Clean & Distraction-Free */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#ede6dc]">
            {/* Lead Story */}
            <article className="lg:col-span-8 space-y-5 lg:pr-8 lg:border-r border-[#ede6dc]">
              {leadStory.kicker && (
                <div className="font-mono text-[11px] uppercase tracking-widest text-[#b91c1c] font-medium">
                  {getLocalized(leadStory.kicker, currentLang)}
                </div>
              )}

              <Link to={`/blog/${leadStory._id || leadStory.id}`} className="group block">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1a1917] leading-[1.15] tracking-tight group-hover:text-[#4a453f] transition-colors">
                  {getLocalized(leadStory.title, currentLang)}
                </h2>
              </Link>

              <div className="flex items-center gap-3 text-xs text-[#8c8273]">
                <span className="font-medium text-[#1a1917]">
                  {getLocalized(leadStory.author?.name, currentLang) || "Rifat Sarker"}
                </span>
                <span>•</span>
                <span>{getLocalized(leadStory.author?.location, currentLang) || "Dhaka"}</span>
                <span>•</span>
                <span>{getLocalized(leadStory.readTime, currentLang) || "7 min read"}</span>
              </div>

              {/* Cover Image Plate */}
              {leadStory.image && (
                <div className="relative overflow-hidden rounded">
                  <img
                    src={leadStory.image}
                    alt={getLocalized(leadStory.title, currentLang)}
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                </div>
              )}

              {/* Lede Paragraph: Regular font, clean text */}
              <p className="font-serif text-base sm:text-lg text-[#3b3834] leading-relaxed pt-1">
                {getLocalized(leadStory.sdesc, currentLang)}
              </p>

              <div>
                <Link
                  to={`/blog/${leadStory._id || leadStory.id}`}
                  className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[#1a1917] hover:text-[#b91c1c] transition-colors"
                >
                  <span>{t("readEssay")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>

            {/* Sidebar: Live Wire (Thin, clean card) */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="p-5 bg-white/70 rounded border border-[#ede6dc] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#ede6dc]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#b91c1c] animate-pulse" />
                    <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-[#1a1917]">
                      {t("theWire")}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#8c8273] uppercase">
                    {t("autoUpdating")}
                  </span>
                </div>

                <div className="divide-y divide-[#ede6dc] space-y-3">
                  {wireItems.slice(0, 5).map((wire, idx) => (
                    <div key={wire.id || idx} className="pt-3 first:pt-0 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#8c8273]">
                        <span className="font-medium text-[#1a1917]">{wire.location}</span>
                        <span>{wire.timestamp}</span>
                      </div>
                      <Link
                        to="/live-wire"
                        className="block font-serif text-sm text-[#2b2825] leading-snug hover:text-[#1a1917] hover:underline"
                      >
                        {getLocalized(wire.headline, currentLang)}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Secondary Story Columns (Your favorite Section II layout) */}
          {secondaryStories.length > 0 && (
            <section className="py-12 border-b border-[#ede6dc]">
              <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#ede6dc] text-xs font-mono uppercase tracking-widest text-[#8c8273]">
                <span>Section II • Dispatches & Inquiries</span>
                <span>Featured Essays</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {secondaryStories.map((story) => {
                  const storyId = story._id || story.id;
                  const title = getLocalized(story.title, currentLang);
                  const sdesc = getLocalized(story.sdesc, currentLang);
                  const category = getLocalized(story.category, currentLang);
                  const readTime = getLocalized(story.readTime, currentLang);
                  const author = getLocalized(story.author?.name, currentLang);

                  return (
                    <article key={storyId} className="flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#8c8273]">
                          <span className="text-[#b91c1c] font-medium">{category}</span>
                          <span>{readTime}</span>
                        </div>

                        <Link to={`/blog/${storyId}`} className="group block">
                          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1a1917] leading-snug group-hover:text-[#5e5852] transition-colors">
                            {title}
                          </h3>
                        </Link>

                        {story.image && (
                          <div className="overflow-hidden rounded">
                            <img
                              src={story.image}
                              alt={title}
                              className="w-full h-44 object-cover"
                            />
                          </div>
                        )}

                        <p className="font-serif text-sm text-[#4a453f] line-clamp-3 leading-relaxed">
                          {sdesc}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#8c8273] border-t border-[#ede6dc]">
                        <span>By {author || "Writer"}</span>
                        <Link
                          to={`/blog/${storyId}`}
                          className="font-medium text-[#1a1917] hover:underline"
                        >
                          Read →
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
