import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // Using SWC for faster builds
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: "./postcss.config.js", // Specify PostCSS configuration
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Set up alias for src directory
      "@components": path.resolve(__dirname, "./src/components"), // Alias for components
      "@assets": path.resolve(__dirname, "./src/assets"), // Alias for assets
    },
  },
  plugins: [react()], // Include React plugin
});
