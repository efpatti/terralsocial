import type { NextConfig } from "next";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
 output: "export",

 // GitHub Pages deployment - sempre usa o basePath em produção
 basePath: "/terralsocial",

 // Disable image optimization for static export
 images: {
  unoptimized: true,
 },

 // Ensure trailing slashes
 trailingSlash: true,
};

export default nextConfig;
