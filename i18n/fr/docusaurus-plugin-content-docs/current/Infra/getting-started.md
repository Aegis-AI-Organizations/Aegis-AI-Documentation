# Démarrage avec l'infrastructure

L'infrastructure Aegis est déployée autour de Kubernetes, de manifests
d'application Argo CD, de services de plateforme partagés et de valeurs Helm par
service.

## Développement local

Utilisez la stack de développement local pour tester ensemble la Gateway, le
Brain, le Dashboard, Redis, MinIO et les services associés :

```bash
cd Aegis-AI-Infra/local-dev
docker compose up
```

## Disposition du MVP Kubernetes

Les manifests du MVP se trouvent sous :

```text
kubernetes/envs/mvp/
```

Groupes d'applications principaux :

- `api-gateway` ;
- `brain` ;
- `dashboard` ;
- `pentest-worker` ;
- `ingest-worker` ;
- l'infrastructure partagée telle que Redis, Neo4j, ClickHouse, Temporal,
  cert-manager et cloudflared.

## Checklist de déploiement

1. Configurer les secrets et les valeurs d'environnement.
2. Installer les contrôleurs d'infrastructure.
3. Appliquer l'application racine Argo CD.
4. Vérifier la santé des services.
5. Connecter le premier Agent Aegis depuis le guide du Dashboard.
