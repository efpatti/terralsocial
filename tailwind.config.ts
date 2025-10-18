import type { Config } from "tailwindcss";

const config: Config = {
 content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
 ],
 theme: {
  extend: {
   boxShadow: {
    // Sombra apenas no topo
    top: "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
   },
   colors: {
    // exemplo de cor customizada
    primary: "#4F46E5",
    secondary: "#F43F5E",
   },
   fontFamily: {
    sans: ["Inter", "sans-serif"],
   },
  },
 },
 plugins: [],
};

export default config;
