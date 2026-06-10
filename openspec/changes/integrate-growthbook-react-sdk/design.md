## Context

The BASELINE application is a containerized, two-tier e-commerce app (Vite/React frontend + Express backend). A GrowthBook instance is configured and running locally under OrbStack on local domains. The React frontend currently lacks any experimentation, targeting, or feature-flagging support. This design introduces the GrowthBook React SDK in a self-contained, clean provider pattern.

## Goals / Non-Goals

**Goals:**
- Integrate GrowthBook React SDK inside the frontend Vite application.
- Expose a clean, reusable `BaselineGrowthBookProvider` wrapper.
- Bind client-side routing via React Router `useNavigate` and `useLocation` to handle URL redirects and visual editor experiments seamlessly.
- Sync browser/session context (via auto-attributes) and cart details (total, item count, names) dynamically.
- Implement cookie-based sticky bucketing using `js-cookie`.

**Non-Goals:**
- Integrating GrowthBook into the backend Express API.
- Implementing third-party analytics connections (e.g. Mixpanel, Google Analytics).
- Re-architecting current Cart context management.

## Decisions

### Decision 1: Mount Provider Inside Router Tree
- **Choice**: Place the custom `BaselineGrowthBookProvider` wrapper component inside the `<Router>` hierarchy in `App.tsx`.
- **Rationale**: This position allows the provider to consume `useNavigate` and `useLocation` hooks. GrowthBook can hook into client-side navigation to perform redirects without triggering full page reloads, and update its internal URL state immediately when page routing changes.
- **Alternatives Considered**: Global initialization outside of React. Rejected because it would require either full-page reloads (`window.location.replace`) or writing complex, brittle event emitters to bridge React Router navigation.

### Decision 2: Cookie-Based Sticky Bucketing
- **Choice**: Configure `BrowserCookieStickyBucketService` with `js-cookie`.
- **Rationale**: Storing sticky bucket keys in cookies ensures the bucketing state is transportable to the server. If a backend API or Server-Side Rendering is introduced later, the bucketing decision remains consistent.
- **Alternatives Considered**: `LocalStorageStickyBucketService`. Rejected because localStorage is client-only and cannot be read by HTTP request headers on initial server load.

### Decision 3: Dynamically Injected Environment Config
- **Choice**: Resolve SDK endpoints and client keys using `import.meta.env.VITE_GROWTHBOOK_API_HOST` and `import.meta.env.VITE_GROWTHBOOK_CLIENT_KEY`, bound inside the Docker container environment.
- **Rationale**: Adheres to Twelve-Factor App methodologies by separating configuration from code. Allows changing target GrowthBook instances without rebuilding the frontend container image.

## Risks / Trade-offs

- **[Risk] Redirection Flickering (Flash of Original Content)**: When running URL redirects, the user might see the original page briefly before the redirect fires.
  - *Mitigation*: Configure `navigateDelay: 0` for instant redirection, enable `streaming: true` on SDK initialization to fetch flags instantly, and ensure the wrapper provider handles loading states if necessary.
- **[Risk] Performance Overhead on Cart Synchronization**: Updating attributes on every cart edit might trigger redundant SDK evaluations.
  - *Mitigation*: The GrowthBook React SDK performs shallow comparisons internally when updating attributes. Syncing attributes reactively via `useEffect` limits calls to actual state updates.
