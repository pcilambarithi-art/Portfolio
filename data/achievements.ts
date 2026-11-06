export interface Achievement {
  id: string;
  title: string;
  category: "Hackathon" | "Award" | "Competition" | "Workshop" | "Research" | "Leadership";
  issuer?: string;
  date?: string;
  description: string;
  link?: string;
  isPlaceholder?: boolean;
}

// Data model ready for future achievements; populated with transparent in-progress / upcoming tracker
export const achievementsData: Achievement[] = [
  {
    id: "hackathon-placeholder",
    title: "Hackathons & Technical Competitions",
    category: "Hackathon",
    issuer: "Collegiate & Open Hackathons",
    date: "Ongoing",
    description: "Actively building innovative solutions and participating in AI/ML hackathons and developer challenges.",
    isPlaceholder: true,
  },
  {
    id: "research-placeholder",
    title: "Applied AI Research & Exploration",
    category: "Research",
    issuer: "Independent & Academic Research",
    date: "Current Focus",
    description: "Conducting experimental investigations into multispectral imagery, crop disease diagnosis, and explainable neural networks.",
    isPlaceholder: true,
  },
  {
    id: "workshops-placeholder",
    title: "Workshops & Technical Training",
    category: "Workshop",
    issuer: "Technical Forums",
    date: "Continuous Learning",
    description: "Deepening proficiency across generative transformers, cloud deployments, and computer vision systems.",
    isPlaceholder: true,
  },
];
