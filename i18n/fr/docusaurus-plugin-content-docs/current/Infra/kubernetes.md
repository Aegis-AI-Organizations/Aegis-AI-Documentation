# Déploiement Kubernetes

Le déploiement Kubernetes utilise des manifests par environnement et le chart réutilisable `aegis-service`.

## Layout

```text
kubernetes/
  bootstrap/
  charts/aegis-service/
  envs/mvp/
```

## Commandes utiles

```bash
kubectl get applications -n argocd
kubectl get pods -n aegis-system
kubectl logs -n aegis-system deploy/aegis-api-gateway
```

## Readiness

- Gateway `/health` répond.
- Dashboard sert les assets.
- Brain gRPC est joignable depuis Gateway.
- Redis, Neo4j, Temporal et stockage objet sont sains.
- Les workers démarrent et remontent leur statut.
