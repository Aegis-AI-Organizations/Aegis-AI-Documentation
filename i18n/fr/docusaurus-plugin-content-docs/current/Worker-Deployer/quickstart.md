# Quickstart Worker Deployer

Le Worker Deployer construit la **sandbox jumeau numérique** isolée d'un scan puis
la détruit. Il est piloté par l'orchestration Brain, pas appelé directement par
les utilisateurs.

## Forme de la sandbox

À partir d'une requête de topologie, le Deployer crée le namespace
`aegis-war-room-<scan_id>` et rend :

- des workloads (`Deployment`, ou `StatefulSet` si `stateful: true`) ;
- des services (ports nommés, `headless`, `type`, `aliases` dans le même namespace) ;
- une network policy d'egress default-deny ;
- des services mock DNS/HTTP/HTTPS externes pour les dépendances externes déclarées.

Champs de fidélité de topologie supportés :

| Domaine                | Champs                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| Démarrage              | `command`, `args`, `working_dir`, `init_containers`                                              |
| Ordre de dépendance    | `depends_on` (ordre de création), `wait_for` (attente TCP d'init-container, ex. `postgres:5432`) |
| Fichiers / stockage    | `config_files`, `secret_files`, `empty_dirs`                                                     |
| Identité               | `stateful: true` → StatefulSet avec DNS stable                                                   |
| Ressources             | `resources.requests`, `resources.limits`                                                         |
| Sécurité               | `security_context`, `pod_security_context`                                                       |
| Politique de readiness | `required: true` fait échouer la création de sandbox si le workload n'est jamais prêt            |

Gérés ailleurs : restauration de dump de base de données (activités de seeding
Brain), réponses d'API externes riches / capture de trafic (runtime du mock
externe), virtual hosts ingress/TLS (manifests infra).

## Fixtures d'exemple

Le dépôt fournit une fixture vulnérable canonique :

- `examples/sandbox-topology.vulnerable-webapp.json` — web app vulnérable + PostgreSQL.
- `examples/sandbox-request.vulnerable-webapp.json` — requête `CreateSandbox` complète.

## Validation smoke

Après création d'une sandbox :

```bash
scripts/sandbox_smoke.sh --scan-id smoke-sqli-001
```

Passer un endpoint explicite si la réponse `CreateSandbox` en a renvoyé un autre :

```bash
scripts/sandbox_smoke.sh \
  --scan-id smoke-sqli-001 \
  --endpoint http://vulnerable-webapp.aegis-war-room-smoke-sqli-001.svc.cluster.local:80
```

Inspecter ou nettoyer un namespace :

```bash
scripts/sandbox_smoke.sh --namespace aegis-war-room-scan-123
scripts/sandbox_smoke.sh --scan-id smoke-sqli-001 --cleanup
```

Le script refuse de supprimer les namespaces ne commençant pas par
`aegis-war-room-`.

## Ce à quoi ressemble un bon résultat

- Le JSON de topologie valide et le namespace existe.
- Les network policies sont présentes ; les services incluent app, base de données
  et mock externe.
- `depends_on` crée les workloads base de données/cache avant les apps dépendantes.
- Deployments et pods deviennent prêts, ou affichent des erreurs actionnables.
- L'endpoint répond depuis l'intérieur du namespace.
- Les events ne montrent pas d'image pull non résolue, de mount refusé ou d'échec
  de scheduling.

## Débogage

```bash
kubectl describe namespace aegis-war-room-smoke-sqli-001
kubectl get all -n aegis-war-room-smoke-sqli-001 -o wide
kubectl logs -n aegis-war-room-smoke-sqli-001 deploy/vulnerable-webapp
kubectl get events -n aegis-war-room-smoke-sqli-001 --sort-by=.lastTimestamp
```

`ImagePullBackOff` signifie que l'image de l'app vulnérable référencée par la
fixture doit être publiée ou retaguée.
