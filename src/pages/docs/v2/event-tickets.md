---
title: Event Tickets
description: Learn how ENgrid enhances event ticket pages with proper currency formatting.
---

ENgrid automatically enhances Engaging Networks event ticket pages by formatting ticket prices as properly localized currency strings.

## How It Works

- Finds all ticket price elements (`.en__ticket__field--cost`) on the page
- Hides the raw currency code elements (e.g., "USD") by adding a `en__ticket__currency__hidden` class
- Uses `Intl.NumberFormat` to format numeric ticket prices into locale-aware currency strings (e.g., `25` → `$25.00`)
- Strips trailing `.00` from whole-dollar amounts for cleaner display

## Example

Before ENgrid:
```
25 USD
```

After ENgrid:
```
$25
```

This feature runs automatically on event pages — no configuration is needed.
