# Quickstart Worker Fixer

## Développement local

```bash
go test ./...
go run ./cmd/fixer
```

## Build du conteneur

```bash
docker build -t aegis-worker-fixer .
```

## Checklist d'implémentation

- Ajouter des tests unitaires pour chaque règle de remédiation.
- Garder la sortie structurée.
- S'assurer que les patchs générés sont cloisonnés au tenant.
- Retourner des erreurs actionnables au Brain plutôt que de paniquer.
