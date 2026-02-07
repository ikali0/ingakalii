import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"

import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import jsxA11y from "eslint-plugin-jsx-a11y"
import importPlugin from "eslint-plugin-import"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import unusedImports from "eslint-plugin-unused-imports"
import prettierPlugin from "eslint-plugin-prettier"
import eslintConfigPrettier from "eslint-config-prettier"

export default tseslint.config(
  {
    ignores: ["dist", "node_modules"],
  },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      prettier: prettierPlugin,
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: true,
      },
    },

    rules: {
      /* ---------------- Prettier ---------------- */
      "prettier/prettier": "error",

      /* ---------------- React ---------------- */
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      "react/react-in-jsx-scope": "off",

      /* ---------------- Fast Refresh ---------------- */
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      /* ---------------- TypeScript Strictness ---------------- */
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/no-misused-promises": "error",

      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      /* ---------------- Import Sorting ---------------- */
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      /* ---------------- Import Hygiene ---------------- */
      "import/no-duplicates": "error",
      "import/order": "off",

      /* ---------------- Path Alias Protection ---------------- */
      "import/no-relative-parent-imports": "warn",

      /* ---------------- Performance ---------------- */
      "react/jsx-no-bind": [
        "warn",
        {
          allowArrowFunctions: false,
          allowFunctions: false,
        },
      ],

      "react/no-array-index-key": "warn",

      /* ---------------- Accessibility ---------------- */
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",

      /* Disable conflicting formatting rules */
      ...eslintConfigPrettier.rules,
    },
  }
)
