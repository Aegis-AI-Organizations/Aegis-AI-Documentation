# Installer et lancer l'agent Aegis sur une infrastructure

Ce guide explique comment connecter un hôte d'infrastructure réel à Aegis avec l'agent Rust.

## 1. Créer ou récupérer le token de déploiement

Depuis le Dashboard :

1. Ouvrez **Paramètres**.
2. Allez dans **Token agent**.
3. Lancez une rotation si aucun token valide n'est disponible.
4. Copiez immédiatement le token. Il n'est affiché qu'une seule fois.

Le token doit respecter ce format :

```text
ag_<43+ caractères URL-safe>
```

## 2. Choisir le mode d'installation

Utilisez Docker pour les plateformes conteneurisées et les déploiements rapides. Utilisez systemd pour les hôtes Linux où l'agent doit tourner comme service natif.

### Docker

```bash
docker volume create aegis-agent-state

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

### Linux systemd

Compilez ou téléchargez le binaire `aegis-ai-agent`, puis lancez l'installeur depuis le dépôt de l'agent :

```bash
cargo build --release
cp target/release/aegis-ai-agent .
sudo ./install.sh
```

Modifiez le fichier d'environnement créé par l'installeur :

```bash
sudo install -m 600 -o root -g root /dev/null /etc/aegis-agent/agent.env
sudo tee /etc/aegis-agent/agent.env >/dev/null <<'EOF'
GATEWAY_URL=https://api.aegis-ai.fr
DEPLOYMENT_TOKEN=<VOTRE_TOKEN_DE_DEPLOIEMENT>
AGENT_NAME=mon-hote-production
HEALTH_BIND_ADDR=127.0.0.1
HEALTH_PORT=8081
EOF
```

Démarrez le service :

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now aegis-agent.service
sudo systemctl status aegis-agent.service
```

## 3. Prérequis réseau

L'agent a besoin d'une connectivité sortante vers la Gateway :

| Destination                                        | Protocole | Usage                                                   |
| -------------------------------------------------- | --------- | ------------------------------------------------------- |
| `https://api.aegis-ai.fr`                          | HTTPS     | Enregistrement, heartbeats, récupération d'URL d'upload |
| URL de stockage présignée retournée par la Gateway | HTTPS PUT | Upload de topologie et de télémétrie                    |

Le serveur de santé local écoute sur `127.0.0.1:8081` par défaut. Ne l'exposez à distance que derrière vos propres contrôles réseau.

## 4. Configuration d'exécution

| Variable                     | Obligatoire              | Description                                                      |
| ---------------------------- | ------------------------ | ---------------------------------------------------------------- |
| `GATEWAY_URL`                | Non                      | URL de la Gateway. Par défaut : `https://api.aegis-ai.fr`.       |
| `DEPLOYMENT_TOKEN`           | Oui au premier lancement | Token à usage unique pour enregistrer l'agent.                   |
| `AGENT_NAME`                 | Non                      | Nom lisible affiché dans Aegis. Par défaut : `rust-agent-01`.    |
| `AGENT_ALLOW_HTTP`           | Local uniquement         | À mettre à `true` uniquement en développement local HTTP.        |
| `AGENT_SECRET_FILE_OVERRIDE` | Non                      | Chemin personnalisé pour persister `agent_id` et `agent_secret`. |
| `HEALTH_BIND_ADDR`           | Non                      | Adresse d'écoute du endpoint de santé. Par défaut : localhost.   |
| `HEALTH_PORT`                | Non                      | Port du endpoint de santé. Par défaut : `8081`.                  |

## 5. Flux d'enregistrement

Au premier démarrage, l'agent appelle :

```http
POST /api/agents/register
Authorization: Bearer <DEPLOYMENT_TOKEN>
Content-Type: application/json

{
  "token": "<DEPLOYMENT_TOKEN>",
  "name": "mon-hote-production"
}
```

La Gateway retourne `agent_id` et `agent_secret`. L'agent les stocke localement et utilise le secret pour :

- `POST /api/agents/{agent_id}/status`
- `GET /api/agents/{agent_id}/upload-url?filename=<nom>`

## 6. Vérification dans le Dashboard

Ouvrez le Dashboard. Tant qu'aucun agent n'existe, le panneau d'état des agents affiche un bouton vers ce guide. Après le démarrage de l'agent :

1. `Agents déployés` doit être au moins à `1`.
2. `Actifs` doit être au moins à `1`.
3. `Dernière remontée` doit se mettre à jour après chaque heartbeat.

Si le statut ne change pas, consultez les logs du service :

```bash
docker logs aegis-agent
# ou
sudo journalctl -u aegis-agent.service -f
```
