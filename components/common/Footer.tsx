"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail, Heart, Sparkles } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#08080D] pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-6 flex flex-col items-start">
            <Link
              href="#hero"
              className="flex items-center gap-2 group text-white font-semibold text-lg tracking-wider mb-4"
            >
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-violet-600 to-violet-400 flex items-center justify-center text-white text-xs font-bold shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                I
              </div>
              <span className="font-mono font-bold tracking-tight">
                {profileData.brandName}
              </span>
            </Link>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed mb-6">
              AI/ML Engineer focused on generative systems, explainable deep learning, and robust engineering architecture.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for internships & junior roles</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <a href="#hero" className="hover:text-violet-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-violet-300 transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-violet-300 transition-colors">
                  Technical Skills & 3D Universe
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-violet-300 transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-violet-300 transition-colors">
                  Education & Timeline
                </a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-violet-300 transition-colors">
                  Certifications
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-violet-300 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Connect */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
              Connect & Verify
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-violet-400" />
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>

              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-violet-400" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>

              <a
                href={`mailto:${profileData.contact.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-violet-400" />
                <span>Official Email</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            &copy; {currentYear} {profileData.brandName}. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span>Engineered with Next.js, Three.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
