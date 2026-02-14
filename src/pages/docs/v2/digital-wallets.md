---
title: Digital Wallets
description: Learn how ENgrid integrates with digital wallet payment options including Google Pay, Apple Pay, PayPal, Venmo, and Donor Advised Funds.
---

ENgrid provides automatic integration with Engaging Networks' digital wallet payment options. When digital wallets are enabled on your EN account, ENgrid enhances their behavior with proper payment type selection, visibility management, and body data attributes for conditional styling.

## Supported Wallets

ENgrid supports three categories of digital wallets:

| Wallet Type | Payment Methods | Container ID |
|-------------|----------------|--------------|
| **Stripe** | Google Pay, Apple Pay | `#en__digitalWallet__stripeButtons__container` |
| **PayPal Touch** | PayPal One Touch, Venmo | `#en__digitalWallet__paypalTouch__container` |
| **DAF** | Donor Advised Fund (Chariot) | `#en__digitalWallet__chariot__container` |

## How It Works

1. ENgrid checks for the `#en__digitalWallet` element on the page. If it's not present, all wallet-related body data attributes are set to `"false"`.
2. For each wallet type, ENgrid checks if the wallet container has child elements (indicating the wallet has loaded).
3. If a wallet hasn't loaded yet, a **MutationObserver** watches for when it dynamically appears.
4. Once a wallet loads, ENgrid adds it as an option to the payment type field and sets the appropriate body data attributes.

## Body Data Attributes

ENgrid sets the following `data-` attributes on the `<body>` element, which you can use for conditional CSS:

- `data-engrid-payment-type-option-stripedigitalwallet` — `"true"` or `"false"`
- `data-engrid-payment-type-option-apple-pay` — `"true"` or `"false"`
- `data-engrid-payment-type-option-google-pay` — `"true"` or `"false"`
- `data-engrid-payment-type-option-paypal-one-touch` — `"true"` or `"false"`
- `data-engrid-payment-type-option-venmo` — `"true"` or `"false"`
- `data-engrid-payment-type-option-daf` — `"true"` or `"false"`

## CSS Classes

Each wallet container automatically receives CSS classes for use with the Give By Select feature:

- `giveBySelect-stripedigitalwallet` / `showif-stripedigitalwallet-selected`
- `giveBySelect-paypaltouch` / `showif-paypaltouch-selected`
- `giveBySelect-daf` / `showif-daf-selected`

## Fallback Behavior

If the default payment type is set to `stripedigitalwallet` but Stripe wallets are not available on the page, ENgrid automatically falls back to `card` as the payment type.

## Requirements

- Digital wallets must be enabled in your Engaging Networks account
- The `#en__digitalWallet` element must be present on the page (added by EN when wallets are configured)
