# Architecture infrastructure

Aegis s'exécute comme un ensemble de services Kubernetes. Le trafic public atteint le Dashboard et la Gateway; les services backend communiquent via endpoints internes et gRPC.

```mermaid
flowchart LR
    User[Navigateur] --> Dashboard
    Dashboard --> Gateway[API Gateway]
    Agent[Agent Aegis] --> Gateway
    Gateway --> Brain
    Brain --> Temporal
    Brain --> Postgres[(Postgres)]
    Brain --> Neo4j[(Neo4j)]
    Brain --> Redis[(Redis)]
    Brain --> Storage[(Stockage objet)]
    Temporal --> Workers[Pods workers]
```

## Principes

- Limiter l'ingress public aux composants nécessaires.
- Attacher l'identité tenant à chaque opération backend.
- Utiliser secrets/config maps au lieu d'identifiants codés en dur.
- Traiter les workers comme des unités isolées et remplaçables.
