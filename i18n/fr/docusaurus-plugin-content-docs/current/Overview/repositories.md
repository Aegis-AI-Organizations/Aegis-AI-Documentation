# Dépôts

Aegis AI est un système multi-dépôts sous l'organisation GitHub
`Aegis-AI-Organizations`. Chaque dépôt porte une seule responsabilité et publie
son propre dossier `docs/`, que ce portail agrège au moment du build
(Docs-as-Code).

| Dépôt                     | Langage         | Déployable      | Responsabilité                                                              | Section du portail |
| ------------------------- | --------------- | --------------- | ------------------------------------------------------------------------ | ------------------ |
| `Aegis-AI-Proto`          | Protobuf / buf  | Bibliothèque    | Contrats gRPC ; génère les stubs Go, Python et Rust.                       | [Proto](../Proto/architecture.md) |
| `Aegis-AI-Api-Gateway`    | Go              | Oui             | Façade REST/SSE publique ; auth JWT et agent ; traduction REST↔gRPC.       | [API Gateway](../API/endpoints.md) |
| `Aegis-AI-Brain`          | Python          | Oui             | Logique métier cœur, orchestration Temporal, persistance, rapports PDF.    | [Brain](../Brain/workflows.md) |
| `Aegis-AI-Dashboard`      | TypeScript/React| Oui             | Console opérateur (agents, scans, vulnérabilités, facturation, admin).     | [Dashboard](../Dashboard/architecture.md) |
| `Aegis-AI-Landing`        | TypeScript/Next | Oui             | Site public marketing et confiance.                                       | [Landing Page](../Landing-Page/architecture.md) |
| `Aegis-AI-Agent`          | Rust            | Oui (client)    | Sonde côté client : enregistrement, heartbeat, découverte topologie, upload. | [Agent](../Agent/architecture.md) |
| `Aegis-AI-Agent-Crew`     | Python / CrewAI | Oui             | Worker Temporal coordonnant les agents LLM Planner/Guider/Executor (Ollama). | [Agent Crew](../Agent-Crew/architecture.md) |
| `Aegis-AI-Worker-Pentest` | Python          | Oui             | Tests de vulnérabilités déterministes et capture de preuves.               | [Worker · Pentest](../Worker-Pentest/architecture.md) |
| `Aegis-AI-Worker-Deployer`| Go              | Oui             | Construit et détruit la sandbox jumeau numérique.                         | [Worker · Deployer](../Worker-Deployer/architecture.md) |
| `Aegis-AI-Worker-Ingest`  | Rust            | Oui             | Normalise la télémétrie agent en enregistrements backend.                 | [Worker · Ingest](../Worker-Ingest/architecture.md) |
| `Aegis-AI-Worker-Fixer`   | Go              | Oui             | Transforme les vulnérabilités confirmées en propositions de remédiation.  | [Worker · Fixer](../Worker-Fixer/architecture.md) |
| `Aegis-AI-Infra`          | YAML / Helm     | Dépôt GitOps    | Manifests Kubernetes, App-of-Apps Argo CD, network policies, cert-manager, KEDA. | [Infrastructure](../Infra/architecture.md) |
| `Aegis-AI-Documentation`  | TypeScript/Docusaurus | Oui       | Ce portail. Agrège les `docs/` distants et la référence OpenAPI générée.   | — |
| `vuln-app`                | Python          | Cible de test   | Application volontairement vulnérable servant de contenu au jumeau numérique. | — |

## Répartition des langages

| Langage    | Dépôts                                                       | Choisi pour                       |
| ---------- | ---------------------------------------------------------- | -------------------------------- |
| Go         | API Gateway, Worker-Deployer, Worker-Fixer                 | concurrence, façade basse latence |
| Python     | Brain, Worker-Pentest, Agent-Crew                          | orchestration, outillage sécurité, écosystème LLM |
| Rust       | Agent, Worker-Ingest                                       | faible empreinte, fiabilité sur les hôtes clients |
| TypeScript | Dashboard, Landing Page, Documentation                     | interfaces web                    |
| Protobuf   | Proto                                                      | contrats typés multi-langages     |

## Conventions communes à tous les dépôts

- Chaque dépôt de service porte un dossier `docs/en/` et `docs/fr/` ; le portail
  Documentation récupère certains fichiers depuis `main` via
  `docusaurus-plugin-remote-content`.
- Chaque dépôt déployable fournit un `Dockerfile` et est déployé par Argo CD
  depuis `Aegis-AI-Infra/kubernetes/envs/mvp/`.
- Les dépôts exposant du gRPC régénèrent leurs stubs depuis `Aegis-AI-Proto` ; les
  changements de contrat sont additifs par défaut (voir
  [Proto · Architecture](../Proto/architecture.md)).
- La CI s'exécute sur des runners GitHub Actions isolés avec des tokens à portée
  restreinte.
