# Endpoints | Aegis-AI-Api-Gateway

## Scans

### Real-time Status Updates (SSE)

- `GET /scans/stream`: Start a global SSE stream for all scan updates.
- `GET /scans/{id}/stream`: Start an SSE stream for a specific scan update for a single scan.

Data format (JSON):

```json
{
  "scan_id": "uuid",
  "status": "RUNNING"
}
```

## Scans (Standard)

- `POST /scans`: Create a new scan.
- `GET /scans`: List all scans.
- `GET /scans/{id}`: Get a specific scan by ID.
- `GET /scans/{id}/report`: Download a PDF report.
