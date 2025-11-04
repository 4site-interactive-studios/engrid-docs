---
title: Country-Based Redirect
description: Learn how to automatically redirect users to different pages based on their selected country.
---

The `CountryRedirect` component allows you to automatically redirect users to country-specific pages when they select a country on the form. This is useful for creating regional campaigns or customizing content by country.

## How It Works

When a user selects a country that matches a country in your redirect configuration, they are automatically redirected to the specified URL. The redirect only happens if the current URL is different from the redirect URL.

## Configuration

Configure country redirects in your ENgrid options:

```javascript
window.EngridOptions = {
  CountryRedirect: {
    US: "https://example.org/page/1234/donate-us/1",
    CA: "https://example.org/page/1234/donate-ca/1",
    GB: "https://example.org/page/1234/donate-gb/1",
    AU: "https://example.org/page/1234/donate-au/1",
  },
};
```

## Page-Level Configuration

You can also configure redirects at the page level using `EngridPageOptions`:

```html
<script>
window.EngridPageOptions = window.EngridPageOptions || {};
window.EngridPageOptions.CountryRedirect = {
  US: "https://example.org/page/1234/donate-us/1",
  CA: "https://example.org/page/1234/donate-ca/1",
  GB: "https://example.org/page/1234/donate-gb/1",
};
</script>
```

Page-level configuration overrides the global configuration for that specific page.

## Country Codes

Country codes must match exactly the values used in the Engaging Networks country field. Common formats:

- Two-letter codes: `US`, `CA`, `GB`, `AU`
- Full country names: `United States`, `Canada`, `United Kingdom`
- Three-letter codes: `USA`, `CAN`, `GBR`

To determine the correct format, inspect the country field's `<option>` values on your page.

## How Redirects Work

1. Component monitors country field changes
2. When a country is selected, it checks if that country is in the redirect configuration
3. If found, and the current URL doesn't already match the redirect URL, it redirects
4. The `?chain` parameter is automatically added to preserve form data

## Examples

### Basic Configuration

```javascript
window.EngridOptions = {
  CountryRedirect: {
    US: "https://example.org/campaigns/us-campaign",
    CA: "https://example.org/campaigns/ca-campaign",
  },
};
```

### Regional Campaigns

```javascript
window.EngridOptions = {
  CountryRedirect: {
    US: "https://example.org/page/1234/donate-us/1",
    CA: "https://example.org/page/1234/donate-ca/1",
    GB: "https://example.org/page/1234/donate-gb/1",
    AU: "https://example.org/page/1234/donate-au/1",
    NZ: "https://example.org/page/1234/donate-nz/1",
  },
};
```

## Important Notes

### Automatic Chain Parameter

The component automatically adds the `?chain` parameter to redirect URLs if it's not already present. This ensures form data is preserved during the redirect.

### URL Matching

The redirect only happens if the current URL doesn't already include the redirect URL. This prevents redirect loops.

### Country Field Required

The component only works if:
- The country field is present on the page
- The `CountryRedirect` option is configured

## Use Cases

### Regional Campaign Pages

Create separate campaign pages for different countries and redirect users automatically:

```javascript
window.EngridOptions = {
  CountryRedirect: {
    US: "https://example.org/us-summer-campaign",
    CA: "https://example.org/ca-summer-campaign",
    GB: "https://example.org/gb-summer-campaign",
  },
};
```

### Language-Specific Pages

Redirect to language-specific versions:

```javascript
window.EngridOptions = {
  CountryRedirect: {
    FR: "https://example.org/fr/donate",
    DE: "https://example.org/de/donate",
    ES: "https://example.org/es/donate",
  },
};
```

## Troubleshooting

### Redirect Not Working

- Verify country codes match exactly (case-sensitive)
- Check that the country field is present on the page
- Ensure the redirect URL is different from the current URL
- Check browser console for errors

### Redirect Loop

- Ensure redirect URLs don't point back to pages with the same redirect configuration
- Check that the current URL doesn't already match the redirect URL

### Wrong Country Code Format

- Inspect the country field's option values
- Match the exact format used by Engaging Networks
- Test with different country values to find the correct format

