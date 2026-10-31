import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { editorialService } from "../../services/api";
import { AuthContext } from "../../providers/AuthProvider";
import { Image as ImageIcon, Send, UploadCloud, X, Loader2, Link2 } from "lucide-react";

const CATEGORIES = [
  "Technology",
  "Programming",
  "Architecture",
  "Engineering",
  "Design",
  "Philosophy",
  "Culture",
  "Science",
  "Other",
];

const AddBlog = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [sdesc, setSdesc] = useState("");
  const [ldesc, setLdesc] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wordCount = (ldesc || "").split(/\s+/).filter(Boolean).length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 180));

  // Handle local computer file upload
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image size must be less than 10MB.");
      return;
    }

    setUploadError("");
    setIsUploadingImage(true);

    // Show instant local preview
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);

    try {
      const result = await editorialService.uploadImage(file);
      if (result?.url) {
        setImage(result.url);
        setImagePreview(result.url);
      } else {
        throw new Error("No URL returned from upload");
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      setUploadError("Failed to upload image from computer. Please try again or paste a URL.");
      setImagePreview("");
      setImage("");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImage("");
    setImagePreview("");
    setUploadError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
        name: user?.displayName || user?.name || "Rifat Sarker",
        location: "Dhaka Bureau",
        role: "Author",
      },
      readTime: `${readMinutes} min read`,
      words: wordCount,
      claps: 0,
      comments: [],
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
    <div className="max-w-[800px] mx-auto px-3 sm:px-6 py-6 sm:py-10 min-h-[80vh]">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-[#f2f2f2]">
          <div className="text-xs text-[#6b6b6b] flex items-center justify-between sm:justify-start">
            <span>Draft in MixHub</span>
            <span className="mx-2">•</span>
            <span>{wordCount} words ({readMinutes} min read)</span>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
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
              disabled={isSubmitting || isUploadingImage || !title.trim() || !ldesc.trim()}
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
            className="w-full font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#242424] placeholder-[#b3b3b1] border-none outline-none resize-none leading-tight bg-transparent"
          />
        </div>

        {/* Short Subtitle */}
        <div>
          <input
            type="text"
            value={sdesc}
            onChange={(e) => setSdesc(e.target.value)}
            placeholder="Write a preview subtitle..."
            className="w-full font-serif text-base sm:text-lg text-[#6b6b6b] placeholder-[#b3b3b1] border-none outline-none bg-transparent"
          />
        </div>

        {/* Local Computer Cover Image Upload Section */}
        <div className="space-y-2">
          {imagePreview ? (
            <div className="relative rounded-lg overflow-hidden border border-[#f2f2f2] bg-[#f9f9f9]">
              <img
                src={imagePreview}
                alt="Cover Preview"
                className="w-full max-h-[360px] object-cover"
              />
              {isUploadingImage && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white gap-2 text-xs font-medium">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Uploading to cloud storage...</span>
                </div>
              )}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white/90 hover:bg-white text-xs px-3 py-1.5 rounded-md shadow-sm font-medium text-[#242424] transition-colors"
                >
                  Change image
                </button>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-md shadow-sm transition-colors"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#e6e6e6] hover:border-[#242424] bg-[#fafafa] hover:bg-[#f5f5f5] rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition-all group"
            >
              <UploadCloud className="w-8 h-8 text-[#8c867c] group-hover:text-[#242424] mb-2 transition-colors" />
              <p className="text-xs sm:text-sm font-medium text-[#242424]">
                Upload cover photo from your computer
              </p>
              <p className="text-[11px] text-[#8c867c] mt-1">
                PNG, JPG, WEBP up to 10MB
              </p>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Error Message */}
          {uploadError && (
            <p className="text-xs text-red-600 font-medium">{uploadError}</p>
          )}

          {/* Toggle URL input */}
          <div className="flex items-center justify-between pt-1 text-[11px] text-[#6b6b6b]">
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="hover:text-[#242424] hover:underline flex items-center gap-1"
            >
              <Link2 className="w-3 h-3" />
              <span>{showUrlInput ? "Hide image URL input" : "Or paste image web link"}</span>
            </button>
            {image && <span className="text-emerald-600">✓ Cover image ready</span>}
          </div>

          {showUrlInput && (
            <div className="flex items-center gap-2 py-2 px-3 bg-[#f9f9f9] rounded-lg border border-[#f2f2f2] text-xs mt-2">
              <ImageIcon className="w-4 h-4 text-[#6b6b6b] flex-shrink-0" />
              <input
                type="url"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  setImagePreview(e.target.value);
                }}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full bg-transparent outline-none text-[#242424] placeholder-[#8c867c]"
              />
            </div>
          )}
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
