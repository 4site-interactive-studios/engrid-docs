---
title: Supporter Hub Enhancements
description: This page shows how ENgrid automatically enhances Engaging Networks Supporter Hub pages with improved user experience features
---

## Overview

The Supporter Hub component adds special enhancements to Engaging Networks Supporter Hub pages. It improves the user experience when supporters manage their recurring donations by making credit card updates more intuitive and ensuring donation amounts display correctly.

{% callout title="You should know!" %}
This component only runs on Supporter Hub pages and activates automatically. No configuration is required.
{% /callout %}

## How It Works

The component monitors the Supporter Hub page for overlays (modal windows) and automatically applies two key enhancements:

1. **Automatic Credit Card Update Mode** - Clicking on the credit card field automatically activates edit mode
2. **Currency Symbol Fix** - Ensures donation amounts display with proper currency symbols

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
