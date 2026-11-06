"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Sparkles,
  FileText,
  User,
  Briefcase,
  Code2,
  Cpu,
  Brain,
  Download,
  CheckCircle2,
  X,
  Mail,
} from "lucide-react";
import Hero3DCanvas from "./Hero3DCanvas";
import { profileData } from "@/data/profile";

export default function Hero() {
  const [resumeExists, setResumeExists] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    fetch("/api/resume/check")
      .then((res) => res.json())
      .then((data) => {
        if (data.exists) setResumeExists(true);
      })
      .catch(() => {});
  }, []);

  const handleResumeClick = (e: React.MouseEvent) => {
    if (resumeExists) {
      window.open("/resume/resume.pdf", "_blank");
    } else {
      e.preventDefault();
      setShowResumeModal(true);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-700/8 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Grid lines background texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#17172608_1px,transparent_1px),linear-gradient(to_bottom,#17172608_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start z-10"
          >
            {/* Availability Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-glass border border-surface-border backdrop-blur-md mb-6 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono text-zinc-300">
                {profileData.availability.message}
              </span>
            </motion.div>

            {/* Brand Title Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="text-xs sm:text-sm font-mono tracking-widest text-violet-400 uppercase font-semibold">
                {profileData.brandName} &bull; {profileData.title}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
            >
              Building{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">
                Intelligent Solutions
              </span>{" "}
              with AI.
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed mb-8"
            >
              {profileData.supportingText}
            </motion.p>

            {/* Hero Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              {/* Explore My Work button */}
              <button
                type="button"
                onClick={() => scrollTo("projects")}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-300 shadow-[0_0_25px_rgba(139,92,246,0.45)] hover:shadow-[0_0_35px_rgba(139,92,246,0.65)] hover:scale-[1.02]"
              >
                <Briefcase className="w-4 h-4 text-violet-200" />
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              {/* About Me button */}
              <button
                type="button"
                onClick={() => scrollTo("about")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 hover:text-white text-sm font-medium transition-all duration-300 border border-white/[0.08] hover:border-violet-500/30 backdrop-blur-md"
              >
                <User className="w-4 h-4 text-zinc-400" />
                <span>About Me</span>
              </button>

              {/* Download Resume button */}
              <button
                type="button"
                onClick={handleResumeClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-surface-glass hover:bg-violet-950/30 text-violet-300 hover:text-violet-200 text-sm font-medium transition-all duration-300 border border-violet-500/30 hover:border-violet-500/50 backdrop-blur-md group"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Resume</span>
              </button>
            </motion.div>

            {/* Quick Metrics Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-12 pt-8 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4 w-full"
            >
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">B.Tech</div>
                <div className="text-xs text-zinc-400">AI & Machine Learning</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-violet-400">3rd Year</div>
                <div className="text-xs text-zinc-400">Graduation 2028</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">Creator Space</div>
                <div className="text-xs text-zinc-400">Applied AI Intern</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-violet-400">3+</div>
                <div className="text-xs text-zinc-400">Certifications</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Visual & Floating Glass Panels */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* The 3D Interactive Canvas */}
            <Hero3DCanvas />

            {/* Floating Glassmorphism Spec Shards around the canvas */}
            {/* Card 1: AI Architectures */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="absolute -top-4 -left-4 sm:top-6 sm:left-0 p-3.5 rounded-2xl bg-[#101019]/75 backdrop-blur-xl border border-white/[0.1] shadow-2xl flex items-center gap-3 animate-float-slow"
            >
              <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">AI & Deep Learning</div>
                <div className="text-[10px] text-zinc-400">Neural Network Architectures</div>
              </div>
            </motion.div>

            {/* Card 2: Explainable AI & Multispectral */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="absolute -bottom-4 sm:bottom-6 sm:left-4 p-3.5 rounded-2xl bg-[#101019]/75 backdrop-blur-xl border border-white/[0.1] shadow-2xl flex items-center gap-3 animate-float-slow [animation-delay:2s]"
            >
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Explainable AI (XAI)</div>
                <div className="text-[10px] text-zinc-400">Grad-CAM Feature Attribution</div>
              </div>
            </motion.div>

            {/* Card 3: Code & Full-Stack Systems */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="absolute top-1/2 -right-2 sm:-right-6 p-3 rounded-2xl bg-[#101019]/75 backdrop-blur-xl border border-white/[0.1] shadow-2xl flex items-center gap-3 animate-float-slow [animation-delay:4s]"
            >
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Production Stack</div>
                <div className="text-[10px] text-zinc-400">FastAPI &bull; PyTorch &bull; Next.js</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Resume Info Modal (if resume PDF is yet to be placed) */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#101019] border border-white/[0.1] shadow-2xl">
            <button
              type="button"
              onClick={() => setShowResumeModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Resume Information</h3>
                <p className="text-xs text-zinc-400">ILAMBARITHI N &bull; AI/ML Engineer</p>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              The updated PDF resume is available on request. You can directly request a copy or contact Ilambarithi for current recruitment and internship opportunities.
            </p>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-5 text-xs text-zinc-400">
              <div className="font-mono text-zinc-300 mb-1">To add a PDF:</div>
              Place your file at <code className="text-violet-300">public/resume/resume.pdf</code>.
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowResumeModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              >
                Close
              </button>
              <a
                href="mailto:ilambarithi2006@gmail.com?subject=Inquiry%20regarding%20Resume%20for%20ILAMBARITHI%20N"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Request Resume by Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
