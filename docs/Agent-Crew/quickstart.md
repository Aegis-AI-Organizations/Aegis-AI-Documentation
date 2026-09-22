---
sidebar_position: 2
title: Quickstart
---

# 🚀 Quickstart: Agent Crew

The Agent Crew ships as a single Docker image with two entrypoints.

| Mode                   | Entrypoint         | Purpose                                                              |
| ---------------------- | ------------------ | --------------------------------------------------------------- |
| `CREWAI_MODE=worker`   | `src/worker.py`    | Production. Connects to Temporal and processes `run_crew_pentest` activities from `CREWAI_TASK_QUEUE`. |
| `CREWAI_MODE=cli`      | `src/main.py`      | Local debug. Runs the crew directly for prompt / model iteration. |

---

## Prerequisites

- Python 3.10+ (3.12 slim in the container).
- Reachable Temporal frontend (worker mode).
- Reachable Ollama serving `llama3.1:8b` (Pentest Orchestrator), `whiterabbitneo`
  (Cybersecurity Expert), `deepseek-coder-v2` (Read-only Command Executor) — or
  an OpenAI-compatible provider. The `PLANNER_*` / `GUIDER_*` / `EXECUTOR_*`
  environment variable prefixes map to these three roles.

---

## CLI mode (local)

```bash
pip install -r requirements.txt
cp .env.example .env    # set Ollama host / API keys

python src/main.py
```

A markdown summary is written to `security_report_findings.md`.

## Worker mode (local)

```bash
CREWAI_MODE=worker python src/worker.py
```

The worker connects to `TEMPORAL_HOST`, registers the `run_crew_pentest`
activity, and listens on `CREWAI_TASK_QUEUE`.

## Docker

Build:

```bash
docker build -t aegis-ai-agent-crew:test .
```

Run CLI mode from the image:

```bash
docker run --rm -e CREWAI_MODE=cli aegis-ai-agent-crew:test
```

Run worker mode with explicit endpoints:

```bash
docker run --rm \
  -e CREWAI_MODE=worker \
  -e TEMPORAL_HOST=aegis-temporal-mvp-frontend.aegis-system.svc.cluster.local:7233 \
  -e TEMPORAL_NAMESPACE=default \
  -e CREWAI_TASK_QUEUE=CREWAI_TASK_QUEUE \
  -e PLANNER_API_BASE=http://ollama-mvp.aegis-system.svc.cluster.local:11434 \
  -e GUIDER_API_BASE=http://ollama-mvp.aegis-system.svc.cluster.local:11434 \
  -e EXECUTOR_API_BASE=http://ollama-mvp.aegis-system.svc.cluster.local:11434 \
  aegis-ai-agent-crew:test
```

Ollama is deployed separately in-cluster (ClusterIP); models are never bundled in
the application image.

---

## Verify

```bash
python -m compileall src
pytest -q
```

- Worker logs show a Temporal connection and a registered `run_crew_pentest`
  activity.
- A topology scan launched through the Brain produces log lines from the
  **Pentest Orchestrator**, **Cybersecurity Expert**, and **Read-only Command
  Executor**.
- The scan reaches `COMPLETED`; findings and the report artifact are persisted by
  the Brain.

If Temporal is unreachable the container exits (worker mode). If Ollama is
unreachable, `run_crew_pentest` returns a controlled failure with a clear error
code. See [architecture.md](./architecture.md) for the full error matrix.

---

## Production deployment

The image is published to `ghcr.io/aegis-ai-organizations/aegis-ai-agent-crew`
as a **public** GHCR package, so fresh clusters can pull it without relying on
node-local image cache or `imagePullSecrets`.

- **Pin an immutable release tag** (e.g. `v2.0.8`) in production Kubernetes
  manifests. Never deploy `latest`.
- Runtime defaults: `CREWAI_MODE=worker`, `CREWAI_TASK_QUEUE=CREWAI_TASK_QUEUE`,
  `TEMPORAL_HOST=aegis-temporal-mvp-frontend.aegis-system.svc.cluster.local:7233`.

Verify a cluster deployment:

```bash
kubectl get deployment crewai-worker-mvp -n aegis-system -o wide
kubectl logs -n aegis-system deployment/crewai-worker-mvp
```

Successful startup logs include `Agent Crew worker started`.

### Rollback

Change the pinned image tag in `Aegis-AI-Infra` at
`kubernetes/envs/mvp/crewai-worker/values.yaml`, then let Argo CD sync the
previous release tag.

---

*Aegis AI Multi-Agent Orchestration — 2026*
