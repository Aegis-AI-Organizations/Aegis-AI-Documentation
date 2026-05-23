# Quickstart Worker Fixer

## Développement local

```bash
go test ./...
go run ./cmd/fixer
```

## Build conteneur

```bash
docker build -t aegis-worker-fixer .
```

Chaque règle de remédiation doit être testée, structurée et bornée par le tenant.
