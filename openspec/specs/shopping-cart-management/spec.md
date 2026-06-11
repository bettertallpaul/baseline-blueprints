# Shopping Cart Management

## Purpose
TBD: Define the purpose and operation of the persistent shopping cart.

## Requirements

### Requirement: Persisted shopping cart state
The frontend system SHALL maintain a client-side shopping cart context that is persisted in `localStorage`.

#### Scenario: App load loads cart
- **WHEN** the application is loaded
- **THEN** it reads the stored cart items from `localStorage` and populates the global cart context.

### Requirement: Add item to cart
The user SHALL be able to add a configured product variation to the shopping cart, which is saved as a distinct line item based on its selected options.

#### Scenario: Adding item with unique options
- **WHEN** the user clicks "Add to Project" on the PDP with a specific size and material selected
- **THEN** the system pushes a new item containing those option selections to the cart, calculates the updated subtotal, and opens the cart drawer overlay.

### Requirement: Edit cart item quantity
The user SHALL be able to modify the quantity of any line item in the cart or remove it entirely.

#### Scenario: Increasing cart item quantity
- **WHEN** the user changes the quantity of an item in the cart drawer or cart page
- **THEN** the system updates the item count, recalculates the subtotal, and updates the local storage.
