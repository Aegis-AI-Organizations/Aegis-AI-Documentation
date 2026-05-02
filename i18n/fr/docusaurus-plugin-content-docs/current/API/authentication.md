# Authentification

Aegis AI implémente un **Modèle de Sécurité Zero-Trust** basé sur les JSON Web Tokens (JWT). Toutes les requêtes vers l'API Gateway (à l'exception du Login) doivent inclure un jeton d'identité valide.

## Architecture JWT Interne

Contrairement aux versions précédentes qui reposaient sur des fournisseurs externes comme Keycloak, Aegis AI utilise désormais un **Service d'Authentification Interne** découplé.

1.  **Fournisseur d'Identité** : Les utilisateurs s'authentifient via l'endpoint `/auth/login`.
2.  **Émission du JWT** : Le service Brain vérifie les informations d'identification et émet un JWT signé contenant le `user_id`, le `company_id` et le `role`.
3.  **Session Sans État** : La plateforme ne stocke pas l'état de la session. Chaque requête est vérifiée cryptographiquement à l'aide d'un `JWT_SECRET` partagé.

## Propagation Zero-Trust

Pour garantir une sécurité maximale et l'isolation des services, l'identité est propagée selon un modèle **forward-and-verify** :

- **API Gateway** : Valide le jeton entrant de l'utilisateur. S'il est valide, il extrait les revendications (claims) et transmet le **jeton brut** aux microservices en aval (comme le Brain) via les métadonnées gRPC.
- **Microservices (Brain)** : Re-vérifient indépendamment la signature du jeton. Cela garantit que même si le réseau interne est compromis, un service n'exécutera jamais une commande non authentifiée.

## Utilisation

Incluez le jeton dans l'en-tête `Authorization` de chaque requête :

```bash
Authorization: Bearer <votre_access_token>
```

### Revendications du Jeton (Claims)

Vos jetons incluent les revendications standard suivantes :

- `sub` : Votre identifiant utilisateur unique.
- `company_id` : L'identifiant unique de votre organisation (utilisé pour l'isolation des locataires).
- `role` : Votre niveau d'accès. Les rôles disponibles incluent :
  - **`superadmin`** : Contrôle global de la plateforme.
  - **`admin`** : Contrôle total sur une organisation spécifique.
  - **`commercial`** : Peut gérer les entreprises et l'onboarding.
  - **`operateur`** : Analyste technique standard.
  - **`viewer`** : Accès en lecture seule.
- `exp` : Date d'expiration du jeton.

## Cycle de vie de la session

Aegis AI utilise une stratégie à deux jetons pour équilibrer sécurité et expérience utilisateur :

1.  **Access Token** : Durée de vie courte (généralement 15 minutes). Utilisé pour toutes les requêtes API. Conservez ce jeton uniquement en mémoire.
2.  **Refresh Token** : Durée de vie longue (généralement 7 jours). Stocké dans un **cookie sécurisé HTTP-only** défini par l'endpoint `/auth/login`.

Pour régénérer un jeton d'accès sans se ré-authentifier, utilisez l'endpoint `/auth/refresh`. Le serveur cherchera automatiquement le cookie de jeton de rafraîchissement valide.
