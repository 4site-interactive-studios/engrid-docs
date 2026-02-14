---
title: Show If Amount
description: Learn how to conditionally show or hide elements based on the donation amount.
---

The Show If Amount feature allows you to conditionally display or hide page elements based on the current donation amount. It works on both donation pages (reacting to live amount changes) and thank you pages (reading the completed donation amount).

## CSS Classes

Add these classes to any page element to control its visibility based on the donation amount:

| Class | Behavior |
|-------|----------|
| `showifamount-lessthan-{N}` | Show if amount < N |
| `showifamount-lessthanorequalto-{N}` | Show if amount ≤ N |
| `showifamount-equalto-{N}` | Show if amount = N |
| `showifamount-greaterthanorequalto-{N}` | Show if amount ≥ N |
| `showifamount-greaterthan-{N}` | Show if amount > N |
| `showifamount-between-{MIN}-{MAX}` | Show if MIN < amount < MAX |

Replace `{N}`, `{MIN}`, and `{MAX}` with numeric values.

## Examples

```html
<!-- Show only when donation is $100 or more -->
<div class="showifamount-greaterthanorequalto-100">
  Thank you for your generous gift!
</div>

<!-- Show only for donations between $50 and $200 -->
<div class="showifamount-between-50-200">
  You qualify for a special premium!
</div>
```

## How It Works

- On donation pages, the component subscribes to `DonationAmount.onAmountChange` and reactively updates visibility as the donor changes their amount.
- On thank you pages, it reads the completed amount from `window.pageJson.amount`.
- When a condition is met, the CSS class `engrid-open` is added to the element.
- When a condition is not met, the `engrid-open` class is removed.

{% callout title="Note" %}
This feature is also referenced in the [Gift Amount](/docs/v2/gift-amount) documentation under "Conditional Content Display."
{% /callout %}
