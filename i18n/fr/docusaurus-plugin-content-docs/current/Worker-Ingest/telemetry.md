# Télémétrie du Worker Ingest

## Métriques recommandées

- payloads reçus ;
- payloads rejetés pour schéma ou taille ;
- latence de traitement ;
- nombre de retries ;
- échecs d'écriture en stockage ;
- profondeur de file lorsqu'une file est utilisée.

## Logs

Les logs doivent inclure des identifiants sûrs pour le tenant et des clés
d'objets, pas le contenu brut des payloads, sauf activation explicite dans un
environnement de debug local.
