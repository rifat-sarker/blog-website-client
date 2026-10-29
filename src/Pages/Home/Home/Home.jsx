import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { editorialService, getLocalized } from "../../../services/api";
import { useLanguage } from "../../../context/LanguageContext";
import { ArrowUpRight, Clock, Bookmark, Radio, ChevronRight, PenLine, Sparkles } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Newspaper Front Page Header Banner */}
      <div className="border-b-2 border-[#141414] pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#b91c1c] font-bold block mb-1">
            {t("frontPage")} • {t("liveTelemetry")}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#141414] italic">
            {t("tagline")}
          </h2>
        </div>
        <div className="text-right font-mono text-[11px] text-[#5e5a54] uppercase tracking-wider hidden sm:block">
          Printed & Distributed Digitally • 2026 Edition
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-8 animate-pulse py-12">
          <div className="h-96 bg-[#e8e4dc] rounded-sm" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-64 bg-[#e8e4dc] rounded-sm" />
            <div className="h-64 bg-[#e8e4dc] rounded-sm" />
            <div className="h-64 bg-[#e8e4dc] rounded-sm" />
          </div>
        </div>
      ) : (
        <>
          {/* Main Broadsheet Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-[#141414]">
            {/* Lead Story (Left & Center Columns) */}
            <article className="lg:col-span-8 space-y-6 lg:pr-8 lg:border-r border-[#e8e4dc]">
              {leadStory.kicker && (
                <div className="font-mono text-xs uppercase tracking-widest text-[#5e5a54]">
                  {getLocalized(leadStory.kicker, currentLang)}
                </div>
              )}

              <Link to={`/blog/${leadStory._id || leadStory.id}`} className="group block">
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#141414] leading-[1.08] tracking-tight group-hover:underline">
                  {getLocalized(leadStory.title, currentLang)}
                </h2>
              </Link>

              <div className="flex items-center gap-3 text-xs font-mono text-[#5e5a54] uppercase tracking-wider py-1 border-t border-b border-[#e8e4dc]">
                <span className="font-bold text-[#141414]">
                  {t("by")} {getLocalized(leadStory.author?.name, currentLang) || "Rifat Sarker"}
                </span>
                <span>•</span>
                <span>{getLocalized(leadStory.author?.location, currentLang) || "Dhaka"}</span>
                <span>•</span>
                <span>{getLocalized(leadStory.readTime, currentLang) || "7 min read"}</span>
              </div>

              {/* Cover Image in Classical Frame */}
              <div className="relative border border-[#141414] p-1 bg-[#ffffff]">
                <img
                  src={leadStory.image}
                  alt={getLocalized(leadStory.title, currentLang)}
                  className="w-full h-80 sm:h-96 object-cover filter contrast-[1.05]"
                />
                <div className="p-2 text-right font-serif italic text-xs text-[#5e5a54] border-t border-[#e8e4dc]">
                  Plate 01 — {getLocalized(leadStory.title, currentLang)}
                </div>
              </div>

              {/* Lede Paragraph with Drop Cap */}
              <p className="font-serif text-lg sm:text-xl text-[#2e2e2e] leading-relaxed drop-cap pt-2">
                {getLocalized(leadStory.sdesc, currentLang)}
              </p>

              <div className="pt-2">
                <Link
                  to={`/blog/${leadStory._id || leadStory.id}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-bold text-[#141414] hover:text-[#b91c1c] transition-colors"
                >
                  <span>{t("readEssay")}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </article>

            {/* Sidebar: The Live Wire & Editorial Notes (Right Column) */}
            <aside className="lg:col-span-4 space-y-8">
              {/* The Live Wire Box */}
              <div className="border-2 border-[#141414] p-5 bg-[#ffffff] space-y-4">
                <div className="flex items-center justify-between border-b border-[#141414] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#b91c1c] animate-pulse" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#141414]">
                      {t("theWire")}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#5e5a54] uppercase">
                    {t("autoUpdating")}
                  </span>
                </div>

                <div className="divide-y divide-[#e8e4dc] space-y-3">
                  {wireItems.slice(0, 5).map((wire, idx) => (
                    <div key={wire.id || idx} className="pt-3 first:pt-0 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#5e5a54]">
                        <span className="font-bold text-[#141414]">{wire.location}</span>
                        <span>{wire.timestamp}</span>
                      </div>
                      <Link to="/live-wire" className="block font-serif text-sm text-[#141414] leading-snug hover:underline">
                        {getLocalized(wire.headline, currentLang)}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#e8e4dc]">
                  <Link
                    to="/live-wire"
                    className="block text-center font-mono text-[11px] uppercase tracking-wider text-[#5e5a54] hover:text-[#141414] font-bold"
                  >
                    Open Live Wire Bureau →
                  </Link>
                </div>
              </div>

              {/* Publisher's Note */}
              <div className="border border-[#e8e4dc] p-5 bg-[#f4f1ea] space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#5e5a54] block">
                  Colophon & Intent
                </span>
                <h4 className="font-serif text-lg font-bold text-[#141414]">
                  {currentLang === "bn" ? "শান্ত পাঠের জন্য ডিজিটাল আশ্রয়স্থল" : "A Sanctuary for Mindful Reading"}
                </h4>
                <p className="font-serif italic text-sm text-[#5e5a54] leading-relaxed">
                  {currentLang === "bn"
                    ? "আমরা বাণিজ্যিক বিজ্ঞাপন, পপ-আপ এবং নোটিফিকেশনের বিরক্তি সম্পূর্ণ নিষিদ্ধ করেছি। মিক্সহাব ডিসপ্যাচ মুদ্রিত কাগজের শান্ত আবহে তাদের জন্য তৈরি যারা গভীর চিন্তা ভালোবাসেন।"
                    : '"We have banned algorithmic outrage, popups, and notification bell distractions. MixHub Dispatch is published on warm paper for those who cherish sustained contemplation."'}
                </p>
                <div className="font-mono text-xs text-[#141414] font-bold">
                  — The Editors
                </div>
              </div>

              {/* Quick Author Contribution Prompt */}
              <div className="border border-[#141414] p-5 text-center space-y-3 bg-[#ffffff]">
                <PenLine className="w-5 h-5 mx-auto text-[#141414]" />
                <h4 className="font-serif text-base font-bold text-[#141414]">
                  {t("authorStudio")}
                </h4>
                <p className="font-serif text-xs text-[#5e5a54] leading-relaxed">
                  {t("authorStudioDesc")}. Verified accreditation required.
                </p>
                <Link
                  to="/addBlog"
                  className="inline-block px-4 py-2 border border-[#141414] bg-[#141414] text-[#faf8f5] text-xs font-mono uppercase tracking-wider font-bold hover:bg-transparent hover:text-[#141414] transition-all"
                >
                  Enter Author Atelier
                </Link>
              </div>
            </aside>
          </div>

          {/* Secondary Broadsheet Section: 3-Column Editorial Grid */}
          <section className="pt-12 pb-16 border-b border-[#141414]">
            <div className="border-b border-[#141414] pb-2 mb-8 flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-[#141414]">
                Section II • Dispatches & Inquiries
              </h3>
              <span className="font-mono text-[11px] text-[#5e5a54] uppercase">
                Featured Essays
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#e8e4dc]">
              {secondaryStories.map((story, idx) => (
                <article
                  key={story._id || story.id || idx}
                  className={`space-y-4 ${idx > 0 ? "md:pl-8" : ""} pt-6 md:pt-0`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5e5a54] uppercase tracking-wider">
                    <span className="text-[#b91c1c] font-bold">{getLocalized(story.category, currentLang)}</span>
                    <span>{getLocalized(story.readTime, currentLang)}</span>
                  </div>

                  <Link to={`/blog/${story._id || story.id}`} className="group block">
                    <h4 className="font-serif text-2xl font-normal text-[#141414] leading-tight group-hover:underline">
                      {getLocalized(story.title, currentLang)}
                    </h4>
                  </Link>

                  <div className="relative border border-[#e8e4dc] p-0.5 bg-[#ffffff]">
                    <img
                      src={story.image}
                      alt={getLocalized(story.title, currentLang)}
                      className="w-full h-44 object-cover filter contrast-[1.02]"
                    />
                  </div>

                  <p className="font-serif text-sm text-[#5e5a54] leading-relaxed line-clamp-3">
                    {getLocalized(story.sdesc, currentLang)}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#5e5a54]">
                    <span>{t("by")} {getLocalized(story.author?.name, currentLang)}</span>
                    <Link
                      to={`/blog/${story._id || story.id}`}
                      className="text-[#141414] font-bold hover:underline"
                    >
                      Read →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Tertiary Section: The Archive Index */}
          <section className="pt-12 pb-8">
            <div className="flex items-center justify-between border-b border-[#141414] pb-2 mb-6">
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-[#141414]">
                Section III • The Chronological Index ({articles.length} Manuscripts)
              </h3>
              <Link
                to="/allBlog"
                className="font-mono text-xs uppercase tracking-wider font-bold text-[#141414] hover:underline"
              >
                Browse Complete Archive →
              </Link>
            </div>

            <div className="divide-y divide-[#e8e4dc]">
              {tertiaryStories.map((item, idx) => (
                <div
                  key={item._id || item.id || idx}
                  className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[#8c867c] w-8">
                      {idx + 5 < 10 ? `0${idx + 5}` : idx + 5}.
                    </span>
                    <Link
                      to={`/blog/${item._id || item.id}`}
                      className="font-serif text-lg text-[#141414] hover:underline"
                    >
                      {getLocalized(item.title, currentLang)}
                    </Link>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-[#5e5a54] pl-12 sm:pl-0">
                    <span>{getLocalized(item.author?.name, currentLang)}</span>
                    <span>•</span>
                    <span>{getLocalized(item.readTime, currentLang)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
