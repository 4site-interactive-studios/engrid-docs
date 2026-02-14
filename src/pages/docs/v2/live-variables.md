---
title: Live Variables
description: Learn how ENgrid dynamically updates page content with live donation amounts, frequencies, and currencies.
---

ENgrid provides several "live variable" features that dynamically update page content as the donor interacts with the form. These include live amounts, live frequencies, and live currency formatting.

## Live Giving Amount

The `live-giving-amount` class displays the current donation amount (including processing fees if applicable) anywhere on the page.

```html
<span class="live-giving-amount">$0</span>
```

The displayed amount updates in real-time as the donor changes their gift amount or toggles processing fees.

## Live Giving Frequency

The `live-giving-frequency` class displays the currently selected donation frequency.

```html
<span class="live-giving-frequency"></span>
```

This will display the frequency text (e.g., "Monthly", "Annually") or remain blank for one-time gifts.

## Live Giving Upsell Amount

These classes calculate and display a suggested monthly upsell amount based on the current donation:

- **`live-giving-upsell-amount`** — Displays the upsell amount with a `$` prefix (e.g., "$15")
- **`live-giving-upsell-amount-raw`** — Displays the raw number without the `$` prefix (e.g., "15")

The upsell amount is calculated as: `amount ÷ 12`, rounded up to the nearest $5.

```html
<span class="live-giving-upsell-amount">$0</span>
```

## Submit Button Variables

The submit button label supports dynamic placeholders that are replaced with live values:

- **`$AMOUNT`** — Replaced with the current donation amount (including fees)
- **`$FREQUENCY`** — Replaced with the current frequency text

For example, a button label of `Donate $AMOUNT $FREQUENCY` would display as `Donate $25 Monthly`.

## Currency Formatting

ENgrid formats amounts according to configurable options:

```ts
const options: Options = {
  DecimalSeparator: ".",    // Character used for decimals (default: ".")
  DecimalPlaces: 2,         // Number of decimal places (default: 2)
  ThousandsSeparator: "",   // Character for thousands grouping (default: "")
}
```

## Live Currency

The Live Currency feature works alongside Live Variables to ensure all displayed amounts use the correct currency symbol based on the selected currency on the page. It monitors the currency field and updates all live amount displays accordingly.

## Swap Amounts

The Swap Amounts feature dynamically changes the displayed donation amount options based on the selected giving frequency. This allows you to show different suggested amounts for one-time vs. monthly vs. annual giving.

### Configuration

Swap amounts are configured via `window.EngridAmounts` or through Engaging Networks' native swap list/form dependency features:

```js
window.EngridAmounts = {
  "onetime": [25, 50, 100, 250, 500],
  "monthly": [10, 15, 25, 50, 100],
  "annual": [100, 250, 500, 1000, 2500]
};
```

When the donor changes their giving frequency, the amount buttons automatically update to show the appropriate values for that frequency.
