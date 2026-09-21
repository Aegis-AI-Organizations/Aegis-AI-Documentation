# Format du token agent

Le token de déploiement est l'identifiant à usage unique utilisé pour enregistrer un nouvel agent Aegis.

## Format

```text
ag_<43+ caractères URL-safe>
```

Règles :

- le token commence toujours par `ag_` ;
- le corps contient au minimum 43 caractères ;
- les caractères autorisés sont `A-Z`, `a-z`, `0-9`, `_` et `-` ;
- le token en clair n'est affiché qu'une seule fois dans le Dashboard ;
- seul le hash SHA-256 est stocké par le backend.

Exemple :

```text
ag_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg
```

## Utilisation

Le token de déploiement sert uniquement au premier enregistrement :

```http
Authorization: Bearer ag_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg
```

Après l'enregistrement, l'agent reçoit un `agent_secret`. Ce secret est utilisé pour les routes opérationnelles comme les heartbeats et les demandes d'URL d'upload.

## Rotation et révocation

Une rotation invalide l'ancien token de déploiement et affiche le nouveau token une seule fois.

Une révocation supprime le token de déploiement actif. Aucun nouvel agent ne peut s'enregistrer tant qu'un nouveau token n'a pas été généré.
