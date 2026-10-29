import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editorialService } from "../../services/api";
import { PenLine, ArrowUpRight, BookOpen } from "lucide-react";

const AddBlog = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Architecture");
  const [kicker, setKicker] = useState("FIELD DISPATCH");
  const [sdesc, setSdesc] = useState("");
  const [ldesc, setLdesc] = useState("");
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80"
  );
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
      kicker: kicker.trim().toUpperCase(),
      sdesc: sdesc.trim() || title.trim(),
      ldesc: ldesc.trim(),
      image,
      date: new Date().toISOString(),
      author: {
        name: "Rifat Sarker",
        location: "Dhaka",
        role: "Contributing Editor",
      },
      readTime: `${readMinutes} min read`,
      words: wordCount,
      edition: "Autumn 2026",
    };

    const created = await editorialService.publishArticle(newDoc);
    setIsSubmitting(false);
    navigate(`/blog/${created._id || created.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="border-b-2 border-[#141414] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#b91c1c] font-bold block mb-1">
            The Author's Atelier
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#141414]">
            Draft a Manuscript
          </h1>
        </div>
        <div className="font-mono text-xs uppercase tracking-wider text-[#5e5a54] text-right">
          {wordCount} Words • {readMinutes} Min Read
        </div>
      </div>

      <form onSubmit={handleSubmit} className="border border-[#141414] bg-[#ffffff] p-6 sm:p-10 space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <label className="block font-mono text-xs uppercase tracking-wider text-[#141414] font-bold">
            Manuscript Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. On the Quiet Elegance of Provable Systems"
            required
            className="w-full bg-[#faf8f5] border border-[#141414] p-3 text-xl font-serif text-[#141414] placeholder-[#8c867c] focus:outline-none"
          />
        </div>

        {/* Kicker & Section Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-mono text-xs uppercase tracking-wider text-[#141414] font-bold">
              Kicker Tag (Uppercase)
            </label>
            <input
              type="text"
              value={kicker}
              onChange={(e) => setKicker(e.target.value)}
              placeholder="e.g. ARCHITECTURAL ESSAY"
              className="w-full bg-[#faf8f5] border border-[#e8e4dc] p-2.5 font-mono text-xs uppercase text-[#141414] focus:outline-none focus:border-[#141414]"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-mono text-xs uppercase tracking-wider text-[#141414] font-bold">
              Section Classification
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#faf8f5] border border-[#e8e4dc] p-2.5 font-mono text-xs uppercase text-[#141414] focus:outline-none focus:border-[#141414]"
            >
              <option value="Architecture">Architecture</option>
              <option value="Philosophy">Philosophy</option>
              <option value="Engineering">Engineering</option>
              <option value="Culture">Culture</option>
              <option value="Stillness">Stillness</option>
            </select>
          </div>
        </div>

        {/* Lede Summary */}
        <div className="space-y-2">
          <label className="block font-mono text-xs uppercase tracking-wider text-[#141414] font-bold">
            Abstract / Lede Summary
          </label>
          <textarea
            rows={2}
            value={sdesc}
            onChange={(e) => setSdesc(e.target.value)}
            placeholder="A single, carefully balanced paragraph outlining the essay's core thesis..."
            className="w-full bg-[#faf8f5] border border-[#e8e4dc] p-3 font-serif text-sm text-[#141414] placeholder-[#8c867c] focus:outline-none focus:border-[#141414] resize-none leading-relaxed"
          />
        </div>

        {/* Cover Image Plate Link */}
        <div className="space-y-2">
          <label className="block font-mono text-xs uppercase tracking-wider text-[#141414] font-bold">
            Archival Plate Image Link
          </label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-[#faf8f5] border border-[#e8e4dc] p-2.5 font-mono text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
          />
        </div>

        {/* Full Essay Text */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block font-mono text-xs uppercase tracking-wider text-[#141414] font-bold">
              Manuscript Body
            </label>
            <span className="font-mono text-[11px] text-[#5e5a54]">
              Supports ### Headings and ```code snippets
            </span>
          </div>
          <textarea
            rows={14}
            value={ldesc}
            onChange={(e) => setLdesc(e.target.value)}
            placeholder="Write with calm deliberation... Use standard markdown:&#10;&#10;### Section Heading&#10;Paragraph text...&#10;&#10;```javascript&#10;// code example&#10;```"
            required
            className="w-full bg-[#faf8f5] border border-[#141414] p-4 font-serif text-base text-[#141414] placeholder-[#8c867c] focus:outline-none leading-relaxed resize-y"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-[#e8e4dc] flex items-center justify-between">
          <span className="font-serif italic text-xs text-[#5e5a54]">
            Draft will be inscribed into the dispatch archive.
          </span>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 border border-[#141414] bg-[#141414] text-[#faf8f5] font-mono text-xs uppercase tracking-widest font-bold hover:bg-transparent hover:text-[#141414] transition-all flex items-center gap-2"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>{isSubmitting ? "Inscribing..." : "Inscribe & Publish"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
