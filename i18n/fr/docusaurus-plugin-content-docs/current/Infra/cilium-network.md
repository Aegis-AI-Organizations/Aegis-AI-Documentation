# Politiques réseau

Les politiques réseau réduisent le rayon d'impact entre les services Aegis et les
pods workers.

## Objectifs des politiques

- N'autoriser l'ingress public que là où c'est nécessaire.
- Autoriser le Dashboard à atteindre la Gateway par le chemin d'ingress configuré.
- Autoriser la Gateway à atteindre le Brain et l'infrastructure requise.
- Autoriser le Brain à atteindre bases de données, files, stockage et Temporal.
- Restreindre les workers aux cibles approuvées et aux endpoints backend.

## Checklist de revue

- Le default-deny est appliqué quand c'est praticable.
- Les namespaces de workers ne peuvent pas atteindre des services plateforme non
  liés.
- Les services de base de données n'acceptent le trafic que des charges attendues.
- L'egress DNS est explicitement autorisé quand l'egress default-deny est activé.
