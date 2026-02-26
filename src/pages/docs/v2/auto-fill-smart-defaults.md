---
title: Auto-Fill & Smart Defaults
description: Learn how ENgrid automatically fills country, sets credit card years, submits forms, and displays branding examples
---

## Auto Country Select

The `AutoCountrySelect` component automatically detects and selects the user's country in donation forms, improving the user experience by reducing form friction.

### Overview

When enabled, this component:
1. Detects the user's location via Cloudflare
2. Automatically selects their country in the country dropdown
3. Triggers the country change event (which may show/hide state fields)

{% callout title="You should know!" %}
This component only runs when the country field has the class `simple_country_select` and specific conditions are met.
{% /callout %}

### Activation

Add the class `simple_country_select` to the country field wrapper in Page Builder:

```html
<!-- In EN Page Builder -->
<div class="simple_country_select">
  {Country Field}
</div>
```

Or add via CSS class customization in EN.

### Conditions for Running

The component checks several conditions before running:

1. **No Autofill Cookie**: User hasn't filled the form before
2. **No Submission Failed**: Form hasn't failed validation previously
3. **Browser Support**: Browser supports `Intl.DisplayNames` API
4. **No URL Parameters**: No country/region data in URL parameters

**URL parameters that prevent auto-select:**
- `supporter.country`
- `supporter.region`
- `ea.url.id` (unless also has `forwarded` parameter)

These conditions ensure we don't override intentionally set values.

### How It Works

```typescript
// 1. Fetches location from Cloudflare
fetch(`https://${window.location.hostname}/cdn-cgi/trace`)
  
// 2. Parses country code from response
// Returns data like: { loc: "US", ip: "1.2.3.4", ... }

// 3. Converts country code to country name
const countriesNames = new Intl.DisplayNames(["en"], { type: "region" });
const countryName = countriesNames.of("US"); // "United States"

// 4. Selects matching option in dropdown
// Matches by either country name or country code
```

### Detection Service

Uses Cloudflare's trace endpoint:
- Fast and reliable
- No external API required
- Works on all Cloudflare-hosted sites
- Returns country code based on visitor's IP

Example response:
```
fl=443f32
h=example.com
ip=203.0.113.0
ts=1234567890.123
visit_scheme=https
uag=Mozilla/5.0...
colo=SFO
http=http/2
loc=US
tls=TLSv1.3
sni=plaintext
warp=off
gateway=off
```

### Country Matching

The component matches countries flexibly:

```typescript
// Matches by name (case-insensitive)
if (optionText.toLowerCase() == countryName.toLowerCase())

