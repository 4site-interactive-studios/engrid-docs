---
title: Page Background Slideshows
description: This page shows how to use ENgrid's PageBackgroundRotation component to rotate between multiple background images on a page, with cross-fade transitions, mobile and reduced-motion handling, and optional user controls
---

## Overview

The Page Background Rotation component lets you display a rotating set of background images inside the `page-backgroundImage` block (or a `body-banner` block) on your page. Images rotate on a cross-fade transition, and each image can carry its own theme (`light` or `dark`) and media attribution, which update in sync with the image being displayed.

{% callout title="You should know!" %}
This feature is **not enabled by default**. You must enable it by importing and initializing it in your client theme's `onLoad` block.
{% /callout %}

Key behaviors in a default configuration:

- Images rotate every 5 seconds by default, after a 10-second initial delay to give the first image time to load.
- The default slide order is "random bag": every image is displayed once before any image is repeated, and the same image is never shown twice in a row.
- On mobile, the background image does not rotate. A random image from the list is displayed as a static background instead.
- If the user has set a preference for reduced motion in their system settings, the background will not auto-rotate — unless you enable the optional controls, in which case rotation starts paused and the user can advance the images manually.
- The first image is preloaded with high priority so the background paints as early as possible; the remaining images are fetched lazily once the page has settled, so they never compete with the form's own assets during load.

---

## Setting Up the Markup

Inside the `page-backgroundImage` block, add a container with the class `page-background-rotation`, and give each background image item the class `page-background-image-item`:

```html
<div class="page-background-rotation">
  <img
    class="page-background-image-item"
    src="https://example.org/image-1.jpg"
    alt="A mountain landscape at sunrise"
    data-theme="dark"
  />
  <img
    class="page-background-image-item"
    src="https://example.org/image-2.jpg"
    alt="A bright beach scene"
    data-theme="light"
  />
  <img
    class="page-background-image-item"
    src="https://example.org/image-3.jpg"
    alt="A forest trail in autumn"
  />
</div>
```

Each item is typically an `<img>` tag. The image URL is read from the `data-src` attribute first, falling back to `src`. The component also works inside a `body-banner` block, using the same markup structure.

If an item has been wrapped in a `<figure class="media-with-attribution">` by the [Media Attribution component](/docs/v2/media-attribution), the whole figure becomes the fade layer, so the item's `figattribution`/`figcaption` cross-fades in sync with its image.

{% callout title="You should know!" %}
If only one image item is present, it is displayed as a static background and no rotation occurs. If no `page-background-rotation` container or no image items are found, the component does nothing.
{% /callout %}

---

## Enabling the Component

Import and initialize the component in your client theme's `onLoad` block:

```typescript
import { PageBackgroundRotation } from "@4site/engrid-scripts";

// Inside the theme's onLoad block:
new PageBackgroundRotation();
```

You can pass options directly to the constructor:

```typescript
new PageBackgroundRotation({
  interval: 8000,
  controls: true,
});
```

Or set them via a window-level variable, which is useful for page-level overrides in a code block:

```javascript
window.EngridPageBackgroundRotationOptions = {
  interval: 8000,
  controls: true,
};
```

Options are resolved in this order, with later sources winning:

1. Default options
2. Options passed to the constructor
3. `window.EngridPageBackgroundRotationOptions`

---

## Configuration Options

| Property                  | Description                                                                                              | Default                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `enabled`                 | Whether the background rotation is enabled                                                               | `true`                             |
| `interval`                | The interval in milliseconds between image rotations                                                     | `5000`                             |
| `initialDelay`            | The delay in milliseconds before the first rotation, giving the first image time to load                 | `10000`                            |
| `transitionDuration`      | The duration of the cross-fade transition in milliseconds                                                | `500`                              |
| `transitionClass`         | The CSS class applied to the background image container during the transition                            | `background-rotation-transition`   |
| `eachImageSelector`       | The CSS selector for each individual background image                                                    | `.page-background-image-item`      |
| `backgroundImageSelector` | The CSS selector for the background image container                                                      | `.page-background-rotation`        |
| `slideOrder`              | The order in which images are displayed: `'random'`, `'sequential'`, or `'true-random'`                  | `'random'`                         |
| `randomStart`             | Whether to start the rotation at a random image                                                          | `true`                             |
| `reducedMotion`           | Whether to respect the user's preference for reduced motion                                              | `true`                             |
| `rotateOnMobile`          | Whether to rotate the background image on mobile devices (CURRENTLY NOT SUPPORTED)                       | `false`                            |
| `mobileBreakpoint`        | The media query at which the layout is considered "mobile"                                               | `'(max-width: 499px)'`             |
| `controls`                | Whether to add back, pause, and forward buttons for the rotation                                         | `false`                            |

### Rotate On Mobile

This option is not fully supported, but it's feature flag has been added to allow for future implementation.

### Slide Order

The `slideOrder` option controls how the next image is chosen:

| Value          | Description                                                                                                              |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `'random'`     | "Random bag" selection. Every image is displayed once before any image is repeated, and the current image is never repeated back-to-back |
| `'sequential'` | Images are shown in markup order, looping back to the first image after the last                                        |
| `'true-random'`| The next image is picked completely at random, only excluding the current image                                         |

---

## Mobile and Reduced Motion Behavior

By default, the background image does not rotate on viewports matching the `mobileBreakpoint` media query (`(max-width: 499px)` by default). Instead, a single image — random if `randomStart` is `true`, otherwise the first — is displayed as a static background. If the viewport crosses the breakpoint in either direction, the component switches between static and rotating modes automatically.

