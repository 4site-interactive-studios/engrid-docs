---
title: Media Attribution
description: Learn how to add attribution overlays to images and videos
---

## Media Attribution

The `MediaAttribution` component automatically adds attribution overlays to images and videos, displaying photographer credits, sources, and copyright information.

### Overview

Transform images with data attributes into properly attributed media with visible overlays:

```html
<!-- Before -->
<img src="photo.jpg" data-attribution-source="© Jane Doe">

<!-- After -->
<figure class="media-with-attribution">
  <img src="photo.jpg" data-attribution-source="© Jane Doe">
  <figattribution>© Jane Doe</figattribution>
</figure>
```

{% callout title="You should know!" %}
Attribution overlays appear on the image itself, typically in the bottom-right corner. Styling is controlled by `_engrid-media-attribution.scss`.
{% /callout %}

### Basic Usage

Add the `data-attribution-source` attribute to any image:

```html
<img src="https://example.com/photo.jpg" 
     data-attribution-source="© Jane Doe">
```

**Result:**
- Image wrapped in `<figure>` element
- Attribution appears as overlay
- Properly structured semantic HTML

### Attribution with Link

Make the attribution clickable:

```html
<img src="photo.jpg" 
     data-attribution-source="© John Doe" 
     data-attribution-source-link="https://johndoe.com/">
```

**Result:**
```html
<figattribution>
  <a href="https://johndoe.com/" target="_blank" tabindex="-1">
    © John Doe
  </a>
</figattribution>
```

The link opens in a new tab with `tabindex="-1"` to keep it out of keyboard tab order.

### Attribution with Tooltip

Add additional information via tooltip:

```html
<img src="photo.jpg" 
     data-attribution-source="© Wildlife Photographer" 
     data-attribution-source-link="https://example.com/"
     data-attribution-source-tooltip="Taken at Yellowstone National Park, 2024">
```

**Behavior:**
- Hovering over attribution shows tooltip
- Clicking attribution shows tooltip
- Powered by Tippy.js library
- Tooltip appears on the left side

### Hide Attribution Overlay

Keep attribution in HTML but hide the visual overlay:

```html
<img src="photo.jpg" 
     data-attribution-source="© Jane Doe" 
     data-attribution-hide-overlay>
```

**Use cases:**
- Attribution required in HTML for legal reasons
- Visual overlay conflicts with design
- Screen reader access to attribution still works

### Video Attribution

Works with video elements too:

```html
<video poster="placeholder.jpg" 
       data-attribution-source="© Video Producer" 
       data-attribution-source-link="https://example.com/">
  <source data-src="video.mp4" type="video/mp4">
</video>
```

{% callout title="Information" %}
Video attribution is processed but may not visually display depending on your theme's CSS. Check `_engrid-media-attribution.scss` for video-specific styles.
{% /callout %}

### Lazy Loading Integration

Works with lazy-loaded images:

```html
<img src="data:image/png;base64,..." 
     data-src="https://example.com/full-image.jpg" 
     data-attribution-source="© Photographer Name">
```

The component processes attribution regardless of image loading state.

### Generated HTML Structure

Complete structure created by the component:

```html
<figure class="media-with-attribution">
  <img src="photo.jpg" 
       data-attribution-source="© Jane Doe"
       data-attribution-source-link="https://example.com/">
  <figattribution>
    <a href="https://example.com/" target="_blank" tabindex="-1">
      © Jane Doe
    </a>
  </figattribution>
</figure>
```

### CSS Classes

| Class | Applied To | Purpose |
| --- | --- | --- |
| `media-with-attribution` | `<figure>` | Container for image and attribution |
| `attribution-bottomright` | `<figattribution>` | Default positioning (optional) |

### Styling Examples

Default positioning (bottom-right corner):

```css
.media-with-attribution {
  position: relative;
  display: inline-block;
}

figattribution {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 2px;
}

figattribution a {
  color: white;
  text-decoration: none;
}

figattribution a:hover {
  text-decoration: underline;
}
```

### Multiple Images Example

Attribute multiple images on a page:

```html
<div class="photo-gallery">
  <img src="photo1.jpg" 
       data-attribution-source="© Alice Smith" 
       data-attribution-source-link="https://alicesmith.com/">
       
  <img src="photo2.jpg" 
       data-attribution-source="© Bob Johnson" 
       data-attribution-source-tooltip="Featured in National Geographic">
       
  <img src="photo3.jpg" 
       data-attribution-source="© Carol Lee" 
       data-attribution-source-link="https://carollee.photo/">
       
  <img src="photo4.jpg" 
       data-attribution-source="Public Domain" 
       data-attribution-hide-overlay>
</div>
```

### Debug Mode

Enable debug mode to see attribution processing:

```javascript
window.EngridOptions = {
  debug: true
};
```

Console logs show which images are being processed:
```
The following image was found with data attribution fields on it. 
It's markup will be changed to add caption support.
<img src="photo.jpg" ...>
```

### Best Practices

1. **Always Attribute**: Give proper credit to photographers/creators
2. **Link to Source**: Provide links when possible
3. **Copyright Symbols**: Use © or appropriate symbols
4. **Readable Text**: Ensure attribution text is legible over image
5. **Mobile Testing**: Verify attribution displays well on small screens
6. **Accessibility**: Attribution is accessible to screen readers
7. **Legal Compliance**: Follow image licensing requirements
