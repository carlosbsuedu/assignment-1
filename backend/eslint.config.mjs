// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/coverage/**"],
  },
  {
    // Start from ESLint recommended, then add Node globals
    ...js.configs.recommended,
    files: ["backend/**/*.{js,mjs,cjs}", "**/*.js"],
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // <-- gives you `process`, `__dirname`, etc.
      },
    },
  },
];
