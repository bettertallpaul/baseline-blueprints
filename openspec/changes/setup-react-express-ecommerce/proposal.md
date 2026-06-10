## Why

Create a containerized mock e-commerce website selling Bauhaus/Scandinavian-inspired furniture to serve as a high-fidelity reference environment for prospect/customer integrations. The application must feel technically credible, using a modern frontend stack (React SPA) and dynamic API interactions with a flat-file JSON database backend rather than a purely static client-only mock.

## What Changes

- **React Single Page Application**: Port the existing HTML/Tailwind prototypes (`prototype/`) into a modern React application powered by Vite, preserving all design systems from `DESIGN.md`.
- **Node.js/Express API Backend**: A containerized backend exposing REST API endpoints to support product retrieval, cart persistence, and order checkout.
- **JSON Flat-File Database**: A backend database file (`db.json`) acting as a zero-overhead data store for products, variants, configurations, and mock orders.
- **Docker Compose Setup**: Full containerization of both services (`frontend` and `backend`) using OrbStack/macOS guidelines (Node 22 slim, named volumes for package cache, no filesystem polling).
- **Makefile Targets**: Automation script defining standard hooks (`up`, `shell`, `install`, `dev`, `build`, `test`, `down`) for simple developer setup.
- **Documentation Deliverables**: Create a human-facing `README.md` introducing the project and execution guidelines, a technical `ARCHITECTURE.md` specifying details for future AI assistants, and update repository-wide `AGENTS.md` with container context.

## Capabilities

### New Capabilities
- `furniture-catalog`: Exposes and displays the catalog of architectural furniture pieces, including variants (sizes, materials) and technical spec diagrams.
- `shopping-cart-management`: Supports adding, editing, and deleting items in the cart, recalculating totals dynamically.
- `checkout-flow`: Orchestrates the step-by-step mock checkout wizard (shipping/billing/payment) and records a confirmed order.

### Modified Capabilities
None (new repo scaffold).

## Impact

- **Frontend Codebase**: New React app replacing the simple static prototypes.
- **Backend API Codebase**: New Express app handling database interactions.
- **Infrastructure**: Addition of `Dockerfile.dev`, `docker-compose.yml`, and a standard `Makefile`.
- **Documentation**: New `README.md` and `ARCHITECTURE.md`, plus updates to `AGENTS.md`.
- **Dependencies**: Tailwind CSS, React, React Router DOM, Express, and JSON database helper libraries.
