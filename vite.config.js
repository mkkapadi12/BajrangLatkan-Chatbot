import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv"; // Import dotenv

// Load environment variables from .env file
config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://generativelanguage.googleapis.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Strips "/api" prefix
      },
    },
  },
  define: {
    "process.env": process.env,
  },
});
