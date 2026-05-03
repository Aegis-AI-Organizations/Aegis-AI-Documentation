# API de l'Agent 🤖

Cette section documente les points de terminaison utilisés par les agents Aegis pour s'enregistrer et communiquer avec le Brain via l'API Gateway.

## Authentification

Toutes les requêtes (sauf l'enregistrement) nécessitent un **Deployment Token** fourni dans l'en-tête `Authorization`.

```http
Authorization: Bearer ag_xxxxxxxxxxxx
```

---

## Enregistrement de l'Agent

Utilisé par l'agent lors de son premier démarrage pour obtenir un identifiant unique.

### Endpoint

`POST /api/agents/register`

### Corps de la requête (JSON)

| Champ   | Type     | Description                                |
| :------ | :------- | :----------------------------------------- |
| `token` | `string` | Le token de déploiement de l'organisation. |
| `name`  | `string` | Un nom convivial pour identifier l'agent.  |

### Exemple

```bash
curl -X POST https://api.aegis.ai/api/agents/register \
  -H "Content-Type: application/json" \
  -d '{
    "token": "ag_b249734f2f664f1787e43156fe54cd35",
    "name": "Agent-Local-01"
  }'
```

### Réponse (200 OK)

```json
{
  "agent_id": "dc91b2f3-905e-494f-b6ce-3fbfef8fc4c2"
}
```

---

## Mise à jour du Statut

Permet à l'agent d'envoyer des battements de cœur (heartbeats) et de notifier son état actuel.

### Endpoint

`POST /api/agents/{agent_id}/status`

### Corps de la requête (JSON)

| Champ    | Type     | Valeurs possibles                     |
| :------- | :------- | :------------------------------------ |
| `status` | `string` | `IDLE`, `RUNNING`, `ERROR`, `OFFLINE` |

### Exemple

```bash
curl -X POST https://api.aegis.ai/api/agents/dc91b2f3.../status \
  -H "Authorization: Bearer ag_b249734f2f664f1787e43156fe54cd35" \
  -d '{"status": "RUNNING"}'
```

---

## Obtention d'un lien d'Upload

Utilisé pour obtenir une URL présignée MinIO afin d'uploader des fichiers de télémétrie ou des logs.

### Endpoint

`GET /api/agents/{agent_id}/upload-url?filename={name}`

### Paramètres de requête

| Paramètre  | Type     | Description                                 |
| :--------- | :------- | :------------------------------------------ |
| `filename` | `string` | Nom du fichier à uploader (ex: `logs.zip`). |

### Réponse (200 OK)

```json
{
  "url": "https://s3.aegis.ai/aegis-ingest/agents/.../20260503_test.txt?X-Amz-...",
  "method": "PUT"
}
```

---

> [!TIP]
> L'API Gateway met en cache la validation des tokens de déploiement pendant **30 minutes** dans Redis pour garantir des performances optimales sous forte charge.
