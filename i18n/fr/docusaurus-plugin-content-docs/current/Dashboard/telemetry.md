# Télémétrie Dashboard

Le Dashboard expose surtout l'état opérationnel de l'API plutôt qu'une analytics frontend avancée.

## Signaux visibles

| Signal                                | Source                           |
| ------------------------------------- | -------------------------------- |
| Compteurs agents et dernier heartbeat | `GET /api/agents/status`         |
| Scans et statuts                      | `GET /api/scans`, flux SSE       |
| Détails vulnérabilités                | Routes vulnérabilités et preuves |
| Facturation                           | Routes billing                   |
| Audit                                 | Route audit admin                |

## Règles de logging

Ne jamais journaliser JWT, cookies refresh, tokens de déploiement ou secrets agents.
