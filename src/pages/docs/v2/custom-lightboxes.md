---
title: Custom Lightboxes
description: This page shows how to use ENgrid's abstract Modal component to create your own lightbox component
---

This page shows how to use ENgrid's abstract `Modal` component to create your own accessible, customizable lightbox/modal components in ENgrid.

{% callout title="You should know!" %}
This is an abstract class that cannot be instantiated directly. You must extend it to create your own modal components. See the Examples section for implementation details.
{% /callout %}

## Key Features

- **Accessibility Built-in**: ARIA attributes, focus trapping, keyboard navigation
- **Flexible Content**: Accepts HTML strings, DOM elements, or NodeLists
- **Customizable Behavior**: Configure click-outside behavior, close buttons, and styling
- **Body Data Integration**: Automatically sets `data-has-lightbox` on body when opened
- **Multiple Close Methods**: X button, overlay click, close button, or programmatic

## Creating your own lightbox component

To create a custom modal component, create a file in your client theme within `src/scripts` folder, extend the `Modal` class and implement the `getModalContent()` method:

```typescript
import { Modal } from "@4site/engrid-scripts";

export class MyCustomModal extends Modal {
  constructor() {
    super({
      onClickOutside: "close",
      addCloseButton: true,
      closeButtonLabel: "Got it!",
      customClass: "my-custom-modal",
      showCloseX: true
    });
  }

  public getModalContent(): string {
    return `
      <h2>Custom Modal Title</h2>
      <p>Your custom content goes here.</p>
    `;
  }
  
  public show() {
    this.open();
  }
}
```

The getModalContent method can return a String, an HTML Element or a NodeList of HTML Elements. This is the content that will be displayed in the lightbox.

The Modal component does not provide any content styling. Styling will be inherited from the client ENgrid theme, but you can also add your own custom styling.

The Modal component is a TypeScript Class and can be found at: `/packages/common/src/modal.ts`

The Modal styling can be found at `/packages/styles/src/_engrid-modal.scss`

{% callout title="Tip" %}
If you want to make your lightbox content configurable from the Page Builder, you can set it to a variable that's defined from a code block, or have it pull in the content from an element on the page with a custom class.
{% /callout %}

## Configuration Options

The `Modal` constructor accepts an options object with the following properties:

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `onClickOutside` | `"close"` \| `"bounce"` | What happens when user clicks outside modal | `"close"` |
| `addCloseButton` | `boolean` | Add a button at bottom of modal to close it | `false` |
| `closeButtonLabel` | `string` | Text for the close button (if enabled) | `"Okay!"` |
| `customClass` | `string` | Space-separated custom CSS classes to add | `""` |
| `showCloseX` | `boolean` | Show the X button in top-right corner | `true` |

### Option Details

**onClickOutside**
- `"close"`: Modal closes when clicking the overlay
- `"bounce"`: Modal animates a "bounce" effect but stays open

**addCloseButton**
- When `true`, adds a styled button at the bottom of the modal
- Button uses the text from `closeButtonLabel`

**customClass**
- Add your own CSS classes for styling
- Multiple classes can be space-separated: `"my-modal theme-dark"`

**showCloseX**
- Controls the X button in the top-right corner
- Adds `engrid-modal--close-x` class when enabled

## Public Methods

### `open()`

Opens the modal and handles accessibility:
- Removes `modal--hidden` class
- Sets `data-has-lightbox="true"` on body
- Focuses the modal container
- Enables keyboard focus trapping

```typescript
const modal = new MyCustomModal();
modal.open();
```

### `close()`

Closes the modal and restores page state:
- Adds `modal--hidden` class
- Sets `data-has-lightbox="false"` on body
- Disables focus trapping

```typescript
modal.close();
```

### `getModalContent()`

Abstract method that must be implemented in your subclass. Returns the modal content as:
- HTML string
- HTMLElement
- NodeList of elements

```typescript
public getModalContent(): string | HTMLElement | NodeListOf<Element> {
  return "<div>Your content here</div>";
}
```

## Modal Structure

The modal creates the following HTML structure:

```html
<div class="engrid-modal modal--hidden" 
     aria-hidden="true" 
     role="dialog" 
     aria-modal="true" 
     tabindex="-1">
  <div class="engrid-modal__overlay" tabindex="-1">
    <div class="engrid-modal__container" tabindex="0">
      <div class="engrid-modal__close engrid-modal__close-x" 
           role="button" 
           tabindex="0" 
           aria-label="Close">
        X
      </div>
      <div class="engrid-modal__body">
        <!-- Your content goes here -->
      </div>
    </div>
  </div>
</div>
```

## Closing Mechanisms

The modal can be closed through multiple methods:

