---
title: ENgrid Installation and Upgrade Guide
description: Step-by-step guide to setting up and upgrading your local ENgrid environment. Learn to install dependencies, compile assets, and upgrade ENgrid scripts for optimal functionality. 

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

## Upgrading the core ENgrid Scripts Package

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

---

# Account Buildout

## Client Theme Dependent on [4Site's Page Template Framework (ENgrid)](https://github.com/4site-interactive-studios/engrid-scripts)

### EN Pages

#### Folder Names
- `Ω1. 4Site Live - Reference Pages for Duplication`
- `Ω1. 4Site Live Legacy - Live pages on Legacy Code`
- `Ω2. 4Site Staging - Quality Assurance Testing`
- `Ω3. 4Site Development - Code Development`
- `ΩΩ. Archive`
- `ΩΩ. Archive - XYZ`

#### Page Names
- `ENGRID - Theming Brand Guide`
- `ENGRID - Left Left 1 Column`
- `ENGRID - Center Left 1 Column`
- `ENGRID - Center Center 1 Column`
- `ENGRID - Center Center 2 Column`
- `ENGRID - Center Right 1 Column`
- `ENGRID - Right Right 1 Column`
- `REFERENCE - Data Capture Page`
- ... (continue with other page names)

### EN Uploaded Assets

#### Folders Names
- `Ω1. 4Site Live Templates`
- `Ω2. 4Site Live Legacy Templates`
- `ΩΩ. Archive`
- `ΩΩ. Archive - XYZ`

#### File Names
- `Ω 4Site Live Templates > engrid.min.css`
- `Ω 4Site Live Templates > engrid.min.js`
- `Ω 4Site Live Templates > loader.js`
- `Ω 4Site Live Templates > logo.png`

### EN Component Library

#### Folder Names
- `Ω1. 4Site Live - ENgrid Page Template and Components`
- `Ω1. 4Site Live Legacy - ENgrid Page Template and Components`
- `Ω2. 4Site Staging - ENgrid Page Template and Components`
- `Ω3. 4Site Development - ENgrid Page Template and Components`
- `ΩΩ. Archive`
- `ΩΩ. Archive - XYZ`

#### Component Names
- `4Site Page Template - Center Left 1 Column`
- `General: Copy: Placeholder Title (Lorem Ipsum)`
- `General: Copy: Placeholder Paragraph (Lorem Ipsum)`
- `General: Form: Personal Information (First Name, Last Name, Email)`
- `Donation: Button (Give $AMOUNT $FREQUENCY)`
