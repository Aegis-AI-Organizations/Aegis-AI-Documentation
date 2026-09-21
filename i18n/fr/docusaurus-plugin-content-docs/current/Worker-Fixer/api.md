# API Worker Fixer

Le Worker Fixer n'expose pas d'API REST publique. C'est un worker backend piloté
par Brain ou l'orchestration de workflow ; les validations côté client,
l'historique d'audit et les permissions passent par Brain et le Dashboard.

## Opérations internes

| Opération                  | Objectif                                                                       |
| -------------------------- | ------------------------------------------------------------------------------ |
| Proposer une remédiation   | Transformer une vulnérabilité confirmée + contexte en proposition de correctif |
| Obtenir le statut          | Retourner l'état courant d'une tâche de remédiation                            |
| Abandonner une proposition | Écarter une proposition générée non acceptée                                   |

## Entrées requises

- identifiant tenant / workflow ;
- vulnérabilité confirmée et sa preuve ;
- contexte de remédiation (asset affecté, type de service, version, emplacement du
  code ou de la config) ;
- contraintes (`allow_patch_apply`, `allow_pr_create` — désactivées par défaut).

## Sorties

- id de proposition ;
- texte de patch ou diff, plus une justification lisible ;
- référence cible (fichier, manifest ou clé de configuration) ;
- statut : `pending`, `ready`, `failed` ;
- détails d'erreur en cas d'échec de génération.

## Règles de sécurité

- Privilégier une remédiation style pull request plutôt qu'une mutation directe.
- Ne jamais appliquer de patch ni pousser de changement Git sauf autorisation
  explicite du workflow.
- Enregistrer acteur, tenant, finding et changement généré pour chaque proposition.
- Garder les secrets hors des patchs et des logs.
- Valider les changements générés avant de les présenter aux utilisateurs.
