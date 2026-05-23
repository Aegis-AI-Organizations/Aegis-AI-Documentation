# Fixer Worker Quickstart

## Local Development

```bash
go test ./...
go run ./cmd/fixer
```

## Container Build

```bash
docker build -t aegis-worker-fixer .
```

## Implementation Checklist

- Add unit tests for every remediation rule.
- Keep output structured.
- Ensure generated patches are tenant-scoped.
- Return actionable errors to Brain instead of panicking.
