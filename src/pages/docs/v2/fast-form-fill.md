---
title: Fast Form Fill
description: Learn how ENgrid's fast form fill feature hides pre-populated form sections for a faster experience.
---

The Fast Form Fill feature detects when form sections are already filled in (e.g., from Remember Me or pre-population) and hides them to speed up the form experience for returning supporters.

## How It Works

1. Add the CSS class `fast-personal-details` or `fast-address-details` to EN form blocks (`.en__component--formblock`)
2. ENgrid checks if ALL mandatory inputs within those blocks are already filled
3. If all mandatory fields are filled, ENgrid sets body data attributes that CSS uses to hide those sections

## CSS Classes

| Class | Purpose |
|-------|---------|
| `fast-personal-details` | Add to the form block containing personal details (name, email, etc.) |
| `fast-address-details` | Add to the form block containing address fields |

## Body Data Attributes

| Attribute | Value | Meaning |
|-----------|-------|---------|
| `data-engrid-hide-fast-personal-details` | `"true"` | All personal detail fields are filled |
| `data-engrid-hide-fast-address-details` | `"true"` | All address fields are filled |

## Integration with Remember Me

If the `RememberMe` option is enabled, Fast Form Fill waits for the Remember Me data to load before checking field values. It also listens for the "Clear autofill" action to re-show the form sections.

## Related Features

- [Remember Me](/docs/v2/remember-me) — Stores and restores form field values
- [Welcome Back](/docs/v2/welcome-back) — Shows a welcome message for returning supporters
