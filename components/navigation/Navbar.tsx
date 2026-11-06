"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  FileText,
  Github,
  Mail,
} from "lucide-react";
import { profileData } from "@/data/profile";

const navItems = [
  { label: "Home", href: "#hero", id: "hero" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Certifications", href: "#certifications", id: "certifications" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "GitHub", href: "#github", id: "github" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeAvailable, setResumeAvailable] = useState(false);

  useEffect(() => {
    // Check if resume file exists
    fetch("/api/resume/check")
      .then((res) => res.json())
      .then((data) => {
        if (data.exists) setResumeAvailable(true);
      })
      .catch(() => {});

    // Scroll listener for active section & navbar background
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionElements = navItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveSection(el.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 border ${
              scrolled
                ? "bg-[#101019]/80 backdrop-blur-xl border-white/[0.09] shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
                : "bg-[#101019]/40 backdrop-blur-md border-white/[0.05]"
            }`}
          >
            {/* Brand Logo */}
            <Link
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="flex items-center gap-2 group text-white font-semibold text-sm sm:text-base tracking-wider"
            >
              <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-violet-600 to-violet-400 flex items-center justify-center text-white text-xs font-bold shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:scale-105 transition-transform">
                I
              </div>
              <span className="font-mono font-bold tracking-tight">
                {profileData.brandName}
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative px-3 py-1.5 text-xs font-medium transition-colors rounded-full ${
                      isActive
                        ? "text-white"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-violet-600/25 border border-violet-500/40 rounded-full -z-10 shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* Right Action CTA & Availability Badge */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Availability Indicator */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Open for Opportunities</span>
              </div>

              {/* Resume download or contact link */}
              {resumeAvailable ? (
                <a
                  href="/resume/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-xs font-medium text-violet-300 hover:text-white transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70" />
                </a>
              ) : (
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get in Touch</span>
                </a>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden p-5 rounded-2xl bg-[#101019]/95 backdrop-blur-2xl border border-white/[0.1] shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-violet-600/20 text-white border border-violet-500/30"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#8B5CF6]" />
                    )}
                  </a>
                );
              })}

              <div className="pt-3 mt-2 border-t border-white/[0.08] flex flex-col gap-2.5">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Open to internships and opportunities</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="https://github.com/pcilambarithi-art"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs text-zinc-300 transition-colors border border-white/[0.06]"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "#contact")}
                    className="flex items-center justify-center gap-2 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs text-white font-medium transition-colors shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
