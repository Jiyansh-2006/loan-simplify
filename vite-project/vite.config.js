import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Define your allowed domain (frontend Render domain)
const allowedDomain = "https://loansimp-lify.onrender.com";

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    base: "/", // Correct for Render deployment
    server: {
      host: "0.0.0.0",
      port: 5173,
      cors: {
        origin: allowedDomain, // ✅ Only allow your frontend domain
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
      },
    },
    preview: {
      host: "0.0.0.0",
      port: 4173,
      cors: {
        origin: allowedDomain,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
      },
    },
  };
});
