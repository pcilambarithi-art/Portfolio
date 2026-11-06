import { getPortfolioSystemContext, getCareerSystemContext } from "./knowledge";
import { profileData } from "@/data/profile";

export type AIChatMode = "portfolio" | "career";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIResponse {
  content: string;
  provider: string;
  model: string;
  mode: AIChatMode;
  isConfigured: boolean;
}

// Built-in intelligent response generator for portfolio queries when external API key is not configured
export function getOfflinePortfolioResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("who is") || q.includes("introduce") || q.includes("about") || q.includes("ilambarithi")) {
    return `**ILAMBARITHI N** is an aspiring **AI/ML Engineer** based in ${profileData.location}.\n\n` +
      `He is currently a 3rd-year B.Tech student in Artificial Intelligence and Machine Learning at Dhanalakshmi College of Engineering (expected graduation: 2028).\n\n` +
      `He is passionate about Artificial Intelligence, Machine Learning, Deep Learning, and Generative AI, focusing on transforming mathematical models into impactful real-world software solutions.`;
  }

  if (q.includes("project") || q.includes("build") || q.includes("work")) {
    return `Ilambarithi has engineered several prominent AI/ML projects:\n\n` +
      `1. **AI Project Builder**: A full-stack application (FastAPI + React) that turns specifications into structured codebases with file previews, ZIP export, and direct GitHub OAuth publishing.\n\n` +
      `2. **Explainable Deep Learning Framework for Crop Diseases**: Uses multispectral imagery and Grad-CAM visual attention heatmaps for early diagnosis of crop pathology before visible symptoms emerge.\n\n` +
      `3. **Personal AI Assistant — SARA**: An intelligent conversational agent featuring conversational memory, speech I/O, and developer workflow automation.\n\n` +
      `You can explore complete architecture diagrams and source code in the **Projects** section!`;
  }

  if (q.includes("skill") || q.includes("tech") || q.includes("language") || q.includes("stack")) {
    return `Ilambarithi's core technological toolkit spans:\n\n` +
      `- **Languages**: Python, Java, C++, JavaScript\n` +
      `- **AI & Machine Learning**: Machine Learning, Deep Learning, Computer Vision, NLP, Generative AI, LLMs, Explainable AI (XAI), RAG\n` +
      `- **Frameworks**: PyTorch, Hugging Face, OpenCV, Scikit-learn\n` +
      `- **Web & Platforms**: Next.js, Node.js, Git & GitHub, AWS, MySQL, VS Code, Google Colab\n\n` +
      `Check out the interactive **3D Skill Universe** in the Skills section to visualize all technology nodes!`;
  }

  if (q.includes("education") || q.includes("college") || q.includes("degree")) {
    return `**Education Profile:**\n\n` +
      `- **Degree**: B.Tech in Artificial Intelligence and Machine Learning\n` +
      `- **Institution**: Dhanalakshmi College of Engineering, Tamil Nadu, India\n` +
      `- **Current Standing**: 3rd Year\n` +
      `- **Expected Graduation**: 2028`;
  }

  if (q.includes("certif") || q.includes("aws") || q.includes("autodesk") || q.includes("creator")) {
    return `**Professional Certifications:**\n\n` +
      `1. **AWS Certification**: Cloud computing, infrastructure, and scalable architecture.\n` +
      `2. **Creator Space Lab Certification**: Applied AI, machine learning pipelines, and hands-on prototyping.\n` +
      `3. **Autodesk Certification**: Engineering graphics, CAD design, and spatial modeling.`;
  }

  if (q.includes("intern") || q.includes("experience")) {
    return `**Internship Experience:**\n\n` +
      `- **Organization**: Creator Space Lab\n` +
      `- **Role**: AI / Technology Intern\n` +
      `- **Focus**: Applied machine learning workflows, hands-on prototyping, and practical problem-solving in emerging technologies.`;
  }

  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach") || q.includes("touch")) {
    return `You can get in touch with Ilambarithi directly:\n\n` +
      `- **Email**: [${profileData.contact.email}](mailto:${profileData.contact.email})\n` +
      `- **LinkedIn**: [Ilambarithi N on LinkedIn](${profileData.contact.linkedin})\n` +
      `- **GitHub**: [pcilambarithi-art on GitHub](${profileData.contact.github})\n` +
      `- **Location**: ${profileData.location}\n\n` +
      `He is currently **open to internships and collaborative opportunities**!`;
  }

  return `I am **Ask Terex AI**, Ilambarithi's digital assistant.\n\n` +
    `You can ask me anything about his:\n` +
    `- **Background & Education** (B.Tech AIML at Dhanalakshmi College of Engineering)\n` +
    `- **Featured Projects** (AI Project Builder, Crop Disease Framework, SARA Assistant)\n` +
    `- **Technical Skills** (Python, PyTorch, Deep Learning, GenAI, OpenCV)\n` +
    `- **Certifications** (AWS, Creator Space Lab, Autodesk)\n` +
    `- **Contact & Availability** (Open to internships and engineering opportunities)\n\n` +
    `Feel free to click any of the suggested prompts below or ask a specific question!`;
}

