# 📚 Aegis AI - Documentation Portal

**Project ID:** AEGIS-CORE-2026

## 🏗️ System Architecture & Role

The **Aegis AI Documentation Portal** acts as the centralized knowledge base and architectural source of truth for the entire platform. It dynamically aggregates distributed documentation across all microservices into a single, unified interface.

- **Tech Stack:** Docusaurus (React, TypeScript), Node.js, `docusaurus-plugin-remote-content`.
- **Role:**
  - Consolidates external Markdown/MDX files directly from the `docs/` directories of satellite repositories (e.g., `aegis-agent`, `aegis-brain`, `aegis-api`) at build time.
  - Provides a unified, structured, and searchable index for API contracts, architectural decisions (ADRs), and operational runbooks.
- **Architecture Justification:** Implements a strict "Docs-as-Code" topology. By decoupling the presentation layer (this repository) from the content layer (the microservice repositories), engineering teams maintain documentation alongside their code. This prevents doc-drift without introducing heavy frontend dependencies (like `npm` or Webpack) into backend backend or system-level repositories.

## 🔐 Security & DevSecOps Mandates

- **Immutability & Auditability:** All documentation changes are subject to the same strict Pull Request reviews, CI/CD linting, and Git history tracking as the core application code.
- **Pipeline Isolation (Least Privilege):** The CI/CD build matrix operates within isolated, ephemeral GitHub Actions runners. Tokens are strictly scoped (`contents: read`, `pages: write`) to ensure the documentation build pipeline cannot be leveraged for supply chain attacks against the broader infrastructure.

## 🚀 Local Execution & Build Matrix

The portal is designed to be built and previewed locally before the CI/CD pipeline deploys the static assets to GitHub Pages.

```bash
# 1. Install core dependencies
npm ci

# 2. Ingest remote documentation from satellite repositories
npm run docusaurus download-remote-aegis-agent-docs
npm run docusaurus download-remote-aegis-brain-docs

# 3. Start the local development server (Hot-Reload enabled)
npm run start
```
