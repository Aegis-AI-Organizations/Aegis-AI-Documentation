# Quickstart | Agent Aegis

L'agent Aegis est une sonde Rust légère installée dans l'infrastructure cliente. Il s'enregistre auprès de l'API Gateway, stocke localement son secret opérationnel, envoie des heartbeats et téléverse les payloads de topologie via des URL de stockage présignées.

## Prérequis

1. Un accès owner ou admin au Dashboard Aegis.
2. Un token de déploiement valide au format `ag_<43+ caractères URL-safe>`.
3. Un accès HTTPS sortant depuis l'hôte vers la Gateway.

## Lancer avec Docker

```bash
docker run -d \
  --name aegis-agent \
  --restart unless-stopped \
  --read-only \
  --cap-drop=ALL \
  -e GATEWAY_URL="https://api.aegis-ai.fr" \
  -e DEPLOYMENT_TOKEN="<VOTRE_TOKEN_DE_DEPLOIEMENT>" \
  -e AGENT_NAME="$(hostname)-aegis-agent" \
  -v aegis-agent-state:/var/lib/aegis-agent \
  ghcr.io/aegis-ai/aegis-agent:latest
```

Le token de déploiement sert uniquement au premier enregistrement. La Gateway retourne ensuite un `agent_id` et un `agent_secret`; l'agent utilise ce secret pour les heartbeats et les URL d'upload.

## Vérifier l'agent

Dans le Dashboard, ouvrez le tableau de bord sécurité et consultez le panneau d'état des agents :

- `Agents déployés` doit augmenter après l'enregistrement.
- `Actifs` doit augmenter après le premier heartbeat.
- `Dernière remontée` doit se mettre à jour régulièrement.

Pour une vérification locale :

```bash
curl http://127.0.0.1:8081/health
```

## Développement local

N'autorisez HTTP que pour les environnements locaux :

```bash
export GATEWAY_URL="http://localhost:8080"
export DEPLOYMENT_TOKEN="ag_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg"
export AGENT_NAME="local-agent-01"
export AGENT_ALLOW_HTTP="true"
cargo run
```

## Sécurité du token

Le token de déploiement est secret et n'est affiché qu'une seule fois après l'activation du compte ou une rotation. S'il fuit, révoquez-le ou faites une rotation depuis les paramètres du Dashboard avant de déployer de nouveaux agents.
