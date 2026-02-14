---
title: Auto Submit
description: Learn how ENgrid's auto-submit feature works to automatically submit forms.
---

The Auto Submit feature allows ENgrid forms to be automatically submitted without user interaction. This is useful for scenarios like chained form submissions or automated workflows.

## How It Works

When enabled, the Auto Submit component will automatically trigger form submission after the page loads. This is typically used in conjunction with pre-populated form fields (e.g., from URL parameters or the `?chain` parameter) to create seamless multi-step workflows.

## Usage

Auto Submit is controlled via the `autoSubmit` option in your ENgrid configuration or via URL parameters. When the conditions are met, the form will submit automatically without requiring the user to click the submit button.
