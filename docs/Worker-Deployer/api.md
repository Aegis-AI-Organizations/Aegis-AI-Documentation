# Deployer Worker API

The Deployer does not expose a public REST API. It is expected to be called internally by Brain or workflow orchestration.

## Internal Operations

| Operation        | Purpose                             |
| ---------------- | ----------------------------------- |
| Deploy worker    | Create a worker or sandbox resource |
| Get status       | Return current deployment state     |
| Terminate worker | Delete temporary resources          |

## Required Inputs

- tenant or workflow identifier;
- worker type;
- target metadata;
- resource limits;
- namespace or sandbox policy.

## Required Outputs

- worker id;
- status;
- Kubernetes resource references;
- error details when deployment fails.
