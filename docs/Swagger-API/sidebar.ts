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
          label: "Authenticate and establish a session",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Swagger-API/retrieve-current-session-profile",
          label: "Retrieve current session profile",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/rotate-session-tokens",
          label: "Rotate session tokens",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Swagger-API/terminate-current-session",
          label: "Terminate current session",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Swagger-API/update-personal-profile",
          label: "Update personal profile",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "Swagger-API/remove-profile-avatar",
          label: "Remove profile avatar",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "Swagger-API/change-account-email",
          label: "Change account email",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "Swagger-API/change-account-password",
          label: "Change account password",
          className: "api-method put",
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
          id: "Swagger-API/list-pentest-operations",
          label: "List pentest operations",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/initialize-a-pentest-workflow",
          label: "Initialize a pentest workflow",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Swagger-API/retrieve-specific-scan-status",
          label: "Retrieve specific scan status",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/download-pdf-pentest-report",
          label: "Download PDF pentest report",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/universal-scan-status-stream-sse",
          label: "Universal scan status stream (SSE)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/mission-specific-status-stream-sse",
          label: "Mission-specific status stream (SSE)",
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
          id: "Swagger-API/retrieve-discoveries-for-a-scan",
          label: "Retrieve discoveries for a scan",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/retrieve-technical-evidences",
          label: "Retrieve technical evidences",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Administration",
      link: {
        type: "doc",
        id: "Swagger-API/administration",
      },
      items: [
        {
          type: "doc",
          id: "Swagger-API/list-accessible-companies",
          label: "List accessible companies",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/register-a-new-company",
          label: "Register a new company",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Swagger-API/atomic-client-onboarding",
          label: "Post-payment client onboarding",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Swagger-API/search-for-companies",
          label: "Search for companies",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/search-for-users",
          label: "Search for users",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/administrative-user-creation",
          label: "Administrative user creation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Swagger-API/retrieve-system-audit-trails",
          label: "Retrieve system audit trails",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/real-time-team-updates-sse",
          label: "Real-time team updates (SSE)",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Billing & Finance",
      link: {
        type: "doc",
        id: "Swagger-API/billing-finance",
      },
      items: [
        {
          type: "doc",
          id: "Swagger-API/get-current-token-balance",
          label: "Get current token balance",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/retrieve-transaction-history",
          label: "Retrieve transaction history",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/usage-analytics",
          label: "Usage analytics",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/adjust-company-balance",
          label: "Adjust company balance",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Swagger-API/admin-view-of-company-balance",
          label: "Admin view of company balance",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/admin-view-of-company-ledger",
          label: "Admin view of company ledger",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/admin-view-of-company-usage",
          label: "Admin view of company usage",
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
          id: "Swagger-API/retrieve-platform-health-status",
          label: "Retrieve platform health status",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/retrieve-root-metadata",
          label: "Retrieve root metadata",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/generate-presigned-upload-url-user",
          label: "Generate presigned upload URL (User)",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Agent Operations",
      link: {
        type: "doc",
        id: "Swagger-API/agent-operations",
      },
      items: [
        {
          type: "doc",
          id: "Swagger-API/register-a-new-remote-agent",
          label: "Register a new remote agent",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Swagger-API/update-agent-operational-status",
          label: "Update agent operational status",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Swagger-API/generate-presigned-upload-url",
          label: "Generate presigned upload URL",
          className: "api-method get",
        },
      ],
    },
  ],
};

module.exports = sidebar.apisidebar;
