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

When a supporter visits a page from a campaign link that has NSGs enabled in Engaging Networks, we save their NSG values in a cookie. The cookie stores both one-time and recurring donation amounts, along with the default selected amount based on the `nextSuggestedGift` property.

On subsequent visits to donation pages where NSG is not active (i.e., not from a campaign link with NSGs), we check for the presence of this cookie. If it exists, we automatically populate `window.EngridAmounts` with the values from the cookie, which populates the Donation Amounts on the page.

The cookie is automatically deleted when the gift process is complete (after a successful donation).

### Cookie details

- **Cookie name**: `engrid-sticky-nsg`
- **Expiration**: 30 days
- **Path**: `/` (available site-wide)
- **Storage format**: JSON containing both `onetime` and `monthly` amount objects with their respective amounts and default values

## Value precedence

The following order of precedence applies when determining which donation amounts to display:

1. **Form Dependencies & Swap Lists** - If Form Dependencies or Swap Lists are configured to set default amounts, these will take precedence over all other sources
2. **Engaging Networks NSG values** - Values from campaign links with NSGs enabled
3. **StickyNSG cookie values** - Values saved from previous visits
4. **Default page values** - Standard default amounts configured on the page

{% callout title="Important" %}
If you have Form Dependencies or Swap Lists configured to set default donation amounts, they will override NSG values set by Engaging Networks. If you want default amounts for cold visitors that get overwritten by NSGs when applicable, consider using ENgrid's Custom Donation Amounts definitions instead of Form Dependencies or Swap Lists.
{% /callout %}

## Testing

### Verifying NSG values exist

To verify that a supporter has NSG values configured, check the "Previous Contributions" section in the "Activity Summary" widget on the supporter's record in Engaging Networks. This will show the Next Suggested Gift values that will be used.

### Testing without email blasts

You can test StickyNSG functionality without sending email blasts by chaining from a data capture page. Create a data capture page that redirects to your StickyNSG-enabled donation page using the `?chain` parameter. When you submit the data capture page with a supporter's email address, it will chain to the donation page and trigger the NSG experience, allowing you to test the StickyNSG behavior. Remember to remove the `?chain` parameter on subsequent visits to see the effect of the StickyNSG cookie.

## FAQs

### What if the supporter visits a page with EN NSGs and they also have a StickyNSG cookie?

In this case, the values from EN will take precedence over the values in the cookie. The StickyNSG cookie will not be applied when NSG is active on the page, ensuring that campaign-specific NSG values always take priority. Additionally, if NSG is active on the page, a new StickyNSG cookie will be created with the current NSG values, overwriting any previous cookie.

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

### How do Form Dependencies and Swap Lists interact with StickyNSG?

Form Dependencies and Swap Lists that set default donation amounts will take precedence over NSG values - both EN's NSG values and StickyNSG values. If you have Form Dependencies or Swap Lists configured to set default amounts, those defaults will override any NSG values.

If you want to have default amounts for cold visitors while still allowing NSG values to take precedence when available, consider using the Donation Amounts functionality of ENgrid instead of Form Dependencies or Swap Lists. This allows you to define default amounts that will be overwritten by NSG values when applicable, providing the best of both worlds.

## Technical details

### Cookie creation and application logic

- **Cookie creation**: The StickyNSG cookie is only created when NSG is active on the page (i.e., when `window.EngagingNetworks.suggestedGift` exists and contains values). This ensures the cookie is only set when a supporter visits from a campaign link with NSGs enabled.

- **Cookie application**: The StickyNSG cookie is only applied when NSG is NOT active on the page. If NSG is active, the EN NSG values take precedence and the cookie is not used.

- **Cookie structure**: The cookie stores a JSON object with the following structure:

  ```json
  {
    "onetime": {
      "amounts": { "25": "25", "50": "50", "100": "100" },
      "default": 100,
      "stickyDefault": false
    },
    "monthly": {
      "amounts": { "10": "10", "25": "25", "50": "50" },
      "default": 25,
      "stickyDefault": false
    }
  }
  ```

- **Value application**: When the cookie is applied, its values are set to `window.EngridAmounts`, which populates the donation form amounts and default selections.

### Debugging

To debug StickyNSG behavior, you can check:

- Browser cookies for `engrid-sticky-nsg`
- Browser console for StickyNSG logger messages (prefixed with 📌)
- `window.EngridAmounts` to see what values are being applied
- `window.EngagingNetworks.suggestedGift` to see if NSG is active on the page
