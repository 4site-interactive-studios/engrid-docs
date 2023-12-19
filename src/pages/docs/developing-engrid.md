---
title: Developing with ENgrid
description: Quidem magni aut exercitationem maxime rerum eos.

---

* **?assets=local** - Loads the uncompressed ENgrid CSS and JS from 
```
https://engrid-wwf.test/dist/engrid.[file-extension]
```
* **?assets=[branch-name]** - Loads the uncompressed ENgrid CSS and JS from the Client Repo's feature branch 
```
https://github.com/4site-interactive-studios/engrid-[client-name]/[branch-name]
```
* **?engridcss=false** - Unloads the ENgrid CSS and applies some base styles to make the ENgrid sections appear in a column
* **?engridjs=false** - Unloads the ENgrid JS


## Engaging Networks Buildout

### Page Template Reference

* [https://pastebin.com/raw/1gQ4M1x0](https://pastebin.com/raw/1gQ4M1x0)


### Variables Reference

* [https://raw.githubusercontent.com/4site-interactive-studios/engrid-scripts/main/packages/styles/src/_engrid-variables.scss](https://raw.githubusercontent.com/4site-interactive-studios/engrid-scripts/main/packages/styles/src/_engrid-variables.scss)


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
