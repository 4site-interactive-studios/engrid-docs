---
title: Form Validation
description: Learn about ENgrid's form validation features including EN validators, postal code validation, min/max amounts, and conditional required fields.
---

ENgrid provides several layers of form validation to ensure data quality before submission.

## EN Custom Validators

ENgrid can enforce Engaging Networks' custom field validators on the client side, providing immediate feedback before form submission.

### Configuration

Enable EN validators in your ENgrid theme options:

```ts
const options: Options = {
  ENValidators: true, // default: false
}
```

### Behavior

- Reads custom validators defined in EN's `window.EngagingNetworks.require._defined.enValidation.validation.validators`
- Only processes validators of type `"CUST"` (custom regex validators)
- Attaches live `input` event listeners to validated fields for real-time feedback
- On form submission, blocks submission and focuses the first invalid field if validation fails
- Adds/removes `en__field--validationFailed` CSS class on invalid fields

---

## Postal Code Validator

Validates postal/zip codes based on the selected country, ensuring the format matches the expected pattern for that country.

### Behavior

- Monitors the postal code field and the country field
- When the country changes, updates the expected postal code format
- Validates the postal code on form submission
- Supports country-specific patterns (e.g., 5-digit ZIP for US, alphanumeric for UK/Canada)

---

## Min/Max Donation Amount

Validates that the donation amount falls within configurable minimum and maximum bounds.

### Configuration

```ts
const options: Options = {
  MinAmount: 1,           // Minimum allowed donation (default: 1)
  MaxAmount: 100000,      // Maximum allowed donation (default: 100000)
  MinAmountMessage: "Invalid Amount",  // Error message for below-minimum
  MaxAmountMessage: "Invalid Amount",  // Error message for above-maximum
}
```

### Using EN's Built-in Validators

You can also read min/max values from Engaging Networks' built-in amount validators:

```ts
const options: Options = {
  UseAmountValidatorFromEN: true, // Reads min/max from EN's validators
}
```

### Behavior

- Only runs on donation pages
- Provides live validation with a 1-second debounce as the donor types
- Blocks form submission if the amount is out of range
- Displays error messages on the amount field

---

## Required If Visible

The Required If Visible feature automatically makes fields required only when they are visible on the page. This is useful for conditional form sections that may or may not be displayed.

### Behavior

- Monitors form fields that are inside conditionally visible containers
- When a container becomes visible, its fields become required
- When a container is hidden, its fields are no longer required
- This prevents validation errors on fields the user cannot see

---

## Capitalize Fields

ENgrid automatically capitalizes the first letter of name and address fields to ensure consistent data formatting. This applies to fields like first name, last name, address lines, and city.
