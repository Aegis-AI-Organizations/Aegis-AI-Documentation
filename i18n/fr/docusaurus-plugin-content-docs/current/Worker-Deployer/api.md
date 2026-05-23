# API Worker Deployer

Le Deployer n'expose pas d'API REST publique. Il est appelé en interne par Brain ou l'orchestration.

## Opérations internes

| Opération       | Usage                                 |
| --------------- | ------------------------------------- |
| Déployer worker | Créer une ressource worker ou sandbox |
| Lire statut     | Retourner l'état courant              |
| Terminer worker | Supprimer les ressources temporaires  |

## Sorties attendues

- worker id;
- statut;
- références Kubernetes;
- détails d'erreur en cas d'échec.
