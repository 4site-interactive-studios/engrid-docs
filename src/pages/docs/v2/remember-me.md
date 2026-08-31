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
| `encryptData` | Encrypts the stored payload with AES-GCM (Web Crypto) | `false` |
| `hide` | Hides the Remember Me opt-in element while keeping functionality (useful for clients who want autofill without showing the checkbox) | `false` |

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
| `fieldClearLabel` | Text or HTML for the clear autofill link | `"(clear autofill)"` |

### Label and Localization Options

Control the text of the Remember Me checkbox and clear link:

| Property | Description | Default |
| -------- | ----------- | ------- |
| `rememberMeLabel` | Text of the Remember Me checkbox label | Localized `"Remember Me"` (e.g. `"Recuérdame"` on Spanish pages) |
| `fieldClearLabel` | Text of the clear autofill link | Localized `"(clear autofill)"` (e.g. `"(borrar autocompletado)"` on Spanish pages) |

The defaults, the info tooltip, and the iframe title follow the page language automatically. Values you set here always win over the built-in dictionary. See [Multilingual Pages](/docs/v2/multilingual-pages) for details.

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
    fieldClearLabel: '(clear autofill)',
    
    // Default opt-in state
    checked: false,
    
    // Hide the opt-in element (keeps autofill functionality invisible)
    hide: true
  }
};
```
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

## Hide Remember Me Checkbox

To keep autofill functionality while hiding the opt-in checkbox from users, set `hide: true`:

```javascript
window.EngridOptions = {
  RememberMe: {
    hide: true,
    fieldNames: [
      'supporter.firstName',
      'supporter.lastName',
      'supporter.emailAddress'
    ]
  }
};
```

When hidden, the component still saves and restores data, but users won't see the Remember Me checkbox or clear link. This is useful for clients who want transparent autofill without the opt-in UI.

{% callout title="You should know!" %}
Remote storage requires hosting an HTML file that handles postMessage communication. The remote URL must support localStorage and be accessible from your form pages.

**Browser compatibility note**: When using `remoteUrl`, the component saves data correctly on the same site, but reading data across different domains fails in Safari and Firefox. These browsers block cross-origin iframe access to localStorage, even when the remote page properly implements the postMessage protocol. Chrome may also fail in cross-site contexts unless the user has previously interacted with the iframe.
{% /callout %}

## User Interface

### Remember Me Checkbox

When no saved data exists, the component displays a checkbox with an info icon:

- **Label**: "Remember Me"
- **Info tooltip**: Explains that financial information won't be stored and should only be used on personal devices
- **Checkbox state**: Controlled by the `checked` option

### Clear Autofill Link

When saved data exists, the component displays a link instead of the checkbox:

- **Default text**: "(clear autofill)"
- **Custom text**: Set with `fieldClearLabel` (supports plain text or HTML)
- **Action**: Clicking clears saved data and resets the form
- **Location**: Controlled by `fieldClearSelectorTarget` and `fieldClearSelectorTargetLocation`

{% callout title="You should know!" %}
The value of `fieldClearLabel` is rendered using `innerHTML`, so you can include HTML markup. Make sure any dynamic or user-provided content is properly sanitized to avoid unexpected behavior.
{% /callout %}

```javascript
window.EngridOptions = {
  RememberMe: {
    fieldClearLabel: 'Clear my saved information'
  }
};
```

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

### Encryption (encryptData)

When `encryptData: true` is set, the Remember Me payload is encrypted with browser-native AES-GCM (Web Crypto API) before being stored. The encrypted output is base64-encoded for storage.

| Property | Description | Default |
| -------- | ----------- | ------- |
| `encryptData` | Enables AES-GCM encryption of the stored payload | `false` |

**How it works:**

- A 256-bit AES-GCM encryption key is generated once per device and stored in `localStorage` — it is never written to the cookie, so it never travels with the transported value.
- On each save, the payload is encrypted with a random 12-byte IV (Initialization Vector), producing a different ciphertext each time even for the same data.
- On read, the component decrypts the payload using the stored key. If the key is missing (different device or cleared storage), decryption fails silently and the component falls back to the normal, no-autofill experience — no errors are thrown.

**Two modes of operation:**

1. **Local only (`encryptData` without `remoteUrl`)** — The ENgrid script handles encryption/decryption directly. The key is a random secret in `localStorage` of the current page origin. This works for same-site usage only.

2. **Remote (`encryptData` with `remoteUrl`)** — The remote iframe page (`data-remember.html`) handles encryption/decryption. The key is derived deterministically from a simple device fingerprint (screen resolution, language, CPU cores, device memory, timezone → SHA-256). This means even though Chrome partitions `localStorage` by top-level site, the same device always produces the same key — enabling cross-site sharing (e.g. FWW and FWA).

**Browser compatibility for cross-site restoration:**

- **Chrome**: Cross-site restoration works when the user has previously interacted with the iframe. Subject to third-party storage partitioning which may block access in new/clean browsing contexts. To establish cross-site storage access:
  1. Navigate directly to the iframe URL (`https://cdn.foodandwaterwatch.org/remember-me-ifram.html`)
  2. Wait a few seconds for localStorage to initialize
  3. Return to your form page and refresh

- **Safari and Firefox**: Cross-site restoration fails because these browsers block localStorage access from within cross-origin iframes, even when the remote page properly implements the postMessage protocol. Same-site usage (on the same domain as the remote URL) works normally.

- **Different devices**: When using `encryptData` with `remoteUrl`, the encryption key is derived deterministically from the device fingerprint. If the same saved data is accessed from a different device (different screen resolution, language, CPU cores, memory, or timezone), decryption will fail silently because the derived key won't match. The component falls back to the normal, no-autofill experience.

**Example with encryption enabled:**

```javascript
window.EngridOptions = {
  RememberMe: {
    remoteUrl: 'https://rememberme.yourdomain.org',
    encryptData: true,
    fieldNames: [
      'supporter.firstName',
      'supporter.lastName',
      'supporter.emailAddress'
    ]
  }
};
```

When using `encryptData` with `remoteUrl`, the remote iframe HTML page must implement the matching encrypt/decrypt protocol. See the `data-remember.html` reference implementation for details. The remote page derives the encryption key from a device fingerprint, so it produces the same key regardless of which top-level site loads the iframe — solving Chrome's third-party storage partitioning limitation.

**Note**: Even with encryption, Safari and Firefox will still block cross-site localStorage access in the iframe. The encryption protocol works correctly, but the browser's storage policy prevents reading the stored data from a different site.

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
- Data is stored in a cookie on the remote domain

**Cross-site restoration behavior:**

- **Chrome**: Cross-site restoration works when the user has previously interacted with the iframe. May fail in new/clean browsing contexts due to third-party storage partitioning.
- **Safari and Firefox**: Cross-site restoration fails entirely because these browsers block localStorage access within cross-origin iframes. The iframe cannot read the cookie data even when the remote page properly implements the postMessage protocol. Same-site usage (on the same domain as the remote URL) works normally.
- **Different devices**: When `encryptData` is enabled, the encryption key is derived from a device fingerprint. Data saved on one device cannot be restored on another device because the derived key won't match. The component fails silently, falling back to the normal, no-autofill experience.

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
- For Safari and Firefox users, `remoteUrl` will work only same-site.

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
