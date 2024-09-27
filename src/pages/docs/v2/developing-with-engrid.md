---
title: Developing with ENgrid
description: A guide to developing with ENgrid
---

## Setting up a local environment

#### Prerequisites:

- Your ENgrid template code. You can find this on your Github repository.
  - If you’re starting a fresh project, use this [template repo](https://github.com/4site-interactive-studios/engrid/) to get started.
- Node.js (latest LTS) [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- An IDE or text editor, such as [VSCode](https://code.visualstudio.com/), with support for [Prettier](https://prettier.io/) for code formatting.
  - If you’re using VSCode you can support Prettier with [this extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- A method of locally serving your ENgrid assets from [https://your-repo-name.test](https://engrid-org_name.test)
  - There are many ways to do this but one of the simplest is to use a tool such as [Laravel Valet](https://laravel.com/docs/10.x/valet) or [Herd](https://herd.laravel.com/).

#### One you have that set up, and you have your ENgrid project code, you can get started:

- Install your dependencies

```shell
npm install
```

- Activate automatic compiling of your assets on save

```shell
npm install
```

- Build your assets for production

```shell
npm run build
```

---

## Upgrading the core ENgrid Scripts Package

Your ENgrid theme gets the vast majority of its functionality from the engrid package, which is used by your theme code.

That code is hosted on [Github here](https://github.com/4site-interactive-studios/engrid) and in 2 NPM packages [here](https://snyk.io/advisor/npm-package/@4site/engrid-scripts) and [here](https://snyk.io/advisor/npm-package/@4site/engrid-styles).

To bring in new features, you can run this command to upgrade the engrid-script package to the latest version and rebuild your assets:

```shell
npm run rebuild
```

If you need to use a specific engrid version you can run:

```shell
npm uninstall @4site/engrid-styles @4site/engrid-scripts
npm install @4site/engrid-styles@your-version-number
npm install @4site/engrid-scripts@your-version-number
```

You can always view your current ENgrid version in the banner at the start of your compiled JS and CSS assets.

## Making changes to the SCSS or JS files

For SCSS you’ll find the majority of your code in the `/src/sass/page-template-styles.scss` file.

The majority of styles can be customized via CSS custom properties.

{% callout title="You should know!" %}
These properties are named with the convention:
\
`{component__name}-{property_name}_{modifier}`

{% /callout %}

For JS your theme will contain a `/src/scripts/main.js` file. Here you can add any extra JavaScript customizations you might need. `/src/index.ts` is the entry point for loading the ENgrid application. You can modify the Options here to customize the ENgrid components loaded and their functionality.

Refer to the [engrid](https://github.com/4site-interactive-studios/engrid) source for more information.

### Previewing your changes

When working localling your can add `?assets=local` to your URL and ENgrid will load your local assets from `https://your-repo-name.test`.

To preview remote changes on a Github repository, first create a Git branch with your changes on it and push that to Github.

Then, you can use the assets URL parameter `?assets=your-branch-name` to load in those assets from Github without needing to deploy them elsewhere.

You can also add a code block to the page which prevents the need for a URL arugment. This is preferable when moving between pages or when sharing a link to the public for testing.

```javascript
<script>window.EngridLoader = { assets: 'branch-name'};</script>
```

---

## Building and deploying production files

Once you’re happy with everything, you can compile the final assets with

```shell
npm run build
```

Then, upload the engrid.min.css and `engrid.min.js` files from your `/dist` folder to Engaging Networks, overwriting the existing assets.

{% callout title="You should know!" %}
Before doing this you should thoroughly test your changes using a Github branch, especially if you’re upgrading engrid versions.
{% /callout %}

It may take some time for Engaging Network to refresh its cached assets. Until then, you can preview the changes by using the `?assets=flush URL parameter`, which will apply cache-busting to the assets.

## Advanced Development Techniques with ENgrid for Engaging Networks

- `?assets=local` - Loads the uncompressed ENgrid CSS and JS from

```
https://engrid-wwf.test/dist/engrid.[file-extension]
```

- `?assets=[branch-name]` - Loads the uncompressed ENgrid CSS and JS from the Client Repo's feature branch

```
https://github.com/4site-interactive-studios/engrid-[client-name]/[branch-name]
```

- `?engridcss=false` - Unloads the ENgrid CSS and applies some base styles to make the ENgrid sections appear in a column
- `?engridjs=false` - Unloads the ENgrid JS

## Engaging Networks Buildout

### Page Template Reference

- [https://pastebin.com/raw/1gQ4M1x0](https://pastebin.com/raw/1gQ4M1x0)

### Variables Reference

- [https://raw.githubusercontent.com/4site-interactive-studios/engrid/main/packages/styles/src/\_engrid-variables.scss](https://raw.githubusercontent.com/4site-interactive-studios/engrid/main/packages/styles/src/_engrid-variables.scss)

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
