import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { editorialService, getLocalized } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { ArrowUpRight } from "lucide-react";

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const FeaturedBlog = () => {
  const { t, currentLang } = useLanguage();
  const [articles, setArticles] = useState([]);
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

  const ranked = [...articles]
    .sort((a, b) => {
      const lenA = a.words || 800;
      const lenB = b.words || 800;
      return lenB - lenA;
    })
    .slice(0, 10);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Masthead */}
      <div className="border-b-2 border-[#141414] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#b91c1c] font-bold block mb-1">
            {currentLang === "bn" ? "চিরন্তন সংগ্রহশালা" : "The Permanent Canon"}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#141414]">
            {t("theCanon")}
          </h1>
        </div>
        <p className="font-serif italic text-sm text-[#5e5a54] max-w-sm sm:text-right">
          {currentLang === "bn"
            ? "গবেষণার গভীরতা ও দীর্ঘস্থায়ী স্থাপত্যিক প্রামাণ্যতার ভিত্তিতে নির্বাচিত দশটি কালজয়ী প্রবন্ধ।"
            : "Ranked strictly by investigative depth, structural documentation, and comprehensive systems analysis."}
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-20 bg-[#e8e4dc]" />
          ))}
        </div>
      ) : (
        <div className="border border-[#141414] bg-[#ffffff] divide-y divide-[#e8e4dc]">
          {ranked.map((item, index) => {
            const localizedTitle = getLocalized(item.title, currentLang);
            const localizedCategory = getLocalized(item.category, currentLang);
            const localizedSdesc = getLocalized(item.sdesc, currentLang);
            const localizedAuthor = getLocalized(item.author?.name, currentLang);
            const localizedReadTime = getLocalized(item.readTime, currentLang);

            return (
              <div
                key={item._id || item.id || index}
                className="p-6 flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-6 hover:bg-[#faf8f5] transition-colors"
              >
                <div className="flex items-start gap-6 min-w-0">
                  {/* Roman Numeral */}
                  <div className="font-serif text-2xl font-bold text-[#b91c1c] w-10 flex-shrink-0">
                    {ROMAN_NUMERALS[index] || `${index + 1}`}
                  </div>

                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-3 text-[11px] font-mono text-[#5e5a54] uppercase tracking-wider">
                      <span className="font-bold text-[#141414]">[{localizedCategory || "Monograph"}]</span>
                      <span>•</span>
                      <span>{item.words || 850} {t("words")}</span>
                      <span>•</span>
                      <span>{localizedReadTime}</span>
                    </div>

                    <Link to={`/blog/${item._id || item.id}`}>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#141414] hover:underline leading-snug">
                        {localizedTitle}
                      </h3>
                    </Link>

                    <p className="font-serif text-xs text-[#5e5a54] leading-relaxed line-clamp-2">
                      {localizedSdesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-[#5e5a54] flex-shrink-0 self-end sm:self-center">
                  <span className="hidden md:inline">By {localizedAuthor || "Rifat Sarker"}</span>
                  <Link
                    to={`/blog/${item._id || item.id}`}
                    className="inline-flex items-center gap-1 border border-[#141414] px-3 py-1.5 text-[#141414] font-bold hover:bg-[#141414] hover:text-[#faf8f5] transition-colors"
                  >
                    {t("readEssay")} <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FeaturedBlog;
