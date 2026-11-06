"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Network,
  Eye,
  Sparkles,
  Scan,
  Boxes,
  MapPin,
  GraduationCap,
  Calendar,
  Layers,
} from "lucide-react";
import { profileData } from "@/data/profile";

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  Eye: <Eye className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Scan: <Scan className="w-5 h-5" />,
  Boxes: <Boxes className="w-5 h-5" />,
};

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono font-medium mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            01 &bull; ABOUT ME
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Architecting the future of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">
              computational intelligence.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed">
            {profileData.introduction}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Story & Academic Profile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Story Card */}
            <div className="p-7 rounded-3xl bg-[#101019]/70 backdrop-blur-xl border border-white/[0.08] shadow-glass-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-violet-400" />
                Engineering Philosophy
              </h3>

              <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
                <p>
                  As a 3rd-year engineering student in Artificial Intelligence and Machine Learning at{" "}
                  <strong className="text-white font-medium">Dhanalakshmi College of Engineering</strong>, my driving motivation is to move beyond passive theory into tangible, operational software systems.
                </p>
                <p>
                  I bridge the gap between mathematical model formulation (loss surfaces, spectral channel representations, latent embeddings) and production-grade software delivery.
                </p>
                <p>
                  Whether implementing multispectral early disease detection with Explainable AI (Grad-CAM), or designing autonomous full-stack AI project generators with GitHub OAuth integration, every solution is built for reliability, clean architecture, and real-world impact.
                </p>
              </div>

              {/* Bio Meta Badges */}
              <div className="mt-6 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                  <div className="p-1.5 rounded-lg bg-white/[0.05] text-violet-400 border border-white/[0.06]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-zinc-400 text-[11px]">Degree</div>
                    <div className="font-semibold text-white">B.Tech AIML (3rd Yr)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                  <div className="p-1.5 rounded-lg bg-white/[0.05] text-violet-400 border border-white/[0.06]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-zinc-400 text-[11px]">Location</div>
                    <div className="font-semibold text-white">{profileData.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                  <div className="p-1.5 rounded-lg bg-white/[0.05] text-violet-400 border border-white/[0.06]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-zinc-400 text-[11px]">Graduation</div>
                    <div className="font-semibold text-white">Class of 2028</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                  <div className="p-1.5 rounded-lg bg-white/[0.05] text-violet-400 border border-white/[0.06]">
                    <Network className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-zinc-400 text-[11px]">Internship</div>
                    <div className="font-semibold text-white">Creator Space Lab</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 6 Core Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {profileData.highlights.map((highlight, index) => {
              return (
                <div
                  key={highlight.label}
                  className="group p-5 rounded-2xl bg-[#101019]/60 hover:bg-[#171726]/80 backdrop-blur-xl border border-white/[0.07] hover:border-violet-500/40 transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-violet-600/15 group-hover:bg-violet-600/25 text-violet-400 border border-violet-500/20 transition-colors">
                      {iconMap[highlight.icon] || <Cpu className="w-5 h-5" />}
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">0{index + 1}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors mb-1.5">
                      {highlight.label}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
