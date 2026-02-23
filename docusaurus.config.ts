import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Aegis AI Docs",
  tagline: "Enterprise-Grade Offensive Cyberdefense Platform",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://aegis-ai-organizations.github.io/Aegis-AI-Documentation/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/Aegis-AI-Documentation/",

  // GitHub pages deployment config.
  organizationName: "Aegis-AI-Organizations", // Usually your GitHub org/user name.
  projectName: "Aegis-Documentation", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "api",
        docsPluginId: "classic",
        config: {
          aegis: {
            specPath: "openapi.yaml",
            outputDir: "docs/Swagger-API",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          },
        },
      },
    ],
    // 🦀 1. Télémétrie & Agent (Rust)
    [
      "docusaurus-plugin-remote-content",
      {
        name: "agent-docs",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Agent/main/docs/",
        outDir: "docs/Agent",
        documents: ["architecture.md", "telemetry.md", "quickstart.md"],
      },
    ],
    // 2. Aegis Api Gateway
    [
      "docusaurus-plugin-remote-content",
      {
        name: "api-docs",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Api-Gateway/main/docs/",
        outDir: "docs/API",
        documents: ["endpoints.md", "auth-keycloak.md"],
      },
    ],

    // 3. Aegis Brain
    [
      "docusaurus-plugin-remote-content",
      {
        name: "brain-docs",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Brain/main/docs/",
        outDir: "docs/Brain",
        documents: ["workflows.md", "llm-payloads.md", "neo4j-graph.md"],
      },
    ],

    // 4. Aegis Dashboard
    [
      "docusaurus-plugin-remote-content",
      {
        name: "dashboard-docs",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Dashboard/main/docs/",
        outDir: "docs/Dashboard",
        documents: ["architecture.md", "telemetry.md", "quickstart.md"],
      },
    ],

    // 5. Aegis Infra
    [
      "docusaurus-plugin-remote-content",
      {
        name: "infra-docs",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Infra/main/docs/",
        outDir: "docs/Infra",
        documents: ["kubernetes.md", "gvisor-sandbox.md", "cilium-network.md"],
      },
    ],

    // 6. Aegis Landing Page
    [
      "docusaurus-plugin-remote-content",
      {
        name: "landing-page-docs",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Landing/main/docs/",
        outDir: "docs/Landing-Page",
        documents: ["architecture.md", "telemetry.md", "quickstart.md"],
      },
    ],

    // 7. Aegis Proto
    [
      "docusaurus-plugin-remote-content",
      {
        name: "proto-docs",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Proto/main/docs/",
        outDir: "docs/Proto",
        documents: ["architecture.md", "telemetry.md", "quickstart.md"],
      },
    ],

    // 8. Aegis Worker Deployer
    [
      "docusaurus-plugin-remote-content",
      {
        name: "worker-deployer-docs",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Worker-Deployer/main/docs/",
        outDir: "docs/Worker-Deployer",
        documents: ["architecture.md", "api.md"],
      },
    ],

    // 9. Aegis Worker Fixer
    [
      "docusaurus-plugin-remote-content",
      {
        name: "worker-fixer-docs",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Worker-Fixer/main/docs/",
        outDir: "docs/Worker-Fixer",
        documents: ["architecture.md", "telemetry.md", "quickstart.md"],
      },
    ],

    // 10. Aegis Worker Ingest
    [
      "docusaurus-plugin-remote-content",
      {
        name: "worker-ingest-docs",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Worker-Ingest/main/docs/",
        outDir: "docs/Worker-Ingest",
        documents: ["architecture.md", "telemetry.md", "quickstart.md"],
      },
    ],

    // 11. Aegis Worker Pentest
    [
      "docusaurus-plugin-remote-content",
      {
        name: "worker-pentest-docs",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Worker-Pentest/main/docs/",
        outDir: "docs/Worker-Pentest",
        documents: ["architecture.md", "telemetry.md", "quickstart.md"],
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/Aegis-AI-Organizations/Aegis-Documentation/tree/main/",
          docItemComponent: "@theme/ApiItem", // Added for OpenAPI Swagger UI
        },
        blog: false, // Disabling the blog
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs"],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      defaultMode: "dark", // Using dark mode by default for SOC analysts
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Aegis AI",
      logo: {
        alt: "Aegis AI Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          type: "docSidebar",
          sidebarId: "apiSidebar",
          position: "left",
          label: "API Reference",
        },
        {
          href: "https://github.com/Aegis-AI-Organizations/Aegis-Documentation",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Developers",
          items: [
            {
              label: "Gateway API (Swagger)",
              to: "/docs/Swagger-API/aegis-ai-gateway-api",
            },
            {
              label: "Agent (Rust)",
              to: "/docs/Agent/architecture", // Must specify an existing .md file, fetching the raw folder fails links check
            },
            {
              label: "Brain (Python)",
              to: "/docs/Brain/workflows",
            },
            {
              label: "Worker Stack",
              to: "/docs/Worker-Pentest/architecture",
            },
          ],
        },
        {
          title: "Infrastructure",
          items: [
            {
              label: "Kubernetes & gVisor",
              to: "/docs/Infra/architecture",
            },
          ],
        },
        {
          title: "Aegis Security",
          items: [
            {
              label: "Official Website",
              href: "https://www.aegis.ai",
            },
            {
              label: "Project GitHub",
              href: "https://github.com/Aegis-AI-Organizations",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Aegis AI Platform. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
