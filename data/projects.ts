export type ProjectCategory =
  | "All"
  | "AI/ML"
  | "Deep Learning"
  | "Generative AI"
  | "Computer Vision"
  | "NLP"
  | "Web Development";

export interface ProjectArchitectureNode {
  title: string;
  description: string;
  subItems?: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  category: ProjectCategory;
  featured: boolean;
  technologies: string[];
  problemStatement: string;
  proposedSolution: string;
  features: string[];
  architectureOverview: string;
  architectureNodes: ProjectArchitectureNode[];
  githubUrl: string;
  liveDemoUrl?: string;
  bannerGradient: string;
  accentColor: string;
  year: string;
}

export const projectCategories: ProjectCategory[] = [
  "All",
  "AI/ML",
  "Deep Learning",
  "Generative AI",
  "Computer Vision",
  "NLP",
  "Web Development",
];

export const projectsData: Project[] = [
  // --- FEATURED PROJECT 1 ---
  {
    slug: "ai-project-builder",
    title: "AI Project Builder",
    tagline: "Autonomous full-stack project generator with file manifest validation & GitHub publishing.",
    shortDescription:
      "A full-stack application that transforms topics or specifications into structured, production-ready codebases with file previews, ZIP downloads, and direct GitHub OAuth publishing.",
    category: "Generative AI",
    featured: true,
    year: "2024",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "Vite",
      "OpenAI API",
      "GitHub REST API",
      "Tesseract OCR",
    ],
    accentColor: "#8B5CF6",
    bannerGradient: "from-violet-900/40 via-purple-950/30 to-background",
    githubUrl: "https://github.com/pcilambarithi-art/ai_project_builder",
    liveDemoUrl: "https://github.com/pcilambarithi-art/ai_project_builder",
    problemStatement:
      "Developers and students often spend hours setting up project scaffolding, boilerplates, and configuration files before writing actual domain logic. Existing code generation tools produce isolated code snippets without structured repository manifests or seamless GitHub publishing.",
    proposedSolution:
      "Engineered an automated end-to-end project generator that prompts an LLM for structured JSON repository manifests, validates every directory path to prevent path traversal, renders an in-browser tree preview, and packages the solution into a downloadable ZIP or pushes directly to the user's GitHub repository via OAuth.",
    features: [
      "Specification-to-project synthesis with configurable prompt directives",
      "Strict JSON manifest validation and file system tree preview",
      "Multi-format document ingestion (PDF, DOCX, TXT, OCR for images)",
      "Direct GitHub OAuth authorization and automated repository creation",
      "One-click complete archive ZIP generator for local execution",
      "Pluggable LLM completion backend supporting multiple models",
    ],
    architectureOverview:
      "Dual-tier system pairing a responsive React/Vite client with a high-performance FastAPI asynchronous backend that interfaces with AI completion endpoints and GitHub REST APIs.",
    architectureNodes: [
      {
        title: "Frontend Client (Vite + React)",
        description: "Interactive UI for specification input, file hierarchy navigation, code inspector, and OAuth flow triggers.",
      },
      {
        title: "FastAPI Backend Core",
        description: "Asynchronous REST endpoints managing document extraction, prompt structuring, and manifest parsing.",
      },
      {
        title: "AI Generation & Manifest Validator",
        description: "Interfacing with completion models, validating clean JSON file mappings, and filtering unsafe file names.",
      },
      {
        title: "GitHub Publisher & ZIP Engine",
        description: "GitHub OAuth token-authenticated repository creation, commit generation, and binary ZIP serialization.",
      },
    ],
  },

  // --- FEATURED PROJECT 2 ---
  {
    slug: "explainable-deep-learning-crop-disease",
    title: "Explainable Deep Learning Framework for Crop Diseases",
    tagline: "Multispectral imagery diagnosis backed by Explainable AI (Grad-CAM) visual attention.",
    shortDescription:
      "A deep learning framework designed to detect early-stage crop diseases using multispectral imagery and explainable artificial intelligence (Grad-CAM) to visualize model decision pathways.",
    category: "Deep Learning",
    featured: true,
    year: "2024",
    technologies: [
      "PyTorch",
      "OpenCV",
      "Explainable AI",
      "Grad-CAM",
      "Python",
      "Scikit-learn",
      "NumPy",
    ],
    accentColor: "#06B6D4",
    bannerGradient: "from-cyan-950/40 via-blue-950/30 to-background",
    githubUrl: "https://github.com/pcilambarithi-art",
    liveDemoUrl: "https://github.com/pcilambarithi-art",
    problemStatement:
      "Agricultural crop diseases often cause devastating yield losses before symptoms become visible in traditional RGB photographs. Furthermore, black-box deep learning models lack transparency, making agricultural experts hesitant to trust automated classifications.",
    proposedSolution:
      "Developed a convolutional neural network pipeline utilizing multispectral bands (including RedEdge and Near-Infrared) that capture cellular chlorophyll degradation before visible chlorosis occurs. Integrated Grad-CAM to highlight the exact spectral features responsible for predictions.",
    features: [
      "Multispectral channel preprocessing and normalization pipeline",
      "Convolutional feature extraction tuned for subtle cellular variations",
      "Gradient-weighted Class Activation Mapping (Grad-CAM) heatmaps",
      "Early pathology classification before macroscopic canopy symptoms appear",
      "Exportable diagnostic reports detailing model confidence and visual attention",
      "Quantitative evaluation comparing RGB versus multispectral detection thresholds",
    ],
    architectureOverview:
      "Deep learning pipeline starting with spectral band calibration, convolutional feature extraction, classification head, and backpropagated gradient visualization.",
    architectureNodes: [
      {
        title: "Spectral Channel Preprocessing",
        description: "Band alignment, radiometric calibration, and augmentation across RedEdge and NIR channels.",
      },
      {
        title: "Deep Feature Backbone",
        description: "Tuned convolutional architecture extracting multi-scale hierarchical visual representations.",
      },
      {
        title: "Diagnostic Classification Head",
        description: "Softmax probability layer outputting confidence distributions across healthy and infected states.",
      },
      {
        title: "Grad-CAM Attribution Engine",
        description: "Extracting gradients from final convolutional layers to generate transparent heatmaps.",
      },
    ],
  },

  // --- FEATURED PROJECT 3 ---
  {
    slug: "personal-ai-assistant-sara",
    title: "Personal AI Assistant — SARA",
    tagline: "Intelligent conversational assistant with contextual memory and system automation.",
    shortDescription:
      "An intelligent conversational assistant capable of natural language interaction, memory retention across dialogues, and executing system-level automated tasks.",
    category: "AI/ML",
    featured: true,
    year: "2024",
    technologies: [
      "Python",
      "Natural Language Processing",
      "LLMs",
      "Speech Recognition",
      "FastAPI",
      "Text-to-Speech",
    ],
    accentColor: "#A78BFA",
    bannerGradient: "from-purple-950/40 via-indigo-950/30 to-background",
    githubUrl: "https://github.com/pcilambarithi-art",
    liveDemoUrl: "https://github.com/pcilambarithi-art",
    problemStatement:
      "Standard voice assistants operate in rigid single-turn command structures without deep conversational context, contextual intent recognition, or flexible custom command execution.",
    proposedSolution:
      "Engineered SARA (Smart Adaptive Response Assistant) to combine transformer-based reasoning, contextual state tracking, speech input/output engines, and modular intent dispatchers for developer workflows.",
    features: [
      "Continuous conversational session memory across multi-turn queries",
      "Voice input recognition and low-latency synthesized speech feedback",
      "Intent classifier routing queries between general knowledge and task execution",
      "Developer productivity automations (file search, note creation, reminders)",
      "Local and cloud LLM execution backends with graceful offline fallbacks",
      "Modular plugin architecture for registering custom API tools",
    ],
    architectureOverview:
      "Event-driven conversational pipeline linking audio I/O, NLP intent classification, dialogue state tracking, and tool execution.",
    architectureNodes: [
      {
        title: "Audio & Input Interface",
        description: "Speech-to-text transcription engine with background noise suppression and wake word detection.",
      },
      {
        title: "Context & Dialogue Manager",
        description: "Session memory buffer preserving conversation history and user preferences.",
      },
      {
        title: "Reasoning & LLM Core",
        description: "Language model synthesis generating concise, contextually accurate responses.",
      },
      {
        title: "Action & Tool Dispatcher",
        description: "Execution runtime triggering local scripts, system queries, and external web APIs.",
      },
    ],
  },

  // --- ADDITIONAL PROJECTS IN ALL PROJECTS ---
  {
    slug: "generative-ai-rag-knowledge-app",
    title: "Generative AI / LLM Application",
    tagline: "Retrieval-Augmented Generation application for structured document queries.",
    shortDescription:
      "A Generative AI pipeline utilizing vector embeddings and semantic search to allow conversational queries over custom documentation with grounded citations.",
    category: "Generative AI",
    featured: false,
    year: "2024",
    technologies: ["Python", "LangChain", "ChromaDB", "LLMs", "Streamlit", "Hugging Face"],
    accentColor: "#EC4899",
    bannerGradient: "from-pink-950/40 via-rose-950/30 to-background",
    githubUrl: "https://github.com/pcilambarithi-art",
    liveDemoUrl: "https://github.com/pcilambarithi-art",
    problemStatement:
      "Large language models hallucinate when answering questions about specialized or proprietary technical documentation that was not present in their training corpora.",
    proposedSolution:
      "Implemented a Retrieval-Augmented Generation (RAG) system that chunks documents, embeds text into high-dimensional vectors, retrieves top-k relevant fragments, and prompts the LLM with grounded context.",
    features: [
      "Document ingestion pipeline supporting PDF and Markdown files",
      "Semantic chunking and embedding generation using Hugging Face models",
      "Vector store indexing with ChromaDB for low-latency cosine similarity search",
      "Context injection prompting that prevents hallucination with verbatim citations",
    ],
    architectureOverview:
      "Ingestion and query pipelines coordinating vector similarity search with context-conditioned LLM generation.",
    architectureNodes: [
      { title: "Document Chunker", description: "Recursive character text splitting with sliding window overlaps." },
      { title: "Vector Embedding Store", description: "High-dimensional vector storage indexed for similarity queries." },
      { title: "Grounded Generation", description: "LLM synthesis conditioned on retrieved context fragments." },
    ],
  },

  {
    slug: "ml-prediction-system",
    title: "Machine Learning Prediction System",
    tagline: "End-to-end predictive analytics pipeline with model evaluation and feature engineering.",
    shortDescription:
      "A comprehensive machine learning regression and classification suite featuring automated feature engineering, model benchmarking, and performance metrics visualization.",
    category: "AI/ML",
    featured: false,
    year: "2024",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    accentColor: "#F59E0B",
    bannerGradient: "from-amber-950/40 via-orange-950/30 to-background",
    githubUrl: "https://github.com/pcilambarithi-art",
    liveDemoUrl: "https://github.com/pcilambarithi-art",
    problemStatement:
      "Raw tabular datasets contain missing values, multi-collinearity, and skewed distributions that degrade standard predictive models if not systematically preprocessed.",
    proposedSolution:
      "Engineered an automated preprocessing and model benchmarking pipeline that tests multiple regressors/classifiers, handles missing values, and visualizes ROC-AUC and error distributions.",
    features: [
      "Automated imputation, one-hot encoding, and standard scaling",
      "Cross-validated comparison across Random Forests, Gradient Boosting, and Linear Models",
      "Hyperparameter optimization using grid search with early stopping",
      "Interactive evaluation plots including confusion matrices and feature importance rankings",
    ],
    architectureOverview:
      "Modular pipeline executing data sanitation, feature selection, training, hyperparameter tuning, and metric generation.",
    architectureNodes: [
      { title: "Data Sanitation", description: "Outlier detection, null imputation, and data type validation." },
      { title: "Feature Transformer", description: "Correlation matrix analysis and dimensionality reduction." },
      { title: "Model Benchmark Engine", description: "K-fold cross-validation across multiple algorithmic families." },
    ],
  },

  {
    slug: "computer-vision-detection-project",
    title: "Computer Vision Project",
    tagline: "Real-time visual feature detection and spatial bounding box estimation.",
    shortDescription:
      "A computer vision framework implementing real-time object tracking, image segmentation, and spatial contour analysis using OpenCV and deep neural networks.",
    category: "Computer Vision",
    featured: false,
    year: "2024",
    technologies: ["Python", "OpenCV", "PyTorch", "NumPy"],
    accentColor: "#10B981",
    bannerGradient: "from-emerald-950/40 via-teal-950/30 to-background",
    githubUrl: "https://github.com/pcilambarithi-art",
    liveDemoUrl: "https://github.com/pcilambarithi-art",
    problemStatement:
      "Visual detection tasks in varying lighting conditions suffer from high false-positive rates when relying solely on threshold-based color spaces.",
    proposedSolution:
      "Integrated deep feature representations with adaptive thresholding and morphological filtering to achieve stable real-time object tracking across varied lighting conditions.",
    features: [
      "Video stream capture and frame-by-frame tensor conversion",
      "Adaptive color thresholding and background subtraction",
      "Contour estimation and centroid trajectory tracking",
      "Optimized processing pipeline running at high frame rates",
    ],
    architectureOverview:
      "Real-time video pipeline combining OpenCV transformations with deep inference backends.",
    architectureNodes: [
      { title: "Video Stream Buffer", description: "Threaded video frame capture and temporal smoothing." },
      { title: "Inference Engine", description: "Neural feature extraction and bounding box regression." },
      { title: "Overlay Renderer", description: "Visual tracking lines, annotations, and metric statistics." },
    ],
  },

  {
    slug: "nlp-conversational-chatbot",
    title: "NLP Chatbot",
    tagline: "Intent-driven conversational agent with sequence modeling and token classification.",
    shortDescription:
      "A domain-specific natural language processing chatbot utilizing token classification, entity extraction, and conversational intent routing.",
    category: "NLP",
    featured: false,
    year: "2024",
    technologies: ["Python", "NLTK", "Scikit-learn", "Flask", "JavaScript"],
    accentColor: "#3B82F6",
    bannerGradient: "from-blue-950/40 via-indigo-950/30 to-background",
    githubUrl: "https://github.com/pcilambarithi-art",
    liveDemoUrl: "https://github.com/pcilambarithi-art",
    problemStatement:
      "Custom support environments require deterministic answers for recurring questions without the latency or billing overhead of external generative APIs.",
    proposedSolution:
      "Trained a lightweight intent classification network paired with entity extraction algorithms to deliver instant, reliable answers to structured user queries.",
    features: [
      "Bag-of-words and TF-IDF token vectorization",
      "Custom intent patterns and configurable response mappings",
      "Named entity recognition for parsing dates, user IDs, and categories",
      "Lightweight deployment footprint suitable for edge runtimes",
    ],
    architectureOverview:
      "Client chat interface submitting queries to an intent classification model and template response generator.",
    architectureNodes: [
      { title: "Text Normalizer", description: "Stemming, lemmatization, and stop-word filtering." },
      { title: "Intent Classifier", description: "Probability distribution mapping over defined query classes." },
      { title: "Response Selector", description: "Dynamic response synthesis with entity variable interpolation." },
    ],
  },

  {
    slug: "modern-web-development-project",
    title: "Web Development Project",
    tagline: "High-performance responsive web application with modern component architecture.",
    shortDescription:
      "A modern, responsive full-stack web application designed with Next.js, TypeScript, and Tailwind CSS focusing on performance, accessibility, and visual polish.",
    category: "Web Development",
    featured: false,
    year: "2024",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    accentColor: "#6366F1",
    bannerGradient: "from-violet-950/40 via-purple-950/30 to-background",
    githubUrl: "https://github.com/pcilambarithi-art",
    liveDemoUrl: "https://github.com/pcilambarithi-art",
    problemStatement:
      "Many modern web applications suffer from slow initial load times, poor mobile responsiveness, and unoptimized layout shifts.",
    proposedSolution:
      "Built a server-rendered web application utilizing Next.js App Router, minimal JavaScript hydration overhead, and responsive Tailwind styling.",
    features: [
      "Server-side rendering (SSR) and static generation for fast loads",
      "Strict TypeScript typing across all components and data models",
      "Fluid responsive layout adapting smoothly from mobile to 4K displays",
      "Optimized assets and layout-shift prevention",
    ],
    architectureOverview:
      "Component-based architecture utilizing React server components and client boundary state management.",
    architectureNodes: [
      { title: "Server Components", description: "Pre-rendering static markup on the edge." },
      { title: "Interactive Client Boundaries", description: "Hydrating dynamic interactive elements only where necessary." },
      { title: "Styling & Motion Tokens", description: "Hardware-accelerated CSS transitions and modular Tailwind classes." },
    ],
  },
];
