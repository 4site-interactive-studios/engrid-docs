---
title: Remember Me
description: Learn how to use ENgrid's Remember Me feature to save and auto-fill supporter form details.
---

## Overview

The Remember Me feature allows supporters to save their form details (name, email, address, etc.) in a cookie so they can be automatically filled in when they return to an ENgrid form. This reduces friction for returning supporters and improves the donation experience.

When Remember Me is enabled, a checkbox labeled "Remember Me" appears on the form. If a supporter checks this box and submits the form, their information is saved. On subsequent visits, their saved data is automatically populated into the form fields, and instead of the checkbox, a "Clear Autofill" link appears, allowing them to clear their saved data at any time.

{% callout title="Note" %}
Remember Me does not store financial information (credit card numbers, CVV, etc.). Only personal information fields that you configure are saved.
{% /callout %}

## How It Works

1. **Initial Visit**: When a supporter visits a form with Remember Me enabled, the system checks for existing saved data.

   - If no saved data exists: A "Remember Me" checkbox is displayed with a "Learn More" tooltip icon
   - If saved data exists: The form fields are automatically populated, and a "Clear Autofill" link is shown instead of the checkbox

2. **Form Submission**: When the supporter submits the form:

   - If the "Remember Me" checkbox is checked: The configured field values are saved to a cookie (either local or remote, depending on configuration)
   - The cookie expiration is set based on `cookieExpirationDays` (default: 365 days)

3. **Subsequent Visits**: When the supporter returns:

   - Saved data is automatically populated into the form fields
   - The "Clear Autofill" link is displayed, allowing them to clear their saved data
   - Clicking "Clear Autofill" removes the saved data and shows the "Remember Me" checkbox again

4. **Remote Storage**: If `remoteUrl` is configured, the data is stored in a cookie on the remote domain, allowing the autofill data to be shared across multiple domains.

## Configuration

To enable Remember Me, add a `RememberMe` property to your ENgrid Options object. It can be set to `true` for basic functionality, or an object with detailed configuration.

### Basic Configuration

```typescript
const options: Options = {
  RememberMe: true,
}
```

### Advanced Configuration

```typescript
const options: Options = {
  RememberMe: {
    remoteUrl: 'https://example.com/remember-me-storage.html',
    cookieName: 'engrid-autofill',
    cookieExpirationDays: 365,
    fieldNames: [
      'supporter.firstName',
      'supporter.lastName',
      'supporter.address1',
      'supporter.city',
      'supporter.country',
      'supporter.region',
      'supporter.postcode',
      'supporter.emailAddress',
    ],
    fieldDonationAmountRadioName: 'transaction.donationAmt',
    fieldDonationAmountOtherName: 'transaction.donationAmt.other',
    fieldDonationRecurrPayRadioName: 'transaction.recurrpay',
    fieldOptInSelectorTarget: '.en__field--emailAddress.en__field',
    fieldOptInSelectorTargetLocation: 'after',
    fieldClearSelectorTarget: 'label[for="en__field_supporter_firstName"]',
    fieldClearSelectorTargetLocation: 'before',
    checked: false,
  },
}
```

## Configuration Options

