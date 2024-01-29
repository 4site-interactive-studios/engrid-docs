---
title: Custom Lightboxes
description: This page shows how to use ENgrid's abstract Modal component to create your own lightbox component
---

This page shows how to use ENgrid's abstract Modal component to create your own lightbox component.

## Creating your own lightbox component

### Understanding the abstract Modal component

ENgrid's Modal component is an abstract component that provides the basic functionality for a lightbox component. It is not meant to be used directly, but rather extended by other components that need to display a lightbox.

The Modal component provides the following functionality:

- Fully accessible HTML structure, with default styling for the general lightbox structure.
- Focus trapping. When active, the lightbox will trap focus within the lightbox, preventing the user from tabbing outside of the lightbox.
- A method for opening the lightbox - `open()`
- A method for closing the lightbox - `close()`
- A method for setting the content of the lightbox - `getModalContent()`
- Customization options, including:
  - Configuring the behaviour when the area outside of the lightbox is clicked
  - Adding a close button, with a custom label, to the lightbox

The Modal component does not provide any content styling. Styling will be inherited from the client ENgrid theme, but you can also add your own custom styling.

The Modal component is a TypeScript Class and can be found at: `/packages/common/src/modal.ts`

The Modal styling can be found at `/packages/styles/src/_engrid-modal.scss`

### Implementing your component

In your client theme, create a new TypeScript file in the `/src/scripts` folder, import the Modal component and create a new Class that extends `Modal`:

```ts
import { Modal } from "@4site/engrid-common";

export class MyLightbox extends Modal {}
```

In your Constructor, call the `super()` method and pass in an object that configures the Modal component. The following options are available:
   - `onClickOutside` - Configures the behaviour when the area outside of the lightbox is clicked. Can be set to `close` or `bounce` (which does a quick scaling animation). Defaults to `close`.
   - `addCloseButton` - Configures whether a close button should be added to the lightbox. Can be set to `true` or `false`. Defaults to `false`.
   - `closeButtonLabel` - Configures the label of the close button.

```ts
import { Modal } from "@4site/engrid-common";

export class MyLightbox extends Modal {
  constructor() {
    super({
      onClickOutside: "close",
      addCloseButton: true,
      closeButtonLabel: "Close",
    });
  }
}
```

Implement the getModalContent method in your Class. This method can return a String, an HTML Element or a NodeList of HTML Elements. This is the content that will be displayed in the lightbox.

```ts
public getModalContent(): NodeListOf<Element> | HTMLElement | String {
  return "<h1>My Lightbox Content</h1>";
}
```

{% callout title="Tip" %}
If you want to make your lightbox content configurable from the Page Builder, you can set it to a variable that's defined from a code block, or have it pull in the content from an element on the page with a custom class.
{% /callout %}

Now, you can call the `open()` method to open the lightbox. In this simple example, we'll just call it from the Constructor but you can implement any custom logic you need for deciding if the lightbox should open.

Here is our full component:

```ts
import { Modal } from "@4site/engrid-common";

export class MyLightbox extends Modal {
  constructor() {
    super({
      onClickOutside: "close",
      addCloseButton: true,
      closeButtonLabel: "Close",
    });
    
    this.open();
  }

  public getModalContent(): NodeListOf<Element> | HTMLElement | String {
    return "<h1>My Lightbox Content</h1>";
  }
}
```
### Adding your component to your client theme

To add the component to your client theme, import it into your `/src/index.ts` file and initialize it in your onLoad function of your ENgrid Options:

```ts
// Other imports
import { MyLightbox } from "./scripts/my-lightbox";

const options: Options = {
  // Other options
  onLoad: () => {
    // Other onLoad code
    new MyLightbox();
  }
  // Other options
}

new App(options);
```


