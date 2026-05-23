# Quickstart Worker Ingest

## Développement local

```bash
cargo build
cargo test
cargo run
```

## Build conteneur

```bash
docker build -t aegis-worker-ingest .
```

## Checklist configuration

- Connectivité Gateway ou stockage disponible.
- Contexte tenant fourni par métadonnées fiables.
- Limites de taille configurées.
- Retries sûrs en cas de doublon.
