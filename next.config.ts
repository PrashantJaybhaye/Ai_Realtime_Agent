import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "github.githubassets.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
