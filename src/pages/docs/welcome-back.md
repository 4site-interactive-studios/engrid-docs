---
title: Welcome Back
description: This page shows how to use ENgrid's Welcome Back component
---

This page shows how to use ENgrid's Welcome Back component to provide a streamlined experience for returning users.

## The Welcome Back Component

### Overview

The Welcome back component, when enabled and triggered, will hide the personal details form on the page and can show 2 new elements:

- A welcome back message with a greeting and a "Not you?" text
    - When clicked, the "Not you?" text will clear the user's details and reveal the form again.
- A personal details summary block with the user's details and an edit link.
    - When the edit link is clicked, the form will be revealed for the user to edit their details.

To enabled the component, you need to add the following configuration object to your ENgrid Options:

```ts
const options: Options = {
    // Other options
    WelcomeBack: {
        welcomeBackMessage: {
            display: true,
            title: "Welcome back, {firstName}!",
            editText: "Not you?",
            anchor: ".body-main",
            placement: "afterbegin",
        },
        personalDetailsSummary: {
            display: true,
            title: "Your Information",
            editText: "Change my info",
            anchor: ".fast-personal-details",
            placement: "beforebegin",
        },
    },
    // Other options
}
```

You can use these options to configure the display, text and position of the elements. You can use `EngridPageOptions` to enable it for only one page, or it can be enabled for your entire theme. It's recommended you test it on different page types and see if they need different positioning configuration.

### Activating the Welcome Back Component

To activate the Welcome Back component, you need to:

- Add the class `fast-personal-details` to the form block that contains all the user's mandatory personal details for completing the form.
- Use the helper classes `hideif-fast-personal-details` and `showif-fast-personal-details` to customise which elements will be displayed or hidden when the Welcome Back component is active. For example, you may want to hide some text elements when the personal details summary is displayed.

The component will activate when all mandatory fields inside the `fast-personal-details` form block are filled in.

The personal details summary will show firstname, lastname and email address always. If your form didn't have one of these values, it'll adjust. Next, it will show the address block only if your form had the fields address1, city, region and postcode.
