import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { editorialService } from "../services/api";
import { Bookmark, Trash2, ArrowUpRight, BookOpen } from "lucide-react";

const Wishlist = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadShelf = async () => {
    setIsLoading(true);
    const data = await editorialService.getSavedArticles();
    setSavedItems(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadShelf();
  }, []);

  const handleRemove = async (id) => {
    await editorialService.removeSavedArticle(id);
    setSavedItems((prev) => prev.filter((item) => (item._id || item.id) !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 min-h-[70vh]">
      {/* Header */}
      <div className="border-b-2 border-[#141414] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#b91c1c] font-bold block mb-1">
            Personal Repository
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#141414]">
            The Reading Shelf
          </h1>
        </div>
        <p className="font-serif italic text-sm text-[#5e5a54] max-w-sm sm:text-right">
          Monographs and dispatches set aside for uninterrupted contemplation.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-20 bg-[#e8e4dc]" />
          <div className="h-20 bg-[#e8e4dc]" />
        </div>
      ) : savedItems.length > 0 ? (
        <div className="border border-[#141414] bg-[#ffffff] divide-y divide-[#e8e4dc]">
          {savedItems.map((item, idx) => {
            const itemId = item._id || item.id;
            return (
              <div
                key={itemId || idx}
                className="p-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 hover:bg-[#faf8f5] transition-colors"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-[#5e5a54] uppercase tracking-wider">
                    <span className="text-[#b91c1c] font-bold">[{item.category || "Saved"}]</span>
                    <span>•</span>
                    <span>{item.readTime || "5 min read"}</span>
                  </div>

                  <Link to={`/blog/${itemId}`}>
                    <h3 className="font-serif text-2xl text-[#141414] hover:underline leading-snug">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="font-serif text-sm text-[#5e5a54] line-clamp-2">
                    {item.sdesc}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider flex-shrink-0 self-start sm:self-center">
                  <button
                    onClick={() => handleRemove(itemId)}
                    className="text-[#8c867c] hover:text-[#b91c1c] flex items-center gap-1 transition-colors"
                    title="Remove from Shelf"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>

                  <Link
                    to={`/blog/${itemId}`}
                    className="border border-[#141414] px-3.5 py-1.5 text-[#141414] font-bold hover:bg-[#141414] hover:text-[#faf8f5] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border border-[#141414] p-12 text-center space-y-4 bg-[#ffffff] max-w-xl mx-auto my-12">
          <BookOpen className="w-8 h-8 mx-auto text-[#141414]" />
          <h3 className="font-serif text-2xl text-[#141414]">Your Shelf is Unburdened</h3>
          <p className="font-serif italic text-sm text-[#5e5a54]">
            While reading any essay in the archive, click the "Save to Shelf" bookmark to store it here for quiet study.
          </p>
          <Link
            to="/allBlog"
            className="inline-block px-5 py-2.5 border border-[#141414] bg-[#141414] text-[#faf8f5] font-mono text-xs uppercase tracking-wider font-bold hover:bg-transparent hover:text-[#141414] transition-all"
          >
            Explore The Archive
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
