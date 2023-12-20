---
title: Markdown Design Test for Stef
description: Quidem magni aut exercitationem maxime rerum eos.

---

* **?assets=local** - Loads the uncompressed ENgrid CSS and JS from 
```
https://engrid-wwf.test/dist/engrid.[file-extension]
```
{% quick-links %}

{% quick-link title="Installation" icon="installation" href="/" description="Step-by-step guides to setting up your system and installing the library." /%}

{% quick-link title="Architecture guide" icon="presets" href="/" description="Learn how the internals work and contribute." /%}

{% quick-link title="Components" icon="plugins" href="/" description="Extend the library with third-party components or write your own." /%}

{% quick-link title="API reference" icon="theming" href="/" description="Learn to easily customize and modify your app's visual design to fit your brand." /%}

{% /quick-links %}


## Page Template Reference

* [https://pastebin.com/raw/1gQ4M1x0](https://pastebin.com/raw/1gQ4M1x0)

{% accordion %}
  {% accordion-item title="Section 1 Title" %}
    Content for Section 1 goes here.
  {% /accordion-item %}
  {% accordion-item title="Section 2 Title" %}
    Content for Section 2 goes here.
  {% /accordion-item %}
  {% accordion-item title="Section 3 Title" %}
    Content for Section 3 goes here.
  {% /accordion-item %}
{% /accordion %}

{% callout type="warning" title="Oh no! Something bad happened!" %}
This is what a disclaimer message looks like. You might want to include inline `code` in it. Or maybe you’ll want to include a [link](/) in it. I don’t think we should get too carried away with other scenarios like lists or tables — that would be silly.
{% /callout %}

{% callout title="You should know!" %}
This is what a disclaimer message looks like. You might want to include inline `code` in it. Or maybe you’ll want to include a [link](/) in it. I don’t think we should get too carried away with other scenarios like lists or tables — that would be silly.
{% /callout %}

### Advanced "Row"
```css
1. page-alert
2. content-header
3. body-headerOutside
4. body-header
5. body-title
6. body-banner
7. body-bannerOverlay
8. body-top
9. body-main
10. body-bottom
11. body-footer
12. body-footerOutside
13. body-footerSpacer
14. content-preFooter
15. content-footer
16. page-backgroundImage
17. page-backgroundImageOverlay
18. page-customCode
```

---
## Global Variables

### EngridAmounts 

With that variable you can set dynamic amounts at the page level.

Example:

```
window.EngridAmounts = {
  "onetime": {
    amounts: {
      "10": 10,
      "30": 30,
      "50": 50,
      "100": 100,
      "Other": "other",
    },
    default: 30,
  },
  "monthly": {
    amounts: {
      "5": 5,
      "15": 15,
      "25": 25,
      "30": 30,
      "Other": "other",
    },
    default: 15,
  },
};
```

When you're using the `window.EngridAmounts` option, the user-selected amount will persist when changing frequencies if:

1. We're coming from a backend error.
2. We have an amount defined via URL.
3. The user selected a non-default amount.

**Known Limitations**

1. This option does not work with NSG or other similar native EN features
2. You need to remove any Swap List from the donation amount field. If you don't there will be race conditions between the swap list and our code which will create unpredictable and inconsistent behaviors.
