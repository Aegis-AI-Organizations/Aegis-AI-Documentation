# Assistance LLM pour les payloads

Aegis peut utiliser des LLM pour proposer des payloads candidats et des explications de remédiation. Cette capacité reste encadrée par des contrôles de sécurité et ne remplace pas la validation déterministe.

## Usages prévus

- Proposer des payloads pour les classes supportées.
- Adapter les entrées de test au comportement observé.
- Résumer les preuves techniques dans les rapports.
- Produire des recommandations de remédiation après confirmation.

## Limites de sécurité

- Ne jamais envoyer secrets, identifiants, tokens ou données privées brutes à un fournisseur externe.
- Exécuter les payloads offensifs uniquement dans les workflows contrôlés.
- Stocker les preuves issues du worker, pas des affirmations du modèle.
- Valider déterministiquement avant de confirmer une vulnérabilité.