| Property                             | Type                    | Default                                        | Description                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------ | ----------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checked`                            | boolean                 | `false`                                        | If set to `true`, the remember me opt-in checkbox will be checked by default                                                                                                                                                                                                                                                  |
| `remoteUrl`                          | string \| null          | `null`                                         | URL of a webpage that will work as a remote repository for form details. If provided, the cookie will be saved to that remote URL's domain. If not provided, the cookie will be saved to the current page's domain                                                                                                            |
| `cookieName`                         | string                  | `"engrid-autofill"`                            | Name of the cookie that stores the autofill data                                                                                                                                                                                                                                                                              |
| `cookieExpirationDays`               | number                  | `365`                                          | Number of days for the cookie expiration                                                                                                                                                                                                                                                                                      |
| `fieldNames`                         | string[]                | `[]`                                           | Array of form input field names to save and autofill. All other fields will be ignored by Remember Me. Common field names: `supporter.firstName`, `supporter.lastName`, `supporter.address1`, `supporter.address2`, `supporter.city`, `supporter.country`, `supporter.region`, `supporter.postcode`, `supporter.emailAddress` |
| `fieldOptInSelectorTarget`           | string                  | `".en__field--emailAddress.en__field"`         | Comma-delimited list of CSS selectors. The script will try each selector in turn until it finds one that exists, then place the "Remember Me" opt-in element relative to it                                                                                                                                                   |
| `fieldOptInSelectorTargetLocation`   | `"before"` \| `"after"` | `"after"`                                      | Placement of the "Remember Me" opt-in element relative to the target: `"before"` or `"after"`                                                                                                                                                                                                                                 |
| `fieldClearSelectorTarget`           | string                  | `'label[for="en__field_supporter_firstName"]'` | Comma-delimited list of CSS selectors. The script will try each selector in turn until it finds one that exists, then place the "Clear Autofill" link relative to it                                                                                                                                                          |
| `fieldClearSelectorTargetLocation`   | `"before"` \| `"after"` | `"before"`                                     | Placement of the "Clear Autofill" link relative to the target: `"before"` or `"after"`                                                                                                                                                                                                                                        |
| `fieldDonationAmountRadioName`       | string                  | `"transaction.donationAmt"`                    | Name of the Engaging Networks donation amount radio buttons field                                                                                                                                                                                                                                                             |
| `fieldDonationAmountOtherName`       | string                  | `"transaction.donationAmt.other"`              | Name of the Engaging Networks donation amount "Other" input field                                                                                                                                                                                                                                                             |
| `fieldDonationRecurrPayRadioName`    | string                  | `"transaction.recurrpay"`                      | Name of the Engaging Networks frequency field                                                                                                                                                                                                                                                                                 |
| `fieldDonationAmountOtherCheckboxID` | string                  | `"#en__field_transaction_donationAmt4"`        | **Deprecated** - This option is deprecated and will be removed in a future version                                                                                                                                                                                                                                            |

## Remote URL Setup

If you want to use cross-domain cookie storage (useful for sharing autofill data across multiple domains), you need to set up a remote URL page that acts as a cookie repository.

### Sample Remote URL Page

Create an HTML page with the following markup:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Remember Me Storage</title>
  </head>
  <body>
    <script>
      ;(function () {
        // Allowed domains - update this list with your actual domains
        var whitelist = ['www.client.org', 'act.client.org']

        function verifyOrigin(origin) {
          var domain = origin
            .replace(/^https?:\/\/|:\d{1,4}$/g, '')
            .toLowerCase()
          var i = 0
          var len = whitelist.length
          while (i < len) {
            if (whitelist[i] == domain) {
              return true
            }
            i++
          }
          return false
        }

        function readCookie(name) {
          var nameEQ = encodeURIComponent(name) + '='
          var ca = document.cookie.split(';')
          for (var i = 0; i < ca.length; i++) {
            var c = ca[i]
            while (c.charAt(0) === ' ') {
              c = c.substring(1, c.length)
            }
            if (c.indexOf(nameEQ) === 0) {
              return decodeURIComponent(c.substring(nameEQ.length, c.length))
            }
          }
          return null
        }

        function writeCookie(name, value, days) {
          var d = new Date()
          d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
          document.cookie =
            name +
            '=' +
            JSON.stringify(value) +
            ';expires=' +
            d.toUTCString() +
            ';SameSite=none;Secure;'
        }

        function handleRequest(event) {
          if (verifyOrigin(event.origin)) {
            var data = JSON.parse(event.data)
            if (
              data.hasOwnProperty('operation') &&
              data.hasOwnProperty('key')
            ) {
              var retVal = {
                id: data.id,
                key: data.key,
                value: null,
              }
              if (data.operation == 'write' && data.hasOwnProperty('value')) {
                writeCookie(data.key, data.value, 60)
              } else if (data.operation == 'read') {
                retVal.value = readCookie(data.key)
              }
              event.source.postMessage(JSON.stringify(retVal), event.origin)
            }
          }
        }

        if (window.addEventListener) {
          window.addEventListener('message', handleRequest, false)
        } else if (window.attachEvent) {
          window.attachEvent('onmessage', handleRequest)
        }
      })()
    </script>
  </body>
</html>
```

**Important:** Update the `whitelist` array with your actual domain names. This ensures only authorized domains can access the cookie storage.

## UI Elements

### Remember Me Checkbox

The "Remember Me" checkbox appears when no saved data exists. It includes:

- A checkbox with the label "Remember Me"
- A "Learn More" tooltip icon (ℹ️) that displays helpful information when hovered:
  > "Check 'Remember me' to complete forms on this device faster. While your financial information won't be stored, you should only check this box from a personal device. Click 'Clear autofill' to remove the information from your device at any time."

The checkbox can be positioned relative to any form field using `fieldOptInSelectorTarget` and `fieldOptInSelectorTargetLocation`.

### Clear Autofill Link

