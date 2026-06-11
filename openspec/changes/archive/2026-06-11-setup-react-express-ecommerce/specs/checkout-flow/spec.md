## ADDED Requirements

### Requirement: Checkout submission
The system SHALL support submitting a checkout request to `POST /api/checkout` containing shipping, billing, and order item details.

#### Scenario: Complete mock checkout
- **WHEN** the user completes the checkout form and clicks "Complete Order"
- **THEN** the system POSTs the payload to `/api/checkout`, which saves the order to `db.json`, clears the active cart state, and returns a unique mock order ID.
