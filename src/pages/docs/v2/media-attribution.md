---
title: Media Attribution
description: Learn how ENgrid handles media attribution for background images and videos.
---

The Media Attribution component displays photo/video credit text overlaid on background images. It reads attribution data from the image's alt text or data attributes and positions it on the page.

## How It Works

ENgrid automatically scans background images for attribution information and creates a styled overlay displaying the photographer or source credit.

## Positioning

Attribution text can be positioned using data attributes or CSS classes:

- `data-attribution-position="bottomright"` (default for left-aligned layouts)
- `data-attribution-position="bottomleft"` (default for right-aligned layouts)
- `data-attribution-position="topright"`
- `data-attribution-position="topleft"`

## Styling

The attribution overlay is styled via `_engrid-media-attribution.scss`. You can customize the font size, color, background, and positioning in your client theme.
