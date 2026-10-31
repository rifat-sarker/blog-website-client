import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { editorialService, getLocalized } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { AuthContext } from "../providers/AuthProvider";
import { Trash2, BookOpen } from "lucide-react";

const Wishlist = () => {
  const { currentLang } = useLanguage();
  const { user } = useContext(AuthContext);
  const [savedItems, setSavedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadShelf = async () => {
    setIsLoading(true);
    const data = await editorialService.getSavedArticles(user?.email);
    setSavedItems(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadShelf();
  }, [user?.email]);

  const handleRemove = async (id) => {
    await editorialService.removeSavedArticle(id);
    setSavedItems((prev) => prev.filter((item) => (item._id || item.id) !== id && item.blogId !== id));
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 min-h-[70vh]">
      {/* Header */}
      <div className="pb-6 mb-8 border-b border-[#f2f2f2]">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#242424] mb-2 tracking-tight">
          Reading List
        </h1>
        <p className="text-sm text-[#6b6b6b]">
          Stories and articles you have saved for later reading.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6 animate-pulse">
          <div className="h-24 bg-[#f9f9f9] rounded-lg" />
          <div className="h-24 bg-[#f9f9f9] rounded-lg" />
        </div>
      ) : savedItems.length > 0 ? (
        <div className="divide-y divide-[#f2f2f2]">
          {savedItems.map((item, idx) => {
            const itemId = item._id || item.id || item.blogId;
            const linkId = item.blogId || itemId;
            const localizedTitle = getLocalized(item.title, currentLang);
            const localizedSdesc = getLocalized(item.sdesc, currentLang);
            const localizedCategory = getLocalized(item.category, currentLang) || "Story";
            const localizedReadTime = getLocalized(item.readTime, currentLang) || "5 min read";
            const authorName = getLocalized(item.author?.name, currentLang) || "MixHub Author";

            return (
              <div
                key={itemId || idx}
                className="py-6 flex flex-col sm:flex-row justify-between items-start gap-6 first:pt-0"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-xs text-[#6b6b6b]">
                    <span className="font-medium text-[#242424]">{authorName}</span>
                    <span>•</span>
                    <span>{localizedCategory}</span>
                  </div>

                  <Link to={`/blog/${linkId}`} className="group block">
                    <h3 className="font-bold text-xl leading-snug text-[#242424] group-hover:text-[#6b6b6b] transition-colors">
                      {localizedTitle}
                    </h3>
                  </Link>

                  <p className="font-serif text-sm text-[#6b6b6b] line-clamp-2 leading-relaxed">
                    {localizedSdesc}
                  </p>

                  <div className="pt-2 flex items-center gap-4 text-xs text-[#6b6b6b]">
                    <span>{localizedReadTime}</span>
                    <button
                      onClick={() => handleRemove(itemId)}
                      className="text-[#dc2626] hover:underline flex items-center gap-1 transition-colors"
                      title="Remove from Reading List"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {item.image && (
                  <Link to={`/blog/${linkId}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={localizedTitle}
                      className="w-24 h-24 sm:w-28 sm:h-20 object-cover rounded-md"
                      loading="lazy"
                    />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border border-[#f2f2f2] rounded-lg p-12 text-center space-y-4 bg-[#fafafa] max-w-lg mx-auto my-12">
          <BookOpen className="w-8 h-8 mx-auto text-[#6b6b6b]" />
          <h3 className="font-serif text-xl font-bold text-[#242424]">
            Your reading list is empty
          </h3>
          <p className="text-sm text-[#6b6b6b]">
            Click the bookmark icon on any story to save it here for later reading.
          </p>
          <Link
            to="/allBlog"
            className="inline-block px-5 py-2.5 bg-[#242424] text-[#ffffff] text-xs font-medium rounded-full hover:bg-[#1a8917] transition-all"
          >
            Explore Stories
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
