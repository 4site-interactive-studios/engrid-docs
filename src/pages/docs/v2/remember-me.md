---
title: Remember Me
description: This page shows how to use ENgrid's remember me feature.
---

## Overview

The Remember Me component allows supporters to save their form information for future visits, making it faster to complete forms on the same device. When a supporter opts in to "Remember Me," their non-financial information is stored locally or on a remote server, and automatically filled in when they return to complete another form.

{% callout title="You should know!" %}
Financial information is never stored. The Remember Me feature only saves personal details like name, email, address, and other non-payment fields.
{% /callout %}

## How It Works

The component provides two storage modes:

1. **Local Storage** - Uses browser cookies to store data on the supporter's device
2. **Remote Storage** - Uses a remote server via iframe postMessage to store data across domains

When a supporter returns:
- The component checks for saved data
- If found, it displays a "clear autofill" link and automatically fills in saved fields
- If not found, it displays a "Remember Me" checkbox for opt-in

## Basic Implementation

To enable the Remember Me component, initialize it in your page code block (for a page-by-page basis) or in client theme settings:

```javascript
EngridOptions = {
  RememberMe: {
    fieldNames: [
      'supporter.firstName',
      'supporter.lastName',
      'supporter.emailAddress',
      'supporter.address1',
      'supporter.city',
      'supporter.region',
      'supporter.postcode',
      'supporter.country'
    ]
  }
};
```

## Configuration Options

The Remember Me component accepts the following configuration options:

| Property | Description | Default |
| -------- | ----------- | ------- |
| `remoteUrl` | URL for remote iframe storage (enables cross-domain storage) | `null` (uses local cookies) |
| `cookieName` | Name of the cookie used to store data | `"engrid-autofill"` |
| `cookieExpirationDays` | Number of days before the cookie expires | `365` |
| `fieldNames` | Array of field names to save and restore | `[]` |
| `checked` | Whether the Remember Me checkbox is checked by default | `false` |

### Donation-Specific Options

For donation forms, you can configure how donation amounts are handled:

| Property | Description | Default |
| -------- | ----------- | ------- |
| `fieldDonationAmountRadioName` | Name of the donation amount radio field | `"transaction.donationAmt"` |
| `fieldDonationAmountOtherName` | Name of the other amount field | `"transaction.donationAmt.other"` |
| `fieldDonationRecurrPayRadioName` | Name of the recurring payment radio field | `"transaction.recurrpay"` |
| `fieldDonationAmountOtherCheckboxID` | ID of the other amount checkbox | `"#en__field_transaction_donationAmt4"` |

### UI Customization Options

Control where the Remember Me checkbox and clear link appear:

| Property | Description | Default |
| -------- | ----------- | ------- |
| `fieldOptInSelectorTarget` | CSS selector for where to insert the Remember Me checkbox | `".en__field--emailAddress.en__field"` |
| `fieldOptInSelectorTargetLocation` | Where to insert relative to target (`"before"` or `"after"`) | `"after"` |
| `fieldClearSelectorTarget` | CSS selector for where to insert the clear link | `'label[for="en__field_supporter_firstName"]'` |
| `fieldClearSelectorTargetLocation` | Where to insert relative to target (`"before"` or `"after"`) | `"before"` |

## Complete Configuration Example

```javascript
window.EngridOptions = {
  RememberMe: {
    // Storage settings
    cookieName: 'my-org-autofill',
    cookieExpirationDays: 730, // 2 years
    
    // Fields to save
    fieldNames: [
      'supporter.firstName',
      'supporter.lastName',
      'supporter.emailAddress',
      'supporter.phoneNumber',
      'supporter.address1',
      'supporter.city',
      'supporter.region',
      'supporter.postcode',
      'supporter.country'
    ],
    
    // Donation fields
    fieldDonationAmountRadioName: 'transaction.donationAmt',
    fieldDonationAmountOtherName: 'transaction.donationAmt.other',
    fieldDonationRecurrPayRadioName: 'transaction.recurrpay',
    
    // UI positioning
    fieldOptInSelectorTarget: '.en__field--emailAddress.en__field',
    fieldOptInSelectorTargetLocation: 'after',
    fieldClearSelectorTarget: 'label[for="en__field_supporter_firstName"]',
    fieldClearSelectorTargetLocation: 'before',
    
    // Default opt-in state
    checked: false
  }
};
```

## Remote Storage Setup

For cross-domain storage, you'll need to host an iframe HTML file on your domain:

```javascript
window.EngridOptions = {
  RememberMe: {
    remoteUrl: 'https://yourdomain.com/remember-me-iframe.html',
    fieldNames: [
      'supporter.firstName',
      'supporter.lastName',
      'supporter.emailAddress'
    ]
  }
};
```

{% callout title="You should know!" %}
Remote storage requires hosting an HTML file that handles postMessage communication. The remote URL must support localStorage and be accessible from your form pages.
{% /callout %}

## User Interface

### Remember Me Checkbox

When no saved data exists, the component displays a checkbox with an info icon:

