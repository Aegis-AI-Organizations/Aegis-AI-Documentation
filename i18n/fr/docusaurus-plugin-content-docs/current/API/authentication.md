# Authentification

L'API Gateway utilise des JWT courts pour les requêtes utilisateur et un cookie `refresh_token` HTTP-only pour renouveler la session. Le trafic agent utilise un flux séparé avec token de déploiement et secret agent.

## Cycle de session

1. `POST /api/auth/login` valide les identifiants via Brain.
2. La Gateway retourne `access_token`.
3. La Gateway pose le cookie HTTP-only `refresh_token`.
4. Le Dashboard envoie `Authorization: Bearer <access_token>` sur les routes protégées.
5. `POST /api/auth/refresh` renouvelle le token d'accès.
6. `POST /api/auth/logout` invalide la session et supprime le cookie.

## Activation initiale

Les utilisateurs invités activent leur compte avec :

```http
POST /api/auth/setup-password
```

Pour le owner d'une entreprise, la réponse contient aussi `agent_token`, le token à usage unique nécessaire pour connecter le premier agent Aegis.

## Rôles

| Rôle             | Portée typique                      |
| ---------------- | ----------------------------------- |
| `superadmin`     | Administration globale              |
| `admin`          | Administration côté Aegis           |
| `billing_aegis`  | Facturation plateforme              |
| `technicien`     | Opérations techniques               |
| `support`        | Support client                      |
| `owner`          | Propriétaire d'organisation cliente |
| `billing_client` | Facturation client                  |
| `operateur`      | Opérateur technique client          |
| `viewer`         | Lecture seule                       |

## Règles de sécurité

- Garder les access tokens en mémoire côté frontend.
- Ne jamais exposer les refresh tokens à JavaScript.
- Traiter les tokens de déploiement et secrets agents comme des identifiants machine.
- Révoquer ou faire une rotation du token agent s'il a été copié dans un emplacement non sûr.
