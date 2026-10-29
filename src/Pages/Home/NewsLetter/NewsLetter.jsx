import { useState } from "react";
import Swal from "sweetalert2";
import { Mail, Sparkles, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validEmail.test(email)) {
      Swal.fire({
        title: "Invalid Email Address",
        text: "Please provide a valid email format.",
        icon: "warning",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Swal.fire({
        title: "Welcome to MixHub Dispatch!",
        text: "Thank you for joining our weekly architectural newsletter.",
        icon: "success",
        confirmButtonColor: "#4f46e5",
      });
      setEmail("");
    }, 600);
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 border border-indigo-500/20 p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl overflow-hidden">
        {/* Glow blur */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative space-y-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Weekly Editorial Roundup</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Stay ahead with the <span className="text-gradient">Sunday Briefing</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Zero marketing spam. Only deeply researched breakdowns of distributed systems, open-source milestones, and real-time tech dispatches delivered once a week.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto pt-2">
            <div className="flex flex-col sm:flex-row gap-3 shadow-xl rounded-2xl bg-slate-900/90 border border-slate-800 p-1.5">
              <div className="relative flex-1 flex items-center pl-3">
                <Mail className="w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your engineer email..."
                  required
                  className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all flex-shrink-0 disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Joining..."
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 font-mono">
              Join 52,000+ developers • Unsubscribe anytime with 1-click
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
