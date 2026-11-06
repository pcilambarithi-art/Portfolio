import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  Github,
  ArrowUpRight,
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Boxes,
  Code2,
} from "lucide-react";
import { projectsData, Project } from "@/data/projects";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — ILAMBARITHI.N | AI/ML Engineer`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — ILAMBARITHI.N`,
      description: project.shortDescription,
    },
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#08080D] text-white pt-28 pb-20 selection:bg-violet-600 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-violet-600/8 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects Overview</span>
        </Link>

        {/* Project Header Header Card */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-[#101019]/80 backdrop-blur-xl border border-white/[0.09] shadow-2xl mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-xs font-mono text-violet-300">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: project.accentColor }}
              />
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-zinc-400">
              {project.year}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-600/30 border border-violet-500/40 text-xs font-semibold text-violet-200">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Project
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-8">
            {project.tagline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/[0.08]">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs sm:text-sm font-medium text-white border border-white/[0.08] transition-all"
              >
                <Github className="w-4 h-4" />
                <span>View Source on GitHub</span>
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-xs sm:text-sm font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>Open Live Project</span>
              </a>
            )}
          </div>
        </div>

        {/* Problem vs Proposed Solution Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Problem Statement */}
          <div className="p-7 rounded-3xl bg-[#101019]/60 backdrop-blur-xl border border-white/[0.08] shadow-glass-card">
            <div className="flex items-center gap-2.5 text-rose-400 text-sm font-semibold mb-4">
              <AlertCircle className="w-5 h-5" />
              <span>Problem Statement</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          {/* Proposed Solution */}
          <div className="p-7 rounded-3xl bg-[#101019]/60 backdrop-blur-xl border border-white/[0.08] shadow-glass-card">
            <div className="flex items-center gap-2.5 text-emerald-400 text-sm font-semibold mb-4">
              <CheckCircle2 className="w-5 h-5" />
              <span>Proposed Solution</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.proposedSolution}
            </p>
          </div>
        </div>

        {/* Architectural Overview & Visual Flow Diagram */}
        <div className="p-7 sm:p-10 rounded-3xl bg-[#101019]/70 backdrop-blur-xl border border-white/[0.08] shadow-glass-card mb-12">
          <div className="flex items-center gap-2.5 text-violet-400 text-sm font-semibold mb-2">
            <Layers className="w-5 h-5" />
            <span>Architecture & System Flow</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed mb-8">
            {project.architectureOverview}
          </p>

          {/* Architecture Flowchart Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.architectureNodes.map((node, index) => (
              <div
                key={node.title}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-violet-500/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center justify-center h-6 w-6 rounded-lg bg-violet-600/20 text-violet-400 text-xs font-mono font-bold border border-violet-500/30">
                    0{index + 1}
                  </span>
                  <h4 className="text-sm font-bold text-white">{node.title}</h4>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{node.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="p-7 sm:p-10 rounded-3xl bg-[#101019]/70 backdrop-blur-xl border border-white/[0.08] shadow-glass-card mb-12">
          <div className="flex items-center gap-2.5 text-cyan-400 text-sm font-semibold mb-6">
            <Sparkles className="w-5 h-5" />
            <span>Key Engineering Features</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Used */}
        <div className="p-7 sm:p-8 rounded-3xl bg-[#101019]/70 backdrop-blur-xl border border-white/[0.08] shadow-glass-card mb-16">
          <div className="flex items-center gap-2.5 text-zinc-400 text-sm font-semibold mb-4">
            <Code2 className="w-5 h-5 text-violet-400" />
            <span>Technologies & Libraries</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-xl text-xs font-mono bg-violet-600/10 text-violet-300 border border-violet-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Navigation Back */}
        <div className="text-center pt-8 border-t border-white/[0.06]">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio Main Experience</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
