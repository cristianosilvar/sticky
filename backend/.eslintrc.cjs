module.exports = {
  env: { node: true, es2021: true },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": "warn",
    "import/order": [
      "error",
      {
        groups: [["builtin", "external"], ["internal"]],
        "newlines-between": "always",
      },
    ],
  },
};
