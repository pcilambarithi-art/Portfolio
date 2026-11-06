export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string; // Optional/Placeholder
  verificationUrl?: string; // Optional/Placeholder
  badgeColor: string;
  category: string;
  skillsCovered: string[];
  description: string;
}

export const certificationsData: Certification[] = [
  {
    id: "aws",
    title: "AWS Certification",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "Verified",
    credentialId: "Available upon request", // Placeholder without inventing fake IDs
    verificationUrl: undefined, // Editable placeholder link
    badgeColor: "#FF9900",
    category: "Cloud & Infrastructure",
    skillsCovered: ["Cloud Computing", "AWS Services", "Cloud Architecture", "Scalability"],
    description:
      "Validation of cloud architecture concepts, core compute, storage, security, and scalable infrastructure deployment.",
  },
  {
    id: "creator-space-lab",
    title: "Creator Space Lab Certification",
    issuer: "Creator Space Lab",
    issueDate: "Verified",
    credentialId: "Available upon request", // Placeholder without inventing fake IDs
    verificationUrl: undefined, // Editable placeholder link
    badgeColor: "#8B5CF6",
    category: "AI & Emerging Technologies",
    skillsCovered: ["Applied AI", "Hands-on Prototyping", "Machine Learning Pipelines", "Technical Innovation"],
    description:
      "Practical program certification recognizing applied skills in artificial intelligence development and emerging tech experimentation.",
  },
  {
    id: "autodesk",
    title: "Autodesk Certification",
    issuer: "Autodesk",
    issueDate: "Verified",
    credentialId: "Available upon request", // Placeholder without inventing fake IDs
    verificationUrl: undefined, // Editable placeholder link
    badgeColor: "#0696D7",
    category: "Design & Spatial Modeling",
    skillsCovered: ["CAD Design", "Spatial Modeling", "Engineering Graphics", "Precision Design"],
    description:
      "Recognition of proficiency in computer-aided design, technical drafting, and dimensional engineering modeling.",
  },
];
