# Authentification

Aegis AI implémente un modèle de sécurité **Zero-Trust** basé sur les JSON Web Tokens (JWT). Toutes les requêtes vers l'API Gateway (à l'exception du Login) doivent inclure un jeton d'identité valide.

## Architecture JWT Interne

Contrairement aux versions précédentes qui dépendaient de fournisseurs externes comme Keycloak, Aegis AI utilise désormais un **Service d'Authentification Interne** découplé.

1.  **Fournisseur d'Identité** : Les utilisateurs s'authentifient via le point d'entrée `/auth/login`.
2.  **Émission de JWT** : Le service Brain vérifie les identifiants et émet un JWT signé contenant l'id utilisateur (`user_id`), l'id entreprise (`company_id`) et le rôle.
3.  **Session Sans État** : La plateforme ne stocke pas d'état de session. Chaque requête est vérifiée cryptographiquement à l'aide d'un secret partagé (`JWT_SECRET`).

## Propagation Zero-Trust

Pour garantir une sécurité maximale et l'isolation des services, l'identité est propagée selon un modèle **"Forward-and-Verify"** :

-   **API Gateway** : Valide le jeton entrant de l'utilisateur. S'il est valide, elle extrait les informations et transfère le **jeton brut** aux microservices aval (comme le Brain) via les métadonnées gRPC.
-   **Microservices (Brain)** : Re-vérifient indépendamment la signature du jeton. Cela garantit que même si le réseau interne est compromis, un service n'exécutera jamais une commande non authentifiée.

## Utilisation

Incluez le jeton dans l'en-tête `Authorization` de chaque requête :

```bash
Authorization: Bearer <votre_token_acces>
```

### Contenu du Jeton (Claims)
Vos jetons incluent les informations standard suivantes :
- `sub` : Votre identifiant utilisateur unique.
- `company_id` : L'identifiant unique de votre organisation (utilisé pour l'isolation multi-tenant).
- `role` : Votre niveau d'accès (ex: `admin`, `user`).
