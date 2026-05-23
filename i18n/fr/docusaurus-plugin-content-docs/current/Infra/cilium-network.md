# Network policies

Les network policies réduisent le rayon d'impact entre services Aegis et pods workers.

## Objectifs

- Autoriser l'ingress public uniquement si nécessaire.
- Autoriser Dashboard vers Gateway.
- Autoriser Gateway vers Brain et infrastructure requise.
- Autoriser Brain vers bases, queues, stockage et Temporal.
- Restreindre les workers aux cibles et endpoints backend approuvés.