When saved data exists and is being auto-filled, a "Clear Autofill" link appears instead of the checkbox. This link:

- Is displayed as "(clear autofill)" next to the first name field by default
- Can be positioned using `fieldClearSelectorTarget` and `fieldClearSelectorTargetLocation`
- When clicked, clears all saved data and shows the "Remember Me" checkbox again

## Events

Remember Me dispatches events that you can listen to for custom functionality or analytics tracking.

### Custom Window Events

Remember Me dispatches the following custom events on the `window` object:

#### `RememberMe_Loaded`

Dispatched when Remember Me has finished loading, whether or not saved data exists.

```javascript
window.addEventListener('RememberMe_Loaded', (event) => {
  const hasData = event.detail.withData
  if (hasData) {
    console.log('Remember Me loaded with saved data')
  } else {
    console.log('Remember Me loaded without saved data')
  }
})
```

**Event Detail:**

- `withData` (boolean): `true` if saved data exists and was loaded, `false` otherwise

#### `RememberMe_Cleared`

Dispatched when the user clicks "Clear Autofill" and the saved data is cleared.

```javascript
window.addEventListener('RememberMe_Cleared', () => {
  console.log('Remember Me data has been cleared')
})
```

### RememberMeEvents Class

For more advanced use cases, you can subscribe to events using the `RememberMeEvents` class:

```typescript
import { RememberMeEvents } from '@4site/engrid-scripts'

const rememberMeEvents = RememberMeEvents.getInstance()

// Subscribe to load events
rememberMeEvents.onLoad.subscribe((hasData: boolean) => {
  if (hasData) {
    console.log('Remember Me loaded with saved data')
  } else {
    console.log('Remember Me loaded without saved data')
  }
})

// Subscribe to clear events
rememberMeEvents.onClear.subscribe(() => {
  console.log('Remember Me data has been cleared')
})

// Check if data exists
const hasData = rememberMeEvents.hasData
```

**Note:** The `RememberMeEvents` class is used internally by other ENgrid features like `FastFormFill` to coordinate behavior when Remember Me data is loaded or cleared.

## Examples

### Example 1: Basic Setup

Enable Remember Me with default settings for common personal information fields:

```typescript
const options: Options = {
  RememberMe: {
    fieldNames: [
      'supporter.firstName',
      'supporter.lastName',
      'supporter.emailAddress',
      'supporter.address1',
      'supporter.city',
      'supporter.region',
      'supporter.postcode',
      'supporter.country',
    ],
  },
}
```

### Example 2: Pre-checked Checkbox

Enable Remember Me with the checkbox checked by default:

```typescript
const options: Options = {
  RememberMe: {
    checked: true,
    fieldNames: [
      'supporter.firstName',
      'supporter.lastName',
      'supporter.emailAddress',
    ],
  },
}
```

### Example 3: Custom Positioning

Position the "Remember Me" checkbox before the email field and the "Clear Autofill" link after the first name label:

```typescript
const options: Options = {
  RememberMe: {
    fieldNames: [
      'supporter.firstName',
      'supporter.lastName',
      'supporter.emailAddress',
    ],
    fieldOptInSelectorTarget: '.en__field--emailAddress.en__field',
    fieldOptInSelectorTargetLocation: 'before',
    fieldClearSelectorTarget: 'label[for="en__field_supporter_firstName"]',
    fieldClearSelectorTargetLocation: 'after',
  },
}
```

### Example 4: Including Donation Amount and Frequency

Save and restore donation amount and frequency preferences:

```typescript
const options: Options = {
  RememberMe: {
    fieldNames: [
      'supporter.firstName',
      'supporter.lastName',
      'supporter.emailAddress',
      'transaction.donationAmt',
      'transaction.recurrpay',
    ],
  },
}
```

**Note:** When saving donation amount fields, Remember Me will:

- Save the selected radio button value
- If "Other" amount is selected, save the value from the "Other" input field
- Restore the selection by clicking the appropriate radio button or filling the "Other" field

### Example 5: Cross-Domain Storage

Use remote URL storage to share autofill data across multiple domains:

```typescript
const options: Options = {
  RememberMe: {
    remoteUrl: 'https://storage.example.com/remember-me-storage.html',
    cookieName: 'engrid-autofill',
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
    ],
  },
}
```

## Usage with Page-Specific Options

You can also enable Remember Me on a per-page basis using `window.EngridPageOptions`:

```javascript
<script>
window.EngridPageOptions = window.EngridPageOptions || {};
window.EngridPageOptions.RememberMe = {
  checked: true,
  fieldNames: ["supporter.firstName", "supporter.lastName", "supporter.emailAddress"],
};
</script>
```

