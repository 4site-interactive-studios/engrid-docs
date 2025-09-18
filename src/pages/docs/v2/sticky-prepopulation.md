---
title: Sticky Pre-population
description: Information about, and how to use, the Sticky Pre-population feature in ENgrid.
---

{% callout title="Information" %}
This feature is disabled by default. If you're interested in it, we can enable it in your ENgrid theme.
{% /callout %}

## Overview

Engaging Networks will only pre-populate fields values on the first click of a campaign link. If the supporter visits the page again, the pre-populated values will be lost.

Sticky Pre-population is a feature that retains a supporter's pre-populated field values across _multiple visits to the same page_ after they initially arrive via a campaign link.

It only fills the values of the fields that it is configured to save.

## How it works

When a supporter visits a page from a campaign link, and their information is pre-filled by EN, we save the values of the configured fields into an **encrypted cookie**.

On subsequent visits to the same page, we check for the presence of this cookie. If it exists, we automatically populate the configured fields on the page with the values from the cookie.

Once the supporter completes a gift, we delete the cookie.

## FAQs

### How does Sticky Pre-population differ from RememberMe?

Sticky Pre-population only saves the values for a specific page, and only pre-populates them on that specific page. It is a short lived cookie that is deleted once the supporter completes a gift or it expires in 7 days. Its purpose is to reduce friction for supporters who open the campaign link before they are ready to complete their gift.

If RememberMe is enabled on your theme, Sticky Pre-population will not be active.

### Which fields should I use Sticky Pre-population for?

We recommend enabling it for all required personal information fields on your donation page.

For example, this configuration:

```js
  StickyPrepopulation: {
    fields: [
      "supporter.firstName",
      "supporter.lastName",
      "supporter.emailAddress",
      "supporter.phoneNumber",
      "supporter.address1",
      "supporter.address2",
      "supporter.city",
      "supporter.region",
      "supporter.postcode",
      "supporter.country",
    ],
  },
```

### What happens if a supporter clicks another campaign link to the same page?

In this case, the pre-population from Engaging Networks will take precedence over the values in the cookie and the cookie will be updated with the new values.

### If a supporter forwards a campaign link to someone else, will the new person see the original supporter's information?

No, they will not. The cookie is stored in the original supporter's browser, so only they will see the pre-populated values.
