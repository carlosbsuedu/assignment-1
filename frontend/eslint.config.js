import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";

export default [
  // Ignore build outputs
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // Base JavaScript rules
      ...js.configs.recommended.rules,

      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // React Refresh rules (more permissive for contexts)
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
          allowExportNames: ["AuthContext", "useAuth"],
        },
      ],

      // Ignore unused vars that start with _ (or UPPERCASE constants)
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^(_|[A-Z_])",
          argsIgnorePattern: "^_",
        },
      ],

      // Disallow invisible characters like U+00a0 (non-breaking space)
      "no-irregular-whitespace": [
        "error",
        {
          skipStrings: false,
          skipComments: false,
          skipRegExps: false,
          skipTemplates: false,
        },
      ],

      // Prettier config - disable conflicting rules
      ...prettier.rules,
    },
  },
];
