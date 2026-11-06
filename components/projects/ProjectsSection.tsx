"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  FolderGit2,
  Code2,
  Layers,
  ChevronRight,
  Filter,
} from "lucide-react";
import { projectsData, projectCategories, ProjectCategory } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const featuredProjects = projectsData.filter((p) => p.featured);
  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-violet-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono font-medium mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            03 &bull; FEATURED ENGINEERING WORKS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Transforming research models into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">
              real-world applications.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Featured architectures covering autonomous code synthesis, multispectral disease detection with Explainable AI, and contextual voice assistants.
          </p>
        </div>

        {/* Featured Projects Grid (3 prominent cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} featured={true} />
          ))}
        </div>

        {/* All Projects Section with Interactive Category Filter */}
        <div className="pt-16 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">All Technical Projects</h3>
              <p className="text-xs text-zinc-400">
                Filter by specialized domains and technology stacks
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {projectCategories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.35)]"
                        : "bg-[#101019]/60 text-zinc-400 hover:text-zinc-200 hover:bg-[#171726] border border-white/[0.06]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filtered Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} featured={false} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
