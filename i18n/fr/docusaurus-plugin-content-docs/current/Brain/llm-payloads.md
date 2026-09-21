# Assistance LLM aux payloads

Aegis peut utiliser une logique assistée par LLM pour aider à générer des payloads
candidats et des explications de remédiation. Cette capacité doit rester bornée
par des contrôles de sûreté et ne remplace pas la validation déterministe.

## Usage prévu

- Suggérer des payloads candidats pour les classes de vulnérabilités supportées.
- Adapter les entrées de test au comportement observé du service.
- Résumer les preuves techniques pour les rapports.
- Aider à produire des recommandations de remédiation après confirmation d'une
  vulnérabilité.

## Limites de sûreté

- Ne pas envoyer de secrets, d'identifiants client, de tokens ou de données
  privées brutes à des fournisseurs de modèles externes.
- N'exécuter des payloads offensifs qu'à l'intérieur de workflows de
  scan/sandbox contrôlés.
- Stocker les preuves produites par le worker, pas les affirmations du modèle.
- Exiger une validation déterministe avant de marquer une vulnérabilité comme
  confirmée.

## Interaction avec le worker

Le Worker Pentest doit traiter la sortie du modèle comme des candidats d'entrée.
Le worker reste responsable de :

- l'exécution des requêtes ;
- la capture des réponses ;
- l'extraction des preuves ;
- la classification de sévérité ;
- l'upload des preuves ;
- le reporting du statut final.

## Données de prompt

Le contexte de prompt autorisé doit se limiter à des métadonnées techniques
telles que le type de service, la version, la classe d'erreur, les motifs de
codes de statut HTTP et des extraits de réponse assainis.
