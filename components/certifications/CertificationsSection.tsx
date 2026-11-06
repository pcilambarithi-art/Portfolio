"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  FileCheck2,
  X,
  Mail,
} from "lucide-react";
import { certificationsData, Certification } from "@/data/certifications";

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono font-medium mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            05 &bull; CREDENTIALS & CERTIFICATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Industry & domain{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">
              verified competencies.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Certifications recognizing proficiency across cloud architectures, applied artificial intelligence, and precision modeling.
          </p>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificationsData.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="group relative p-6 sm:p-7 rounded-3xl bg-[#101019]/75 backdrop-blur-xl border border-white/[0.08] hover:border-violet-500/40 transition-all duration-300 shadow-glass-card hover:shadow-[0_8px_35px_rgba(139,92,246,0.2)] flex flex-col justify-between"
            >
              <div>
                {/* Header Icon & Issuer */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="p-3 rounded-2xl border"
                    style={{
                      backgroundColor: `${cert.badgeColor}15`,
                      borderColor: `${cert.badgeColor}30`,
                      color: cert.badgeColor,
                    }}
                  >
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {cert.issueDate}
                  </span>
                </div>

                <div className="text-xs font-mono text-zinc-400 mb-1">{cert.issuer}</div>
                <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors mb-3">
                  {cert.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {cert.description}
                </p>

                {/* Covered Skills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skillsCovered.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.03] text-zinc-300 border border-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Credential Status & Verify Button */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500">
                  ID: {cert.credentialId || "On file"}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <span>Verification Info</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Verification Info Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md p-6 sm:p-7 rounded-3xl bg-[#101019] border border-white/[0.1] shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2.5 rounded-2xl border"
                style={{
                  backgroundColor: `${selectedCert.badgeColor}15`,
                  borderColor: `${selectedCert.badgeColor}30`,
                  color: selectedCert.badgeColor,
                }}
              >
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{selectedCert.title}</h3>
                <p className="text-xs text-zinc-400">{selectedCert.issuer}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2 mb-5 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Issuing Entity:</span>
                <span className="text-white font-medium">{selectedCert.issuer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Credential Status:</span>
                <span className="text-emerald-400 font-mono">Issued & Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Verification Record:</span>
                <span className="text-zinc-300 font-mono">Available on request</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Official certificate copy, validation IDs, and verification documentation can be provided directly for recruitment verification.
            </p>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
              >
                Close
              </button>
              <a
                href={`mailto:ilambarithi2006@gmail.com?subject=Verification%20Request%20for%20${encodeURIComponent(
                  selectedCert.title
                )}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Request Verification Record</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