1. **X Button**: Click the X in the top-right (if `showCloseX: true`)
2. **Overlay Click**: Click outside the modal (if `onClickOutside: "close"`)
3. **Close Button**: Click the bottom button (if `addCloseButton: true`)
4. **CSS Class**: Any element with class `modal__close` inside the modal
5. **Programmatically**: Call `modal.close()` from your code

## Accessibility Features

### Focus Trapping

When the modal opens, keyboard focus is trapped inside. Pressing Tab cycles through focusable elements within the modal:
- Forward tab: cycles forward through elements
- Shift+Tab: cycles backward through elements
- When reaching the last element, Tab returns to the first

### ARIA Attributes

The modal automatically sets appropriate ARIA attributes:
- `role="dialog"`: Identifies the modal as a dialog
- `aria-modal="true"`: Indicates it's a modal dialog
- `aria-hidden`: Toggles based on modal state
- `aria-label="Close"`: Labels the close button

### Keyboard Accessibility

All interactive elements are keyboard accessible:
- Close X button is focusable with `tabindex="0"`
- Modal container receives focus on open
- Focus returns appropriately on close

## Complete Example

Here's a complete example of a custom confirmation modal:

```typescript
import { Modal } from "./modal";

export class ConfirmationModal extends Modal {
  private onConfirm: () => void;
  private onCancel: () => void;
  
  constructor(
    message: string,
    onConfirm: () => void,
    onCancel: () => void
  ) {
    super({
      onClickOutside: "bounce",
      addCloseButton: false,
      customClass: "confirmation-modal",
      showCloseX: false
    });
    
    this.onConfirm = onConfirm;
    this.onCancel = onCancel;
    
    this.setupButtons();
  }
  
  public getModalContent(): string {
    return `
      <h2>Please Confirm</h2>
      <p>${this.message}</p>
      <div class="modal-buttons">
        <button class="btn-confirm">Yes, Continue</button>
        <button class="btn-cancel modal__close">Cancel</button>
      </div>
    `;
  }
  
  private setupButtons() {
    // Wait for modal to be created
    setTimeout(() => {
      this.modal?.querySelector('.btn-confirm')
        ?.addEventListener('click', () => {
          this.onConfirm();
          this.close();
        });
        
      this.modal?.querySelector('.btn-cancel')
        ?.addEventListener('click', () => {
          this.onCancel();
          this.close();
        });
    }, 0);
  }
}

// Usage
const modal = new ConfirmationModal(
  "Are you sure you want to proceed?",
  () => console.log("Confirmed!"),
  () => console.log("Cancelled")
);
modal.open();
```

## CSS Classes Reference

| Class | Applied To | Purpose |
| --- | --- | --- |
| `engrid-modal` | Root element | Base modal styles |
| `modal--hidden` | Root element | Hides the modal (toggles) |
| `engrid-modal--close-x` | Root element | Shows X button styles |
| `engrid-modal--scale` | Root element | Triggers bounce animation |
| `engrid-modal__overlay` | Overlay div | Dark background overlay |
| `engrid-modal__container` | Container div | White modal box |
| `engrid-modal__close` | Close button | Clickable close X |
| `engrid-modal__body` | Body div | Contains your content |
| `engrid-modal__button` | Close button | Bottom close button (optional) |

## Integration with ENgrid

The modal integrates with ENgrid's body data attributes:

```typescript
// When modal opens
ENGrid.setBodyData("has-lightbox", "true");

// When modal closes
ENGrid.setBodyData("has-lightbox", false);
```

This allows CSS to style the page differently when a modal is active:

```css
body[data-has-lightbox="true"] {
  overflow: hidden;
}
```

### Adding your component to your client theme

To add the component to your client theme, import it into your `/src/index.ts` file and initialize it in your onLoad function of your ENgrid Options:

```ts
// Other imports
import { MyCustomModal } from './scripts/my-modal'

const options: Options = {
  // Other options
  onLoad: () => {
    // Other onLoad code
    new MyCustomModal()
  },
  // Other options
}

new App(options)
```

## Best Practices

1. **Always Extend**: Never instantiate Modal directly, always extend it
2. **Implement getModalContent()**: This is required in your subclass
3. **Call super()**: Always call `super(options)` in your constructor
4. **Test Accessibility**: Verify keyboard navigation and screen reader compatibility
5. **Style Appropriately**: Use `customClass` for theme-specific styling
6. **Consider Mobile**: Ensure modals work well on small screens
7. **Handle Events**: Set up event listeners after modal creation in constructor

## Related Components

The Modal class is used as a foundation for several ENgrid components:
- [One-time Upsell Lightbox](./upsells#donation-one-time-upsell-lightbox)
- [Frequency Upsell Lightbox](./upsells#donation-frequency-lightbox)
- [Exit Intent Lightbox](./exit-intent-lightbox)

These components extend Modal to provide specific functionality while maintaining consistent accessibility and behavior patterns.
