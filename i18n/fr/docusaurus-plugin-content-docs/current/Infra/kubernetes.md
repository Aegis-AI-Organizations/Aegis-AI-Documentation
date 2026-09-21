# Déploiement Kubernetes

Le déploiement Kubernetes utilise des manifests spécifiques à l'environnement et
un chart `aegis-service` réutilisable.

## Disposition du dépôt

```text
kubernetes/
  bootstrap/
  charts/aegis-service/
  envs/mvp/
```

## Opérations courantes

```bash
kubectl get applications -n argocd
kubectl get pods -n aegis-system
kubectl logs -n aegis-system deploy/aegis-api-gateway
```

## Configuration des services

Chaque dossier de service contient un `application.yaml` Argo CD et un fichier
`values.yaml`. Gardez la configuration runtime dans les values et les secrets
Kubernetes ; n'intégrez pas de secrets dans Git.

## Contrôles de readiness

- La Gateway `/health` renvoie un succès.
- Le Dashboard sert les assets statiques.
- L'endpoint gRPC du Brain est joignable depuis la Gateway.
- Redis, Neo4j, Temporal et le stockage objet sont sains.
- Les workers peuvent démarrer et reporter leur statut.