## Integration with Other Features

### Fast Form Fill

Remember Me integrates with the [Fast Form Fill](/docs/v2/fast-form-fill-tracking) feature. When Remember Me loads saved data, Fast Form Fill will automatically check if all mandatory fields in form blocks with the `fast-personal-details` class are filled, and add the appropriate body attributes for styling.

### Welcome Back

Remember Me works independently of the [Welcome Back](/docs/v2/welcome-back) component. Both features can be enabled simultaneously, but they serve different purposes:

- **Remember Me**: Saves and restores form data across multiple visits
- **Welcome Back**: Hides the form and shows a summary when all mandatory fields are filled on the current visit

### Sticky Pre-population

If Remember Me is enabled, [Sticky Pre-population](/docs/v2/sticky-prepopulation) will not be active. Remember Me provides a more comprehensive solution for saving and restoring form data across visits.

## FAQs

### How does Remember Me differ from Sticky Pre-population?

Remember Me saves form data when the supporter explicitly opts in by checking the "Remember Me" checkbox. The data persists for the duration specified by `cookieExpirationDays` (default: 365 days) and can be shared across multiple domains if using remote URL storage.

Sticky Pre-population automatically saves pre-populated values from campaign links without requiring opt-in, but only for 7 days and only for the specific page. If Remember Me is enabled, Sticky Pre-population will not be active.

### Which fields should I include in `fieldNames`?

Include fields that:

- Are commonly filled in by supporters (name, email, address)
- Don't change frequently (avoid fields like "comments" or "special instructions")
- Are not sensitive financial information (Remember Me does not save credit card numbers, CVV, etc.)

Common fields to include:

- `supporter.firstName`
- `supporter.lastName`
- `supporter.emailAddress`
- `supporter.address1`
- `supporter.address2` (optional)
- `supporter.city`
- `supporter.region`
- `supporter.postcode`
- `supporter.country`
- `supporter.phoneNumber` (optional)

### Can I save donation amount and frequency?

Yes! Include `transaction.donationAmt` and `transaction.recurrpay` in your `fieldNames` array. Remember Me will:

- Save the selected donation amount (radio button value or "Other" amount)
- Save the selected frequency (recurring or one-time)
- Restore these selections when the supporter returns

### How does remote URL storage work?

When `remoteUrl` is configured, Remember Me creates an invisible iframe that loads the remote URL page. The remote page acts as a cookie repository, storing the autofill data in a cookie on its domain. This allows the data to be shared across multiple domains that are whitelisted in the remote page.

The communication between the main page and the remote page uses `postMessage` API for security. Only domains in the whitelist can access the cookie storage.

### What happens if a supporter clears their browser cookies?

If a supporter clears their browser cookies, the Remember Me data will be lost. The "Remember Me" checkbox will appear again on their next visit, and they can opt in again to save their information.

### Is Remember Me data encrypted?

The data stored in cookies is not encrypted by default. However, the data is stored locally in the supporter's browser or on your remote domain, and only contains non-sensitive personal information (no financial data). For additional security, you can implement encryption in your remote URL page if needed.

### Can I customize the "Remember Me" checkbox label or tooltip text?

The checkbox label and tooltip text are currently hardcoded in the Remember Me component. If you need to customize these, you would need to modify the component code or use CSS to hide the default elements and add your own custom elements.

## Best Practices

- **Field Selection**: Only include fields that are commonly filled in. Avoid including fields that change frequently or are sensitive
- **Cookie Expiration**: Consider your use case when setting `cookieExpirationDays`. Longer expiration (365 days) means users stay logged in longer, but may see outdated information. Shorter expiration (30-90 days) ensures more up-to-date information but requires more frequent re-entry
- **Remote URL Security**: Always use HTTPS for remote URL pages and maintain a strict whitelist of allowed domains. Regularly review and update the whitelist
- **Testing**: Test Remember Me functionality across different browsers and devices, especially when using remote URL storage. Test the "Clear Autofill" functionality to ensure it works as expected
- **Privacy Considerations**: Make sure your privacy policy mentions that form data is stored locally in cookies. The "Learn More" tooltip helps inform supporters about this
- **Positioning**: Use `fieldOptInSelectorTarget` and `fieldClearSelectorTarget` to position the checkbox and link in logical locations near relevant form fields
- **Multiple Selectors**: When using selector targets, provide comma-delimited lists of selectors as fallbacks. The script will try each selector until it finds one that exists
