# Architecture Worker Deployer

Le Worker Deployer provisionne des ressources de worker ou sandbox contrôlées pour les workflows Aegis. Il est piloté par l'orchestration Brain.

## Responsabilités

- Créer des ressources d'exécution isolées.
- Appliquer des manifests Kubernetes à moindre privilège.
- Remonter le statut de déploiement.
- Nettoyer les ressources temporaires.

## Frontière Kubernetes

Le deployer doit tourner avec un RBAC étroitement limité. Il ne doit pas disposer de droits cluster-admin en production.