When `reducedMotion` is `true` (the default) and the user's system preference is `prefers-reduced-motion: reduce`:

- **Without controls**: the component stays in static mode and never auto-rotates.
- **With controls enabled**: the rotation starts paused, and the user can start it or advance the images manually using the controls.

If the user changes their reduced-motion preference while on the page, the component reacts automatically — but once the user has touched the pause control themselves, the pause belongs to them and is never auto-resumed.

---

## Theming Based on the Background Image

Each image item can include a `data-theme` attribute of `light` or `dark` (default `dark`). When an image becomes active, ENgrid sets a body data attribute reflecting its theme, which your client theme can use to style elements shown over the background (for example, the `.body-title h1` text color):

```css
body[data-engrid-background-rotation-theme="light"] .body-title h1 {
  color: #000;
}

body[data-engrid-background-rotation-theme="dark"] .body-title h1 {
  color: #fff;
}
```

The theme attribute is updated shortly after each image change (approximately 300ms), so text color transitions land near the middle of the cross-fade.

Additionally, the body gets a `data-engrid-background-rotation` attribute set to `active` while rotating, or `static` when showing a static image (mobile, reduced motion, or a single image).

---

## CSS Hooks and Custom Properties

The component applies the following classes and properties, which your theme styles should account for:

### Classes

| Class                          | Applied To                    | Description                                                                  |
| ------------------------------ | ----------------------------- | ---------------------------------------------------------------------------- |
| `background-rotation-layer`    | Each image item (or its wrapping `figure.media-with-attribution`) | Marks the element as a fade layer                            |
| `active`                       | The currently visible layer   | Makes the layer visible                                                      |
| `background-rotation-outgoing` | The layer fading out          | Applied during a cross-fade transition                                       |
| `background-rotation-flow`     | One layer at a time           | Marks the single in-flow layer that gives the container its height at the mobile breakpoint |
| `background-rotation-transition` (configurable via `transitionClass`) | The container | Applied for the duration of a cross-fade       |
| `background-rotation-controls` | The controls wrapper          | Added when `controls` is enabled                                             |
| `background-rotation-prev`     | Previous button               | Steps back through the image history                                         |
| `background-rotation-pause`    | Pause/play button             | Toggles auto-rotation; uses `aria-pressed`                                   |
| `background-rotation-next`     | Next button                   | Advances to the next image                                                   |

### Custom Properties

| Property                                     | Set On                | Description                                                  |
| -------------------------------------------- | --------------------- | ------------------------------------------------------------ |
| `--background-rotation-transition-duration`  | The container and `body` | The transition duration, from the `transitionDuration` option |
| `--background-rotation-image`                | `body`                | The URL of the currently active background image             |

{% callout title="You should know!" %}
The fade layer is the image item itself, unless Media Attribution has wrapped the `<img>` in a `<figure class="media-with-attribution">` — in which case the figure is the layer. If you author attributions directly, wrap each image and its `figattribution`/`figcaption` in a `figure.media-with-attribution` so they cross-fade together.
{% /callout %}

---

## Controls

When `controls: true`, a previous / pause / next button group is appended to the end of the `<body>`, inside a `div.background-rotation-controls` with `role="group"` and an accessible label.

Behavior details:

- The pause button toggles auto-rotation and reflects its state with `aria-pressed` and a pause/play icon.
- The previous button steps back through the history of images already shown and is disabled when there is no history.
- Auto-rotation pauses while the user hovers over or tabs into the controls, and resumes when the interaction ends — so nobody has to chase a moving target.
- Manually advancing or going back resets the rotation timer.
- Manual image changes are announced to screen readers via a polite `aria-live` region (using the image's `alt` text or its attribution). Automatic rotations are intentionally not announced, to avoid interrupting the user every few seconds.

---

## Image Loading and Performance

The component is careful not to let a set of viewport-sized background images compete with your form's own assets during page load:

1. The first image shown is preloaded with a high-priority `<link rel="preload" as="image">` before its layer is applied.
2. The remaining layers do not get their inline `background-image` (which is what triggers the fetch) up front. Instead, they are "warmed" once the first image has finished loading **and** a minimum 4-second delay has passed, using `requestIdleCallback` where available.
3. The warming still completes ahead of the first rotation (the default 10-second `initialDelay`), so cross-fades never start against an image that hasn't been fetched yet.

---

## Complete Example

```html
<!-- In the page-backgroundImage block -->
<div class="page-background-rotation">
  <figure class="media-with-attribution">
    <img
      class="page-background-image-item"
      src="https://example.org/image-1.jpg"
      alt="A mountain landscape at sunrise"
      data-theme="dark"
    />
    <figattribution>Photo: Jane Doe</figattribution>
  </figure>
  <figure class="media-with-attribution">
    <img
      class="page-background-image-item"
      src="https://example.org/image-2.jpg"
      alt="A bright beach scene"
      data-theme="light"
    />
    <figattribution>Photo: John Smith</figattribution>
  </figure>
</div>
```

```typescript
// In the client theme's onLoad block
import { PageBackgroundRotation } from "@4site/engrid-scripts";

new PageBackgroundRotation({
  interval: 7000,
  controls: true,
  rotateOnMobile: false,
});
```

## See also

1. [Media Attribution component](/docs/v2/media-attribution) - for cross-fading image attributions with the background image
2. [Background Image Positioning](/docs/v2/background-image-positioning) - for controlling how the background image is sized and positioned