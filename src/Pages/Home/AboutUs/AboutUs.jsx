import { Sparkles, Compass, ShieldCheck, Heart } from "lucide-react";

const AboutUs = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-12 lg:p-16 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About MixHub</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Crafting a digital haven for the <span className="text-gradient">creative mind.</span>
            </h2>

            <p className="text-slate-300 leading-relaxed text-base">
              MixHub started as an exploratory project during early days of web development and has evolved into a 2026 platform combining long-form engineering essays with an active, auto-updating live news stream.
            </p>

            <p className="text-slate-400 leading-relaxed text-sm">
              We believe in independent voices, thoughtful architecture, and providing developers and creators with an ad-free, high-fidelity reading sanctuary. Every post is written to spark insight, solve hard technical problems, and connect our growing global community.
            </p>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
              <div className="space-y-1">
                <Compass className="w-5 h-5 text-indigo-400" />
                <h4 className="text-sm font-semibold text-white">Curated Essays</h4>
                <p className="text-xs text-slate-400">Zero fluff, deep technical clarity.</p>
              </div>

              <div className="space-y-1">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-semibold text-white">Real-time Stream</h4>
                <p className="text-xs text-slate-400">Continuous live dispatches.</p>
              </div>

              <div className="space-y-1">
                <Heart className="w-5 h-5 text-pink-400" />
                <h4 className="text-sm font-semibold text-white">Independent</h4>
                <p className="text-xs text-slate-400">Built by creators for creators.</p>
              </div>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                alt="Creative Collaboration"
                className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-md bg-slate-900/80 border border-slate-700/50">
                <p className="text-xs font-semibold text-white">The Engineering & Creative Collective</p>
                <p className="text-[11px] text-slate-400">Collaborating asynchronously worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
