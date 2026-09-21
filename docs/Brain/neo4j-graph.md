# Neo4j Topology Graph

Neo4j stores infrastructure and security relationships that are easier to analyze as a graph than as isolated rows.

## Graph Purpose

- Represent hosts, containers, services, images, namespaces, vulnerabilities, and evidences.
- Connect agent-discovered topology with scan findings.
- Support attack-path and impact analysis.
- Provide context for remediation and report generation.

## Typical Nodes

| Node            | Description                                |
| --------------- | ------------------------------------------ |
| `Company`       | Tenant owner of the graph data             |
| `Agent`         | Deployed infrastructure probe              |
| `Host`          | Machine or node discovered by an agent     |
| `Container`     | Runtime workload                           |
| `Service`       | Exposed service or application endpoint    |
| `Scan`          | Pentest execution                          |
| `Vulnerability` | Security finding linked to a scan or asset |

## Typical Relationships

| Relationship   | Meaning                           |
| -------------- | --------------------------------- |
| `OWNS`         | Company ownership boundary        |
| `OBSERVED`     | Agent observed an asset           |
| `RUNS`         | Host runs container or service    |
| `EXPOSES`      | Workload exposes an endpoint      |
| `FOUND`        | Scan found a vulnerability        |
| `EVIDENCED_BY` | Vulnerability has technical proof |

## Operational Rule

Graph data must never bypass tenant scoping. Every query that materializes graph data for the Dashboard, reports, or workers must be constrained by company context.
