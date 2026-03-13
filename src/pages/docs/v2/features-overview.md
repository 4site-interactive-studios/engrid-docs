---
title: ENgrid Features Overview
description: A comprehensive overview of ENgrid's features across giving, advocacy, accessibility, content editing, and developer tools
---

ENgrid is 4Site's open-source code framework for supercharging Engaging Networks page templates. It provides a wide range of features that are not available natively in EN, organized across giving pages, advocacy, accessibility, content editing, and developer tooling. This page provides a high-level overview of what ENgrid can do — follow the links to detailed documentation for each feature.

---

## Giving Page Features

ENgrid extends Engaging Networks donation pages with smart defaults, flexible payment options, and conversion-focused enhancements.

| Feature | Description | Details |
| ------- | ----------- | ------- |
| Smart donation amount handling | Automatically strips commas and non-numeric characters from the Other Amount input field | [Currency & Donation Amounts](/docs/v2/currency-donation-amounts) |
| Auto-update CC expiration year | Updates credit card expiration year dropdown to include the current year and the next 19 years, removing past years | [Auto-Fill & Smart Defaults](/docs/v2/auto-fill-smart-defaults) |
| VGS support | Full Very Good Security support with custom styling and error handling | [Payment Security](/docs/v2/payment-security) |
| Tip Jar / Processing Fee | Additional gift checkbox that works alongside EN's native processing fee checkbox | [Currency & Donation Amounts](/docs/v2/currency-donation-amounts) |
| Donation Upsell Lightbox | An alternative to EN's native upsell lightbox with further customization options for one-time to recurring upsells | [Upsells](/docs/v2/upsells) |
| Conditional fields | Hide and show fields based on donor selections (e.g., In Honor/Memorial giving fields) | [Conditional Content Helper Classes](/docs/v2/conditional-content-helper-classes) |
| Multiple payment methods | Give by Card, Check, PayPal, Apple Pay, Google Pay, Venmo, and DAF (depends on payment processor support) | [Payment Methods & Digital Wallets](/docs/v2/payment-methods-digital-wallets) |
| Live giving variables | Insert the currently selected giving amount and frequency anywhere on the page — they act like live merge tags that update in real time | [Live Variables](/docs/v2/live-variables) |
| CVV tooltip | A "What's this?" tooltip next to the CVV field to help donors understand the security code | [Payment Security](/docs/v2/payment-security) |
| Conditional content by amount | Show or hide content blocks based on the selected giving amount | [Conditional Content Helper Classes](/docs/v2/conditional-content-helper-classes) |
| Conditional content by frequency | Show or hide content blocks based on the selected giving frequency (one-time, monthly, annual, etc.) | [Conditional Content Helper Classes](/docs/v2/conditional-content-helper-classes) |
| Conditional content by selection | Show or hide content based on the selected value of any radio or checkbox input | [Show/Hide Radio Checkboxes](/docs/v2/show-hide-radio-checkboxes) |
| Remember Me | Optional feature to save and pre-fill supporter info across visits, working cross-domain and cross-subdomain | [Remember Me](/docs/v2/remember-me) |
| Currency selector enhancements | Extended customization for the currency selector, with the ability to change donation amount buttons based on the selected currency | [Currency & Donation Amounts](/docs/v2/currency-donation-amounts) |
| Premium gift displays | Dynamic premium gift configurations with multiple display themes | [Custom Premium](/docs/v2/custom-premium) |
| Post-donation donation | Embed a follow-up donation form on the thank you page for an additional gift with minimal friction | [Post-Donation Donation](/docs/v2/post-donation-embed) |

---

## Advocacy & e-Card Features

| Feature | Description | Details |
| ------- | ----------- | ------- |
| Advocacy opt-in upsell lightbox | Present additional opt-in opportunities after advocacy actions | [Advocacy & Email-to-Target](/docs/v2/advocacy-features) |
| Title field tooltip | "Why is this required?" tooltip for the title field on Email-to-Senate actions | [Advocacy & Email-to-Target](/docs/v2/advocacy-features) |
| Improved e-card recipient UX | Tweaked UI/UX for an improved e-card "add recipient" experience | [Embedded Ecard](/docs/v2/embedded-ecard) |
| Ecard-to-target | Send ecards to advocacy targets | [Advocacy & Email-to-Target](/docs/v2/advocacy-features) |

---

## Accessibility Enhancements

ENgrid includes several automatic accessibility features to help pages meet WCAG standards with no additional configuration. For a detailed overview, see the [Accessibility Features](/docs/v2/accessibility-overview) page.

- **Skip content link** for keyboard navigation
- **Accessible outlines** around fields when navigating with the keyboard
- **Optional accessible drop-down menu**
- Automatically adds the `autocomplete` attribute to the most common input elements
- Automatically adds `aria-required` to required fields
- Automatically adds `aria-labelledby` to input fields with labels
- Automatically adds `aria-label` to the other amount input field and split selects

