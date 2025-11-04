---
title: Universal Opt-In
description: Learn how to synchronize multiple opt-in checkboxes so that selecting one automatically selects all others in the same group.
---

The `UniversalOptIn` component synchronizes multiple opt-in checkboxes/radio buttons so that selecting one automatically mirrors the selection to all others in the same container. This creates a "universal opt-in" experience where users can opt in to all communications with a single click.

## How It Works

When a user clicks on a yes/no radio button or checkbox inside a container with the `universal-opt-in` class, the component automatically:
- Finds all other yes/no radio buttons or checkboxes in the same container
- Mirrors the selection to all other fields
- Works with both radio buttons and checkboxes

## Setup

Add the `universal-opt-in` class to any form block containing opt-in fields:

```html
<div class="en__component--formblock universal-opt-in">
  <!-- Opt-in fields here -->
</div>
```

## Behavior

### Universal Opt-In (Default)

With the `universal-opt-in` class:
- Clicking "Yes" on any field sets all other fields to "Y"
- Clicking "No" on any field sets all other fields to "N"

### Universal Opt-In Null

With the `universal-opt-in_null` class:
- Clicking "Yes" on any field sets all other fields to "Y"
- Clicking "No" on any field **unchecks** all other fields (sets them to unchecked state, but doesn't set value to "N")

## Examples

### Basic Universal Opt-In

```html
<div class="en__component--formblock universal-opt-in">
  <div class="en__field--supporterquestions12345">
    <label>Email Newsletter</label>
    <input type="radio" name="supporter.questions.12345" value="Y"> Yes
    <input type="radio" name="supporter.questions.12345" value="N"> No
  </div>
  
  <div class="en__field--supporterquestions67890">
    <label>SMS Updates</label>
    <input type="radio" name="supporter.questions.67890" value="Y"> Yes
    <input type="radio" name="supporter.questions.67890" value="N"> No
  </div>
  
  <div class="en__field--supporterquestions11111">
    <label>Postal Mail</label>
    <input type="radio" name="supporter.questions.11111" value="Y"> Yes
    <input type="radio" name="supporter.questions.11111" value="N"> No
  </div>
</div>
```

When a user clicks "Yes" on any of these opt-ins, all others will automatically be set to "Y".

### With Null Behavior

```html
<div class="en__component--formblock universal-opt-in_null">
  <!-- Same fields as above -->
</div>
```

When a user clicks "No" on any field, all other fields are unchecked (but not set to "N").

### With Checkboxes

The component also works with checkboxes:

```html
<div class="en__component--formblock universal-opt-in">
  <div class="en__field--supporterquestions12345">
    <label>
      <input type="checkbox" name="supporter.questions.12345" value="Y">
      Email Newsletter
    </label>
  </div>
  
  <div class="en__field--supporterquestions67890">
    <label>
      <input type="checkbox" name="supporter.questions.67890" value="Y">
      SMS Updates
    </label>
  </div>
</div>
```

When a checkbox is checked, all other checkboxes in the container are checked. When unchecked, all others are unchecked.

## Use Cases

### Single Opt-In for All Communications

Create a simple "Opt in to all communications" experience:

```html
<div class="universal-opt-in">
  <h3>Stay Connected</h3>
  <p>Check any box below to opt in to all communications:</p>
  
  <div class="en__field--supporterquestions12345">
    <label>Email Newsletter</label>
    <input type="radio" name="supporter.questions.12345" value="Y"> Yes
    <input type="radio" name="supporter.questions.12345" value="N"> No
  </div>
  
  <div class="en__field--supporterquestions67890">
    <label>SMS Updates</label>
    <input type="radio" name="supporter.questions.67890" value="Y"> Yes
    <input type="radio" name="supporter.questions.67890" value="N"> No
  </div>
</div>
```

### Multiple Opt-In Groups

You can have multiple universal opt-in groups on the same page:

```html
<!-- Marketing Communications -->
<div class="universal-opt-in">
  <h3>Marketing Communications</h3>
  <!-- Email, SMS, etc. -->
</div>

<!-- Administrative Communications -->
<div class="universal-opt-in">
  <h3>Administrative Communications</h3>
  <!-- Receipts, updates, etc. -->
</div>
```

Each group operates independently.

## Technical Details

- The component only affects fields within the same container
- Works with both radio buttons and checkboxes
- Only processes yes/no fields (value "Y" or "N")
- Fields must be inside the same container with the `universal-opt-in` class
- Works automatically - no configuration needed

## Important Notes

### Field Names

- Fields must have different `name` attributes
- The component will not sync a field to itself
- Each field in the group should be a separate supporter question

### Checkbox vs Radio Behavior

- **Checkboxes**: Checking/unchecking mirrors to all other checkboxes
- **Radio Buttons**: Selecting "Y" or "N" sets the value on all other radio groups

### Null Behavior

When using `universal-opt-in_null`:
- Clicking "No" unchecks all other fields
- Does not set the value to "N" - just unchecks
- Useful for forms where you want to allow users to opt out of all communications

## Best Practices

- Use clear messaging to explain the universal opt-in behavior
- Group related opt-ins together
- Consider using `universal-opt-in_null` if you want different behavior for "No" selections
- Test with multiple opt-in fields to ensure proper synchronization

