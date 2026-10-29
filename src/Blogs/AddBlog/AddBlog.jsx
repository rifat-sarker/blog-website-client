import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { blogService } from "../../services/api";
import Swal from "sweetalert2";
import {
  PenSquare,
  Sparkles,
  Image as ImageIcon,
  Clock,
  Send,
  Eye,
  Layers,
} from "lucide-react";

const IMAGE_PRESETS = [
  {
    label: "AI & Neural",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Code & Web",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Cloud & Space",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Minimal Living",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
  },
];

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("software_development");
  const [sdesc, setSdesc] = useState("");
  const [ldesc, setLdesc] = useState("");
  const [imageUrl, setImageUrl] = useState(IMAGE_PRESETS[0].url);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live calculated stats
  const wordCount = (ldesc || "").split(/\s+/).filter(Boolean).length;
  const estimatedReadTime = `${Math.max(1, Math.ceil(wordCount / 180))} min read`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !sdesc.trim() || !ldesc.trim()) {
      Swal.fire({
        title: "Incomplete Story",
        text: "Please provide a title, short excerpt, and full article text.",
        icon: "warning",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const newBlog = {
        title: title.trim(),
        category,
        sdesc: sdesc.trim(),
        ldesc: ldesc.trim(),
        image: imageUrl || IMAGE_PRESETS[0].url,
        imageURL: imageUrl || IMAGE_PRESETS[0].url,
        date: new Date().toISOString(),
        author: {
          name: user?.displayName || user?.email?.split("@")[0] || "MixHub Writer",
          avatar: user?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
          role: "Contributing Author",
        },
      };

      const created = await blogService.createBlog(newBlog);

      Swal.fire({
        title: "Published!",
        text: "Your publication is now live on MixHub.",
        icon: "success",
        confirmButtonColor: "#4f46e5",
      }).then(() => {
        navigate(`/blog/${created._id || created.id || ""}`);
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Could not publish article right now.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="max-w-2xl mx-auto text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          <PenSquare className="w-3.5 h-3.5" />
          Author Studio
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Publish a New Story
        </h1>
        <p className="text-sm text-slate-400">
          Share your architectural decisions, engineering breakthroughs, or personal reflections.
        </p>
      </div>

      {/* 2-Column Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
        >
          {/* Title */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Publication Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Architecting Distributed Message Queues with Event Sourcing"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Category & Preset */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="software_development">Software & AI</option>
                <option value="motivation">Motivation & Mindset</option>
                <option value="travel">Travel & Culture</option>
                <option value="recipes">Health & Nutrition</option>
                <option value="fashion">Design & Fashion</option>
                <option value="parenting">Parenting Tips</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                Estimated Reading
              </label>
              <div className="h-[46px] bg-slate-950 border border-slate-800 rounded-xl px-4 flex items-center gap-2 text-xs font-mono text-indigo-400">
                <Clock className="w-4 h-4" />
                <span>{estimatedReadTime} ({wordCount} words)</span>
              </div>
            </div>
          </div>

          {/* Short description */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Short Summary / Excerpt
            </label>
            <textarea
              rows={2}
              value={sdesc}
              onChange={(e) => setSdesc(e.target.value)}
              placeholder="A compelling 1-2 sentence hook explaining what readers will learn..."
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
          </div>

          {/* Cover image URL & Presets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                Cover Image URL
              </label>
              <span className="text-[11px] text-slate-500">Choose preset or paste custom link</span>
            </div>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
            />

            {/* Quick preset chips */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              {IMAGE_PRESETS.map((preset) => (
                <button
                  type="button"
                  key={preset.label}
                  onClick={() => setImageUrl(preset.url)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                    imageUrl === preset.url
                      ? "bg-indigo-600 text-white border-indigo-500 font-semibold"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Long Article Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                Full Article Content (Markdown)
              </label>
              <span className="text-[11px] text-slate-500">Supports ### headings and ```code</span>
            </div>
            <textarea
              rows={12}
              value={ldesc}
              onChange={(e) => setLdesc(e.target.value)}
              placeholder="Write your article here... You can use:&#10;### Section Heading&#10;Paragraph content...&#10;&#10;```javascript&#10;// code snippet&#10;```"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono leading-relaxed resize-y"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 disabled:opacity-50 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
          >
            {isSubmitting ? (
              "Publishing Story..."
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Publish to MixHub</span>
              </>
            )}
          </button>
        </form>

        {/* Right: Real-time Live Preview */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono px-1">
            <Eye className="w-4 h-4 text-indigo-400" />
            <span>Live Card Preview</span>
          </div>

          {/* Simulated Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative h-48 w-full bg-slate-800">
              <img
                src={imageUrl || IMAGE_PRESETS[0].url}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = IMAGE_PRESETS[0].url;
                }}
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-mono font-semibold uppercase px-2.5 py-1 rounded-full bg-slate-900/80 text-indigo-400 border border-indigo-500/30 backdrop-blur-md">
                  {category?.replace("_", " ")}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 text-xs text-slate-300 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>{estimatedReadTime}</span>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <h3 className="text-base font-bold text-white line-clamp-2">
                {title || "Untitled Architectural Story"}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-3">
                {sdesc || "Your story summary will appear here as you type in the editor..."}
              </p>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>By {user?.displayName || "You"}</span>
                <span>Just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
