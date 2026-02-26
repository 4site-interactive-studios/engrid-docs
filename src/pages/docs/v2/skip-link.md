---
title: Skip Link
description: Learn about ENgrid's accessible skip-to-main-content link.
---

ENgrid automatically adds an accessible "Skip to main content" link at the top of every page for keyboard navigation. This is an important accessibility (a11y) feature that allows keyboard users to bypass the navigation and jump directly to the main content.

## How It Works

1. ENgrid searches for the best target element to skip to, in priority order:
   - First `<title>` inside a `div[class*='body-']` section
   - First `<h1>` inside a `div[class*='body-']` section
   - First `<title>` anywhere on the page
   - First `<h1>` anywhere on the page
2. Sets `id="skip-link"` on the parent element of the matched element
3. Inserts `<a class="skip-link" href="#skip-link">Skip to main content</a>` as the first child of `<body>`

## Behavior

- The link is visually hidden by default and only becomes visible when focused via keyboard (Tab key)
- Clicking or pressing Enter on the link scrolls the page to the main content area
- If no `<title>` or `<h1>` is found on the page, the skip link is not added

## Styling

The skip link is styled via `_engrid-skip-link.scss`. The default styles hide the link off-screen and reveal it on `:focus`.

This feature runs automatically — no configuration is needed.
