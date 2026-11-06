export interface Experience {
  id: string;
  organization: string;
  role: string;
  type: string;
  duration: string; // Editable placeholder
  location: string;
  summary: string;
  responsibilities: string[]; // Editable placeholders
  technologies: string[];
  projectsWorkedOn?: string[];
  certificateUrl?: string; // Optional/Placeholder
}

export const experienceData: Experience[] = [
  {
    id: "creator-space-lab-internship",
    organization: "Creator Space Lab",
    role: "AI / Technology Intern",
    type: "Internship",
    duration: "Tenure on record", // Editable without fabricating dates
    location: "Tamil Nadu, India",
    summary:
      "Hands-on internship focused on applied technology, machine learning workflows, and practical project experimentation at Creator Space Lab.",
    responsibilities: [
      "Engaged in hands-on technical exploration and practical engineering exercises",
      "Collaborated on applied technology prototypes and machine learning workflows",
      "Gained practical exposure to modern developer tools and structured project delivery",
      "Participated in lab problem-solving sessions and technical evaluations",
    ],
    technologies: [
      "Python",
      "Machine Learning",
      "Artificial Intelligence",
      "Git & GitHub",
      "Problem Solving",
    ],
    projectsWorkedOn: [
      "Applied technology experimentation and prototype development",
    ],
    certificateUrl: undefined, // Editable placeholder
  },
];
