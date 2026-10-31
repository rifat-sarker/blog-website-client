import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { editorialService, getLocalized } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { TrendingUp, Heart } from "lucide-react";

const FeaturedBlog = () => {
  const { currentLang } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    editorialService.getArticles().then((data) => {
      if (isMounted) {
        setArticles(data || []);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const ranked = [...articles]
    .sort((a, b) => (b.claps || 0) - (a.claps || 0))
    .slice(0, 10);

  return (
    <div className="max-w-[1000px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-12">
      {/* Header */}
      <div className="pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-[#f2f2f2]">
        <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a8917]" />
          <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#1a8917]">
            Trending & Top Stories
          </span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#242424] mb-1.5 sm:mb-2 tracking-tight">
          Featured Monographs
        </h1>
        <p className="text-xs sm:text-sm text-[#6b6b6b]">
          The most engaged, discussed, and carefully researched stories on MixHub.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-24 bg-[#f9f9f9] rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="divide-y divide-[#f2f2f2]">
          {ranked.map((item, index) => {
            const articleId = item._id || item.id || index;
            const localizedTitle = getLocalized(item.title, currentLang);
            const localizedCategory = getLocalized(item.category, currentLang) || "Story";
            const localizedSdesc = getLocalized(item.sdesc, currentLang);
            const localizedAuthor = getLocalized(item.author?.name, currentLang) || "Rifat Sarker";
            const localizedReadTime = getLocalized(item.readTime, currentLang) || "5 min read";

            return (
              <div
                key={articleId}
                className="py-5 sm:py-6 flex items-start gap-3 sm:gap-6 md:gap-8 first:pt-0"
              >
                {/* Ranking Number (Medium Trending 01, 02 style) */}
                <div className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-[#e6e6e6] w-7 sm:w-10 flex-shrink-0 select-none">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="space-y-1.5 sm:space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#6b6b6b]">
                    <span className="font-medium text-[#242424] truncate max-w-[120px] sm:max-w-none">{localizedAuthor}</span>
                    <span>•</span>
                    <span>{localizedCategory}</span>
                  </div>

                  <Link to={`/blog/${articleId}`} className="group block">
                    <h3 className="font-bold text-base sm:text-lg md:text-xl text-[#242424] group-hover:text-[#6b6b6b] leading-snug transition-colors line-clamp-2">
                      {localizedTitle}
                    </h3>
                  </Link>

                  <p className="font-serif text-xs sm:text-sm text-[#6b6b6b] leading-relaxed line-clamp-2">
                    {localizedSdesc}
                  </p>

                  <div className="pt-1 flex items-center gap-3 text-xs text-[#6b6b6b]">
                    <span className="text-[11px] sm:text-xs">{localizedReadTime}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[11px] sm:text-xs">
                      <Heart className="w-3.5 h-3.5 text-[#dc2626] fill-[#dc2626]" />
                      <span>{item.claps || 0} {item.claps === 1 ? "like" : "likes"}</span>
                    </span>
                  </div>
                </div>

                {item.image && (
                  <Link to={`/blog/${articleId}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={localizedTitle}
                      className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-md"
                      loading="lazy"
                    />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FeaturedBlog;
