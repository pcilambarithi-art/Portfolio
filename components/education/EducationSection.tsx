"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, BookOpen, Award } from "lucide-react";
import { educationData } from "@/data/education";

export default function EducationSection() {
  return (
    <section id="education" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono font-medium mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            04 &bull; ACADEMIC FOUNDATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Rigorous education in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">
              artificial intelligence.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Building deep mathematical foundations, algorithmic discipline, and research acumen.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="space-y-8">
          {educationData.map((edu, idx) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative p-6 sm:p-9 rounded-3xl bg-[#101019]/75 backdrop-blur-xl border border-white/[0.08] shadow-glass-card hover:border-violet-500/40 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span className="px-3 py-1 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30 text-xs font-mono font-semibold">
                      {edu.degree} &bull; {edu.department}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                      Current: {edu.currentYear}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {edu.institution}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-violet-400" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-violet-400" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-right self-start">
                  <div className="text-[11px] text-zinc-400 font-mono">Expected Completion</div>
                  <div className="text-base font-bold text-white font-mono">{edu.expectedGraduation}</div>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                {edu.description}
              </p>

              {/* Coursework Modules */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
                  <BookOpen className="w-4 h-4 text-violet-400" />
                  <span>Key Coursework & Domains:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white/[0.03] hover:bg-white/[0.07] text-zinc-300 border border-white/[0.06] transition-colors"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
