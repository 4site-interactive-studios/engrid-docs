---
title: Frequency Upsell Modal
description: This page shows how to use ENgrid's frequency upsell modal to add a modal to your page that encourages supporters to make a donation with a different recurring frequency.
---

Using ENgrid, you can add a Frequency Upsell Modal to your page to encourage your supporters to make a donation with a different recurring frequency. This modal will appear when the supporter submits the form, and it will allow them to select a different frequency for their donation.

The typical use for this modal is to encourage supporters to make an annual donation instead of a one-time donation. However, you can configure it to work with any frequencies you want.

{% callout title="Information" %}
The Frequency Upsell Modal won't run if you have an Engaging Networks Upsell or ENgrid Upsell Modal on the page. If you want to use the Frequency Upsell Modal, you need to remove any other upsell modals from your page.

The Frequency Upsell Modal does not run for Digital Wallet payments. This is the same limitation as Engaging Networks' own upsell lightbox feature.
{% /callout %}

## Adding a Frequency Upsell Modal

To add a Frequency Upsell Modal to your page, you need to add a code block to your page that defines the `window.EngridFrequencyUpsell` variable.

```js
window.EngridFrequencyUpsell = {
  title: 'Before we process your donation...',
  paragraph: 'Would you like to make it an annual gift?',
  yesButton: 'YES! Process my gift as an annual gift of ${upsell_amount}',
  noButton: 'NO! Process my gift as a one-time gift of ${current_amount}',
}
```

In this example, the modal will ask the supporter if they want to make their donation an annual gift. The `yesButton` and `noButton` properties define the text that will be displayed on the buttons in the modal. The `title` and `paragraph` properties define the text that will be displayed in the modal.

The `{current_amount}` and `{upsell_amount}` placeholders will be replaced with the current amount and the upsell amount, respectively.

## Customizing the Frequency Upsell Modal

There are additional properties you can set to customize the Frequency Upsell Modal:

```js
window.EngridFrequencyUpsell = {
  upsellFrequency: 'annual', // The frequency to upsell to. Can be "monthly", "quarterly", "semi_annual" or "annual".
  upsellFromFrequency: ['onetime'], // An array of frequencies to upsell from. Can be "onetime", "monthly", "quarterly", "semi_annual", "annual".
  customClass: '', // A custom class to add to the modal. Useful for custom styling.
  upsellAmount: (currentAmount) => currentAmount, // A function that takes the current donation amount and returns the upsell amount. This is useful for calculating the upsell amount based on the current amount. By default it will be the same as the current donation amount. It must return a number.
  onOpen: () => {}, // A function that will be called right after the modal opens (before the user clicks). Useful for analytics impressions.
  onAccept: () => {}, // A function that will be called when the user accepts the upsell. This is useful for tracking/analytics or any custom page functionality.
  onDecline: () => {}, // A function that will be called when the user declines the upsell. This is useful for tracking/analytics or any custom page functionality.
}
```

## Default Values of the Frequency Upsell Modal

The default values for the Frequency Upsell Modal configure it to upsell from a one-time donation to an annual donation. You only need to supply values that you want to change. If you don't supply a value, the default value will be used.

The default values are:

```js
window.EngridFrequencyUpsell = {
  title: 'Before we process your donation...',
  paragraph: 'Would you like to make it an annual gift?',
  yesButton: 'YES! Process my gift as an annual gift of ${upsell_amount}',
  noButton: 'NO! Process my gift as a one-time gift of ${current_amount}',
  upsellFrequency: 'annual',
  upsellFromFrequency: ['onetime'],
  customClass: '',
  upsellAmount: (currentAmount) => currentAmount,
  onOpen: () => {},
  onAccept: () => {},
  onDecline: () => {},
}
```

## Example

In this example, we'll create a Frequency Upsell Modal that suggests to the supporter that, instead of making an annual donation, they could make a monthly donation with 1/12 of the annual amount.

