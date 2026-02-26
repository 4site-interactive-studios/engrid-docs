---
title: Country Options
description: Learn about ENgrid's country-related features including auto-selection, redirects, and disabling countries.
---

ENgrid provides several features for managing country fields on forms, including automatic country selection, country-based redirects, and the ability to disable specific countries.

## Auto Country Select

ENgrid can automatically select the supporter's country based on their browser locale or other signals. This helps pre-populate the country field for a smoother form experience.

## Country Redirect

The Country Redirect feature redirects users to a different URL based on their selected country. This is useful for organizations with country-specific donation pages.

### Configuration

Configure country redirects in your ENgrid theme options:

```ts
const options: Options = {
  CountryRedirect: {
    US: "https://support.example.org/page/us-donate",
    CA: "https://support.example.ca/page/ca-donate",
    GB: "https://support.example.co.uk/page/uk-donate",
  },
}
```

You can also override per-page using `EngridPageOptions`:

```js
window.EngridPageOptions = {
  CountryRedirect: {
    US: "https://support.example.org/page/special-us-donate",
  },
};
```

### Behavior

- Listens for changes to the country dropdown field
- Also checks on initial page load
- Compares the selected country against the configured map
- Only redirects if the current URL doesn't already match the target
- Automatically appends `?chain` to the redirect URL if not already present

## Country Disable

The Country Disable feature removes specified countries from all country dropdown fields on the page.

### Configuration

```ts
const options: Options = {
  CountryDisable: ["XX", "YY"], // Array of country codes to remove
}
```

### Behavior

- Removes the specified country options from all four country selects on the page:
  - `supporter.country`
  - `transaction.shipcountry`
  - `supporter.billingCountry`
  - `transaction.infcountry`

## Expand Region Name

ENgrid includes a feature that expands abbreviated region/state names to their full names. For example, it can convert "CA" to "California" in the region field, improving the display of pre-populated address data.
