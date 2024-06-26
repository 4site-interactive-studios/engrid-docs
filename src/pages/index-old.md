---
title: Getting started
pageTitle: ENgrid - Engaging Networks Template Framework
description: Supercharge your Engaging Networks page templates. ENgrid supports a wide variety of features that are not available natively in EN.
---

# Introduction to ENgrid Technical Documentation

Welcome to the **ENgrid Training Walkthrough and Documentation**. This comprehensive guide is designed to familiarize you with ENgrid, and customize your Engaging Network's Forms. 

This guide will take you through the essential steps and best practices to leverage ENgrid effectively.

## Quick Steps for ENgrid Technical Documentation

### Setting Up a Local Environment
Begin with the right tools - obtain your ENgrid template from GitHub and set up your development environment with Node.js and a preferred IDE.

- Obtain your ENgrid template code [(available on your Github repository)](https://github.com/4site-interactive-studios).
- Install [Node.js](https://nodejs.org/en) (latest LTS version).
- Choose an IDE or text editor like VSCode with Prettier support for code formatting.
- Use a method to locally serve your ENgrid assets, such as Laravel Valet or Herd​.
   

### Familiarizing Yourself With ENgrid
- Understand the functionalities and features of ENgrid for efficient usage and customization​.

### Working on Your ENgrid Theme Code
Personalize your theme with SCSS or JS adjustments, and tweak component functionality as needed.

- Customize your theme by making changes to the SCSS or JS files.
- Find SCSS code in the `/src/sass/page-template-styles.scss` file.
- Add JavaScript customizations in the `/src/scripts/main.js` file.
- Modify options for component functionality in the `/src/index.ts` entry point.

### Previewing Your Changes
Easily preview local or remote changes to ensure everything looks perfect.

- To preview local changes, add `?assets=local` to your URL.
- For remote changes, push a Git branch with your changes to Github and use\
`?assets=your-branch-name` to load assets.

### Building and Deploying Production Files
Compile, test, and deploy your customizations for an enhanced user experience.

- Compile final assets with `npm run build`.
- Upload `engrid.min.css` and `engrid.min.js` from the `/dist` folder to Engaging Networks.
- Overwrite existing assets and thoroughly test your changes.
- Use `?assets=flush` for cache-busting to preview the changes on Engaging Networks​.
