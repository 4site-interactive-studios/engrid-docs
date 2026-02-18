# Remember Me

"Remember Me" is a solution that allows for creating and reading a single cross-domain and subdomain cookie. This feature enables visitors to save their form details and have them automatically filled in when they return to Engaging Networks forms.

## Overview

"Remember Me" is a solution ([source code](https://github.com/4site-interactive-studios/engrid-scripts/blob/e5e7cd7b1f70e8649df0b9cfdde317971df19819/packages/common/src/remember-me.ts#L50)) that 4Site developed to allow for creating and reading a single cross-domain and subdomain cookie ([example](https://protect.worldwildlife.org/)). 

During setup, a single static HTML file ([example](https://www.ran.org/wp-content/themes/ran-2020/data-remember.html)) will be added to the main ([www.4sitestudios.com](http://www.4sitestudios.com)) sub-domain; it can live at any URL. Then, anywhere the "Remember Me" cookie needs to be read from or written to, that static page will be opened in an iFrame.

The `engrid-autofill` cookie is set by the static HTML page on the main domain and communicated with from the parent page via postMessage. This static HTML page does require the server it's hosted on to have a particular x-frame, or CSP setting, to accommodate this communication. It's also acceptable if the static HTML file needs to live at its own subdomain (remember.4sitestudios.com) to accommodate those configurations.

4Site's ENgrid pages can then be configured to enable "Remember Me". Once configured, an opt-in checkbox in a spot, with a label and hover tooltip of your choosing, will appear. When checked, this will save the visitor's form details (First Name, Last Name, Country, Address 1, Address 2, Region, City, State, Postal Code, Email) into a cookie that has a 365-day expiration; the expiration length can be adjusted per AIUSA's preferences. It will then restore the values in this cookie whenever that visitor returns to an Engaging Networks form. During setup, you will be able to change the fields that are captured, adding or removing them. Post-setup, with custom code, non-EN forms could also set new data or pull it from this cookie.

If a page loads and fields are already populated (e.g., clicking a Campaign Link on an Engaging Networks email), then any "Remember Me" cookie data will only be used to auto-fill empty fields.

Additionally, every time the first-party "Remember Me" cookie is read, it will be recreated to future-proof against any browser-based hard cookie expirations ([example](https://github.com/WebKit/WebKit/pull/5347)). A similar read and re-create solution could be implemented on 4sitestudios.com so that visitors continue to top-up the life of their Remember Me cookie with every page view; that functionality is not a part of this project but could be explored as a follow-on engagement.

Finally, if details are auto-filled from the "Remember Me" cookie, a "Clear Autofill" link will be shown instead of seeing the corresponding checkbox the visitor selected to opt in. Clicking this link will delete the `engrid-autofill` cookie, making the visitor's browser "forget" their personal details.

## Configuration

To enable Remember Me, add a `RememberMe` property to the `options` object in your ENgrid theme configuration.

### Basic Configuration

```javascript
{
  RememberMe: {
    fieldNames: [
      'supporter.firstName',
      'supporter.lastName',
      'supporter.emailAddress',
      'supporter.address1',
      'supporter.address2',
      'supporter.city',
      'supporter.region',
      'supporter.postcode',
      'supporter.country'
    ]
  }
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `checked` | `boolean` | `false` | If set to `true`, the Remember Me opt-in checkbox will be checked by default. |
| `remoteUrl` | `string` | `null` | URL to a webpage that will work as a remote repository for form details. If provided, the cookie will be saved to that remote URL's domain. If not provided, the cookie will be saved to the current page's domain. |
| `cookieName` | `string` | `"engrid-autofill"` | The name of the cookie that stores the autofill data. |
| `cookieExpirationDays` | `number` | `365` | Number of days for the cookie expiration. |
| `fieldNames` | `string[]` | `[]` | An array of form input field names that will be saved and autofilled. Common field names include: `supporter.firstName`, `supporter.lastName`, `supporter.address1`, `supporter.address2`, `supporter.city`, `supporter.country`, `supporter.region`, `supporter.postcode`, `supporter.emailAddress`. |
| `fieldOptInSelectorTarget` | `string` | `".en__field--emailAddress.en__field"` | A comma-delimited list of CSS selectors. The script will try each selector in turn until it finds one that exists, then place the Remember Me opt-in element relative to it. |
| `fieldOptInSelectorTargetLocation` | `"before" \| "after"` | `"after"` | Determines whether the Remember Me opt-in element is placed before or after the target element. |
| `fieldClearSelectorTarget` | `string` | `'label[for="en__field_supporter_firstName"]'` | A comma-delimited list of CSS selectors. The script will try each selector in turn until it finds one that exists, then place the "Clear Autofill" link relative to it. |
| `fieldClearSelectorTargetLocation` | `"before" \| "after"` | `"before"` | Determines whether the "Clear Autofill" link is placed before or after the target element. |
| `fieldDonationAmountRadioName` | `string` | `"transaction.donationAmt"` | The name of the Engaging Networks donation amount radio buttons. |
| `fieldDonationAmountOtherName` | `string` | `"transaction.donationAmt.other"` | The name of the Engaging Networks donation amount "Other" input field. |
| `fieldDonationRecurrPayRadioName` | `string` | `"transaction.recurrpay"` | The name of the Engaging Networks frequency field. |
| `fieldDonationAmountOtherCheckboxID` | `string` | `"#en__field_transaction_donationAmt4"` | **Deprecated** - This option is deprecated and will be removed. |

### Remote URL Setup

When using a remote URL for cross-domain cookie storage, you'll need to create a static HTML file on your main domain. This file will handle cookie operations via postMessage communication.

#### Remote HTML File Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Remember Me Cookie Handler</title>
</head>
<body>
  <script>
    (function () {
      // Allowed domains
      var whitelist = [
        "www.client.org",
        "act.client.org",
      ];
      
      function verifyOrigin(origin) {
        var domain = origin.replace(/^https?:\/\/|:\d{1,4}$/g, "").toLowerCase(),
          i = 0,
          len = whitelist.length;
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
          while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
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
              writeCookie(data.key, data.value, data.expires || 365);
            } else if (data.operation == 'read') {
              retVal.value = readCookie(data.key);
            }
          }
          event.source.postMessage(JSON.stringify(retVal), event.origin);
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

#### Server Configuration Requirements

The static HTML file requires specific server configurations:

- **X-Frame-Options**: Must allow framing from your Engaging Networks domains
- **Content Security Policy (CSP)**: Must allow framing and postMessage communication
- **Alternative**: The file can be hosted on a separate subdomain (e.g., `remember.4sitestudios.com`) if needed to accommodate server configurations

## How It Works

### User Flow

1. **First Visit**: When a visitor arrives at an Engaging Networks form with Remember Me enabled, they see an opt-in checkbox.
2. **Opt-In**: If the visitor checks the "Remember Me" checkbox and submits the form, their form details are saved to a cookie.
3. **Subsequent Visits**: When the visitor returns, their saved details are automatically filled into empty form fields.
4. **Clear Autofill**: If data is auto-filled, a "Clear Autofill" link appears instead of the checkbox, allowing visitors to delete their saved information.

### Cookie Behavior

- **Cookie Name**: `engrid-autofill` (configurable via `cookieName` option)
- **Expiration**: 365 days by default (configurable via `cookieExpirationDays` option)
- **Auto-Renewal**: The cookie is automatically recreated each time it's read to prevent browser-based hard expirations
- **Field Priority**: If fields are already populated (e.g., from URL parameters), Remember Me data only fills empty fields

### Events

Remember Me dispatches custom events that can be listened to:

- `RememberMe_Loaded`: Fired when Remember Me initializes
  - `detail.withData`: `boolean` - Indicates whether saved data was found
- `RememberMe_Cleared`: Fired when the user clears their saved data

```javascript
window.addEventListener('RememberMe_Loaded', (event) => {
  console.log('Remember Me loaded', event.detail);
});

window.addEventListener('RememberMe_Cleared', () => {
  console.log('Remember Me data cleared');
});
```

## Encrypting Data at Rest

To ensure donors' information is secure, the visitor's "Remember Me" data is encrypted at rest and never leaves their computer.

The key to decrypting this data will be a **fingerprint ID** derived from the visitor's browser and hashed with their **IP address**.

### Encryption Process

1. **ID Generation**: If a visitor already has the `engrid-autofill` cookie set in their browser, or if they submit a form with the "Remember Me" checkbox selected, we will generate an **ID** for that visitor; this is done client-side, and the ID never leaves the browser. We don't need the ID to be truly unique per visitor; we just need it to be deterministic and unpredictable. For this, the open-source version of [FingerprintJS](https://github.com/fingerprintjs/fingerprintjs) ([demo](https://fingerprintjs.github.io/fingerprintjs/)) should work. The open-source version does not include the visitor's IP address as a signal, and we will use their IP to hash the ID and increase uniqueness. If changing IPs is a concern, we can explore not appending the user's IP address. Please note that since our original discussion, [the license](https://fingerprint.com/blog/fingerprintjs-license-change/) used by the open-source FingerprintJS project has changed. Either an old version will need to be used, which is our preference. Or a license will need to be purchased.

2. **Encryption**: With the visitor **ID+IP** hash, we will encrypt the `engrid-autofill` cookie. Then, the visitor ID+IP hash will be discarded, having never been saved or having left their browser.

3. **Decryption**: On subsequent visits, while the `engrid-autofill` cookie is detected in the visitor's browser, the process for generating the visitor's ID and hashing it with their IP address will be repeated, and the cookie will be decrypted. If the visitor's browser fingerprint or IP address changes, the decryption will fail, nothing will happen, and we will delete the `engrid-autofill` cookie as it can no longer be decrypted.

### Security Model

An attacker would need access to all three of the following to decrypt the cookie:
- The fully encrypted cookies
- The client-side generated browser fingerprint
- The visitor's IP address

Only with all three of those could the encrypted cookie be decrypted.

## Examples

### Basic Configuration

```javascript
{
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
}
```

### Cross-Domain Configuration

```javascript
{
  RememberMe: {
    remoteUrl: 'https://www.4sitestudios.com/data-remember.html',
    cookieName: 'engrid-autofill',
    cookieExpirationDays: 365,
    fieldNames: [
      'supporter.firstName',
      'supporter.lastName',
      'supporter.emailAddress',
      'supporter.address1',
      'supporter.address2',
      'supporter.city',
      'supporter.region',
      'supporter.postcode',
      'supporter.country'
    ],
    fieldOptInSelectorTarget: '.en__field--emailAddress.en__field',
    fieldOptInSelectorTargetLocation: 'after',
    fieldClearSelectorTarget: 'label[for="en__field_supporter_firstName"]',
    fieldClearSelectorTargetLocation: 'before',
    checked: false
  }
}
```

### Custom Placement

```javascript
{
  RememberMe: {
    fieldNames: ['supporter.firstName', 'supporter.lastName', 'supporter.emailAddress'],
    fieldOptInSelectorTarget: '.custom-email-field, .en__field--emailAddress',
    fieldOptInSelectorTargetLocation: 'before',
    fieldClearSelectorTarget: '.form-header, label[for="en__field_supporter_firstName"]',
    fieldClearSelectorTargetLocation: 'after'
  }
}
```

## Best Practices

1. **Field Selection**: Only include fields that are appropriate to save. Avoid saving sensitive financial information or payment details.

2. **Privacy Considerations**: Always provide clear information to users about what data is being saved and how it's used. The default tooltip text explains this, but you can customize it.

3. **Cross-Domain Setup**: When using `remoteUrl`, ensure your server configuration allows iframe embedding and postMessage communication.

4. **Testing**: Test Remember Me functionality across different browsers and devices, especially when using cross-domain cookies.

5. **Cookie Expiration**: Consider your organization's data retention policies when setting `cookieExpirationDays`.

6. **Security**: When implementing encryption at rest, ensure you're using a secure hashing algorithm and properly handling the fingerprint and IP address data.

## Troubleshooting

### Cookie Not Saving

- Check browser console for errors
- Verify `fieldNames` array contains valid field names
- Ensure cookie permissions are not blocked by browser settings
- For remote URLs, verify the iframe can communicate via postMessage

### Data Not Auto-Filling

- Verify the cookie exists in browser storage
- Check that field names match exactly (case-sensitive)
- Ensure fields are empty (Remember Me won't overwrite existing values)
- Verify the remote URL is accessible and properly configured

### Cross-Domain Issues

- Verify X-Frame-Options allows framing from your Engaging Networks domain
- Check CSP headers allow postMessage communication
- Ensure the remote HTML file includes proper origin verification
- Consider using a subdomain if main domain restrictions prevent iframe embedding

## Related Documentation

- [ENgrid Configuration Options](/docs/v2/configuration)
- [Events System](/docs/v2/events)
- [Form Field Reference](/docs/v2/fields)
