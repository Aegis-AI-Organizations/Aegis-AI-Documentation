# Quickstart | Aegis Agent

The Aegis Agent is a lightweight Rust probe installed inside a customer infrastructure. It registers through the API Gateway, stores its own operational secret locally, sends heartbeats, and uploads topology payloads through presigned storage URLs.

## Prerequisites

1. Owner or admin access to the Aegis Dashboard.
2. A valid deployment token in the format `ag_<43+ URL-safe chars>`.
3. Outbound HTTPS access from the host to the Gateway.

## Run with Docker

```bash
docker run -d \
  --name aegis-agent \
  --restart unless-stopped \
  --read-only \
  --cap-drop=ALL \
  -e GATEWAY_URL="https://api.aegis-ai.fr" \
  -e DEPLOYMENT_TOKEN="<YOUR_DEPLOYMENT_TOKEN>" \
  -e AGENT_NAME="$(hostname)-aegis-agent" \
  -v aegis-agent-state:/var/lib/aegis-agent \
  ghcr.io/aegis-ai/aegis-agent:latest
```

The deployment token is only used for the first registration. The Gateway returns an `agent_id` and an `agent_secret`; the agent then uses that secret for heartbeats and upload URLs.

## Verify the Agent

In the Dashboard, open the security dashboard and check the agent status panel:

- `Agents deployed` should increase after registration.
- `Active` should increase after the first heartbeat.
- `Last seen` should update regularly.

For a local health check, query the agent health endpoint:

```bash
curl http://127.0.0.1:8081/health
```

## Local Development

Use HTTP only for local environments:

```bash
export GATEWAY_URL="http://localhost:8080"
export DEPLOYMENT_TOKEN="ag_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg"
export AGENT_NAME="local-agent-01"
export AGENT_ALLOW_HTTP="true"
cargo run
```

## Token Security

The deployment token is secret and is displayed only once after account activation or token rotation. If it leaks, revoke or rotate it from the Dashboard settings before deploying new agents.
