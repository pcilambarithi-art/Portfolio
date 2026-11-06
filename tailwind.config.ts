import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#08080D",
        "background-secondary": "#101019",
        "background-tertiary": "#171726",
        violet: {
          primary: "#8B5CF6",
          secondary: "#A78BFA",
          highlight: "#C4B5FD",
          glow: "rgba(139, 92, 246, 0.35)",
          subtle: "rgba(139, 92, 246, 0.12)",
        },
        surface: {
          glass: "rgba(16, 16, 25, 0.65)",
          "glass-hover": "rgba(23, 23, 38, 0.8)",
          border: "rgba(255, 255, 255, 0.08)",
          "border-active": "rgba(139, 92, 246, 0.4)",
        },
        text: {
          main: "#FFFFFF",
          secondary: "#A1A1AA",
          muted: "#71717A",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "glow-fade": "glow 4s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: "0.4", filter: "blur(20px)" },
          "100%": { opacity: "0.8", filter: "blur(32px)" },
        },
      },
      boxShadow: {
        "violet-glow": "0 0 30px -5px rgba(139, 92, 246, 0.3)",
        "violet-subtle": "0 0 15px -3px rgba(139, 92, 246, 0.2)",
        "glass-card": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};

export default config;
