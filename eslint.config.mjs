import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{ts,tsx}"],
    ignores: [
      "lib/env.ts",
      "tests/**",
      "next.config.ts",
      "prisma/client.ts",
      "app/(content)/tutorials/[slug]/tutorials-data.ts",
      "app/(core)/thank-you-stripe/form.tsx",
      "services/custom-analytics.ts",
      "services/resend.ts",
    ],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "MemberExpression[object.object.name='process'][object.property.name='env']",
          message: "Use typed env access from '@/lib/env' instead of process.env.",
        },
      ],
    },
  },
  {
    files: ["app/api/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/prisma/client",
              message:
                "Route handlers should use services/repositories instead of direct Prisma access.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["lib/services/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/app/**"],
              message:
                "Services must be framework-agnostic and must not import from app/*.",
            },
            {
              group: ["@/lib/http/**"],
              message:
                "Services must not depend on HTTP transport helpers from lib/http.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["app/**/*.{ts,tsx}"],
    ignores: ["app/api/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/app/api/**"],
              message:
                "App pages/components should not import route handlers directly.",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
