# Démarrage infrastructure

L'infrastructure Aegis s'appuie sur Kubernetes, des applications Argo CD, des services partagés et des valeurs Helm par service.

## Développement local

```bash
cd Aegis-AI-Infra/local-dev
docker compose up
```

## Layout MVP Kubernetes

```text
kubernetes/envs/mvp/
```

Groupes principaux : `api-gateway`, `brain`, `dashboard`, `pentest-worker`, `ingest-worker`, Redis, Neo4j, ClickHouse, Temporal, cert-manager et cloudflared.

## Checklist déploiement

1. Configurer secrets et valeurs d'environnement.
2. Installer les contrôleurs d'infrastructure.
3. Appliquer l'application racine Argo CD.
4. Vérifier la santé des services.
5. Connecter le premier agent Aegis.
