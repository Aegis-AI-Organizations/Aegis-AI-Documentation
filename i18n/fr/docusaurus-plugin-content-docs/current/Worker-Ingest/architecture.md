# Architecture Worker Ingest

Le Worker Ingest est le composant d'ingestion de télémétrie. Dans le flux actuel, les agents demandent des URL d'upload à la Gateway et le stockage objet reçoit les payloads; l'Ingest peut normaliser ces flux ou lots entrants.

## Responsabilités

- Accepter ou traiter les payloads de télémétrie.
- Normaliser les événements.
- Préserver le contexte tenant depuis des métadonnées fiables.
- Transmettre la télémétrie vers stockage, queues ou analytics.

## Contraintes

- Ne pas faire confiance à l'identité tenant dans le contenu non signé.
- Valider taille et schéma des payloads.
- Rendre l'ingestion idempotente.
- Séparer payload brut et événements normalisés.
