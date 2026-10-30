import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { editorialService, getLocalized } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { Bookmark, MessageCircle, Share2, MoreHorizontal, ArrowLeft } from "lucide-react";

const BlogDetails = () => {
  const { id } = useParams();
  const { currentLang, t } = useLanguage();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [claps, setClaps] = useState(48);
  const [hasClapped, setHasClapped] = useState(false);
  const [responses, setResponses] = useState([]);
  const [newResponse, setNewResponse] = useState("");

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
      setResponses(savedNotes);
    } else {
      setResponses([
        {
          id: "res-1",
          author: currentLang === "bn" ? "সহযাত্রী পাঠক" : "Sarah Jenkins",
          date: currentLang === "bn" ? "২ দিন আগে" : "2 days ago",
          text:
            currentLang === "bn"
              ? "অত্যন্ত গভীর ও সময়োপযোগী ভাবনা। সফটওয়্যার আর্কিটেকচারে এমন স্বচ্ছতা সত্যিই প্রয়োজন।"
              : "This resonated so deeply with our team's recent transition back to deterministic monoliths. Beautifully written.",
        },
      ]);
    }

    return () => {
      isMounted = false;
    };
  }, [id, currentLang]);

  const handleClap = () => {
    setClaps((prev) => prev + 1);
    setHasClapped(true);
  };

  const handleSave = async () => {
    if (!article) return;
    await editorialService.saveArticle(article);
    setIsSaved(true);
  };

  const handleAddResponse = (e) => {
    e.preventDefault();
    if (!newResponse.trim()) return;

    const entry = {
      id: `res-${Date.now()}`,
      author: currentLang === "bn" ? "পাঠক" : "Reader",
      date: currentLang === "bn" ? "এইমাত্র" : "Just now",
      text: newResponse.trim(),
    };

    const updated = [entry, ...responses];
    setResponses(updated);
    localStorage.setItem(`notes_${id}`, JSON.stringify(updated));
    setNewResponse("");
  };

  if (isLoading) {
    return (
      <div className="max-w-[680px] mx-auto px-4 py-20 space-y-6 animate-pulse">
        <div className="h-10 w-3/4 bg-[#f0f0f0] rounded" />
        <div className="h-5 w-1/2 bg-[#f0f0f0] rounded" />
        <div className="h-72 w-full bg-[#f0f0f0] rounded" />
      </div>
    );
  }

  const { kicker, title, sdesc, ldesc, image, author, date, readTime, words } = article || {};

  const localizedTitle = getLocalized(title, currentLang);
  const localizedKicker = getLocalized(kicker, currentLang);
  const localizedSdesc = getLocalized(sdesc, currentLang);
  const localizedLdesc = getLocalized(ldesc, currentLang);
  const localizedAuthorName = getLocalized(author?.name, currentLang) || "Rifat Sarker";
  const localizedAuthorLoc = getLocalized(author?.location, currentLang) || "Dhaka";
  const localizedReadTime = getLocalized(readTime, currentLang) || "7 min read";

  const formattedDate = date
    ? new Date(date).toLocaleDateString(currentLang === "bn" ? "bn-BD" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Oct 28, 2026";

  return (
    <article className="max-w-[680px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Title */}
      <h1 className="text-3xl sm:text-[40px] leading-[1.2] font-bold text-[#242424] tracking-tight">
        {localizedTitle}
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-lg sm:text-xl text-[#6b6b6b] leading-relaxed">
        {localizedSdesc}
      </p>

      {/* Medium Author Header Card */}
      <div className="mt-8 flex items-center justify-between pb-6 border-b border-[#f2f2f2]">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt={localizedAuthorName}
            className="w-11 h-11 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-[#242424]">{localizedAuthorName}</span>
              <button className="text-xs text-[#1a8917] font-medium hover:text-[#156d12]">
                Follow
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#6b6b6b] pt-0.5">
              <span>{localizedReadTime}</span>
              <span>•</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-4 text-[#6b6b6b]">
          <button onClick={handleSave} className="hover:text-[#242424] transition-colors" title="Save story">
            <Bookmark className={`w-5 h-5 stroke-[1.5] ${isSaved ? "fill-[#242424] text-[#242424]" : ""}`} />
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="hover:text-[#242424] transition-colors"
            title="Copy link"
          >
            <Share2 className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Article Cover Image */}
      {image && (
        <figure className="my-10">
          <img
            src={image}
            alt={localizedTitle}
            className="w-full max-h-[440px] object-cover rounded"
          />
        </figure>
      )}

      {/* Medium Signature Reading Typography: 20px, 1.75 line-height, Source Serif / Charter */}
      <div className="font-medium-serif text-[#242424] text-[19px] sm:text-[21px] leading-[1.8] space-y-7">
        {localizedLdesc ? (
          localizedLdesc.split("\n\n").map((block, idx) => {
            if (block.startsWith("### ")) {
              return (
                <h2
                  key={idx}
                  className="font-sans font-bold text-2xl sm:text-[26px] text-[#242424] pt-8 pb-1 tracking-tight"
                >
                  {block.replace("### ", "")}
                </h2>
              );
            }
            if (block.startsWith("```")) {
              const code = block.replace(/```[a-z]*/g, "").trim();
              return (
                <pre
                  key={idx}
                  className="my-8 rounded bg-[#f9f9f9] border border-[#f2f2f2] p-4 sm:p-5 font-mono text-xs sm:text-sm text-[#242424] overflow-x-auto leading-relaxed"
                >
                  <code>{code}</code>
                </pre>
              );
            }
            return (
              <p key={idx} className="font-normal">
                {block}
              </p>
            );
          })
        ) : (
          <p>Essay text unavailable.</p>
        )}
      </div>

      {/* Medium Clap & Response Action Bar */}
      <div className="mt-14 py-4 border-y border-[#f2f2f2] flex items-center justify-between text-[#6b6b6b] text-sm">
        <div className="flex items-center gap-6">
          {/* Clap Icon */}
          <button
            onClick={handleClap}
            className={`flex items-center gap-1.5 transition-colors ${
              hasClapped ? "text-[#1a8917] font-semibold" : "hover:text-[#242424]"
            }`}
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M11.37 2.19a.75.75 0 0 1 .76.04l8 6a.75.75 0 0 1 .15 1.04l-4 5.5a.75.75 0 0 1-.95.23l-3.33-1.66-2.5 3.33a.75.75 0 0 1-1.05.15l-6-4.5a.75.75 0 0 1-.15-1.04l6-8a.75.75 0 0 1 1.07-.09z"/>
            </svg>
            <span>{claps}</span>
          </button>

          {/* Response Count */}
          <div className="flex items-center gap-1.5 hover:text-[#242424] transition-colors cursor-pointer">
            <MessageCircle className="w-5 h-5 stroke-[1.5]" />
            <span>{responses.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={handleSave} className="hover:text-[#242424] transition-colors">
            <Bookmark className={`w-5 h-5 stroke-[1.5] ${isSaved ? "fill-[#242424] text-[#242424]" : ""}`} />
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="hover:text-[#242424] transition-colors"
          >
            <Share2 className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Medium Responses (Comments) Section */}
      <section className="mt-12 space-y-6">
        <h3 className="font-sans font-bold text-xl text-[#242424]">
          Responses ({responses.length})
        </h3>

        {/* Input box */}
        <form onSubmit={handleAddResponse} className="rounded-lg border border-[#f2f2f2] p-4 shadow-sm space-y-3">
          <textarea
            rows={3}
            value={newResponse}
            onChange={(e) => setNewResponse(e.target.value)}
            placeholder="What are your thoughts?"
            className="w-full text-sm font-sans placeholder-[#6b6b6b] text-[#242424] outline-none resize-none"
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              disabled={!newResponse.trim()}
              className="text-xs font-medium px-4 py-1.5 rounded-full medium-btn-green disabled:opacity-40"
            >
              Respond
            </button>
          </div>
        </form>

        {/* Response List */}
        <div className="space-y-4 pt-4 divide-y divide-[#f2f2f2]">
          {responses.map((res) => (
            <div key={res.id} className="pt-4 first:pt-0 space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-[#242424]">{res.author}</span>
                <span className="text-[#6b6b6b]">•</span>
                <span className="text-[#6b6b6b]">{res.date}</span>
              </div>
              <p className="font-sans text-sm text-[#242424] leading-relaxed">
                {res.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default BlogDetails;
