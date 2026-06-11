## Context

Currently, the Product Detail Page (`ProductDetail.tsx`) displays only the main static product image (`product.image`) in the configurator section, while detail images are rendered statically in a grid section further down the page. To test user engagement and conversion rate, we want to run an A/B test using GrowthBook to toggle an alternate interactive gallery layout (`ThumbnailImageViewer`) that groups all images (main + details) in the configurator section with interactive thumbnails.

## Goals / Non-Goals

**Goals:**
- Implement a controller component (`ProductImageViewer`) that evaluates the GrowthBook feature flag `pdp-image-viewer-layout`.
- Create a single image viewer component (`SingleImageViewer`) to render the current static single-image layout.
- Create an alternate thumbnail image viewer component (`ThumbnailImageViewer`) containing vertical thumbnails on desktop, horizontal scrolling thumbnails on mobile, and the selected active image inside a fixed-height container.
- Hide the details grid section at the bottom of the page when the alternate thumbnail viewer is active to avoid showing duplicate images.
- Align with Option A: square thumbnails with `object-cover` styling to maintain a consistent visual grid.

**Non-Goals:**
- Implementing swipe gestures, image zoom/magnification, or full-screen lightboxes.

## Decisions

### 1. Modular Component Separation
- **Choice**: Extract the image area from `ProductDetail.tsx` into a new orchestrator component (`ProductImageViewer`) that conditionally renders `SingleImageViewer` or `ThumbnailImageViewer`.
- **Rationale**: Isolates gallery state and interaction logic from page-level loading/configuration state. Simplifies cleanup when the experiment concludes (simply delete the losing component files and the wrapper switch).
- **Alternatives Considered**: Inlining the alternate gallery logic directly in `ProductDetail.tsx` (rejected due to clutter and high regression risk).

### 2. Thumbnail Layout and Aspect Ratio Accommodation (Option A)
- **Choice**: Thumbnails are rendered as fixed square buttons (`w-16 h-16` / `aspect-square`) with internal images styled with `object-cover`. The main viewport container uses a fixed or stable height (`h-[400px]` or `md:h-[600px]`) and internal images use `object-contain`.
- **Rationale**: Keeps the vertical thumbnail list visually uniform and structural. The main image viewport's `object-contain` ensures both 4:3 (landscape) and 3:4 (portrait) product images display fully without cropping, and its stable height prevents vertical layout jumps when switching images.
- **Alternatives Considered**: Option B (`object-contain` for thumbnails, rejected as letterboxed borders look less cohesive) and Option C (dynamic aspect ratio thumbnails, rejected as vertical lists with mixed aspect ratios look disjointed).

### 3. Responsive Thumbnail Placement
- **Choice**: On desktop (`md` screens and up), thumbnails are placed in a vertical column on the left of the main image container. On mobile, thumbnails wrap underneath the main image container in a horizontal scrolling row (`overflow-x-auto`).
- **Rationale**: Ensures the layout stays within the grid boundaries and maintains high usability on smaller screens.

### 4. Bottom Detail Gallery Visibility Control
- **Choice**: Re-use the `pdp-image-viewer-layout` feature flag directly inside `ProductDetail.tsx` to conditionally omit rendering the details grid section at the bottom of the page when the `ThumbnailImageViewer` is active.
- **Rationale**: Keeps the user interface clean and prevents duplicate images from appearing on the page.

## Risks / Trade-offs

- **[Risk]**: GrowthBook flag evaluation latency could cause a layout flash or delay.
  - **[Mitigation]**: GrowthBook is configured with a default fallback state (`default`), ensuring that if the SDK features are not yet fetched, the application renders the original static image layout instantly.
- **[Risk]**: Aspect ratio mismatch between landscape (4:3) and portrait (3:4) images can result in empty whitespace on container edges.
  - **[Mitigation]**: Applying `mix-blend-multiply` to the product images allows their neutral backgrounds to merge seamlessly with the container background, minimizing the visual impact of letterboxing/pillarboxing.
