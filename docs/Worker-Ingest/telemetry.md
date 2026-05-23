# Ingest Worker Telemetry

## Recommended Metrics

- payloads received;
- payloads rejected by schema or size;
- processing latency;
- retry count;
- storage write failures;
- queue depth when a queue is used.

## Logs

Logs should include tenant-safe identifiers and object keys, not raw payload content unless explicitly enabled in a local debug environment.
