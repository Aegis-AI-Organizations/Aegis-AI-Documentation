# Endpoints | Aegis-AI-Api-Gateway

All endpoints (except `/auth/login`) require a valid JWT token passed in the `Authorization` header.

## Security

- **Header**: `Authorization: Bearer <access_token>`

## Authentication

- `POST /auth/login`: Authenticate and retrieve a token.
- `POST /auth/refresh`: Refresh an expired access token using a cookie.
- `POST /auth/logout`: Revoke session and logout.

## Scans (Real-time SSE)

- `GET /scans/stream`: Start a global SSE stream for all scan updates.
- `GET /scans/{id}/stream`: Start an SSE stream for a specific scan.

## Scans (Standard)

- `POST /scans`: Create a new scan.
- `GET /scans`: List all scans for the current company.
- `GET /scans/{id}`: Get a specific scan status.
- `GET /scans/{id}/report`: Download a PDF report.
- `GET /scans/{id}/vulnerabilities`: List vulnerabilities for a scan.
- `GET /vulnerabilities/{id}/evidences`: Get loot and evidence blocks.
