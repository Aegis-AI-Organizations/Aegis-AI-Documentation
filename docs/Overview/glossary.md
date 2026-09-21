# Glossary

| Term                     | Definition                                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| **Agent**                | Rust probe installed on customer infrastructure. Registers, heartbeats, discovers topology, uploads payloads. |
| **Agent Crew**           | CrewAI-based Temporal worker that coordinates the `Planner`, `Guider`, and `Executor` LLM agents.             |
| **Agent secret**         | Per-agent operational credential returned once at registration; bcrypt-hashed server-side.                    |
| **Attack path**          | A chain of relationships in the Neo4j graph from an entry point to a sensitive asset.                         |
| **Brain**                | Python core service: gRPC business logic, Temporal orchestration, persistence, reporting.                     |
| **Company / Tenant**     | A customer organization. The isolation unit; identified by `company_id`.                                      |
| **Deployment token**     | One-time, per-company credential (`ag_<43+ URL-safe chars>`) used only for first agent registration.          |
| **Digital twin**         | An isolated sandbox replica of (part of) the customer topology, built per scan. All offensive traffic targets it. |
| **Evidence**             | Technical proof attached to a vulnerability (`payload_used`, `loot_data` JSONB).                              |
| **Finding**              | A candidate or confirmed vulnerability produced by a worker or the Agent Crew.                                |
| **Fixer Worker**         | Go worker that turns confirmed findings into remediation proposals (PR-style, non-destructive).               |
| **Gateway**              | Go/Gin service; the only public REST/SSE entry point. Translates REST to internal gRPC.                       |
| **GitOps / App-of-Apps** | Deployment model where Argo CD syncs the cluster from Git; a root Argo CD application manages child apps.      |
| **Heartbeat**            | Periodic `POST /api/agents/{id}/status` call that keeps an agent shown as active.                             |
| **Ingest Worker**        | Rust worker that normalizes agent telemetry batches into backend records.                                     |
| **KEDA**                 | Event-driven autoscaler used to scale worker deployments on queue / workflow demand.                          |
| **Ledger**               | Append-only record of token debits/credits per company; backs balance and usage views.                       |
| **Loot**                 | Data extracted from a target during exploitation, stored as sanitized evidence.                               |
| **mTLS**                 | Mutual TLS. Both client and server present and validate certificates (Gateway ↔ Brain).                       |
| **Neo4j graph**          | Graph store of hosts, containers, services, images, namespaces, scans, vulnerabilities and their edges.       |
| **Non-destructive mode** | Constraint set (`mode: non_destructive`) forbidding sandbox mutation, command execution, patch apply, PR creation. |
| **Ollama**               | In-cluster LLM runtime serving the Agent Crew models; exposed via ClusterIP.                                  |
| **Pentest Worker**       | Python worker running deterministic vulnerability checks (SQLi, XSS, …) and capturing evidence.               |
| **Presigned URL**        | Short-lived storage URL issued by the Gateway so the agent can `PUT` payloads without permanent credentials.  |
| **Proto**                | The `Aegis-AI-Proto` repository: the single source of truth for gRPC contracts.                              |
| **Refresh token**        | HTTP-only cookie used to rotate the JWT access token; revocable server-side.                                  |
| **Saga / Workflow**      | A durable Temporal workflow; survives pod restarts and network partitions.                                    |
| **Sandbox / War-room**   | The ephemeral Kubernetes namespace (`aegis-war-room-<scan-id>` / `sandbox-*`) hosting a digital twin.         |
| **Scan**                 | One penetration-testing execution against a digital twin. Has status, findings, evidence, and a PDF report.   |
| **SSE**                  | Server-Sent Events. One-way stream from Gateway to Dashboard for live scan / team updates.                    |
| **Temporal**             | Workflow engine that makes scan orchestration durable and retriable.                                          |
| **Token (billing)**      | Unit of platform usage metered against a company balance.                                                     |
| **Topology**             | The agent-discovered inventory of hosts, containers, services, and Kubernetes objects.                        |
| **`vuln-app`**           | A deliberately vulnerable application used as digital-twin content for testing the pentest pipeline.          |
