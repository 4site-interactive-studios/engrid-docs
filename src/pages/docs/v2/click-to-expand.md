---
title: Click to Expand (add to form component)
description: Learn how use Click to Expand in ENgrid.
---

## Overview

The Click to Expand feature allows you to create collapsible sections within your ENgrid pages. By applying the `click-to-expand` class to a text component. Users will see the first few lines of your content, with the option to expand and view more. This is particularly useful for mobile users or when you want to keep the page layout clean and organized.

When a user clicks on the collapsed section, it will expand to reveal the hidden content. This functionality enhances the user experience by allowing users to control what content they want to see without overwhelming them with too much information at once. This feature is available on both desktop and mobile devices, but you can also choose to make it mobile-only for a more tailored experience.

## Mobile-Only Click to Expand

You can add a second class to the same component (e.g., `click-to-expand click-to-expand-mobile` ), and this will cause this section to only appear as a "click-to-expand" on mobile. When viewed on desktop, the entire contents of the area will remain visible ( [recording](https://cln.sh/rsb696qg) ).

## Accessibility

To add a summarized title to the collapsed section for users with assistive technologies, add an element in your text block with the `click-to-expand-screenreader-tip` class ( [example](https://cleanshot.com/share/m1XRwrXt) ). This element will be visually hidden but will provide context to screen reader users about the content that can be expanded.

{% callout title="Tip!" %}
By default, the expandable content will be announced as "Show more" and "Expanded content" when toggled, but providing a specific tip can make it clearer and more informative for screen reader users.
{% /callout %}
