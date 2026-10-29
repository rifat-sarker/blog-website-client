import { useState } from "react";
import { Link } from "react-router-dom";
import { Layers, Sparkles, Send, CheckCircle2, Heart } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 2000);
  };

  return (
    <footer className="mt-24 border-t border-slate-800/80 bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Layers className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white">
                Mix<span className="text-gradient">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The modern destination for software engineers, designers, and creators. In-depth technical essays, live real-time tech pulses, and mindful perspectives.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              All Systems Operational • Real-time Stream Active
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/allBlog" className="hover:text-indigo-400 transition-colors">
                  All Stories
                </Link>
              </li>
              <li>
                <Link to="/featuredBlog" className="hover:text-indigo-400 transition-colors">
                  Top 10 Long-Reads
                </Link>
              </li>
              <li>
                <Link to="/quizz_polls" className="hover:text-indigo-400 transition-colors">
                  Community Polls
                </Link>
              </li>
              <li>
                <Link to="/addBlog" className="hover:text-indigo-400 transition-colors">
                  Write on MixHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="hover:text-indigo-400 transition-colors cursor-pointer">
                  Software Engineering
                </span>
              </li>
              <li>
                <span className="hover:text-indigo-400 transition-colors cursor-pointer">
                  Artificial Intelligence
                </span>
              </li>
              <li>
                <span className="hover:text-indigo-400 transition-colors cursor-pointer">
                  Mindfulness & Culture
                </span>
              </li>
              <li>
                <span className="hover:text-indigo-400 transition-colors cursor-pointer">
                  Design Systems
                </span>
              </li>
            </ul>
          </div>

          {/* Weekly Dispatch Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              The 2026 Dispatch
            </h4>
            <p className="text-xs text-slate-400">
              Curated architectural insights and breaking news delivered every Sunday.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>You're subscribed! Welcome aboard.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium flex items-center gap-1 transition-all"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400 flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by Rifat Sarker • MixHub 2026 Edition
          </p>
          <div className="flex items-center gap-6 text-slate-400">
            <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-200 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-200 cursor-pointer">RSS Feed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
