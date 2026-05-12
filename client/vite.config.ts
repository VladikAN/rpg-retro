import { defineConfig } from "vite";

export default defineConfig({
  appType: "spa",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    proxy: {
      "/api": { target: "http://127.0.0.1:8080", changeOrigin: true },
      "/health": { target: "http://127.0.0.1:8080", changeOrigin: true },
    },
  },
});
