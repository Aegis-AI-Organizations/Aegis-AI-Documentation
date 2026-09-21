# Brain Database

Brain uses **SQLAlchemy 2.0** with the `DeclarativeBase` pattern over PostgreSQL.
Models live in `src/models/` and are kept compatible with the
infrastructure-managed SQL schema. In-memory SQLite is used for fast unit tests;
PostgreSQL is used for integration tests.

## Core Models

| Model           | Key fields                                                              | Notes                                                                                                           |
| --------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `Company`       | `name`, `logo_url`, `is_active`, `deployment_token`                     | `deployment_token` is the SHA-256 hash of the raw `ag_` token; the raw value is shown once and never persisted. |
| `User`          | `email`, `password_hash`, `role`, `is_active`, `name`, `avatar_url`     | `role` is an enum (see RBAC below); `password_hash` is bcrypt.                                                  |
| `Agent`         | `company_id`, `name`, `token_hash`, `status`, `last_seen`, `created_at` | `token_hash` is the hashed operational agent secret; `last_seen` drives active/inactive counts.                 |
| `RefreshToken`  | `token_hash`, `expires_at`, `revoked`                                   | Invalid if `revoked` is true or `expires_at` is in the past.                                                    |
| `Scan`          | `status`, `report_pdf`, `started_at`, `completed_at`                    | One pentest execution.                                                                                          |
| `Vulnerability` | `vuln_type`, `severity`                                                 | Findings discovered during a scan.                                                                              |
| `Evidence`      | `payload_used`, `loot_data` (JSONB)                                     | Proof of exploitation for a vulnerability.                                                                      |

## Relationships

- `Company.owner` — one-to-one to the owning `User`.
- `Company.members` — one-to-many to member `User` rows.
- `Company.agents` — persistent agents deployed for the company.
- `User.company` — the company the user belongs to.
- `User.refresh_tokens` — active sessions for the user.

## RBAC roles

Synchronized with the Gateway:

```text
superadmin, admin, billing_aegis, technicien, support,
commercial, billing_client, operateur, viewer
```

## Implementation details

### JSONB with SQLite fallback

`Evidence.loot_data` uses `JSONB` on PostgreSQL and plain `JSON` elsewhere so the
models stay testable on SQLite:

```python
loot_data = mapped_column(JSON().with_variant(JSONB, "postgresql"))
```

### Password security

Passwords are never stored in clear text. `auth_utils` provides
`hash_password(password)` and `verify_password(password, hashed_password)` using
bcrypt.

### Schema evolution

The repository includes Alembic (`alembic/`, `alembic.ini`, `migrations/`).
Migrating away from `Base.metadata.create_all` to Alembic-managed migrations is a
tracked priority — see [Project Status](../Overview/project-status.md).

## Testing

The database layer is validated with `pytest`, targeting full coverage on
critical schema mappings.
