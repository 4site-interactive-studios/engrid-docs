---
title: Contributing to ENgrid Scripts
description: How to contribute how to the ENgrid Scripts library
---

## What is ENgrid Scripts?

ENgrid Scripts is the core library behind your ENgrid theme. It contains all the universal code that is shared between all ENgrid theme implementations. This is delivered as a TypeScript and SCSS module that is installed in your theme.

You can find the source code for ENgrid Scripts [here](https://github.com/4site-interactive-studios/engrid).

You may want to contribute to ENgrid Scripts if you have a feature request, bug fix, or other improvement that you think would benefit all ENgrid themes.

## How to contribute to ENgrid Scripts

Before you start contributing, we suggest you reach out to us using Productive or GitHub to talk about the issue. This is because any solution that goes into ENgrid Scripts will affect all themes that use it, and any changes will need to work for everyone to be accepted. We may also be working on a similar issue or have a solution in mind.

If we don't think your issue is a good fit for ENgrid Scripts, we may suggest you implement it in your theme instead. You can leverage all of ENgrid Scripts' components to create solutions that are specific to your theme.

The steps to contribute to ENgrid Scripts are as follows:

- Create a fork of the [engrid repository](https://github.com/4site-interactive-studios/engrid)
- Develop your solution in your fork
- Open a Pull Request from your fork to the `main` branch of engrid
- Your PR should have necessary info for us to test it, including a thorough description of the issue, your solution and links to test pages that demonstrate the issue and your solution.
  We test and merge the code, or give them feedback on what needs to change for it to be accepted.

Like for your theme, developing on ENgrid Scripts requires a good understanding of TypeScript and SCSS, as well as the ENgrid theme structure. To use a local build of ENgrid Scripts in your theme, you can modify your `/src/index.ts` and `/src/sass/main.scss` files to import local copies of the modules. There should be commented out lines of code to do this for you in those files, that assumes you have the "engrid" folder in the same folder as your "engrid-theme" folder.
