# Protobuf Contracts

`Aegis-AI-Proto` is the contract source for internal gRPC communication between the Gateway and Brain. Generated Go and Python stubs must stay synchronized with the `.proto` definitions.

## Contract Families

| Service                | Purpose                                                 |
| ---------------------- | ------------------------------------------------------- |
| `AuthService`          | Login, refresh, logout, profile, account activation     |
| `CompanyService`       | Companies, onboarding, users, token management          |
| `AgentService`         | Agent registration, status, upload links, agent listing |
| `ScanService`          | Scan lifecycle, reports, status streams                 |
| `VulnerabilityService` | Findings and evidences                                  |
| `BillingService`       | Balance, ledger, usage, token adjustment                |
| `PingService`          | Health and connectivity                                 |
| `InternalAuthService`  | Internal token verification                             |

## Compatibility Rule

Additive changes are preferred. Removing fields, renumbering fields, or changing message meaning requires coordinated updates in Gateway, Brain, tests, and OpenAPI documentation.
