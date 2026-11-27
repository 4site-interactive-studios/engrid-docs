---
title: Supporter Hub Enhancements
description: This page shows how ENgrid automatically enhances Engaging Networks Supporter Hub pages with improved user experience features
---

## Overview

The Supporter Hub component adds special enhancements to Engaging Networks Supporter Hub pages. It saves a click when supporters update a credit card, shows donation amounts with the right currency symbol, blocks repeat clicks on submit buttons, and adds keyboard and screen reader support.

{% callout title="You should know!" %}
This component only runs on Supporter Hub pages and activates automatically. No configuration is required.
{% /callout %}

## How It Works

The component monitors the Supporter Hub page for overlays (modal windows) and applies these enhancements:

1. **Automatic Credit Card Update Mode** - Clicking on the credit card field automatically activates edit mode
2. **Currency Symbol Fix** - Ensures donation amounts display with proper currency symbols
3. **Duplicate Submit Protection** - Ignores repeat clicks on a submit button for 10 seconds
4. **Keyboard and Screen Reader Support** - Makes gadgets, overlays, and status messages work with a keyboard and a screen reader

## Features

### Auto-Activate Credit Card Edit Mode

On Supporter Hub pages, when supporters want to update their credit card:

**Default Behavior:**
1. Click the credit card field
2. Manually click an "Update" button
3. Enter new credit card information

**With ENgrid:**
1. Click the credit card field
2. Edit mode automatically activates
3. Enter new credit card information immediately

This removes an unnecessary step and makes the process more intuitive.

### Currency Symbol Display Fix

The component ensures that donation amounts in the Supporter Hub overlays display with proper currency symbols by marking them as processed. This prevents issues with currency symbol formatting in the hub interface.

### Duplicate Submit Protection

After a supporter clicks a submit button on the hub, ENgrid ignores more clicks on that button for 10 seconds. Since release 6.4.0 (July 2026), Engaging Networks also processes a single update in the Update Recurring Donation gadget however many times its button is clicked. ENgrid's check covers every submit button on the hub, including the ones EN doesn't protect.

### Keyboard and Screen Reader Support

- Each gadget works as a button: it gets `role="button"` and a label, and opens with Enter or Space
- Each overlay is a labelled dialog (`role="dialog"`, `aria-modal="true"`). The rest of the page is inert while it's open, and ESC closes it
- Login, save, and error messages are read aloud through live regions
- Fields inside overlays get the same treatment that [A11y](/docs/v2/form-field-enhancements#accessibility-a11y) gives the main form

## Technical Details

### Automatic Activation

The component only runs when:
- The page is a Supporter Hub page (`window.pageJson.pageType === "supporterhub"`)
- No configuration needed

### Overlay Detection

The component uses a `MutationObserver` to watch for overlays appearing on the page:

- Monitors the form for added DOM nodes
- Detects overlays with classes `.en__hubOverlay` or `.en__hubPledge__panels`
- Applies enhancements when overlays are found
- Also checks for existing overlays on page load

## Debugging

The component includes logging to help troubleshoot:

```javascript
// Check the browser console for messages like:
// 🛖 SupporterHub: Enabled
// 🛖 SupporterHub: Overlay found
// 🛖 SupporterHub: Credit Card field focused
```

Look for the 🛖 emoji in your browser console to see SupporterHub activity.
