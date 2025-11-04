---
title: Fast Form Fill Tracking
description: Learn how to track when form blocks are completely filled using ENgrid's FastFormFill component.
---

The `FastFormFill` component tracks when specific form blocks are completely filled with all mandatory fields. It adds body data attributes that can be used for styling, conditional content, or other dynamic behavior.

## How It Works

The component monitors form blocks with special CSS classes (`fast-personal-details` or `fast-address-details`) and sets body data attributes when all mandatory fields in those blocks are filled.

## Setup

Add one of these classes to a form block component in Engaging Networks Page Builder:

- `fast-personal-details` - For personal information form blocks
- `fast-address-details` - For address information form blocks

## Body Data Attributes

The component sets these body data attributes:

- `data-engrid-hide-fast-personal-details="true"` - When all mandatory fields in `fast-personal-details` blocks are filled
- `data-engrid-hide-fast-personal-details="false"` - When not all mandatory fields are filled
- `data-engrid-hide-fast-address-details="true"` - When all mandatory fields in `fast-address-details` blocks are filled
- `data-engrid-hide-fast-address-details="false"` - When not all mandatory fields are filled

## Usage Examples

### Hide Form Blocks When Filled

```css
/* Hide the personal details block when all fields are filled */
body[data-engrid-hide-fast-personal-details="true"] .fast-personal-details {
  display: none;
}

/* Hide the address block when all fields are filled */
body[data-engrid-hide-fast-address-details="true"] .fast-address-details {
  display: none;
}
```

### Show Summary When Filled

```html
<div class="personal-details-summary hideif-fast-personal-details">
  <h3>Your Information</h3>
  <p>Name: {supporter.firstName} {supporter.lastName}</p>
  <p>Email: {supporter.emailAddress}</p>
</div>
```

```css
/* Show summary when form is filled */
body[data-engrid-hide-fast-personal-details="true"] .personal-details-summary {
  display: block;
}
```

### Conditional Content

Use helper classes to show/hide content based on fill status:

```html
<!-- Show when personal details are NOT fully filled -->
<div class="showif-fast-personal-details">
  <p>Please complete all required fields above.</p>
</div>

<!-- Show when personal details ARE fully filled -->
<div class="hideif-fast-personal-details">
  <p>All personal details complete! ✓</p>
</div>
```

## How It Determines "Filled"

The component considers a form block "filled" when:

- All mandatory (required) fields in the block have values
- For text/number/email/select/textarea fields: value is not empty
- For radio buttons: at least one option in the group is selected
- For checkboxes: at least one checkbox in the group is checked

## Integration with Remember Me

When `RememberMe` is enabled, the component waits for the Remember Me component to load data before checking fill status. This ensures that pre-filled data from Remember Me is properly detected.

## Complete Example

```html
<!-- Form Block with fast-personal-details class -->
<div class="en__component--formblock fast-personal-details">
  <!-- First Name (required) -->
  <!-- Last Name (required) -->
  <!-- Email (required) -->
</div>

<!-- Summary that shows when form is filled -->
<div class="personal-summary hideif-fast-personal-details">
  <h3>Review Your Information</h3>
  <p>All required fields are complete!</p>
</div>

<!-- Prompt that shows when form is not filled -->
<div class="fill-prompt showif-fast-personal-details">
  <p>Please complete all required fields to continue.</p>
</div>
```

```css
/* Hide the form block when filled */
body[data-engrid-hide-fast-personal-details="true"] .fast-personal-details {
  display: none;
}

/* Show summary when filled */
body[data-engrid-hide-fast-personal-details="true"] .personal-summary {
  display: block;
}

/* Hide prompt when filled */
body[data-engrid-hide-fast-personal-details="true"] .fill-prompt {
  display: none;
}
```

## Technical Details

- The component checks fill status on page load and after field changes
- Works with Remember Me - waits for data to load if Remember Me is enabled
- Supports multiple form blocks with the same class
- All blocks with the class must be filled for the attribute to be `"true"`
- Attributes are updated in real-time as users fill fields

## Helper Classes

ENgrid provides helper classes that work with this component:

- `showif-fast-personal-details` - Show element when personal details are NOT fully filled
- `hideif-fast-personal-details` - Hide element when personal details ARE fully filled
- `showif-fast-address-details` - Show element when address details are NOT fully filled
- `hideif-fast-address-details` - Hide element when address details ARE fully filled

## Best Practices

- Use `fast-personal-details` for name, email, phone fields
- Use `fast-address-details` for address, city, region, postal code fields
- Combine with Welcome Back component for a complete fast-fill experience
- Test with Remember Me to ensure proper integration