- **Label**: "Remember Me"
- **Info tooltip**: Explains that financial information won't be stored and should only be used on personal devices
- **Checkbox state**: Controlled by the `checked` option

### Clear Autofill Link

When saved data exists, the component displays a link instead of the checkbox:

- **Text**: "(clear autofill)"
- **Action**: Clicking clears saved data and resets the form
- **Location**: Controlled by `fieldClearSelectorTarget` and `fieldClearSelectorTargetLocation`

## Custom Events

The Remember Me component dispatches custom events you can listen for:

### RememberMe_Loaded

Fired when the component finishes loading:

```javascript
window.addEventListener('RememberMe_Loaded', (e) => {
  if (e.detail.withData) {
    console.log('Remember Me loaded with saved data');
  } else {
    console.log('Remember Me loaded without saved data');
  }
});
```

### RememberMe_Cleared

Fired when the user clears their saved data:

```javascript
window.addEventListener('RememberMe_Cleared', () => {
  console.log('Remember Me data has been cleared');
});
```

## Field Behavior

### Supported Field Types

The component handles various field types:

- **Text inputs** - Standard text fields
- **Select dropdowns** - Single and multiple select
- **Radio buttons** - Selects the matching radio option
- **Checkboxes** - Checks if the value matches
- **Textareas** - Multi-line text fields

### Field Value Handling

- Values are URL-encoded when saved
- Values are decoded when restored
- Empty values are skipped during save
- Select fields only update if a matching option exists
- Radio/checkbox fields only check if the value matches

### Donation Amount Restoration

For donation amounts, the component:
1. Attempts to select a matching radio button
2. If no match, fills the "other amount" field
3. Triggers click events to ensure proper form updates

### Recurring Donation Restoration

For recurring donations:
- Only activates if the saved value is "Y"
- Clicks the recurring radio button to trigger any dependent logic

## Security and Privacy

{% callout title="You should know!" %}
The component is designed for personal devices only. The info tooltip explicitly warns supporters to only use this feature on their own devices, not on shared or public computers.
{% /callout %}

### What Is Saved

- Personal information fields specified in `fieldNames`
- Non-financial data only
- Data is stored as URL-encoded strings

### What Is NOT Saved

- Credit card numbers
- CVV codes
- Bank account information
- Any payment-related sensitive data

## Technical Details

### Cookie Storage

When using local storage:
- Data is stored in a browser cookie with the specified name
- Cookie expires after the configured number of days
- Cookie is cleared when the user clicks "clear autofill"

### Remote Storage

When using remote storage:
- Creates a hidden sandboxed iframe
- Communicates via postMessage API
- Requires JSON and localStorage support in the browser
- iframe has `allow-same-origin allow-scripts` permissions

### Form Integration

The component integrates with ENgrid's form events:
- Subscribes to the `onSubmit` event to save data
- Only saves when the user has opted in via checkbox
- Dispatches custom events for external integrations

## Styling Customization

The Remember Me checkbox can be styled using these selectors:

```css
/* Main wrapper */
.rememberme-wrapper {
  /* Your styles */
}

/* Checkbox field */
#remember-me-checkbox {
  /* Your styles */
}

/* Label content */
.rememberme-content {
  /* Your styles */
}

/* Info icon toggle */
#rememberme-learn-more-toggle {
  /* Your styles */
}

/* Clear autofill link */
#clear-autofill-data {
  /* Your styles */
}
```

You can also adjust the info icon margin using CSS variables:

```css
:root {
  --rememberme-learn-more-toggle_margin-top: 0px;
}
```

## Troubleshooting

### Checkbox Doesn't Appear

Check that:
- The `fieldOptInSelectorTarget` matches an element on your page
- The target selector is specific enough to find the right element
- Multiple selectors can be provided, separated by commas

### Data Isn't Being Saved

Verify that:
- The `fieldNames` array includes the correct field names
- Field names match exactly with your form field `name` attributes
- The Remember Me checkbox is checked before form submission
- Cookies are enabled in the browser

### Data Isn't Being Restored

Ensure that:
- The field names match between saved data and current form
- Fields exist on the page with the correct `name` attributes
- The cookie hasn't expired (check `cookieExpirationDays`)
- For remote storage, the iframe loaded successfully

## Example: Minimal Setup

```javascript
EngridOptions = {
  RememberMe: {
    fieldNames: [
      'supporter.firstName',
      'supporter.lastName',
      'supporter.emailAddress'
    ]
  }
};
```

## Example: Cross-Domain Setup

```javascript
EngridOptions = {
  RememberMe: {
    remoteUrl: 'https://cdn.yourdomain.com/remember-me.html',
    cookieName: 'engrid-supporter-data',
    cookieExpirationDays: 365,
    fieldNames: [
      'supporter.firstName',
      'supporter.lastName',
      'supporter.emailAddress',
      'supporter.address1',
      'supporter.city',
      'supporter.region',
      'supporter.postcode',
      'supporter.country',
      'supporter.phoneNumber'
    ]
  }
};
```
