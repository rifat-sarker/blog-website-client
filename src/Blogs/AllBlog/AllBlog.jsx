import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { blogService } from "../../services/api";
import BlogCard from "../BlogCard/BlogCard";
import { Search, Sparkles, Filter, X, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = [
  { id: "all", label: "All Categories" },
  { id: "software_development", label: "Software & AI" },
  { id: "motivation", label: "Motivation" },
  { id: "travel", label: "Travel" },
  { id: "recipes", label: "Recipes & Health" },
  { id: "fashion", label: "Design & Style" },
  { id: "parenting", label: "Parenting" },
];

const AllBlog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchTitle, setSearchTitle] = useState(initialQuery);
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    blogService.getAllBlogs().then((data) => {
      if (isMounted) {
        setBlogs(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync state if query params change
  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null && q !== searchTitle) {
      setSearchTitle(q);
    }
  }, [searchParams]);

  // Filter logic
  const filtered = blogs
    .filter((blog) => category === "all" || blog.category?.toLowerCase() === category.toLowerCase())
    .filter((blog) => {
      if (!searchTitle.trim()) return true;
      const term = searchTitle.toLowerCase();
      return (
        blog.title?.toLowerCase().includes(term) ||
        blog.sdesc?.toLowerCase().includes(term) ||
        blog.ldesc?.toLowerCase().includes(term)
      );
    });

  // Sort logic
  const sortedBlogs = [...filtered].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.date || 0) - new Date(a.date || 0);
    if (sortBy === "oldest") return new Date(a.date || 0) - new Date(b.date || 0);
    if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
    return 0;
  });

  const clearFilters = () => {
    setCategory("all");
    setSearchTitle("");
    setSearchParams({});
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Eyebrow */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          The Archive
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Explore All Publications
        </h1>
        <p className="text-sm text-slate-400">
          Search across engineering paradigms, product architectures, and creative deep dives.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-10 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Search by keywords..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            {searchTitle && (
              <button
                onClick={() => setSearchTitle("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                category === cat.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                  : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Meta */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-6 px-1">
        <span>
          Showing <strong className="text-white">{sortedBlogs.length}</strong> {sortedBlogs.length === 1 ? "story" : "stories"}
        </span>
        {(searchTitle || category !== "all") && (
          <button
            onClick={clearFilters}
            className="text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
          >
            Clear Active Filters <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-96 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse flex flex-col p-4 space-y-4"
            >
              <div className="h-48 rounded-xl bg-slate-800" />
              <div className="h-6 w-3/4 rounded bg-slate-800" />
              <div className="h-4 w-full rounded bg-slate-800" />
            </div>
          ))}
        </div>
      ) : sortedBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedBlogs.map((blog) => (
            <BlogCard key={blog._id || blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800/80 p-8 space-y-4">
          <p className="text-lg font-semibold text-white">No matching stories found</p>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            We couldn't find any articles matching your search criteria. Try a different query or reset filters.
          </p>
          <button
            onClick={clearFilters}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBlog;
