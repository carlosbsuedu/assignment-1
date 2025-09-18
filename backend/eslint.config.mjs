// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/coverage/**"],
  },
  {
    files: ["backend/**/*.{js,mjs,cjs}", "**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Start with recommended rules
      ...js.configs.recommended.rules,

      // Add commonly fixable formatting rules
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "comma-spacing": ["error", { before: false, after: true }],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "space-before-blocks": ["error", "always"],
      "space-infix-ops": ["error"],
      "space-unary-ops": ["error", { words: true, nonwords: false }],
      "no-trailing-spaces": ["error"],
      "eol-last": ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],

      // Code quality rules that can be auto-fixed
      "prefer-const": ["error"],
      "no-var": ["error"],
      "object-shorthand": ["error", "always"],
      "prefer-arrow-callback": ["error"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-extra-parens": ["error", "all", { ignoreJSX: "multi-line" }],

      // Allow unused variables with underscore prefix
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
];
