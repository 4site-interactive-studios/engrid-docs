---
title: Premium Gift
description: Learn how ENgrid enhances premium gift pages with data attributes, merge tags, and accessibility improvements.
---

ENgrid enhances Engaging Networks' premium gift functionality with body data attributes, merge tag support, accessibility improvements, and improved click handling.

## Body Data Attributes

ENgrid sets the following data attributes on the `<body>` element for CSS targeting:

- **`data-engrid-premium-gift-name`** — A slugified version of the selected premium item name
- **`data-engrid-premium-gift-maximize`** — Set to `"true"` or `"false"` based on whether the "maximize my donation" option is selected

## Merge Tag Support

You can use the merge tag `{engrid_data~premium-gift-name}` in your page content to dynamically display the name of the selected premium gift.

## Accessibility

ENgrid adds proper `tabindex` and keyboard event handlers to premium gift items, making them accessible via keyboard navigation. Users can select premium items using Enter or Space keys.

## Click Handling

Premium gift item images and labels are made clickable, so clicking anywhere on a premium item card selects it (not just the radio button).

## How It Works

This feature runs automatically on premium gift donation pages. No configuration is needed — ENgrid detects the premium gift page type and enhances the UI accordingly.
