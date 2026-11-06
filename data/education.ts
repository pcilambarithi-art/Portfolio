export interface Education {
  degree: string;
  department: string;
  institution: string;
  currentYear: string;
  expectedGraduation: string;
  location: string;
  period: string;
  description: string;
  coursework: string[];
  highlights: string[];
}

export const educationData: Education[] = [
  {
    degree: "B.Tech",
    department: "Artificial Intelligence and Machine Learning",
    institution: "Dhanalakshmi College of Engineering",
    currentYear: "3rd Year",
    expectedGraduation: "2028",
    location: "Tamil Nadu, India",
    period: "2024 — 2028 (Expected)",
    description:
      "Focused on theoretical foundations and applied engineering of Artificial Intelligence, Deep Learning, Mathematical Optimization, and Autonomous Systems.",
    coursework: [
      "Data Structures & Algorithms",
      "Foundations of Machine Learning",
      "Deep Neural Networks & Architectures",
      "Natural Language Processing",
      "Computer Vision & Pattern Recognition",
      "Database Management Systems & SQL",
      "Probability, Statistics & Linear Algebra",
      "Software Engineering & System Design",
    ],
    highlights: [
      "Currently pursuing 3rd year in B.Tech AI & ML curriculum",
      "Active participant in technical coding initiatives and open source development",
      "Hands-on laboratory research in computer vision and generative systems",
    ],
  },
];