// OR matches by code (case-insensitive)
if (optionValue.toLowerCase() == countryCode.toLowerCase())
```

This works with EN's country format variations (2-letter and 3-letter ISO codes).

### Triggering Change Event

After selecting the country, dispatches a change event:

```typescript
const event = new Event("change", { bubbles: true });
countrySelect.dispatchEvent(event);
```

This ensures:
- State/province fields update appropriately
- Any custom country change logic runs
- EN's dependent field logic triggers

### Best Practices

1. **Add the Class**: Must add `simple_country_select` class to enable
2. **Test Globally**: Use VPN to test from different countries
3. **Consider URL Parameters**: Understand when auto-select won't run
4. **Mobile Testing**: Verify country select works on mobile devices
5. **State Fields**: Ensure state field conditionals work correctly

### Troubleshooting

**Not auto-selecting:**
- Verify `simple_country_select` class is applied
- Check if `engrid-autofill` cookie exists (clear cookies to test)
- Confirm no URL parameters are present
- Verify browser supports `Intl.DisplayNames` (modern browsers)
- Check Cloudflare trace endpoint is accessible

**Wrong country selected:**
- May be due to VPN or proxy
- Cloudflare detection is IP-based
- Some corporate networks route through different countries

---

## Auto Year

The `AutoYear` component automatically populates the credit card expiration year dropdown with current and future years.

### Overview

EN's default year dropdown is often outdated. This component:
- Clears existing year options
- Adds current year and next 19 years (20 years total)
- Maintains 2-digit or 4-digit format based on original field

### Automatic Activation

No configuration needed - runs automatically on all pages with credit card year fields.

### Target Field

Targets this specific selector:
```typescript
select[name='transaction.ccexpire']:not(#en__field_transaction_ccexpire)
```

This selects the year dropdown within the expiration field (not the month dropdown).

### Year Format Detection

Detects whether field uses 2-digit or 4-digit years:

```typescript
// Checks last option in original dropdown
const lastOption = yearField.options[yearField.options.length - 1];
const yearLength = lastOption.value.length; // 2 or 4

// Generates years in matching format
// 2-digit: "24", "25", "26"...
// 4-digit: "2024", "2025", "2026"...
```

### Generated Options

**Example for 2024:**
- 2-digit format: 24, 25, 26, ... 43
- 4-digit format: 2024, 2025, 2026, ... 2043

**Display vs Value:**
- Display text: Always 4-digit (2024, 2025, etc.)
- Option value: Matches original format (24 or 2024)

```html
<!-- 2-digit format -->
<option value="24">2024</option>
<option value="25">2025</option>

<!-- 4-digit format -->
<option value="2024">2024</option>
<option value="2025">2025</option>
```

### Clearing Options

Before adding new years, clears existing numeric options:

```typescript
// Keeps empty/placeholder options
if (option.value !== "" && !isNaN(Number(option.value))) {
  // Remove this option
}
```

This preserves options like:
```html
<option value="">Select Year</option>
```

### Best Practices

1. **Let It Run**: No configuration needed, works automatically
2. **Test Annually**: Verify it handles year transitions correctly
3. **Format Consistency**: Ensure payment processor accepts your year format
4. **VGS Integration**: If using VGS, this handles standard year field, not VGS iframe

---

## Autosubmit

The `Autosubmit` component automatically submits forms when a special URL parameter is present, enabling seamless form chaining.

### Overview

Use this to create multi-step experiences where one form automatically proceeds to another without user interaction.

### Activation

Add `?autosubmit=Y` to the URL:

```
https://example.com/page?
  supporter.firstName=John&
  supporter.lastName=Smith&
  supporter.emailAddress=john@example.com&
  autosubmit=Y
```

### How It Works

1. Checks if `?autosubmit=Y` parameter exists
2. Verifies form hasn't failed submission previously
3. Fixes email addresses with `+` signs (EN bug workaround)
4. Automatically submits the form

### Email Address Fix

EN has a bug where email addresses with `+` symbols are converted to spaces when using the `?chain` parameter. Autosubmit fixes this:

```typescript
// Before: john+test@example.com becomes "john test@example.com"
// After: Fixes it back to "john+test@example.com"
ENGrid.setFieldValue(
  "supporter.emailAddress",
  ENGrid.getFieldValue("supporter.emailAddress").replace(/\s/g, "+")
);
```

### Safety Checks

**Won't autosubmit if:**
- Submission previously failed validation
- Required fields are empty (will fail validation)
- `autosubmit` parameter is not exactly `Y`

This prevents infinite loops of failed submissions.

### Use Cases

**1. Pre-filled petition after donation:**
```
Donation page → (submit) → 
  Petition page?
    supporter.firstName=John&
    supporter.emailAddress=john@example.com&
    autosubmit=Y
```

**2. Multi-step registration:**
```
Info page → (submit) →
  Payment page?
    [pre-filled data]&
    autosubmit=Y →
  Thank you page
```

**3. Testing and QA:**
```
Form page?
  supporter.firstName=Test&
  supporter.emailAddress=test@example.com&
  autosubmit=Y
```

### Debug Logging

Enable debug to see autosubmit activity

Look for `[🚀 Autosubmit]`, you may need to enable "Persist Logs" to see it between redirects.

### Best Practices

1. **Pre-fill All Required Fields**: Autosubmit will fail if validation fails
2. **Test Thoroughly**: Test both successful and failed scenarios
3. **Use EN's Chain Parameter**: Combine with EN's `?chain` for form sequences
4. **Error Handling**: Ensure error pages don't include autosubmit parameter
5. **Security**: Don't use autosubmit with sensitive information in URLs

### Troubleshooting

**Form not autosubmitting:**
- Verify URL contains `?autosubmit=Y` (case-sensitive)
- Check if form failed previously (won't resubmit)
- Ensure all required fields are pre-filled
- Look for validation errors
- Check browser console for JavaScript errors

### See also

- [RememberMe](./remember-me) - Automatically fills supporter info based on cookies
- [URL Parameters](./data-and-url-parameters#url-to-form) - Learn about URL parameters for pre-filling data
