# Quickstart Agent Crew

L'Agent Crew est livré comme une image Docker unique avec deux modes :

| Mode                 | Objectif                                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `CREWAI_MODE=worker` | Chemin de production. Se connecte à Temporal et traite les activités `run_crew_pentest` depuis `CREWAI_TASK_QUEUE`. |
| `CREWAI_MODE=cli`    | Debug local. Exécute `src/main.py` directement pour itérer sur les prompts/modèles.                                 |

## Prérequis

- Python 3.10+ (3.12 slim dans le conteneur).
- Frontend Temporal joignable (mode worker).
- Endpoint Ollama joignable servant `llama3.1:8b`, `whiterabbitneo` et
  `deepseek-coder-v2` (ou un provider compatible OpenAI).

## Lancer le mode CLI en local

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

## Lancer le mode worker (déploiement Aegis)

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

Dans le cluster MVP, l'image est déployée par Argo CD aux côtés d'un service
Ollama `ClusterIP` interne. Les modèles ne sont jamais embarqués dans l'image
applicative.

## Vérifier

- Les logs du mode worker montrent une connexion Temporal et une activité
  `run_crew_pentest` enregistrée.
- Lancer un scan de topologie via Brain produit des lignes de log `Planner`,
  `Guider` et `Executor`.
- Le scan atteint `COMPLETED` et les findings / artefacts de rapport sont
  persistés par Brain.

Si Temporal est injoignable, le conteneur quitte en mode worker. Si Ollama est
injoignable, `run_crew_pentest` retourne un échec contrôlé avec un code d'erreur
clair. Voir [Architecture · Gestion des erreurs](./architecture.md) pour la
matrice complète.
