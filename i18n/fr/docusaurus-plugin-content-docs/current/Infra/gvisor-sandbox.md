# Sandboxing workers

Les workers sécurité doivent tourner avec une isolation runtime et Kubernetes forte. gVisor peut servir de frontière lorsque le cluster le supporte.

## Contrôles recommandés

- conteneurs non-root;
- filesystem racine read-only si possible;
- capabilities Linux supprimées;
- requests/limits ressources;
- service accounts restreints;
- network policies autour des namespaces workers;
- runtime class `runsc` si disponible.

Le sandboxing est une défense en profondeur, pas un remplacement de l'autorisation workflow ou du scoping tenant.
