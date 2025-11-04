---
title: Remember Me
description: Learn how to use ENgrid's Remember Me feature to save and auto-fill supporter form details.
---

The Remember Me feature allows supporters to save their form details (name, email, address, etc.) in a cookie so they can be automatically filled in when they return to an ENgrid form. If details are saved and being auto-filled, a "Clear Autofill" link is shown instead of the "Remember Me" checkbox.

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
    remoteUrl: "https://example.com/remember-me-storage.html",
    cookieName: "engrid-autofill",
    cookieExpirationDays: 365,
    fieldNames: [
      "supporter.firstName",
      "supporter.lastName",
      "supporter.address1",
      "supporter.city",
      "supporter.country",
      "supporter.region",
      "supporter.postcode",
      "supporter.emailAddress",
    ],
    fieldDonationAmountRadioName: "transaction.donationAmt",
    fieldDonationAmountOtherName: "transaction.donationAmt.other",
    fieldDonationRecurrPayRadioName: "transaction.recurrpay",
    fieldOptInSelectorTarget: ".en__field--emailAddress.en__field",
    fieldOptInSelectorTargetLocation: "after",
    fieldClearSelectorTarget: 'label[for="en__field_supporter_firstName"]',
    fieldClearSelectorTargetLocation: "before",
    checked: false,
  },
}
```

## Configuration Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | boolean | `false` | If set to `true`, the remember me opt-in checkbox will be checked by default |
| `remoteUrl` | string \| null | `null` | URL of a webpage that will work as a remote repository for form details. If provided, the cookie will be saved to that remote URL's domain. If not provided, the cookie will be saved to the current page's domain |
| `cookieName` | string | `"engrid-autofill"` | Name of the cookie that stores the autofill data |
| `cookieExpirationDays` | number | `365` | Number of days for the cookie expiration |
| `fieldNames` | string[] | `[]` | Array of form input field names to save and autofill. All other fields will be ignored by Remember Me. Common field names: `supporter.firstName`, `supporter.lastName`, `supporter.address1`, `supporter.address2`, `supporter.city`, `supporter.country`, `supporter.region`, `supporter.postcode`, `supporter.emailAddress` |
| `fieldOptInSelectorTarget` | string | `".en__field--emailAddress.en__field"` | Comma-delimited list of CSS selectors. The script will try each selector in turn until it finds one that exists, then place the "Remember Me" opt-in element relative to it |
| `fieldOptInSelectorTargetLocation` | `"before"` \| `"after"` | `"after"` | Placement of the "Remember Me" opt-in element relative to the target: `"before"` or `"after"` |
| `fieldClearSelectorTarget` | string | `'label[for="en__field_supporter_firstName"]'` | Comma-delimited list of CSS selectors. The script will try each selector in turn until it finds one that exists, then place the "Clear Autofill" link relative to it |
| `fieldClearSelectorTargetLocation` | `"before"` \| `"after"` | `"before"` | Placement of the "Clear Autofill" link relative to the target: `"before"` or `"after"` |
| `fieldDonationAmountRadioName` | string | `"transaction.donationAmt"` | Name of the Engaging Networks donation amount radio buttons field |
| `fieldDonationAmountOtherName` | string | `"transaction.donationAmt.other"` | Name of the Engaging Networks donation amount "Other" input field |
| `fieldDonationRecurrPayRadioName` | string | `"transaction.recurrpay"` | Name of the Engaging Networks frequency field |
| `fieldDonationAmountOtherCheckboxID` | string | `"#en__field_transaction_donationAmt4"` | **Deprecated** - This option is deprecated and will be removed in a future version |

## Remote URL Setup

If you want to use cross-domain cookie storage (useful for sharing autofill data across multiple domains), you need to set up a remote URL page that acts as a cookie repository.

### Sample Remote URL Page

Create an HTML page with the following markup:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Remember Me Storage</title>
</head>
<body>
  <script>
    (function () {
      // Allowed domains - update this list with your actual domains
      var whitelist = [
        "www.client.org",
        "act.client.org",
      ];
      
      function verifyOrigin(origin) {
        var domain = origin.replace(/^https?:\/\/|:\d{1,4}$/g, "").toLowerCase();
        var i = 0;
        var len = whitelist.length;
        while (i < len) {
          if (whitelist[i] == domain) {
            return true;
          }
          i++;
        }
        return false;
      }
      
      function readCookie(name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
          }
          if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
          }
        }
        return null;
      }
      
      function writeCookie(name, value, days) {
        var d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + "=" + JSON.stringify(value) + ";expires=" + d.toUTCString() + ';SameSite=none;Secure;';
      }
      
      function handleRequest(event) {
        if (verifyOrigin(event.origin)) {
          var data = JSON.parse(event.data);
          if (data.hasOwnProperty('operation') && data.hasOwnProperty('key')) {
            var retVal = {
              id: data.id,
              key: data.key,
              value: null
            };
            if (data.operation == 'write' && data.hasOwnProperty('value')) {
              writeCookie(data.key, data.value, 60);
            } else if (data.operation == 'read') {
              retVal.value = readCookie(data.key);
            }
            event.source.postMessage(JSON.stringify(retVal), event.origin);
          }
        }
      }
      
      if (window.addEventListener) {
        window.addEventListener("message", handleRequest, false);
      } else if (window.attachEvent) {
        window.attachEvent("onmessage", handleRequest);
      }
    })();
  </script>
</body>
</html>
```

**Important:** Update the `whitelist` array with your actual domain names. This ensures only authorized domains can access the cookie storage.

## How It Works

1. **When Remember Me is checked**: On form submission, the configured fields are saved to a cookie (either local or remote, depending on configuration)
2. **When user returns**: The saved data is automatically populated into the form fields
3. **Clear Autofill**: If data exists, a "Clear Autofill" link appears instead of the checkbox, allowing users to clear their saved data

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

## Best Practices

- **Field Selection**: Only include fields that are commonly filled in. Avoid including fields that change frequently or are sensitive
- **Cookie Expiration**: Consider your use case when setting `cookieExpirationDays`. Longer expiration means users stay logged in longer, but may see outdated information
- **Remote URL Security**: Always use HTTPS for remote URL pages and maintain a strict whitelist of allowed domains
- **Testing**: Test Remember Me functionality across different browsers and devices, especially when using remote URL storage
