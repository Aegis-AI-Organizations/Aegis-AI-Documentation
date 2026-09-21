# Télémétrie Worker Deployer

Le Worker Deployer rapporte le cycle de vie de chaque sandbox qu'il gère. Sa
valeur opérationnelle est une infrastructure traçable et proprement détruite.

## Signaux à suivre

| Signal                           | Objectif                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------- |
| Requêtes de création de sandbox  | Volume d'appels `CreateSandbox` depuis les workflows Brain                      |
| Cycle de vie du namespace        | `aegis-war-room-<scan_id>` créé / prêt / supprimé                               |
| Readiness des workloads          | Deployment/StatefulSet disponible vs échoué, par workload                       |
| Échecs de workload `required`    | Création de sandbox interrompue car un workload requis n'est jamais devenu prêt |
| Application des network policies | Egress default-deny et services mock externes en place                          |
| Résultat du teardown             | Namespace supprimé, ou erreurs de cleanup tolérées pour ressources absentes     |
| Durée                            | Temps de la requête à l'endpoint joignable ; temps de teardown                  |

## Vocabulaire de statut

Les mises à jour de statut de déploiement distinguent : `pending`, `ready`,
`failed`, `deleted`.

## Règles opérationnelles

- La création et le teardown de ressources sont idempotents ; les retries ne
  dupliquent ni n'orphelinent de ressources.
- Le teardown tolère les ressources déjà absentes.
- Les erreurs sont actionnables : image pulls non résolues, mounts refusés et
  échecs de scheduling sont remontés plutôt que retentés aveuglément.
- Les namespaces de sandbox ne sont jamais supprimés que s'ils commencent par
  `aegis-war-room-`.
