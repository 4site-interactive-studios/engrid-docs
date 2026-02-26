---
title: Stripe Financial Connections
description: Learn how ENgrid integrates with Stripe Financial Connections for ACH bank account verification.
---

ENgrid supports Stripe Financial Connections as a replacement for Plaid, enabling bank account verification for ACH payments on donation forms.

## Overview

When a supporter selects ACH as their payment method, Stripe Financial Connections provides a secure way to verify their bank account. ENgrid manages the integration by:

1. Detecting when the ACH/bank payment type is selected
2. Launching the Stripe Financial Connections modal when the form is submitted
3. Handling the bank account verification flow
4. Resetting the submit button if the user cancels the payment flow

## How It Works

- The component automatically activates when ACH payment is available on the page
- When the donor submits the form with ACH selected, the Stripe Financial Connections modal opens
- After successful bank verification, the form submission continues
- If the user cancels, the submit button resets so they can try again or choose a different payment method

## Requirements

- Stripe must be configured as a payment processor in your Engaging Networks account
- ACH payments must be enabled on the donation page
