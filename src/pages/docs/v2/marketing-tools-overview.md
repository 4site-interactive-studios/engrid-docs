---
title: Marketing Tools Overview
description: An overview of the 4Site Marketing Tools email system - templates, blocks, and reference emails - along with compatibility and configuration guidelines
---

There are three parts to the marketing tools: a template, customizable blocks, and reference emails.

This documentation will walk you through how to use each of these to build and customize your emails:

- [Template](/docs/v2/marketing-tools-template)
- [Reference Emails](/docs/v2/marketing-tools-reference-emails)
- [Blocks](/docs/v2/marketing-tools-blocks)
- [Building an Email Broadcast](/docs/v2/marketing-tools-building-an-email-broadcast)
- [Updating Variable Replacements](/docs/v2/marketing-tools-updating-variable-replacements)
- [Coding New Blocks](/docs/v2/marketing-tools-coding-new-blocks)

## Compatibility & Guidelines

### Templates & Blocks

For technical reasons, only the templates and blocks developed by 4Site are guaranteed to work together. This means that other blocks may not work properly inside the 4Site template and the 4Site blocks may not work properly inside other templates.

This is because the HTML structure and styling code of the template and blocks must work together.

### Block Configuration Guidelines

Your email template and blocks are set up to be resilient and mobile responsive by default. But there are a few best practices when configuring them to be aware of to ensure the best results.

1. Never set any widths (such as images) to greater than the width of the email (600px). The documentation should state max widths where appropriate. Note that some are less than 600 due to horizontal padding on the blocks (e.g. the divider block).
2. Make sure you only add correct value types into options. Where it states a value should be numerical in pixels, only enter numbers. Unfortunately Engaging Networks does not have validation for these values so we have to be careful.
3. Send test emails to yourself to double check all links work as expected.
4. Use appropriately sized images. This documentation contains guidelines on image sizes for blocks. Images should not break display even if they are oversized, but they may have a larger than desired height on mobile devices.
5. Check the documentation for each block if unsure on anything.

### Email Client Support & Features

Our emails are designed to work fully only on modern clients that are actively developed and have a large user base. The following clients are supported:

- **Desktop Clients:** Apple Mail, Outlook 365, Outlook 2021
- **Mobile Clients:** Gmail, Apple Mail
- **Web Clients:** Gmail

{% callout title="Dark Mode Support" %}
Dark Mode is only fully supported by Apple Mail. Gmail and Outlook provide their own dark mode support, but it is not configurable or customisable by developers. Dark mode is not supported in other clients.
{% /callout %}

{% callout title="Custom Fonts" %}
Custom fonts are only supported by Apple Mail. On other clients, it will fallback to the default device font. For a consistent experience across all devices, use a default web safe font such as: Arial, Helvetica, Verdana, Georgia, Times New Roman or Tahoma.
{% /callout %}

### Images

It is recommended to use high quality images in 2x resolution for optimal appearance on high resolution displays. Placeholder images have been added where appropriate in their target dimensions.
