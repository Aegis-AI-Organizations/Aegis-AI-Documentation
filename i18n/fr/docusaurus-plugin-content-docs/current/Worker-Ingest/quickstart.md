# Quickstart Worker Ingest

## Développement local

```bash
cargo build
cargo test
cargo run
```

## Build du conteneur

```bash
docker build -t aegis-worker-ingest .
```

## Checklist de configuration

- La connectivité vers l'endpoint Gateway ou stockage est disponible.
- Le contexte tenant est fourni par des métadonnées de confiance.
- Les limites de taille de payload sont configurées.
- Le comportement de retry est sûr pour les soumissions en double.
