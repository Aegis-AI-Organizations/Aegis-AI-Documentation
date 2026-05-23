# Dashboard Architecture

The Aegis Dashboard is a React/Vite application used by customer operators and Aegis administrators. It consumes the Gateway REST and SSE APIs and keeps all business decisions on the backend.

## Main Areas

| Area               | Purpose                                                      |
| ------------------ | ------------------------------------------------------------ |
| Security dashboard | Agent status, recent scans, and scan launchpad               |
| Vulnerabilities    | Scan list, findings, evidences, and report download          |
| Users              | Organization and user administration                         |
| Billing            | Balance, usage, and ledger views                             |
| Audit              | Administrative action history                                |
| Settings           | Profile, password, email, avatar, and agent-token operations |

## Runtime Configuration

The frontend reads runtime values from `window.__RUNTIME_CONFIG__` and then Vite environment variables:

| Key                                | Purpose                                           |
| ---------------------------------- | ------------------------------------------------- |
| `API_GATEWAY_URL` / `VITE_API_URL` | Gateway base URL                                  |
| `DOCS_BASE_URL` / `VITE_DOCS_URL`  | Docusaurus base URL used by documentation buttons |

## Data Access

- API calls use the shared Axios client.
- Protected routes depend on the auth store and JWT refresh flow.
- Scan and team status updates use SSE where supported.
- Agent status uses `/api/agents/status` to power the empty-state and monitoring widgets.

## Design Constraint

The Dashboard should remain an operational console: dense, clear, and action-oriented. Backend permissions must be authoritative even if frontend controls are hidden.
