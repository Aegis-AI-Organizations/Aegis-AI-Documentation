# Documentation Workflow

This portal (`Aegis-AI-Documentation`) is built with **Docusaurus 3** and follows a
**Docs-as-Code** model: most content is authored next to the code it describes, in
each service repository, and aggregated here at build time.

## Content sources

| Source                              | What it produces                                       | Where it lives |
| ----------------------------------- | --------------------------------------------------- | -------------- |
| `docusaurus-plugin-openapi-docs`    | The 40+ `Swagger-API/*` REST reference pages          | Generated from `openapi.yaml` into `docs/Swagger-API/` |
| `docusaurus-plugin-remote-content`  | One file per service, fetched from that repo's `main` | `docs/<Service>/…` (en) and `i18n/fr/…/<Service>/…` (fr) |
| Hand-written pages                   | Everything else (Overview, quickstarts, guides, …)   | Committed directly in `docs/` and `i18n/fr/…` |

### Remote-synced files

`docusaurus.config.ts` lists, per service, exactly which files are pulled from
`https://raw.githubusercontent.com/Aegis-AI-Organizations/<repo>/main/docs/{en,fr}/…`.
Today that is mostly each service's `architecture.md` (plus `endpoints.md` for the
Gateway, `workflows.md` for Brain, `security-mtls.md` / `infrastructure-keda.md`
for Infra).

:::warning
The remote plugin **overwrites the local copies on every build**. Editing a
remote-synced file inside this repository has no lasting effect — change it in the
owning service repo's `docs/{en,fr}/` folder instead. The committed copies here
are effectively a cache.
:::

`Aegis-AI-Agent-Crew` is currently **not** remote-synced (its `docs/` are not
public on `main`); its portal pages are hand-maintained until the two commented
blocks in `docusaurus.config.ts` can be re-enabled.

## Repository layout

```text
Aegis-AI-Documentation/
  docs/
    Overview/                 # hand-written, project-wide
    <Service>/                # mix of remote-synced + hand-written
    Swagger-API/              # generated (do not edit by hand)
  i18n/fr/
    code.json                        # React/UI strings (homepage, <Translate>)
    docusaurus-theme-classic/        # navbar.json, footer.json
    docusaurus-plugin-content-docs/
      current.json                   # sidebar category labels, generated-index
      current/<Service>/…            # French doc pages (same tree as docs/)
  sidebars.ts                # explicit sidebar; every page is listed here
  docusaurus.config.ts       # remote-content mapping, i18n, navbar/footer
  openapi.yaml               # source of the Swagger-API pages
```

## Adding or editing a page

1. **Hand-written page** — create `docs/<Section>/<page>.md`, add a French
   sibling under `i18n/fr/docusaurus-plugin-content-docs/current/<Section>/`, and
   register the doc id in `sidebars.ts`. No frontmatter is needed; the first `#`
   heading is the title and the sidebar defines order.
2. **Service-owned page** — edit `docs/{en,fr}/<file>.md` in the service repo. On
   merge to `main`, `docs-sync.yml` triggers a portal rebuild (see
   [CI/CD Pipeline](./ci-cd.md)). Add the file to that service's block in
   `docusaurus.config.ts` if it is new.
3. **API reference** — edit `openapi.yaml`, then regenerate:
   ```bash
   npm run clean-api-docs all && npm run gen-api-docs all
   ```

## Internationalization

The default locale is `en`; `fr` is a full translation.

- Doc pages: mirror the file under `i18n/fr/docusaurus-plugin-content-docs/current/`.
  A missing French file falls back to the English page.
- UI strings: `npm run write-translations -- --locale fr` scaffolds
  `code.json`, `navbar.json`, `footer.json`, and `current.json`; fill in the
  `message` values. Existing translations are preserved on re-run.
- The API reference is English-only by design.

## Local development

```bash
npm ci
npm run start                 # English, hot-reload
npm run start -- --locale fr  # French
npm run build                 # production build of both locales
npm run serve                 # serve the built site
```

`npm run build` performs live network fetches for every remote-content entry; a
404 on any of them fails the build.
