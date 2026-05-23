# Contrats Protobuf

`Aegis-AI-Proto` est la source des contrats gRPC internes entre Gateway et Brain. Les stubs Go et Python générés doivent rester synchronisés avec les définitions `.proto`.

## Familles de services

| Service                | Usage                                         |
| ---------------------- | --------------------------------------------- |
| `AuthService`          | Login, refresh, logout, profil, activation    |
| `CompanyService`       | Entreprises, onboarding, utilisateurs, tokens |
| `AgentService`         | Enregistrement agent, statut, upload, listing |
| `ScanService`          | Cycle de vie scan, rapports, flux status      |
| `VulnerabilityService` | Findings et preuves                           |
| `BillingService`       | Solde, ledger, usage                          |
| `PingService`          | Santé et connectivité                         |

## Règle de compatibilité

Privilégier les changements additifs. Supprimer un champ, renuméroter ou changer la sémantique exige une mise à jour coordonnée de Gateway, Brain, tests et OpenAPI.
