import { Link } from "react-router-dom";
import { Compass, Home, Sparkles } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
          <Sparkles className="w-3.5 h-3.5" /> 404 Void
        </div>

        <h1 className="text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-indigo-400 via-pink-400 to-slate-700 font-mono">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Lost in the Archive</h2>
          <p className="text-sm text-slate-400">
            The page or publication you requested doesn't exist, has been pruned, or moved to another permalink.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
          <Link
            to="/allBlog"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Compass className="w-4 h-4 text-indigo-400" /> Explore Stories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
