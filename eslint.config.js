import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,jsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },

  {
    rules: {
      // 必須要有分號
      semi: "error",
      // 不允許使用以底線命名的變數及方法
      "no-underscore-dangle": [
        "error",
        {
          allowAfterThis: true, // 允許接在 this 之後
          allowAfterSuper: true, // 允許接在 super 之後
          allowAfterThisConstructor: true, // 允許接在 this.constructor 之後
        },
      ],
    },
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  skipFormatting,
];
