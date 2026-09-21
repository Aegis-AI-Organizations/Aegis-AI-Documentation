# Multi-tenancy

Aegis est un système à plateforme partagée avec un cloisonnement strict par
tenant. Les données client sont isolées par `company_id` à travers les claims
d'authentification, les métadonnées gRPC, les requêtes en base et les entrées de
workflow.

## Propagation de l'identité

1. Un utilisateur s'authentifie via la Gateway.
2. Le Brain émet un JWT contenant l'identité utilisateur, le rôle et la portée
   entreprise.
3. La Gateway transmet l'access token au Brain sur les appels gRPC protégés.
4. Le Brain extrait l'identité et applique les filtres tenant avant toute lecture
   ou mutation de données.

## Ressources rattachées au tenant

Les ressources suivantes doivent toujours être cloisonnées à une entreprise :

- utilisateurs et invitations ;
- tokens de déploiement d'agent et agents enregistrés ;
- scans, vulnérabilités, preuves et rapports ;
- soldes de facturation et entrées de ledger ;
- audit logs.

## Isolation des agents

Les tokens de déploiement d'agent sont des identifiants liés à l'entreprise. Le
format actuel est :

```text
ag_<43+ caractères URL-safe>
```

Le backend ne stocke qu'un hash du token de déploiement. Après le premier
enregistrement, l'agent utilise son propre `agent_secret` ; tourner ou révoquer le
token de déploiement ne déconnecte pas les agents déjà enregistrés.

## Garanties d'accès

- Les rôles client ne peuvent pas lire les scans ou agents d'une autre entreprise.
- Les routes superadmin/admin exigent des scopes élevés explicites.
- Les handlers de requête doivent appliquer les filtres tenant même si la Gateway
  a déjà authentifié la requête.
- Les entrées d'audit doivent inclure l'acteur et le contexte entreprise pour la
  traçabilité.
