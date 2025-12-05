/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

// ⚠️ mets ici le NOM EXACT de ton repo GitHub
const repoName = "nom-de-ton-repo";

const nextConfig = {
  output: "export", // indispensable pour GitHub Pages

  // pour que le site marche sous https://USER.github.io/nom-de-ton-repo
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
