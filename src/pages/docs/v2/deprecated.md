---
title: Deprecated Features
description: Learn about the Deprecated class in ENgrid, which handles deprecated features gracefully by detecting and migrating old class names and patterns to their modern equivalents.
---

## Deprecated Features

The `Deprecated` class provides graceful handling of deprecated ENgrid features, automatically detecting and migrating old class names and patterns to their modern equivalents.

### How It Works

The Deprecated class runs during ENgrid initialization and:
1. Scans the DOM for deprecated elements and classes
2. Logs warnings in debug mode
3. Automatically replaces deprecated patterns with current ones

### Currently Handled Deprecations

| Deprecated Class/Element | Replacement | Action |
| ------------------------ | ----------- | ------ |
| `.body-side` | None | Warning only (no replacement) |
| `.backgroundImage` | `.background-image` | Automatic replacement |
| `.backgroundImageOverlay` | `.background-image-overlay` | Automatic replacement |

### Example Migrations

#### Background Image

**Old (Deprecated):**
```html
<div class="backgroundImage">
  <img src="hero.jpg" alt="Hero">
</div>
```

**Automatically Converted To:**
```html
<div class="background-image">
  <img src="hero.jpg" alt="Hero">
</div>
```

#### Background Image Overlay

**Old (Deprecated):**
```html
<div class="backgroundImageOverlay">
  Content here
</div>
```

**Automatically Converted To:**
```html
<div class="background-image-overlay">
  Content here
</div>
```

### Debug Output

When debug mode is enabled (`?debug=true`), the Deprecated class logs all detected and handled deprecations:

```
Deprecated: '.backgroundImage' was detected and replaced with '.background-image'.
Deprecated: '.backgroundImageOverlay' was detected and replaced with '.background-image-overlay'.
Deprecated: '.body-side' was detected and nothing was done.
```

### Implementation

The class uses a simple pattern:

```typescript
export class Deprecated {
  constructor() {
    // Check for deprecated element
    const deprecated = document.querySelector(".oldClass");
    if (deprecated) {
      const replacement = "new-class";
      this.replace(deprecated, replacement);
    }
  }
  
  private warning(deprecated: any) {
    // Log warning without action
  }
  
  private replace(deprecated: any, replacement: any) {
    // Add new class, remove old class, log action
  }
}
```

### Why This Matters

The Deprecated class ensures:
- **Backward compatibility**: Old pages continue working
- **Smooth migrations**: No breaking changes during updates
- **Clear communication**: Developers know what needs updating
- **Automatic fixes**: No manual intervention required

{% callout title="You should know!" %}
While deprecated features are automatically migrated, it's best practice to update your page templates to use current class names. The Deprecated class is a safety net, not a permanent solution.
{% /callout %}

### For Theme Developers

When deprecating a feature:

1. Add detection logic to `Deprecated` class
2. Implement automatic replacement if possible
3. Add debug logging
4. Document the deprecation
5. Update documentation with new pattern

**Example of adding a new deprecation:**

```typescript
// In deprecated.ts constructor
deprecated = document.querySelector(".oldFeatureClass");
if (deprecated) {
  replacement = "new-feature-class";
  this.replace(deprecated, replacement);
}
```
