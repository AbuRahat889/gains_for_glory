import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["*", "nyc3.digitaloceanspaces.com"], // Allows all domains (use with caution; see Next.js docs)
  },
};

export default nextConfig;
