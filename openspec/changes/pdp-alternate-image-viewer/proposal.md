## Why

Provide the option to display and navigate multiple product detail page (PDP) images via a thumbnail gallery, which can be A/B tested to verify if it improves user engagement and conversion rate.

## What Changes

- Pull all detail images into the main PDP configurator section's product image area.
- Add a vertical thumbnail layout on desktop (utilizing square containers with `object-cover` styling) to allow switching between images.
- Add a horizontal thumbnail layout on mobile to keep the layout responsive.
- Conditionally hide the static details grid at the bottom of the PDP when the alternate layout is active.
- Integrate the new layout with GrowthBook to support A/B testing between the default single-image view and the new alternate layout.

## Capabilities

### New Capabilities
- `pdp-alternate-image-viewer`: Provides an interactive image gallery with vertical/horizontal thumbnail previews for PDPs, controlled by a GrowthBook feature flag.

### Modified Capabilities

## Impact

- `frontend/src/pages/ProductDetail.tsx`: Replace the static image area with the new image viewer component wrapper, and conditionally render the bottom details grid gallery.
- `frontend/src/components/ProductImageViewer.tsx` (New): Orchestrator/controller that evaluates the GrowthBook feature flag and renders the selected viewer component.
- `frontend/src/components/SingleImageViewer.tsx` (New): Displays the static single-image layout.
- `frontend/src/components/ThumbnailImageViewer.tsx` (New): Implements the vertical/horizontal thumbnail gallery viewer layout.
- GrowthBook: Feature flag `pdp-image-viewer-layout` with variations `default` and `alt-gallery`.
