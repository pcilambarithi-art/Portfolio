"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Github,
  ArrowUpRight,
  Sparkles,
  Layers,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      className={`group relative rounded-3xl bg-[#101019]/75 backdrop-blur-xl border border-white/[0.08] hover:border-violet-500/40 transition-colors duration-300 overflow-hidden flex flex-col justify-between ${
        featured
          ? "p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_45px_rgba(139,92,246,0.25)]"
          : "p-5 sm:p-6 shadow-md hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)]"
      }`}
    >
      {/* Top Banner Gradient & Category Badge */}
      <div className="relative mb-5">
        <div
          className={`h-28 sm:h-36 rounded-2xl bg-gradient-to-br ${project.bannerGradient} border border-white/[0.06] p-4 flex flex-col justify-between overflow-hidden relative`}
        >
          {/* Subtle grid in thumbnail */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

          <div className="flex items-center justify-between z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.1] text-xs font-mono text-zinc-300">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: project.accentColor }}
              />
              {project.category}
            </span>

            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-600/30 border border-violet-500/40 text-[11px] font-semibold text-violet-200 backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-violet-300" />
                Featured
              </span>
            )}
          </div>

          <div className="z-10 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>{project.year}</span>
            <span className="text-zinc-500 font-mono">[{project.slug}]</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-violet-300 transition-colors mb-2">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5">
            {project.shortDescription}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2 py-1 rounded-lg text-[11px] font-mono bg-white/[0.03] text-zinc-500">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Action Button Links */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/[0.08] transition-colors"
                aria-label={`View ${project.title} GitHub repository`}
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/[0.08] transition-colors"
                aria-label={`View ${project.title} live demo`}
                title="Live Demo"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-600/15 hover:bg-violet-600 text-xs font-semibold text-violet-300 hover:text-white border border-violet-500/30 hover:border-violet-500 transition-all duration-200"
          >
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
