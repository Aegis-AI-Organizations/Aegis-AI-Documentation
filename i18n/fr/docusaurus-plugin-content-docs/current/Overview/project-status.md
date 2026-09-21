# Statut du projet

Aegis AI est un **EIP (Epitech Innovative Project)** — `AEGIS-CORE-2026`. Il est
livré comme un MVP tournant sur Kubernetes. Cette page résume ce qui est
implémenté ; les pages par service portent le détail.

## Statut des fonctionnalités

| Domaine                    | Statut          | Notes                                                                  |
| -------------------------- | --------------- | -------------------------------------------------------------------- |
| Onboarding client          | Implémenté      | Création atomique entreprise + owner + token de déploiement dans le Brain. |
| Enregistrement agent       | Implémenté      | Deux phases : token de déploiement → secret agent ; seuls les hashs stockés. |
| Heartbeat / statut agent   | Implémenté      | `last_seen` alimente le résumé actifs/inactifs du Dashboard.          |
| Collecte de topologie      | Implémenté      | Upload par URL présignée ; normalisation Worker Ingest ; projection Neo4j. |
| Scan de sécurité           | En cours        | Orchestration Temporal fonctionnelle ; sandbox jumeau numérique ; rapports PDF générés. |
| Agent Crew (CrewAI)        | En cours        | Activité `run_crew_pentest` ; V1 non destructive ; Ollama in-cluster.  |
| Vulnérabilités & preuves   | Implémenté      | Persistées avec loot en JSONB ; reliées dans Neo4j.                   |
| Remédiation (Fixer)        | En cours        | Génération de propositions ; style PR, non destructif.                |
| Facturation (ledger tokens)| Implémenté      | Solde et ledger par entreprise.                                       |
| Mises à jour temps réel (SSE) | Implémenté   | Flux de scan et flux d'équipe admin.                                  |
| Multi-tenancy & RBAC       | Implémenté      | Cloisonnement `company_id` ; modèle à 9 rôles synchronisé Brain ↔ Gateway. |
| mTLS interne               | Partiel         | Entrées de certificat Gateway ↔ Brain câblées ; validation stricte en production en cours de déploiement. |
| Déploiement GitOps         | Implémenté      | App-of-Apps Argo CD pour l'environnement `mvp`.                       |
| Autoscaling (KEDA)         | Prévu/partiel   | Charges candidates identifiées : workers pentest, ingest, deployer, fixer. |

## Priorités connues

1. **Migrations de schéma** — passer de `Base.metadata.create_all` à Alembic pour
   une évolution de schéma sûre (Alembic est déjà présent dans le dépôt Brain).
2. **mTLS complet** — imposer la validation stricte des certificats client pour
   tout le trafic inter-services en production.
3. **Tests d'intégration de bout en bout** — simuler un cycle de vie d'agent
   complet, de l'enregistrement à l'upload du rapport.
4. **Monitoring** — Prometheus/Grafana pour la latence gRPC interne et la santé
   des workers.

## Environnements

| Environnement | Objectif                     | Point d'entrée                                    |
| ------------- | ---------------------------- | ----------------------------------------------- |
| `local-dev`   | Stack Docker Compose         | `Aegis-AI-Infra/local-dev/docker compose up`     |
| `mvp`         | MVP Kubernetes via Argo CD   | `Aegis-AI-Infra/scripts/setup-env.sh mvp`        |

> Le statut reflète la phase de durcissement de la plateforme documentée dans
> `Aegis-AI-Documentation/AUDIT_TECHNIQUE.md`. Les pages par service font
> autorité pour le détail d'implémentation.
