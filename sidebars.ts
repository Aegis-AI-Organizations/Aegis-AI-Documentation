import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: "category",
      label: "🛡️ Welcome",
      collapsed: false,
      items: ["Infra/architecture"], // Vision/Architecture as landing
    },
    {
      type: "category",
      label: "🚀 Getting Started",
      items: ["Infra/kubernetes"], // MVP Setup
    },
    {
      type: "category",
      label: "🧠 Core Concepts",
      items: [
        "Brain/workflows", // Temporal
        "Brain/multi-tenancy",
        "Brain/neo4j-graph",
      ],
    },
    {
      type: "category",
      label: "🏗️ Services",
      items: [
        {
          type: "category",
          label: "API Gateway",
          items: ["API/endpoints", "API/authentication"],
        },
        {
          type: "category",
          label: "Brain Orchestrator",
          items: ["Brain/llm-payloads"],
        },
        {
          type: "category",
          label: "Dashboard",
          items: ["Dashboard/architecture", "Dashboard/quickstart"],
        },
        {
          type: "category",
          label: "Infrastructure Agent",
          items: [
            "Agent/architecture",
            "Agent/quickstart",
            "Agent/token-format",
          ],
        },
        {
          type: "category",
          label: "The Armory (Workers)",
          items: [
            "Worker-Pentest/architecture",
            "Worker-Deployer/architecture",
            "Worker-Fixer/architecture",
            "Worker-Ingest/architecture",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "🔐 Security & Infra",
      items: [
        "Infra/cilium-network",
        "Infra/gvisor-sandbox",
        "Infra/security-mtls",
        "Infra/infrastructure-keda",
      ],
    },
  ],
  apiSidebar: [
    {
      type: "category",
      label: "Aegis AI Gateway API",
      link: {
        type: "generated-index",
        title: "Aegis AI Gateway API",
        description:
          "Official REST & SSE API Reference for the Aegis AI Control Plane.",
        slug: "/category/aegis-api",
      },
      items: require("./docs/Swagger-API/sidebar.ts"),
    },
  ],
};

export default sidebars;
