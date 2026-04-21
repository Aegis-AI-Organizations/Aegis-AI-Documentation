# Multi-Tenancy Architecture

Aegis AI is built from the ground up as a native multi-tenant platform. It ensures strict logical isolation between different organizations while sharing the same underlying infrastructure and orchestration engine.

## Core Isolation Mechanism

The platform uses a **Shared Schema, Scoped Access** model. Instead of separate databases per company, isolation is enforced at the application and query levels using a mandatory `company_id` filter.

### 1. Identity Propagation

The isolation lifecycle begins at authentication:

- **JWT Claims**: Every issued Access Token contains a `company_id` claim in its payload.
- **gRPC Metadata**: The API Gateway extracts this claim and injects it into the gRPC metadata (`x-company-id`) for all downstream calls to the Brain.
- **Handler Context**: The Brain service uses a Python decorator (`@with_identity`) to extract this ID and make it available to the internal logic.

### 2. SQL-Level Enforcement

Every database query that interacts with tenant-owned data (Scans, Vulnerabilities, Evidences) must include a `WHERE company_id = %s` clause.

```python
# Example of row-level isolation in the Brain service
cur.execute(
    """
    SELECT id, status FROM scans
    WHERE id = %s AND company_id = %s
    """,
    (scan_id, company_id),
)
```

### 3. Resource Orchestration

When a scan is dispatched to **Temporal**, the `company_id` is included in the workflow input. This ensures that:

- **Worker Isolation**: Reports and logs are tagged with the correct owner.
- **KEDA Scaling**: Future iterations will allow scaling worker pools based on specific tenant load.

## Security Guarantees

- **No Cross-Tenant Leaks**: A user from Company A can never view or modify resources belonging to Company B.
- **Zero-Trust Validation**: Every microservice independently re-verifies the JWT signature to prevent internal identity spoofing.
- **Relational Integrity**: Foreign key constraints ensure that all relational data (e.g., vulnerabilities) inherently belong to the same tenant as the parent resource (e.g., scan).

## Probe Isolation (Deployment Tokens)

To allow external probes (Aegis Agents) to push security telemetry back to the platform without requiring full user credentials, the platform issues **Deployment Tokens**.

- **Structure**: Tokens are 32-character hex strings prefixed with `ag_` (e.g., `ag_8f3d...`).
- **Organization Bound**: Each token is uniquely bound to one `company_id`.
- **Stateless Verification**: When an Agent pushes data, the Brain verifies the token against the database to identify the correct tenant.
- **Revocation**: If a token is compromised, it can be regenerated, immediately invalidating the old one and cutting off access for that specific probe deployment.
