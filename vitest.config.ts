import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: fileURLToPath(new URL("./components", import.meta.url)),
      lib: fileURLToPath(new URL("./lib", import.meta.url)),
      img: fileURLToPath(new URL("./img", import.meta.url)),
    },
  },
  test: {
    include: ["./**/*.test.ts", "./**/*.test.tsx"],
    globals: true,
    environment: "jsdom",
  },
});
