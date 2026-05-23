# Multi-tenancy

Aegis est une plateforme partagée avec un cloisonnement strict par tenant. Les données client sont isolées par `company_id` dans les claims, métadonnées gRPC, requêtes base de données et inputs de workflow.

## Propagation d'identité

1. L'utilisateur s'authentifie via la Gateway.
2. Brain émet un JWT contenant identité, rôle et périmètre entreprise.
3. La Gateway transmet le token à Brain sur les appels gRPC protégés.
4. Brain extrait l'identité et applique les filtres tenant.

## Ressources tenant

- utilisateurs et invitations;
- tokens de déploiement et agents;
- scans, vulnérabilités, preuves et rapports;
- soldes et ledger de facturation;
- journaux d'audit.

## Isolation agent

Les tokens de déploiement sont liés à une entreprise et suivent le format :

```text
ag_<43+ caractères URL-safe>
```

Le backend ne stocke que leur hash. Après l'enregistrement, l'agent utilise son `agent_secret`; la rotation du token de déploiement ne déconnecte pas les agents déjà enregistrés.