// Built-in intelligent response generator for AI/ML career questions when offline
export function getOfflineCareerResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("machine learning") && (q.includes("explain") || q.includes("what is"))) {
    return `### What is Machine Learning?\n\n` +
      `**Machine Learning (ML)** is a branch of artificial intelligence where computer systems learn to recognize patterns and make decisions from data without being explicitly programmed with rigid rules.\n\n` +
      `#### Key Paradigms:\n` +
      `1. **Supervised Learning**: Models learn from labeled input-output pairs (e.g. classification, regression).\n` +
      `2. **Unsupervised Learning**: Discovers hidden structures and clusters in unlabeled data (e.g. K-Means, PCA).\n` +
      `3. **Reinforcement Learning**: Agents learn optimal actions through environment interactions and reward feedback.\n\n` +
      `In modern engineering, ML forms the foundation for predictive analytics, natural language understanding, and autonomous systems.`;
  }

  if (q.includes("generative ai") || q.includes("genai") || q.includes("start learning")) {
    return `### Roadmap to Master Generative AI\n\n` +
      `1. **Foundations First**: Master **Python**, linear algebra, and calculus. Build intuition with NumPy, Pandas, and Scikit-learn.\n` +
      `2. **Deep Learning Core**: Learn neural network mechanics with **PyTorch**. Understand backpropagation, embeddings, and attention.\n` +
      `3. **The Transformer Architecture**: Read the seminal paper *"Attention Is All You Need"*. Code a basic self-attention block from scratch.\n` +
      `4. **Hands-on LLM Engineering**: Experiment with **Hugging Face Transformers**, OpenAI API, or local Ollama models. Master prompt engineering and function calling.\n` +
      `5. **Advanced Patterns**: Build **RAG (Retrieval-Augmented Generation)** using vector databases (ChromaDB, Pinecone) and develop autonomous agentic workflows.\n` +
      `6. **Build & Deploy**: Deploy a real full-stack project (e.g. FastAPI + Next.js). Real projects are the best proof of mastery!`;
  }

  if (q.includes("interview") || q.includes("prep") || q.includes("job")) {
    return `### AI/ML Technical Interview Preparation\n\n` +
      `1. **Coding & Data Structures**: Practice arrays, trees, graphs, and dynamic programming in Python on LeetCode.\n` +
      `2. **ML Theory & Math**: Be ready to derive loss functions (Cross-Entropy, MSE), explain gradient descent variants (Adam, SGD), and discuss overfitting/regularization.\n` +
      `3. **ML System Design**: Practice designing end-to-end architectures (e.g., search ranking, recommendation engines, fraud detection pipelines).\n` +
      `4. **Deep Learning & GenAI**: Be fluent in transformer internals, KV cache, LoRA/PEFT fine-tuning, and RAG retrieval metrics.\n` +
      `5. **Walkthrough Your Projects**: Be prepared to explain architectural tradeoffs, failure cases, and benchmark metrics for every project on your resume.`;
  }

  return `### Ask Terex AI — Career & Technical Guidance\n\n` +
    `I can assist you with:\n` +
    `- **Machine Learning Concepts**: Supervised vs. unsupervised learning, gradient descent, bias-variance tradeoff.\n` +
    `- **Deep Learning & Computer Vision**: CNNs, transfer learning, multispectral imagery, and Grad-CAM.\n` +
    `- **Generative AI & LLMs**: Transformers, RAG pipelines, fine-tuning, and vector embeddings.\n` +
    `- **Learning Roadmaps & Career**: Step-by-step guidance from beginner to advanced AI engineering.\n\n` +
    `Try asking: *"Explain the Transformer attention mechanism"* or *"How does RAG work?"*`;
}

