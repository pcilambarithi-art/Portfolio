import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import SkillsSection from "@/components/skills/SkillsSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import EducationSection from "@/components/education/EducationSection";
import CertificationsSection from "@/components/certifications/CertificationsSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import AchievementsSection from "@/components/achievements/AchievementsSection";
import GitHubSection from "@/components/github/GitHubSection";
import ContactSection from "@/components/contact/ContactSection";
import AskTerexAI from "@/components/chatbot/AskTerexAI";
import Footer from "@/components/common/Footer";

export default function HomePage() {
  return (
    <main className="relative flex flex-col min-h-screen">
      {/* Floating Glassmorphism Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Me Section */}
      <About />

      {/* Technical Skills & 3D Skill Universe */}
      <SkillsSection />

      {/* Projects Showcase (Featured & All Projects) */}
      <ProjectsSection />

      {/* Education Timeline */}
      <EducationSection />

      {/* Certifications Cards */}
      <CertificationsSection />

      {/* Internship Experience */}
      <ExperienceSection />

      {/* Achievements & Technical Milestones Tracker */}
      <AchievementsSection />

      {/* Live GitHub API Integration */}
      <GitHubSection />

      {/* Interactive Contact Form */}
      <ContactSection />

      {/* Ask Terex AI Interactive Chatbot */}
      <AskTerexAI />

      {/* Modern Footer */}
      <Footer />
    </main>
  );
}
