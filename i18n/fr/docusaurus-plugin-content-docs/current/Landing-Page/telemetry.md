# Télémétrie de la Landing Page

La télémétrie de la landing doit préserver la vie privée et rester séparée de la
télémétrie opérationnelle du Dashboard.

## Événements recommandés

- vue de page ;
- clic sur un lien de documentation ;
- soumission d'un formulaire de contact ou de démo ;
- version de build et environnement de déploiement.

## À ne pas collecter

- JWT ou cookies de refresh du Dashboard ;
- tokens de déploiement ;
- secrets agent ;
- métadonnées d'infrastructure privées ;
- données de vulnérabilités.
