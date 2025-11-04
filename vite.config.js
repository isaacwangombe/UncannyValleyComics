import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { copyFileSync } from "fs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-redirects",
      closeBundle() {
        try {
          // ✅ Corrected path — copy from public/_redirects
          copyFileSync(
            resolve("public/_redirects"),
            resolve("dist/_redirects")
          );
          console.log("✅ Copied _redirects into dist/");
        } catch (e) {
          console.warn("⚠️ Could not copy _redirects:", e.message);
        }
      },
    },
  ],
  build: {
    outDir: "dist",
  },
});
