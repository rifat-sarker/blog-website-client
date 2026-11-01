import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { blogService } from "../../services/api";
import { Bookmark, Clock, ArrowUpRight, User } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORY_COLORS = {
  software_development: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  recipes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  nutrition: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  travel: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  motivation: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  fashion: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  parenting: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const BlogCard = ({ blog }) => {
  const { _id, id, title, ldesc, imageURL, image, sdesc, category, date, author, readTime } = blog;
  const { user } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState(false);

  const blogId = _id || id;
  const displayImage =
    imageURL || image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";

  const calculatedReadTime =
    readTime || `${Math.max(2, Math.ceil((ldesc || sdesc || "").split(" ").length / 180))} min read`;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently published";

  const categoryBadgeClass =
    CATEGORY_COLORS[category?.toLowerCase()] || "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      Swal.fire({
        title: "Sign In Required",
        text: "Please sign in to save stories to your reading wishlist.",
        icon: "info",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    try {
      await blogService.addToWishlist(blog, user.email);
      setIsSaved(true);
      Swal.fire({
        title: "Saved!",
        text: `"${title}" has been added to your wishlist.`,
        icon: "success",
        timer: 1600,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex flex-col w-full bg-slate-900/70 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all"
    >
      {/* Cover Image & Category Pill */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-800">
        <img
          src={displayImage}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-sans">
          <span
            className={`text-[11px] font-sans font-medium uppercase px-2.5 py-1 rounded-full border backdrop-blur-md ${categoryBadgeClass}`}
          >
            {category?.replace("_", " ") || "Article"}
          </span>

          <button
            onClick={handleAddToWishlist}
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              isSaved
                ? "bg-pink-600 text-white border-pink-500"
                : "bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white border-slate-700/60"
            }`}
            title="Save to Wishlist"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Read Time */}
        <div className="absolute bottom-3 left-3 text-xs text-slate-300 flex items-center gap-1 font-sans font-medium">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          <span>{calculatedReadTime}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <Link to={`/blog/${blogId}`}>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {sdesc || ldesc?.slice(0, 120)}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            {author?.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-700"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-medium text-slate-200 truncate max-w-[110px]">
                {author?.name || "MixHub Writer"}
              </span>
              <span className="text-[10px] text-slate-500">{formattedDate}</span>
            </div>
          </div>

          <Link
            to={`/blog/${blogId}`}
            className="inline-flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300 group/link text-xs transition-colors"
          >
            Read Story
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;
