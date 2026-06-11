# Furniture Catalog

## Purpose
TBD: Define the purpose and operations of the furniture catalog cataloging system.

## Requirements

### Requirement: Get product list
The backend system SHALL expose a REST API endpoint at `GET /api/products` that returns the list of all available furniture blueprints in JSON format.

#### Scenario: Requesting all products
- **WHEN** the frontend requests the product catalog from `GET /api/products`
- **THEN** the API returns a `200 OK` status with a list of products containing the name, base price, options (sizes, materials), add-on options, image URLs, and details.

### Requirement: Product Detail Page selection
The system SHALL allow the user to view the detail page for a specific product and dynamically calculate the subtotal based on the selected size, material, and modular add-ons.

#### Scenario: Select bed queen size with add-ons
- **WHEN** the user selects "Queen" size, "Natural Birch" material, and checks the "Integrated Headboard" (+$400) add-on
- **THEN** the display price updates to reflect the sum of the base price and the selected add-on price ($1,200 + $400 = $1,600).
