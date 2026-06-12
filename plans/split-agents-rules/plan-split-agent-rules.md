Here are your finalized, optimized rule files. You can drop these directly into your `.cursor/rules/` or `.agents/rules/` directory.

### 1. `01-docker.mdc` (The DevOps Core)

```markdown
---
description: Core DevOps, Docker, OrbStack, and Makefile execution rules.
globs: docker-compose.yml, Dockerfile*, Makefile, .gitignore
---
# Docker-First Dev Runtime (macOS + OrbStack)

Assume this project runs strictly inside containers.

- Prefer `docker compose` workflows over host tooling for app commands.  
- Do not run `npm`, `pnpm`, `node`, `python`, or `pip` on the host unless explicitly requested.  
- For new repos, scaffold and maintain:  
  - `Dockerfile.dev`  
  - `docker-compose.yml`  
  - `Makefile` with: `up`, `shell`, `install`, `dev`, `build`, `test`, `down`  
  - `.gitignore` (Must strictly exclude: `node_modules` [no trailing slash], and standard local/build files for Node/Vite that shouldn't make their way to GitHub).
- Use `node:22-bookworm-slim` for Node projects. Install pnpm explicitly via `npm install -g pnpm` (avoid `corepack enable` as it is deprecated in Node 22+).  
- Keep source bind-mounted. Use named volumes for package caches (e.g., `pnpm_cache`). 
- **CRITICAL:** Do NOT use named or anonymous volumes for `node_modules`. It must write directly back to the host via the parent bind mount to support IDE toolchains/linting.  
- Bind dev servers to `0.0.0.0` inside the container and publish ports in Compose.  
- Prefer ARM-native images on Apple Silicon; only force `linux/amd64` when required by dependencies.  
- When troubleshooting, check in order:
  0. `docker info` (If this fails or times out, STOP immediately and tell me to launch OrbStack. Do not attempt further troubleshooting.)
  1. `docker context ls`
  2. `docker compose ps`  
  3. `docker compose logs --tail=200 <service>`  
  4. Rebuild/restart: `docker compose down && docker compose up -d --build` 
- Developer Workflows: Start app with `make dev`, rebuild assets with `make build`, run tests with `make test`.

```

### 2. `02-frontend.mdc` (The React/Vite Layer)

```markdown
---
description: Architecture, ports, and standards for the React/Vite frontend.
globs: frontend/**/*, vite.config.ts
---
# Frontend Architecture (Vite + React)

- **Ports & Routing**: Serves Vite on container port `5173`, which maps to host port `5180`.
- **State Management**: Vite React SPA utilizes a global `CartContext` matching the specifications in `DESIGN.md`.
- **A/B Testing & Flags**: 
  - Implementation uses GrowthBook. 
  - PDP Alternate Image Viewer layout toggled using feature flag `pdp-image-viewer-layout` with variations `default` and `alt-gallery`.
- **Vite HMR**: Standard native file system events work flawlessly under OrbStack. Do NOT use filesystem polling (`usePolling: true`) in `vite.config.ts`, as it consumes excessive host CPU resources.

```

### 3. `03-backend.mdc` (The API Layer)

```markdown
---
description: Architecture, ports, and database standards for the Node.js/Express backend.
globs: backend/**/*
---
# Backend Architecture (Express)

- **Ports & Routing**: Serves Express API on container port `3000`, which maps to host port `3080`.
- **Data Layer**: Express API server utilizes a flat-file database architecture using `db.json`.
- **Execution**: Runs on Node 22 inside the `backend` Docker container.

```