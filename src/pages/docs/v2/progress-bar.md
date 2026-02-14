---
title: Progress Bar
description: Learn how to add an animated progress bar to multi-page ENgrid forms.
---

ENgrid includes an animated progress bar indicator for multi-page forms, showing the donor how far they are through the form process.

## Setup

Add a `<span>` element with the `data-engrid-progress-indicator` attribute to your page:

```html
<span data-engrid-progress-indicator></span>
```

ENgrid will automatically detect the current page number and total page count, then render an animated progress bar inside this element.

## Attributes

| Attribute | Description | Default |
|-----------|-------------|---------|
| `max` | The maximum percentage value | `100` |
| `amount` | An explicit override amount (overrides the calculated percentage, capped at `max`) | `0` |

## How It Works

1. ENgrid reads the current page number (`ENGrid.getPageNumber()`) and total page count (`ENGrid.getPageCount()`)
2. Calculates the progress percentage as a proportion of the `max` value
3. Injects inner HTML with `.indicator__wrap`, `.indicator__progress` (the bar), and `.indicator__percentage` (text display)
4. Animates the bar from the previous page's percentage to the current page's percentage using `requestAnimationFrame`

## Styling

The progress bar is styled via `_engrid-progress-bar.scss`. You can customize the appearance in your client theme by overriding the default styles for:

- `.indicator__wrap` — The outer container
- `.indicator__progress` — The animated bar (uses CSS `scaleX` transform)
- `.indicator__percentage` — The percentage text display
