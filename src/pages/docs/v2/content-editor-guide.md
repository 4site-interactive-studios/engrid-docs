---
title: Content Editor Guide
description: A guide for non-developer content editors working with ENgrid-powered Engaging Networks pages
---

This guide is for content administrators who manage Engaging Networks pages built with ENgrid. You do not need coding experience to use these features — everything described here can be managed through the Engaging Networks page builder.

{% callout title="Looking for developer documentation?" %}
If you are a developer writing code for ENgrid, start with the [Training](/docs/v2/training) guide instead.
{% /callout %}

---

## What You Can Edit

ENgrid page templates are designed so that all on-page content is managed through the Engaging Networks page builder. Nothing is hard-coded into the page template itself. This means you can change:

- All text content, headings, and body copy
- Images and background media
- Form fields and their labels
- Conditional content blocks
- Page layout and structure
- Social sharing metadata

---

## Quick Edit Shortcut

You can jump directly from any live ENgrid page to its page builder by appending `?pbedit` to the URL. For example:

```
https://support.example.org/page/12345/donate/1?pbedit
```

This redirects you straight to the Engaging Networks page builder for that page.

---

## Page Layouts

ENgrid provides six built-in layout options that control how content and the form are arranged on the page. You can choose a layout on a per-page basis by adding a class to a code block in the page builder.

For a visual guide to all available layouts and how they work, see [ENgrid Visualization](/docs/v2/visualizing-engrid-grids).

---

## Per-Page Background Images and Videos

Every page can have its own unique background image or video. You control this through the page builder by adding your media to the designated content area. ENgrid handles responsive sizing, lazy loading, and performance optimization automatically.

- **Background images** can be positioned using helper classes — see [Background Image Positioning](/docs/v2/background-image-positioning)
- **Banner replacement** with full-bleed backgrounds is also supported — see [Replace Banner with Background](/docs/v2/replace-banner-with-background)

---

## Click-to-Expand Sections

You can create expandable content sections that visitors open by clicking, tapping, or pressing Enter/Spacebar when focused with a keyboard. These are useful for FAQs, additional details, or supplementary content that you do not want visible by default.

To use this feature, add the appropriate helper classes to your content blocks in the page builder. For full details and available classes, see [Click to Expand Helper Classes](/docs/v2/click-to-expand).

---

## Media Attribution Overlays

You can add photographer or artist attribution directly to images and videos without editing them in Photoshop or hard-coding credit text. The attribution appears as an overlay on the media, and you can optionally include a link to the photographer's portfolio or website.

For setup instructions, see [Media Attribution](/docs/v2/media-attribution).

---

## Conditional Content

ENgrid makes it easy to show or hide content blocks based on what the supporter selects on the page. This is controlled entirely through CSS classes that you add to content blocks in the page builder.

### By Giving Amount

Show or hide content when the selected donation amount meets a threshold. For example, display a special thank-you message only for gifts of $100 or more:

```
.showifamount-greaterthanorequalto-100
```

See [Conditional Content Helper Classes](/docs/v2/conditional-content-helper-classes) for the full list of amount-based classes.

### By Giving Frequency

Show or hide content based on whether the donor selects one-time, monthly, annual, or another frequency.

See [Conditional Content Helper Classes](/docs/v2/conditional-content-helper-classes) for frequency-based classes.

### By Radio or Checkbox Selection

Show or hide content based on the selected value of any radio button or checkbox on the page. This is useful for In Honor/In Memorial fields, tribute giving options, and other conditional form sections.

See [Show/Hide Radio Checkboxes](/docs/v2/show-hide-radio-checkboxes) for details.

---

## Color-Coded Content in the Page Builder

When working in the Engaging Networks page builder, ENgrid visually color-codes hidden and conditional content so you can see at a glance which blocks are hidden on the live page, which are conditional, and which are always visible. This helps prevent accidentally editing content you cannot see on the live page and makes it easier to manage complex layouts.

---

## Visually Hidden Labels

For accessibility compliance, form fields should always have labels — but sometimes you want those labels hidden from view while keeping them available to screen readers. ENgrid provides helper classes that visually hide labels while maintaining accessibility best practices.

For available classes, see [Form Field Enhancements](/docs/v2/form-field-enhancements).

---

## Social Sharing Meta Tags

ENgrid page templates include default Facebook and Twitter (Open Graph) social sharing meta tags. These control the title, description, and image that appear when someone shares a page on social media.

EN's per-page social sharing widget can override the defaults, so you can customize the social preview for each individual page through the page builder.

---

## Custom Merge Tags

You can include custom merge tags in your page content that are dynamically replaced with values passed through URL parameters. This allows a single page to serve multiple purposes — for example, a donation page that adjusts its messaging based on which email campaign linked to it.

For full details on setting up and using custom merge tags, see [Dynamic Content from URL Arguments](/docs/v2/dynamic-content-from-url-arguments).

---

## Embedding Ecards in Other Pages

You can embed an ecard form directly into a donation or advocacy page by targeting a specific recipient defined in a code block. This allows supporters to send an ecard as part of their donation or action without navigating to a separate page.

See [Embedded Ecard](/docs/v2/embedded-ecard) for configuration details.

---

## Embedding Pages on Your Website

Any ENgrid page can be embedded seamlessly on your website using:

- The [WordPress Promotions Plugin](/docs/v2/wordpress-promotions-plugin-overview) (Gutenberg block or shortcode)
- A custom embed script for non-WordPress sites

See [Embedding ENgrid](/docs/v2/embedding-engrid) for all available embedding options.

---

## Useful URL Parameters for Testing

When reviewing or testing pages, these URL parameters help you see changes and debug issues without affecting live supporters:

| Parameter | What It Does |
| --------- | ------------ |
| `?pbedit` | Jump straight to the EN page builder for this page |
| `?assets=local` | Load your local development CSS/JS instead of the production assets |
| `?assets=branch-name` | Load CSS/JS from a specific feature branch for previewing staged changes |
| `?debug=true` | Enable the debug panel to inspect field values, change layouts, and quick-fill forms |
| `?mode=DEMO` | Load the page in demo mode (if supported by your theme) |

{% callout title="You should know!" %}
Using `?assets=` parameters only changes what **you** see — live supporters are never affected. This makes it safe to preview and test changes directly on production pages.
{% /callout %}
