## Docker-First Dev Runtime (macOS + OrbStack)

Assume projects run inside containers by default.

- Prefer `docker compose` workflows over host tooling for app commands.  
- Do not run `npm`, `pnpm`, `node`, `python`, or `pip` on host unless explicitly requested.  
- For new repos, scaffold and maintain:  
  - `Dockerfile.dev`  
  - `docker-compose.yml`  
  - `Makefile` with: `up`, `shell`, `install`, `dev`, `build`, `test`, `down`  
  - `.gitignore` (Must strictly exclude: `node_modules` [no trailing slash], and standard local/build files for Node/Vite that shouldn't make their way to GitHub).
- Use `node:22-bookworm-slim` for Node projects. Install pnpm explicitly via `npm install -g pnpm` (avoid `corepack enable` as it is deprecated in Node 22+).  
- Keep source bind-mounted. Use named volumes for package caches (e.g., `pnpm_cache`). **CRITICAL:** Do NOT use named or anonymous volumes for `node_modules`. It must write directly back to the host via the parent bind mount to support IDE toolchains/linting.  
- Bind dev servers to `0.0.0.0` inside container and publish ports in Compose.  
- Prefer ARM-native images on Apple Silicon; only force `linux/amd64` when required by dependencies.  
- When troubleshooting, check in order:
  0. `docker info` (If this fails or times out, STOP immediately and tell me to launch OrbStack. Do not attempt further troubleshooting.)
  1. `docker context ls`
  2. `docker compose ps`  
  3. `docker compose logs --tail=200 <service>`  
  4. rebuild/restart: `docker compose down && docker compose up -d --build` 
- Vite HMR: Standard native file system events work flawlessly under OrbStack. Do not use filesystem polling (`usePolling: true`) in `vite.config.ts`, as it consumes excessive host CPU resources.

## Project Execution & Integration Details

- **Frontend Container Ports**: Serves Vite on container port `5173` mapped to host port `5180`.
- **Backend Container Ports**: Serves Express on container port `3000` mapped to host port `3080`.
- **Workspace Directories**:
  - `frontend/`: Vite React SPA with global `CartContext` matching `DESIGN.md`.
  - `backend/`: Express API server utilizing flat-file database `db.json`.
- **Developer Workflows**:
  - Start the application with `make dev`.
  - Rebuild image assets using `make build`.
  - Verify container status with `docker compose ps` and check logs using `docker compose logs -f`.
  - Execute testing commands using `make test`.
- **A/B Testing & Flags**:
  - PDP Alternate Image Viewer layout toggled using GrowthBook feature flag `pdp-image-viewer-layout` with variations `default` and `alt-gallery`.