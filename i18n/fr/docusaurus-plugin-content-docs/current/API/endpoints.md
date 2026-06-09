# API Gateway

L'API Gateway est le point d'entrée HTTP public du Dashboard et des agents. Elle gère CORS, rate limiting, middleware JWT, middleware agent et traduction REST/SSE vers les services gRPC Brain.

La référence complète est disponible dans **API Reference** depuis `openapi.yaml`.

## Routes publiques

| Route                      | Méthode | Usage                         |
| -------------------------- | ------- | ----------------------------- |
| `/health`                  | `GET`   | Santé Kubernetes              |
| `/api/health`              | `GET`   | Santé API                     |
| `/api/`                    | `GET`   | Métadonnées racine            |
| `/api/auth/login`          | `POST`  | Authentification              |
| `/api/auth/refresh`        | `POST`  | Rotation du token d'accès     |
| `/api/auth/setup-password` | `POST`  | Activation d'un compte invité |

## Routes utilisateur protégées

| Domaine     | Routes                                                                                                                        |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Session     | `/api/auth/logout`, `/api/auth/me`                                                                                            |
| Profil      | `/api/users/me/profile`, `/api/users/me/email`, `/api/users/me/password`, `/api/users/me/profile/avatar`                      |
| Entreprises | `/api/companies`, `/api/companies/onboard`, `/api/companies/me/agent-token/rotate`, `/api/companies/me/agent-token/revoke`    |
| Agents      | `/api/agents`, `/api/agents/status`                                                                                           |
| Scans       | `/api/scans`, `/api/scans/{id}`, `/api/scans/{id}/vulnerabilities`, `/api/scans/{id}/report`                                  |
| Flux        | `/api/scans/stream`, `/api/scans/{id}/stream`, `/api/admin/teams/stream`                                                      |
| Facturation | `/api/billing/balance`, `/api/billing/ledger`, `/api/billing/stats`                                                           |
| Stockage    | `/api/storage/upload-url`                                                                                                     |
| Admin/Audit | `/api/admin/companies`, `/api/admin/users` invitation collaborateur, `/api/admin/audit-logs`, `/api/admin/companies/{id}/...` |

## Routes agent

| Route                         | Méthode | Identifiant          |
| ----------------------------- | ------- | -------------------- |
| `/api/agents/register`        | `POST`  | Token de déploiement |
| `/api/agents/{id}/status`     | `POST`  | Secret agent         |
| `/api/agents/{id}/upload-url` | `GET`   | Secret agent         |

## Notes opérationnelles

- Les routes REST utilisent le préfixe `/api` derrière le proxy local.
- Les routes SSE exigent un JWT utilisateur valide.
- L'enregistrement agent exige le token `ag_...` dans l'en-tête `Authorization` et dans le corps JSON.
- La logique métier doit rester dans Brain; la Gateway reste une couche de politique et de transport.
