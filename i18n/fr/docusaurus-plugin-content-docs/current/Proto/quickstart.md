# Quickstart Proto

## Générer les stubs

```bash
buf generate
```

Les fichiers générés sont consommés par :

- `Aegis-AI-Api-Gateway` pour les clients Go;
- `Aegis-AI-Brain` pour les services Python.

## Workflow de changement

1. Modifier le `.proto`.
2. Régénérer les stubs.
3. Mettre à jour Gateway et Brain.
4. Mettre à jour `openapi.yaml` si le contrat est exposé en REST.
5. Ajouter ou adapter les tests.
