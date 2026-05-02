import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "Swagger-API/aegis-ai-gateway-api",
    },
    {
      type: "category",
      label: "Authentication",
      link: {
        type: "doc",
        id: "Swagger-API/authentication",
      },
      items: [
        {
          type: "doc",
          id: "Swagger-API/authenticate-and-establish-a-session",
          label: "Login",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Swagger-API/retrieve-the-current-users-profile",
          label: "Get User Profile",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/regenerate-an-access-token",
          label: "Refresh Token",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Swagger-API/terminate-the-current-session",
          label: "Logout",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Pentest Operations",
      link: {
        type: "doc",
        id: "Swagger-API/pentest-operations",
      },
      items: [
        {
          type: "doc",
          id: "Swagger-API/list-all-orchestrated-pentest-scans",
          label: "List all Scans",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/initialize-a-new-pentest-workflow",
          label: "Start New Scan",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Swagger-API/retrieve-the-status-of-a-specific-scan",
          label: "Get Scan Status",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/download-the-finalized-pentest-pdf-report",
          label: "Download Report (PDF)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/establish-a-universal-live-update-stream-sse",
          label: "Global SSE Stream",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/establish-a-scan-specific-live-update-stream-sse",
          label: "Mission SSE Stream",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Vulnerabilities",
      link: {
        type: "doc",
        id: "Swagger-API/vulnerabilities",
      },
      items: [
        {
          type: "doc",
          id: "Swagger-API/retrieve-technical-vulnerabilities-found-during-a-scan",
          label: "Get Scan Vulnerabilities",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/retrieve-security-evidence-for-a-specific-vulnerability",
          label: "Get Vulnerability Evidence",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Platform",
      link: {
        type: "doc",
        id: "Swagger-API/platform",
      },
      items: [
        {
          type: "doc",
          id: "Swagger-API/retrieve-the-platforms-health-status",
          label: "Health Status",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/retrieve-platform-root-metadata",
          label: "Platform Metadata",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
