# Quickstart | Aegis Agent (Rust)

The Aegis Agent is a lightweight Rust-based probe that must be installed on the client's infrastructure to collect security telemetry and stream it back to the Brain.

## Prerequisites

1.  Have **Owner** access to your organization on the Aegis Dashboard.
2.  Have generated or retrieved your **Deployment Token** (`ag_<43+ URL-safe chars>`) from the Dashboard.

## Rapid Installation (Docker)

The recommended way to deploy the agent is via Docker. Run the following command, replacing `<YOUR_TOKEN>` with your deployment token:

```bash
docker run -d \
  --name aegis-agent \
  -e DEPLOYMENT_TOKEN="<YOUR_TOKEN>" \
  -e GATEWAY_URL="https://api.aegis.ai" \
  ghcr.io/aegis-ai/aegis-agent:latest
```

## Verification

Once the agent is running, you should see new telemetry streams appearing in your Dashboard under the "Infrastructure" tab.

- **Status**: Connected
- **Heartbeat**: < 1 min

## Token Security

> [!IMPORTANT]
> The `DEPLOYMENT_TOKEN` is strictly confidential. It allows a probe to register itself in your organization. If you believe your token has been compromised, rotate or revoke it immediately from the Dashboard.
