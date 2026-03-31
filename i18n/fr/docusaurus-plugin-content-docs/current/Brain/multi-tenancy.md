# Multi-Tenance & Isolation des Données

Aegis AI prend en charge plusieurs organisations sur une infrastructure partagée. Les données de chaque organisation sont isolées pour éviter tout accès non autorisé ou fuite entre clients.

## Partitionnement par ID Entreprise

Chaque table de base de données dans l'écosystème Aegis AI est partitionnée à l'aide d'une colonne `company_id`. Cela s'applique à :
- `scans`
- `vulnerabilities` (vulnerabilités)
- `users` (utilisateurs)
- `refresh_tokens` (jetons de rafraîchissement)

### Flux de Vérification

Lorsqu'une requête atteint un microservice (comme le Brain), la logique d'isolation suivante est appliquée :

1.  **Résolution d'Identité** : L'intercepteur `AuthInterceptor` extrait l'id `company_id` du JWT de l'utilisateur.
2.  **Injection du Contexte** : Cet identifiant est injecté de manière sécurisée dans le contexte interne du service.
3.  **Filtrage Strict** : Chaque requête SQL ajoute automatiquement une clause `WHERE company_id = ?` basée sur l'identité vérifiée.

## Sécurité Entreprise

Un utilisateur de **l'Entreprise A** ne peut pas accéder, modifier, ou même connaître l'existence d'un scan appartenant à **l'Entreprise B**, même s'il devine l'UUID. Ceci est appliqué au niveau de la logique métier et pas seulement à la couche API.

-   **Base de Données** : Des contraintes de clés étrangères garantissent que toutes les données relationnelles (ex: vulnérabilités) appartiennent intrinsèquement au même tenant que la ressource parente (ex: scan).
-   **Stockage** : Les rapports PDF et autres artefacts sont stockés dans des chemins isolés par tenant.
