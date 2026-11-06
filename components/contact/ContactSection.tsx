"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  Linkedin,
  Github,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { profileData } from "@/data/profile";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Frontend validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage("Please enter a valid name (at least 2 characters).");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 2) {
      setErrorMessage("Please provide a message subject.");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage("Please provide a detailed message (at least 10 characters).");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit message.");
      }

      setSuccessMessage(data.message || "Your message was sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        honeypot: "",
      });
    } catch (err: any) {
      setErrorMessage(
        err.message || "An error occurred while dispatching your message. Please email directly."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono font-medium mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            09 &bull; GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Let&apos;s build something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">
              intelligent together.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Interested in collaboration, internship positions, technical research, or AI/ML discussions? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Availability Status Card */}
            <div className="p-7 rounded-3xl bg-[#101019]/75 backdrop-blur-xl border border-white/[0.08] shadow-glass-card">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                  Status: Available
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Open to Internships & Opportunities
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Currently exploring roles where I can contribute to cutting-edge AI modeling, computer vision pipelines, and full-stack generative systems.
              </p>

              <div className="space-y-3 pt-6 border-t border-white/[0.06] text-xs">
                {/* Email */}
                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-zinc-300 hover:text-white transition-colors group"
                >
                  <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-zinc-400">Official Email</div>
                    <div className="font-medium text-white truncate">{profileData.contact.email}</div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-zinc-500 group-hover:text-violet-400 transition-colors" />
                </a>

                {/* Location */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-zinc-300">
                  <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400">Location</div>
                    <div className="font-medium text-white">{profileData.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-[#101019]/75 hover:bg-[#171726] border border-white/[0.08] hover:border-violet-500/40 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#0077B5]/20 text-[#0077B5]">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white">LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-violet-400 transition-colors" />
              </a>

              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-[#101019]/75 hover:bg-[#171726] border border-white/[0.08] hover:border-violet-500/40 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white/[0.08] text-white">
                    <Github className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white">GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-violet-400 transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 p-7 sm:p-10 rounded-3xl bg-[#101019]/80 backdrop-blur-xl border border-white/[0.09] shadow-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
              Fill out the form below and your inquiry will be routed directly to Ilambarithi.
            </p>

            {/* Status alerts */}
            {successMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-400 text-xs sm:text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Message Dispatched</div>
                  <div>{successMessage}</div>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-400 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Error</div>
                  <div>{errorMessage}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Spam honeypot hidden field */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-zinc-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Chen"
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] focus:border-violet-500 focus:bg-white/[0.06] text-white text-sm outline-none transition-all placeholder:text-zinc-600"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-zinc-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] focus:border-violet-500 focus:bg-white/[0.06] text-white text-sm outline-none transition-all placeholder:text-zinc-600"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-zinc-300 mb-1.5">
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Internship opportunity / Collaboration / Technical query"
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] focus:border-violet-500 focus:bg-white/[0.06] text-white text-sm outline-none transition-all placeholder:text-zinc-600"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-zinc-300 mb-1.5">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your project, role, or inquiry..."
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] focus:border-violet-500 focus:bg-white/[0.06] text-white text-sm outline-none transition-all placeholder:text-zinc-600 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-semibold transition-all shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:shadow-[0_0_35px_rgba(139,92,246,0.6)] cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    <span>Processing & Dispatching...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Dispatch Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
