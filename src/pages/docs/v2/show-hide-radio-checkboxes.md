---
title: Show/Hide Radio and Checkbox Fields
description: Component that conditionally shows and hides page elements based on radio button and checkbox selections
---

## Overview

The `ShowHideRadioCheckboxes` class creates dynamic show/hide behavior for page content based on form field selections. When a radio button or checkbox is selected, specific div elements with matching class names are displayed or hidden.

## Usage

```javascript
new ShowHideRadioCheckboxes(
  fieldName: string,  // Name attribute of radio/checkbox inputs
  classPrefix: string // Class prefix for show/hide divs
);
```

### Example

```javascript
// JavaScript
new ShowHideRadioCheckboxes("transaction.donationAmt", "amount");
```

```html
<!-- HTML: Radio buttons -->
<input type="radio" name="transaction.donationAmt" value="25"> $25
<input type="radio" name="transaction.donationAmt" value="50"> $50
<input type="radio" name="transaction.donationAmt" value="other"> Other

<!-- Conditional content divs -->
<div class="amount25">
  Content shown when $25 is selected
</div>

<div class="amount50">
  Content shown when $50 is selected
</div>

<div class="amountother">
  Custom amount field shown for "other"
</div>
```

## How It Works

1. **Class Matching**: The component looks for divs with class names formed by combining the classPrefix + field value (with special characters removed)

2. **Auto-Hide**: On initialization, all conditional divs are hidden

3. **Auto-Show**: When a radio/checkbox is selected, matching divs are displayed

4. **Event Listening**: Monitors `change` events on the input fields

5. **State Persistence**: Stores selection state in sessionStorage for multi-page forms

## Class Name Generation

Field values are sanitized to create valid class names:

| Field Value | Class Prefix | Resulting Class |
| ----------- | ------------ | --------------- |
| `25` | `amount` | `.amount25` |
| `$50` | `amount` | `.amount50` |
| `one-time` | `frequency` | `.frequencyonetime` |
| `Y` | `recurr` | `.recurrY` |

**Rule**: All non-word characters (`/\W/g`) are removed from the value.

## Field Value Preservation

When fields are hidden/shown, the component intelligently manages field values:

- **On Hide**: Current field values are saved to `data-value` attribute, then fields are reset to their `data-original-value`
- **On Show**: Values from `data-value` are restored
- **ARIA**: `aria-required` is set to `false` when hidden, `true` when shown

This ensures:
- Hidden fields don't submit unexpected data
- User input is preserved when toggling visibility
- Proper accessibility attributes

{% callout title="You should know!" %}
Fields within conditional divs must be `input[type='text']`, `input[type='number']`, `input[type='email']`, `select`, or `textarea` to have their values managed.
{% /callout %}

## Checkboxes vs Radio Buttons

### Radio Buttons
- Show div matching the selected radio value
- Only one div visible at a time
- Automatically hide others when selection changes

### Checkboxes
- Show div when checkbox is checked
- Hide div when checkbox is unchecked
- Multiple checkboxes can show content simultaneously

## Session State Management

The component stores the current selection state in sessionStorage to maintain consistency across multi-page donation flows:

```javascript
// Stored format
{
  page: 12345,
  class: "amount",
  value: "50"
}
```

This allows:
- Returning to previous pages with correct content shown
- Consistent UX across page refreshes
- Per-page state tracking

## Example Use Cases

### 1. Different Content per Donation Amount

```javascript
new ShowHideRadioCheckboxes("transaction.donationAmt", "show-for-");
```

```html
<input type="radio" name="transaction.donationAmt" value="50"> $50
<input type="radio" name="transaction.donationAmt" value="100"> $100

<div class="show-for-50">
  <p>$50 provides meals for 5 families</p>
</div>

<div class="show-for-100">
  <p>$100 provides meals for 10 families + school supplies</p>
</div>
```

### 2. Conditional Fields Based on Frequency

```javascript
new ShowHideRadioCheckboxes("transaction.recurrpay", "recurr-");
```

```html
<input type="radio" name="transaction.recurrpay" value="Y"> Monthly
<input type="radio" name="transaction.recurrpay" value="N"> One-Time

<div class="recurr-Y">
  <p>Thank you for your monthly commitment!</p>
  <input name="custom.monthly_preference" placeholder="Preferred processing day">
</div>

<div class="recurr-N">
  <p>Make a one-time impact today!</p>
</div>
```

### 3. Show Additional Fields for "Other" Amount

```javascript
new ShowHideRadioCheckboxes("transaction.donationAmt", "amt-");
```

```html
<input type="radio" name="transaction.donationAmt" value="25"> $25
<input type="radio" name="transaction.donationAmt" value="other"> Other Amount

<div class="amt-other">
  <label>Enter your custom amount:</label>
  <input type="number" name="transaction.donationAmt.other">
</div>
```

### 4. Checkbox Toggle for Tribute Gift

```javascript
new ShowHideRadioCheckboxes("transaction.tribute", "tribute-");
```

```html
<input type="checkbox" name="transaction.tribute" value="Y"> 
Make this a tribute gift

<div class="tribute-Y">
  <input name="transaction.honname" placeholder="Honoree Name">
  <input name="transaction.infemail" placeholder="Recipient Email">
</div>
```

## Debugging

Enable debug mode to see console logs:

```
?debug=true
```

Output includes:
```
👁 [ENgrid ShowHideRadioCheckboxes] Hiding <div class="amount25">
👁 [ENgrid ShowHideRadioCheckboxes] Showing <div class="amount50">
👁 [ENgrid ShowHideRadioCheckboxes] aria-required set to TRUE <input>
👁 [ENgrid ShowHideRadioCheckboxes] storing radio state {...}
```

## Best Practices

1. **Use Clear Class Prefixes**: Choose prefixes that describe the field purpose (`amount-`, `frequency-`, `gift-type-`)

2. **Sanitize Field Values**: Remember special characters are removed. `one-time` becomes `onetime`

3. **Hide by Default**: Conditional divs should have `display: none` or be positioned off-screen initially

4. **Test All Options**: Verify each radio/checkbox value shows the correct content

5. **Consider Required Fields**: Fields in conditional divs should only be required if their container is visible

## Multiple Instances

You can create multiple show/hide behaviors on the same page:

```javascript
new ShowHideRadioCheckboxes("transaction.donationAmt", "amount-");
new ShowHideRadioCheckboxes("transaction.recurrpay", "frequency-");
new ShowHideRadioCheckboxes("transaction.tribute", "tribute-");
```

Each operates independently with its own class namespace.

## CSS Patterns

```css
/* Hide conditional content by default */
[class^="amount-"],
[class^="frequency-"],
[class^="tribute-"] {
  display: none;
}

/* Style visible conditional content */
[class^="amount-"][style*="display: block"] {
  padding: 1rem;
  margin-top: 1rem;
  background: #f5f5f5;
}
```

## Limitations

- Field values must be valid identifier characters for classes
- Component removes `\W` (non-word) characters: letters, numbers, and underscore only
- Very long field values may create unwieldy class names
- Class names are case-sensitive
