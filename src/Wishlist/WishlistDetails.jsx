import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { blogService } from "../services/api";
import { ArrowLeft, Clock, Bookmark, Sparkles } from "lucide-react";

const WishlistDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    blogService.getBlogById(id).then((data) => {
      if (isMounted && data) {
        setBlog(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 space-y-6">
        <div className="h-10 w-3/4 rounded bg-slate-800 animate-pulse" />
        <div className="h-80 rounded-2xl bg-slate-800 animate-pulse" />
      </div>
    );
  }

  const { title, sdesc, ldesc, imageURL, image, category } = blog || {};
  const displayImage =
    imageURL || image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";

  return (
    <article className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        to="/wishlist"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Wishlist Shelf
      </Link>

      <div className="space-y-4 mb-8">
        <span className="badge badge-sm bg-pink-500/10 text-pink-400 border border-pink-500/20 font-mono text-[11px] uppercase">
          {category?.replace("_", " ") || "Saved Article"}
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {title}
        </h1>

        <p className="text-lg text-slate-300 leading-relaxed">{sdesc}</p>
      </div>

      <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl mb-10">
        <img
          src={displayImage}
          alt={title}
          className="w-full max-h-[460px] object-cover"
        />
      </div>

      <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-base sm:text-lg space-y-6">
        {ldesc ? (
          ldesc.split("\n\n").map((para, i) => <p key={i}>{para}</p>)
        ) : (
          <p>No content provided.</p>
        )}
      </div>
    </article>
  );
};

export default WishlistDetails;
