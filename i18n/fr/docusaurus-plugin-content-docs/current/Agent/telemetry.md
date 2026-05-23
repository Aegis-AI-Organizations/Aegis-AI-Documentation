# Télémétrie agent

L'agent Aegis collecte la topologie locale et des signaux d'exécution, puis les transmet à la plateforme via des URL d'upload émises par la Gateway.

## Signaux collectés

| Signal                | Source                       | Usage                                      |
| --------------------- | ---------------------------- | ------------------------------------------ |
| Métadonnées hôte      | OS et processus              | Identifier le nœud                         |
| Inventaire conteneurs | Runtime Docker si disponible | Cartographier les workloads                |
| Inventaire Kubernetes | API Kubernetes si configurée | Cartographier pods, services et namespaces |
| Heartbeat             | Boucle runtime agent         | Maintenir l'état Dashboard                 |
| Santé locale          | Serveur health local         | Liveness/readiness                         |

## Modèle de livraison

1. L'agent s'enregistre et stocke `agent_id` et `agent_secret`.
2. Il envoie des heartbeats `RUNNING` à `/api/agents/{id}/status`.
3. Il demande une URL présignée via `/api/agents/{id}/upload-url`.
4. Il téléverse les payloads de topologie en `PUT` vers le stockage objet.

## Confidentialité

- Les tokens de déploiement ne sont pas inclus dans les payloads.
- Les secrets agents ne sont utilisés que dans les en-têtes `Authorization`.
- Les uploads utilisent des URL temporaires plutôt que des identifiants de stockage permanents.
- L'API health locale écoute sur localhost par défaut.
