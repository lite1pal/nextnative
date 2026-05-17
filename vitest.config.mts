import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      "server-only": new URL("./lib/mocks/server-only.ts", import.meta.url)
        .pathname,
    },
  },
  test: {
    environment: "node",

    include: [
      // "__tests__/**/*.test.ts",
      // "tests/**/*.test.ts",
      // "tests/**/*.test.tsx",
      // "lib/**/*.test.ts",
      // "lib/**/*.spec.ts",
      "app/**/*.test.ts",
      // "app/**/*.spec.ts",
      // "app/**/*.test.tsx",
      // "app/**/*.spec.tsx",
      // "components/**/*.test.tsx",
      // "components/**/*.spec.tsx",
    ],

    exclude: ["node_modules", ".next"],
  },
});
