"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2, Terminal } from "lucide-react";
import { experienceData } from "@/data/experience";

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono font-medium mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            06 &bull; INDUSTRY EXPERIENCE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Hands-on technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">
              internship tenure.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Practical engagement with real engineering environments, machine learning pipelines, and collaborative problem-solving.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6">
          {experienceData.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative p-7 sm:p-10 rounded-3xl bg-[#101019]/75 backdrop-blur-xl border border-white/[0.08] shadow-glass-card hover:border-violet-500/40 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span className="px-3 py-1 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30 text-xs font-mono font-semibold">
                      {exp.type}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                      Completed / On Record
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-semibold text-violet-400 mb-3">
                    {exp.organization}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-violet-400" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-violet-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-zinc-400 self-start">
                  Applied Machine Learning & Technology
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                {exp.summary}
              </p>

              {/* Responsibilities */}
              <div className="mb-6">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                  Key Responsibilities & Contributions:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {exp.responsibilities.map((resp) => (
                    <div key={resp} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {resp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-zinc-400 mr-2">Technologies:</span>
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-violet-600/10 text-violet-300 border border-violet-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