For the full technical reference, see [Form Field Enhancements — Accessibility](/docs/v2/form-field-enhancements#accessibility-a11y).

---

## Content Editor Capabilities

ENgrid gives content editors full control over page presentation directly from the Engaging Networks page builder — no developer involvement required for routine content changes. For a complete guide, see the [Content Editor Guide](/docs/v2/content-editor-guide).

| Feature | Description | Details |
| ------- | ----------- | ------- |
| Fully editable on-page content | All content is managed through the EN page builder; nothing is hard-coded into the page template | [Content Editor Guide](/docs/v2/content-editor-guide) |
| Per-page background images and videos | Set unique background images or videos for each page | [Replace Banner with Background](/docs/v2/replace-banner-with-background) |
| Six built-in page layouts | Choose from six layout options per page | [ENgrid Visualization](/docs/v2/visualizing-engrid-grids) |
| Click-to-expand sections | Expandable content areas activated by click, touch, or keyboard | [Click to Expand](/docs/v2/click-to-expand) |
| Media attribution overlays | Add photographer or artist credits directly to images and videos with optional links | [Media Attribution](/docs/v2/media-attribution) |
| WordPress embedding | Embed any ENgrid page seamlessly in your WordPress site using the Promotions Plugin or shortcodes | [Embedding ENgrid](/docs/v2/embedding-engrid) |
| Color-coded hidden content | Hidden and conditional content is visually color-coded inside the page builder | [Content Editor Guide](/docs/v2/content-editor-guide) |
| Visually hidden labels | Easy-to-add classes for hiding labels while maintaining accessibility | [Form Field Enhancements](/docs/v2/form-field-enhancements) |
| Conditional show/hide classes | Simple CSS classes to show or hide content based on gift amount, frequency, or other selections | [Conditional Content Helper Classes](/docs/v2/conditional-content-helper-classes) |
| Social sharing meta tags | Default Facebook and Twitter meta tags with support for EN's per-page social sharing widget | [Data & URL Parameters](/docs/v2/data-and-url-parameters) |
| Custom merge tags | Support for custom merge tags in page content, replaced with dynamic values from URL parameters | [Dynamic Content from URL Arguments](/docs/v2/dynamic-content-from-url-arguments) |
| Ecard form embedding | Embed an ecard form into donation or advocacy pages | [Embedded Ecard](/docs/v2/embedded-ecard) |
| Quick edit shortcut | Jump directly to the page builder from any page by adding `?pbedit` to the URL | [Content Editor Guide](/docs/v2/content-editor-guide) |

---

## Developer Capabilities

ENgrid provides a robust development environment with extensive tooling for building, testing, and deploying EN page templates. For the complete developer training guide, see [Training](/docs/v2/training).

| Feature | Description | Details |
| ------- | ----------- | ------- |
| 30+ body data attributes | Data attributes added to the `<body>` tag for granular styling and functional control | [Data & URL Parameters](/docs/v2/data-and-url-parameters) |
| Per-client GitHub repos | Each client project gets its own GitHub repository with all source code and assets | [Creating an ENgrid Theme](/docs/v2/creating-an-engrid-theme) |
| All page types supported | Works with donation, premium, e-card, email-to-target, event, survey, and more — coverage is added as new page types or display scenarios emerge | [ENgrid Scripts and Client Themes](/docs/v2/what-is-engrid-and-client-theme) |
| Sub-brand theming | Support for alternative brand themes and A/B testing scenarios | [Developing with ENgrid](/docs/v2/developing-with-engrid) |
| Optional input placeholders | Placeholder values in input fields | [Form Field Enhancements](/docs/v2/form-field-enhancements) |
| International address formatting | When a supporter selects a different country, address fields update their labels, ordering, and visibility to match that country's format | [International Addresses](/docs/v2/international-form-addresses) |
| Debug panel | Quick-fill form fields, change theme layouts, force form submission, and shortcut to the EN page builder | [Debug Tools](/docs/v2/debug-tools) |
| 35+ helper functions | Abstract class with helper functions for common EN tasks like getting and setting field values | [Core ENgrid Functions](/docs/v2/engrid-core-functions) |

---

## General Quality of Life Improvements

| Feature | Description | Details |
| ------- | ----------- | ------- |
| Exit intent lightbox | Configurable exit intent lightbox to capture abandoning visitors | [Exit Intent Lightbox](/docs/v2/exit-intent-lightbox) |
| Enhanced autofill | Data attributes on form fields to improve browser and password manager auto-fill | [Form Field Enhancements](/docs/v2/form-field-enhancements) |
| IP-based country detection | Auto-select the supporter's country based on IP address on page load | [Auto-Fill & Smart Defaults](/docs/v2/auto-fill-smart-defaults) |
| Auto-capitalization | Capitalize the first letter of First Name, Last Name, Address, City, and Region fields on form submit | [Form Field Enhancements](/docs/v2/form-field-enhancements) |
| Lazy loading | All image assets are lazy loaded and moved to their own CPU thread to prevent rendering slowdowns | [Deferred Asset Loading](/docs/v2/deferred-asset-loading) |
| Fast page loads | All render-critical assets are prefetched with a single CSS and JS file for the fastest possible load times on Engaging Networks | [ENgrid Scripts and Client Themes](/docs/v2/what-is-engrid-and-client-theme) |
| GTM auto events | Automatically push events about page type, field interactions, and actions to Google Tag Manager | [GTM Data Layer](/docs/v2/gtm-datalayer) |
| Welcome Back | Returning supporter recognition and fast form filling | [Welcome Back](/docs/v2/welcome-back) |
| Multi-step forms | Break any page into multiple steps controlled via content blocks in the page builder | [Multi-step Forms](/docs/v2/single-page-multistep) |

---

## Open Source & Transparent

ENgrid is open source under [The Unlicense](https://github.com/4site-interactive-studios/engrid/blob/main/LICENSE), meaning you are free to download, use, modify, and extend it. All code is published openly on [GitHub](https://github.com/4site-interactive-studios/engrid), with over 1,800 commits and full [release notes](https://www.4sitestudios.com/engrid-release-notes/) documenting every change.

- [ENgrid Source Code on GitHub](https://github.com/4site-interactive-studios/engrid)
- [ENgrid Release Notes](https://www.4sitestudios.com/engrid-release-notes/)
- [ENgrid on npm — Scripts](https://www.npmjs.com/package/@4site/engrid-scripts) / [Styles](https://www.npmjs.com/package/@4site/engrid-styles)
