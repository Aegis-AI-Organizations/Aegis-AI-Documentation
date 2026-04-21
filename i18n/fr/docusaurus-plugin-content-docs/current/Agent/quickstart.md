# Quickstart | Agent Aegis (Rust)

L'Agent Aegis est une sonde légère écrite en Rust qui doit être installée sur l'infrastructure du client pour collecter de la télémétrie de sécurité et la renvoyer au Brain.

## Prérequis

1.  Avoir un accès **Propriétaire** (Owner) à votre organisation sur le Dashboard Aegis.
2.  Avoir généré ou récupéré votre **Deployment Token** (`ag_...`) dans la section Administration.

## Installation Rapide (Docker)

La méthode recommandée pour déployer l'agent est d'utiliser Docker. Utilisez la commande suivante en remplaçant `<VOTRE_TOKEN>` par votre jeton :

```bash
docker run -d \
  --name aegis-agent \
  -e AEGIS_DEPLOYMENT_TOKEN="<VOTRE_TOKEN>" \
  -e AEGIS_BRAIN_URL="https://api.aegis.ai" \
  ghcr.io/aegis-ai/aegis-agent:latest
```

## Vérification

Une fois l'agent lancé, vous devriez voir apparaître de nouveaux flux de télémétrie dans votre Dashboard sous l'onglet "Infrastructure".

- **Statut** : Connecté
- **Battement de cœur (Heartbeat)** : < 1 min

## Sécurité des Tokens

> [!IMPORTANT]
> Le `deployment_token` est strictement confidentiel. Il permet à n'importe quelle sonde d'envoyer des données à votre organisation. Si vous pensez qu'il a été compromis, régénérez-le immédiatement depuis le Dashboard Administration.
