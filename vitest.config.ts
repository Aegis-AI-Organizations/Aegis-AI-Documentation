import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@docusaurus/Link": resolve(__dirname, "test/mocks/docusaurus-link.tsx"),
      "@docusaurus/useDocusaurusContext": resolve(
        __dirname,
        "test/mocks/docusaurus-context.ts",
      ),
      "@theme/Layout": resolve(__dirname, "test/mocks/theme-layout.tsx"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "v8",
      all: true,
      include: ["src/**/*.{ts,tsx}"],
      thresholds: {
        lines: 80,
        statements: 80,
        functions: 80,
      },
    },
  },
});
