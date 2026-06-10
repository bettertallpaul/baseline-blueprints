## Why

Integrated experiment management and feature flagging is required to enable A/B testing, client-side targeting, and remote configuration on the BASELINE e-commerce application. By implementing GrowthBook connected to our local containerized instance, we can run visual and code-level experiments with zero external network overhead and minimal latency.

## What Changes

- Add `@growthbook/growthbook-react`, `@growthbook/growthbook`, and `js-cookie` as frontend dependencies.
- Create a unified `BaselineGrowthBookProvider` wrapper that abstracts SDK initialization, attribute calculation, and side effects.
- Bind the GrowthBook client connection to local API host environments via `.env` environment variables.
- Connect GrowthBook routing to React Router to ensure SPA URL redirects and visual editor target evaluations occur dynamically with zero page-reloads.
- Synchronize custom cart context attributes (cartTotal, cartItemCount, productNamesInCart) dynamically.
- Implement cookie-based sticky bucketing via `js-cookie` and `BrowserCookieStickyBucketService`.
- Establish console logging for experiment view tracking events.

## Capabilities

### New Capabilities
- `growthbook-integration`: Integrates GrowthBook client SDK, provider wrapper, sticky bucketing, browser attributes, and cart synchronization features.

### Modified Capabilities
<!-- None -->

## Impact

- **Frontend Dependencies**: Adds `@growthbook/growthbook-react`, `@growthbook/growthbook`, `js-cookie`, and their typescript definitions to `frontend/package.json`.
- **Frontend Main Layout**: Updates `frontend/src/App.tsx` to mount the custom wrapper provider.
- **Frontend Pages/Components**: Enables developers to query flags using standard GrowthBook hooks (`useFeatureIsOn`, `useFeatureValue`, etc.).
- **Docker / Compose**: Add client-side environment configurations for local SDK URL resolution.
