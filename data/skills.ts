export interface Skill {
  name: string;
  category: SkillCategoryId;
  iconName: string;
  description: string;
  badge?: string;
  // 3D coordinate vector for the 3D constellation/universe
  coordinates?: [number, number, number];
  color?: string;
}

export type SkillCategoryId =
  | "all"
  | "languages"
  | "ai_ml"
  | "frameworks"
  | "web"
  | "tools";

export interface SkillCategory {
  id: SkillCategoryId;
  label: string;
  description: string;
}

export const skillCategories: SkillCategory[] = [
  { id: "all", label: "All Technologies", description: "Comprehensive technological toolkit" },
  { id: "ai_ml", label: "AI & Machine Learning", description: "Core artificial intelligence, modeling & reasoning" },
  { id: "frameworks", label: "Frameworks & Libraries", description: "Deep learning & mathematical computation suites" },
  { id: "languages", label: "Programming Languages", description: "Algorithmic & systems programming languages" },
  { id: "tools", label: "Tools & Platforms", description: "Cloud, developer environments & database systems" },
  { id: "web", label: "Web Development", description: "Full-stack interfaces & modern web deployment" },
];

export const skillsData: Skill[] = [
  // Programming Languages
  {
    name: "Python",
    category: "languages",
    iconName: "Code2",
    description: "Primary language for AI/ML modeling, scientific computing, and backend architecture.",
    coordinates: [-2.2, 1.8, 0.4],
    color: "#3776AB",
    badge: "Core",
  },
  {
    name: "Java",
    category: "languages",
    iconName: "Coffee",
    description: "Object-oriented programming, enterprise software design, and algorithmic foundations.",
    coordinates: [-3.2, 0.6, -1.2],
    color: "#E76F00",
  },
  {
    name: "C++",
    category: "languages",
    iconName: "Terminal",
    description: "High-performance systems programming, data structures, and memory-efficient algorithms.",
    coordinates: [-1.8, 2.8, -0.8],
    color: "#00599C",
  },
  {
    name: "JavaScript",
    category: "languages",
    iconName: "FileCode",
    description: "Interactive frontends, asynchronous browser runtimes, and full-stack web applications.",
    coordinates: [-2.9, -1.2, 1.1],
    color: "#F7DF1E",
  },

  // AI and Machine Learning
  {
    name: "Machine Learning",
    category: "ai_ml",
    iconName: "Network",
    description: "Supervised & unsupervised learning, classification, regression, and feature engineering.",
    coordinates: [0.2, 2.4, 0.2],
    color: "#8B5CF6",
    badge: "Core",
  },
  {
    name: "Deep Learning",
    category: "ai_ml",
    iconName: "Cpu",
    description: "Neural network architectures, multi-layer perceptrons, CNNs, and backpropagation.",
    coordinates: [1.6, 2.0, -0.5],
    color: "#A78BFA",
    badge: "Specialized",
  },
  {
    name: "Natural Language Processing",
    category: "ai_ml",
    iconName: "MessageSquare",
    description: "Text tokenization, sentiment analysis, embeddings, sequence models, and language understanding.",
    coordinates: [1.2, 0.8, 1.8],
    color: "#C4B5FD",
  },
  {
    name: "Computer Vision",
    category: "ai_ml",
    iconName: "Eye",
    description: "Image preprocessing, feature extraction, object detection, and multispectral analysis.",
    coordinates: [2.5, 1.2, -0.9],
    color: "#9333EA",
    badge: "Specialized",
  },
  {
    name: "Generative AI",
    category: "ai_ml",
    iconName: "Sparkles",
    description: "Diffusion mechanisms, generative adversarial networks, and synthetic content generation.",
    coordinates: [0.8, -0.5, 2.2],
    color: "#EC4899",
    badge: "Featured",
  },
  {
    name: "LLMs",
    category: "ai_ml",
    iconName: "Brain",
    description: "Transformer models, context window optimization, fine-tuning, and prompt engineering.",
    coordinates: [0.0, -1.8, 1.6],
    color: "#8B5CF6",
    badge: "Core",
  },
  {
    name: "Explainable AI (XAI)",
    category: "ai_ml",
    iconName: "ScanSearch",
    description: "Interpreting model predictions using Grad-CAM, feature heatmaps, and transparency techniques.",
    coordinates: [2.8, -0.2, 0.4],
    color: "#06B6D4",
    badge: "Research",
  },
  {
    name: "RAG",
    category: "ai_ml",
    iconName: "Database",
    description: "Retrieval-Augmented Generation connecting vector databases with LLM context pipelines.",
    coordinates: [1.1, -2.1, -0.7],
    color: "#10B981",
  },

  // Frameworks and Libraries
  {
    name: "PyTorch",
    category: "frameworks",
    iconName: "Flame",
    description: "Dynamic computation graphs, GPU tensor acceleration, and research deep learning pipelines.",
    coordinates: [2.1, -1.5, -1.8],
    color: "#EE4C2C",
    badge: "Primary",
  },
  {
    name: "Hugging Face",
    category: "frameworks",
    iconName: "Smile",
    description: "Pretrained transformer pipelines, tokenizers, model hubs, and dataset integration.",
    coordinates: [-0.6, -2.5, -1.0],
    color: "#FFD21E",
  },
  {
    name: "OpenCV",
    category: "frameworks",
    iconName: "Camera",
    description: "Real-time image manipulation, spectral channel analysis, edge detection, and filtering.",
    coordinates: [3.1, -1.0, 1.2],
    color: "#5C3EE8",
  },
  {
    name: "Scikit-learn",
    category: "frameworks",
    iconName: "Binary",
    description: "Classical statistical machine learning, clustering, PCA dimensionality reduction, and metrics.",
    coordinates: [-1.4, -1.9, 0.8],
    color: "#F7931E",
  },

  // Web Development
  {
    name: "HTML5",
    category: "web",
    iconName: "Globe",
    description: "Semantic document architecture, web standards, and accessible structure.",
    coordinates: [-2.6, 0.1, 2.0],
    color: "#E34F26",
  },
  {
    name: "CSS3 / Tailwind",
    category: "web",
    iconName: "Palette",
    description: "Responsive layouts, glassmorphism design systems, keyframe animations, and styling.",
    coordinates: [-1.8, -0.8, 2.4],
    color: "#38BDF8",
  },
  {
    name: "Next.js",
    category: "web",
    iconName: "Layers",
    description: "Server-side rendering, App Router, full-stack API routes, and high-performance deployment.",
    coordinates: [-0.8, 1.4, -2.2],
    color: "#FFFFFF",
    badge: "Stack",
  },
  {
    name: "Node.js",
    category: "web",
    iconName: "Server",
    description: "V8-powered asynchronous JavaScript runtime for backend services and tooling.",
    coordinates: [-2.0, -2.4, -0.5],
    color: "#339933",
  },

  // Tools and Platforms
  {
    name: "Git & GitHub",
    category: "tools",
    iconName: "GitBranch",
    description: "Distributed version control, collaboration workflows, branch branching, and open-source contribution.",
    coordinates: [-0.3, 3.1, -1.4],
    color: "#F05032",
  },
  {
    name: "VS Code",
    category: "tools",
    iconName: "Laptop",
    description: "Primary IDE configured for Python virtual environments, TypeScript, and remote containers.",
    coordinates: [0.7, 3.2, 1.1],
    color: "#007ACC",
  },
  {
    name: "Jupyter Notebook",
    category: "tools",
    iconName: "BookOpen",
    description: "Exploratory data analysis, mathematical visualizations, and iterative model development.",
    coordinates: [1.9, 2.6, 1.2],
    color: "#F37626",
  },
  {
    name: "Google Colab",
    category: "tools",
    iconName: "Cloud",
    description: "Cloud-hosted GPU runtimes (T4/V100) for training deep learning models and research notebooks.",
    coordinates: [3.0, 1.8, 0.7],
    color: "#F9AB00",
  },
  {
    name: "MySQL",
    category: "tools",
    iconName: "Database",
    description: "Relational database modeling, SQL queries, table indexing, and data persistence.",
    coordinates: [-1.2, 0.2, -2.8],
    color: "#4479A1",
  },
  {
    name: "AWS",
    category: "tools",
    iconName: "CloudLightning",
    description: "Cloud infrastructure foundations, compute, storage, and cloud AI deployment concepts.",
    coordinates: [2.2, -2.6, 0.9],
    color: "#FF9900",
    badge: "Certified",
  },
];
