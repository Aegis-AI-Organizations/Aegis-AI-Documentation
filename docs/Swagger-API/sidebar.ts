import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "Swagger-API/aegis-ai-gateway-api",
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
          id: "Swagger-API/list-all-pentest-scans",
          label: "List all Pentest Scans",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/initialize-a-new-pentest-scan-workflow",
          label: "Initialize a new Pentest Scan Workflow",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Swagger-API/retrieve-the-status-of-a-specific-scan",
          label: "Retrieve the Status of a Specific Scan",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/download-the-pentest-pdf-report-for-a-given-scan",
          label: "Download the Pentest PDF Report for a given Scan",
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
          id: "Swagger-API/retrieve-vulnerabilities-for-a-specific-scan",
          label: "Retrieve Vulnerabilities for a Specific Scan",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Swagger-API/retrieve-evidences-for-a-specific-vulnerability",
          label: "Retrieve Evidences for a Specific Vulnerability",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
