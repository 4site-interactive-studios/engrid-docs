---
title: Thank You Page Conditional Content
description: Learn how to show or hide content on thank you pages based on donation data.
---

ENgrid allows you to conditionally display content on thank you pages based on the completed transaction data, such as donation amount, frequency, payment type, and more.

## How It Works

The Thank You Page Conditional Content component reads the completed transaction data from `window.pageJson` and applies CSS classes to show or hide elements based on the values.

## Available Conditions

You can use the same conditional content helper classes that work on donation pages, but on thank you pages they read from the completed transaction data:

- **Frequency-based:** `recurring-frequency-monthly-show`, `recurring-frequency-annual-show`, etc.
- **Amount-based:** `showifamount-greaterthan-{N}`, `showifamount-lessthan-{N}`, etc.
- **Payment type-based:** `giveBySelect-Card`, `giveBySelect-ACH`, `giveBySelect-Paypal`, etc.

## Example

```html
<!-- Show only for monthly donors on the thank you page -->
<div class="recurring-frequency-monthly-show">
  Thank you for your monthly commitment!
</div>

<!-- Show only for one-time donors -->
<div class="recurring-frequency-onetime-show">
  Consider making this a monthly gift!
</div>
```

This feature runs automatically on thank you pages — no configuration is needed.
