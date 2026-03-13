---
title: Analytics & Reporting
description: Overview of ENgrid's analytics integration and reporting capabilities
---

ENgrid provides comprehensive analytics integration out of the box. Every ENgrid page automatically pushes structured data to Google Tag Manager, making it easy to track donations, advocacy actions, form interactions, and page performance in your analytics platform of choice.

---

## GTM Data Layer Integration

ENgrid includes a built-in Data Layer component that automatically pushes events and variables to Google Tag Manager on every page. This includes page-level data (page type, campaign, appeal), form interaction data (field focus, field completion), and transaction data (donation amount, frequency, payment method).

For the full technical reference including all available events and variables, see [GTM Data Layer](/docs/v2/gtm-datalayer).

---

## Automatic Event Tracking

ENgrid automatically pushes events to GTM for key user interactions without any additional configuration:

| Event Category | Examples |
| -------------- | -------- |
| **Page events** | Page type, page load, template version |
| **Form interactions** | Field focus, field completion, form submission |
| **Donation events** | Amount selected, frequency changed, payment method chosen |
| **Upsell events** | Upsell lightbox shown, upsell accepted, upsell declined |
| **Error events** | Validation errors, payment failures |

These events follow a consistent naming convention that makes it straightforward to build triggers and tags in GTM.

---

## Supported Platforms

The data ENgrid pushes to GTM can be consumed by any analytics or advertising platform that integrates with Google Tag Manager, including:

- **Google Analytics 4 (GA4)** — Pageviews, events, conversions, ecommerce tracking
- **Google Ads** — Conversion tracking, remarketing audiences
- **Meta (Facebook/Instagram)** — Pixel events, custom conversions
- **Adobe Analytics** — Custom event mapping via GTM
- **Matomo** — Open source analytics via GTM integration
- **OneTrust / Cookie Consent** — GDPR-compliant tag firing based on consent

---

## A/B Testing Support

ENgrid supports A/B testing through multiple approaches:

- **URL parameter-based testing** — Use `?assets=` to load different code branches for variant testing
- **Native EN testing** — Engaging Networks' built-in multivariate and A/B testing features work with ENgrid pages
- **GTM-based testing** — Use Google Tag Manager to serve different experiences and track results
- **Sub-brand theming** — ENgrid's theme system supports alternative brand themes for testing different visual approaches

For details on native EN testing capabilities, see [Multivariate and A/B Testing](/docs/v2/native-testing).

---

## Implementation Approach

For every ENgrid client, 4Site handles integration with existing analytics tools, including:

- Custom GTM container setup and configuration
- GA4 property configuration and event mapping
- Custom reporting dashboards
- Testing and validation of all tracking
- Training for your team
- GDPR compliance and consent management
- Ongoing troubleshooting and support

Analytics implementations are tailored to each organization's needs — there is no one-size-fits-all approach, but there are best practices that 4Site applies consistently to ensure the data you collect is accurate and actionable.

{% callout title="You should know!" %}
Analytics implementation is typically included as part of an ENgrid buildout or retainer engagement. For details, see [Implementation Methodology](/docs/v2/implementation-methodology) or [Retainer Services](/docs/v2/retainer-services).
{% /callout %}
