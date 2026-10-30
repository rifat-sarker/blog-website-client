import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { editorialService } from "../../services/api";
import { AuthContext } from "../../providers/AuthProvider";
import { Image, Send } from "lucide-react";

const CATEGORIES = ["Technology", "Architecture", "Philosophy", "Engineering", "Culture", "Design"];

const AddBlog = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [sdesc, setSdesc] = useState("");
  const [ldesc, setLdesc] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wordCount = (ldesc || "").split(/\s+/).filter(Boolean).length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 180));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !ldesc.trim()) return;

    setIsSubmitting(true);
    const newDoc = {
      title: title.trim(),
      category,
      kicker: category.toUpperCase(),
      sdesc: sdesc.trim() || title.trim(),
      ldesc: ldesc.trim(),
      image: image.trim() || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80",
      date: new Date().toISOString(),
      author: {
        name: user?.displayName || "Rifat Sarker",
        location: "Dhaka Bureau",
        role: "Author",
      },
      readTime: `${readMinutes} min read`,
      words: wordCount,
      edition: "2026",
    };

    try {
      const created = await editorialService.publishArticle(newDoc);
      setIsSubmitting(false);
      navigate(`/blog/${created._id || created.id}`);
    } catch (err) {
      console.error("Failed to publish story:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10 min-h-[80vh]">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f2f2f2]">
          <div className="text-xs text-[#6b6b6b]">
            <span>Draft in MixHub</span>
            <span className="mx-2">•</span>
            <span>{wordCount} words ({readMinutes} min read)</span>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-xs bg-[#f9f9f9] border border-[#e6e6e6] rounded-full px-3 py-1.5 text-[#242424] outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !ldesc.trim()}
              className="px-4 py-1.5 bg-[#1a8917] hover:bg-[#156d12] text-[#ffffff] text-xs font-medium rounded-full transition-colors disabled:opacity-40 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "Publishing..." : "Publish"}</span>
            </button>
          </div>
        </div>

        {/* Story Title */}
        <div>
          <textarea
            rows={1}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="w-full font-serif text-3xl sm:text-4xl font-bold text-[#242424] placeholder-[#b3b3b1] border-none outline-none resize-none leading-tight bg-transparent"
          />
        </div>

        {/* Short Subtitle */}
        <div>
          <input
            type="text"
            value={sdesc}
            onChange={(e) => setSdesc(e.target.value)}
            placeholder="Write a preview subtitle..."
            className="w-full font-serif text-lg text-[#6b6b6b] placeholder-[#b3b3b1] border-none outline-none bg-transparent"
          />
        </div>

        {/* Cover Image Input */}
        <div className="flex items-center gap-2 py-2 px-3 bg-[#f9f9f9] rounded-lg border border-[#f2f2f2] text-xs">
          <Image className="w-4 h-4 text-[#6b6b6b] flex-shrink-0" />
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Add a cover image URL (optional)..."
            className="w-full bg-transparent outline-none text-[#242424] placeholder-[#8c867c]"
          />
        </div>

        {/* Story Body */}
        <div>
          <textarea
            rows={16}
            value={ldesc}
            onChange={(e) => setLdesc(e.target.value)}
            placeholder="Tell your story... You can use paragraphs and standard markdown."
            required
            className="w-full font-medium-serif text-lg text-[#242424] placeholder-[#b3b3b1] border-none outline-none resize-y leading-relaxed bg-transparent"
          />
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
