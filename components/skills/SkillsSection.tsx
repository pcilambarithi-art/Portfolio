"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Cpu,
  Flame,
  Globe,
  Terminal,
  Layers,
  Sparkles,
  Boxes,
  Eye,
  ScanSearch,
  Database,
  Camera,
  Server,
  Cloud,
  Coffee,
  FileCode,
  BookOpen,
  CloudLightning,
  Binary,
  Smile,
  GitBranch,
  Laptop,
  Palette,
  MessageSquare,
  Brain,
  Orbit,
  LayoutGrid,
} from "lucide-react";
import { skillsData, skillCategories, SkillCategoryId } from "@/data/skills";
import SkillUniverse3D from "./SkillUniverse3D";

const iconComponentMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5" />,
  Coffee: <Coffee className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
  FileCode: <FileCode className="w-5 h-5" />,
  Network: <Cpu className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  Eye: <Eye className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  ScanSearch: <ScanSearch className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Smile: <Smile className="w-5 h-5" />,
  Camera: <Camera className="w-5 h-5" />,
  Binary: <Binary className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  GitBranch: <GitBranch className="w-5 h-5" />,
  Laptop: <Laptop className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />,
  CloudLightning: <CloudLightning className="w-5 h-5" />,
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategoryId>("all");
  const [viewMode, setViewMode] = useState<"grid" | "universe">("grid");

  const filteredSkills =
    activeCategory === "all"
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono font-medium mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              02 &bull; TECHNICAL CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              A comprehensive toolkit for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">
                applied intelligence.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
              From low-level mathematical modeling and neural architectures to full-stack cloud deployment.
            </p>
          </div>

          {/* View Mode Toggle: Grid vs 3D Universe */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#101019] border border-white/[0.08] backdrop-blur-md self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("universe")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                viewMode === "universe"
                  ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>3D Universe</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: 3D Skill Universe */}
        {viewMode === "universe" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SkillUniverse3D />
          </motion.div>
        ) : (
          /* View Mode 2: Interactive Grid View */
          <div>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-10">
              {skillCategories.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)]"
                        : "bg-[#101019]/70 text-zinc-400 hover:text-zinc-200 hover:bg-[#171726] border border-white/[0.06]"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* Skills Cards Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              <AnimatePresence>
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group relative p-5 rounded-2xl bg-[#101019]/70 hover:bg-[#171726]/90 backdrop-blur-xl border border-white/[0.07] hover:border-violet-500/40 transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div
                          className="p-2.5 rounded-xl border transition-transform duration-300 group-hover:scale-105"
                          style={{
                            backgroundColor: `${skill.color || "#8B5CF6"}15`,
                            borderColor: `${skill.color || "#8B5CF6"}30`,
                            color: skill.color || "#8B5CF6",
                          }}
                        >
                          {iconComponentMap[skill.iconName] || <Cpu className="w-5 h-5" />}
                        </div>
                        {skill.badge && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-violet-600/20 text-violet-300 border border-violet-500/30">
                            {skill.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors mb-1.5">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                        {skill.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span className="capitalize">{skill.category.replace("_", " ")}</span>
                      <span className="text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Verified &bull;
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
