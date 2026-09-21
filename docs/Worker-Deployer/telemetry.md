# Deployer Worker Telemetry

The Deployer Worker reports the lifecycle of each sandbox it manages. Its
operational value is traceable, cleanly torn-down infrastructure.

## Signals to track

| Signal                     | Purpose                                                        |
| -------------------------- | ----------------------------------------------------------- |
| Sandbox create requests    | Volume of `CreateSandbox` calls from Brain workflows           |
| Namespace lifecycle        | `aegis-war-room-<scan_id>` created / ready / deleted           |
| Workload readiness         | Deployment/StatefulSet available vs failed, per workload       |
| `required` workload failures | Sandbox creation aborted because a required workload never became ready |
| Network policy application | Default-deny egress and external-mock services in place        |
| Teardown outcome           | Namespace deleted, or cleanup errors tolerated for missing resources |
| Duration                   | Time from request to reachable endpoint; time to teardown      |

## Status vocabulary

Deployment status updates distinguish: `pending`, `ready`, `failed`, `deleted`.

## Operational rules

- Resource creation and teardown are idempotent; retries do not duplicate or
  orphan resources.
- Teardown tolerates already-missing resources.
- Errors are actionable: unresolved image pulls, denied mounts, and scheduling
  failures are surfaced rather than retried blindly.
- Sandbox namespaces are only ever deleted when they start with
  `aegis-war-room-`.
