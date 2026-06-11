## 1. Environment & Infrastructure Setup

- [x] 1.1 Scaffold root configuration files including `.gitignore` and a `Makefile` supporting setup operations (`up`, `down`, `dev`, `install`).
- [x] 1.2 Create `Dockerfile.dev` for both `frontend` and `backend` subdirectories using Node 22.
- [x] 1.3 Configure a central `docker-compose.yml` that routes local ports, handles volume mounting, and sets up node package caches.

## 2. Express Backend API Setup

- [x] 2.1 Set up a basic Node/Express package in the `backend/` directory.
- [x] 2.2 Create a seed file or script that populates the flat-file `db.json` with complete catalog records for all 4 prototype products (The Bed, The Seating, The Storage, and The Table), capturing their configuration options (sizes, materials), prices, descriptions, specs, add-on components, and image assets.
- [x] 2.3 Implement the `GET /api/products` and `GET /api/products/:id` catalog endpoints.
- [x] 2.4 Implement the `POST /api/checkout` mock order endpoint that records transactions inside `db.json`.

## 3. Frontend App & Routing Scaffolding

- [x] 3.1 Initialize React + TypeScript with Vite in the `frontend/` directory.
- [x] 3.2 Install and configure Tailwind CSS matching the custom design tokens (Jost typography, colors) from `DESIGN.md`.
- [x] 3.3 Set up routing for Home, PDP (Product Detail Page), Cart, Checkout, and Order Confirmation routes.
- [x] 3.4 Configure Vite's dev server proxy to forward `/api` requests to the backend container.

## 4. Porting Layouts & Pages

- [x] 4.1 Port the shared UI components: `TopNavBar`, `Footer`, and `CartDrawer` with accurate styles.
- [x] 4.2 Convert `prototype/home.html` into a dynamic React `Home` page component.
- [x] 4.3 Create a generic React `ProductDetail` page that dynamically displays details and configurations based on the catalog API.
- [x] 4.4 Convert the Cart, Checkout, and Order Confirmation pages from HTML prototypes into React components.

## 5. Cart Context & Mock Transaction Logic

- [x] 5.1 Implement a global `CartContext` supporting `localStorage` cache synchronization.
- [x] 5.2 Connect variant configuration selections (sizes, materials, add-ons) on the PDP to add line items with unique hashes to the cart.
- [x] 5.3 Implement quantity updates and removals from both the `CartDrawer` slide-over and the standalone `Cart` page.
- [x] 5.4 Connect the `Checkout` form submission to execute the backend mock checkout API call, reset the cart, and display order results on the confirmation page.

## 6. Documentation & Guidelines

- [x] 6.1 Create a user-facing `README.md` at the project root explaining the application purpose, stack, and how to run it locally.
- [x] 6.2 Update the root `AGENTS.md` instructions with the new Docker Compose and Makefile commands and developer workflows.
- [x] 6.3 Create a technical `ARCHITECTURE.md` describing project structure, data models, state management, and development conventions to aid future AI assistants.
