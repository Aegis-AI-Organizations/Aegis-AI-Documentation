# Workflow de documentation

Ce portail (`Aegis-AI-Documentation`) est construit avec **Docusaurus 3** et suit
un modèle **Docs-as-Code** : l'essentiel du contenu est rédigé à côté du code
qu'il décrit, dans chaque dépôt de service, puis agrégé ici au moment du build.

## Sources de contenu

| Source                              | Ce qu'elle produit                                    | Emplacement |
| ----------------------------------- | --------------------------------------------------- | ----------- |
| `docusaurus-plugin-openapi-docs`    | Les 40+ pages de référence REST `Swagger-API/*`       | Générées depuis `openapi.yaml` vers `docs/Swagger-API/` |
| `docusaurus-plugin-remote-content`  | Un fichier par service, récupéré depuis le `main` du dépôt | `docs/<Service>/…` (en) et `i18n/fr/…/<Service>/…` (fr) |
| Pages écrites à la main             | Tout le reste (Vue d'ensemble, quickstarts, guides…) | Commitées directement dans `docs/` et `i18n/fr/…` |

### Fichiers synchronisés à distance

`docusaurus.config.ts` liste, par service, exactement quels fichiers sont tirés de
`https://raw.githubusercontent.com/Aegis-AI-Organizations/<repo>/main/docs/{en,fr}/…`.
Aujourd'hui il s'agit surtout de l'`architecture.md` de chaque service (plus
`endpoints.md` pour la Gateway, `workflows.md` pour Brain, `security-mtls.md` /
`infrastructure-keda.md` pour Infra).

:::warning
Le plugin distant **écrase les copies locales à chaque build**. Éditer un fichier
synchronisé à distance dans ce dépôt n'a aucun effet durable — modifiez-le dans le
dossier `docs/{en,fr}/` du dépôt de service propriétaire. Les copies commitées ici
sont en fait un cache.
:::

`Aegis-AI-Agent-Crew` n'est actuellement **pas** synchronisé (ses `docs/` ne sont
pas publics sur `main`) ; ses pages du portail sont maintenues à la main jusqu'à
ce que les deux blocs commentés de `docusaurus.config.ts` puissent être
réactivés.

## Structure du dépôt

```text
Aegis-AI-Documentation/
  docs/
    Overview/                 # écrit à la main, transverse au projet
    <Service>/                # mélange synchronisé + écrit à la main
    Swagger-API/              # généré (ne pas éditer à la main)
  i18n/fr/
    code.json                        # chaînes React/UI (accueil, <Translate>)
    docusaurus-theme-classic/        # navbar.json, footer.json
    docusaurus-plugin-content-docs/
      current.json                   # libellés de catégories de sidebar, generated-index
      current/<Service>/…            # pages de doc en français (même arbre que docs/)
  sidebars.ts                # sidebar explicite ; chaque page y est listée
  docusaurus.config.ts       # mapping remote-content, i18n, navbar/footer
  openapi.yaml               # source des pages Swagger-API
```

## Ajouter ou éditer une page

1. **Page écrite à la main** — créez `docs/<Section>/<page>.md`, ajoutez une
   sœur française sous
   `i18n/fr/docusaurus-plugin-content-docs/current/<Section>/`, et enregistrez
   l'id du doc dans `sidebars.ts`. Aucun frontmatter n'est nécessaire ; le premier
   titre `#` sert de titre et la sidebar définit l'ordre.
2. **Page appartenant à un service** — éditez `docs/{en,fr}/<file>.md` dans le
   dépôt du service. À la fusion sur `main`, `docs-sync.yml` déclenche un rebuild
   du portail (voir [Pipeline CI/CD](./ci-cd.md)). Ajoutez le fichier au bloc de
   ce service dans `docusaurus.config.ts` s'il est nouveau.
3. **Référence API** — éditez `openapi.yaml`, puis régénérez :
   ```bash
   npm run clean-api-docs all && npm run gen-api-docs all
   ```

## Internationalisation

La locale par défaut est `en` ; `fr` est une traduction complète.

- Pages de doc : reproduire le fichier sous
  `i18n/fr/docusaurus-plugin-content-docs/current/`. Un fichier français manquant
  bascule sur la page anglaise.
- Chaînes d'UI : `npm run write-translations -- --locale fr` génère les
  squelettes `code.json`, `navbar.json`, `footer.json` et `current.json` ;
  remplissez les valeurs `message`. Les traductions existantes sont préservées à
  la ré-exécution.
- La référence API est en anglais uniquement, par choix.

## Développement local

```bash
npm ci
npm run start                 # anglais, hot-reload
npm run start -- --locale fr  # français
npm run build                 # build de production des deux locales
npm run serve                 # servir le site construit
```

`npm run build` effectue des requêtes réseau en direct pour chaque entrée
remote-content ; un 404 sur l'une d'elles fait échouer le build.
