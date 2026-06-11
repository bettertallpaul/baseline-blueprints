## Context

The current repository contains static HTML prototypes in the `prototype/` directory. While high-fidelity in design, they use local inline state and static mock templates. To support realistic demo scenarios (e.g. A/B testing and marketing integrations), the site needs to behave like a standard dynamic client-server application. 

This design establishes a containerized, two-tier system consisting of a React SPA frontend and a lightweight Express.js API backend using a JSON flat-file database.

## Goals / Non-Goals

**Goals:**
- Containerize the project into a dual-service setup (`frontend` and `backend`) using Docker Compose.
- Port the layout structure and typography from the prototypes into a reusable React component hierarchy. During this porting process, clean up and optimize the markup to leverage standard, out-of-the-box Tailwind CSS classes and standard configuration options, minimizing custom CSS stylesheet overrides.
- Implement a global `CartContext` to manage local shopping cart actions and persist cart state in the browser's `localStorage`.
- Create Express REST endpoints for fetching catalog items and creating mock checkout orders.
- Maintain a human-readable backend data file (`db.json`) to store products and record checkout orders.

**Non-Goals:**
- Integrations with external payment gateways (e.g. Stripe) or database servers (e.g. Postgres).
- Implementing user authentication or account management.
- Setting up third-party A/B testing SDKs (e.g. Growthbook) within this change scope.

## Decisions

### 1. Frontend Framework: Vite + React SPA
- **Rationale**: Vite provides instantaneous hot module reloading and native ES module support. React provides a standardized component model and state propagation (Context) ideal for handling dynamic variations in future demos.
- **Alternatives**: 
  - *Next.js*: Unnecessary complexity and runtime overhead for a client-side demo site.
  - *Vanilla JS*: Harder to manage state transitions dynamically when demo variants require layout updates.

### 2. Backend Tech: Express + JSON Flat-File Database
- **Rationale**: Express is minimal and standard. A JSON file (`db.json`) provides a human-readable database that requires zero database installation or engine setup, making the container highly portable and easy to run.
- **Alternatives**:
  - *SQLite*: High credibility, but harder to inspect directly in a text editor without SQLite client tools.
  - *Mock Service Worker (MSW)*: Does not demonstrate real backend API patterns or codebases to prospects.

### 3. Container Management: Docker-First with Named Volumes
- **Rationale**: Keeps dependencies isolated inside the containers, ensuring the host machine does not need `node` or `pnpm` installed. Named volumes for `node_modules` prevent host-guest file syncing performance issues.
- **Alternatives**:
  - *Running on Host*: Violates repository-wide environment rules (`AGENTS.md`) and introduces cross-OS node version mismatches.

### 4. Styling Optimization: Native Tailwind Utilities Over Custom CSS
- **Rationale**: The static prototypes contain custom inline CSS `<style>` definitions and customized configurations. When porting these layouts into React, we will clean up these style scopes, declaring custom design variables (fonts, specific colors) in the central `tailwind.config.js` and replacing custom global/local CSS overrides with native, out-of-the-box Tailwind utility classes.
- **Alternatives**:
  - *Keep Inline Custom CSS*: Keeps the markup direct, but makes it hard to maintain, modify, or scale when experimenting with layout variations.

## Risks / Trade-offs

- **Risk**: Concurrent file writes on `db.json` could lead to race conditions.
  - *Mitigation*: The website is a local, single-developer demo application with zero concurrent traffic, making standard file-system writes safe.
- **Risk**: Hardcoded Tailwind compilation if the build tool fails inside Docker.
  - *Mitigation*: Configure the Vite frontend container to install DevDependencies properly and run the Tailwind JIT compiler within Vite's build lifecycle.
