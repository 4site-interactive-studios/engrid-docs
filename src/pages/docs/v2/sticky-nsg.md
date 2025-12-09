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

## Value precedence

The following order of precedence applies when determining which donation amounts to display:

1. **Form Dependencies** - If Form Dependencies are configured to set default amounts, these will take precedence over all other sources
2. **Engaging Networks NSG values** - Values from campaign links with NSGs enabled
3. **StickyNSG cookie values** - Values saved from previous visits
4. **Default page values** - Standard default amounts configured on the page

{% callout title="Important" %}
If you have Form Dependencies configured to set default donation amounts, they will override StickyNSG values. If you want default amounts for cold visitors that get overwritten by StickyNSG when applicable, consider using ENgrid's Custom Swap List definitions instead of Form Dependencies.
{% /callout %}

## Testing

### Verifying NSG values exist

To verify that a supporter has NSG values configured, check the "Previous Contributions" section in the "Activity Summary" widget on the supporter's record in Engaging Networks. This will show the Next Suggested Gift values that will be used.

### Testing without email blasts

You can test StickyNSG functionality without sending email blasts by chaining from a data capture page. Create a data capture page that redirects to your StickyNSG-enabled donation page using the `?chain` parameter. When you submit the data capture page with a supporter's email address, it will chain to the donation page and trigger the NSG experience, allowing you to test the StickyNSG behavior.

## FAQs

### What if the supporter visits a page with EN NSGs and they also have a StickyNSG cookie?

In this case, the values from EN will take precedence over the values in the cookie.

### StickyNSG is enabled on my theme, but I don't want the values to be used on a specific page. How can I do that?

If you have a specific campaign where you don't want StickyNSG to be active, you can disable it on a per-page basis by adding a code block with the following content to your page:

```html
<script>
  window.EngridPageOptions = window.EngridPageOptions || {}
  window.EngridPageOptions.StickyNSG = false
</script>
```

### I'm sending an email with a link to a donation page, but I don't want StickyNSG to set a cookie when the supporter clicks the link. How can I do that?

You can add the query parameter `skipstickynsg=true` to your link. This will prevent StickyNSG from setting a cookie when the supporter clicks the link.

### How do Form Dependencies interact with StickyNSG?

Form Dependencies that set default donation amounts will take precedence over StickyNSG values. If you have Form Dependencies configured to set default amounts, those defaults will override any StickyNSG cookie values.

If you want to have default amounts for cold visitors (those without StickyNSG cookies) while still allowing StickyNSG values to take precedence when available, consider using Swap List definitions instead of Form Dependencies. Swap Lists allow you to define default amounts that will be overwritten by StickyNSG values when applicable, providing the best of both worlds.
