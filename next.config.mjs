/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  reactStrictMode: true,
  ...(isGithubPages && {
    output: "export",
    basePath: "/Portfolio",
    assetPrefix: "/Portfolio/",
    images: {
      unoptimized: true,
    },
  }),
};

export default nextConfig;
