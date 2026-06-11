# GrowthBook Integration

## Purpose
This specification defines the integration of the GrowthBook React SDK into the web application to support feature flags, dynamic targeting, and A/B testing variations.

## Requirements

### Requirement: SDK Connection Configuration
The system SHALL initialize the GrowthBook React SDK using `apiHost` and `clientKey` resolved from environment variables.

#### Scenario: Default Environment Configuration
- **WHEN** the React application starts up
- **THEN** it resolves `VITE_GROWTHBOOK_API_HOST` and `VITE_GROWTHBOOK_CLIENT_KEY` and instantiates the GrowthBook client.

### Requirement: Custom Sticky Bucketing
The system SHALL configure sticky bucketing for user session consistency using the `js-cookie` library and `BrowserCookieStickyBucketService`.

#### Scenario: Sticky Bucket Initialization
- **WHEN** the GrowthBook client is instantiated
- **THEN** it includes `BrowserCookieStickyBucketService` with `jsCookie: Cookies` as its stickyBucketService config.

### Requirement: SPA Route Watcher and Navigation Integration
The system SHALL update the current URL dynamically on route changes to evaluate targeting and triggers correctly, and override default browser redirect behavior to use client-side navigation.

#### Scenario: Location Change Notification
- **WHEN** React Router route location changes
- **THEN** the wrapper provider calls `gb.setURL()` with the new browser location.

#### Scenario: Client-side Navigation Override
- **WHEN** a URL Redirect experiment triggers a redirection
- **THEN** GrowthBook invokes the custom `navigate` method to perform client-side React Router navigation without page reload.

### Requirement: Auto and Custom Targeting Attributes Synchronization
The system SHALL use the `autoAttributesPlugin` to detect browser properties automatically, and sync custom cart state attributes (`cartTotal`, `cartItemCount`, `productNamesInCart`) reactively.

#### Scenario: Cart State Updates Sync
- **WHEN** items in the cart change or the cart subtotal is updated
- **THEN** the provider updates the SDK client targeting attributes with the new cart metrics while preserving auto-detected attributes.

### Requirement: Experiment Viewed Tracking Callbacks
The system SHALL log all experiment viewed events to the console when variations are assigned.

#### Scenario: Variation View Logging
- **WHEN** a user is assigned a variation in an active experiment
- **THEN** the SDK triggers the trackingCallback, which outputs `console.log("GrowthBook Experiment Viewed:", ...)` with the experiment ID, variation ID, and assigned value.
