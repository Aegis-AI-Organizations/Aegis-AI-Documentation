# Architecture Aegis AI Agent Crew

## Objectif

`Aegis-AI-Agent-Crew` fournit l'image Docker d'orchestration pentest CrewAI pour Aegis. L'image doit tourner dans le cluster Kubernetes Aegis et coordonner trois agents locaux basés sur Ollama : `Planner`, `Guider` et `Executor`.

Le service n'est pas l'orchestrateur de plateforme. `Aegis-AI-Brain` reste responsable des workflows de scan via Temporal. `Aegis-AI-Worker-Deployer` reste responsable du déploiement et du cleanup de la sandbox. Agent Crew est un worker Temporal spécialisé appelé par Brain pendant la phase de pentest.

## Objectif de déploiement V1

Le repository doit publier une image Docker déployable par Aegis. L'image supporte deux modes :

- `CREWAI_MODE=worker` : connexion à Temporal et traitement des activités `run_crew_pentest` depuis `CREWAI_TASK_QUEUE`.
- `CREWAI_MODE=cli` : conservation du comportement local de debug avec exécution directe de `src/main.py`.

Le mode worker est le chemin de production pour Aegis. Le mode CLI reste disponible pour le debug local et l'itération sur les prompts/modèles.

## Design conteneur

L'image est basée sur Python 3.12 slim et contient seulement les dépendances runtime de `requirements.txt` ainsi que le code applicatif `src/`.

Exigences conteneur :

- Exécuter avec un utilisateur non-root.
- Utiliser des logs Python non bufferisés.
- Lire la configuration uniquement depuis les variables d'environnement.
- Echouer rapidement avec des logs clairs si les paramètres Temporal ou Ollama requis manquent.
- Ne pas embarquer les modèles Ollama dans l'image applicative.

Ollama est déployé séparément dans le cluster Aegis et exposé via un service ClusterIP interne.

## Configuration runtime

Valeurs par défaut du déploiement Aegis :

```text
CREWAI_MODE=worker
TEMPORAL_HOST=aegis-temporal-mvp-frontend.aegis-system.svc.cluster.local:7233
TEMPORAL_NAMESPACE=default
CREWAI_TASK_QUEUE=CREWAI_TASK_QUEUE
PLANNER_PROVIDER=ollama
PLANNER_MODEL=llama3.1:8b
PLANNER_API_BASE=http://ollama-mvp.aegis-system.svc.cluster.local:11434
GUIDER_PROVIDER=ollama
GUIDER_MODEL=whiterabbitneo
GUIDER_API_BASE=http://ollama-mvp.aegis-system.svc.cluster.local:11434
EXECUTOR_PROVIDER=ollama
EXECUTOR_MODEL=deepseek-coder-v2
EXECUTOR_API_BASE=http://ollama-mvp.aegis-system.svc.cluster.local:11434
```

L'image peut continuer à supporter les providers compatibles OpenAI via l'abstraction existante, mais le déploiement MVP utilise Ollama dans le cluster.

## Contrat activité Temporal

Le worker expose une activité :

```text
run_crew_pentest
```

Entrée :

```json
{
  "scan_id": "scan-id",
  "sandbox_endpoint": {
    "host": "portfolio-frontend.aegis-war-room-scan-id.svc.cluster.local",
    "port": 80,
    "scheme": "http"
  },
  "targets": [
    {
      "path": "/",
      "label": "portfolio frontend",
      "target_name": "portfolio-frontend",
      "criticality": 60,
      "score": 5998
    }
  ],
  "topology_summary": {
    "workloads": [],
    "services": [],
    "routes": []
  },
  "seed_contract": {},
  "constraints": {
    "mode": "non_destructive",
    "allow_patch_apply": false,
    "allow_pr_create": false
  }
}
```

Sortie :

```json
{
  "status": "COMPLETED",
  "summary": "CrewAI pentest completed.",
  "findings": [],
  "agent_trace": {
    "planner": "Résumé du raisonnement Planner.",
    "guider": "Résumé de l'évaluation de risque Guider.",
    "executor": "Résumé des tools Executor."
  },
  "final_report_markdown": "# CrewAI Pentest Report\n\nLe scan est terminé avec des findings appuyés par preuves et des recommandations de remédiation."
}
```

Brain mappe `findings[]` vers des lignes de vulnérabilités et stocke `final_report_markdown` ainsi que `agent_trace` comme artefacts de rapport/debug.

## Responsabilités des agents CrewAI

`Planner` utilise `llama3.1:8b` pour analyser les métadonnées cible, chemins exposés, ports et contexte topologique, puis produire un plan ordonné.

`Guider` utilise `whiterabbitneo` pour transformer le plan en instructions de test priorisées par risque et hypothèses de vulnérabilités probables.

`Executor` utilise `deepseek-coder-v2` pour exécuter les tools read-only autorisés, confirmer les findings et produire des patchs prêts à appliquer sous forme texte ou diff.

## Limites de sécurité

La V1 est non destructive.

Actions autorisées :

- Requêtes HTTP `GET`, `HEAD` et `OPTIONS` contre les endpoints sandbox.
- Probes TCP de reachability.
- Analyse de headers et réponses.
- Vérifications d'exposition de configuration publique.
- Génération de texte de patch.

Actions interdites :

- Modifier la sandbox.
- Exécuter des commandes dans les pods cibles.
- Ecrire des ressources Kubernetes.
- Appliquer des patchs.
- Pousser des changements Git.
- Créer des pull requests.
- Exécuter des payloads destructifs.

Le worker valide les contraintes avant d'exécuter la crew. Si une entrée demande un comportement destructif, l'activité échoue avant l'appel modèle.

## Gestion des erreurs

- Si Temporal est injoignable, le conteneur quitte en mode worker.
- Si Ollama est injoignable, `run_crew_pentest` retourne un échec contrôlé avec un code d'erreur clair.
- Si un modèle timeout, la réponse identifie l'agent en échec.
- Si la sortie modèle n'est pas valide, le worker tente une normalisation locale une fois puis échoue avec une erreur de validation de schéma.
- Si l'endpoint sandbox est injoignable, le worker retourne un finding de reachability ou un échec partiel selon le point d'échec.

## Stratégie de tests

Tests minimum avant déploiement :

- `python -m compileall src` passe.
- Les tests unitaires valident le parsing de configuration et la sélection du mode.
- Les tests unitaires valident les schémas d'entrée et de sortie d'activité.
- Les tests unitaires vérifient l'application des contraintes non destructives.
- L'image Docker build localement.
- Le mode CLI peut s'exécuter avec endpoint Ollama configurable.
- Le mode worker échoue clairement si Temporal est indisponible.

Tests d'intégration après branchement Infra :

- Déployer Ollama et Agent Crew dans le cluster MVP.
- Lancer un scan topologie via Brain.
- Vérifier que Brain appelle `run_crew_pentest` sur `CREWAI_TASK_QUEUE`.
- Vérifier que les logs Agent Crew montrent l'exécution Planner, Guider et Executor.
- Vérifier que le scan atteint `COMPLETED`.
- Vérifier que les findings et artefacts de rapport sont persistés.
