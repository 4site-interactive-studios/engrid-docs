---
title: Event Tickets
description: This page shows how ENgrid automatically formats ticket prices as currency on event registration pages
---

## Overview

The `EventTickets` component automatically enhances the display of ticket prices on Engaging Networks event registration pages. It formats ticket amounts using proper currency formatting based on the supporter's locale and removes unnecessary decimal places for whole number amounts.

{% callout title="You should know!" %}
This component runs automatically when ENgrid detects ticket elements on the page. No configuration is required.
{% /callout %}

## How It Works

The component performs three main actions:

1. **Hides original currency symbols** - Removes the standalone currency text elements that Engaging Networks displays
2. **Formats prices as currency** - Converts plain number amounts into properly formatted currency values with symbols
3. **Removes trailing zeros** - Strips `.00` from whole number amounts for cleaner display

## Automatic Behavior

### Before ENgrid

Engaging Networks displays ticket prices as plain numbers with separate currency text:

```
USD 50.00
EUR 100.00
GBP 25.00
```

### After ENgrid

Ticket prices are formatted as proper currency values:

```
$50
€100
£25
```

## Formatting Rules

The component uses the browser's `Intl.NumberFormat` API to format currency, which means:

- Currency symbols are positioned according to locale conventions (e.g., `$50` in US, `50 €` in some European locales)
- Thousand separators are added based on locale (e.g., `$1,000` vs `1.000 €`)
- Currency symbols are automatically determined from the ticket's currency code
- Decimal places are shown only when needed (`.00` is removed, but `.50` is kept)

## Technical Details

### Targeted Elements

The component works with Engaging Networks' ticket markup:

- `.en__ticket__field--cost` - The container for ticket cost information
- `.en__ticket__price` - The element containing the numeric price
- `.en__ticket__currency` - The element containing the currency code (e.g., "USD", "EUR", "GBP")

### Formatting Process

1. Finds all ticket currency elements and hides them with the class `.en__ticket__currency__hidden`
2. Loops through each ticket cost element
3. Extracts the numeric price and currency code
4. Uses `Intl.NumberFormat` with the detected currency to format the amount
5. Removes `.00` from the formatted string if present
6. Updates the ticket price element with the formatted value

## Examples

### Various Currency Formats

| Original | Currency Code | Formatted Result |
| -------- | ------------- | ---------------- |
| 50.00    | USD           | $50              |
| 50.50    | USD           | $50.50           |
| 100.00   | EUR           | €100             |
| 1000.00  | GBP           | £1,000           |
| 25.99    | CAD           | CA$25.99         |

### Locale-Specific Formatting

The formatting adapts to the supporter's browser locale:

- **US English (en-US)**: `$1,234.56`
- **German (de-DE)**: `1.234,56 €`
- **French (fr-FR)**: `1 234,56 €`
- **Japanese (ja-JP)**: `¥1,234`

## Styling

The component adds a CSS class to hide original currency elements:

```css
.en__ticket__currency__hidden {
  /* This class is added to hide the original currency text */
}
```

You can target formatted ticket prices with existing Engaging Networks classes:

```css
/* Style the ticket cost container */
.en__ticket__field--cost {
  font-weight: bold;
}

/* Style the formatted price */
.en__ticket__price {
  color: #333;
  font-size: 1.2em;
}
```

## Use Cases

### Event Registration Pages

The Event Tickets component is designed for Engaging Networks event pages where:

- Multiple ticket types are offered (e.g., General Admission, VIP, Student)
- Tickets have different prices
- Prices should be displayed in a user-friendly currency format

### Multi-Currency Events

For organizations running events in multiple countries:

- Each ticket's currency is automatically detected
- Formatting follows the supporter's locale conventions
- No manual configuration needed per currency

## Limitations

### Decimal Place Handling

The component only removes `.00` suffixes. Other decimal amounts are preserved:

- `$50.00` becomes `$50`
- `$50.50` stays `$50.50`
- `$50.99` stays `$50.99`

If you need different decimal handling, you would need to customize the component.

### Currency Code Requirement

The component requires that Engaging Networks provides:

- A valid currency code in the `.en__ticket__currency` element
- A numeric price in the `.en__ticket__price` element

Without these elements, the formatting will not work.

## No Configuration Required

Unlike many other ENgrid components, Event Tickets requires no setup or configuration:

- Automatically detects event ticket elements
- Runs on page load if tickets are present
- Uses browser locale for formatting
- No options to set in `window.EngridOptions`

This makes it a zero-friction enhancement for event registration pages.
