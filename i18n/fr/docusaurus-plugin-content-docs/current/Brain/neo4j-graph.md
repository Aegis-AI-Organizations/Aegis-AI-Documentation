# Graphe de topologie Neo4j

Neo4j stocke les relations d'infrastructure et de sécurité qui sont plus faciles à analyser sous forme de graphe.

## Objectifs

- Représenter hôtes, conteneurs, services, images, namespaces, vulnérabilités et preuves.
- Relier la topologie découverte par les agents aux résultats de scans.
- Supporter l'analyse d'impact et de chemins d'attaque.
- Fournir du contexte aux rapports et à la remédiation.

## Nœuds typiques

| Nœud            | Description             |
| --------------- | ----------------------- |
| `Company`       | Frontière tenant        |
| `Agent`         | Sonde déployée          |
| `Host`          | Machine ou nœud observé |
| `Container`     | Workload runtime        |
| `Service`       | Endpoint exposé         |
| `Scan`          | Exécution pentest       |
| `Vulnerability` | Finding de sécurité     |

## Règle opérationnelle

Toute lecture de graphe destinée au Dashboard, rapports ou workers doit être contrainte par le contexte entreprise.
