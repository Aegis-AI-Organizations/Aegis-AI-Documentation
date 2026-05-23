# API de l'agent

Cette page documente les endpoints Gateway utilisés par les agents Aegis.

## Authentification

L'enregistrement utilise le token de déploiement de l'entreprise :

```http
Authorization: Bearer ag_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg
```

Après l'enregistrement, la Gateway retourne un `agent_secret`. Les routes opérationnelles utilisent ce secret :

```http
Authorization: Bearer <AGENT_SECRET>
```

## Enregistrer un agent

```http
POST /api/agents/register
```

Corps de requête :

| Champ   | Type     | Obligatoire | Description                           |
| ------- | -------- | ----------- | ------------------------------------- |
| `token` | `string` | Oui         | Token de déploiement de l'entreprise. |
| `name`  | `string` | Non         | Nom lisible de l'agent.               |

Exemple :

```bash
curl -X POST https://api.aegis-ai.fr/api/agents/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ag_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg" \
  -d '{
    "token": "ag_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg",
    "name": "prod-node-01"
  }'
```

Réponse :

```json
{
  "agent_id": "dc91b2f3-905e-494f-b6ce-3fbfef8fc4c2",
  "agent_secret": "secret-value"
}
```

## Envoyer un heartbeat

```http
POST /api/agents/{agent_id}/status
```

Corps de requête :

```json
{
  "status": "RUNNING"
}
```

Les statuts supportés sont `IDLE`, `RUNNING`, `ERROR` et `OFFLINE`.

## Demander une URL d'upload

```http
GET /api/agents/{agent_id}/upload-url?filename=topology.json
```

Réponse :

```json
{
  "url": "https://storage.example/presigned-url",
  "method": "PUT"
}
```

## État des agents dans le Dashboard

Les utilisateurs du Dashboard peuvent lire l'état agrégé des agents avec :

```http
GET /api/agents/status
```

Réponse :

```json
{
  "total_agents": 1,
  "active_agents": 1,
  "inactive_agents": 0,
  "last_seen": "2026-05-23T10:00:00Z"
}
```
