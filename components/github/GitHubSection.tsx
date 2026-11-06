"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  GitBranch,
  Star,
  GitFork,
  ArrowUpRight,
  RefreshCw,
  FolderGit2,
  Calendar,
  Users,
  CheckCircle2,
  Code2,
} from "lucide-react";
import { GitHubProfileData } from "@/lib/github";
import { formatDate } from "@/lib/utils";

export default function GitHubSection() {
  const [data, setData] = useState<GitHubProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("Network response error");
        return res.json();
      })
      .then((d: GitHubProfileData) => {
        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section id="github" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono font-medium mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              08 &bull; OPEN SOURCE & GITHUB
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Continuous code{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">
                craftsmanship.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
              Live synchronization with GitHub REST API displaying public repositories, commits, and codebase activity.
            </p>
          </div>

          <a
            href="https://github.com/pcilambarithi-art"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600/20 hover:bg-violet-600 text-xs sm:text-sm font-semibold text-violet-300 hover:text-white border border-violet-500/30 transition-all self-start md:self-auto shadow-[0_0_15px_rgba(139,92,246,0.2)]"
          >
            <Github className="w-4 h-4" />
            <span>@pcilambarithi-art</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* GitHub Statistics Overview Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-[#101019]/75 backdrop-blur-xl border border-white/[0.08] shadow-sm">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
              <FolderGit2 className="w-3.5 h-3.5 text-violet-400" />
              <span>Public Repositories</span>
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              {loading ? "..." : data?.publicRepos ?? 3}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#101019]/75 backdrop-blur-xl border border-white/[0.08] shadow-sm">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
              <Users className="w-3.5 h-3.5 text-violet-400" />
              <span>Followers</span>
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              {loading ? "..." : data?.followers ?? 1}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#101019]/75 backdrop-blur-xl border border-white/[0.08] shadow-sm">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
              <Code2 className="w-3.5 h-3.5 text-violet-400" />
              <span>API Status</span>
            </div>
            <div className="text-sm font-mono font-semibold text-emerald-400 flex items-center gap-1.5 pt-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {data?.isLive ? "Live Synced" : "Cached / Fallback"}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#101019]/75 backdrop-blur-xl border border-white/[0.08] shadow-sm">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
              <Calendar className="w-3.5 h-3.5 text-violet-400" />
              <span>Developer Since</span>
            </div>
            <div className="text-sm font-mono font-bold text-white pt-1">
              {loading ? "..." : data?.createdAt ? formatDate(data.createdAt) : "Active"}
            </div>
          </div>
        </div>

        {/* Live Public Repositories Grid */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-violet-400" />
            <span>Public Repositories</span>
          </h3>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="p-6 rounded-3xl bg-[#101019]/40 border border-white/[0.05] animate-pulse h-44"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(data?.repos && data.repos.length > 0 ? data.repos : []).map((repo) => (
                <motion.a
                  key={repo.id}
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="group p-6 rounded-3xl bg-[#101019]/75 hover:bg-[#171726]/90 backdrop-blur-xl border border-white/[0.08] hover:border-violet-500/40 transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                        <FolderGit2 className="w-4 h-4 text-violet-400" />
                        <span className="truncate max-w-[200px]">{repo.name}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                      {repo.description || "Open source project repository on GitHub."}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-violet-400" />
                      {repo.language || "Code"}
                    </span>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-zinc-400">
                        <Star className="w-3.5 h-3.5 text-zinc-500" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1 text-zinc-400">
                        <GitFork className="w-3.5 h-3.5 text-zinc-500" />
                        {repo.forks}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>

        {/* Contribution Activity Visualization Banner */}
        <div className="p-7 sm:p-9 rounded-3xl bg-[#101019]/75 backdrop-blur-xl border border-white/[0.08] shadow-glass-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-base font-bold text-white">Repository Activity Heatmap</h4>
              <p className="text-xs text-zinc-400">
                Visualizing active commits and code iterations
              </p>
            </div>
            <a
              href="https://github.com/pcilambarithi-art"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-violet-400 hover:text-violet-300 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View full graph on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Activity Matrix Grid: 52 weeks x 7 days simulated distribution */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[650px] flex gap-1 justify-between">
              {Array.from({ length: 48 }).map((_, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, rowIdx) => {
                    // Seeded intensity based on position
                    const hash = (colIdx * 7 + rowIdx) % 19;
                    const isRecent = colIdx > 35;
                    const level =
                      hash === 0 || (isRecent && hash < 5)
                        ? "bg-violet-500"
                        : hash < 3
                        ? "bg-violet-700/60"
                        : hash < 6
                        ? "bg-violet-900/40"
                        : "bg-white/[0.04]";

                    return (
                      <div
                        key={rowIdx}
                        className={`h-2.5 w-2.5 rounded-sm ${level} transition-colors hover:scale-125`}
                        title={`Week ${colIdx + 1}, Day ${rowIdx + 1}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/[0.05] text-[11px] font-mono text-zinc-400">
            <span>Past 12 months</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <span className="h-2 w-2 rounded-sm bg-white/[0.04]" />
              <span className="h-2 w-2 rounded-sm bg-violet-900/40" />
              <span className="h-2 w-2 rounded-sm bg-violet-700/60" />
              <span className="h-2 w-2 rounded-sm bg-violet-500" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
