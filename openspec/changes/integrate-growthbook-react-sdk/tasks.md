## 1. Setup & Package Configuration

- [ ] 1.1 Install dependencies `@growthbook/growthbook-react`, `@growthbook/growthbook`, `js-cookie`, and `@types/js-cookie` in the frontend container.
- [ ] 1.2 Add environment variables `VITE_GROWTHBOOK_API_HOST` and `VITE_GROWTHBOOK_CLIENT_KEY` to the docker-compose frontend service configuration.

## 2. Provider Component Implementation

- [ ] 2.1 Create the dedicated client provider file `frontend/src/providers/BaselineGrowthBookProvider.tsx`.
- [ ] 2.2 Configure the `autoAttributesPlugin` and the cookie-based `BrowserCookieStickyBucketService` in the GrowthBook client instance.
- [ ] 2.3 Implement React Router location watcher and navigation hook bindings within the custom wrapper provider.
- [ ] 2.4 Synchronize dynamic cart context attributes (subtotal, count, product names) from `useCart` in the custom provider.

## 3. Application Integration & Verification

- [ ] 3.1 Mount the `BaselineGrowthBookProvider` component within the router context tree in `frontend/src/App.tsx`.
- [ ] 3.2 Start the dev environment using `make dev` and verify SDK initialization, console logs, and cookie bucketing in the browser.
