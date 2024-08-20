---
title: Upgrading from engrid-common
description: The ENgrid Scripts package got renamed fom `@4site/engrid-common` to `@4site/engrid-scripts`. If you are upgrading from an older version, you will need to update your package.json file to reflect the new package name.
---

The ENgrid Scripts package got renamed fom `@4site/engrid-common` to `@4site/engrid-scripts`. If you are upgrading from an older version, you will need to update your package.json file to reflect the new package name.

## Upgrading the core ENgrid Scripts Package

First, you will need to remove the old package and install the new one:

```shell
npm uninstall @4site/engrid-common
npm install @4site/engrid-scripts --save-dev
```

Next, you will need to search your ENgrid Theme for any references to `@4site/engrid-common` and update them to `@4site/engrid-scripts`.

{% callout title="You should know!" %}
If you want to get the latest ENgrid Scripts package when using the `npm run rebuild` command, you will need to update your `package.json` file to add an "\*" to the version number like so:

```json
"@4site/engrid-scripts": "*"
```

{% /callout %}

Once you have replaced all references to `@4site/engrid-common` with `@4site/engrid-scripts`, you can run the following command to rebuild your assets:

```shell
npm run rebuild
```

If you need to use a specific version of the ENgrid Scripts package, you can run:

```shell
npm uninstall @4site/engrid-styles @4site/engrid-scripts
npm install @4site/engrid-styles@your-version-number
npm install @4site/engrid-scripts@your-version-number
```

You can always view your current ENgrid version in the banner at the start of your compiled JS and CSS assets.

If you want to know what's new in the latest version of ENgrid, you can check out the [release notes](https://www.4sitestudios.com/engrid-release-notes/).
