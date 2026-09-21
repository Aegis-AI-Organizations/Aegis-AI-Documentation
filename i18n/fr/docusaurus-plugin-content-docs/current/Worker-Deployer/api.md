# API du Worker Deployer

Le Deployer n'expose pas d'API REST publique. Il est censé être appelé en interne
par le Brain ou l'orchestration de workflow.

## Opérations internes

| Opération          | Objectif                                    |
| ------------------ | ------------------------------------------- |
| Déployer un worker | Créer une ressource de worker ou de sandbox |
| Obtenir le statut  | Retourner l'état de déploiement courant     |
| Terminer un worker | Supprimer les ressources temporaires        |

## Entrées requises

- identifiant de tenant ou de workflow ;
- type de worker ;
- métadonnées de cible ;
- limites de ressources ;
- politique de namespace ou de sandbox.

## Sorties requises

- id du worker ;
- statut ;
- références de ressources Kubernetes ;
- détails d'erreur en cas d'échec de déploiement.
