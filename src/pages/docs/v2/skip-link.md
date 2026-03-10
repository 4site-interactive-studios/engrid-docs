---
title: Skip to Main Content Link
description: Learn how ENgrid automatically adds an accessible skip link for keyboard users to bypass navigation
---

## Overview

The `SkipToMainContentLink` or 'SkipLink' component automatically adds an accessible "Skip to main content" link at the beginning of your page. This link allows keyboard users and screen reader users to bypass navigation and jump directly to the main content.

{% callout title="You should know!" %}
The skip link is a critical accessibility feature for keyboard navigation and is automatically added by ENgrid. It's typically invisible until focused with the Tab key.
{% /callout %}

## How It Works

The component:
1. Searches for the main heading or title in your page
2. Adds an `id="skip-link"` to the target element's parent
3. Inserts a skip link at the very beginning of the `<body>`
4. Link becomes visible when focused with keyboard

## Target Element Priority

The component searches for elements in this order and uses the first one found:

1. **First `<title>` in a body section**: `div[class*='body-'] title`
2. **First `<h1>` in a body section**: `div[class*='body-'] h1`
3. **First `<title>` anywhere**: `title`
4. **First `<h1>` anywhere**: `h1`

{% callout title="Information" %}
Body sections typically include `body-header`, `body-banner`, `body-main`, `body-sidebar`, `body-footer`, etc.
{% /callout %}

## Generated HTML

The component adds this HTML at the beginning of the `<body>`:

```html
<a class="skip-link" href="#skip-link">Skip to main content</a>
```

And adds an ID to the target element's parent:

```html
<div id="skip-link">
  <h1>Page Title</h1>
  <!-- Main content -->
</div>
```

## Default Styling

The skip link is typically styled to be invisible until focused:

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 100;
  transition: top 0.3s ease;
}

.skip-link:focus {
  top: 0;
}
```

This ensures:
- Link is hidden by default
- Appears when tabbed to with keyboard
- Positioned at the top of the page
- High contrast for visibility

## Behavior

### Keyboard Navigation
1. User presses Tab key on page load
2. Skip link appears at the top of the page
3. User presses Enter to activate
4. Focus moves to the main content area
5. User can continue tabbing through main content

### Visual Users
- The link is invisible during normal browsing
- Only appears when focused with keyboard
- Doesn't interfere with page layout

### Screen Readers
- Announced as the first interactive element
- Provides context about the page structure
- Allows bypassing repetitive navigation

## Automatic Setup

The component requires no configuration and runs automatically when ENgrid initializes. It's instantiated in the main app:

```typescript
new SkipToMainContentLink();
```

## When Skip Link Is Not Added

The component will not add a skip link if:
- No `<title>` or `<h1>` elements exist on the page
- All target elements are missing

In debug mode, a console message appears:

```
This page contains no <title> or <h1> and a 'Skip to main content' link was not added
```

## Customization

### Change Link Text

To customize the link text, modify the component or add this CSS:

```css
.skip-link::before {
  content: "Jump to content";
}

.skip-link {
  font-size: 0; /* Hide original text */
}
```

### Custom Styling

Override the `.skip-link` class for custom appearance:

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: top 0.3s ease;
  z-index: 9999;
}

.skip-link:focus {
  top: 20px;
  outline: 3px solid #ffd700;
  outline-offset: 2px;
}
```

### Skip to Different Element

If you want to skip to a specific element, add the ID manually:

```html
<div id="skip-link">
  <div class="donation-form">
    <!-- Form content -->
  </div>
</div>
```

The component will find and link to this element.

## Accessibility Standards

The skip link meets WCAG 2.1 success criteria:

- **2.4.1 Bypass Blocks (Level A)**: Provides a mechanism to bypass repeated content
- **2.1.1 Keyboard (Level A)**: Fully keyboard accessible
- **2.4.3 Focus Order (Level A)**: Appears first in tab order
- **2.4.7 Focus Visible (Level AA)**: Visible when focused

## Testing the Skip Link

### Manual Testing
1. Load your page in a browser
2. Press the Tab key once
3. Skip link should appear at the top
4. Press Enter
5. Focus should move to main content
6. Pressing Tab again should focus the next interactive element after the heading

### Screen Reader Testing
1. Use NVDA (Windows) or VoiceOver (Mac)
2. Navigate to the page
3. First element announced should be "Skip to main content, link"
4. Activate the link
5. Screen reader should announce the main heading

### Automated Testing
```javascript
// Check if skip link exists
const skipLink = document.querySelector('.skip-link');
console.assert(skipLink !== null, 'Skip link should exist');

// Check if target exists
const target = document.getElementById('skip-link');
console.assert(target !== null, 'Skip target should exist');

// Check if link points to target
console.assert(
  skipLink.getAttribute('href') === '#skip-link',
  'Skip link should point to #skip-link'
);
```

## Best Practices

1. **Don't Remove It**: The skip link is essential for accessibility
2. **Test With Keyboard**: Always test keyboard navigation on your pages
3. **High Contrast**: Ensure good contrast ratio when focused (4.5:1 minimum)
4. **Clear Text**: Use clear, descriptive text like "Skip to main content"
5. **Proper Heading Structure**: Ensure your page has proper heading hierarchy
6. **Don't Hide Permanently**: Never use `display: none` on the skip link

## Common Issues

### Skip Link Not Appearing
**Problem**: User presses Tab but nothing appears

**Solutions:**
- Check CSS - ensure skip link isn't hidden with `display: none`
- Verify `.skip-link` class has proper positioning
- Check z-index conflicts
- Ensure `:focus` styles are present

### Link Doesn't Jump to Content
**Problem**: Clicking skip link doesn't move focus

**Solutions:**
- Verify `id="skip-link"` exists on target element
- Check if target element is focusable (add `tabindex="-1"` if needed)
- Ensure no JavaScript is preventing default behavior

### Multiple Skip Links
**Problem**: More than one skip link appears

**Solutions:**
- Check for duplicate component initialization
- Verify ENgrid only initializes once
- Look for custom skip links in your template

## Page Structure Example

Here's an ideal page structure for the skip link component:

```html
<body>
  <a class="skip-link" href="#skip-link">Skip to main content</a>
  
  <div class="body-header">
    <nav><!-- Navigation --></nav>
  </div>
  
  <div class="body-banner">
    <div><!-- Banner content --></div>
  </div>
  
  <div class="body-main" id="skip-link">
    <h1>Main Page Heading</h1>
    <!-- Main content -->
  </div>
  
  <div class="body-footer">
    <footer><!-- Footer content --></footer>
  </div>
</body>
```

## Related Resources

- WCAG 2.1 Guideline 2.4.1: [Bypass Blocks](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html)
- WebAIM Article: [Skip Navigation Links](https://webaim.org/techniques/skipnav/)
- A11y Project: [Skip Navigation](https://www.a11yproject.com/posts/skip-nav-links/)

## Dependencies

The component depends on:
- `ENGrid.debug` for conditional console logging
- Standard DOM APIs (querySelector, insertAdjacentHTML)
- CSS from `_engrid-skip-link.scss`

No external libraries or polyfills are required.
