---
title: Form Field Enhancements
description: Components that enhance form field behavior including accessibility, autocomplete, capitalization, custom labels, focus states, and placeholders
---

## Overview

ENgrid provides several components that automatically enhance form fields with better accessibility, user experience, and data quality features. These components run automatically during page initialization.

---

## Accessibility (A11y)

The `A11y` class automatically adds accessibility attributes and features to ensure ENgrid forms meet WCAG standards. For a high-level overview of all ENgrid accessibility features, see [Accessibility Features](/docs/v2/accessibility-overview).

### Features

#### 1. Required Field Indicators

Adds `aria-required="true"` to all mandatory form fields.

```html
<!-- Automatically enhanced -->
<input name="supporter.emailAddress" aria-required="true">
```

#### 2. Radio Button Groups

Adds proper ARIA roles and labels to radio button groups:

```html
<!-- Automatically enhanced -->
<div class="en__field--radio" role="group" aria-labelledby="label-abc123">
  <label id="label-abc123">Frequency</label>
  <!-- Radio buttons -->
</div>
```

#### 3. Other Amount Field Label

Adds an accessible label to the "other amount" input:

```html
<input class="en__field__input--otheramount" 
       aria-label="Enter your custom donation amount">
```

#### 4. Split Select Labels

For split selects without labels, uses the first option as an `aria-label`:

```html
<select class="en__field__input--splitselect" 
        aria-label="Choose your title">
  <option value="">Choose your title</option>
  <option value="Mr">Mr</option>
</select>
```

#### 5. Frequency Field Label Updates

Dynamically updates the main frequency label to point to the selected radio button, improving screen reader experience.

#### 6. Auto-Generated Image Alt Tags

For eCard images without alt text, automatically generates descriptive alt tags from filenames:

```javascript
// Before: <img src="holiday-card-2024.jpg">
// After: <img src="holiday-card-2024.jpg" 
//             alt="This is an auto-generated alt tag from the filename: holiday card 2024">
```

The generator:
- Removes file extensions
- Converts `-` and `_` to spaces
- Removes dimension indicators (e.g., `800x600`)
- Adds disclaimer prefix

#### 7. Error List Alert Management

Dynamically manages the `role="alert"` attribute on the error list:
- Adds `role="alert"` when errors are present
- Removes role when error list is empty
- Watches for changes via MutationObserver

{% callout title="You should know!" %}
All A11y enhancements run automatically. No configuration required.
{% /callout %}

---

## Autocomplete

The `Autocomplete` class adds standard HTML autocomplete attributes to form fields, enabling browsers to suggest previously entered values and improving mobile experience.

### Fields Enhanced

| Field | Autocomplete Value |
| ----- | ------------------ |
| First Name | `given-name` |
| Last Name | `family-name` |
| Email Address | `email` |
| Phone Number | `tel` |
| Country | `country` |
| Address Line 1 | `address-line1` |
| Address Line 2 | `address-line2` |
| City | `address-level2` |
| Region/State | `address-level1` |
| Postal Code | `postal-code` |
| Credit Card Expiration (Month) | `cc-exp-month` |
| Credit Card Expiration (Year) | `cc-exp-year` |

### Disabled Autocomplete

For security and UX reasons, autocomplete is explicitly disabled (`none`) on:
- Honoree name fields
- Recipient email and address fields (tribute gifts)

This prevents browsers from suggesting the donor's information when filling in recipient details.

### Example Result

```html
<!-- Automatically enhanced -->
<input name="supporter.firstName" autocomplete="given-name">
<input name="supporter.emailAddress" autocomplete="email">
<input name="transaction.infemail" autocomplete="none">
```

{% callout title="Tip" %}
Autocomplete dramatically improves mobile donation completion rates by reducing typing required.
{% /callout %}

---

## Capitalize Fields

The `CapitalizeFields` class automatically capitalizes the first letter of each word in specific fields when the form is submitted, ensuring consistent data formatting.

### Fields Capitalized

- First Name (`supporter.firstName`)
- Last Name (`supporter.lastName`)
- Address Line 1 (`supporter.address1`)
- City (`supporter.city`)

### How It Works

The component subscribes to the form's `onSubmit` event and transforms values just before submission:

**User Input:** `john smith`  
**Submitted Value:** `John Smith`

