# Agent API

This page documents the Gateway endpoints used by Aegis agents.

## Authentication

Registration uses the company deployment token:

```http
Authorization: Bearer ag_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg
```

After registration, the Gateway returns an `agent_secret`. Operational routes use that secret:

```http
Authorization: Bearer <AGENT_SECRET>
```

## Register an Agent

```http
POST /api/agents/register
```

Request body:

| Field   | Type     | Required | Description               |
| ------- | -------- | -------- | ------------------------- |
| `token` | `string` | Yes      | Company deployment token. |
| `name`  | `string` | No       | Friendly agent name.      |

Example:

```bash
curl -X POST https://api.aegis-ai.fr/api/agents/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ag_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg" \
  -d '{
    "token": "ag_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg",
    "name": "prod-node-01"
  }'
```

Response:

```json
{
  "agent_id": "dc91b2f3-905e-494f-b6ce-3fbfef8fc4c2",
  "agent_secret": "secret-value"
}
```

## Send Heartbeat Status

```http
POST /api/agents/{agent_id}/status
```

Request body:

```json
{
  "status": "RUNNING"
}
```

Supported status values are `IDLE`, `RUNNING`, `ERROR`, and `OFFLINE`.

## Request an Upload URL

```http
GET /api/agents/{agent_id}/upload-url?filename=topology.json
```

Response:

```json
{
  "url": "https://storage.example/presigned-url",
  "method": "PUT"
}
```

## Dashboard Agent Status

Dashboard users can read aggregated agent status with:

```http
GET /api/agents/status
```

Response:

```json
{
  "total_agents": 1,
  "active_agents": 1,
  "inactive_agents": 0,
  "last_seen": "2026-05-23T10:00:00Z"
}
```
