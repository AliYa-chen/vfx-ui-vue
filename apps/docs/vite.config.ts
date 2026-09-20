import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: [
      {
        find: "vfx-ui-vue-core",
        replacement: fileURLToPath(new URL("../../packages/core/src/index.ts", import.meta.url)),
      },
      {
        find: "vfx-ui-vue/compat",
        replacement: fileURLToPath(new URL("../../packages/vue/src/vueCompat.ts", import.meta.url)),
      },
      {
        find: "vfx-ui-vue",
        replacement: fileURLToPath(new URL("../../packages/vue/src/index.ts", import.meta.url)),
      },
    ],
  },
  build: {
    chunkSizeWarningLimit: 900,
  },
});
