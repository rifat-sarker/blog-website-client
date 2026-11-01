import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { editorialService, getLocalized } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { AuthContext } from "../providers/AuthProvider";
import { Bookmark, MessageCircle, Share2, Check, Heart, User } from "lucide-react";

const BlogDetails = () => {
  const { id } = useParams();
  const { currentLang, setCurrentLang } = useLanguage();
  const { user } = useContext(AuthContext);
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [claps, setClaps] = useState(0);

  // Initialize like state from localStorage so it persists across page refresh
  const [isLiked, setIsLiked] = useState(() => {
    try {
      const liked = JSON.parse(localStorage.getItem("mixhub_liked_articles") || "[]");
      return liked.includes(id);
    } catch {
      return false;
    }
  });

  const [responses, setResponses] = useState([]);
  const [newResponse, setNewResponse] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const currentUserName =
    user?.displayName ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "";
  const currentUserAvatar =
    user?.photoURL ||
    user?.avatar ||
    "";

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    editorialService.getArticleById(id).then((data) => {
      if (isMounted && data) {
        setArticle(data);
        setClaps(data.claps || 0);
        setResponses(data.comments || []);
        setIsLoading(false);

        try {
          const liked = JSON.parse(localStorage.getItem("mixhub_liked_articles") || "[]");
          if (liked.includes(id) || (data._id && liked.includes(data._id))) {
            setIsLiked(true);
          }
        } catch {
          // ignore
        }
      }
    });

    editorialService.getSavedArticles().then((savedList) => {
      const exists = savedList.some((s) => (s._id || s.id || s.blogId) === id);
      if (isMounted) setIsSaved(exists);
    });

    return () => {
      isMounted = false;
    };
  }, [id, currentLang]);

  // Dynamic Live Like / Heart (Backend & LocalStorage Persisted)
  const handleLike = async () => {
    const nextLiked = !isLiked;
    const nextClaps = nextLiked ? claps + 1 : Math.max(0, claps - 1);
    setClaps(nextClaps);
    setIsLiked(nextLiked);

    try {
      const liked = JSON.parse(localStorage.getItem("mixhub_liked_articles") || "[]");
      const targetIds = [id, article?._id, article?.id].filter(Boolean);
      let nextList = [...liked];
      if (nextLiked) {
        targetIds.forEach((tId) => {
          if (!nextList.includes(tId)) nextList.push(tId);
        });
      } else {
        nextList = nextList.filter((sId) => !targetIds.includes(sId));
      }
      localStorage.setItem("mixhub_liked_articles", JSON.stringify(nextList));
    } catch (e) {
      console.error("Failed to update liked articles:", e);
    }

    await editorialService.clapStory(id, nextLiked ? "like" : "unlike");
  };

  // Dynamic Bookmark (Backend & LocalStorage Synchronized)
  const handleSave = async () => {
    if (!article) return;
    if (isSaved) {
      await editorialService.removeSavedArticle(id);
      setIsSaved(false);
    } else {
      await editorialService.saveArticle(article, user?.email);
      setIsSaved(true);
    }
  };

  // Dynamic Share (Native Web Share API + Clipboard Fallback)
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: getLocalized(article?.title, currentLang),
          url: window.location.href,
        });
        return;
      } catch (err) {
        // Fallback
      }
    }
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamic Comment Add with User Attribution (Persisted in MongoDB Atlas)
  const handleAddResponse = async (e) => {
    e.preventDefault();
    if (!newResponse.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);

    const authorName = currentUserName || "Reader";
    const authorAvatar =
      currentUserAvatar ||
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";

    const commentPayload = {
      author: authorName,
      avatar: authorAvatar,
      text: newResponse.trim(),
    };

    try {
      const updatedList = await editorialService.addComment(id, commentPayload);
      if (Array.isArray(updatedList) && updatedList.length > 0) {
        setResponses(updatedList);
      } else {
        setResponses([commentPayload, ...responses]);
      }
      setNewResponse("");
    } catch (err) {
      console.error("Comment submit failed:", err);
    } finally {
      setIsSubmittingComment(false);
    }
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

  const { title, sdesc, ldesc, image, author, date, readTime } = article || {};

  const localizedTitle = getLocalized(title, currentLang);
  const localizedSdesc = getLocalized(sdesc, currentLang);
  const localizedLdesc = getLocalized(ldesc, currentLang);
  const localizedAuthorName = getLocalized(author?.name, currentLang) || "Rifat Sarker";
  const localizedAuthorLoc = getLocalized(author?.location, currentLang) || "Dhaka Bureau";
  const localizedReadTime = getLocalized(readTime, currentLang) || "7 min read";

  const formattedDate = date
    ? new Date(date).toLocaleDateString(currentLang === "bn" ? "bn-BD" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Oct 28, 2026";

  return (
    <article className="max-w-[680px] mx-auto px-4 sm:px-6 py-6 sm:py-10 md:py-14">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-[40px] leading-tight sm:leading-[1.2] font-bold text-[#242424] tracking-tight break-words">
        {localizedTitle}
      </h1>

      {/* Subtitle */}
      <p className="font-serif text-base sm:text-lg md:text-[21px] text-[#6b6b6b] leading-snug mt-2.5 sm:mt-3 mb-6 sm:mb-8 break-words">
        {localizedSdesc}
      </p>

      {/* Author Header Card */}
      <div className="flex items-center justify-between pb-6 sm:pb-8 border-b border-[#f2f2f2] gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <img
            src={article?.author?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
            alt={localizedAuthorName}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-xs sm:text-sm text-[#242424] truncate">{localizedAuthorName}</span>
              <button className="text-[11px] sm:text-xs text-[#1a8917] font-medium hover:text-[#156d12] flex-shrink-0">
                Follow
              </button>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#6b6b6b] mt-0.5">
              <span>{localizedReadTime}</span>
              <span>•</span>
              <span className="truncate">{formattedDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            onClick={() => setCurrentLang(currentLang === "bn" ? "en" : "bn")}
            className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium border border-[#e6e6e6] hover:border-[#242424] bg-[#ffffff] hover:bg-[#fafafa] text-[#242424] transition-all flex items-center gap-1.5 font-sans shadow-sm"
            title="Toggle article language"
          >
            <span>🌐</span>
            <span>{currentLang === "bn" ? "English" : "বাংলায় পড়ুন"}</span>
          </button>

          <button
            onClick={handleSave}
            className={`p-1.5 sm:p-2 rounded-full transition-all flex items-center gap-1 sm:gap-1.5 ${
              isSaved ? "bg-[#f0fdf4] text-[#1a8917]" : "hover:bg-[#f9f9f9] text-[#6b6b6b]"
            }`}
            title="Save to Reading List"
          >
            <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8] ${isSaved ? "fill-[#1a8917] text-[#1a8917]" : ""}`} />
            {isSaved && <span className="text-xs font-medium text-[#1a8917] hidden sm:inline">Saved</span>}
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 sm:p-2 rounded-full hover:bg-[#f9f9f9] text-[#6b6b6b] transition-colors"
            title="Share story"
          >
            {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a8917]" /> : <Share2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />}
          </button>
        </div>
      </div>

      {/* Cover Image */}
      {image && (
        <figure className="my-10">
          <img
            src={image}
            alt={localizedTitle}
            className="w-full h-auto max-h-[480px] object-cover rounded-md"
          />
          <figcaption className="text-center font-sans text-xs text-[#6b6b6b] mt-2.5">
            Archival field photography • MixHub Bureau
          </figcaption>
        </figure>
      )}

      {/* Story Body */}
      <div className="font-medium-serif text-[#242424] text-base sm:text-[19px] md:text-[21px] leading-relaxed sm:leading-[1.8] space-y-6 sm:space-y-7">
        {localizedLdesc ? (
          localizedLdesc.split("\n\n").map((block, idx) => {
            if (block.startsWith("### ")) {
              return (
                <h2
                  key={idx}
                  className="font-sans font-bold text-xl sm:text-2xl md:text-[26px] text-[#242424] pt-3 sm:pt-4 tracking-tight"
                >
                  {block.replace("### ", "")}
                </h2>
              );
            }
            if (block.startsWith("```")) {
              const codeLines = block.split("\n").filter((l) => !l.startsWith("```")).join("\n");
              return (
                <pre
                  key={idx}
                  className="p-3 sm:p-4 bg-[#f9f9f9] border border-[#f2f2f2] rounded-md font-mono text-xs sm:text-[13px] text-[#242424] overflow-x-auto leading-relaxed my-4 sm:my-6"
                >
                  <code>{codeLines}</code>
                </pre>
              );
            }
            return (
              <p key={idx} className="leading-relaxed">
                {block}
              </p>
            );
          })
        ) : (
          <p>No content available.</p>
        )}
      </div>

      {/* Dynamic Like (Heart/Clap) & Comment Bar */}
      <div className="mt-10 sm:mt-14 py-3 sm:py-4 border-y border-[#f2f2f2] flex items-center justify-between text-[#6b6b6b] text-xs sm:text-sm">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Real Heart / Like Button (Dynamic & Persisted) */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full transition-all ${
              isLiked
                ? "text-[#dc2626] bg-[#fef2f2] font-semibold"
                : "hover:text-[#dc2626] hover:bg-[#f9f9f9]"
            }`}
            title={isLiked ? "Unlike story" : "Like story"}
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8] ${isLiked ? "fill-[#dc2626] text-[#dc2626]" : ""}`} />
            <span className="text-xs sm:text-sm">{claps}</span>
          </button>

          {/* Response Count */}
          <div className="flex items-center gap-1.5 hover:text-[#242424] transition-colors cursor-pointer">
            <MessageCircle className="w-5 h-5 stroke-[1.8]" />
            <span>{responses.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className={`p-2 rounded-full transition-all flex items-center gap-1 ${
              isSaved ? "bg-[#f0fdf4] text-[#1a8917]" : "hover:bg-[#f9f9f9] hover:text-[#242424]"
            }`}
            title="Save to Reading List"
          >
            <Bookmark className={`w-5 h-5 stroke-[1.8] ${isSaved ? "fill-[#1a8917] text-[#1a8917]" : ""}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-[#f9f9f9] hover:text-[#242424] transition-colors"
            title="Share"
          >
            {copied ? <Check className="w-5 h-5 text-[#1a8917]" /> : <Share2 className="w-5 h-5 stroke-[1.8]" />}
          </button>
        </div>
      </div>

      {/* Dynamic Responses (Comments) Section */}
      <section className="mt-12 space-y-6">
        <h3 className="font-sans font-bold text-xl text-[#242424]">
          Responses ({responses.length})
        </h3>

        {/* Dynamic Comment Form with Active User Profile Header */}
        <form onSubmit={handleAddResponse} className="rounded-lg border border-[#f2f2f2] p-4 shadow-sm space-y-3 bg-[#ffffff]">
          {/* Active commenter header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#f9f9f9]">
            <div className="flex items-center gap-2.5">
              {currentUserAvatar ? (
                <img
                  src={currentUserAvatar}
                  alt={currentUserName}
                  className="w-7 h-7 rounded-full object-cover border border-[#e6e6e6]"
                />
              ) : currentUserName ? (
                <div className="w-7 h-7 rounded-full bg-[#242424] text-[#ffffff] flex items-center justify-center font-bold text-xs">
                  {currentUserName.charAt(0).toUpperCase()}
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#e6e6e6] text-[#6b6b6b] flex items-center justify-center">
                  <User className="w-4 h-4 text-[#6b6b6b]" />
                </div>
              )}
              <span className="text-xs font-medium text-[#242424]">
                {currentUserName ? (
                  currentUserName
                ) : (
                  <span className="text-[#6b6b6b]">
                    Commenting as guest (<Link to="/login" className="text-[#1a8917] hover:underline font-semibold">Sign in</Link>)
                  </span>
                )}
              </span>
            </div>

            {user && (
              <span className="text-[11px] text-[#1a8917] font-medium bg-[#f0fdf4] px-2 py-0.5 rounded-full">
                Signed in
              </span>
            )}
          </div>

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
              disabled={!newResponse.trim() || isSubmittingComment}
              className="text-xs font-medium px-4 py-1.5 rounded-full medium-btn-green disabled:opacity-40"
            >
              {isSubmittingComment ? "Posting..." : "Respond"}
            </button>
          </div>
        </form>

        {/* Dynamic Response List with User Avatars & Names */}
        <div className="space-y-4 pt-4 divide-y divide-[#f2f2f2]">
          {responses.map((res, i) => (
            <div key={res._id || i} className="pt-4 first:pt-0 space-y-2">
              <div className="flex items-center gap-3">
                {res.avatar ? (
                  <img
                    src={res.avatar}
                    alt={res.author}
                    className="w-8 h-8 rounded-full object-cover border border-[#f0f0f0]"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#242424] text-[#ffffff] flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {(res.author || "R").charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-semibold text-xs text-[#242424]">{res.author || "Reader"}</span>
                  <span className="text-[11px] text-[#6b6b6b]">
                    {res.date ? new Date(res.date).toLocaleDateString() : "Just now"}
                  </span>
                </div>
              </div>
              <p className="font-sans text-sm text-[#242424] leading-relaxed pl-11">
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
