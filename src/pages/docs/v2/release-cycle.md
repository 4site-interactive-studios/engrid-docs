---
title: Release Cycle & Code Updates
description: How ENgrid releases are managed, including monthly updates, staging, QA, and deployment processes
---

ENgrid follows a regular release cadence for both the core ENgrid Scripts framework and individual client themes. This page explains how updates are delivered, tested, and deployed.

{% callout title="Looking for developer deployment docs?" %}
For step-by-step deployment instructions, see [Deploying ENgrid Assets](/docs/v2/deploying-assets). For 4Site's internal deployment procedures, see [4Site SOP: ENgrid Development & Code Deployment](/docs/v2/4site-sop-engrid-development-code-deployment).
{% /callout %}

---

## Monthly Release Cadence

4Site manages the ENgrid Page Template Framework on a monthly release cycle to deliver ongoing enhancements and fixes. Each update is merged into your client theme and staged for QA before deployment.

We recommend keeping ENgrid Scripts updates on a regular cadence of at least once per month, with a code freeze from November through December unless a change is critical.

---

## What a Release Includes

Each release is accompanied by clear release notes explaining:

- What the release **fixes** (bug fixes)
- What the release **updates** (enhancements to existing features)
- What the release **adds** (new features)
- What the release **removes** (deprecated functionality)

Large code changes that warrant full re-testing are flagged explicitly. Typically, updates are limited in scope and low-risk.

---

## How Updates Are Staged

All code changes are staged for your QA before being merged to production. Using ENgrid's built-in preview system, you can append a URL parameter to any live Engaging Networks page to load CSS and JS from a development branch:

```
https://support.example.org/page/12345/donate/1?assets=mar2026
```

This lets you preview and test changes in context on real pages — without affecting live supporters. You can share these preview URLs with colleagues for collaborative review.

{% callout title="You should know!" %}
The `?assets=` parameter only changes what you see. Live supporters continue using the production assets, so testing is completely safe.
{% /callout %}

### The End-to-End Process

1. **Development** — New work is done on an ENgrid client theme staging branch
2. **Upstream integration** — If the work depends on upstream ENgrid Scripts changes, those are pulled in first
3. **Internal QA** — 4Site conducts internal quality assurance
4. **Client preview** — You receive an update explaining how to test (e.g., `?assets=mar2026`), along with highlights about notable changes in EN, upstream ENgrid, or your client theme
5. **Client approval** — You test and approve the changes
6. **Deployment** — Approved changes are merged to the main branch and deployed as production-ready assets (uploaded to Engaging Networks)

If a page-level change is involved (not just code), a new page is created for QA testing so the live page is never impacted during review.

---

## Code Transparency

ENgrid is fully open source. All code is published on GitHub, providing complete transparency into every change:

- **Commit history** — Review every code change in [ENgrid's GitHub repository](https://github.com/4site-interactive-studios/engrid/commits/main/)
- **Release notes** — Read regularly updated [release notes](https://www.4sitestudios.com/engrid-release-notes/) summarizing each update
- **Versioning** — Both `@engrid-styles` and `@engrid-scripts` packages are versioned to help you track the version you are using, reference change logs, and see the latest published version
- **Client repositories** — Each client gets their own GitHub repository containing all source code and assets, ensuring you always have full access to your code

---

## Rollback Capabilities

Because all ENgrid code is version-controlled through Git, any change can be quickly reverted if an issue is discovered after deployment. If something breaks on a live page, there are three options depending on the situation:

1. **Fix forward** — Investigate the issue and either stage a fix for further QA or deploy a hotfix directly to live
2. **Revert** — Roll back to the previous version, which is fast because all code is version controlled
3. **Wait** — If the issue is minor (e.g., a small styling inconsistency), it may be deferred to the next planned release

---

## How ENgrid Accounts for Engaging Networks Product Releases

Engaging Networks typically releases five software updates per year, approximately every two months. 4Site stays informed of these releases through:

- EN marketing channels and release notes
- Monthly partner meetings and quarterly check-ins
- The Engaging Networks Partner Slack channel

When an EN product release includes changes that affect ENgrid, the 4Site team assesses the impact, develops any necessary updates in the core ENgrid Scripts, distributes those changes to client themes, and stages everything for client QA — following the same preview and approval process described above.

For the technical details on how ENgrid handles upstream changes, see [ENgrid Scripts and Client Themes](/docs/v2/what-is-engrid-and-client-theme).
