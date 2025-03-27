import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";


export default defineConfig([
  { ignores: ["eslint.config.js"] },
  { files: ["**/*.{js,mjs,cjs}"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  {
    files: ["**/*.{js,mjs,cjs}"],
    rules: {
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
]);