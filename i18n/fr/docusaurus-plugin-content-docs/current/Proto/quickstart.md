# Quickstart Proto

## Générer les stubs

Depuis le dépôt proto :

```bash
buf generate
```

Les fichiers générés sont consommés par :

- `Aegis-AI-Api-Gateway` pour les clients gRPC Go ;
- `Aegis-AI-Brain` pour les services gRPC Python.

## Workflow de changement

1. Modifier la définition `.proto`.
2. Régénérer les stubs.
3. Mettre à jour ensemble les handlers de la Gateway et les services du Brain.
4. Mettre à jour `openapi.yaml` lorsque le contrat est exposé en REST.
5. Ajouter ou adapter les tests dans les deux consommateurs.

## Checklist de revue

- Les numéros de champs sont stables.
- Les nouveaux champs sont optionnels ou ont des valeurs par défaut sûres.
- La sémantique des erreurs est documentée.
- Les exigences de métadonnées tenant et auth sont claires.
