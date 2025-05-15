---
title: Frequency Upsell Modal
description: This page shows how to use ENgrid's frequency upsell modal to add a modal to your page that encourages supporters to make a donation with a different recurring frequency.
---

Using ENgrid, you can add a Frequency Upsell Modal to your page to encourage your supporters to make a donation with a different recurring frequency. This modal will appear when the supporter submits the form, and it will allow them to select a different frequency for their donation.

The typical use for this modal is to encourage supporters to make an annual donation instead of a one-time donation. However, you can configure it to work with any frequencies you want.

{% callout title="Information" %}
The Frequency Upsell Modal won't run if you have an Engaging Networks Upsell or ENgrid Upsell Modal on the page. If you want to use the Frequency Upsell Modal, you need to remove any other upsell modals from your page.
{% /callout %}

## Adding a Frequency Upsell Modal

To add a Frequency Upsell Modal to your page, you need to add a code block to your page that defines the `window.EngridFrequencyUpsell` variable.

```js
window.EngridFrequencyUpsell = {
    title: "Before we process your donation...",
    paragraph: "Would you like to make it an annual gift?",
    yesButton: "YES! Process my gift as an annual gift of ${upsell_amount}",
    noButton: "NO! Process my gift as a one-time gift of ${current_amount}",
};
```
In this example, the modal will ask the supporter if they want to make their donation an annual gift. The `yesButton` and `noButton` properties define the text that will be displayed on the buttons in the modal. The `title` and `paragraph` properties define the text that will be displayed in the modal.

The `{current_amount}` and `{upsell_amount}` placeholders will be replaced with the current amount and the upsell amount, respectively.

## Customizing the Frequency Upsell Modal

There are additional properties you can set to customize the Frequency Upsell Modal:

```js
window.EngridFrequencyUpsell = {
    upsellFrequency: "annual", // The frequency to upsell to. Can be "monthly", "quarterly", "semi_annual" or "annual".
    upsellFromFrequency: ["onetime"], // An array of frequencies to upsell from. Can be "onetime", "monthly", "quarterly", "semi_annual", "annual".
    customClass: "", // A custom class to add to the modal. Useful for custom styling.
    upsellAmount: (currentAmount) => currentAmount, // A function that takes the current donation amount and returns the upsell amount. This is useful for calculating the upsell amount based on the current amount. By default it will be the same as the current donation amount. It must return a number.
    onAccept: () => {}, // A function that will be called when the user accepts the upsell. This is useful for tracking/analytics or any custom page functionality.
    onDecline: () => {}, // A function that will be called when the user declines the upsell. This is useful for tracking/analytics or any custom page functionality.
};
```

## Default Values of the Frequency Upsell Modal

The default values for the Frequency Upsell Modal configure it to upsell from a one-time donation to an annual donation. You only need to supply values that you want to change. If you don't supply a value, the default value will be used.

The default values are:

```js
window.EngridFrequencyUpsell = {
  title: "Before we process your donation...",
  paragraph: "Would you like to make it an annual gift?",
  yesButton: "YES! Process my gift as an annual gift of ${upsell_amount}",
  noButton: "NO! Process my gift as a one-time gift of ${current_amount}",
  upsellFrequency: "annual",
  upsellFromFrequency: ["onetime"],
  customClass: "",
  upsellAmount: (currentAmount) => currentAmount,
  onAccept: () => {},
  onDecline: () => {},
};
```

## Example

In this example, we'll create a Frequency Upsell Modal that suggests to the supporter that, instead of making an annual donation, they could make a monthly donation with 1/12 of the annual amount.

```js
window.EngridFrequencyUpsell = {
    title: "Before we process your donation...",
    paragraph: "Would you like to make it a monthly gift?",
    yesButton: "YES! Process my gift as a monthly gift of ${upsell_amount}",
    noButton: "NO! Process my gift as an annual gift of ${current_amount}",
    upsellFrequency: "monthly",
    upsellFromFrequency: ["annual"],
    customClass: "my-custom-class",
    upsellAmount: (currentAmount) => Math.floor(currentAmount / 12),
    onAccept: () => {
        window.dataLayer.push({
            event: "upsellAccepted",
        });
    },
    onDecline: () => {
        window.dataLayer.push({
            event: "upsellDeclined",
        });
    },
};
```
