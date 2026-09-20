import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    lib: {
      entry: {
        "vfx-ui-vue": resolve(__dirname, "src/index.ts"),
        compat: resolve(__dirname, "src/vueCompat.ts"),
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ["vue", "vgpu", "cobe"],
    },
  },
});
