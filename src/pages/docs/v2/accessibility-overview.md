---
title: Accessibility Features
description: Overview of ENgrid's built-in accessibility features and WCAG compliance support
---

ENgrid includes several automatic accessibility enhancements that help Engaging Networks pages meet WCAG standards. Many of these features require no configuration — they are applied automatically when ENgrid loads on a page.

---

## Automatic Features

The following accessibility features are built into ENgrid and activate automatically on every page:

### Skip to Main Content Link

A skip navigation link is automatically added to the page, allowing keyboard users to bypass the header and navigation and jump directly to the main content area. This is a WCAG 2.4.1 requirement.

See [Skip Link](/docs/v2/skip-link) for details.

### Keyboard Focus Outlines

ENgrid adds visible outlines around form fields and interactive elements when they receive focus via keyboard navigation. This helps keyboard-only users understand where they are on the page.

### Required Field Indicators

`aria-required="true"` is automatically added to all mandatory form fields, ensuring screen readers announce which fields are required.

### Radio Button Group Labels

Proper ARIA roles and labels are added to radio button groups, including `role="group"` and `aria-labelledby` attributes linking to the group label.

### Other Amount Field Label

An accessible label (`aria-label`) is automatically added to the "other amount" input field so screen readers can announce its purpose.

### Split Select Labels

For split select fields that lack visible labels, ENgrid uses the first option text as an `aria-label` so screen readers can describe the field's purpose.

### Frequency Field Label Updates

When donation frequency options change (e.g., monthly, annual), ENgrid updates associated ARIA labels to reflect the current options.

### Auto-generated Image Alt Tags

ENgrid ensures images have appropriate alt text. If an image is missing alt text, ENgrid generates descriptive attributes based on available context.

### Autocomplete Attributes

The `autocomplete` attribute is automatically added to common form fields (name, email, address, phone, etc.), enabling browsers and assistive technologies to help supporters fill out forms more easily.

---

## Optional Accessible Features

### Accessible Drop-down Menu

An optional accessible navigation component that can be activated in your theme configuration. When enabled, it provides keyboard-navigable menus with proper ARIA attributes.

### Click-to-Expand Sections

Expandable content sections are built with accessibility in mind — they can be opened with a click, touch, or by pressing Enter or Spacebar when focused with a keyboard. ARIA attributes communicate the expanded/collapsed state to screen readers.

See [Click to Expand Helper Classes](/docs/v2/click-to-expand) for usage details.

---

## Content Editor Responsibilities

While ENgrid handles many accessibility concerns automatically, content editors play a role in maintaining accessible pages:

- **Use proper heading hierarchy** — Start with H2 for main sections and use H3, H4, etc. for subsections. Do not skip heading levels.
- **Add alt text to images** — Describe the content and purpose of each image. Decorative images should use empty alt text (`alt=""`).
- **Write descriptive link text** — Avoid generic link text like "click here" or "read more." Use descriptive text that makes sense out of context.
- **Maintain color contrast** — Ensure text has sufficient contrast against its background. WCAG requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.
- **Use media attribution** — The [Media Attribution](/docs/v2/media-attribution) feature allows you to add credits to images accessibly without embedding text into images.

---

## Developer Resources

For the full technical reference on ENgrid's accessibility implementation, including the A11y class API and configuration options, see [Form Field Enhancements — Accessibility](/docs/v2/form-field-enhancements#accessibility-a11y).
