# BASELINE Blueprints Mock E-Commerce Store

A containerized, two-tier mock e-commerce store selling Bauhaus/Scandinavian-inspired furniture. This repository serves as a high-fidelity reference environment for integration testing, product demos, and feature exploration.

## Stack & Architecture

- **Frontend**: React SPA built with TypeScript, Vite, and Tailwind CSS.
- **Backend**: Node.js & Express REST API.
- **Database**: Flat-file JSON database (`db.json`) located inside the backend directory, pre-seeded automatically on server boot.
- **Runtime**: fully containerized with Docker Compose using lightweight Node 22 images.

## Prerequisite

- [OrbStack](https://orbstack.dev/) or Docker Desktop installed on your machine.

## Quick Start (Local Execution)

A `Makefile` is provided in the project root to automate all docker compose workflows.

### 1. Build and Initialize Containers
```bash
make build
```

### 2. Start Development Servers
Runs both services in the foreground so you can view console logs:
```bash
make dev
```
Alternatively, start them in the background:
```bash
make up
```

### 3. Ports
Once running, the applications are exposed on the host machine:
- **Frontend**: [http://localhost:5180](http://localhost:5180)
- **Backend API**: [http://localhost:3080](http://localhost:3080)

### 4. Stop Services
```bash
make down
```


## Makefile Target Summary

- `make up` - Spin up Docker containers in the background.
- `make down` - Stop and remove Docker containers.
- `make dev` - Launch Docker compose in the foreground (outputs interactive logs).
- `make install` - Installs package dependencies inside both container environments.
- `make shell` - Open an interactive shell inside the frontend container.
- `make build` - Rebuild the Docker images.
- `make test` - Execute tests within the containers.


## REST API Endpoints

- `GET /api/products` - Returns a JSON array of all 4 furniture blueprints, sizes, colors, pricing modifiers, and specs.
- `GET /api/products/:id` - Returns detailed configuration options and specs for a specific blueprint (e.g. `bed`, `table`, `seating`, `storage`).
- `POST /api/checkout` - Submits a mock order containing shipping details, billing details, line items, and totals. Saves transactions directly into `db.json` and returns a confirmed order ID.
