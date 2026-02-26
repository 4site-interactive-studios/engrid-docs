---
title: Mobile CTA Button
description: Learn how to add a floating call-to-action button that appears on mobile devices and scrolls users to the donation form
---

## Overview

The `MobileCTA` component adds a floating call-to-action (CTA) button to your page that appears when users scroll past the form on mobile devices. The button helps users quickly return to the form without scrolling manually, improving mobile conversion rates.

{% callout title="You should know!" %}
The mobile CTA only appears on page 1 of multi-page forms and automatically hides when the form is visible in the viewport.
{% /callout %}

## How It Works

The component:
1. Checks if mobile CTA is enabled via `ENGrid.getOption("MobileCTA")`
2. Only runs on page 1 of the form (`ENGrid.getPageNumber() === 1`)
3. Renders a floating button with configurable text per page type
4. Shows/hides the button based on scroll position
5. Smoothly scrolls to the form when clicked

## Configuration

Configure the mobile CTA through the `EngridOptions` object:

```javascript
EngridOptions = {
  MobileCTA: [
    {
      pageType: "donation",
      label: "Donate Now"
    },
    {
      pageType: "event",
      label: "Register Today"
    },
    {
      pageType: "advocacy",
      label: "Take Action"
    }
  ]
};
```

### Configuration Properties

| Property | Type | Description |
| --- | --- | --- |
| `pageType` | `string` | The EN page type ("donation", "event", "advocacy", etc.) |
| `label` | `string` | The text displayed on the button for this page type |

## Dynamic Button Label

You can override the button label at runtime by setting `window.mobileCTAButtonLabel`:

```javascript
// Set before the page loads
window.mobileCTAButtonLabel = "Support Our Mission";
```

This takes precedence over the label defined in `EngridOptions`.

## Button Visibility Logic

The button visibility is controlled by scroll position:

```javascript
// Button is HIDDEN when:
bodyMain.getBoundingClientRect().top <= window.innerHeight - 100

// Button is VISIBLE when:
bodyMain.getBoundingClientRect().top > window.innerHeight - 100
```

In other words:
- **Hidden**: When the form is visible in the viewport (within 100px of bottom)
- **Visible**: When the form is scrolled out of view

## HTML Structure

The component creates the following HTML structure:

```html
<div class="engrid-mobile-cta-container hide-cta">
  <button class="primary">
    Donate Now
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  </button>
</div>
```

### CSS Classes

| Class | Purpose |
| --- | --- |
| `engrid-mobile-cta-container` | Container for the floating button |
| `hide-cta` | Hides the button (toggles on/off) |
| `primary` | Applies primary button styling |

## Styling

The component relies on ENgrid's SCSS for styling. The button:
- Floats at the bottom of the screen
- Includes a downward arrow icon
- Uses the `.primary` button class for consistent styling
- Transitions smoothly when showing/hiding

Example CSS for customization:

```css
.engrid-mobile-cta-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  transition: opacity 0.3s ease;
}

.engrid-mobile-cta-container.hide-cta {
  opacity: 0;
  pointer-events: none;
}

.engrid-mobile-cta-container button {
  display: flex;
  align-items: center;
  gap: 8px;
}

.engrid-mobile-cta-container svg {
  width: 20px;
  height: 20px;
}
```

## Complete Example

Here's a complete configuration for multiple page types:

```javascript
EngridOptions = {
  MobileCTA: [
    {
      pageType: "donation",
      label: "Complete Your Donation"
    },
    {
      pageType: "event",
      label: "Register for Event"
    },
    {
      pageType: "advocacy",
      label: "Send Your Message"
    },
    {
      pageType: "subscriptionmanagement",
      label: "Update Preferences"
    }
  ]
};
```

## Behavior Details

### Scroll Behavior

When the button is clicked:
```javascript
formBlock.scrollIntoView({ behavior: "smooth" });
```

This provides a smooth scroll animation to the form block element.

### Form Block Detection

The component looks for the form in this order:
1. First widget block in `.body-main`: `.body-main .en__component--widgetblock:first-child`
2. Form block: `.en__component--formblock`

### Event Listeners

The component monitors three events to update button visibility:
- `load`: Initial check when page loads
- `resize`: Updates when window size changes
- `scroll`: Updates as user scrolls the page

## Requirements

For the mobile CTA to work properly:

1. **Page Structure**: Must have `.body-main` element and a form block
2. **Page Type**: Must be defined in your configuration
3. **Page Number**: Must be page 1 of the form
4. **ENgrid Container**: Must have `#engrid` element

## Common Use Cases

### 1. Single Page Type

```javascript
window.EngridOptions = {
  MobileCTA: [
    {
      pageType: "donation",
      label: "Give Now"
    }
  ]
};
```

### 2. Dynamic Label Per Campaign

```javascript
// Set dynamically based on campaign
if (campaignType === "emergency") {
  window.mobileCTAButtonLabel = "Help Now - Emergency Appeal";
} else {
  window.mobileCTAButtonLabel = "Donate Today";
}
```

### 3. Multi-Language Support

```javascript
const language = window.pageJson.locale || "en";
const labels = {
  en: "Donate Now",
  es: "Donar Ahora",
  fr: "Faire un Don"
};

window.mobileCTAButtonLabel = labels[language] || labels.en;
```

## Best Practices

1. **Keep Labels Short**: Button appears on mobile, so use concise text (2-4 words)
2. **Action-Oriented**: Use action verbs ("Donate", "Register", "Support")
3. **Test Scroll Behavior**: Verify button appears/disappears at appropriate scroll positions
4. **Consider Context**: Match label to the form's purpose
5. **Mobile-First**: Design assumes mobile viewport, test on real devices

## Disabling the Mobile CTA

To disable the mobile CTA, set the option to `false`:

```javascript
window.EngridOptions = {
  MobileCTA: false
};
```

Or omit it entirely from your configuration.

## Troubleshooting

**Button doesn't appear:**
- Check if you're on page 1: `ENGrid.getPageNumber() === 1`
- Verify `MobileCTA` is configured in `EngridOptions`
- Ensure page type matches your configuration
- Check browser console for errors

**Button always visible/hidden:**
- Verify `.body-main` element exists
- Check scroll position calculation
- Inspect CSS for conflicting styles
- Ensure `.hide-cta` class is working properly

**Button doesn't scroll:**
- Confirm form block element exists
- Check if `scrollIntoView` is supported in browser
- Verify no JavaScript errors prevent click handler
