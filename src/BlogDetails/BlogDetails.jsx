import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { blogService } from "../services/api";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import {
  Clock,
  Calendar,
  Bookmark,
  Heart,
  Share2,
  Copy,
  Check,
  ArrowLeft,
  Sparkles,
  MessageSquare,
  Send,
  User,
} from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";

const BlogDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [claps, setClaps] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  // Reading progress bar spring
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    blogService.getBlogById(id).then((data) => {
      if (isMounted && data) {
        setBlog(data);
        setClaps(data.claps || 142);
        setIsLoading(false);
      }
    });

    // Load related blogs
    blogService.getAllBlogs().then((all) => {
      if (isMounted) {
        setRelatedBlogs(all.filter((b) => (b._id || b.id) !== id).slice(0, 3));
      }
    });

    // Load comments from localStorage
    const savedComments = JSON.parse(
      localStorage.getItem(`mixhub_comments_${id}`) || "[]"
    );
    if (savedComments.length > 0) {
      setComments(savedComments);
    } else {
      setComments([
        {
          id: "c-1",
          author: "Alex Morgan",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
          text: "Phenomenal writeup. The distributed consensus explanation clarified doubts I had for months.",
          date: "Yesterday",
        },
      ]);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleClap = () => {
    setClaps((prev) => prev + 1);
  };

  const handleBookmark = async () => {
    if (!user) {
      Swal.fire({
        title: "Sign In Required",
        text: "Please sign in to save this story to your wishlist.",
        icon: "info",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }
    await blogService.addToWishlist(blog, user.email);
    setIsBookmarked(true);
    Swal.fire({
      title: "Story Saved",
      text: "Added to your personal wishlist shelf.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const entry = {
      id: `c-${Date.now()}`,
      author: user?.displayName || user?.email?.split("@")[0] || "Reader",
      avatar: user?.photoURL || null,
      text: newComment.trim(),
      date: "Just now",
    };

    const updated = [entry, ...comments];
    setComments(updated);
    localStorage.setItem(`mixhub_comments_${id}`, JSON.stringify(updated));
    setNewComment("");
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 space-y-6">
        <div className="h-6 w-32 rounded bg-slate-800 animate-pulse" />
        <div className="h-12 w-3/4 rounded bg-slate-800 animate-pulse" />
        <div className="h-96 rounded-2xl bg-slate-800 animate-pulse" />
        <div className="space-y-3 pt-6">
          <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-slate-800 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-slate-800 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const { title, sdesc, ldesc, imageURL, image, category, date, author } = blog || {};
  const displayImage =
    imageURL || image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";

  const readTime = `${Math.max(3, Math.ceil((ldesc || sdesc || "").split(" ").length / 180))} min read`;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "October 2026";

  return (
    <>
      {/* Scroll Reading Progress Bar Fixed at Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-400 origin-left z-50"
        style={{ scaleX }}
      />

      <article className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/allBlog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Archive
        </Link>

        {/* Header Metadata */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="badge badge-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono text-[11px] uppercase">
              {category?.replace("_", " ") || "Deep Dive"}
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400" /> {readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed font-normal">
            {sdesc}
          </p>

          {/* Author Card & Actions Bar */}
          <div className="pt-4 border-t border-b border-slate-800/80 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                alt={author?.name || "Author"}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
              />
              <div>
                <p className="text-sm font-bold text-white">
                  {author?.name || "Rifat Sarker"}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{author?.role || "Staff Engineer"}</span>
                  <span>•</span>
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>

            {/* Actions: Claps + Bookmark + Share */}
            <div className="flex items-center gap-2">
              {/* Claps */}
              <button
                onClick={handleClap}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-pink-400 hover:border-pink-500/30 transition-all text-xs font-semibold"
                title="Clap / Like this article"
              >
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500/20" />
                <span>{claps}</span>
              </button>

              {/* Bookmark */}
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-full border text-xs transition-all ${
                  isBookmarked
                    ? "bg-indigo-600 text-white border-indigo-500"
                    : "bg-slate-900 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700"
                }`}
                title="Save to Wishlist"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-all"
                title="Copy Article Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl mb-12 bg-slate-900">
          <img
            src={displayImage}
            alt={title}
            className="w-full max-h-[500px] object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-invert prose-indigo max-w-none space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
          {ldesc ? (
            ldesc.split("\n\n").map((para, i) => {
              if (para.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-2xl font-bold text-white pt-4 pb-2 border-b border-slate-800">
                    {para.replace("### ", "")}
                  </h3>
                );
              }
              if (para.startsWith("```")) {
                const code = para.replace(/```[a-z]*/g, "").trim();
                return (
                  <pre key={i} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 text-sm font-mono text-indigo-300 overflow-x-auto shadow-inner">
                    <code>{code}</code>
                  </pre>
                );
              }
              return (
                <p key={i} className="leading-relaxed">
                  {para}
                </p>
              );
            })
          ) : (
            <p>No content provided.</p>
          )}
        </div>

        {/* Article Footer Endnote */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>End of article • Published on MixHub 2026</span>
          </div>

          <button
            onClick={handleCopyLink}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5"
          >
            {copied ? "Link Copied!" : "Share this article"}
          </button>
        </div>

        {/* Comments Section */}
        <section className="mt-16 pt-12 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              Community Discussion ({comments.length})
            </h3>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="mb-10 space-y-3">
            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-2 focus-within:border-indigo-500/80 transition-colors">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                placeholder={user ? "Write your perspective or constructive question..." : "Join the conversation (signing in recommended)..."}
                className="w-full bg-transparent p-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none resize-none"
              />
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 px-2">
                <span className="text-[11px] text-slate-500">Markdown formatting supported</span>
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <span>Post Comment</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </form>

          {/* Comment List */}
          <div className="space-y-4">
            {comments.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/70 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {c.avatar ? (
                      <img
                        src={c.avatar}
                        alt={c.author}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-700"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                    <span className="text-xs font-bold text-white">{c.author}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">{c.date}</span>
                </div>
                <p className="text-sm text-slate-300 pl-9 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Reads */}
        {relatedBlogs.length > 0 && (
          <section className="mt-20 pt-12 border-t border-slate-800/80">
            <h3 className="text-xl font-bold text-white mb-6">Related Publications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((b) => (
                <Link
                  key={b._id || b.id}
                  to={`/blog/${b._id || b.id}`}
                  className="group p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono text-indigo-400 font-semibold">
                      {b.category?.replace("_", " ") || "Story"}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {b.title}
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-4 font-mono">
                    Read article →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
};

export default BlogDetails;
