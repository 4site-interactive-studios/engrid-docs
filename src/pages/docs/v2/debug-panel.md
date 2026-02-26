---
title: Debug Panel
description: Learn how to use ENgrid's debug panel for development and testing.
---

ENgrid includes a comprehensive debug panel for developers and QA testers. The panel provides quick access to form filling, layout switching, and other testing utilities.

## Activating the Debug Panel

Add `?debug` to any ENgrid page URL to activate the debug panel:

```
https://support.example.org/page/12345/donate/1?debug
```

The debug panel state persists across page views via session storage (key: `engrid_debug_panel`).

## Features

### Quick Fill

The debug panel includes preset data for quickly filling form fields:

- **Personal Info (General)** — Static test data (4Site Studio, en-test@4sitestudios.com)
- **Personal Info (Unique)** — Timestamp-based unique first name and email for testing
- **US Address** — Washington DC test address
- **UK Address** — London test address
- **Credit Card** — Test credit card numbers

### Layout Switching

If your theme supports multiple layouts, the debug panel provides buttons to quickly switch between them.

### Hidden Fields

The debug panel can reveal all hidden form fields on the page, making it easy to inspect and modify hidden field values during testing.

## Related: Debug Hidden Fields

ENgrid also includes a separate utility that makes hidden form fields visible when debug mode is active. This helps developers see all the data being submitted with the form, including hidden fields set by JavaScript.
