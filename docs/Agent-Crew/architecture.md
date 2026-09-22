# Aegis AI Agent Crew Architecture

## Purpose

`Aegis-AI-Agent-Crew` provides the CrewAI-based pentest orchestration image for Aegis. The image must run inside the Aegis Kubernetes cluster and coordinate three local Ollama-backed agents: `Planner`, `Guider`, and `Executor`.

The service is not the platform orchestrator. `Aegis-AI-Brain` remains responsible for scan workflows through Temporal. `Aegis-AI-Worker-Deployer` remains responsible for sandbox deployment and cleanup. Agent Crew is a specialized Temporal worker that Brain calls during the pentest phase.

## V1 Deployment Goal

The repository must publish a Docker image that can be deployed by Aegis. The image supports two modes:

- `CREWAI_MODE=worker`: connect to Temporal and process `run_crew_pentest` activities from `CREWAI_TASK_QUEUE`.
- `CREWAI_MODE=cli`: keep the existing local debug behavior and run `src/main.py` directly.

The worker mode is the production path for Aegis. The CLI mode is retained for local troubleshooting and model prompt iteration.

## Container Design

The image is based on Python 3.12 slim and contains only runtime dependencies from `requirements.txt` plus the `src/` application code.

Container requirements:

- Run as a non-root user.
- Use unbuffered Python logs.
- Read configuration from environment variables only.
- Fail fast with clear logs when required Temporal or Ollama settings are missing.
- Avoid bundling Ollama models in the application image.

Ollama is deployed separately inside the Aegis cluster and exposed through an internal ClusterIP service.

## Runtime Configuration

Default Aegis deployment values:

```text
CREWAI_MODE=worker
TEMPORAL_HOST=aegis-temporal-mvp-frontend.aegis-system.svc.cluster.local:7233
TEMPORAL_NAMESPACE=default
CREWAI_TASK_QUEUE=CREWAI_TASK_QUEUE
PLANNER_PROVIDER=ollama
PLANNER_MODEL=llama3.1:8b
PLANNER_API_BASE=http://ollama-mvp.aegis-system.svc.cluster.local:11434
GUIDER_PROVIDER=ollama
GUIDER_MODEL=whiterabbitneo
GUIDER_API_BASE=http://ollama-mvp.aegis-system.svc.cluster.local:11434
EXECUTOR_PROVIDER=ollama
EXECUTOR_MODEL=deepseek-coder-v2
EXECUTOR_API_BASE=http://ollama-mvp.aegis-system.svc.cluster.local:11434
```

The image may still support OpenAI-compatible providers through the existing provider abstraction, but the MVP deployment uses in-cluster Ollama.

## Temporal Activity Contract

The worker exposes one activity:

```text
run_crew_pentest
```

Input:

```json
{
  "scan_id": "scan-id",
  "sandbox_endpoint": {
    "host": "portfolio-frontend.aegis-war-room-scan-id.svc.cluster.local",
    "port": 80,
    "scheme": "http"
  },
  "targets": [
    {
      "path": "/",
      "label": "portfolio frontend",
      "target_name": "portfolio-frontend",
      "criticality": 60,
      "score": 5998
    }
  ],
  "topology_summary": {
    "workloads": [],
    "services": [],
    "routes": []
  },
  "seed_contract": {},
  "constraints": {
    "mode": "non_destructive",
    "allow_patch_apply": false,
    "allow_pr_create": false
  }
}
```

Output:

```json
{
  "status": "COMPLETED",
  "summary": "CrewAI pentest completed.",
  "findings": [],
  "agent_trace": {
    "planner": "Planner reasoning summary.",
    "guider": "Guider risk assessment summary.",
    "executor": "Executor tool summary."
  },
  "final_report_markdown": "# CrewAI Pentest Report\n\nThe scan completed with evidence-backed findings and remediation guidance."
}
```

Brain maps `findings[]` into vulnerability rows and stores `final_report_markdown` plus `agent_trace` as report/debug artifacts.

## CrewAI Agent Responsibilities

`Planner` uses `llama3.1:8b` to analyze the target metadata, exposed paths, ports, and topology context, then produce an ordered plan.

`Guider` uses `whiterabbitneo` to convert the plan into risk-ranked test instructions and likely vulnerability hypotheses.

`Executor` uses `deepseek-coder-v2` to run allowed read-only tools, confirm findings, and produce ready-to-apply remediation patches as text or diffs.

## Safety Boundaries

V1 is non-destructive.

Allowed actions:

- HTTP `GET`, `HEAD`, and `OPTIONS` requests against sandbox endpoints.
- TCP reachability probes.
- Header and response analysis.
- Public configuration exposure checks.
- Patch text generation.

Forbidden actions:

- Mutating the sandbox.
- Executing commands inside target pods.
- Writing Kubernetes resources.
- Applying patches.
- Pushing Git changes.
- Creating pull requests.
- Running destructive exploit payloads.

The worker validates constraints before running the crew. If an input requests destructive behavior, the activity fails before model execution.

## Error Handling

- If Temporal cannot be reached, the container exits in worker mode.
- If Ollama cannot be reached, `run_crew_pentest` returns a controlled failure with a clear error code.
- If a model times out, the response identifies the failed agent.
- If model output is not valid, the worker attempts one local normalization pass before failing with a schema validation error.
- If the sandbox endpoint cannot be reached, the worker returns a reachability finding or partial failure depending on where the failure occurs.

## Testing Strategy

Minimum tests before deployment:

- `python -m compileall src` passes.
- Unit tests validate configuration parsing and mode selection.
- Unit tests validate activity input and output schemas.
- Unit tests verify non-destructive constraints are enforced.
- Docker image builds locally.
- CLI mode can run with configurable Ollama endpoint.
- Worker mode fails clearly if Temporal is unavailable.

Integration tests after Infra wiring:

- Deploy Ollama and Agent Crew in the MVP cluster.
- Launch a topology scan through Brain.
- Verify Brain calls `run_crew_pentest` on `CREWAI_TASK_QUEUE`.
- Verify Agent Crew logs show Pentest Orchestrator, Cybersecurity Expert, and Read-only Command Executor execution.
- Verify scan reaches `COMPLETED`.
- Verify findings/report artifacts are persisted.
