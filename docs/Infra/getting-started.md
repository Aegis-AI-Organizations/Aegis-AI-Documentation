# Infrastructure Getting Started

Aegis infrastructure is deployed around Kubernetes, Argo CD application manifests, shared platform services, and per-service Helm values.

## Local Development

Use the local development stack when testing the Gateway, Brain, Dashboard, Redis, MinIO, and supporting services together:

```bash
cd Aegis-AI-Infra/local-dev
docker compose up
```

## Kubernetes MVP Layout

The MVP manifests live under:

```text
kubernetes/envs/mvp/
```

Main application groups:

- `api-gateway`;
- `brain`;
- `dashboard`;
- `pentest-worker`;
- `ingest-worker`;
- shared infrastructure such as Redis, Neo4j, ClickHouse, Temporal, cert-manager, and cloudflared.

## Deployment Checklist

1. Configure secrets and environment values.
2. Install infrastructure controllers.
3. Apply root Argo CD application.
4. Verify service health.
5. Connect the first Aegis Agent from the Dashboard guide.
