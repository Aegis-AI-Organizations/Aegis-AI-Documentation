# Télémétrie Worker Ingest

## Métriques recommandées

- payloads reçus;
- payloads rejetés par schéma ou taille;
- latence de traitement;
- nombre de retries;
- erreurs d'écriture stockage;
- profondeur de queue si utilisée.

Les logs doivent contenir des identifiants sûrs et des clés d'objet, pas le contenu brut des payloads hors debug local explicite.
