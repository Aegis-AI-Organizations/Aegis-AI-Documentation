# Repositories

Aegis AI is a multi-repository system under the `Aegis-AI-Organizations` GitHub
organization. Each repository owns one concern and publishes its own `docs/`
folder, which this portal aggregates at build time (Docs-as-Code).

| Repository                | Language        | Deployable  | Responsibility                                                                 | Portal section |
| ------------------------- | --------------- | ----------- | ---------------------------------------------------------------------------- | -------------- |
| `Aegis-AI-Proto`          | Protobuf / buf  | Library     | gRPC contracts; generates Go, Python and Rust stubs.                          | [Proto](../Proto/architecture.md) |
| `Aegis-AI-Api-Gateway`    | Go              | Yes         | Public REST/SSE edge; JWT and agent auth; REST↔gRPC translation.              | [API Gateway](../API/endpoints.md) |
| `Aegis-AI-Brain`          | Python          | Yes         | Core business logic, Temporal orchestration, persistence, PDF reports.        | [Brain](../Brain/workflows.md) |
| `Aegis-AI-Dashboard`      | TypeScript/React| Yes         | Operator console (agents, scans, vulnerabilities, billing, admin).           | [Dashboard](../Dashboard/architecture.md) |
| `Aegis-AI-Landing`        | TypeScript/Next | Yes         | Public marketing and trust site.                                             | [Landing Page](../Landing-Page/architecture.md) |
| `Aegis-AI-Agent`          | Rust            | Yes (customer) | Customer-side probe: register, heartbeat, topology discovery, upload.     | [Agent](../Agent/architecture.md) |
| `Aegis-AI-Agent-Crew`     | Python / CrewAI | Yes         | Temporal worker coordinating Planner/Guider/Executor LLM agents (Ollama).     | [Agent Crew](../Agent-Crew/architecture.md) |
| `Aegis-AI-Worker-Pentest` | Python          | Yes         | Deterministic vulnerability checks and evidence capture.                     | [Worker · Pentest](../Worker-Pentest/architecture.md) |
| `Aegis-AI-Worker-Deployer`| Go              | Yes         | Builds and tears down the digital-twin sandbox.                             | [Worker · Deployer](../Worker-Deployer/architecture.md) |
| `Aegis-AI-Worker-Ingest`  | Rust            | Yes         | Normalizes agent telemetry into backend records.                            | [Worker · Ingest](../Worker-Ingest/architecture.md) |
| `Aegis-AI-Worker-Fixer`   | Go              | Yes         | Turns confirmed findings into remediation proposals.                        | [Worker · Fixer](../Worker-Fixer/architecture.md) |
| `Aegis-AI-Infra`          | YAML / Helm     | GitOps repo | Kubernetes manifests, Argo CD App-of-Apps, network policies, cert-manager, KEDA. | [Infrastructure](../Infra/architecture.md) |
| `Aegis-AI-Documentation`  | TypeScript/Docusaurus | Yes   | This portal. Aggregates remote `docs/` and the generated OpenAPI reference.  | — |
| `vuln-app`                | Python          | Test target | Deliberately vulnerable app used as digital-twin content for scans.         | — |

## Language distribution

| Language   | Repositories                                                    | Chosen for                        |
| ---------- | ------------------------------------------------------------- | -------------------------------- |
| Go         | API Gateway, Worker-Deployer, Worker-Fixer                    | concurrency, low-latency edge     |
| Python     | Brain, Worker-Pentest, Agent-Crew                             | orchestration, security tooling, LLM ecosystem |
| Rust       | Agent, Worker-Ingest                                         | small footprint, reliability on customer hosts |
| TypeScript | Dashboard, Landing Page, Documentation                       | web UI                            |
| Protobuf   | Proto                                                        | typed cross-language contracts    |

## Conventions shared by all repositories

- Each service repo carries a `docs/en/` and `docs/fr/` folder; the Documentation
  portal pulls selected files from `main` via `docusaurus-plugin-remote-content`.
- Each deployable repo ships a `Dockerfile` and is deployed by Argo CD from
  `Aegis-AI-Infra/kubernetes/envs/mvp/`.
- gRPC-facing repos regenerate stubs from `Aegis-AI-Proto`; contract changes are
  additive by default (see [Proto · Architecture](../Proto/architecture.md)).
- CI runs on isolated GitHub Actions runners with narrowly scoped tokens.
