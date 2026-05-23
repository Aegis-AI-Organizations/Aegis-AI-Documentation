# Fixer Worker Architecture

The Fixer Worker is the remediation component. Its role is to transform confirmed findings into safe remediation proposals or controlled changes.

## Responsibilities

- Consume confirmed vulnerabilities and remediation context.
- Produce patch suggestions or infrastructure changes.
- Keep every action auditable.
- Avoid making destructive changes without workflow authorization.

## Current Boundary

The Fixer should be treated as a backend worker, not a public API. Customer-facing approvals, audit history, and permissions must be handled through Brain and the Dashboard.

## Remediation Flow

```mermaid
flowchart LR
    Finding[Confirmed Finding] --> Brain
    Brain --> Fixer[Fixer Worker]
    Fixer --> Patch[Patch Proposal]
    Patch --> Audit[Audit Log]
```

## Safety Rules

- Prefer pull-request style remediation over direct mutation.
- Record actor, tenant, finding, and generated change.
- Keep secrets out of patches and logs.
- Validate generated changes before presenting them to users.
