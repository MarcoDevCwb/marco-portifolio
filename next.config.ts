import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  async rewrites() {
    return [{ source: "/lab", destination: "/lab/index.html" }];
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;