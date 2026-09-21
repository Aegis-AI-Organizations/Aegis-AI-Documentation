# Télémétrie Proto

Le dépôt proto n'émet pas de télémétrie runtime. Sa valeur opérationnelle est la
traçabilité des contrats.

## Ce qu'il faut suivre

- La version des stubs générés dans les commits de la Gateway et du Brain.
- Les revues de changements cassants avant merge.
- Les échecs de génération en CI.
- Les échecs de tests des consommateurs après un changement de contrat.

## Lien avec la documentation

Tout changement de proto exposé en REST doit être répercuté dans `openapi.yaml` et
dans la documentation du module concerné.
