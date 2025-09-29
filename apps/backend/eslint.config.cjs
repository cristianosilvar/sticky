const eslintPluginTs = require("@typescript-eslint/eslint-plugin");
const parserTs = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");
const prettier = require("eslint-config-prettier");

module.exports = [
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
