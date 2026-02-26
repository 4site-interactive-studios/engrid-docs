---
title: iFrame Communication
description: Learn how ENgrid manages communication between embedded iframes and parent pages.
---

ENgrid includes a comprehensive iframe communication system that manages bidirectional messaging between an ENgrid form embedded in an iframe and its parent page via `postMessage`.

## How It Works

When an ENgrid page detects it is running inside an iframe, it automatically:

1. **Sends height updates** to the parent page so the iframe can be resized to fit its content
2. **Sends scroll-to-error messages** when form validation fails, so the parent page can scroll to show the error
3. **Sends form submission events** to notify the parent page of successful submissions
4. **Receives messages** from the parent page for actions like pre-populating fields

## Parent Page Integration

The parent page should listen for `postMessage` events from the ENgrid iframe:

```js
window.addEventListener("message", function(event) {
  // Handle height changes
  if (event.data.frameHeight) {
    document.getElementById("engrid-iframe").style.height = event.data.frameHeight + "px";
  }
  // Handle scroll-to-error
  if (event.data.scrollTo) {
    // Scroll to the iframe position
  }
});
```

## Non-iframe Error Scrolling

When not in an iframe, ENgrid also handles smooth scrolling to validation errors when the form is submitted with invalid fields.

## Related

- [Embedding ENgrid](/docs/v2/embedding-engrid) — How to embed ENgrid pages in other websites
- [Post-Donation Embed](/docs/v2/post-donation-embed) — Embedding a second donation form on the thank you page
