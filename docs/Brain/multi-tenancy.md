# Multi-Tenancy

Aegis is a shared-platform system with strict tenant scoping. Customer data is isolated by `company_id` across authentication claims, gRPC metadata, database queries, and workflow inputs.

## Identity Propagation

1. A user authenticates through the Gateway.
2. Brain issues a JWT containing user identity, role, and company scope.
3. The Gateway forwards the access token to Brain on protected gRPC calls.
4. Brain extracts identity and applies tenant filters before reading or mutating data.

## Tenant-Owned Resources

The following resources must always be scoped to a company:

- users and invitations;
- agent deployment tokens and registered agents;
- scans, vulnerabilities, evidences, and reports;
- billing balances and ledger entries;
- audit logs.

## Agent Isolation

Agent deployment tokens are company-bound credentials. The current format is:

```text
ag_<43+ URL-safe chars>
```

The backend stores only a hash of the deployment token. After first registration, the agent uses its own `agent_secret`; rotating or revoking the deployment token does not disconnect already registered agents.

## Access Guarantees

- Customer roles cannot read another company's scans or agents.
- Superadmin/admin routes require explicit elevated scopes.
- Query handlers must apply tenant filters even when the Gateway already authenticated the request.
- Audit entries should include actor and company context for traceability.
