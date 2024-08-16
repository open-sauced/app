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
      helpers: fileURLToPath(new URL("./helpers", import.meta.url)),
      img: fileURLToPath(new URL("./img", import.meta.url)),
    },
  },
  test: {
    include: ["./**/*.test.ts", "./**/*.test.tsx"],
    globals: true,
    environment: "jsdom",
    env: {
      NEXT_PUBLIC_SUPABASE_URL: "https://fcqqkxwlntnrtjfbcioz.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjcXFreHdsbnRucnRqZmJjaW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg0MTkyNzQsImV4cCI6MjAxMzk5NTI3NH0.ymWWYdnJC2gsnrJx4lZX2cfSOp-1xVuWFGt1Wr6zwtg",
    },
  },
});