```js
window.EngridFrequencyUpsell = {
  title: 'Before we process your donation...',
  paragraph: 'Would you like to make it a monthly gift?',
  yesButton: 'YES! Process my gift as a monthly gift of ${upsell_amount}',
  noButton: 'NO! Process my gift as an annual gift of ${current_amount}',
  upsellFrequency: 'monthly',
  upsellFromFrequency: ['annual'],
  customClass: 'my-custom-class',
  upsellAmount: (currentAmount) => Math.floor(currentAmount / 12),
  onOpen: () => {
    window.dataLayer.push({
      event: 'upsellOpened',
    })
  },
  onAccept: () => {
    window.dataLayer.push({
      event: 'upsellAccepted',
    })
  },
  onDecline: () => {
    window.dataLayer.push({
      event: 'upsellDeclined',
    })
  },
}
```

## A/B Testing the Frequency Upsell Modal

You can run an A/B test on different upsell variants (for example, different copy, target frequency, button text, or styling) without writing custom selection logic. Instead of assigning `window.EngridFrequencyUpsell` to a single options object, assign an A/B test configuration object with `abTest: true` and an `options` array containing two or more full (or partial—defaults still apply) Frequency Upsell option objects.

When an A/B test config is detected:

1. A random variant index is chosen on the visitor's first page view.
2. The chosen index is stored in a cookie (default name: `engrid_frequency_upsell_variant`) so subsequent views (and form submissions) on that browser keep the same variant for the cookie duration (default: 1 day).
3. A `frequency_upsell_ab_variant` event is pushed to `dataLayer` (if present) with:
   - `frequencyUpsellVariantIndex` (number)
   - `frequencyUpsellVariantTitle` (the variant's `title` value)

### Configuration Shape

```js
window.EngridFrequencyUpsell = {
  abTest: true,
  // Optional: override the cookie name (defaults to 'engrid_frequency_upsell_variant')
  cookieName: 'my_custom_frequency_upsell_cookie',
  // Optional: number of days the visitor should keep the same variant (defaults to 1)
  cookieDurationDays: 7,
  options: [
    {
      // Variant A
      title: 'Before we process your donation... (A)',
      paragraph: 'Would you upgrade to an annual gift? (A)',
      yesButton: 'Yes, make it annual at ${upsell_amount}',
      noButton: 'No, keep my one-time gift of ${current_amount}',
      upsellFrequency: 'annual',
      upsellFromFrequency: ['onetime'],
      customClass: 'upsell-a',
      onOpen: () =>
        window.dataLayer && window.dataLayer.push({ event: 'upsellOpenedA' }),
      onAccept: () =>
        window.dataLayer && window.dataLayer.push({ event: 'upsellAcceptedA' }),
      onDecline: () =>
        window.dataLayer && window.dataLayer.push({ event: 'upsellDeclinedA' }),
    },
    {
      // Variant B
      title: 'Wait! Make a bigger impact',
      paragraph: 'Turn this one-time gift into a small monthly commitment?',
      yesButton: 'Yes, make it monthly at ${upsell_amount}',
      noButton: 'No thanks, keep my one-time gift of ${current_amount}',
      upsellFrequency: 'monthly',
      upsellFromFrequency: ['onetime'],
      customClass: 'upsell-b highlight',
      upsellAmount: (current) => Math.round(current / 10), // Example: propose ~1/10 as monthly
      onOpen: () =>
        window.dataLayer && window.dataLayer.push({ event: 'upsellOpenedB' }),
      onAccept: () =>
        window.dataLayer && window.dataLayer.push({ event: 'upsellAcceptedB' }),
      onDecline: () =>
        window.dataLayer && window.dataLayer.push({ event: 'upsellDeclinedB' }),
    },
  ],
}
```

### Notes & Best Practices

- You can include any property from the base `FrequencyUpsell` options inside each variant; unspecified properties fall back to the global defaults listed earlier.
- Use `onOpen` for impression tracking so you can measure open rate vs. accept/decline actions per variant.
- Keep variant differences focused (e.g. only change copy OR frequency) when you want clear attribution of impact.
- If you need to add more variants, just add more objects to the `options` array.
- To reset your own browser for testing, clear the variant cookie (default `engrid_frequency_upsell_variant`) or use an incognito window.

### Data Layer Event Example

If `dataLayer` exists, the following object is pushed immediately after variant selection (before the modal opens):

```js
{
    event: 'frequency_upsell_ab_variant',
    frequencyUpsellVariantIndex: 1, // example
    frequencyUpsellVariantTitle: 'Wait! Make a bigger impact'
}
```

You can use this to set a user property / dimension in analytics tooling and segment conversion metrics by variant.
