const prettierConfig = require("./prettier.config");

module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false
  },
  env: {
    node: true,
    es6: true,
    jest: true,
    "jest/globals": true
  },

  extends: ["eslint:recommended", "unobtrusive/import", "prettier", "plugin:json/recommended"],
  plugins: ["import", "prettier", "jest", "babel"],
  rules: {
    "prettier/prettier": ["error", prettierConfig],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-debugger": "error",
    "global-require": "warn",
    "import/no-extraneous-dependencies": "off",
    "import/order": "warn",
    "import/no-cycle": "error",
    "jest/prefer-spy-on": "off",
    "jest/expect-expect": "off",
    "jest/prefer-strict-equal": "off",
    "jest/valid-describe-callback": "error"
  },
  overrides: [
    {
      files: ["**/*.test.js"],
      env: {
        "jest/globals": true
      },
      rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/no-test-return-statement": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "jest/valid-describe-callback": "error"
      }
    }
  ]
};