export async function processAIChatRequest(
  messages: ChatMessage[],
  mode: AIChatMode
): Promise<AIResponse> {
  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();
  const apiKey = process.env.AI_API_KEY || "";
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content || "";

  // If no API key is provided, return authoritative grounded answers with explicit status
  if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_or_openai_or_groq_api_key_here") {
    const offlineContent =
      mode === "portfolio"
        ? getOfflinePortfolioResponse(lastUserMessage)
        : getOfflineCareerResponse(lastUserMessage);

    const friendlyNotice =
      `> ℹ️ **Notice**: Running in **Verified Knowledge Engine** mode. To enable live LLM generation with Gemini, OpenAI, or Groq, set \`AI_API_KEY\` in your \`.env.local\` file.\n\n` +
      offlineContent;

    return {
      content: friendlyNotice,
      provider: "Built-in Knowledge Engine",
      model: "Local Portfolio Knowledge",
      mode,
      isConfigured: false,
    };
  }

  const systemPrompt = mode === "portfolio" ? getPortfolioSystemContext() : getCareerSystemContext();

  try {
    if (provider === "gemini") {
      const model = process.env.AI_MODEL || "gemini-1.5-flash";
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const contents = [
        {
          role: "user",
          parts: [{ text: `SYSTEM DIRECTIVE:\n${systemPrompt}\n\nUSER INQUIRY:\n${lastUserMessage}` }],
        },
      ];

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: mode === "portfolio" ? 0.3 : 0.7,
            maxOutputTokens: 800,
          },
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Gemini API error (${res.status}): ${errorText}`);
      }

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

      return {
        content: reply || "I received an empty response from the AI model.",
        provider: "Google Gemini",
        model,
        mode,
        isConfigured: true,
      };
    } else if (provider === "openai" || provider === "groq") {
      const isGroq = provider === "groq";
      const endpoint = isGroq
        ? "https://api.groq.com/openai/v1/chat/completions"
        : "https://api.openai.com/v1/chat/completions";
      const defaultModel = isGroq ? "llama-3.3-70b-versatile" : "gpt-4o-mini";
      const model = process.env.AI_MODEL || defaultModel;

      const formattedMessages = [
        { role: "system", content: systemPrompt },
        ...messages.slice(-5), // Send last 5 turns to preserve context within limits
      ];

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: formattedMessages,
          temperature: mode === "portfolio" ? 0.3 : 0.7,
          max_tokens: 800,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`${provider.toUpperCase()} API error (${res.status}): ${errorText}`);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;

      return {
        content: reply || "I received an empty response from the AI model.",
        provider: isGroq ? "Groq" : "OpenAI",
        model,
        mode,
        isConfigured: true,
      };
    } else {
      throw new Error(`Unsupported AI_PROVIDER '${provider}'. Supported: 'gemini', 'openai', 'groq'.`);
    }
  } catch (error: any) {
    // Fallback gracefully on API errors
    console.error("[Terex AI Error]", error);
    const offlineContent =
      mode === "portfolio"
        ? getOfflinePortfolioResponse(lastUserMessage)
        : getOfflineCareerResponse(lastUserMessage);

    return {
      content:
        `> ⚠️ **Provider Notice**: Live provider request encountered an issue (${error.message || "Unknown error"}). Serving authoritative local answer:\n\n` +
        offlineContent,
      provider: "Fallback Engine",
      model: "Local Portfolio Knowledge",
      mode,
      isConfigured: false,
    };
  }
}
