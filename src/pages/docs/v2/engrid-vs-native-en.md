---
title: ENgrid vs. Native EN Features
description: How ENgrid components differ from the Engaging Networks features that look like them, and which one to use.
---

Some Engaging Networks (EN) features look like ENgrid components. Each section below shows how a pair differs and which one to use.

{% callout title="You should know!" %}
Checked against EN release 6.7.0 (November 2026). This page compares ENgrid with Page Builder. EN's Smart Pages don't allow custom code, so ENgrid isn't available there.
{% /callout %}

## Upsell lightbox

|  | [EN](https://knowledge.engagingnetworks.net/pages/upsell-pop-up-lightboxes) | [ENgrid](/docs/v2/upsells#donation-one-time-upsell-lightbox) |
| --- | --- | --- |
| Where to configure it | In the EN lightbox editor | In JavaScript via `window.EngridUpsell` |
| What it asks for | Convert a one-time gift to a recurring gift, or increase a monthly gift | Switch to a supported frequency available on the form, including annual |
| Donor can type a different amount | No | Yes |
| Amounts include the fee cover | No | Yes |
| Reporting | EN's upsell reports | Sends an `ENGRID_UPSELL` event to the data layer after a completed upsell and can write conversion details to a configured form field. Sending the event to Google Analytics requires a configured tag. |

**Which to use:** Use EN's lightbox for its Single to Recurring or Recurring Increase options. Use ENgrid's lightbox to choose a supported target frequency or let the donor enter a different amount. Use one upsell lightbox per page.

ENgrid also has an older [Frequency Upsell](/docs/v2/upsells#donation-frequency-lightbox). It's being phased out, so use Upsell Lightbox.

## Fee cover

|  | [EN](https://knowledge.engagingnetworks.net/pages/fundraising-processing-fee-cover-option) | [ENgrid](/docs/v2/upsells#donation-tip-jar) |
| --- | --- | --- |
| Where to configure the fee | In the Fee Cover field settings in Page Builder | In the HTML attributes on the Tip Jar processing-fee checkbox |
| Fee formula | Percentage, flat amount, or both, with an optional cap | Percentage plus a flat amount |
| How the fee is recorded | Added to the gift and shown in EN's fundraising reports | Added to the gift |

**Which to use:** EN's field on new pages. ENgrid works with it, so the totals on the page, upsell amounts, and Apple Pay include the fee.

## Amounts that change with frequency

|  | [EN swap lists](https://knowledge.engagingnetworks.net/pages/field-updates) | [ENgrid Swap Amounts](/docs/v2/currency-donation-amounts#swap-amounts) |
| --- | --- | --- |
| Who can change the amounts | Editors, in Page Builder | Someone with basic code knowledge |
| How to reuse amount settings | Save the form block to the library and reuse it on other pages | Provide the same `window.EngridAmounts` configuration on the pages where you want to use it |
| Donation amounts from a link | Preselect a donation amount with [`transaction.donationAmt`](https://knowledge.engagingnetworks.net/youraccount/pre-populating-form-fields) | Supply a new list with `engrid-amounts` |

**Which to use:** Use EN swap lists if editors change amounts often. Use one method per page.

## Showing and hiding content

|  | [EN form dependencies](https://knowledge.engagingnetworks.net/pages/form-dependencies) | [EN conditional content](https://knowledge.engagingnetworks.net/pages/conditional-content-in-pages) | [ENgrid helper classes](/docs/v2/conditional-content-helper-classes) |
| --- | --- | --- | --- |
| What it shows or hides | Form fields and questions | Text and form blocks | Any block, including images |
| What decides it | Other answers on the form | The active supporter profile. A campaign email link, an EN redirect, or a static link with `ea.profile.id` can activate a profile. | Gift amount, frequency, and other choices on the form |
| Changes thank you page copy by gift amount | No | No | Yes |

**Which to use:** Use EN dependencies to hide a form field, ENgrid classes to change copy or images based on the gift, or EN conditional content to personalize a page by supporter profile.

If you hide a required field with an ENgrid class, EN still requires it. Use an EN dependency for required fields.

## Pre-filled forms and returning donors

|  | [EN](https://knowledge.engagingnetworks.net/youraccount/pre-populating-form-fields) | ENgrid |
| --- | --- | --- |
| Fills the form from an email link | First click only | Later visits to the same page too, with [Sticky Pre-population](/docs/v2/sticky-prepopulation) |
| Remembers donors who come back without a link | No | Yes, if they opt in, with [Remember Me](/docs/v2/remember-me) |

**Which to use:** Keep EN's on. Add ENgrid's when returning donors should skip retyping their details.

## Progress bar

|  | [EN display widgets](https://knowledge.engagingnetworks.net/pages/display-widgets) | [ENgrid Progress Bar](/docs/v2/progress-bar) |
| --- | --- | --- |
| Built for | Campaign goals, with totals EN calculates from aggregated data | Steps in a multi-page form |
| Where it shows | EN pages and other websites | ENgrid pages |

**Which to use:** EN's for campaign goals. ENgrid's for form steps.

## Abandoned gifts

|  | [EN abandonment emails](https://knowledge.engagingnetworks.net/pages/abandonment) | [ENgrid Exit Intent Lightbox](/docs/v2/exit-intent-lightbox) |
| --- | --- | --- |
| What it does | Sends an email reminder after an eligible donation attempt is left incomplete. The default delay in Page Builder is 2 hours. | Shows a pop-up on the ENgrid page when an enabled exit-intent trigger fires. |
| Example triggers | A supporter clicks an EN broadcast email link and interacts with the donation page, or submits an email address on an earlier step of a multi-page donation form, then leaves without completing the gift. | The pointer leaves near the top of the page, or the page becomes hidden when the visitor switches tabs. |

**Which to use:** Use abandonment emails to invite supporters back to an incomplete donation. Use Exit Intent Lightbox to show a message on the ENgrid page in response to browser activity.

## Other similar features

| EN feature | ENgrid component | The difference |
| --- | --- | --- |
| [Email validator](https://knowledge.engagingnetworks.net/pages/managing-validators) | [NeverBounce](/docs/v2/form-validation#never-bounce-email-validation), [FreshAddress](/docs/v2/form-validation#fresh-address-email-validation), [TidyContact Email](/docs/v2/tidycontact#tidy-contact-email) | EN's validator checks the address format. ENgrid integrates with these services for email validation. |
| [Redirect processing rule](https://knowledge.engagingnetworks.net/pages/processing-rules-redirect-and-filter) | [Country Redirect](/docs/v2/country-redirect-controls#country-redirect) | EN redirects after the donor submits. ENgrid redirects as soon as they pick a country |
| [Locales](https://knowledge.engagingnetworks.net/pagebuilder/locales) | [Translate Fields](/docs/v2/international-form-addresses) | EN translates by browser language. ENgrid changes the address fields to match the country the donor picks |
| Multi-page forms | [Single-page multistep](/docs/v2/single-page-multistep) | EN loads a new page for each step. A single-page multistep form on an ENgrid page requires custom setup from 4Site. |
| [Premium gift rules](https://knowledge.engagingnetworks.net/pages/premium-gift-block) | [Custom Premium](/docs/v2/custom-premium) | Custom Premium filters which gifts appear on a Premium Donation page based on the gift amount and frequency. Use one or the other. |
| Text inserts (coin icon) | [Live Variables](/docs/v2/live-variables) | EN shows the gift total in text blocks. ENgrid also updates the button label and frequency text |
| [Pre-fill from a link](https://knowledge.engagingnetworks.net/youraccount/pre-populating-form-fields) | [URL to Form](/docs/v2/data-and-url-parameters#url-to-form) | Almost the same. ENgrid doesn't overwrite text the donor already typed |
| [Smart Pages lightbox on a thank you page](https://knowledge.engagingnetworks.net/newsupdates/2026-release-notes) | [Post Donation Embed](/docs/v2/post-donation-embed) | A Page Builder thank-you page can open a Smart Pages lightbox for a follow-up donation or petition. On an ENgrid thank-you page, Post Donation Embed can load a configured follow-up URL in an iframe. |

## Where ENgrid adds to an EN feature

These ENgrid components build on features available in EN.

| EN feature | What ENgrid adds |
| --- | --- |
| [Amount validator](https://knowledge.engagingnetworks.net/pages/managing-validators) | With live validation enabled, [Min Max Amount](/docs/v2/currency-donation-amounts#min-max-amount) shows an out-of-range error about a second after the donation amount changes. |
| [Custom validators](https://knowledge.engagingnetworks.net/pages/managing-validators) | Shows errors while the donor types ([EN Validators](/docs/v2/form-validation#en-custom-validators)) |
| [Digital wallets](https://knowledge.engagingnetworks.net/fundraising/digital-wallets-apple-pay-google-pay-paypal-one-to) | [Give By Select](/docs/v2/payment-methods-digital-wallets#give-by-select) uses the payment choices configured on the page. When the wallets load, ENgrid adds grouped payment options for Google Pay and Apple Pay via Stripe, and for PayPal and Venmo. |
| [Apple Pay through Vantiv](https://knowledge.engagingnetworks.net/youraccount/payment-gateways-summary) | EN supports Apple Pay through Vantiv with developer configuration. ENgrid's [Apple Pay component](/docs/v2/payment-methods-digital-wallets#apple-pay) adds a button when configured and supported by the browser. |
| Stripe bank payments | Donors link their bank account in a Stripe window. ENgrid's [Stripe Financial Connections component](/docs/v2/payment-security#stripe-financial-connections) detects when that window opens and closes. |
| [VGS card fields](https://knowledge.engagingnetworks.net/softwaresecurityandprivacy/enhancing-security-at-engaging-networks) | Styling, card icons, and card brand limits ([VGS](/docs/v2/payment-security#vgs-very-good-security)) |
| [Supporter Hub](https://knowledge.engagingnetworks.net/pages/supporter-hub) | Since EN 6.4.0, the Update Recurring Donation gadget includes protection against duplicate submissions. ENgrid's [Supporter Hub component](/docs/v2/supporter-hub) opens the card update form when the card field receives focus, blocks repeated clicks on submit buttons for ten seconds, and adds keyboard and screen reader support. |
| [Event tickets](https://knowledge.engagingnetworks.net/pages/events) | EN can show the price followed by the currency code, such as `100 USD`. ENgrid's [Event Tickets](/docs/v2/event-tickets) formats the price for the visitor's locale, such as `$100` in US English. |
| [Page accessibility](https://knowledge.engagingnetworks.net/pages/accessible-ready-blueprint-templates-for-page-buil) | EN's accessible-ready Page Builder blueprints add screen reader support for required fields and improve keyboard access for some radio buttons. ENgrid's [A11y](/docs/v2/form-field-enhancements#accessibility-a11y) marks required fields, labels radio groups and the other amount field, and generates alt text for e-card images that have none. |
| [Iframe embeds](https://knowledge.engagingnetworks.net/pages/embedding-pages-in-iframes) | EN pages can be embedded in iframes. ENgrid's [IFrame component](/docs/v2/embedding-engrid) sends the embedded page's height so a compatible host page can resize the iframe to fit its content. |
| [Google Analytics](https://knowledge.engagingnetworks.net/pages/adding-google-analytics-tracking-on-your-pages) | Sends gift and form events to Google Tag Manager ([Data Layer](/docs/v2/gtm-datalayer)) |

## Smart Pages features

[Smart Pages](https://knowledge.engagingnetworks.net/pages/smart-pages) include the fundraising features below. The comparison shows options you can use on Page Builder pages.

| Smart Pages feature | Page Builder options |
| --- | --- |
| Impact text for each suggested gift amount | Use ENgrid [Swap Amounts](/docs/v2/currency-donation-amounts#swap-amounts) to include impact text in each amount's label. |
| Recurring gift callout | ENgrid [Upsell Checkbox](/docs/v2/upsells#donation-upsell-checkbox) |
| Country field prefilled from the supporter's location | ENgrid [Auto Country Select](/docs/v2/auto-fill-smart-defaults#auto-country-select) |
| Screen reader support | [EN's accessible-ready Page Builder blueprints](https://knowledge.engagingnetworks.net/pages/accessible-ready-blueprint-templates-for-page-buil) or ENgrid [A11y](/docs/v2/form-field-enhancements#accessibility-a11y) |
| Embeddable Smart Pages lightbox for your website | [WordPress Promotions Plugin](/docs/v2/wordpress-promotions-plugin-overview) |

## No EN equivalent

We didn't find anything in EN like these ENgrid components: [Ticker](/docs/v2/ticker), [Mobile CTA](/docs/v2/mobile-cta), [Click to Expand](/docs/v2/click-to-expand), [Media Attribution](/docs/v2/media-attribution), [Page Background Rotation](/docs/v2/page-background-rotation), [Embedded Ecard](/docs/v2/embedded-ecard), [Iframe Queue](/docs/v2/iframe-queue), [Opt-In Ladder](/docs/v2/opt-in-ladder), [Universal Opt-In](/docs/v2/form-field-enhancements#universal-opt-in), [Expand Region Name](/docs/v2/expand-region-name), [Skip Link](/docs/v2/skip-link), and the [Debug Tools](/docs/v2/debug-tools).

## Address lookup and validation

EN documents [Loqate for UK postcode lookup and address validation](https://knowledge.engagingnetworks.net/pages/uk-address-validation-with-loqate). EN also offers [US address lookup for Email-to-Target campaigns](https://knowledge.engagingnetworks.net/pages/page-admin-settings).
