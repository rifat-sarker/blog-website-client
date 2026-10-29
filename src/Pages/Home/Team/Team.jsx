import { Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const TEAM_MEMBERS = [
  {
    name: "Kimberly Power",
    role: "Founding Editor",
    handle: "@kimberlypower",
    email: "kimberly@mixhub.dev",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    specialty: "Distributed Systems & Architecture",
  },
  {
    name: "Martin Hector",
    role: "Senior Tech Editor",
    handle: "@martinhector",
    email: "martin@mixhub.dev",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    specialty: "Compiler & Browser Engines",
  },
  {
    name: "Harvey Spector",
    role: "Managing Partner",
    handle: "@harveyspector",
    email: "harvey@mixhub.dev",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    specialty: "Strategy & Tech Governance",
  },
  {
    name: "Michael Josh",
    role: "Developer Relations",
    handle: "@michaeljosh",
    email: "mike@mixhub.dev",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    specialty: "Open-Source Community",
  },
  {
    name: "Rachel Zoe",
    role: "Content Strategist",
    handle: "@rachelzoe",
    email: "rachel@mixhub.dev",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    specialty: "Editorial Narrative & Culture",
  },
  {
    name: "Donna Pearson",
    role: "Head of Operations",
    handle: "@donnapearson",
    email: "donna@mixhub.dev",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    specialty: "Platform Infrastructure & Talent",
  },
];

const Team = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          The Curators
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Meet Our Editorial Board
        </h2>
        <p className="text-sm text-slate-400">
          The minds reviewing submissions, validating benchmarks, and moderating community discourse.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEAM_MEMBERS.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className="group relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-indigo-500/30 hover:bg-slate-900/80 transition-all flex flex-col justify-between"
          >
            <div className="flex items-start gap-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-14 h-14 rounded-xl object-cover ring-2 ring-slate-800 group-hover:ring-indigo-500/50 transition-all flex-shrink-0"
              />
              <div className="space-y-1 min-w-0">
                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-indigo-400 truncate">{member.role}</p>
                <p className="text-[11px] text-slate-500 font-mono truncate">{member.handle}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
              <span className="truncate pr-2 text-slate-400 text-[11px]">
                {member.specialty}
              </span>
              <a
                href={`mailto:${member.email}`}
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-indigo-600 hover:text-white transition-colors text-slate-400 flex-shrink-0"
                title={`Email ${member.name}`}
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Team;
