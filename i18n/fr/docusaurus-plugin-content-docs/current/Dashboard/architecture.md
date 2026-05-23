# Architecture du Dashboard

Le Dashboard Aegis est une application React/Vite utilisée par les opérateurs clients et les administrateurs Aegis. Il consomme les API REST/SSE de la Gateway; les décisions métier restent côté backend.

## Zones principales

| Zone                     | Usage                                            |
| ------------------------ | ------------------------------------------------ |
| Tableau de bord sécurité | Statut agents, scans récents, lancement de scan  |
| Vulnérabilités           | Scans, findings, preuves, rapports               |
| Utilisateurs             | Administration organisation et comptes           |
| Facturation              | Solde, usage, ledger                             |
| Audit                    | Historique des actions sensibles                 |
| Paramètres               | Profil, mot de passe, email, avatar, token agent |

## Configuration runtime

| Clé                                | Usage                                         |
| ---------------------------------- | --------------------------------------------- |
| `API_GATEWAY_URL` / `VITE_API_URL` | URL Gateway                                   |
| `DOCS_BASE_URL` / `VITE_DOCS_URL`  | URL Docusaurus pour les boutons documentation |

## Accès données

- Les appels API passent par le client Axios partagé.
- Les routes protégées dépendent du store auth et du refresh JWT.
- Les statuts de scans et équipes utilisent SSE lorsque disponible.
- Le statut agent utilise `/api/agents/status`.
