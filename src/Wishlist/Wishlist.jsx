import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { blogService } from "../services/api";
import Swal from "sweetalert2";
import { Bookmark, Trash2, ArrowUpRight, Sparkles, Compass } from "lucide-react";
import { motion } from "framer-motion";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadWishlist = async () => {
    setIsLoading(true);
    const data = await blogService.getWishlist(user?.email);
    setItems(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadWishlist();
  }, [user]);

  const handleRemove = async (id, title) => {
    const result = await Swal.fire({
      title: "Remove from wishlist?",
      text: `"${title}" will be removed from your saved shelf.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, remove",
    });

    if (result.isConfirmed) {
      await blogService.removeFromWishlist(id, user?.email);
      setItems((prev) => prev.filter((item) => (item._id || item.id) !== id));
      Swal.fire({
        title: "Removed",
        text: "Story removed from your wishlist.",
        icon: "success",
        timer: 1400,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-pink-400 font-semibold px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
          <Bookmark className="w-3.5 h-3.5" />
          Reading Shelf
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Your Saved Stories
        </h1>
        <p className="text-sm text-slate-400">
          Articles bookmarked for offline study, deep reading, and architectural reference.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-80 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse"
            />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => {
            const itemId = item._id || item.id;
            const displayImage =
              item.imageURL || item.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";

            return (
              <motion.div
                key={itemId}
                whileHover={{ y: -5 }}
                className="group relative flex flex-col bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-pink-500/40 hover:shadow-xl transition-all"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                  <img
                    src={displayImage}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-900/80 text-pink-400 border border-pink-500/30">
                    {item.category?.replace("_", " ") || "Saved"}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-pink-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {item.sdesc || item.ldesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleRemove(itemId, item.title)}
                      className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold transition-colors"
                      title="Remove from Shelf"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>

                    <Link
                      to={`/blog/${itemId}`}
                      className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                    >
                      Read Now <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-900/30 rounded-3xl border border-slate-800 p-8 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Your Reading Shelf is Empty</h3>
          <p className="text-sm text-slate-400">
            Browse our curated stories and click the bookmark icon on any card to save it here for later.
          </p>
          <Link
            to="/allBlog"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
          >
            <Compass className="w-4 h-4" /> Discover Articles
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
