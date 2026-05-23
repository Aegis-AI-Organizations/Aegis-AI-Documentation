# Ingest Worker Quickstart

## Local Development

```bash
cargo build
cargo test
cargo run
```

## Container Build

```bash
docker build -t aegis-worker-ingest .
```

## Configuration Checklist

- Gateway or storage endpoint connectivity is available.
- Tenant context is supplied by trusted metadata.
- Payload size limits are configured.
- Retry behavior is safe for duplicate submissions.
