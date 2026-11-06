"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  Trash2,
  Bot,
  User,
  Compass,
  Briefcase,
  ChevronDown,
  Info,
} from "lucide-react";
import {
  AIChatMode,
  ChatMessage,
  getOfflinePortfolioResponse,
  getOfflineCareerResponse,
} from "@/lib/ai/provider";

const suggestedQuestions = {
  portfolio: [
    "Who is Ilambarithi?",
    "What projects has he built?",
    "What are his technical skills?",
    "Tell me about his education and college.",
    "How can I contact Ilambarithi?",
  ],
  career: [
    "Explain Machine Learning.",
    "How can I start learning Generative AI?",
    "How does RAG (Retrieval-Augmented Generation) work?",
    "What are essential skills for computer vision?",
    "Tips for AI/ML technical interview preparation?",
  ],
};

export default function AskTerexAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AIChatMode>("portfolio");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I am **Ask Terex AI**, your digital guide to **ILAMBARITHI N**'s engineering portfolio.\n\nYou can ask me about his AI/ML projects, education at Dhanalakshmi College of Engineering, skills, or switch to **Career Mode** for deep technical guidance on AI, deep learning, and roadmap advice!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          mode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to retrieve response.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content || "I am currently unable to provide a response.",
        },
      ]);
    } catch (err: any) {
      // Graceful fallback for static GitHub Pages hosting
      const fallbackContent =
        mode === "portfolio"
          ? getOfflinePortfolioResponse(text)
          : getOfflineCareerResponse(text);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: fallbackContent,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: `Chat session refreshed. Currently operating in **${
          mode === "portfolio" ? "Portfolio Assistant" : "Career Assistant"
        }** mode. How can I help you today?`,
      },
    ]);
  };

  // Helper to parse basic markdown links, bold, code in messages
  const renderFormattedText = (content: string) => {
    const paragraphs = content.split("\n\n");
    return paragraphs.map((p, idx) => {
      // Process bullet items
      if (p.includes("\n- ") || p.startsWith("- ") || p.includes("\n1. ")) {
        const lines = p.split("\n");
        return (
          <div key={idx} className="space-y-1 my-2">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 text-xs leading-relaxed">
                    <span className="text-violet-400 mt-1">&bull;</span>
                    <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.substring(2)) }} />
                  </div>
                );
              }
              if (/^\d+\.\s/.test(trimmed)) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 text-xs leading-relaxed">
                    <span className="font-mono text-violet-400">{trimmed.match(/^\d+\./)?.[0]}</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: formatInline(trimmed.replace(/^\d+\.\s*/, "")),
                      }}
                    />
                  </div>
                );
              }
              return (
                <p
                  key={lIdx}
                  className="text-xs leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
                />
              );
            })}
          </div>
        );
      }

      // Blockquotes / notice
      if (p.startsWith("> ")) {
        return (
          <div
            key={idx}
            className="p-3 my-2 rounded-xl bg-violet-950/30 border border-violet-500/30 text-xs text-violet-200 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatInline(p.replace(/^>\s*/, "")) }}
          />
        );
      }

      // Headers
      if (p.startsWith("### ")) {
        return (
          <h4 key={idx} className="font-bold text-white text-sm mt-3 mb-1">
            {p.replace(/^###\s*/, "")}
          </h4>
        );
      }

      return (
        <p
          key={idx}
          className="text-xs leading-relaxed my-1.5"
          dangerouslySetInnerHTML={{ __html: formatInline(p) }}
        />
      );
    });
  };

  const formatInline = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code class='px-1.5 py-0.5 rounded bg-white/10 text-violet-300 font-mono text-[11px]'>$1</code>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' target='_blank' rel='noopener noreferrer' class='text-violet-400 underline hover:text-violet-300'>$1</a>");
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-[0_0_30px_rgba(139,92,246,0.6)] border border-violet-400/40 backdrop-blur-md cursor-pointer transition-colors"
          aria-label="Toggle Ask Terex AI chatbot"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-200 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>

          <Bot className="w-5 h-5" />
          <span className="hidden sm:inline font-mono tracking-tight">Ask Terex AI</span>
        </motion.button>
      </div>

      {/* Floating Chat Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 sm:right-6 z-40 w-[92vw] sm:w-[440px] h-[600px] max-h-[82vh] rounded-3xl bg-[#101019]/95 backdrop-blur-2xl border border-white/[0.12] shadow-[0_15px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">Ask Terex AI</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-violet-500/20 text-violet-300 font-mono">
                      v2.0
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Provider-Independent AI Core</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close modal"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="p-2.5 bg-[#08080D]/80 border-b border-white/[0.06] flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMode("portfolio")}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  mode === "portfolio"
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Portfolio Mode</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("career")}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  mode === "career"
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Career & AI Guide</span>
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, idx) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-xl shrink-0 mt-0.5 ${
                        isUser
                          ? "bg-violet-500 text-white"
                          : "bg-violet-600/20 text-violet-400 border border-violet-500/30"
                      }`}
                    >
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isUser
                          ? "bg-violet-600 text-white rounded-tr-none shadow-md"
                          : "bg-white/[0.04] text-zinc-300 rounded-tl-none border border-white/[0.06]"
                      }`}
                    >
                      {isUser ? m.content : renderFormattedText(m.content)}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30 shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] rounded-tl-none flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts Strip */}
            <div className="px-3 py-2 bg-black/40 border-t border-white/[0.05] overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
              {suggestedQuestions[mode].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1 rounded-lg text-[11px] bg-white/[0.04] hover:bg-violet-600/20 hover:text-violet-300 text-zinc-400 border border-white/[0.06] transition-colors shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#08080D] border-t border-white/[0.08] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === "portfolio"
                    ? "Ask about Ilambarithi's projects, skills..."
                    : "Ask about machine learning, roadmaps..."
                }
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-violet-500 text-white text-xs outline-none transition-colors placeholder:text-zinc-600"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white transition-colors shrink-0 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
