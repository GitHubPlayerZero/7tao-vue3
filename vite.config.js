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

  build: {
    // 產出 JS 的 source map
    sourcemap: true,
    rollupOptions: {
      output: {
        /**
         * 將 node_modules 中的每個套件分割成獨立的 chunk，
         * 以減少主 bundle 的體積，提升瀏覽器載入效率。
         * @param {string} id 模組路徑。
         * @returns {string|undefined} chunk 名稱。
         * 如果返回 undefined，則不會將該模組分割成獨立的 chunk。
         * 這樣可以避免過多的 chunk，導致瀏覽器載入效率下降。
         * 例如：如果 id 是 "node_modules/vue/dist/vue.runtime.esm-bund le.js"，則返回 "vue"。
         * 如果 id 是 "node_modules/lodash/lodash.js"，則返回 "lodash"。
         * 如果 id 是 "src/main.js"，則返回 undefined，因為這不是 node_modules 中的模組。
         * 這樣可以確保只對 node_modules 中的模組進行分割，而不會對應用程式的模組進行分割。
         */
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
      // output end
    },
    // rollupOptions end
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
