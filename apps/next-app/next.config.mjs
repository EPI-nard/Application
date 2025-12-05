const isProd = process.env.NODE_ENV === "production";

// ⚠️ nom EXACT de ton repo GitHub
const repoName = "nom-de-ton-repo";

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
