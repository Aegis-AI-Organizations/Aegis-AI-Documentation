import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  markdown: {
    mermaid: true,
  },
  title: "Aegis AI | Intelligence & Orchestration",
  tagline: "The offensive control plane for modern security operations.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://aegis-ai-organizations.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/Aegis-Documentation/",

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
    locales: ["en", "fr"],
    localeConfigs: {
      en: { label: "English" },
      fr: { label: "Français" },
    },
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
    // 1. Aegis Agent
    [
      "docusaurus-plugin-remote-content",
      {
        name: "agent-docs-en",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Agent/main/docs/en/",
        outDir: "docs/Agent",
        documents: ["architecture.md"],
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "agent-docs-fr",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Agent/main/docs/fr/",
        outDir: "i18n/fr/docusaurus-plugin-content-docs/current/Agent",
        documents: ["architecture.md"],
      },
    ],
    // 2. Aegis Api Gateway
    [
      "docusaurus-plugin-remote-content",
      {
        name: "api-docs-en",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Api-Gateway/main/docs/en/",
        outDir: "docs/API",
        documents: ["endpoints.md"],
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "api-docs-fr",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Api-Gateway/main/docs/fr/",
        outDir: "i18n/fr/docusaurus-plugin-content-docs/current/API",
        documents: ["endpoints.md"],
      },
    ],
    // 3. Aegis Brain
    [
      "docusaurus-plugin-remote-content",
      {
        name: "brain-docs-en",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Brain/main/docs/en/",
        outDir: "docs/Brain",
        documents: ["workflows.md"],
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "brain-docs-fr",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Brain/main/docs/fr/",
        outDir: "i18n/fr/docusaurus-plugin-content-docs/current/Brain",
        documents: ["workflows.md"],
      },
    ],
    // 4. Aegis Dashboard
    [
      "docusaurus-plugin-remote-content",
      {
        name: "dashboard-docs-en",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Dashboard/main/docs/en/",
        outDir: "docs/Dashboard",
        documents: ["architecture.md"],
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "dashboard-docs-fr",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Dashboard/main/docs/fr/",
        outDir: "i18n/fr/docusaurus-plugin-content-docs/current/Dashboard",
        documents: ["architecture.md"],
      },
    ],
    // 5. Aegis Infra
    [
      "docusaurus-plugin-remote-content",
      {
        name: "infra-docs-en",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Infra/main/docs/en/",
        outDir: "docs/Infra",
        documents: [
          "architecture.md",
          "security-mtls.md",
          "infrastructure-keda.md",
        ],
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "infra-docs-fr",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Infra/main/docs/fr/",
        outDir: "i18n/fr/docusaurus-plugin-content-docs/current/Infra",
        documents: [
          "architecture.md",
          "security-mtls.md",
          "infrastructure-keda.md",
        ],
      },
    ],
    // 6. Aegis Landing Page
    [
      "docusaurus-plugin-remote-content",
      {
        name: "landing-page-docs-en",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Landing/main/docs/en/",
        outDir: "docs/Landing-Page",
        documents: ["architecture.md"],
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "landing-page-docs-fr",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Landing/main/docs/fr/",
        outDir: "i18n/fr/docusaurus-plugin-content-docs/current/Landing-Page",
        documents: ["architecture.md"],
      },
    ],
    // 7. Aegis Proto
    [
      "docusaurus-plugin-remote-content",
      {
        name: "proto-docs-en",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Proto/main/docs/en/",
        outDir: "docs/Proto",
        documents: ["architecture.md"],
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "proto-docs-fr",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Proto/main/docs/fr/",
        outDir: "i18n/fr/docusaurus-plugin-content-docs/current/Proto",
        documents: ["architecture.md"],
      },
    ],
    // 8. Aegis Worker Deployer
    [
      "docusaurus-plugin-remote-content",
      {
        name: "worker-deployer-docs-en",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Worker-Deployer/main/docs/en/",
        outDir: "docs/Worker-Deployer",
        documents: ["architecture.md"],
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "worker-deployer-docs-fr",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Worker-Deployer/main/docs/fr/",
        outDir:
          "i18n/fr/docusaurus-plugin-content-docs/current/Worker-Deployer",
        documents: ["architecture.md"],
      },
    ],
    // 9. Aegis Worker Fixer
    [
      "docusaurus-plugin-remote-content",
      {
        name: "worker-fixer-docs-en",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Worker-Fixer/main/docs/en/",
        outDir: "docs/Worker-Fixer",
        documents: ["architecture.md"],
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "worker-fixer-docs-fr",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Worker-Fixer/main/docs/fr/",
        outDir: "i18n/fr/docusaurus-plugin-content-docs/current/Worker-Fixer",
        documents: ["architecture.md"],
      },
    ],
    // 10. Aegis Worker Ingest
    [
      "docusaurus-plugin-remote-content",
      {
        name: "worker-ingest-docs-en",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Worker-Ingest/main/docs/en/",
        outDir: "docs/Worker-Ingest",
        documents: ["architecture.md"],
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "worker-ingest-docs-fr",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Worker-Ingest/main/docs/fr/",
        outDir: "i18n/fr/docusaurus-plugin-content-docs/current/Worker-Ingest",
        documents: ["architecture.md"],
      },
    ],
    // 11. Aegis Worker Pentest
    [
      "docusaurus-plugin-remote-content",
      {
        name: "worker-pentest-docs-en",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Worker-Pentest/main/docs/en/",
        outDir: "docs/Worker-Pentest",
        documents: ["architecture.md"],
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "worker-pentest-docs-fr",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Aegis-AI-Organizations/Aegis-AI-Worker-Pentest/main/docs/fr/",
        outDir: "i18n/fr/docusaurus-plugin-content-docs/current/Worker-Pentest",
        documents: ["architecture.md"],
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

  themes: ["docusaurus-theme-openapi-docs", "@docusaurus/theme-mermaid"],

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
        { type: "localeDropdown", position: "right" },
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
              label: "Architecture",
              to: "/docs/Infra/architecture",
            },
            {
              label: "Getting Started",
              to: "/docs/Infra/architecture", // Fallback to architecture since getting-started isn't localized yet
            },
            {
              label: "Kubernetes & gVisor",
              to: "/docs/Infra/architecture", // Fallback
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
