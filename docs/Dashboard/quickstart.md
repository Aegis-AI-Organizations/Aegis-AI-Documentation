# Dashboard Quickstart

## Local Development

```bash
npm install
npm run dev
```

Set the Gateway URL when the API is not served through the local proxy:

```bash
VITE_API_URL=http://localhost:8080/api npm run dev
```

Set the documentation URL when testing links against a local Docusaurus instance:

```bash
VITE_DOCS_URL=http://localhost:3000/Aegis-AI-Documentation npm run dev
```

## Production Build

```bash
npm run build
```

The build runs Panda CSS code generation, TypeScript compilation, and Vite bundling.

## Agent Onboarding from the Dashboard

1. Activate the owner account or rotate the agent token from **Settings**.
2. Copy the `ag_...` deployment token immediately.
3. Open the security dashboard.
4. If no agent is configured, click **Deploy first agent** to open the infrastructure installation guide.
5. Start the agent and wait for `Agents deployed`, `Active`, and `Last seen` to update.
