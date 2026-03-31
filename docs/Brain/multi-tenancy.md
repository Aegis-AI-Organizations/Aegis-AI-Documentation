# Multi-Tenancy & Data Isolation

Aegis AI supports multiple organizations on a single shared infrastructure. Each organization's data is isolated to prevent unauthorized access or leakage between customers.

## Partitioning by Company ID

Every database table in the Aegis AI ecosystem is partitioned using a `company_id` column. This applies to:

- `scans`
- `vulnerabilities`
- `users`
- `refresh_tokens`

### Verification Flow

When a request reaches a microservice (like the Brain), the following isolation logic is applied:

1.  **Identity Resolution**: The `AuthInterceptor` extracts the `company_id` claim from the user's JWT.
2.  **Context Injection**: This ID is securely injected into the service's internal context.
3.  **Strict Filtering**: Every SQL query automatically appends a `WHERE company_id = ?` clause based on the verified identity.

## Enterprise Security

A user from **Company A** cannot access, modify, or even know about the existence of a scan belonging to **Company B**, even if they guess the UUID. This is enforced at the core logic level and not just the API layer.

- **Database**: Foreign key constraints ensure that all relational data (e.g., vulnerabilities) inherently belong to the same tenant as the parent resource (e.g., scan).
- **Storage**: PDF reports and other artifacts are stored in tenant-isolated paths.
