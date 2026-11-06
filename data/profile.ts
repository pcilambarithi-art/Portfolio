export interface Profile {
  name: string;
  brandName: string;
  title: string;
  tagline: string;
  location: string;
  introduction: string;
  supportingText: string;
  availability: {
    status: "open" | "busy" | "closed";
    message: string;
  };
  contact: {
    email: string;
    github: string;
    githubUsername: string;
    linkedin: string;
    location: string;
  };
  highlights: {
    label: string;
    description: string;
    icon: string;
  }[];
  stats: {
    label: string;
    value: string;
    suffix?: string;
    description: string;
  }[];
}

export const profileData: Profile = {
  name: "ILAMBARITHI N",
  brandName: "ILAMBARITHI.N",
  title: "AI/ML Engineer",
  tagline: "Building intelligent solutions with AI",
  location: "Tamil Nadu, India",
  introduction:
    "AI/ML student passionate about Artificial Intelligence, Machine Learning and building real-world projects.",
  supportingText:
    "Exploring Artificial Intelligence, Machine Learning and Generative AI to build meaningful real-world solutions.",
  availability: {
    status: "open",
    message: "Open to internships and opportunities.",
  },
  contact: {
    email: "ilambarithi2006@gmail.com",
    github: "https://github.com/pcilambarithi-art",
    githubUsername: "pcilambarithi-art",
    linkedin: "https://www.linkedin.com/in/ilambarithi-n-94217a428/",
    location: "Tamil Nadu, India",
  },
  highlights: [
    {
      label: "Artificial Intelligence",
      description: "Developing intelligent algorithms and cognitive architectures.",
      icon: "Cpu",
    },
    {
      label: "Machine Learning",
      description: "Building predictive models, feature pipelines, and statistical learners.",
      icon: "Network",
    },
    {
      label: "Deep Learning & Vision",
      description: "Designing convolutional networks and multispectral image pipelines.",
      icon: "Eye",
    },
    {
      label: "Generative AI & LLMs",
      description: "Architecting RAG workflows, agentic systems, and prompt pipelines.",
      icon: "Sparkles",
    },
    {
      label: "Explainable AI (XAI)",
      description: "Unpacking neural decision pathways using Grad-CAM and attribution.",
      icon: "Scan",
    },
    {
      label: "Real-world Engineering",
      description: "Bridging mathematical models to production-ready applications.",
      icon: "Boxes",
    },
  ],
  stats: [
    {
      label: "Academic Focus",
      value: "B.Tech AIML",
      description: "Dhanalakshmi College of Eng.",
    },
    {
      label: "Current Standing",
      value: "3rd Year",
      description: "Class of 2028",
    },
    {
      label: "Key Certifications",
      value: "3",
      suffix: "+",
      description: "AWS, Creator Space, Autodesk",
    },
    {
      label: "Internship",
      value: "Creator Space",
      description: "Applied AI Development",
    },
  ],
};
