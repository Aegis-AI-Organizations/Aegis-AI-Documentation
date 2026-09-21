# Deployer Worker Quickstart

The Deployer Worker builds the isolated **digital-twin sandbox** for a scan and
tears it down afterwards. It is driven by Brain orchestration, not called
directly by users.

## Sandbox shape

Given a topology request, the Deployer creates namespace
`aegis-war-room-<scan_id>` and renders:

- workloads (`Deployment`, or `StatefulSet` when `stateful: true`);
- services (named ports, `headless`, `type`, same-namespace `aliases`);
- default-deny egress network policy;
- external mock DNS/HTTP/HTTPS services for declared external dependencies.

Supported topology fidelity fields:

| Area             | Fields                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------- |
| Startup          | `command`, `args`, `working_dir`, `init_containers`                                       |
| Dependency order | `depends_on` (creation order), `wait_for` (init-container TCP wait, e.g. `postgres:5432`) |
| Files / storage  | `config_files`, `secret_files`, `empty_dirs`                                              |
| Identity         | `stateful: true` → StatefulSet with stable DNS                                            |
| Resources        | `resources.requests`, `resources.limits`                                                  |
| Security         | `security_context`, `pod_security_context`                                                |
| Readiness policy | `required: true` fails sandbox creation if the workload never becomes ready               |

Handled elsewhere: database dump restore (Brain seeding activities), rich external
API responses / traffic capture (external mock runtime), ingress/TLS virtual hosts
(infra manifests).

## Example fixtures

The repository ships a canonical vulnerable fixture:

- `examples/sandbox-topology.vulnerable-webapp.json` — vulnerable web app + PostgreSQL.
- `examples/sandbox-request.vulnerable-webapp.json` — full `CreateSandbox` request.

## Smoke validation

After a sandbox is created:

```bash
scripts/sandbox_smoke.sh --scan-id smoke-sqli-001
```

Pass an explicit endpoint if the `CreateSandbox` response returned a different one:

```bash
scripts/sandbox_smoke.sh \
  --scan-id smoke-sqli-001 \
  --endpoint http://vulnerable-webapp.aegis-war-room-smoke-sqli-001.svc.cluster.local:80
```

Inspect or clean up a namespace:

```bash
scripts/sandbox_smoke.sh --namespace aegis-war-room-scan-123
scripts/sandbox_smoke.sh --scan-id smoke-sqli-001 --cleanup
```

The script refuses to delete namespaces that do not start with `aegis-war-room-`.

## What good looks like

- Topology JSON validates and the namespace exists.
- Network policies are present; services include app, database, and external mock.
- `depends_on` creates database/cache workloads before dependent apps.
- Deployments and pods become ready, or show actionable errors.
- The endpoint responds from inside the namespace.
- Events show no unresolved image pulls, denied mounts, or scheduling failures.

## Debugging

```bash
kubectl describe namespace aegis-war-room-smoke-sqli-001
kubectl get all -n aegis-war-room-smoke-sqli-001 -o wide
kubectl logs -n aegis-war-room-smoke-sqli-001 deploy/vulnerable-webapp
kubectl get events -n aegis-war-room-smoke-sqli-001 --sort-by=.lastTimestamp
```

`ImagePullBackOff` means the vulnerable app image referenced by the fixture must
be published or retagged.
