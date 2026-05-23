# Quickstart Dashboard

## Développement local

```bash
npm install
npm run dev
```

Définir l'URL Gateway si elle n'est pas servie par le proxy local :

```bash
VITE_API_URL=http://localhost:8080/api npm run dev
```

Tester les liens documentation localement :

```bash
VITE_DOCS_URL=http://localhost:3000/Aegis-AI-Documentation npm run dev
```

## Build production

```bash
npm run build
```

## Onboarding agent depuis le Dashboard

1. Activez le compte owner ou faites une rotation du token agent.
2. Copiez immédiatement le token `ag_...`.
3. Ouvrez le tableau de bord sécurité.
4. Si aucun agent n'est configuré, utilisez le bouton de documentation.
5. Lancez l'agent et vérifiez `Agents déployés`, `Actifs` et `Dernière remontée`.
