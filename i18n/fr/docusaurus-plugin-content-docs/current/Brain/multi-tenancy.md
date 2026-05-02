# Architecture Multi-Tenancy

Aegis AI a été conçu dès le départ comme une plateforme nativement multi-tenants. Elle assure une isolation logique stricte entre les différentes organisations tout en partageant la même infrastructure sous-jacente et le même moteur d'orchestration.

## Mécanisme de l'Isolation Principale

La plateforme utilise un modèle de **Schéma Partagé, Accès Restreint** (Shared Schema, Scoped Access). Au lieu de bases de données séparées par entreprise, l'isolation est imposée aux niveaux applicatif et des requêtes grâce à un filtre obligatoire `company_id`.

### 1. Propagation de l'Identité

Le cycle de vie de l'isolation commence dès l'authentification :

- **Revendications JWT (Claims)** : Chaque jeton d'accès émis contient une revendication `company_id` dans son payload.
- **Métadonnées gRPC** : L'API Gateway extrait cette revendication et l'injecte dans les métadonnées gRPC (`x-company-id`) pour tous les appels vers le Brain.
- **Contexte des Handlers** : Le service Brain utilise un décorateur Python (`@with_identity`) pour extraire cet identifiant et le rendre disponible pour la logique interne.

### 2. Application au niveau SQL

Chaque requête de base de données interférant avec des données appartenant à un locataire (Scans, Vulnérabilités, Preuves) doit inclure une clause `WHERE company_id = %s`.

```python
# Exemple d'isolation au niveau de la ligne dans le service Brain
cur.execute(
    """
    SELECT id, status FROM scans
    WHERE id = %s AND company_id = %s
    """,
    (scan_id, company_id),
)
```

### 3. Orchestration des Ressources

Lorsqu'un scan est envoyé à **Temporal**, le `company_id` est inclus dans les entrées du workflow. Cela garantit que :

- **Isolation des Workers** : Les rapports et les journaux sont marqués avec le propriétaire correct.
- **Scaling KEDA** : Les futures itérations permettront de dimensionner les pools de workers en fonction de la charge spécifique d'un locataire.

## Garanties de Sécurité

- **Aucune Fuite entre Locataires** : Un utilisateur de l'Entreprise A ne peut jamais consulter ou modifier des ressources appartenant à l'Entreprise B.
- **Validation Zero-Trust** : Chaque microservice vérifie indépendamment la signature du JWT pour empêcher l'usurpation d'identité interne.
- **Intégrité Relationnelle** : Les contraintes de clé étrangère garantissent que toutes les données relationnelles (ex: vulnérabilités) appartiennent intrinsèquement au même locataire que la ressource parente (ex: scan).

## Isolation des Sondes (Tokens de Déploiement)

Pour permettre aux sondes externes (Agents Aegis) de renvoyer de la télémétrie de sécurité à la plateforme sans nécessiter d'identifiants utilisateur complets, la plateforme émet des **Tokens de Déploiement**.

- **Structure** : Les tokens sont des chaînes hexadécimales de 32 caractères préfixées par `ag_` (ex: `ag_8f3d...`).
- **Lien avec l'Organisation** : Chaque token est lié de manière unique à un `company_id`.
- **Vérification Sans État** : Lorsqu'un Agent pousse des données, le Brain vérifie le token par rapport à la base de données pour identifier le locataire correct.
- **Révocation** : Si un token est compromis, il peut être régénéré, ce qui invalide immédiatement l'ancien et coupe l'accès pour ce déploiement de sonde spécifique.
