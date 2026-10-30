import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { editorialService, getLocalized } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { motion, useScroll, useSpring } from "framer-motion";
import { Bookmark, Copy, Check, Printer, ArrowLeft, MessageSquare } from "lucide-react";

const BlogDetails = () => {
  const { id } = useParams();
  const { currentLang, t } = useLanguage();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    editorialService.getArticleById(id).then((data) => {
      if (isMounted && data) {
        setArticle(data);
        setIsLoading(false);
      }
    });

    const savedNotes = JSON.parse(localStorage.getItem(`notes_${id}`) || "[]");
    if (savedNotes.length > 0) {
      setNotes(savedNotes);
    } else {
      setNotes([
        {
          id: "note-1",
          author: currentLang === "bn" ? "সহযাত্রী পাঠক" : "Fellow Reader",
          date: currentLang === "bn" ? "অক্টোবর ২০২৬" : "October 2026",
          text:
            currentLang === "bn"
              ? "প্রবন্ধটির গভীর পর্যবেক্ষণ ও শান্ত উপস্থাপনা পাঠের জন্য অত্যন্ত আরামদায়ক।"
              : "The reflection and calm typographic pacing make this a joy to contemplate.",
        },
      ]);
    }

    return () => {
      isMounted = false;
    };
  }, [id, currentLang]);

  const handleSave = async () => {
    if (!article) return;
    await editorialService.saveArticle(article);
    setIsSaved(true);
  };

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const entry = {
      id: `n-${Date.now()}`,
      author: currentLang === "bn" ? "পাঠক" : "Reader",
      date: currentLang === "bn" ? "এইমাত্র" : "Just now",
      text: newNote.trim(),
    };

    const updated = [entry, ...notes];
    setNotes(updated);
    localStorage.setItem(`notes_${id}`, JSON.stringify(updated));
    setNewNote("");
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 space-y-6 animate-pulse">
        <div className="h-4 w-28 bg-[#ece5d8] rounded" />
        <div className="h-10 w-full bg-[#ece5d8] rounded" />
        <div className="h-6 w-3/4 bg-[#ece5d8] rounded" />
        <div className="h-64 w-full bg-[#ece5d8] rounded" />
      </div>
    );
  }

  const { kicker, title, sdesc, ldesc, image, author, date, readTime, words, edition } = article || {};

  const localizedTitle = getLocalized(title, currentLang);
  const localizedKicker = getLocalized(kicker, currentLang);
  const localizedSdesc = getLocalized(sdesc, currentLang);
  const localizedLdesc = getLocalized(ldesc, currentLang);
  const localizedAuthorName = getLocalized(author?.name, currentLang) || "Rifat Sarker";
  const localizedAuthorLoc = getLocalized(author?.location, currentLang) || "Dhaka Bureau";
  const localizedReadTime = getLocalized(readTime, currentLang) || "7 min read";
  const localizedEdition = getLocalized(edition, currentLang) || "MixHub Dispatch";

  const formattedDate = date
    ? new Date(date).toLocaleDateString(currentLang === "bn" ? "bn-BD" : "en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "October 2026";

  return (
    <>
      {/* Quiet Reading Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-[#1a1917] origin-left z-50 opacity-40"
        style={{ scaleX }}
      />

      <main className="py-10 sm:py-16 max-w-2xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb (Subtle & borderless) */}
        <div className="flex items-center justify-between pb-4 mb-6 text-xs text-[#8c8273]">
          <Link
            to="/"
            className="hover:text-[#1a1917] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t("frontPage")}</span>
          </Link>
          <span>{localizedEdition}</span>
        </div>

        {/* Article Masthead: Minimalist Medium / Substack Heading */}
        <header className="space-y-4 pb-6">
          {localizedKicker && (
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#b91c1c] font-medium">
              {localizedKicker}
            </div>
          )}

          {/* Simple, Regular-Weight Article Title */}
          <h1 className="font-serif text-3xl sm:text-4xl sm:leading-[1.2] font-normal text-[#1a1917] tracking-tight">
            {localizedTitle}
          </h1>

          {/* Subtitle / Lede Summary */}
          <p className="font-serif text-lg text-[#696359] leading-relaxed">
            {localizedSdesc}
          </p>

          {/* Author Byline & Meta */}
          <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#8c8273]">
            <div className="flex items-center gap-2">
              <span className="text-[#1a1917] font-medium">{localizedAuthorName}</span>
              <span>•</span>
              <span>{localizedAuthorLoc}</span>
              <span>•</span>
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <span>{localizedReadTime}</span>
              <span>•</span>
              <span>{words || 750} {t("words")}</span>
            </div>
          </div>
        </header>

        {/* Reading Action Bar (Thin, hairline rule) */}
        <div className="py-2.5 border-y border-[#ede6dc] mb-8 flex items-center justify-between text-xs text-[#8c8273]">
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              className={`flex items-center gap-1.5 hover:text-[#1a1917] transition-colors ${
                isSaved ? "text-[#b91c1c] font-medium" : ""
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
              <span>{isSaved ? t("saved") : t("saveToShelf")}</span>
            </button>

            <button
              onClick={handleCopyCitation}
              className="flex items-center gap-1.5 hover:text-[#1a1917] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#1a1917]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t("copied") : t("copyLink")}</span>
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 hover:text-[#1a1917] transition-colors"
            title="Clean Paper Print"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t("print")}</span>
          </button>
        </div>

        {/* Archival Plate Photo (Clean frame, no thick border) */}
        {image && (
          <figure className="mb-10">
            <img
              src={image}
              alt={localizedTitle}
              className="w-full max-h-[420px] object-cover rounded-sm"
            />
            <figcaption className="pt-2 text-right font-serif italic text-xs text-[#8c8273]">
              Archival accompaniment — MixHub Dispatch.
            </figcaption>
          </figure>
        )}

        {/* Article Body: Simple, Normal Weight, Non-Bold Typography (Medium / Substack Style) */}
        <div className="font-serif text-[#24211e] text-[18px] sm:text-[19px] leading-[1.8] space-y-6 font-normal">
          {localizedLdesc ? (
            localizedLdesc.split("\n\n").map((block, idx) => {
              if (block.startsWith("### ")) {
                return (
                  <h3
                    key={idx}
                    className="font-serif text-2xl font-normal text-[#1a1917] pt-6 pb-1 border-b border-[#ede6dc]"
                  >
                    {block.replace("### ", "")}
                  </h3>
                );
              }
              if (block.startsWith("```")) {
                const code = block.replace(/```[a-z]*/g, "").trim();
                return (
                  <div key={idx} className="my-6 rounded border border-[#e8e2d8] bg-[#f5f1ea] p-4">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#8c8273] mb-1.5 border-b border-[#e5dfd4] pb-1">
                      Code Manifest
                    </div>
                    <pre className="font-mono text-xs sm:text-sm text-[#1a1917] overflow-x-auto leading-relaxed">
                      <code>{code}</code>
                    </pre>
                  </div>
                );
              }
              // Normal, simple paragraph reading text (No chunky bold)
              return (
                <p key={idx} className="font-normal text-[#2b2825]">
                  {block}
                </p>
              );
            })
          ) : (
            <p>Essay text unavailable.</p>
          )}
        </div>

        {/* End of Essay Note (Subtle thin divider) */}
        <div className="my-12 pt-8 border-t border-[#ede6dc] text-center text-xs text-[#8c8273] font-serif italic">
          — Concluded dispatch from the editorial archive —
        </div>

        {/* Marginalia & Reader Notes (Clean & Minimal) */}
        <section className="mt-12 pt-6 border-t border-[#ede6dc] space-y-6">
          <div className="flex items-center gap-2 text-sm text-[#1a1917] font-serif">
            <MessageSquare className="w-4 h-4 text-[#8c8273]" />
            <h3 className="font-medium">
              {currentLang === "bn" ? "পাঠকের মন্তব্য ও চিন্তা" : "Reader Marginalia & Reflections"}
            </h3>
          </div>

          {/* Form */}
          <form onSubmit={handleAddNote} className="space-y-3">
            <textarea
              rows={3}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder={
                currentLang === "bn"
                  ? "এই প্রবন্ধ সম্পর্কে আপনার শান্ত প্রতিক্রিয়া লিপিবদ্ধ করুন..."
                  : "Inscribe your reflection or marginalia note on this manuscript..."
              }
              className="w-full bg-white/70 border border-[#e8e2d8] rounded p-3 font-serif text-sm text-[#1a1917] placeholder-[#a69e92] focus:outline-none focus:border-[#c2baa8] leading-relaxed"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#1a1917] text-white rounded text-xs font-mono uppercase tracking-wider hover:bg-[#383431] transition-colors"
              >
                {currentLang === "bn" ? "মন্তব্য যোগ করুন" : "Add Note"}
              </button>
            </div>
          </form>

          {/* Notes list */}
          <div className="space-y-3">
            {notes.map((n) => (
              <div key={n.id} className="p-4 rounded border border-[#ede6dc] bg-white/40 space-y-1">
                <div className="flex items-center justify-between text-xs text-[#8c8273]">
                  <span className="font-medium text-[#1a1917]">{n.author}</span>
                  <span>{n.date}</span>
                </div>
                <p className="font-serif text-sm text-[#3b3834] leading-relaxed pt-1">
                  {n.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogDetails;
