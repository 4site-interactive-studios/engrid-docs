---
title: Background Image Positioning
description: Learn how to control the position of background images in ENgrid pages using positioning classes and data attributes.
---

## Overview

The Background Image Positioning feature allows you to control how background images are positioned within their containers in your ENgrid pages. This functionality automatically processes positioning classes and data attributes, moving them from background images to their parent column containers for proper styling and layout.

{% callout title="What is Background Image Positioning?" %}
Background image positioning controls where an image appears within its container - whether it's centered, pinned to a corner, or aligned to an edge. This is similar to CSS `background-position` but works with actual `<img>` elements.
{% /callout %}

## How It Works

When you add a background image to your ENgrid page, the system automatically:

1. **Scans** for positioning classes or data attributes on your background images
2. **Moves** these positioning instructions from the image to the parent column container
3. **Applies** the appropriate CSS styling to position the background image correctly
4. **Monitors** for any changes and reprocesses if needed

This ensures that background images are positioned correctly regardless of how the page layout changes or how the image is processed.

## Supported Positioning Options

You can control background image positioning using either **CSS classes** or **data attributes**. Both methods support the same positioning values:

### Center Positions

- `center` - Centers the background image in the middle of the container

### Edge Positions

- `top` or `topcenter` - Positions image at the top center
- `bottom` or `bottomcenter` - Positions image at the bottom center
- `left` or `leftcenter` - Positions image at the left center
- `right` or `rightcenter` - Positions image at the right center

### Corner Positions

- `topleft` - Positions image at the top-left corner
- `topright` - Positions image at the top-right corner
- `bottomleft` - Positions image at the bottom-left corner
- `bottomright` - Positions image at the bottom-right corner

## Recommended Method: Using Data Attributes

{% callout title="Recommended Approach" %}
We recommend using data attributes for background image positioning as they provide cleaner, more semantic markup and better separation of concerns.
{% /callout %}

Use the `data-background-position` attribute on your background image:

```html
<!-- Background image positioned at bottom-right -->
<img
  data-background-position="bottomright"
  src="background-image.jpg"
  alt="Background image"
/>

<!-- Background image positioned at top-left -->
<img
  data-background-position="topleft"
  src="background-image.jpg"
  alt="Background image"
/>

<!-- Background image centered -->
<img
  data-background-position="center"
  src="background-image.jpg"
  alt="Background image"
/>
```

## Legacy Method: Using CSS Classes

{% callout title="Legacy Support" %}
CSS classes are still supported for backward compatibility, but we recommend using data attributes for new implementations.
{% /callout %}

Add the appropriate class directly to your background image element:

```html
<!-- Background image positioned at bottom-right -->
<img
  class="attribution-bottomright"
  src="background-image.jpg"
  alt="Background image"
/>

<!-- Background image positioned at top-left -->
<img
  class="attribution-topleft"
  src="background-image.jpg"
  alt="Background image"
/>

<!-- Background image positioned at top center -->
<img
  class="attribution-top"
  src="background-image.jpg"
  alt="Background image"
/>
```

## Layout-Specific Defaults

ENgrid automatically applies different default background image positions based on your page layout:

### Left-Aligned Layouts

For layouts like `leftleft1col` and `centerleft1col`:

- **Default position**: Bottom-right corner
- **Use case**: Images that should be anchored to the right side

### Right-Aligned Layouts

For layouts like `rightright1col` and `centerright1col`:

- **Default position**: Bottom-left corner
- **Use case**: Images that should be anchored to the left side

## Automatic Processing

The system automatically processes background image positioning when:

- **Page loads** - All background images are scanned and processed
- **DOM changes** - If images are added or modified dynamically
- **Manual trigger** - You can manually reprocess if needed

### What Gets Processed

The system looks for:

- Images within the `.page-backgroundImage` section
- Both CSS classes and `data-background-position` attributes
- Parent `.en__component--column` containers to apply the positioning

### Processing Steps

1. **Scan** for images with positioning classes or data attributes
2. **Find** the parent column container
3. **Move** positioning classes from image to container
4. **Remove** data attributes from image (if using data attributes)
5. **Apply** the positioning styling to the container

## Troubleshooting

### Background Image Not Positioning Correctly

1. **Check image source** - Ensure the image has a valid `src` or `data-src` attribute
2. **Verify positioning attribute** - Make sure you're using one of the supported positioning values in `data-background-position`
3. **Check parent container** - Ensure the image is within a `.en__component--column` container
4. **Inspect CSS** - Verify that the positioning styling is being applied correctly

### Wrong Position

1. **Check for conflicts** - Multiple positioning attributes or classes might conflict
2. **Verify layout defaults** - Layout-specific defaults might override your positioning
3. **Clear cache** - Browser cache might be showing old styling

## Related Features

- **[Replace Banner with Background](/docs/v2/replace-banner-with-background)** - Using background images as banners
- **[Conditional Content Helper Classes](/docs/v2/conditional-content-helper-classes)** - Showing/hiding content based on conditions
- **[Media Attribution](/docs/v2/media-attribution)** - Adding attribution text to images (works with positioning)
