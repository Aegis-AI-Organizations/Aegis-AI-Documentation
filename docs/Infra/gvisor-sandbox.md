# Worker Sandboxing

Security workers should run with strong runtime and Kubernetes isolation. gVisor can be used as the runtime boundary where the cluster supports it.

## Recommended Controls

- non-root containers;
- read-only root filesystem where possible;
- dropped Linux capabilities;
- resource requests and limits;
- restricted service accounts;
- network policies around worker namespaces;
- runtime class such as `runsc` when available.

## Operational Rule

Sandboxing is a defense-in-depth layer. It does not replace workflow authorization, target allow-listing, or tenant scoping.
