---
title: What is ENgrid Scripts and Client Theme?
description: Learn about ENgrid Scripts and ENgrid Client Themes
---

As you get started working with ENgrid, it is good to discuss what a "Client Theme" is and how it relates to the rest of the ENgrid upstream "ENgrid Scripts" code base.

## What is "ENgrid Scripts"?

We will start by discussing the ENgrid Scripts code base, as it is the core dependency that is a part of every ENgrid Client Theme. It contains two packages, one for styles ([@engrid-styles](https://www.npmjs.com/package/@4site/engrid-styles)) and one for scripts ([@engrid-common](https://www.npmjs.com/package/@4site/engrid-common)), and both are required to build an ENgrid theme. ENgrid Scipts is the code that all ENgrid clients share. Generally, if we do development on something that we think more than one client will benefit from, we do it in ENgrid Scripts so that can happen. Otherwise, we do it in the Client Theme so that only your client is impacted.

## What is a "Client Theme"?

Put simply, a "Client Theme" is an extension of the previously mentioned "Ngrid Scripts" code base that you then customize and expand upon based on your specific needs. When you do this, the upstream "ENgrid Scripts" code base becomes a dependency in your project. Think of it in the same way your website might be built on WordPress or uses jQuery. Once you start using it, they become dependencies in your project that you build and customize upon, while those projects themselves continue active development.

## Pulling in regular updates from "ENgrid Scirpts" aka "engrid-scripts" and "upstream changes"

As you continue work on your client theme, adding in any customizations or enhancements, you will want to regularly pull in upstream changes being made on ENgrid Scripts. Work is happening there regularly, with many code commits per month spanning bug fixes, enhancements, and all new features. You can read the code repo's commit log ([@engrid-scripts](https://github.com/4site-interactive-studios/engrid-scripts/commits/main/)) or read our regularly updated [release notes](https://www.4sitestudios.com/engrid-release-notes/). Both the @engrid-styles and @engrid-common dependencies are versioned to help you understand the version you're using, the version being referenced in the change logs, and the latest published version available for upgrading.

We recommend keeping your "ENgrid Scripts" updates on a regular cadence of at least once a month, with a code freeze from November to December unless it's absolutely critical.

## How does 4Site account for Engaging Networks product releases?

First, 4Site is subscribed to all the EN marketing channels, we have monthly partner meetings, plus quarterly check-ins with our partner manager to stay abreast of any planned changes. We are also on the Partner’s Slack channel, which helps us stay abreast of any unplanned changes that happen to get rolled out too.

Only in a few instances have we gotten access to features before their live rollout. More often than not, we just know about them and set aside some estimated time for the work, but we can’t do any real prep until they’re live.

VGS was one of those instances where we did get early access, though our time with it before rollout was less than we would have wanted by at least 1-2 months. Once we did have access, we assigned a tech lead to work on a general solution that applied to all our EN clients. This code went upstream in engrid-scripts, and we equally distributed the recorded time across the clients who would be getting it. Then, we performed per-client enhancements and additional testing, including for all clients soft rollout testing on a single page. After the hard rollout of VGS happened, we then monitored for any reported issues and would asses them to be either client specific or generally applicable and would take appropriate action in either instance. If client-specific, we resolve the issue for the client. Otherwise, we made changes upstream on engrid-scirpts and then updated each clients with the hotfix ASAP.

## If 4Site manages pulling in regular ENgrid Scripts changes, how does a client review and sign-off on any changes that affect forms?

Whenever 4Site makes a code change that will be applied to all the EN page templates, be it simply pulling in the latest upstream changes from ENgrid or changing your ENgrid client theme, we always stage it for client testing and final approval. When this happens, you will get an update explaining:

- how to test
- what this version fixes
- what this version updates
- what this version adds
- what this version removes

## How can you QA test ENgrid Script or Client Theme changes?

Any time you’ve seen `assets=` in the URL, that is an example of code changes being staged for testing before a broader rollout. And if there is a page level change, meaning a change in the page itself rather than just code, then we create a new page for QA testing. Sometimes updates it may be either or scenario, and other times it may be both.
