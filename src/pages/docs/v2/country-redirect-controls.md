---
title: Country & Redirect Controls
description: Learn how to disable specific countries and redirect users based on their country selection
---

## Country Disable

The `CountryDisable` component allows you to remove specific countries from country dropdown lists, preventing users from selecting them.

{% callout title="Tip!" %}
If you are looking to restrict your form to only users in the United States, consider using the `UsOnlyForm` component
{% /callout %}

### Overview

Use this to restrict form submissions to specific countries or exclude countries where your organization doesn't operate.

### Configuration

Configure via `EngridOptions`:

```javascript
EngridOptions = {
  CountryDisable: ["US", "CA", "GB"]
};
```

Or use country names:

```javascript
EngridOptions = {
  CountryDisable: ["United States", "Canada", "United Kingdom"]
};
```

{% callout title="You should know!" %}
The component matches both country codes (US, CA) and country names (United States, Canada), and is case-insensitive.
{% /callout %}

### Affected Fields

The component removes countries from these field types:

- `supporter.country` - Primary country field
- `transaction.shipcountry` - Shipping country
- `supporter.billingCountry` - Billing country
- `transaction.infcountry` - Additional info country

### How It Works

```typescript
// Finds all country dropdowns
const countries = document.querySelectorAll(
  'select[name="supporter.country"], select[name="transaction.shipcountry"]...'
);

// Removes matching options
option.remove();
```

### Debug Logging

Enable debug mode to see which countries are being removed:

```javascript
EngridOptions = {
  debug: true,
  CountryDisable: ["US"]
};
```

Look for `[🌎 CountryDisable]` in console showing:
```
Removing United States from supporter.country
```

### Examples

**Block specific countries:**
```javascript
EngridOptions = {
  CountryDisable: ["GB","FR"] // Great Britain, France
};
```

**Mix codes and names:**
```javascript
EngridOptions = {
  CountryDisable: ["US", "United Kingdom", "CA", "France"]
};
```

### Best Practices

1. **Use Country Codes**: More reliable than names (2-letter ISO codes)
2. **Test Thoroughly**: Verify correct countries are removed
3. **Consider EN Settings**: EN has built-in country restrictions you may prefer
4. **Legal Compliance**: Ensure restrictions comply with your organization's policies
5. **Communication**: Clearly communicate country restrictions to users

---

## Country Redirect

The `CountryRedirect` component automatically redirects users to different pages based on their selected country, enabling region-specific donation flows.

### Overview

When users select a specific country, they're automatically redirected to a country-specific page. Perfect for:
- Multi-currency campaigns
- Regional organizations
- Localized content

### Configuration

Configure via `CountryRedirect` in your client theme:

```javascript
  ...
  CountryRedirect: {
    US: "https://example.org/us-donation",
    CA: "https://example.org/canada-donation",
    GB: "https://example.org/uk-donation",
    AU: "https://example.org/australia-donation"
  }
  ...
```

### Page-Level Configuration

Override for specific pages using a code block:

```html
<script>
  window.EngridPageOptions = window.EngridPageOptions || {};
  window.EngridPageOptions.CountryRedirect = {
    US: "https://example.org/us-regional",
    CA: "https://example.org/ca-regional"
  };
</script>
```

This overrides the default `CountryRedirect` options for that page only.

### How It Works

1. User selects a country from dropdown
2. Component checks if country is in `CountryRedirect` object
3. Verifies current URL is different from target URL (prevents redirect loops)
4. Adds `?chain` parameter if not present
5. Redirects user to specified URL

### Chain Parameter

The component automatically adds the `?chain` parameter to preserve form data:

```typescript
// If redirect URL doesn't have ?chain, adds it
if (!redirectUrl.search.includes("chain")) {
  redirectUrl.search += (redirectUrl.search ? "&" : "?") + "chain";
}
```

This ensures the user's information follows them to the regional page.

### Country Codes

Use 2-letter ISO country codes that match EN's country field values:

- US - United States
- CA - Canada
- GB - United Kingdom
- AU - Australia
- DE - Germany
- FR - France
- etc.

### When Redirect Occurs

**Redirects when:**
- Country matches one in `CountryRedirect` object
- Target URL is different from current URL
- Country field exists on page

**Does NOT redirect when:**
- Already on the target URL (prevents loops)
- Country not in `CountryRedirect` object
- No country field on page

### Debug Logging

Enable debug mode to see redirect activity:

```javascript
EngridOptions = {
  debug: true,
  CountryRedirect: { /* config */ }
};
```

Look for `[🛫 CountryRedirect]` in console showing:
```
US: Redirecting to https://example.org/us-donation?chain
```

You may need to check "Persist Logs" to see the log print even after the page is redirected.

### Use Cases

**1. Tax-Deductible Entities:**
```javascript
// Redirect to appropriate charity registration
CountryRedirect: {
  US: "https://us-charity.org/donate", // 501(c)(3)
  CA: "https://ca-charity.org/donate", // Registered charity
  UK: "https://uk-charity.org/donate"  // Registered charity
}
```

**2. Currency-Specific Pages:**
```javascript
// Each page shows appropriate currency
CountryRedirect: {
  US: "https://example.org/donate?currency=USD",
  GB: "https://example.org/donate?currency=GBP",
  EU: "https://example.org/donate?currency=EUR"
}
```

**3. Regional Organizations:**
```javascript
// Different offices handle different regions
CountryRedirect: {
  US: "https://us.organization.org/donate",
  CA: "https://canada.organization.org/donate",
  AU: "https://australia.organization.org/donate"
}
```

### Best Practices

1. **Prevent Loops**: Ensure regional pages don't redirect back
2. **Test Chain Parameter**: Verify form data carries through redirects
3. **Clear Communication**: Inform users why they're being redirected
4. **Use 2-Letter Codes**: Match EN's country field format exactly
5. **Consider UX**: Don't redirect after user has filled extensive form data
6. **Mobile Testing**: Ensure redirects work smoothly on mobile devices
7. **Analytics**: Track redirects to understand regional traffic patterns

### Troubleshooting

**Not redirecting:**
- Verify country code matches EN's format exactly
- Check if already on target URL (prevents loops)
- Ensure country field exists on page
- Look for console errors
- Enable debug mode to see redirect attempts

**Redirect loops:**
- Ensure target page doesn't have same `CountryRedirect` config
- Check if URL comparison is failing
- Verify URL string matching is working correctly

**Lost form data:**
- Confirm `?chain` parameter is being added
- Test that EN's chain feature is working
- Verify regional page has same field names

## Regional Campaign Strategy

### Common Patterns

**Global Hub → Regional Pages:**
1. Create a global landing page without `CountryRedirect`
2. Use `CountryRedirect` to send users to regional pages
3. Regional pages don't have `CountryRedirect` (end of chain)

**Regional Page → Regional Thank You:**
1. Regional donation page redirects based on country
2. Each region has its own thank you page
3. Thank you pages show region-specific impact

**Multi-Step with Country:**
1. Page 1: Collect basic info + country
2. Redirect to regional page 2 via `CountryRedirect`
3. Page 2: Regional payment processing
4. Page 3: Regional thank you

### Integration with Other Components

- **Auto Country Select**: Detects location, works with redirect
- **Custom Currency**: Each regional page can have different currency
- **Translation**: Regional pages can be in local languages

## US Only Form

The US Only Form component is a specific use case of country redirect that automatically sets the country to "United States" and hides the country field, ensuring only US supporters can submit the form. It also notices non-US users to with a warning banner.