# Agent Telemetry

The Aegis Agent collects local topology and runtime signals, then sends them to the platform through Gateway-controlled upload URLs.

## Collected Signals

| Signal               | Source                         | Purpose                             |
| -------------------- | ------------------------------ | ----------------------------------- |
| Host metadata        | OS and process inspection      | Identify the node running the agent |
| Container inventory  | Docker runtime when available  | Map running workloads               |
| Kubernetes inventory | Kubernetes API when configured | Map pods, services, and namespaces  |
| Heartbeat            | Agent runtime loop             | Keep Dashboard status current       |
| Health state         | Local health server            | Support liveness/readiness checks   |

## Delivery Model

1. The agent registers and stores `agent_id` plus `agent_secret`.
2. It sends `RUNNING` heartbeats to `/api/agents/{id}/status`.
3. It requests a presigned upload URL from `/api/agents/{id}/upload-url`.
4. It uploads topology payloads with `PUT` to object storage.

## Privacy and Safety

- Deployment tokens are not included in telemetry payloads.
- Agent secrets are used only in `Authorization` headers.
- Payload uploads use temporary presigned URLs instead of permanent storage credentials.
- The local health API binds to localhost by default.
