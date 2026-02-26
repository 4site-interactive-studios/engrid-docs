---
title: Expand Region Name
description: This page shows how to automatically populate a hidden field with the full region name instead of its abbreviation
---

## Overview

The Expand Region Name component automatically captures the full name of a supporter's state, province, or region and saves it to a hidden field. This is useful when you want to store both the abbreviated code (e.g., "FL") and the full name (e.g., "Florida") for reporting or personalization purposes.

## How It Works

When a supporter selects their region from a dropdown or enters it in a text field:

1. The component monitors the standard `supporter.region` field
2. On form validation, it extracts the full region name
3. It populates a hidden field with the expanded region name
4. The hidden field is submitted along with the form

## Basic Setup

To enable the Expand Region Name component, configure it in your page code block:

```javascript
window.EngridOptions = {
  RegionLongFormat: 'supporter.questions.12345'
};
```

Replace `'supporter.questions.12345'` with the field name of your hidden field that will store the full region name.

{% callout title="You should know!" %}
The component automatically creates the hidden field if it doesn't exist on the page, so you don't need to manually add it to your form.
{% /callout %}

## Configuration

### Required Option

| Property | Description | Example |
| -------- | ----------- | ------- |
| `RegionLongFormat` | The field name for the hidden field that will store the expanded region name | `'supporter.questions.12345'` |

### Setting Up the Hidden Field

You have two options:

1. **Let ENgrid create it** - Just specify the field name in the configuration, and ENgrid will automatically create the hidden input field
2. **Create it manually** - Add a hidden input to your form with the specified field name

## Field Behavior

### With Select Dropdown (Most Common)

When the region field is a dropdown `<select>`:

```html
<select name="supporter.region">
  <option value="FL">Florida</option>
  <option value="NY">New York</option>
  <option value="CA">California</option>
</select>
```

The component:
- Reads the selected option's **text** (e.g., "Florida")
- Populates the hidden field with "Florida"
- This happens during form validation

### With Text Input

When the region field is a text input:

```html
<input type="text" name="supporter.region" value="Florida" />
```

The component:
- Reads the input field's **value** (e.g., "Florida")
- Populates the hidden field with "Florida"
- This happens during form validation

## Example Configurations

### Using a Custom Question Field

```javascript
window.EngridOptions = {
  RegionLongFormat: 'supporter.questions.234567'
};
```

### Using a Different Field Name

```javascript
window.EngridOptions = {
  RegionLongFormat: 'transaction.region_expanded'
};
```

## Complete Implementation Example

Here's a full example showing the configuration and the resulting form behavior:

```javascript
// In your page code block
window.EngridOptions = {
  RegionLongFormat: 'supporter.questions.123456'
};
```

**What happens:**

1. Supporter selects "California" from region dropdown (value: "CA")
2. Form validates when supporter submits
3. Hidden field `supporter.questions.123456` is set to "California"
4. Form submits with both:
   - `supporter.region` = "CA" (the abbreviation)
   - `supporter.questions.123456` = "California" (the full name)

## Use Cases

### Reporting and Data Analysis

Store full region names for easier reporting:
- Generate reports with "California" instead of "CA"
- No need to create lookup tables or transformations
- Data is human-readable in exports

### Personalization

Use the full region name in communications:
- "Thank you for your support from **Florida**!" (not "FL")
- Personalized email content with proper region names
- Better user experience in thank you pages

### CRM Integration

Pass both abbreviated and full region names to your CRM:
- Maintain compatibility with systems expecting state codes
- Also provide full names for display and personalization
- Flexible data mapping options

## Technical Details

### When Population Occurs

The hidden field is populated:
- During form validation (before submission)
- Only if the `supporter.region` field exists on the page
- Only if form validation passes

### Field Detection

The component looks for:
- A field with `name="supporter.region"` on the page
- Either a `<select>` dropdown or `<input>` text field
- If not found, the component logs a message and skips population

### Automatic Field Creation

If the specified hidden field doesn't exist:
- ENgrid automatically creates it using `ENGrid.createHiddenInput()`
- The field is added to the form
- No manual HTML editing required

## Debugging

The component includes logging to help troubleshoot:

```javascript
// Check the browser console for messages like:
// 🌍 ExpandRegionName: CREATED field supporter.questions.12345
// 🌍 ExpandRegionName: Populated field California
// 🌍 ExpandRegionName: No region field to populate the hidden region field with
```

Look for the 🌍 emoji in your browser console to see ExpandRegionName activity.

## Important Notes

{% callout title="You should know!" %}
The component only runs if the `RegionLongFormat` option is configured. Without this option, the component will not activate.
{% /callout %}

{% callout title="You should know!" %}
The hidden field is only populated during form validation. If validation fails for other reasons, the field may not be populated until the form successfully validates.
{% /callout %}

## Limitations

### Requires Region Field on Page

The component requires that:
- A `supporter.region` field exists on the form
- The field is visible and accessible to the supporter
- If no region field exists, the hidden field will remain empty

### Validation Timing

The population occurs during the `onValidate` event, which means:
- The field is populated just before form submission
- Changes to the region field after validation may not update the hidden field
- Re-validation will update the hidden field value

## Example: Full Form Setup

```html
<!-- Your EN form with region dropdown -->
<div class="en__component">
  <div class="en__field">
    <label for="supporter.region">State/Province</label>
    <select name="supporter.region">
      <option value="">Select...</option>
      <option value="AL">Alabama</option>
      <option value="AK">Alaska</option>
      <option value="CA">California</option>
      <option value="FL">Florida</option>
      <option value="NY">New York</option>
      <!-- etc -->
    </select>
  </div>
</div>

<script>
  window.EngridOptions = {
    RegionLongFormat: 'supporter.questions.expanded_region'
  };
</script>

<!-- Hidden field is automatically created by ENgrid -->
<!-- No need to manually add: 
  <input type="hidden" name="supporter.questions.expanded_region" />
-->
```

When a supporter selects "Florida":
- `supporter.region` = "FL"
- `supporter.questions.expanded_region` = "Florida"

Both values are submitted with the form.
