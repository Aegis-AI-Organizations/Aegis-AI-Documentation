# Autoscaling avec KEDA

KEDA peut scaler les workers Aegis selon la demande de queue ou workflow. Il est utile pour les charges de scan et d'ingestion par pics.

## Workloads candidats

- workers pentest;
- workers ingest;
- workers deployer;
- workers fixer.

## Principes

- Définir un maximum de réplicas sûr.
- Réserver scale-to-zero aux workers stateless.
- Vérifier que le cold start est acceptable.
- Surveiller queue lag et taux d'erreur, pas seulement le nombre de réplicas.
