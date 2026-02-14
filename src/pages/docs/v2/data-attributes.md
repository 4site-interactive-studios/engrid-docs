---
title: Data Attributes & Data Replace
description: Learn how ENgrid uses data attributes for conditional display and content replacement.
---

ENgrid provides several data attribute features for controlling element visibility and replacing content dynamically.

## Data Attributes

ENgrid reads and sets various `data-engrid-*` attributes on the `<body>` element to communicate page state. These attributes can be used in CSS selectors for conditional styling.

Common body data attributes include:

- `data-engrid-page-type` — The EN page type (e.g., "donation", "petition", "emailtotarget")
- `data-engrid-page-number` — Current page number in multi-page forms
- `data-engrid-page-count` — Total number of pages
- `data-engrid-payment-type` — Currently selected payment type
- `data-engrid-frequency` — Currently selected donation frequency

---

## Data Hide

The Data Hide feature allows you to hide page elements based on data attribute conditions. Elements with specific `data-engrid-hide-*` attributes will be hidden when conditions are met.

---

## Data Replace

The Data Replace feature allows you to dynamically replace content in page elements using merge-tag-like syntax. This is useful for personalizing page content based on supporter data or URL parameters.

### Merge Tag Syntax

```
{engrid_data~[field]~[fallback]}
```

- **`[field]`** — The data field name to insert
- **`[fallback]`** — Optional default value if the field is empty

### Example

```html
<p>Thank you, {engrid_data~firstName~Friend}!</p>
```

If the supporter's first name is "Jane", this displays "Thank you, Jane!". If no first name is available, it displays "Thank you, Friend!".

### Hide Until Merged

Add the class `hide-until-merged` to elements containing merge tags to prevent them from showing the raw merge tag syntax before the replacement occurs:

```html
<p class="hide-until-merged">Thank you, {engrid_data~firstName~Friend}!</p>
```
