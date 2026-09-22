# Project Status

Aegis AI is an **Epitech Innovative Project (EIP)** — `AEGIS-CORE-2026`. It is
delivered as an MVP running on Kubernetes. This page summarizes what is
implemented; per-service pages carry the detail.

## Feature status

| Area                       | Status          | Notes                                                                                     |
| -------------------------- | --------------- | ----------------------------------------------------------------------------------------- |
| Client onboarding          | Implemented     | Atomic company + owner + deployment-token creation in Brain.                              |
| Agent registration         | Implemented     | Two-phase: deployment token → agent secret; hashes only stored.                           |
| Agent heartbeat / status   | Implemented     | `last_seen` drives the Dashboard active/inactive summary.                                 |
| Topology collection        | Implemented     | Presigned-URL upload; Ingest Worker normalization; Neo4j projection.                      |
| Security scan              | In progress     | Temporal orchestration working; digital-twin sandbox; PDF reports generated.              |
| Agent Crew (CrewAI)        | In progress     | `run_crew_pentest` activity; non-destructive V1; deployed in the `mvp` cluster with a pinned release image and in-cluster Ollama. |
| Company profile self-service | Implemented   | Owner/admin edit org name, avatar, size, and type from the Dashboard (`GET`/`PUT /api/companies/me`). |
| Vulnerabilities & evidence | Implemented     | Persisted with loot in JSONB; linked in Neo4j.                                            |
| Remediation (Fixer)        | In progress     | Proposal generation; PR-style, non-destructive.                                           |
| Billing (token ledger)     | Implemented     | Per-company balance and ledger.                                                           |
| Real-time updates (SSE)    | Implemented     | Scan streams and admin team streams.                                                      |
| Multi-tenancy & RBAC       | Implemented     | `company_id` scoping; 9-role model synchronized Brain ↔ Gateway.                         |
| Internal mTLS              | Partial         | Gateway ↔ Brain certificate inputs wired; strict production validation being rolled out. |
| GitOps deployment          | Implemented     | Argo CD App-of-Apps for the `mvp` environment.                                            |
| Autoscaling (KEDA)         | Planned/partial | Candidate workloads identified: pentest, ingest, deployer, fixer workers.                 |

## Known priorities

1. **Schema migrations** — move from `Base.metadata.create_all` to Alembic for
   safe schema evolution (Alembic is already present in the Brain repo).
2. **Full mTLS** — enforce strict client-certificate validation for all
   inter-service traffic in production.
3. **End-to-end integration tests** — simulate a complete agent lifecycle from
   registration to report upload.
4. **Monitoring** — Prometheus/Grafana for internal gRPC latency and worker
   health.

## Environments

| Environment | Purpose                    | Entry point                                  |
| ----------- | -------------------------- | -------------------------------------------- |
| `local-dev` | Docker Compose stack       | `Aegis-AI-Infra/local-dev/docker compose up` |
| `mvp`       | Kubernetes MVP via Argo CD | `Aegis-AI-Infra/scripts/setup-env.sh mvp`    |

> Status reflects the platform hardening phase documented in
> `Aegis-AI-Documentation/AUDIT_TECHNIQUE.md`. Treat per-service pages as
> authoritative for implementation detail.
