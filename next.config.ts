import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 output: "export",

 // GitHub Pages deployment
 basePath: process.env.NODE_ENV === "production" ? "/terralsocial" : "",
 assetPrefix: process.env.NODE_ENV === "production" ? "/terralsocial/" : "",

 // Disable image optimization for static export
 images: {
  unoptimized: true,
 },

 // Ensure trailing slashes
 trailingSlash: true,
};

export default nextConfig;
