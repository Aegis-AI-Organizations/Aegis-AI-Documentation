# Format du token agent

Cette page définit le format unique du token de déploiement utilisé pour enregistrer un agent Aegis.

## Token de déploiement

Le token de déploiement est généré par Aegis lors de l'activation du compte owner ou lors d'une rotation manuelle.

Format attendu :

```text
ag_<43+ caractères URL-safe>
```

Règles :

- le token commence toujours par le préfixe `ag_` ;
- le corps contient au minimum 43 caractères ;
- les caractères autorisés sont `A-Z`, `a-z`, `0-9`, `_` et `-` ;
- le token clair n'est affiché qu'une seule fois côté Dashboard ;
- seul le hash SHA-256 du token est stocké côté backend.

Exemple :

```text
ag_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg
```

## Utilisation par l'agent

Le token de déploiement sert uniquement au premier enregistrement de l'agent :

```http
Authorization: Bearer ag_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg
```

Après enregistrement, l'agent reçoit un `agent_secret`. Ce secret est utilisé pour les routes opérationnelles comme le heartbeat ou l'upload de logs.

## Rotation et révocation

Une rotation invalide l'ancien token de déploiement et affiche le nouveau token une seule fois.

Une révocation supprime le token de déploiement actif. Aucun nouvel agent ne peut alors s'enregistrer tant qu'un nouveau token n'a pas été généré.
