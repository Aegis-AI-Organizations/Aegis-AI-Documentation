# The Aegis AI Brain (Orchestrator)

The Brain is the monolithic, asynchronous orchestrator in the Aegis ecosystem. Designed around Python, `psycopg`, and `temporalio`, it ingests scanning orders via gRPC and commands the worker fleet through complex Temporal Workflows.

## Architecture (MVP v2)

In version 2 of the framework, the Brain assumes the exclusive role of system orchestrator:

1. **gRPC Server Layer (`aegis.v2`)**: Listens continuously for requests originating from the API Gateway.
2. **PostgreSQL Client**: Persists scan states, handles UUID generation, logs incoming vulnerabilities, and archives evidence blobs via `psycopg`.
3. **Temporal Client**: Launches asynchronous, distributed workflows across the worker cluster (`pentest-worker`, `ingest-worker`, etc.).

## Temporal Workflows Overview

### 1. `PentestWorkflow`

The most critical workflow in Aegis AI. When triggered through the gRPC `StartScan`, the Brain begins stepping through activities:

- **`deploy_sandbox_target` (Kubernetes Activity):** Dynamically spins up a sterile target namespace (`aegis-war-room-{scan_id}`) where the vulnerable image is exposed under strict network isolation.
- **`run_pentest` (Pentest Worker):** In parallel, commands the remote pentest-worker node to blast payloads into the target within the sandbox. The worker generates `Evidences` and `Vulnerabilities` streams sent back to the temporal history.
- **`cleanup_sandbox` (Kubernetes Activity):** Dismantles the target namespace to restore cluster equilibrium once the scan is successfully concluded.

## Service Logic Flows

### 1. Post-payment Onboarding (MVP)

Onboarding is now a deferred activation flow managed by Aegis administrators after payment.

1.  **gRPC Request**: The API Gateway calls internal `OnboardCompany` rpc.
2.  **Entity Creation**: `CompanyService` saves the new `Company` record to PostgreSQL.
3.  **Owner Initialization**: The initial "Owner" user is created with `pending_activation` and no usable initial password.
4.  **Invitation Creation**: A one-time `aegis_inv_...` invitation token is generated, hashed in PostgreSQL, and sent by email.
5.  **Account Activation**: The owner opens `/setup-password?token=...`, defines a password, and the Brain marks the invitation as used.
6.  **Agent Token Delivery**: During activation, a clear `ag_...` agent token is generated, its hash is stored, and the clear token is returned only once.

## Zero Trust Security Scope

The Brain is securely locked away within `aegis-system`. By Cilium Network Policies, it is the solitary component explicitly permitted inward ingress traffic to the `aegis-postgres-mvp` namespace.
