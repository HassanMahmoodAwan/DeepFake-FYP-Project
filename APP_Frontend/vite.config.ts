import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/file": "http://localhost:3000",
      "/users": "http://localhost:3333",
      "/textToSpeech": "http://localhost:3000",

      "/audio": "http://localhost:3000",
    },
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  plugins: [react()],
});
