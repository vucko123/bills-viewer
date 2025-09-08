import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import prettier from "eslint-plugin-prettier"
import { globalIgnores } from "eslint/config"

export default tseslint.config([
  globalIgnores(["dist", ".eslintrc.cjs", "prettier.config.cjs"]),

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      prettier,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-nested-ternary": "warn",
      "no-unneeded-ternary": ["error", { defaultAssignment: false }],
      "prefer-const": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: "ForInStatement",
          message:
            "for..in iterates over the prototype chain. Use Object.keys/values/entries instead.",
        },
        {
          selector: "ForOfStatement",
          message:
            "Prefer array methods (map/filter etc). Generators need regenerator-runtime.",
        },
        {
          selector: "LabeledStatement",
          message: "Labels are confusing (GOTO-like). Avoid them.",
        },
        {
          selector: "WithStatement",
          message: "`with` is not allowed in strict mode.",
        },
      ],
      "no-restricted-globals": [
        "error",
        { name: "isFinite", message: "Use Number.isFinite instead." },
        { name: "isNaN", message: "Use Number.isNaN instead." },
        "event",
        "frames",
        "parent",
        "top",
      ],
      "no-return-assign": ["error", "always"],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
])

