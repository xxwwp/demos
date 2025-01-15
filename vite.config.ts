import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    checker({
      // e.g. use TypeScript check
      typescript: {
        buildMode: true,
      },
      eslint: {
        useFlatConfig: true, // for me this fix the problem
        lintCommand: "eslint .",
      },
    }),
    react(),
  ],
});
