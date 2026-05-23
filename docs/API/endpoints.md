# API Gateway

The API Gateway is the public HTTP entry point for the Dashboard and agents. It handles CORS, rate limiting, JWT middleware, agent authentication middleware, and translation from REST/SSE to Brain gRPC services.

The full generated reference is available in **API Reference** from `openapi.yaml`.

## Public Routes

| Route                      | Method | Purpose                             |
| -------------------------- | ------ | ----------------------------------- |
| `/health`                  | `GET`  | Kubernetes-level health check       |
| `/api/health`              | `GET`  | API health check                    |
| `/api/`                    | `GET`  | Root metadata                       |
| `/api/auth/login`          | `POST` | Authenticate and set refresh cookie |
| `/api/auth/refresh`        | `POST` | Rotate access token                 |
| `/api/auth/setup-password` | `POST` | Activate invited account            |

## Authenticated User Routes

| Area        | Routes                                                                                                                     |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| Session     | `/api/auth/logout`, `/api/auth/me`                                                                                         |
| Profile     | `/api/users/me/profile`, `/api/users/me/email`, `/api/users/me/password`, `/api/users/me/profile/avatar`                   |
| Companies   | `/api/companies`, `/api/companies/onboard`, `/api/companies/me/agent-token/rotate`, `/api/companies/me/agent-token/revoke` |
| Agents      | `/api/agents`, `/api/agents/status`                                                                                        |
| Scans       | `/api/scans`, `/api/scans/{id}`, `/api/scans/{id}/vulnerabilities`, `/api/scans/{id}/report`                               |
| Streams     | `/api/scans/stream`, `/api/scans/{id}/stream`, `/api/admin/teams/stream`                                                   |
| Billing     | `/api/billing/balance`, `/api/billing/ledger`, `/api/billing/stats`                                                        |
| Storage     | `/api/storage/upload-url`                                                                                                  |
| Audit/Admin | `/api/admin/companies`, `/api/admin/users`, `/api/admin/audit-logs`, `/api/admin/companies/{id}/...`                       |

## Agent Routes

Agent routes are protected by agent-specific middleware:

| Route                         | Method | Credential       |
| ----------------------------- | ------ | ---------------- |
| `/api/agents/register`        | `POST` | Deployment token |
| `/api/agents/{id}/status`     | `POST` | Agent secret     |
| `/api/agents/{id}/upload-url` | `GET`  | Agent secret     |

## Operational Notes

- REST routes use the `/api` prefix behind the local Nginx proxy.
- SSE routes require a valid user JWT.
- Agent registration requires the `ag_...` deployment token in both the `Authorization` header and JSON body.
- Business logic remains in Brain services; the Gateway should stay thin and policy-focused.
