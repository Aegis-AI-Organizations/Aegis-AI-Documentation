# Network Policies

Network policies reduce blast radius between Aegis services and worker pods.

## Policy Goals

- Allow public ingress only where needed.
- Allow Dashboard to reach the Gateway through the configured ingress path.
- Allow Gateway to reach Brain and required infrastructure.
- Allow Brain to reach databases, queues, storage, and Temporal.
- Restrict workers to approved targets and backend endpoints.

## Review Checklist

- Default-deny is applied where practical.
- Worker namespaces cannot reach unrelated platform services.
- Database services accept traffic only from expected workloads.
- DNS egress is explicitly allowed when default-deny egress is enabled.
