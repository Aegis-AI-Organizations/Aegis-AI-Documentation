---
sidebar_position: 2
title: Quickstart
---

# 🚀 Quickstart : Agent Crew

L'Agent Crew est livré comme une image Docker unique avec deux points d'entrée.

| Mode                   | Point d'entrée      | Objectif                                                            |
| ---------------------- | ------------------- | ------------------------------------------------------------- |
| `CREWAI_MODE=worker`   | `src/worker.py`     | Production. Se connecte à Temporal et traite les activités `run_crew_pentest` depuis `CREWAI_TASK_QUEUE`. |
| `CREWAI_MODE=cli`      | `src/main.py`       | Debug local. Exécute la crew directement pour itérer sur les prompts / modèles. |

---

## Prérequis

- Python 3.10+ (3.12 slim dans le conteneur).
- Frontend Temporal joignable (mode worker).
- Ollama joignable servant `llama3.1:8b` (Pentest Orchestrator), `whiterabbitneo`
  (Cybersecurity Expert), `deepseek-coder-v2` (Read-only Command Executor) — ou un
  provider compatible OpenAI. Les préfixes de variables d'environnement
  `PLANNER_*` / `GUIDER_*` / `EXECUTOR_*` correspondent à ces trois rôles.

---

## Mode CLI (local)

```bash
pip install -r requirements.txt
cp .env.example .env    # définir l'hôte Ollama / les clés d'API

python src/main.py
```

Un résumé markdown est écrit dans `security_report_findings.md`.

## Mode worker (local)

```bash
CREWAI_MODE=worker python src/worker.py
```

Le worker se connecte à `TEMPORAL_HOST`, enregistre l'activité
`run_crew_pentest` et écoute sur `CREWAI_TASK_QUEUE`.

## Docker

Build :

```bash
docker build -t aegis-ai-agent-crew:test .
```

Lancer le mode CLI depuis l'image :

```bash
docker run --rm -e CREWAI_MODE=cli aegis-ai-agent-crew:test
```

Lancer le mode worker avec des endpoints explicites :

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

Ollama est déployé séparément dans le cluster (ClusterIP) ; les modèles ne sont
jamais embarqués dans l'image applicative.

---

## Vérifier

```bash
python -m compileall src
pytest -q
```

- Les logs du worker montrent une connexion Temporal et une activité
  `run_crew_pentest` enregistrée.
- Un scan de topologie lancé via le Brain produit des lignes de log du
  **Pentest Orchestrator**, du **Cybersecurity Expert** et du **Read-only
  Command Executor**.
- Le scan atteint `COMPLETED` ; les findings et l'artefact de rapport sont
  persistés par le Brain.

Si Temporal est injoignable, le conteneur quitte (mode worker). Si Ollama est
injoignable, `run_crew_pentest` retourne un échec contrôlé avec un code d'erreur
clair. Voir [architecture.md](./architecture.md) pour la matrice d'erreurs
complète.

---

## Déploiement en production

L'image est publiée sur `ghcr.io/aegis-ai-organizations/aegis-ai-agent-crew`
comme paquet GHCR **public**, afin que les nouveaux clusters puissent la tirer
sans dépendre du cache d'image local au nœud ni d'`imagePullSecrets`.

- **Épingler un tag de release immuable** (ex. `v2.0.8`) dans les manifests
  Kubernetes de production. Ne jamais déployer `latest`.
- Valeurs par défaut runtime : `CREWAI_MODE=worker`,
  `CREWAI_TASK_QUEUE=CREWAI_TASK_QUEUE`,
  `TEMPORAL_HOST=aegis-temporal-mvp-frontend.aegis-system.svc.cluster.local:7233`.

Vérifier un déploiement sur le cluster :

```bash
kubectl get deployment crewai-worker-mvp -n aegis-system -o wide
kubectl logs -n aegis-system deployment/crewai-worker-mvp
```

Les logs de démarrage réussi incluent `Agent Crew worker started`.

### Rollback

Changer le tag d'image épinglé dans `Aegis-AI-Infra` à
`kubernetes/envs/mvp/crewai-worker/values.yaml`, puis laisser Argo CD
synchroniser le tag de release précédent.

---

*Orchestration Multi-Agents Aegis AI — 2026*
