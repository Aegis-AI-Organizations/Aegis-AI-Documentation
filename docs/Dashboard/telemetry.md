# Dashboard Telemetry

The Dashboard currently focuses on operational API state instead of client-side analytics.

## User-Visible Signals

| Signal                          | Source                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------- |
| Agent counts and last heartbeat | `GET /api/agents/status`                                                         |
| Scan list and statuses          | `GET /api/scans`, scan SSE streams                                               |
| Vulnerability details           | `GET /api/scans/{id}/vulnerabilities`, `GET /api/vulnerabilities/{id}/evidences` |
| Billing balance and ledger      | Billing API routes                                                               |
| Audit activity                  | Admin audit route                                                                |

## Frontend Logging

Development logging is limited to connection lifecycle and error diagnostics. Sensitive values such as JWTs, refresh cookies, deployment tokens, and agent secrets must never be logged.

## Recommended Future Instrumentation

- route-level page views without secrets;
- API error counters by route family;
- SSE connection health;
- frontend build version and runtime config visibility;
- user action audit only through backend audit logs.
