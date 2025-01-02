import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import viteEslint from "vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  base: "/7tao-vue3/", // 專案 repo 路徑
  plugins: [viteEslint(), vue(), vueDevTools()],
  css: {
    devSourcemap: true,
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
