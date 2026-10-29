import { useState, useEffect } from "react";
import { Vote, Sparkles, CheckCircle2, BarChart3, Users } from "lucide-react";
import { motion } from "framer-motion";

const INITIAL_POLLS = [
  {
    id: "poll-1",
    question: "Which JavaScript / TypeScript runtime are you prioritizing for new services in 2026?",
    totalVotes: 842,
    options: [
      { text: "Node.js (LTS)", votes: 362 },
      { text: "Bun", votes: 295 },
      { text: "Deno 2", votes: 145 },
      { text: "Cloudflare Workerd / Edge", votes: 40 },
    ],
  },
  {
    id: "poll-2",
    question: "Where are you running AI agent inference loops?",
    totalVotes: 614,
    options: [
      { text: "Managed Cloud APIs (Gemini, Claude, GPT)", votes: 380 },
      { text: "Self-hosted vLLM / Ollama clusters", votes: 164 },
      { text: "Client-side WebGPU (local on device)", votes: 70 },
    ],
  },
  {
    id: "poll-3",
    question: "What is your primary styling workflow for React in 2026?",
    totalVotes: 980,
    options: [
      { text: "Tailwind CSS + Headless UI", votes: 620 },
      { text: "CSS Modules / Vanilla CSS", votes: 190 },
      { text: "CSS-in-JS (StyleX / PandaCSS)", votes: 110 },
      { text: "UI Component Kits (MUI / Mantine)", votes: 60 },
    ],
  },
];

const QuizzPolls = () => {
  const [polls, setPolls] = useState(() => {
    const saved = localStorage.getItem("mixhub_polls");
    return saved ? JSON.parse(saved) : INITIAL_POLLS;
  });

  const [userVotes, setUserVotes] = useState(() => {
    const saved = localStorage.getItem("mixhub_user_votes");
    return saved ? JSON.parse(saved) : {};
  });

  const handleVote = (pollId, optionIndex) => {
    if (userVotes[pollId] !== undefined) return; // already voted

    const updated = polls.map((poll) => {
      if (poll.id !== pollId) return poll;
      const newOptions = [...poll.options];
      newOptions[optionIndex] = {
        ...newOptions[optionIndex],
        votes: newOptions[optionIndex].votes + 1,
      };
      return {
        ...poll,
        totalVotes: poll.totalVotes + 1,
        options: newOptions,
      };
    });

    setPolls(updated);
    const newVotes = { ...userVotes, [pollId]: optionIndex };
    setUserVotes(newVotes);

    localStorage.setItem("mixhub_polls", JSON.stringify(updated));
    localStorage.setItem("mixhub_user_votes", JSON.stringify(newVotes));
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          <Vote className="w-3.5 h-3.5" />
          Community Pulse
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Tech Ecosystem Polls & Decisions
        </h1>
        <p className="text-sm text-slate-400">
          Vote on prevailing developer sentiment and compare your stack choices with 2,400+ active peers.
        </p>
      </div>

      {/* Polls Grid */}
      <div className="space-y-8">
        {polls.map((poll) => {
          const hasVoted = userVotes[poll.id] !== undefined;
          const votedIndex = userVotes[poll.id];

          return (
            <div
              key={poll.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {poll.question}
                </h3>
                <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/60 flex-shrink-0">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  {poll.totalVotes} votes
                </span>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {poll.options.map((opt, idx) => {
                  const percentage =
                    poll.totalVotes > 0
                      ? Math.round((opt.votes / poll.totalVotes) * 100)
                      : 0;
                  const isSelected = votedIndex === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleVote(poll.id, idx)}
                      disabled={hasVoted}
                      className={`relative w-full text-left p-4 rounded-2xl border transition-all overflow-hidden ${
                        isSelected
                          ? "border-indigo-500 bg-indigo-950/40"
                          : hasVoted
                          ? "border-slate-800 bg-slate-950/60"
                          : "border-slate-800 hover:border-slate-700 bg-slate-950 hover:bg-slate-900"
                      }`}
                    >
                      {/* Animated Progress Bar fill if voted */}
                      {hasVoted && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className={`absolute inset-y-0 left-0 rounded-2xl ${
                            isSelected
                              ? "bg-indigo-600/25"
                              : "bg-slate-800/40"
                          }`}
                        />
                      )}

                      <div className="relative flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                          )}
                          <span
                            className={`text-sm font-medium ${
                              isSelected ? "text-white font-bold" : "text-slate-200"
                            }`}
                          >
                            {opt.text}
                          </span>
                        </div>

                        {hasVoted && (
                          <span className="text-xs font-mono font-bold text-slate-400 flex-shrink-0">
                            {percentage}% ({opt.votes})
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {hasVoted && (
                <div className="text-xs text-slate-500 font-mono text-right flex items-center justify-end gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Your vote is recorded in the 2026 decentralized consensus tally.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizzPolls;
