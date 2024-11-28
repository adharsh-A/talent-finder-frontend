import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true
      }
    }
  },
  css: {
    postcss: "./postcss.config.js", // Ensure this file exists and is configured correctly
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // fix here
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
    
  },
  build: {
    rollupOptions: {
      output: {
        // Define manual chunks for larger dependencies
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react"; // Group React libraries
            }
            if (id.includes("three") || id.includes("@react-three")) {
              return "three"; // Group Three.js libraries
            }
            // You can add more libraries here if needed
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size limit to reduce warnings
  },
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled'], // Ensure these are optimized
  },
  plugins: [react()],
});
