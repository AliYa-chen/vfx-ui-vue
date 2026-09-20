import { defineConfig } from "vitest/config";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vueJsx()],
  test: {
    include: ["tests/**/*.spec.ts", "tests/**/*.spec.tsx"],
    testTimeout: 60_000,
    hookTimeout: 60_000,
  },
});
