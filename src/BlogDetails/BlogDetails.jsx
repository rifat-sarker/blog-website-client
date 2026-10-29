import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { editorialService } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { ArrowLeft, Bookmark, Check, Copy, Printer, Sparkles, MessageSquare, Send } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";

const BlogDetails = () => {
  const { id } = useParams();
  const { t } = useLanguage();
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
    window.scrollTo({ top: 0, behavior: "instant" });

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
          author: "Fellow Reader",
          date: "October 2026",
          text: "The reflection on determinism vs stochastic complexity captured the dilemma facing modern infrastructure engineers.",
        },
      ]);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

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
      author: "Reader",
      date: "Just now",
      text: newNote.trim(),
    };

    const updated = [entry, ...notes];
    setNotes(updated);
    localStorage.setItem(`notes_${id}`, JSON.stringify(updated));
    setNewNote("");
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 space-y-6 animate-pulse">
        <div className="h-4 w-32 bg-[#e8e4dc]" />
        <div className="h-12 w-full bg-[#e8e4dc]" />
        <div className="h-6 w-3/4 bg-[#e8e4dc]" />
        <div className="h-72 w-full bg-[#e8e4dc]" />
      </div>
    );
  }

  const { kicker, title, sdesc, ldesc, image, author, date, readTime, words, edition } = article || {};

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "October 2026";

  return (
    <>
      {/* Quiet Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#141414] origin-left z-50"
        style={{ scaleX }}
      />

      <main className="py-12 sm:py-16 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#e8e4dc] text-xs font-mono uppercase tracking-wider text-[#5e5a54]">
          <Link to="/" className="hover:text-[#141414] flex items-center gap-1.5 font-bold">
            <ArrowLeft className="w-3.5 h-3.5" /> {t("frontPage")}
          </Link>
          <span>{edition || "MixHub Dispatch"}</span>
        </div>

        {/* Article Masthead */}
        <header className="space-y-6 pb-8 border-b-2 border-[#141414]">
          {kicker && (
            <div className="font-mono text-xs uppercase tracking-widest text-[#b91c1c] font-bold">
              {kicker}
            </div>
          )}

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#141414] leading-[1.1] tracking-tight">
            {title}
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-[#5e5a54] leading-relaxed">
            {sdesc}
          </p>

          {/* Author Byline & Meta */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#e8e4dc] text-xs font-mono text-[#5e5a54] uppercase tracking-wider">
            <div>
              <span className="font-bold text-[#141414]">{t("by")} {author?.name || "Rifat Sarker"}</span>
              <span className="mx-2">•</span>
              <span>{author?.location || "Dhaka"}</span>
              <span className="mx-2">•</span>
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-3">
              <span>{readTime || "6 min read"}</span>
              <span>•</span>
              <span>{words || 750} {t("words")}</span>
            </div>
          </div>
        </header>

        {/* Quiet Reading Action Bar */}
        <div className="py-3 border-b border-[#e8e4dc] mb-10 flex items-center justify-between text-xs font-mono text-[#5e5a54] uppercase tracking-wider">
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              className={`flex items-center gap-1.5 hover:text-[#141414] transition-colors ${
                isSaved ? "text-[#b91c1c] font-bold" : ""
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
              <span>{isSaved ? t("saved") : t("saveToShelf")}</span>
            </button>

            <button
              onClick={handleCopyCitation}
              className="flex items-center gap-1.5 hover:text-[#141414] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#141414]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t("copied") : t("copyLink")}</span>
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 hover:text-[#141414] transition-colors"
            title="Clean Paper Print"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t("print")}</span>
          </button>
        </div>

        {/* Editorial Image Plate */}
        {image && (
          <figure className="mb-12 border border-[#141414] p-1 bg-[#ffffff]">
            <img
              src={image}
              alt={title}
              className="w-full max-h-[460px] object-cover filter contrast-[1.03]"
            />
            <figcaption className="p-3 text-right font-serif italic text-xs text-[#5e5a54] border-t border-[#e8e4dc]">
              Archival Plate • Documentary visual accompaniment for MixHub Dispatch.
            </figcaption>
          </figure>
        )}

        {/* Article Body Content: Crisp Serif Text Designed for Sustained Reading */}
        <div className="font-serif text-[#141414] text-lg sm:text-[19px] leading-[1.85] space-y-6 pt-2">
          {ldesc ? (
            ldesc.split("\n\n").map((block, idx) => {
              if (block.startsWith("### ")) {
                return (
                  <h3
                    key={idx}
                    className="font-serif text-2xl sm:text-3xl font-bold text-[#141414] pt-8 pb-2 border-b border-[#e8e4dc]"
                  >
                    {block.replace("### ", "")}
                  </h3>
                );
              }
              if (block.startsWith("```")) {
                const code = block.replace(/```[a-z]*/g, "").trim();
                return (
                  <div key={idx} className="my-8 border border-[#141414] bg-[#f4f1ea] p-5">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[#5e5a54] mb-2 border-b border-[#e8e4dc] pb-1">
                      Code Manifest • Plain Implementation
                    </div>
                    <pre className="font-mono text-xs sm:text-sm text-[#141414] overflow-x-auto leading-relaxed">
                      <code>{code}</code>
                    </pre>
                  </div>
                );
              }
              return (
                <p key={idx} className={idx === 0 ? "drop-cap" : ""}>
                  {block}
                </p>
              );
            })
          ) : (
            <p>Essay text unavailable.</p>
          )}
        </div>

        {/* End of Essay Seal Mark */}
        <div className="my-16 py-8 border-t border-b border-[#141414] text-center space-y-2">
          <div className="w-8 h-8 mx-auto border border-[#b91c1c] text-[#b91c1c] font-serif font-bold flex items-center justify-center text-sm">
            M
          </div>
          <div className="font-serif italic text-xs text-[#5e5a54]">
            End of Dispatch • Published in the Autumn 2026 Broadsheet
          </div>
        </div>

        {/* Reader Marginalia / Community Notes */}
        <section className="mt-12 space-y-6">
          <div className="flex items-center justify-between border-b border-[#141414] pb-2">
            <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-[#141414]">
              Marginalia & Reader Notes ({notes.length})
            </h3>
            <span className="font-mono text-[11px] text-[#5e5a54]">
              Reflections on this text
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleAddNote} className="border border-[#141414] p-4 bg-[#ffffff] space-y-3">
            <label className="block font-mono text-[11px] uppercase tracking-wider text-[#5e5a54]">
              Add a Reflective Note to the Margin
            </label>
            <textarea
              rows={3}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Contribute your architectural perspective or historical reference..."
              className="w-full bg-[#faf8f5] border border-[#e8e4dc] p-3 text-sm font-serif text-[#141414] placeholder-[#8c867c] focus:outline-none focus:border-[#141414] resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newNote.trim()}
                className="px-4 py-2 border border-[#141414] bg-[#141414] text-[#faf8f5] text-xs font-mono uppercase tracking-wider font-bold hover:bg-transparent hover:text-[#141414] transition-all disabled:opacity-40"
              >
                Inscribe Note
              </button>
            </div>
          </form>

          {/* Notes Ledger */}
          <div className="divide-y divide-[#e8e4dc]">
            {notes.map((note) => (
              <div key={note.id} className="py-4 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-[#5e5a54]">
                  <span className="font-bold text-[#141414]">{note.author}</span>
                  <span>{note.date}</span>
                </div>
                <p className="font-serif text-sm text-[#2e2e2e] leading-relaxed">
                  {note.text}
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
