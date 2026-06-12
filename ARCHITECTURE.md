# Technical Architecture & System Design

This document details the codebase structure, database models, state management, and implementation conventions of the BASELINE e-commerce application. It is designed to assist developers and future AI assistants working in this repository.

---

## 1. Project Directory Structure

```
.
├── backend/                   # Node/Express API Service
│   ├── Dockerfile.dev         # Development Docker Configuration
│   ├── db.json                # JSON Flat-File Database (git ignored, seeded on startup)
│   ├── index.js               # Express Server & Endpoints
│   ├── package.json           # Node Dependencies
│   └── seed.js                # Database Seeding Script
├── frontend/                  # React Vite SPA Service
│   ├── public/                # Static assets (contains /assets/*)
│   ├── src/
│   │   ├── components/        # Shared Layout Components (TopNavBar, Footer, CartDrawer)
│   │   ├── context/           # Cart State Provider
│   │   ├── pages/             # Route Page Containers (Home, ProductDetail, Cart, Checkout, OrderConfirmation)
│   │   ├── providers/         # Custom wrapper providers (GrowthBook SDK, etc.)
│   │   ├── App.tsx            # Routes configuration
│   │   ├── index.css          # Tailwind imports and custom utilities
│   │   ├── main.tsx           # React bootstrap entry point
│   │   └── vite-env.d.ts      # TypeScript environment declarations
│   ├── Dockerfile.dev
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js     # Design token configurations
│   ├── tsconfig.json
│   └── vite.config.ts         # Vite Server & API Proxy setup
├── openspec/                  # OpenSpec Change/Feature specs
├── prototype/                 # Static HTML/CSS prototypes (Reference)
├── .env                       # Local environment variables configuration
├── AGENTS.md                  # Development environment guidelines
├── docker-compose.yml         # Container configuration file
└── Makefile                   # Automation hooks
```

---

## 2. Data Models (db.json Schema)

The backend utilizes `backend/db.json` as a flat-file database. It contains two root keys: `products` and `orders`.

### 2.1 Products Schema
```json
{
  "id": "bed",
  "name": "The Bed Blueprint",
  "tag": "BLUEPRINT 01",
  "basePrice": 1200,
  "description": "Modular birch platform bed.",
  "detailedDescription": "Constructed from solid, sustainably sourced timber...",
  "image": "https://lh3.googleusercontent.com/...",
  "specImage": "/assets/table_technical_diagram.png",
  "detailImages": [
    { "src": "/assets/bed_detail_joinery.png", "label": "DETAIL A: FINGER JOINERY" }
  ],
  "options": {
    "sizes": [
      { "id": "full", "name": "Full", "priceModifier": -150 }
    ],
    "materials": [
      { "id": "birch", "name": "Natural Birch", "color": "#e6d5b8", "priceModifier": 0 }
    ]
  },
  "addons": [
    { "id": "headboard", "name": "Integrated Headboard", "price": 400 }
  ],
  "specs": {
    "materials": ["Solid Birch or Oak hardwood"],
    "dimensions": ["W: 64\" / L: 84\" / H: 12\" (Platform)"],
    "performance": ["Weight Capacity: 800 lbs"]
  }
}
```

### 2.2 Orders Schema
```json
{
  "orderId": "ORD-1718025219213-982",
  "shipping": {
    "firstName": "Alexander",
    "lastName": "Wright",
    "address": "Studio 4B, 1872 Industrial Parkway",
    "city": "Seattle",
    "state": "WA",
    "zipCode": "98101",
    "phone": "206-555-0199"
  },
  "billing": { ... },
  "items": [
    {
      "productId": "bed",
      "name": "The Bed Blueprint",
      "size": "Queen",
      "material": "Natural Birch",
      "addons": ["Integrated Headboard"],
      "price": 1450,
      "quantity": 1
    }
  ],
  "subtotal": 1450,
  "total": 1723.25,
  "status": "confirmed",
  "createdAt": "2026-06-10T15:32:19.000Z"
}
```

---

## 3. Client State Management (Cart Context)

Cart state is globally managed via `frontend/src/context/CartContext.tsx` and automatically persists to browser `localStorage` (`baseline_cart` key).

### 3.1 Uniqueness & Grouping (Cart Item Hashing)
To prevent duplicate items from generating separate rows, item configurations are serialized into a unique hash:
```typescript
export const generateCartHash = (
  productId: string, 
  sizeId: string, 
  materialId: string, 
  addonIds: string[]
) => {
  const sortedAddons = [...addonIds].sort().join(',');
  return `${productId}-${sizeId}-${materialId}-[${sortedAddons}]`;
};
```
When an item is added, if the generated hash matches an existing item, the quantity is incremented. Otherwise, a new line item is pushed.

---

## 4. UI Design Tokens

Styles align with the **Architectural Minimalist** guidelines in `DESIGN.md`:
- **Exclusive Typography**: `Jost` is the sans-serif font family.
- **Tailwind Extension**: Custom text tags (`text-display`, `text-headline-lg`, `text-label-caps`, etc.) map font size, line height, letter spacing, and weights directly to CSS tokens.
- **Borders & Radii**: Hard sharp corners (`border-radius: 0px`) are applied globally. Containers utilize 1px solid borders (`border-on-surface`).

---

## 5. Experimentation & Feature Flagging (GrowthBook SDK)

The application integrates the **GrowthBook React SDK** to support feature flagging, A/B testing, and visual editor targeting.

### 5.1 Connection Configuration
GrowthBook initialization settings are loaded using environment variables (`VITE_GROWTHBOOK_API_HOST` and `VITE_GROWTHBOOK_CLIENT_KEY`) from the root `.env` file, which are then passed into the container process.

### 5.2 BaselineGrowthBookProvider
Located in `frontend/src/providers/BaselineGrowthBookProvider.tsx`, this provider wraps the component tree within the router context to handle:
- **Sticky Bucketing**: Configured cookie-based sticky bucketing via `BrowserCookieStickyBucketService` and `js-cookie`.
- **SPA Location Sync**: Listens for location changes using React Router's `useLocation()` hook and calls `gb.setURL()` to trigger re-evaluations.
- **Visual Redirect Overrides**: Hooks into React Router's `useNavigate()` to perform client-side URL redirects without triggering full page reloads.
- **Custom Attributes**: Dynamically maps cart state (`cartTotal`, `cartItemCount`, and `productNamesInCart`) from the global `CartContext` to GrowthBook attributes.

### 5.3 Product Detail Page Layout Experimentation (`pdp-image-viewer-layout`)
We run layout experiments on the Product Detail Page (PDP) using the `pdp-image-viewer-layout` feature flag (variations: `default` vs `alt-gallery`):
- **ProductImageViewer**: Acts as the orchestrator component. It queries `useFeatureValue('pdp-image-viewer-layout', 'default')` to determine which layout to display.
- **SingleImageViewer**: Renders the default static single product image.
- **ThumbnailImageViewer**: Renders the alternate product gallery layout, which aggregates the main product image and all detail images. It displays thumbnails vertically on desktop (left of the main viewport) and horizontally on mobile (below the main viewport).
- **Details Grid Hiding**: When the active variation is `alt-gallery`, the bottom product details grid section in `ProductDetail.tsx` is hidden to avoid duplicate image presentation.