**User Input:** `123 main street`  
**Submitted Value:** `123 Main Street`

### Behavior

- Capitalizes the first letter of every word
- Preserves existing capitalization within words
- Runs only on submit (doesn't modify input while typing)
- Logs actions when debug mode is enabled

{% callout title="Information" %}
This component improves data quality for CRM systems and ensures professional formatting of supporter information.
{% /callout %}

---

## Checkbox Label

The `CheckboxLabel` class allows you to set custom labels for checkboxes on a per-page basis, which is not possible through the Engaging Networks interface.

### Usage

Place a div with class `checkbox-label` immediately before the checkbox form block:

```html
<div class="checkbox-label">
  <p>I would like to receive monthly updates about your impact</p>
</div>

<div class="en__component en__component--formblock">
  <div class="en__field en__field--checkbox">
    <!-- Checkbox content -->
  </div>
</div>
```

### Result

The HTML from `.checkbox-label` replaces the standard EN checkbox label:

```html
<label>
  <input type="checkbox">
  <div class="engrid-custom-checkbox-label">
    <p>I would like to receive monthly updates about your impact</p>
  </div>
</label>
```

The original `.checkbox-label` element is removed after processing.

### Features

- Supports HTML content (not just plain text)
- Automatically removed after label is set
- Works with multiple checkboxes on same page
- Logs actions in debug mode

### Example with Rich Content

```html
<div class="checkbox-label">
  <strong>Yes!</strong> Send me updates <em>(you can unsubscribe anytime)</em>
</div>
```

---

## Input Has Value and Focus

The `InputHasValueAndFocus` class adds CSS classes to form fields based on their state, enabling advanced styling and floating label patterns.

### Classes Added

| Class | When Applied |
| ----- | ------------ |
| `.has-value` | Field contains a value |
| `.has-focus` | Field is currently focused |

### Supported Field Types

- Text inputs
- Email inputs
- Telephone inputs
- Number inputs
- Textareas
- Select dropdowns
- Checkboxes

### How It Works

The component:
1. Checks all fields on page load
2. Adds `.has-value` if field already contains data
3. Adds `.has-focus` when field receives focus
4. Removes `.has-focus` when field loses focus
5. Adds/removes `.has-value` as user types

### CSS Usage Example

```css
/* Hide label by default */
.en__field label {
  display: none;
}

/* Show label when field has value or focus */
.en__field.has-value label,
.en__field.has-focus label {
  display: block;
  font-size: 0.8em;
}

/* Floating label pattern */
.en__field label {
  transform: translateY(20px);
  transition: transform 0.2s;
}

.en__field.has-value label,
.en__field.has-focus label {
  transform: translateY(0);
}
```

### Material Design Style Labels

This component enables Material Design-style floating labels without additional JavaScript:

```css
.en__field {
  position: relative;
}

.en__field label {
  position: absolute;
  top: 20px;
  left: 10px;
  transition: all 0.2s;
  pointer-events: none;
}

.en__field.has-value label,
.en__field.has-focus label {
  top: 0;
  font-size: 12px;
  color: blue;
}
```

---

## Input Placeholders

The `InputPlaceholders` class automatically adds placeholder text to form fields when the `data-engrid-add-input-placeholders` attribute is present on the body element.

### Enabling Placeholders

Add this to your page body or let ENgrid set it:

```html
<body data-engrid-add-input-placeholders="true">
```

### Default Placeholders

The component includes defaults for all standard EN fields:

| Field | Default Placeholder |
| ----- | ------------------- |
| First Name | "First Name" |
| Last Name | "Last Name" |
| Email Address | "Email Address" |
| Phone Number | "Phone Number (Optional)" |
| Address Line 1 | "Street Address" |
| Address Line 2 | "Apt., Ste., Bldg." |
| City | "City" |
| Postal Code | "ZIP Code" |
| Other Amount | "Other" |
| Credit Card Expiration | "MM / YY" |
| Honoree Name | "Honoree Name" |
| Recipient Name | "Recipient Name" |

...and many more (over 30 fields covered).

### Customizing Placeholders

Override defaults globally via `window.EngridOptions`:

```javascript
window.EngridOptions = {
  Placeholders: {
    "input#en__field_supporter_firstName": "Your First Name",
    "input#en__field_supporter_emailAddress": "your.email@example.com"
  }
};
```

Or on a specific page via `window.EngridPageOptions`:

```html
<script type="text/javascript">
window.EngridPageOptions = {
  Placeholders: {
    "input#en__field_supporter_firstName": "Nome",
    "input#en__field_supporter_lastName": "Sobrenome",
    "input#en__field_supporter_emailAddress": "Endereço de E-mail"
  }
};
</script>
```

### Placeholder Examples

```html
<!-- Automatically enhanced -->
<input id="en__field_supporter_firstName" 
       placeholder="First Name">

<input id="en__field_supporter_emailAddress" 
       placeholder="Email Address">

<input class="en__field__input--other" 
       placeholder="Other">
```

### Conditional Placeholders

Some fields have conditional placeholders based on whether they're required:

```javascript
// Optional field
"input#en__field_supporter_phoneNumber": "Phone Number (Optional)"

// If field is mandatory
".en__mandatory input#en__field_supporter_phoneNumber": "Phone Number"
```

{% callout title="Tip" %}
Placeholders improve UX but should not replace visible labels for accessibility. Use both for best results.
{% /callout %}

### Custom Selectors

You can target fields using any CSS selector:

```javascript
{
  Placeholders: {
    ".page-specific-field input": "Custom placeholder",
    "input[name='custom.field']": "Another placeholder"
  }
}
```

## Input Required Visibility
<!-- RequiredIfVisible -->
The Required If Visible component allows you to make form fields required conditionally based on their visibility. This is particularly useful when you have fields that are hidden by default and only shown based on user interaction or other conditions. Instead of always being required, these fields will only be validated when they are actually visible to the user.

### How It Works

The component monitors specific fields during form validation and:
1. Checks if the field is visible to the user
2. If visible, validates that the field has a value
3. Displays an error message and prevents form submission if the field is empty
4. Automatically focuses on the first empty required field

### Adding Conditionally Required Fields

To make a field conditionally required, add a helper class to the field block containing the `.en__field` element:

```html
<div class="en__component en__component--formblock i-required">
  <!-- Your field markup -->
</div>
```

This can be done in the Engaging Networks page builder by adding a custom class to your form block.

#### Available Helper Classes

You can make specific fields conditionally required using these classes:

| Class         | Description                                     |
| ------------- | ----------------------------------------------- |
| `i-required`  | Makes all fields in the block required when visible |
| `i1-required` | Makes the 1st field required when visible       |
| `i2-required` | Makes the 2nd field required when visible       |
| `i3-required` | Makes the 3rd field required when visible       |
| `i4-required` | Makes the 4th field required when visible       |
| `i5-required` | Makes the 5th field required when visible       |
| `i6-required` | Makes the 6th field required when visible       |
| `i7-required` | Makes the 7th field required when visible       |
| `i8-required` | Makes the 8th field required when visible       |
| `i9-required` | Makes the 9th field required when visible       |
| `i10-required` | Makes the 10th field required when visible     |
| `i11-required` | Makes the 11th field required when visible     |

### Validation Behavior

When a conditionally required field fails validation:

- The field receives an error message
- The error message defaults to `"{Field Label} is required"`
- If no field label is found, the message falls back to `"This field is required"`
- The field automatically receives focus
- Form submission is prevented

{% callout title="You should know!" %}
The validation checks fields in reverse order, ensuring that the highest (first) empty required field receives focus and displays its error first.
{% /callout %}

### Example Usage

#### Making a Hidden Field Required When Shown

```html
<div class="en__component en__component--formblock i-required hideif-not-other">
  <div class="en__field">
    <label class="en__field__label" for="other-reason">Please specify</label>
    <input class="en__field__input" type="text" id="other-reason" name="other_reason" />
  </div>
</div>
```

In this example, the field is hidden by default with `hideif-not-other` and only becomes required when it becomes visible.

#### Making Specific Fields in a Multi-Field Block Required

```html
<div class="en__component en__component--formblock i2-required">
  <div class="en__field">
    <label class="en__field__label">First Name</label>
    <input type="text" name="first_name" />
  </div>
  <div class="en__field">
    <label class="en__field__label">Last Name</label>
    <input type="text" name="last_name" />
  </div>
</div>
```

Here, only the 2nd field (Last Name) will be required when visible, while the first field remains optional.

### Technical Details

The Required If Visible component:
- Subscribes to the form's validation event
- Only runs when at least one conditionally required field is present
- Validates visible fields that don't have the `[data-unhidden]` attribute
- Supports input fields, select dropdowns, and textareas
- Ignores hidden input fields (`input[type=hidden]`)

{% callout title="You should know!" %}
Fields with the `[data-unhidden]` attribute are excluded from conditional required validation, even if they have a required helper class.
{% /callout %}


## Universal Opt-In

The `UniversalOptIn` class synchronizes multiple opt-in checkboxes or yes/no radio buttons, ensuring that when a supporter opts in (or out) of one communication preference, all related preferences are mirrored automatically.

### How It Works

When you have multiple communication opt-in fields on a form (e.g., email updates, SMS notifications, partner communications), this component ensures they stay in sync:

1. User clicks any yes/no radio button or checkbox
2. All other radio buttons/checkboxes in the same universal opt-in group mirror that selection
3. Reduces user friction by eliminating repetitive clicking

### Basic Usage

Wrap your opt-in fields in a container with the `universal-opt-in` class:

```html
<div class="universal-opt-in">
  <div class="en__component en__component--formblock">
    <div class="en__field en__field--radio">
      <label>Email updates</label>
      <input type="radio" name="supporter.questions.opt_in_email" value="Y"> Yes
      <input type="radio" name="supporter.questions.opt_in_email" value="N"> No
    </div>
  </div>
  
  <div class="en__component en__component--formblock">
    <div class="en__field en__field--radio">
      <label>SMS notifications</label>
      <input type="radio" name="supporter.questions.opt_in_sms" value="Y"> Yes
      <input type="radio" name="supporter.questions.opt_in_sms" value="N"> No
    </div>
  </div>
  
  <div class="en__component en__component--formblock">
    <div class="en__field en__field--checkbox">
      <label>Partner communications</label>
      <input type="checkbox" name="supporter.questions.opt_in_partners">
    </div>
  </div>
</div>
```

### Behavior Modes

#### Standard Mode: `universal-opt-in`

With the `universal-opt-in` class:
- Selecting **Yes** on any field → Selects **Yes** on all fields
- Selecting **No** on any field → Selects **No** on all fields
- Checking any checkbox → Checks all checkboxes
- Unchecking any checkbox → Unchecks all checkboxes

#### Null Mode: `universal-opt-in_null`

With the `universal-opt-in_null` class:
- Selecting **Yes** on any field → Selects **Yes** on all fields
- Selecting **No** on any field → **Unsets** all other fields (leaves them blank)
- Checking any checkbox → Checks all checkboxes
- Unchecking any checkbox → Unchecks all checkboxes

This mode is useful when you want "Yes" to be universal, but "No" to allow individual control.

### Use Cases

#### Communication Preferences

Simplify multi-channel opt-in forms:

```html
<div class="universal-opt-in">
  <!-- Email, SMS, Phone, Mail opt-ins all sync -->
</div>
```

When a supporter selects "Yes" to email updates, they automatically opt into SMS, phone, and mail as well.

#### Multi-Language Forms

When offering the same opt-in in multiple languages:

```html
<div class="universal-opt-in">
  <!-- English version -->
  <!-- Spanish version -->
</div>
```

Selecting either language's option updates both.

### Checkbox Support

The component works with both radio buttons and checkboxes:

```html
<div class="universal-opt-in">
  <input type="checkbox" name="email_opt_in">
  <input type="checkbox" name="sms_opt_in">
  <input type="checkbox" name="mail_opt_in">
</div>
```

All checkboxes will mirror each other's checked/unchecked state.

### Radio Button Support

For yes/no radio buttons:

```html
<div class="universal-opt-in">
  <div class="en__field">
    <input type="radio" name="email_updates" value="Y"> Yes
    <input type="radio" name="email_updates" value="N"> No
  </div>
  
  <div class="en__field">
    <input type="radio" name="sms_updates" value="Y"> Yes
    <input type="radio" name="sms_updates" value="N"> No
  </div>
</div>
```

Radio buttons with `value="Y"` are treated as "Yes" and `value="N"` as "No".

### Example: Standard vs Null Mode

#### Standard Mode Behavior

```html
<div class="universal-opt-in">
  <!-- Field A, Field B, Field C -->
</div>
```

| User Action | Result |
| ----------- | ------ |
| Selects "Yes" on Field A | All fields set to "Yes" |
| Selects "No" on Field B | All fields set to "No" |

#### Null Mode Behavior

```html
<div class="universal-opt-in_null">
  <!-- Field A, Field B, Field C -->
</div>
```

| User Action | Result |
| ----------- | ------ |
| Selects "Yes" on Field A | All fields set to "Yes" |
| Selects "No" on Field B | Field B = "No", Field A & C = unselected |

### Technical Details

The component:
- Automatically detects elements with `.universal-opt-in` or `.universal-opt-in_null` classes
- Only runs when at least one universal opt-in element is found
- Adds click event listeners to all radio buttons and checkboxes within the container
- Uses `ENGrid.setFieldValue()` for radio buttons to ensure proper EN form handling
- Directly manipulates `checked` property for checkboxes

### Debugging

The component includes logging:

```javascript
// Console output:
// 🪞 UniversalOptIn: Found 2 universal opt-in elements.
// 🪞 UniversalOptIn: Yes/No radio is checked
// 🪞 UniversalOptIn: Yes/No checkbox is unchecked
```

Look for the 🪞 emoji in your browser console to see UniversalOptIn activity.

### Multiple Groups

You can have multiple independent universal opt-in groups on the same page:

```html
<!-- Group 1: Communication preferences -->
<div class="universal-opt-in">
  <!-- Email, SMS opt-ins -->
</div>

<!-- Group 2: Partner opt-ins -->
<div class="universal-opt-in">
  <!-- Partner A, Partner B opt-ins -->
</div>
```

Each group operates independently—clicking a field in Group 1 won't affect Group 2.

### Best Practices

{% callout title="You should know!" %}
Use Universal Opt-In when you want to simplify the user experience for related opt-in fields. Don't use it for unrelated preferences that supporters should control independently.
{% /callout %}

---

## Other Helper Classes

Utility classes to hide form fields (e.g "i1" = 1st field) in a component or just its label. You can use up to 10 per form component.

| Class           | Description                                                                | Usable on Thank You Pages |
| --------------- | -------------------------------------------------------------------------- | ------------------------- |
| `i1-hide`       | Hides the entire 1st field both visually and from screen readers           | Yes                       |
| `i1-hide-label` | Hides the 1st field's label visually but not for screen readers            | Yes                       |
| `i1-start`      | Indicates the 1st field is at the start of its visual row in the form flow | Yes                       |
| `i1-end`        | Indicates the 1st field is at the end of its visual row in the form flow   | Yes                       |
| `i1-20`         | 20% width                                                                  | Yes                       |
| `i1-25`         | 25% width                                                                  | Yes                       |
| `i1-33`         | 33% width                                                                  | Yes                       |
| `i1-50`         | 50% width                                                                  | Yes                       |
| `i1-66`         | 66% width                                                                  | Yes                       |
| `i1-75`         | 75% width                                                                  | Yes                       |
| `i1-100`        | 100% width, does not need the iX-start or iX-end helper classes            | Yes                       |
| `i1-m50`        | 50% width on the ENgrid Mobile breakpoint, not client theme                | Yes                       |
| `i1-m100`       | 100% width on the ENgrid Mobile breakpoint, not client theme               | Yes                       |


## Integration Example

All these components work together seamlessly:

```html
<div class="en__field en__field--text en__mandatory has-value">
  <label for="en__field_supporter_firstName" 
         aria-required="true">First Name</label>
  <input id="en__field_supporter_firstName"
         name="supporter.firstName"
         type="text"
         placeholder="First Name"
         autocomplete="given-name"
         aria-required="true"
         value="John">
</div>
```

This field benefits from:
- ✅ Accessibility enhancements (aria-required)
- ✅ Autocomplete for browser suggestions
- ✅ Automatic capitalization on submit
- ✅ State class for styling (has-value)
- ✅ Helpful placeholder text

## See also

- [Expand Region Name](./expand-region-name) - Automatically expands region codes to full names
- [Form Validation](./form-validation) - Custom validation rules and error handling
- [Remember Me](./remember-me) - Automatically fills supporter info based on cookies
- [URL Parameters](./data-and-url-parameters#url-to-form) - URL parameters for pre-filling form data
- [Autosubmit](./auto-fill-smart-defaults#autosubmit) - Automatically submit forms