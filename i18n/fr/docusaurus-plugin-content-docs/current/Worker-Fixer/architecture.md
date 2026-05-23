# Architecture Worker Fixer

Le Worker Fixer transforme des vulnérabilités confirmées en propositions de remédiation sûres ou en changements contrôlés.

## Responsabilités

- Consommer les vulnérabilités confirmées et leur contexte.
- Produire des propositions de patch.
- Garder chaque action auditable.
- Éviter toute mutation destructive sans autorisation workflow.

## Règles de sécurité

- Préférer des pull requests à la mutation directe.
- Enregistrer acteur, tenant, finding et changement généré.
- Garder les secrets hors des patchs et logs.
- Valider les changements avant présentation utilisateur.
