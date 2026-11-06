import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import CustomCursor from "@/components/animations/CustomCursor";
import ScrollProgress from "@/components/common/ScrollProgress";
import BackToTop from "@/components/common/BackToTop";
import { profileData } from "@/data/profile";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ilambarithi-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ILAMBARITHI N — AI/ML Engineer | Portfolio",
    template: "%s | ILAMBARITHI.N",
  },
  description:
    "AI/ML Engineer portfolio of ILAMBARITHI N. B.Tech student in Artificial Intelligence and Machine Learning at Dhanalakshmi College of Engineering. Exploring Generative AI, Deep Learning, Explainable AI, and real-world software solutions.",
  keywords: [
    "Ilambarithi N",
    "ILAMBARITHI.N",
    "AI/ML Engineer",
    "Artificial Intelligence",
    "Machine Learning",
    "Generative AI",
    "Deep Learning",
    "Explainable AI",
    "Grad-CAM",
    "PyTorch",
    "FastAPI",
    "Next.js",
    "Dhanalakshmi College of Engineering",
    "Tamil Nadu India",
  ],
  authors: [{ name: "ILAMBARITHI N", url: profileData.contact.github }],
  creator: "ILAMBARITHI N",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ILAMBARITHI N — AI/ML Engineer Portfolio",
    title: "ILAMBARITHI N — AI/ML Engineer | Building Intelligent Solutions with AI",
    description:
      "B.Tech in Artificial Intelligence & Machine Learning. Projects covering Autonomous AI Project Builders, Multispectral Crop Pathology with Grad-CAM, and Conversational Voice Assistants.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ILAMBARITHI N — AI/ML Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ILAMBARITHI N — AI/ML Engineer",
    description: "Building intelligent solutions with AI, Deep Learning, and Generative Systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.name,
    alternateName: profileData.brandName,
    jobTitle: profileData.title,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Dhanalakshmi College of Engineering",
    },
    url: siteUrl,
    sameAs: [
      profileData.contact.github,
      profileData.contact.linkedin,
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "Tamil Nadu",
      addressCountry: "India",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Generative AI",
      "Large Language Models",
      "Computer Vision",
      "Explainable AI",
      "PyTorch",
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#08080D] text-white antialiased min-h-screen selection:bg-violet-600 selection:text-white">
        <ScrollProgress />
        <CustomCursor />
        <SmoothScroll>
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </SmoothScroll>
        <BackToTop />
      </body>
    </html>
  );
}
