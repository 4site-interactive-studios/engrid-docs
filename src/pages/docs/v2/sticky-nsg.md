---
title: Sticky Next Suggested Gift
description: Information about, and how to use, the Sticky Next Suggested Gift feature in ENgrid.
---

{% callout title="Information" %}
This feature is disabled by default. If you're interested in it, we can enable it in your ENgrid theme.
{% /callout %}

## Overview

StickyNSG is a feature that retains a supporter's Next Suggested Gift (NSG) values across multiple visits to your donation pages.

## How it works

When a supporter visits a page from a campaign link that has NSGs enabled in Engaging Networks, we save their NSG values in a cookie. 

On subsequent visits to donation pages, we check for the presence of this cookie. If it exists, we automatically populate the Donation Amounts on the page with the values from the cookie.

The next time a supporter completes a gift, we delete the cookie.

## FAQs

### What if the supporter visits a page with EN NSGs and they also have a StickyNSG cookie?

In this case, the values from EN will take precedence over the values in the cookie.

### StickyNSG is enabled on my theme, but I don't want the values to be used on a specific page. How can I do that?

If you have a specific campaign where you don't want StickyNSG to be active, you can disable it on a per-page basis by adding a code block with the following content to your page:

```html
<script>
  window.EngridPageOptions = window.EngridPageOptions || {};
  window.EngridPageOptions.StickyNSG = false;
</script>
```

### I'm sending an email with a link to a donation page, but I don't want StickyNSG to set a cookie when the supporter clicks the link. How can I do that?

You can add the query parameter `skipstickynsg=true` to your link. This will prevent StickyNSG from setting a cookie when the supporter clicks the link.
