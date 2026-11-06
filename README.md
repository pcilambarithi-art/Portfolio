# ILAMBARITHI.N — Premium AI/ML Engineer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Deployment_Ready-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

A bespoke, production-ready, dark futuristic portfolio website built for **ILAMBARITHI N** (AI/ML Engineer). Designed with aesthetics inspired by Apple, Vercel, and Linear, featuring real-time 3D environments, an interactive 3D skill universe, live GitHub API integration, and an intelligent provider-independent AI chatbot (*Ask Terex AI*).

---

## 🌟 Key Features

1. **Immersive Hero Section & 3D Environment**
   - Full-screen landing with Three.js neural lattice and ambient violet particle field.
   - Dynamic glassmorphism floating cards, animated title reveals, and availability beacon.
   - Responsive CTA buttons with smooth anchor scrolling and dynamic resume handler.

2. **Advanced Interactive Cursor System**
   - Canvas-based particle spark trail and cursor-following violet spotlight.
   - 3D perspective tilt on project cards.
   - Automatically disabled on touch/mobile devices and respects `prefers-reduced-motion`.

3. **Floating Glassmorphism Navigation**
   - Scroll-aware active section detection with animated violet indicator pill.
   - Mobile animated drawer navigation.
   - Quick access to live GitHub and direct contact.

4. **Technical Skills & 3D Interactive Skill Universe**
   - **Grid View**: Filterable by Programming Languages, AI & Machine Learning, Frameworks & Libraries, Web Development, and Tools & Platforms.
   - **3D Universe View**: Interactive Three.js constellation where technologies appear as floating nodes with connective neural links. Click-and-drag to rotate; hover to inspect node descriptions.

5. **Featured & All Projects Showcase**
   - **Featured Projects**:
     1. *AI Project Builder* (Full-stack code generator with manifest validation & GitHub OAuth).
     2. *Explainable Deep Learning Framework for Crop Diseases* (Multispectral imagery + Grad-CAM XAI).
     3. *Personal AI Assistant — SARA* (Conversational memory + system automation).
   - Dedicated project detail pages at `/projects/[slug]` with problem statements, proposed solutions, architectural node flowcharts, and feature breakdowns.
   - Technology filtering for all technical projects.

6. **Ask Terex AI — Dual-Mode Interactive AI Chatbot**
   - **Mode 1 (Portfolio Assistant)**: Answers questions grounded strictly in Ilambarithi's verified education, projects, skills, certifications, and contact info.
   - **Mode 2 (Career & Technical Assistant)**: Provides mentoring on Machine Learning, Deep Learning, Generative AI, RAG, and technical interview roadmaps.
   - **Provider-Independent Architecture**: Configurable via `.env` for **Google Gemini**, **OpenAI**, or **Groq**.
   - Built-in fallback knowledge engine ensures 100% functionality even before external API keys are configured.

7. **Live GitHub REST API Integration**
   - Real-time synchronization with `@pcilambarithi-art`.
   - Live public repository cards (stars, forks, languages, direct links).
   - 52-week activity heatmap visualization and developer metrics.
   - In-memory caching (1-hour TTL) to prevent API rate limiting.

8. **Education & Industry Credentials**
   - **Education**: B.Tech in Artificial Intelligence & Machine Learning at Dhanalakshmi College of Engineering (3rd Year, Class of 2028).
   - **Certifications**: AWS, Creator Space Lab, Autodesk with interactive verification modals.
   - **Internship**: Creator Space Lab applied AI internship record.

9. **Interactive Contact Form & Email Dispatch**
   - Frontend and backend validation.
   - Spam protection via honeypot field and IP rate limiting.
   - Pluggable provider support (Resend API, SMTP, or Console mode).

10. **Resume Integration**
    - Place `resume.pdf` in `/public/resume/resume.pdf` to enable one-click viewing/downloading across the site.
    - Graceful request modal when no file is present.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Custom Glassmorphism tokens
- **3D & Graphics**: Three.js (Custom WebGL Canvas)
- **Motion & Animations**: Framer Motion, Lenis Smooth Scroll
- **Icons**: Lucide React
- **Deployment Platform**: Vercel Ready

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js 18.17+ or 20+
- npm or pnpm or yarn

### 1. Clone & Install Dependencies
```bash
cd portfolio
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` to configure your preferred options:
```env
# AI Assistant Provider (Options: "gemini" | "openai" | "groq")
AI_PROVIDER=gemini
AI_API_KEY=your_gemini_api_key_here
AI_MODEL=gemini-1.5-flash

# Email Provider (Options: "resend" | "smtp" | "console")
EMAIL_PROVIDER=console
RESEND_API_KEY=
CONTACT_NOTIFICATION_EMAIL=ilambarithi2006@gmail.com

# GitHub Settings
GITHUB_USERNAME=pcilambarithi-art
GITHUB_TOKEN=
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # Ask Terex AI endpoint (Rate limiting & provider dispatch)
│   │   ├── contact/route.ts       # Contact form endpoint (Spam protection & validation)
│   │   ├── github/route.ts        # GitHub API caching proxy
│   │   └── resume/check/route.ts  # Dynamic resume presence detector
│   ├── projects/[slug]/page.tsx   # Individual project detail pages
│   ├── layout.tsx                 # Root layout with SEO JSON-LD & motion wrappers
│   ├── page.tsx                   # Main portfolio single-page experience
│   ├── globals.css                # Global styles & glassmorphism utilities
│   ├── sitemap.ts                 # Dynamic XML sitemap generator
│   └── robots.ts                  # Search engine robots.txt
├── components/
│   ├── animations/                # CustomCursor, SmoothScroll
│   ├── chatbot/                   # AskTerexAI interactive chat window
│   ├── common/                    # Navbar, Footer, ScrollProgress, BackToTop
│   ├── hero/                      # Hero section & Hero3DCanvas
│   ├── about/                     # About me section & core pillars
│   ├── skills/                    # SkillsSection & SkillUniverse3D
│   ├── projects/                  # ProjectsSection & ProjectCard (3D tilt)
│   ├── education/                 # Education timeline
│   ├── certifications/            # Certifications cards & verify modals
│   ├── experience/                # Internship timeline
│   ├── achievements/              # Technical milestones tracker
│   ├── github/                    # GitHub repository grid & activity heatmap
│   └── contact/                   # Contact form & social connections
├── data/                          # Typed modular data files (Easily editable)
│   ├── profile.ts
│   ├── skills.ts
│   ├── projects.ts
│   ├── education.ts
│   ├── certifications.ts
│   ├── experience.ts
│   └── achievements.ts
├── lib/
│   ├── ai/                        # Provider-independent AI service (Gemini, OpenAI, Groq)
│   ├── email/                     # Contact email adapter (Resend, Console)
│   ├── github/                    # GitHub REST API fetcher & cache
│   └── utils.ts
├── public/
│   ├── icon.svg                   # Custom favicon
│   ├── manifest.json              # PWA manifest
│   └── resume/                    # Place resume.pdf here
└── vercel.json                    # Vercel deployment configuration
```

---

## 🚢 Deploying to Vercel

1. Push your code to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete ILAMBARITHI.N AI/ML engineer portfolio"
   git remote add origin https://github.com/pcilambarithi-art/portfolio.git
   git branch -M main
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import the `portfolio` repository.
4. Add the environment variables (`AI_API_KEY`, `RESEND_API_KEY`, etc.) in the Vercel project settings.
5. Click **Deploy**. Vercel will build and assign your production domain.

---

## 📄 License & Credits

- Designed and engineered for **ILAMBARITHI N** (AI/ML Engineer).
- Distributed under the MIT License.
