## ADDED Requirements

### Requirement: GrowthBook Feature Flag Control
The PDP image viewer layout and details gallery SHALL dynamically toggle between the default layout and the alternate layout based on the GrowthBook feature flag `pdp-image-viewer-layout`.

#### Scenario: GrowthBook variant is alt-gallery
- **WHEN** the page loads and the GrowthBook experiment value for `pdp-image-viewer-layout` is `alt-gallery`
- **THEN** the alternate thumbnail image viewer is displayed, and the bottom details grid is hidden

#### Scenario: GrowthBook variant is default
- **WHEN** the page loads and the GrowthBook experiment value for `pdp-image-viewer-layout` is `default` (or not set)
- **THEN** the default single-image viewer is displayed, and the bottom details grid is visible

### Requirement: Thumbnail Image Switching
The alternate image viewer SHALL display a list of thumbnails representing the main product image followed by the product detail images. Clicking any thumbnail MUST update the main viewport to show the corresponding full-size image.

#### Scenario: Clicking a thumbnail
- **WHEN** the user clicks a thumbnail representing a detail image
- **THEN** the main viewport immediately switches to display the clicked image, and the clicked thumbnail is styled as active

### Requirement: Multi-Aspect Ratio Accommodation
The alternate image viewer SHALL accommodate both 4:3 (landscape) and 3:4 (portrait) image aspect ratios inside the main viewport and thumbnails without changing the height of the main viewport container or causing page layout shifts.

#### Scenario: Viewing a landscape image followed by a portrait image
- **WHEN** the user clicks a thumbnail for a 4:3 landscape image and then clicks a thumbnail for a 3:4 portrait image
- **THEN** both images are fully visible within the main viewport container, centered, and the height of the main viewport container remains constant

### Requirement: Responsive Thumbnail Placement
The alternate image viewer SHALL render thumbnails as a vertical column on the left of the main image on desktop screens (md breakpoint and up), and as a horizontal scrolling list below the main image on mobile screens.

#### Scenario: Loading PDP on mobile device
- **WHEN** the user views the product detail page on a viewport width less than 768px (mobile)
- **THEN** the thumbnails are displayed in a horizontal scrolling row below the main image container
