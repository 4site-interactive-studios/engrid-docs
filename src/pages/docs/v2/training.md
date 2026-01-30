---
title: ENgrid Training Guide
description: A comprehensive guide to developing with ENgrid, from setup to deployment
---

## Reference Links

* [ENgrid's Documentation](/) (This website)
* [ENgrid's Script Repo](https://github.com/4site-interactive-studios/engrid) (ENgrid's code dependency)
* [ENgrid's Release Notes](https://www.4sitestudios.com/engrid-release-notes/)

## Setting ENgrid up for local development

[Setting up a local environment](/docs/v2/developing-with-engrid#setting-up-a-local-environment)

## Writing code on ENgrid

[Previewing your changes](/docs/v2/developing-with-engrid#previewing-your-changes)

### Additional Instructions

* Note the code comments at the top of the build files, helpful for debugging
* How to add custom styling to the theme
* How to add custom code to the theme
* The ENgrid Options object
* How to add code to different page states:
  * **onLoad;**
  * **onResize;**
  * **onSubmit;** - bypassed when digital wallets used
  * **onError;** - bypassed when digital wallets used
  * **onValidate;** - bypassed when digital wallets used
    * How to use these hooks in your code too.
* Most useful static functions from the App (ENGrid) class.
* ENgrid Custom Events
  * DonationAmount
  * DonationFrequency
  * EnForm
* ENgrid Global Variables
  * **EngridOptions (read only)** - view ENgrid configuration active on page
  * **EngridVersion (read only)** - view ENgrid Version active on page
  * **EngridPageOptions** - override any ENgrid option on this specific page
  * **window.EngridAmounts** - set custom amounts if not using built in EN functionality.
  * **window.EngridTranslate** - Set custom translations for when a country is selected
  * **window.EngridUpsell** - Configuration for ENgrid's upsell
  * **EngridExitIntent** - Configuration for ENgrid's Exit Intent Lightbox
* How to add a code block to make per page changes

## Bonus ENgrid URL Arguments

[Advanced Development Techniques](/docs/v2/developing-with-engrid#advanced-development-techniques-with-e-ngrid-for-engaging-networks)

## Practical Time!

Let's run through the whole process of making and testing a change to your ENgrid theme.

* Make a feature branch
* Develop the change locally, push it to Github.
* Test it on the Feature branch using URL parameters
  * [Previewing your changes](/docs/v2/developing-with-engrid#previewing-your-changes)
* Test it on the Feature branch using a code block
  * [Feature Branch Documentation](/docs/v2/developing-with-engrid#advanced-development-techniques-with-e-ngrid-for-engaging-networks)
* Merge into live and deploy
  * Recording: [https://cln.sh/ZS0zJJdc](https://cln.sh/ZS0zJJdc)
  * Pages > Component Library > Images and Files (in sidebar) > Ω1. 4Site Live - ENgrid Templates
    * engrid.min.js
    * engrid.min.css

## Upstream ENgrid Scripts Changes

* Clone the ENgrid Scripts repository [https://github.com/4site-interactive-studios/engrid/](https://github.com/4site-interactive-studios/engrid/) and make a new branch.
* Update your "/src/index.ts" and "/src/sass/main.scss" to point to the local assets instead of the NPM assets.
* Run "npm run watch" in your engrid-scripts directory, and "npm run start" in your theme directory.
* Make any necessary changes
* Push your code to Github and open a Pull Request, tagging Fernando as a reviewer. 
