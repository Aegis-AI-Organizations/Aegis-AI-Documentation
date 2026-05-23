# Autoscaling with KEDA

KEDA can scale Aegis workers based on queue or workflow demand. It is most useful for bursty scan and ingestion workloads.

## Candidate Workloads

- Pentest workers;
- ingest workers;
- deployer workers;
- fixer workers.

## Scaling Principles

- Define safe maximum replicas.
- Keep scale-to-zero only for stateless workers.
- Ensure cold-start time is acceptable for the workflow.
- Monitor queue lag and failure rate, not only replica count.

## Failure Mode

If KEDA or the scaler backend is unavailable, workflows should fail clearly or continue with a safe minimum replica count.
