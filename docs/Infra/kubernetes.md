# Kubernetes Deployment

The Kubernetes deployment uses environment-specific manifests and a reusable `aegis-service` chart.

## Repository Layout

```text
kubernetes/
  bootstrap/
  charts/aegis-service/
  envs/mvp/
```

## Common Operations

```bash
kubectl get applications -n argocd
kubectl get pods -n aegis-system
kubectl logs -n aegis-system deploy/aegis-api-gateway
```

## Service Configuration

Each service folder contains an Argo CD `application.yaml` and a `values.yaml` file. Keep runtime configuration in values and Kubernetes secrets; avoid embedding secrets in Git.

## Readiness Checks

- Gateway `/health` returns success.
- Dashboard serves static assets.
- Brain gRPC endpoint is reachable from Gateway.
- Redis, Neo4j, Temporal, and object storage are healthy.
- Workers can start and report status.
