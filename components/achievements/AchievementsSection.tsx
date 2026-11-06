"use client";

import { motion } from "framer-motion";
import { Trophy, Compass, Sparkles, BookOpen, Clock } from "lucide-react";
import { achievementsData } from "@/data/achievements";

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono font-medium mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            07 &bull; ACHIEVEMENTS & EXPLORATIONS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
            Technical milestones &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">
              active initiatives.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
            A transparent tracker of collegiate technical competitions, independent research, and continuous skills acquisition.
          </p>
        </div>

        {/* Milestone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {achievementsData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-3xl bg-[#101019]/60 backdrop-blur-xl border border-white/[0.07] hover:border-violet-500/30 transition-all duration-300 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-violet-600/15 text-violet-300 border border-violet-500/25">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                    <Clock className="w-3 h-3 text-violet-400" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.05] text-[11px] font-mono text-zinc-400">
                Tracked under: {item.issuer}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
