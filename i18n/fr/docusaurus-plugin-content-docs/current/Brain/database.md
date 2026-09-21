# Base de données Brain

Brain utilise **SQLAlchemy 2.0** avec le modèle `DeclarativeBase` au-dessus de
PostgreSQL. Les modèles sont dans `src/models/` et restent compatibles avec le
schéma SQL géré par l'infrastructure. SQLite en mémoire sert aux tests unitaires
rapides ; PostgreSQL sert aux tests d'intégration.

## Modèles principaux

| Modèle          | Champs clés                                                             | Notes                                                                                                                   |
| --------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `Company`       | `name`, `logo_url`, `is_active`, `deployment_token`                     | `deployment_token` est le hash SHA-256 du token `ag_` brut ; la valeur brute est affichée une fois et jamais persistée. |
| `User`          | `email`, `password_hash`, `role`, `is_active`, `name`, `avatar_url`     | `role` est un enum (voir RBAC ci-dessous) ; `password_hash` est bcrypt.                                                 |
| `Agent`         | `company_id`, `name`, `token_hash`, `status`, `last_seen`, `created_at` | `token_hash` est le hash du secret opérationnel de l'agent ; `last_seen` alimente les compteurs actifs/inactifs.        |
| `RefreshToken`  | `token_hash`, `expires_at`, `revoked`                                   | Invalide si `revoked` est vrai ou si `expires_at` est dans le passé.                                                    |
| `Scan`          | `status`, `report_pdf`, `started_at`, `completed_at`                    | Une exécution de pentest.                                                                                               |
| `Vulnerability` | `vuln_type`, `severity`                                                 | Découvertes identifiées lors d'un scan.                                                                                 |
| `Evidence`      | `payload_used`, `loot_data` (JSONB)                                     | Preuve d'exploitation pour une vulnérabilité.                                                                           |

## Relations

- `Company.owner` — un-à-un vers le `User` propriétaire.
- `Company.members` — un-à-plusieurs vers les `User` membres.
- `Company.agents` — agents persistants déployés pour l'entreprise.
- `User.company` — l'entreprise à laquelle appartient l'utilisateur.
- `User.refresh_tokens` — sessions actives de l'utilisateur.

## Rôles RBAC

Synchronisés avec la Gateway :

```text
superadmin, admin, billing_aegis, technicien, support,
commercial, billing_client, operateur, viewer
```

## Détails d'implémentation

### JSONB avec repli SQLite

`Evidence.loot_data` utilise `JSONB` sur PostgreSQL et `JSON` simple ailleurs pour
que les modèles restent testables sur SQLite :

```python
loot_data = mapped_column(JSON().with_variant(JSONB, "postgresql"))
```

### Sécurité des mots de passe

Les mots de passe ne sont jamais stockés en clair. `auth_utils` fournit
`hash_password(password)` et `verify_password(password, hashed_password)` via
bcrypt.

### Évolution du schéma

Le dépôt inclut Alembic (`alembic/`, `alembic.ini`, `migrations/`). Migrer de
`Base.metadata.create_all` vers des migrations gérées par Alembic est une priorité
suivie — voir [Statut du projet](../Overview/project-status.md).

## Tests

La couche base de données est validée avec `pytest`, avec un objectif de
couverture complète sur les mappages de schéma critiques.
