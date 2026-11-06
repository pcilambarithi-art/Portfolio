export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string | null;
  fork: boolean;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  createdAt: string;
  topics: string[];
}

export interface GitHubProfileData {
  username: string;
  name: string | null;
  avatarUrl: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  createdAt: string;
  repos: GitHubRepo[];
  isLive: boolean;
  rateLimitRemaining?: number;
}

// In-memory cache for API requests
let cachedData: GitHubProfileData | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour cache

export async function fetchGitHubData(username: string = "pcilambarithi-art"): Promise<GitHubProfileData> {
  const now = Date.now();
  if (cachedData && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedData;
  }

  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Ilambarithi-Portfolio-App",
  };
  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok) {
      throw new Error(`GitHub user API returned ${userRes.status}`);
    }

    const userData = await userRes.json();
    let reposData: any[] = [];
    if (reposRes.ok) {
      reposData = await reposRes.json();
    }

    const repos: GitHubRepo[] = (Array.isArray(reposData) ? reposData : []).map((r: any) => ({
      id: r.id,
      name: r.name,
      fullName: r.full_name,
      htmlUrl: r.html_url,
      description: r.description,
      fork: r.fork,
      stars: r.stargazers_count ?? 0,
      forks: r.forks_count ?? 0,
      language: r.language ?? "Code",
      updatedAt: r.updated_at,
      createdAt: r.created_at,
      topics: r.topics || [],
    }));

    const result: GitHubProfileData = {
      username: userData.login,
      name: userData.name,
      avatarUrl: userData.avatar_url,
      profileUrl: userData.html_url,
      publicRepos: userData.public_repos ?? repos.length,
      followers: userData.followers ?? 0,
      following: userData.following ?? 0,
      createdAt: userData.created_at,
      repos,
      isLive: true,
      rateLimitRemaining: Number(userRes.headers.get("x-ratelimit-remaining") || 60),
    };

    cachedData = result;
    lastFetchTime = now;
    return result;
  } catch (err: any) {
    console.warn("[GitHub Fetch Warning]", err.message);

    // Fallback data if API rate-limited or offline
    const fallback: GitHubProfileData = {
      username: username,
      name: "ILAMBARITHI N",
      avatarUrl: "https://avatars.githubusercontent.com/u/240647239?v=4",
      profileUrl: `https://github.com/${username}`,
      publicRepos: 3,
      followers: 1,
      following: 0,
      createdAt: "2025-10-28T06:42:41Z",
      repos: [
        {
          id: 1,
          name: "ai_project",
          fullName: `${username}/ai_project`,
          htmlUrl: `https://github.com/${username}/ai_project`,
          description: "Full-stack AI Project Builder with FastAPI and React",
          fork: false,
          stars: 0,
          forks: 0,
          language: "Python",
          updatedAt: new Date().toISOString(),
          createdAt: "2025-10-28T06:42:41Z",
          topics: ["ai", "fastapi", "react"],
        },
        {
          id: 2,
          name: "demo_bustrack",
          fullName: `${username}/demo_bustrack`,
          htmlUrl: `https://github.com/${username}/demo_bustrack`,
          description: "Real-time college bus tracking application",
          fork: false,
          stars: 0,
          forks: 0,
          language: "HTML",
          updatedAt: new Date().toISOString(),
          createdAt: "2026-09-25T16:25:18Z",
          topics: ["tracking", "bus"],
        },
      ],
      isLive: false,
    };

    return fallback;
  }
}
