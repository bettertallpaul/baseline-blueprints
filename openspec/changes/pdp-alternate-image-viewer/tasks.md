## 1. Component Scaffold and Default Viewer

- [ ] 1.1 Create `SingleImageViewer.tsx` to isolate the original static single-image rendering.
- [ ] 1.2 Create `ProductImageViewer.tsx` as the orchestrator/wrapper component that imports the GrowthBook SDK hooks.
- [ ] 1.3 Implement the variant switch in `ProductImageViewer.tsx` evaluating the flag `pdp-image-viewer-layout`.

## 2. Alternate Viewer Component Implementation

- [ ] 2.1 Create `ThumbnailImageViewer.tsx` with active index state and a compiled list of all gallery images (main image + detail images).
- [ ] 2.2 Implement the main viewport container with fixed heights (`h-[400px] md:h-[500px] lg:h-[600px]`) and the image styled with `object-contain` and `mix-blend-multiply`.
- [ ] 2.3 Implement the left vertical thumbnail strip for desktop (`md:flex hidden`) using square dimensions (`w-16 h-16`) and images styled with `object-cover` and 1px borders.
- [ ] 2.4 Implement active state styling (primary border highlight) and hover state styling on the thumbnails.
- [ ] 2.5 Implement the horizontal scrolling thumbnail list for mobile (`md:hidden flex overflow-x-auto pb-2 gap-2`) below the main viewport image.
- [ ] 2.6 Ensure image switching is driven by thumbnail click handlers. No chevron arrows are to be included in this component.

## 3. ProductDetail Page Integration

- [ ] 3.1 Modify `frontend/src/pages/ProductDetail.tsx` to replace the static image container with `ProductImageViewer`.
- [ ] 3.2 Ensure the product object and detail images props are passed correctly to the new wrapper.
- [ ] 3.3 Add conditional rendering to the product details grid section at the bottom of the page to hide it when the `alt-gallery` variant is active.

## 4. Documentation & Guidelines Updates

- [ ] 4.1 Update `ARCHITECTURE.md` to document the new image viewer components, GrowthBook feature flag targeting, and bottom details grid rendering flow.
- [ ] 4.2 Update `AGENTS.md` (or relevant sections) with any developer context updates.

## 5. Verification and Visual Validation Guidance

- [ ] 5.1 Start the dev server using `make dev` and check for build or TypeScript compile errors.
- [ ] 5.2 **Manual Inspection Guidance**: Open the browser to the local dev URL and navigate to the Bed PDP. Verify:
  - If the flag variant is `default`, the single image is shown and the details grid is visible at the bottom.
  - If the flag variant is `alt-gallery`, the thumbnail vertical column is shown on desktop, the horizontal scrolling list is shown on mobile, and the details grid at the bottom is hidden.
  - Image switching works seamlessly on thumbnail click without chevrons.
  - Test 4:3 (landscape) and 3:4 (portrait) aspect ratio products (e.g. Bed Blueprint vs Table Blueprint) to verify layout stability and that no layout shifts occur when changing active images.
