---
title: Mobile CTA Button
description: Learn how to add a floating call-to-action button that appears on mobile devices to help users navigate to the form.
---

The `MobileCTA` component adds a floating call-to-action button that appears on mobile devices. The button scrolls users smoothly to the form when clicked, and automatically shows/hides based on scroll position.

## How It Works

The component creates a floating button that:
- Appears when the form is not visible in the viewport
- Hides when the form is visible
- Smoothly scrolls to the form when clicked
- Only appears on the first page of multi-step forms
- Can be configured per page type

## Configuration

Configure the Mobile CTA in your ENgrid options:

```javascript
window.EngridOptions = {
  MobileCTA: [
    {
      pageType: "DONATION",
      label: "Donate Now",
    },
    {
      pageType: "ADVOCACYPETITION",
      label: "Sign Now",
    },
    {
      pageType: "EMAILSUBSCRIBEFORM",
      label: "Subscribe Now",
    },
  ],
};
```

## Page-Level Button Label

You can override the button label for a specific page using `window.mobileCTAButtonLabel`:

```html
<script>
window.mobileCTAButtonLabel = "Complete Your Donation";
</script>
```

This overrides the label from the configuration for that page.

## Configuration Options

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `pageType` | string | Yes | The Engaging Networks page type (e.g., `"DONATION"`, `"ADVOCACYPETITION"`) |
| `label` | string | Yes | The text displayed on the button |

## Behavior

### Visibility

The button:
- Appears when the form block is not visible in the viewport (more than 100px from the top)
- Hides when the form block is visible in the viewport
- Only appears on page 1 of multi-step forms
- Updates visibility on scroll, resize, and page load

### Click Action

When clicked, the button:
- Smoothly scrolls to the form block
- Uses `scrollIntoView({ behavior: "smooth" })`
- Targets the first form block or widget block in `.body-main`

## Styling

The button is created with these classes:
- `.engrid-mobile-cta-container` - Container for the button
- `.primary` - Applied to the button element
- `.hide-cta` - Added/removed to control visibility

### Example CSS

```css
.engrid-mobile-cta-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.engrid-mobile-cta-container.hide-cta {
  display: none;
}

.engrid-mobile-cta-container .primary {
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.engrid-mobile-cta-container .primary svg {
  width: 16px;
  height: 16px;
  margin-left: 8px;
  vertical-align: middle;
}
```

## Examples

### Donation Page

```javascript
window.EngridOptions = {
  MobileCTA: [
    {
      pageType: "DONATION",
      label: "Donate Now",
    },
  ],
};
```

### Multiple Page Types

```javascript
window.EngridOptions = {
  MobileCTA: [
    {
      pageType: "DONATION",
      label: "Donate Now",
    },
    {
      pageType: "ADVOCACYPETITION",
      label: "Sign Petition",
    },
    {
      pageType: "EMAILSUBSCRIBEFORM",
      label: "Subscribe",
    },
    {
      pageType: "DATACAPTURE",
      label: "Continue",
    },
  ],
};
```

### Page-Specific Label

```html
<!-- On a specific donation page -->
<script>
window.mobileCTAButtonLabel = "Complete Your Gift";
</script>
```

## Technical Details

- The component only runs on page 1 (`pageNumber === 1`)
- It targets the first `.en__component--widgetblock` or `.en__component--formblock` in `.body-main`
- Button visibility is calculated based on the form block's position relative to the viewport
- A down arrow SVG icon is automatically included in the button
- The component responds to scroll, resize, and load events

## Best Practices

- Use clear, action-oriented labels ("Donate Now", "Sign Up", "Continue")
- Keep labels short (2-4 words)
- Test on actual mobile devices to ensure proper visibility
- Customize the styling to match your brand
- Consider accessibility - ensure button is large enough and has good contrast

## Troubleshooting

### Button Not Appearing

- Verify `MobileCTA` is configured in `EngridOptions`
- Check that the page type matches exactly (case-sensitive)
- Ensure you're on page 1 of the form
- Verify the form block exists on the page

### Button Not Hiding

- Check CSS for `.hide-cta` class
- Verify the form block is properly positioned
- Test scroll behavior in browser console

### Wrong Label

- Check `window.mobileCTAButtonLabel` override
- Verify the configuration matches the page type
- Ensure the label property is set correctly

