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
          id: "Swagger-API/initialize-a-new-pentest-scan",
          label: "Initialize a new Pentest Scan",
          className: "api-method post",
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
          id: "Swagger-API/list-live-vulnerabilities",
          label: "List Live Vulnerabilities",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
