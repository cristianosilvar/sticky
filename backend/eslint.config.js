import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: parserTs,
      ecmaVersion: 2021,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": eslintPluginTs,
      import: importPlugin,
    },
    rules: {
      "no-console": "warn",
      "import/order": [
        "error",
        {
          groups: [["builtin", "external"], ["internal"]],
          "newlines-between": "always",
        },
      ],
      ...eslintPluginTs.configs.recommended.rules,
      ...prettier.rules,
    },
  },
];
