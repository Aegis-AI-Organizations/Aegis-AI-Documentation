# Agent Crew Quickstart

The Agent Crew ships as a single Docker image with two modes:

| Mode                   | Purpose                                                              |
| ---------------------- | ------------------------------------------------------------------ |
| `CREWAI_MODE=worker`   | Production path. Connects to Temporal and processes `run_crew_pentest` activities from `CREWAI_TASK_QUEUE`. |
| `CREWAI_MODE=cli`      | Local debug. Runs `src/main.py` directly for prompt/model iteration. |

## Prerequisites

- Python 3.10+ (3.12 slim in the container).
- Reachable Temporal frontend (worker mode).
- Reachable Ollama endpoint serving `llama3.1:8b`, `whiterabbitneo`, and
  `deepseek-coder-v2` (or an OpenAI-compatible provider).

## Run the CLI mode locally

```bash
pip install -r requirements.txt

export CREWAI_MODE=cli
export PLANNER_PROVIDER=ollama
export PLANNER_MODEL=llama3.1:8b
export PLANNER_API_BASE=http://localhost:11434
export GUIDER_PROVIDER=ollama
export GUIDER_MODEL=whiterabbitneo
export GUIDER_API_BASE=http://localhost:11434
export EXECUTOR_PROVIDER=ollama
export EXECUTOR_MODEL=deepseek-coder-v2
export EXECUTOR_API_BASE=http://localhost:11434

python src/main.py
```

## Run the worker mode (Aegis deployment)

```bash
docker run --rm \
  -e CREWAI_MODE=worker \
  -e TEMPORAL_HOST=aegis-temporal-mvp-frontend.aegis-system.svc.cluster.local:7233 \
  -e TEMPORAL_NAMESPACE=default \
  -e CREWAI_TASK_QUEUE=CREWAI_TASK_QUEUE \
  -e PLANNER_API_BASE=http://ollama-mvp.aegis-system.svc.cluster.local:11434 \
  -e GUIDER_API_BASE=http://ollama-mvp.aegis-system.svc.cluster.local:11434 \
  -e EXECUTOR_API_BASE=http://ollama-mvp.aegis-system.svc.cluster.local:11434 \
  ghcr.io/aegis-ai/aegis-agent-crew:latest
```

In the MVP cluster the image is deployed by Argo CD alongside an in-cluster Ollama
`ClusterIP` service. Models are never bundled in the application image.

## Verify

- Worker mode logs show a Temporal connection and a registered `run_crew_pentest`
  activity.
- Launching a topology scan through Brain produces `Planner`, `Guider`, and
  `Executor` log lines.
- The scan reaches `COMPLETED` and findings / report artifacts are persisted by
  Brain.

If Temporal is unreachable, the container exits in worker mode. If Ollama is
unreachable, `run_crew_pentest` returns a controlled failure with a clear error
code. See [Architecture · Error Handling](./architecture.md) for the full matrix.
