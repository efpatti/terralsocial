import type { NextConfig } from "next";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
 // Output standalone para Docker
 output: "standalone",

 // Disable image optimization for Docker
 images: {
  unoptimized: true,
 },

 // Ensure trailing slashes
 trailingSlash: false,
};

export default nextConfig;
