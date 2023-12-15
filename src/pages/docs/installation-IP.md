---
title: Installation
description: Quidem magni aut exercitationem maxime rerum eos.

---

## Setting up a local environment

#### Prerequisites:

* Your ENgrid template code. You can find this on your Github repository.
    * If you’re starting a fresh project, use this [template repo](https://github.com/4site-interactive-studios/engrid/) to get started.
* Node.js (latest LTS) [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
* An IDE or text editor, such as [VSCode](https://code.visualstudio.com/), with support for [Prettier](https://prettier.io/) for code formatting.
    * If you’re using VSCode you can support Prettier with [this extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* A method of locally serving your ENgrid assets from [https://your-repo-name.test](https://engrid-org_name.test)
    * There are many ways to do this but one of the simplest is to use a tool such as [Laravel Valet](https://laravel.com/docs/10.x/valet) or [Herd](https://herd.laravel.com/).

#### One you have that set up, and you have your ENgrid project code, you can get started:

* Install your dependencies
```shell 
npm install
```
* Activate automatic compiling of your assets on save
```shell
npm install
```
* Build your assets for production
```shell
npm run build
```
---

## Upgrading the core ENgrid Scripts Package {#upgrading-the-core-engrid-scripts-package}

Your ENgrid theme gets the vast majority of its functionality from the engrid-scripts package, which is used by your theme code.

That code is hosted on [Github here](https://github.com/4site-interactive-studios/engrid-scripts) and in 2 NPM packages [here](https://snyk.io/advisor/npm-package/@4site/engrid-common) and [here](https://snyk.io/advisor/npm-package/@4site/engrid-styles).

To bring in new features, you can run this command to upgrade the engrid-script package to the latest version and rebuild your assets:

```shell
npm run update
```

If you need to use a specific engrid-script versions you can run:

```shell
npm uninstall @4site/engrid-styles @4site/engrid-common
npm install @4site/engrid-styles@your-version-number
npm install @4site/engrid-common@your-version-number
```

You can always view your current ENgrid version in the banner at the start of your compiled JS and CSS assets.
