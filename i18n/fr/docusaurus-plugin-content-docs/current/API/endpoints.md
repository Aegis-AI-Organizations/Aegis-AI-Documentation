# Points d'Entrée | Aegis-AI-Api-Gateway

Tous les points d'entrée (à l'exception de `/auth/login`) nécessitent un jeton JWT valide transmis dans l'en-tête `Authorization`.

## Sécurité

- **En-tête** : `Authorization: Bearer <votre_token_acces>`

## Authentification

- `POST /auth/login` : S'authentifier et récupérer un jeton.
- `POST /auth/refresh` : Rafraîchir un jeton d'accès expiré via un cookie.
- `POST /auth/logout` : Révoquer la session et se déconnecter.

## Scans (Temps Réel SSE)

- `GET /scans/stream` : Démarrer un flux SSE global pour toutes les mises à jour des scans.
- `GET /scans/{id}/stream` : Démarrer un flux SSE pour un scan spécifique.

## Scans (Standard)

- `POST /scans` : Créer un nouveau scan.
- `GET /scans` : Lister tous les scans pour l'entreprise actuelle.
- `GET /scans/{id}` : Récupérer le statut d'un scan spécifique.
- `GET /scans/{id}/report` : Télécharger un rapport PDF.
- `GET /scans/{id}/vulnerabilities` : Lister les vulnérabilités pour un scan.
- `GET /vulnerabilities/{id}/evidences` : Récupérer les preuves et blocs de données (loot).
