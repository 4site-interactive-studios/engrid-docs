---
title: Preferred Payment Method
description: Configure ENgrid to pick the best available payment option based on supporter data, URL parameters, and smart fallbacks.
---

The `PreferredPaymentMethod` component centralizes how ENgrid decides which payment option to highlight when a donation page loads. It keeps `transaction.giveBySelect` and `transaction.paymenttype` in sync, waits for late-loading wallet providers, and honours both page-level configuration and supporter-specific preferences.

{% callout title="When does it run?" %}
`PreferredPaymentMethod` runs automatically on Donation pages after `DigitalWallets` finishes wiring up the available payment types. No additional markup changes are required.
{% /callout %}

## How the selection logic works

1. **Page field override** – If `preferredPaymentMethodField` is set and the referenced field contains a value that matches a visible payment option, that option wins.
2. **URL override** – If the page loads with a `?payment=` query parameter that matches a visible payment option, it takes precedence (unless the field override already selected something).
3. **Default ordering** – If neither override applies, ENgrid loops through `defaultPaymentMethod` (an ordered array) and picks the first option that exists and is currently visible.
4. **Wallet awareness** – When the desired option depends on Stripe or PayPal wallets, the component watches the body data attributes that `DigitalWallets` sets (for example `data-engrid-payment-type-option-apple-pay="true"`) and waits up to four seconds for them to appear before falling back to the next default.

If the chosen option is available, the component triggers the corresponding give-by-select radio button (or its label) and then calls `ENGrid.setPaymentType(...)` to keep the hidden `transaction.paymenttype` field aligned.

## Configuration

`PreferredPaymentMethod` is configured through `window.EngridOptions` / `window.EngridPageOptions` with two optional properties.

```ts
window.EngridPageOptions = {
  PreferredPaymentMethod: {
    preferredPaymentMethodField: '{supporter.field.paymentPreference}', // Optional form field name
    defaultPaymentMethod: ['card'], // Ordered list, first available wins
  },
}
```

### `preferredPaymentMethodField`

- Accepts the **name attribute** of any field on the page (hidden or visible).
- When the field contains a value that matches an available give-by-select option (case-insensitive), that option becomes the first choice.
- Useful when personalization scripts populate supporter preferences (for example a CRM-stored “preferred payment type”).
- When the field exists on the page, ENgrid keeps it synchronized with every give-by-select change so the stored preference always reflects the supporter’s latest choice.
- Existing field values are respected on load; ENgrid only writes the radio selection back when the field starts empty or after the supporter makes a new choice.

```html
<script>
  window.EngridPageOptions = window.EngridPageOptions || {}
  window.EngridPageOptions.PreferredPaymentMethod = {
    preferredPaymentMethodField: 'supporter.questions.paymentPreference',
  }
</script>
```

### `defaultPaymentMethod`

- Provide an ordered array describing your desired fallbacks.
- Each entry should align with the value attribute used in `transaction.giveBySelect` radios (for example `card`, `ach`, `paypal`, `stripedigitalwallet`, `paypaltouch`, `daf`).
- ENgrid normalizes the casing for you.

```html
<script>
  window.EngridPageOptions = window.EngridPageOptions || {}
  window.EngridPageOptions.PreferredPaymentMethod = {
    defaultPaymentMethod: ['stripedigitalwallet', 'paypaltouch', 'card'],
  }
</script>
```

In the example above ENgrid will:

1. Select Stripe Digital Wallets when Apple Pay or Google Pay is actually available on the page.
2. Otherwise prefer PayPal Touch / Venmo if those buttons load.
3. Finally fall back to card.

## URL parameter override

Append `?payment=VALUE` (for example `?payment=ach`) to the URL to force a payment type for a single visit. This is helpful during QA or when launching targeted campaigns that promote a specific method. The override respects availability checks—if the requested option never appears, ENgrid continues down the default list.

## Observable attributes for wallets

To determine when wallets are ready, the component listens for these body data attributes (emitted by `DigitalWallets`):

| Payment value         | Watched attributes                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------- |
| `stripedigitalwallet` | `data-engrid-payment-type-option-apple-pay`, `data-engrid-payment-type-option-google-pay`   |
| `paypaltouch`         | `data-engrid-payment-type-option-paypal-one-touch`, `data-engrid-payment-type-option-venmo` |
| `daf`                 | `data-engrid-payment-type-option-daf`                                                       |

As soon as one of the attributes flips to `"true"`, the component proceeds with selection; if the attribute never changes within four seconds, ENgrid logs the timeout (when debug logging is enabled) and moves to the next fallback.

## Debugging & tips

- Add `?debug=true` or `?debug=log` to surface `PreferredPaymentMethod` logger output in the console.
- Confirm that the give-by-select radios (`transaction.giveBySelect`) exist on the page; the component will gracefully skip if they are missing.
- Remember that Engaging Networks sometimes maps multiple “card” values (`card`, `visa`, `vi`). ENgrid’s helper normalizes these for you.
- When testing wallets locally, ensure `DigitalWallets` is configured so the required body attributes are emitted—otherwise the component will fall back to the next option after the timeout.

With this configuration in place you can launch pages that automatically steer supporters toward the payment methods that make the most sense for them while still providing reliable fallbacks.
