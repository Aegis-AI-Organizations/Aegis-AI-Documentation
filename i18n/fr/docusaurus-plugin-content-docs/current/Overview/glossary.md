# Glossaire

| Terme                        | Définition                                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| **Agent**                    | Sonde Rust installée sur l'infrastructure client. S'enregistre, envoie des heartbeats, découvre la topologie, upload des payloads. |
| **Agent Crew**               | Worker Temporal basé sur CrewAI qui coordonne les agents LLM `Planner`, `Guider` et `Executor`.      |
| **Secret agent**             | Identifiant opérationnel par agent renvoyé une seule fois à l'enregistrement ; haché bcrypt côté serveur. |
| **Chemin d'attaque**         | Une chaîne de relations dans le graphe Neo4j d'un point d'entrée vers un asset sensible.              |
| **Brain**                    | Service cœur Python : logique métier gRPC, orchestration Temporal, persistance, reporting.            |
| **Entreprise / Tenant**      | Une organisation cliente. L'unité d'isolation ; identifiée par `company_id`.                          |
| **Token de déploiement**     | Identifiant à usage unique, par entreprise (`ag_<43+ car. URL-safe>`), utilisé uniquement pour le premier enregistrement d'agent. |
| **Jumeau numérique**         | Réplique sandbox isolée de (tout ou partie de) la topologie client, construite par scan. Tout le trafic offensif la cible. |
| **Preuve (Evidence)**        | Preuve technique attachée à une vulnérabilité (`payload_used`, `loot_data` JSONB).                    |
| **Finding**                  | Vulnérabilité candidate ou confirmée produite par un worker ou l'Agent Crew.                          |
| **Worker Fixer**             | Worker Go qui transforme les vulnérabilités confirmées en propositions de remédiation (style PR, non destructif). |
| **Gateway**                  | Service Go/Gin ; unique point d'entrée public REST/SSE. Traduit le REST en gRPC interne.              |
| **GitOps / App-of-Apps**     | Modèle de déploiement où Argo CD synchronise le cluster depuis Git ; une application Argo CD racine gère les applications enfants. |
| **Heartbeat**                | Appel périodique `POST /api/agents/{id}/status` qui maintient un agent affiché comme actif.           |
| **Worker Ingest**            | Worker Rust qui normalise les lots de télémétrie agent en enregistrements backend.                    |
| **KEDA**                     | Autoscaler événementiel utilisé pour scaler les déploiements de workers selon la demande de files / workflows. |
| **Ledger**                   | Registre append-only des débits/crédits de tokens par entreprise ; alimente les vues solde et usage. |
| **Loot**                     | Données extraites d'une cible lors de l'exploitation, stockées comme preuve assainie.                 |
| **mTLS**                     | TLS mutuel. Client et serveur présentent et valident des certificats (Gateway ↔ Brain).              |
| **Graphe Neo4j**             | Magasin graphe des hôtes, conteneurs, services, images, namespaces, scans, vulnérabilités et leurs arêtes. |
| **Mode non destructif**      | Ensemble de contraintes (`mode: non_destructive`) interdisant mutation de sandbox, exécution de commandes, application de patch, création de PR. |
| **Ollama**                   | Runtime LLM in-cluster servant les modèles de l'Agent Crew ; exposé via ClusterIP.                   |
| **Worker Pentest**           | Worker Python exécutant des tests de vulnérabilités déterministes (SQLi, XSS, …) et capturant des preuves. |
| **URL présignée**            | URL de stockage éphémère émise par la Gateway pour que l'agent fasse un `PUT` sans identifiant permanent. |
| **Proto**                    | Le dépôt `Aegis-AI-Proto` : source de vérité unique des contrats gRPC.                                |
| **Refresh token**            | Cookie HTTP-only servant à tourner l'access token JWT ; révocable côté serveur.                       |
| **Saga / Workflow**          | Un workflow Temporal durable ; résiste aux redémarrages de pods et partitions réseau.                |
| **Sandbox / War-room**       | Le namespace Kubernetes éphémère (`aegis-war-room-<scan-id>` / `sandbox-*`) hébergeant un jumeau numérique. |
| **Scan**                     | Une exécution de test d'intrusion contre un jumeau numérique. Possède un statut, des findings, des preuves et un rapport PDF. |
| **SSE**                      | Server-Sent Events. Flux unidirectionnel de la Gateway vers le Dashboard pour les mises à jour scan / équipe en direct. |
| **Temporal**                 | Moteur de workflows qui rend l'orchestration de scan durable et rejouable.                            |
| **Token (facturation)**      | Unité d'usage de la plateforme mesurée contre un solde d'entreprise.                                  |
| **Topologie**                | L'inventaire découvert par l'agent : hôtes, conteneurs, services et objets Kubernetes.               |
| **`vuln-app`**               | Une application volontairement vulnérable utilisée comme contenu de jumeau numérique pour tester le pipeline de pentest. |
