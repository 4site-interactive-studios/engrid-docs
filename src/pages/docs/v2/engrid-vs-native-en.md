---
title: ENgrid vs. Native EN Features
description: Compare ENgrid components with the native Engaging Networks features that cover similar ground, and decide which one to use on each page.
---

Engaging Networks (EN) has native versions of some ENgrid features, like the upsell lightbox and the processing fee checkbox. Other EN features cover part of what an ENgrid component does, and some ENgrid components exist to make an EN feature work better. This page covers the ENgrid components that have a native EN equivalent, full or partial, so you can pick the right one for a page. Components with no EN equivalent are listed at the [end of the page](#e-ngrid-components-with-no-native-equivalent).

{% callout title="You should know!" %}
Last reviewed in November 2026 against the EN Knowledge Base and EN release 6.7.0 (November 19, 2026). EN ships a release roughly every six weeks, so check the linked EN article before you move a client from an ENgrid component to a native feature.
{% /callout %}

## Reading the overlap column

| Overlap           | What it means                                          | What to do                                                                    |
| ----------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Native covers it  | EN handles the core use case                           | Default to the EN feature. Use ENgrid only for the extras listed in the notes |
| Partial           | EN covers part of the use case                         | Use EN for what it covers and ENgrid for the gaps listed in the notes         |
| Builds on native  | The ENgrid component runs on top of the EN feature     | Turn on the EN feature and keep the ENgrid component                          |
| Pick one per page | EN and ENgrid do the same job and conflict on one page | Choose one for each page. The notes say when each one fits                    |
| Smart Pages only  | EN offers it on Smart Pages, but not on Page Builder   | Keep the ENgrid component on Page Builder pages                               |

{% callout title="Information" %}
EN launched Smart Pages on April 9, 2026 as a no-code alternative to Page Builder. Smart Pages don't allow custom code, CSS, or JavaScript, so ENgrid can't run on them. Most of EN's 2026 fundraising features shipped for Smart Pages only. Unless a row says otherwise, this page compares ENgrid with Page Builder features. See [Smart Pages-only features](#smart-pages-only-features) for the full list.
{% /callout %}

---

## Comparison table

### Donation amounts and upsells

| ENgrid component | Native EN feature | Overlap | Notes |
| ---------------- | ----------------- | ------- | ----- |
| [UpsellLightbox](/docs/v2/upsells#donation-one-time-upsell-lightbox) | [Upsell Pop-Up Lightboxes](https://knowledge.engagingnetworks.net/pages/upsell-pop-up-lightboxes) | Pick one per page | Use EN's lightbox for a standard one-time to recurring ask. Use ENgrid's when you need an other amount field inside the lightbox, a non-monthly target frequency, formula-based suggestions, or amounts that include the processing fee. ENgrid's lightbox doesn't check for EN's, so don't add both to a page. See the [detailed comparison](#upsell-lightbox-detailed-comparison) |
| [FrequencyUpsell](/docs/v2/upsells#donation-frequency-lightbox) | [Upsell Pop-Up Lightboxes](https://knowledge.engagingnetworks.net/pages/upsell-pop-up-lightboxes) | Pick one per page | EN's lightbox converts one-time gifts to recurring and raises recurring amounts. It has no one-time to annual flow (or any other frequency to frequency flow) and no built-in A/B split. FrequencyUpsell doesn't run when an EN upsell lightbox or ENgrid's UpsellLightbox is on the page. ENgrid is phasing this component out in favor of UpsellLightbox. See the [detailed comparison](#upsell-lightbox-detailed-comparison) |
| [ProcessingFees (Tip Jar)](/docs/v2/upsells#donation-tip-jar) | [Fee Cover form field](https://knowledge.engagingnetworks.net/pages/fundraising-processing-fee-cover-option) | Native covers it | Use EN's Fee Cover field on new pages. ENgrid detects it and uses EN's fee calculation for live variables, upsell amounts, and the Apple Pay total. Keep the pseudo-field only on older pages: ENgrid adds its fee in `enOnSubmit`, which EN doesn't call for digital wallet gifts, so those gifts go through without the fee. See the [detailed comparison](#fee-cover-detailed-comparison) |
| [SwapAmounts](/docs/v2/currency-donation-amounts#swap-amounts) | Swap lists on the Donation Amount field ([how-to](/docs/v2/currency-donation-amounts#native-ask-string-swap-lists)) and [Field updates](https://knowledge.engagingnetworks.net/pages/field-updates) | Pick one per page | EN swap lists change the amounts when the donor changes frequency, and editors manage them in Page Builder. SwapAmounts adds amounts set in theme or page code, `?engrid-amounts=` URL overrides, `stickyDefault`, and `overrideNSG`. If the client uses NSG, use SwapAmounts: a default amount in an EN swap list overrides NSG amounts. See the [detailed comparison](#donation-amounts-and-ask-strings-detailed-comparison) |
| [StickyNSG](/docs/v2/sticky-nsg) | [Next suggested gift (NSG)](https://knowledge.engagingnetworks.net/pages/next-suggested-gift) | Builds on native | EN builds personalized ask strings from each donor's highest previous or most recent gift, but only on visits from broadcast links or page chaining. StickyNSG keeps those amounts in a cookie for 30 days, or until the donor completes a gift, so later visits get them too. It covers the one-time and monthly lists and is off by default. See the [detailed comparison](#donation-amounts-and-ask-strings-detailed-comparison) |
| [MinMaxAmount](/docs/v2/currency-donation-amounts#min-max-amount) | [Validators](https://knowledge.engagingnetworks.net/pages/managing-validators): Donation Amount, and Donation Amount with frequency minimum | Builds on native | EN enforces the range when the donor submits. ENgrid has its own limits (`MinAmount` 1 and `MaxAmount` 100000 by default) and blocks the submit too, so the two can disagree. When the page has an EN amount validator, set `UseAmountValidatorFromEN: true`: ENgrid then reads the EN range and shows the same error about one second after the amount changes |
| [CustomPremium](/docs/v2/custom-premium) | [Premium gift block](https://knowledge.engagingnetworks.net/pages/premium-gift-block) rules | Pick one per page | EN's block can already offer premiums by donation amount and frequency. CustomPremium replaces those rules: the EN block has to show every product with no amount or frequency limits, and CustomPremium filters them from minimum amounts set in code. Use it to run different rule sets on one page (for example, chosen by URL parameter) and to pick a valid default when the current selection no longer qualifies |
| [LiveVariables](/docs/v2/live-variables) | Amount inserts (the coin icon) in text blocks and in the upsell lightbox | Partial | EN can insert the donation total and fee amount into text blocks, and the current and proposed amounts into its upsell lightbox. ENgrid covers more places, such as the submit button label, frequency text, and currency symbol |
| [ProgressBar](/docs/v2/progress-bar) | [Display widgets](https://knowledge.engagingnetworks.net/pages/display-widgets): progress bar, thermometer, and image fill | Partial | For campaign goals, use EN's widgets: they pull live totals (number of donations, amount raised, participants) and can be embedded on other sites. ENgrid's ProgressBar fits progress through a multi-page form, or a percentage you set by hand |

### Payments

| ENgrid component | Native EN feature | Overlap | Notes |
| ---------------- | ----------------- | ------- | ----- |
| [DigitalWallets](/docs/v2/payment-methods-digital-wallets#digital-wallets) and [GiveBySelect](/docs/v2/payment-methods-digital-wallets#give-by-select) | [Digital wallets](https://knowledge.engagingnetworks.net/fundraising/digital-wallets-apple-pay-google-pay-paypal-one-to): Apple Pay and Google Pay through Stripe, PayPal One Touch and Venmo through PayPal, and donor-advised fund (DAF) gifts through Chariot | Builds on native | EN supplies the wallet buttons on Donation and Premium Donation pages, on Event pages since release 5.17.0 (August 2025), and on Symbolic Giving pages since release 6.0.0 (February 2026). ENgrid detects which of these wallets loaded and adds them to the Give By Select payment choice. EN also offers wallets through Blackbaud (BBMS since release 5.14.0, and Google Pay plus recurring Apple Pay and Google Pay on Blackbaud New Checkout since 6.5.0). ENgrid only looks for the Stripe, PayPal, and Chariot wallet containers, so test Give By Select on any page that takes wallets through Blackbaud |
| [ApplePay](/docs/v2/payment-methods-digital-wallets#apple-pay) | Apple Pay through Vantiv (the `applepay` payment type) | Builds on native | **EN** handles the back end only: it validates the merchant with Apple and charges the Apple Pay token through Vantiv. It doesn't put an Apple Pay button on the page, open the Apple Pay sheet, or copy the donor's billing address from the wallet. **ENgrid** handles the page: it shows the Apple Pay option only in Safari when the donor has a card set up, swaps the submit button for an Apple Pay "Donate" button, checks required fields and the amount before opening the sheet, includes the fee cover in the total, and copies the wallet's billing address and phone into the EN fields before submitting. Apple Pay through Stripe doesn't use this component, because EN renders that button itself |
| [StripeFinancialConnections](/docs/v2/payment-security#stripe-financial-connections) | Stripe bank (ACH) payments through Stripe Financial Connections, which replaced Plaid in release 6.0.0 (February 2026) | Builds on native | **EN** opens Stripe's window when the donor chooses to pay by bank account, so the donor can log in to their bank and link it. When that window closes, EN leaves the submit button disabled, so the donor can't finish the gift. **ENgrid** watches for the Stripe window closing and turns the submit button back on. Without it, bank account gifts through Stripe get stuck at the last step |
| [VGS](/docs/v2/payment-security#vgs-very-good-security) | [VGS card tokenization](https://knowledge.engagingnetworks.net/softwaresecurityandprivacy/enhancing-security-at-engaging-networks) | Builds on native | EN renders the card fields in VGS iframes and warns that the iframes can interfere with custom styling. ENgrid styles those fields and adds card icons, card brand restrictions, and expiration date handling |

### Forms, validation, and pre-fill

| ENgrid component | Native EN feature | Overlap | Notes |
| ---------------- | ----------------- | ------- | ----- |
| [ENValidators](/docs/v2/form-validation#en-custom-validators) | [Custom (regex) validators](https://knowledge.engagingnetworks.net/pages/managing-validators) | Builds on native | EN shows the validator's error when the donor submits. ENgrid runs the same regex rules while the donor types. Turn it on with `ENValidators: true` |
| [PostalCodeValidator](/docs/v2/form-validation#us-postal-code-validator) | [Custom (regex) validator](https://knowledge.engagingnetworks.net/pages/managing-validators) | Partial | An EN regex validator can check the ZIP code format. ENgrid's validator also formats the ZIP code and skips non-US countries |
| [NeverBounce](/docs/v2/form-validation#never-bounce-email-validation), [FreshAddress](/docs/v2/form-validation#fresh-address-email-validation), and [TidyContact Email](/docs/v2/tidycontact#tidy-contact-email) | [Email validator](https://knowledge.engagingnetworks.net/pages/managing-validators) | Partial | EN's Email validator checks the format only. These integrations check whether the address can receive mail |
| [UrlToForm](/docs/v2/data-and-url-parameters#url-to-form) | [Pre-populating form fields](https://knowledge.engagingnetworks.net/youraccount/pre-populating-form-fields) with URL parameters | Native covers it | EN fills fields from parameters such as `?transaction.donationAmt=20`. UrlToForm runs when the page loads and differs in two ways: it skips text, email, and textarea fields that already have a value (from EN pre-fill or browser autofill), and it checks a checkbox for `true`, `Y`, or `1` and unchecks it for any other value |
| [RememberMe](/docs/v2/remember-me), [WelcomeBack](/docs/v2/welcome-back), and [StickyPrepopulation](/docs/v2/sticky-prepopulation) | [Pre-population](https://knowledge.engagingnetworks.net/youraccount/pre-populating-form-fields) from broadcast links and page chaining | Partial | EN pre-fills only on the first click of a campaign link, or across chained pages. StickyPrepopulation builds on that: it saves the fields EN pre-filled in an encrypted cookie and fills them again on later visits to the same page, until the donor gives. Page Builder has no opt-in memory across visits, so keep RememberMe and WelcomeBack for returning donors who arrive without a campaign link |
| [AutoCountrySelect](/docs/v2/auto-fill-smart-defaults#auto-country-select) | Automatic country detection | Smart Pages only | Added to Smart Pages in release 6.3.0 (June 2026) |
| [TranslateFields](/docs/v2/international-form-addresses) | [Locales](https://knowledge.engagingnetworks.net/pagebuilder/locales) and [Field updates](https://knowledge.engagingnetworks.net/pages/field-updates) | Partial | EN locales translate labels and options by browser language or `?locale=`, not by the country the donor picks. Field updates can swap the Region list when a country is chosen (up to 15 field updates per form block). TranslateFields does this from the theme for the supporter, shipping, billing, and tribute notification address fields. ENgrid also translates its own UI strings, and TranslateFields labels, from the EN page locale (`pageJson.locale`). See [Multilingual Pages](/docs/v2/multilingual-pages) |
| [A11y](/docs/v2/form-field-enhancements#accessibility-a11y) | Page Builder accessibility updates | Partial | EN adds `role="alert"` to the form error list (release 5.12.0) and supports image alt text (release 5.15.0). ENgrid's A11y takes over the error announcement: it removes that `role` and reads every error, in form order, from one live region, so screen readers don't hear the list twice. It also marks fields with errors (`aria-invalid`, `aria-describedby`), moves focus to the first one on submit, and adds `aria-required`, labelled radio groups, and an accessible label on the other amount field. Keep A11y on |

### Content, layout, and page flow

| ENgrid component | Native EN feature | Overlap | Notes |
| ---------------- | ----------------- | ------- | ----- |
| [Conditional content helper classes](/docs/v2/conditional-content-helper-classes), [ShowHideRadioCheckboxes](/docs/v2/show-hide-radio-checkboxes), [ShowIfAmount](/docs/v2/currency-donation-amounts#show-if-amount), and [RequiredIfVisible](/docs/v2/form-field-enhancements#input-required-visibility) | [Form dependencies](https://knowledge.engagingnetworks.net/pages/form-dependencies) and [Conditional content](https://knowledge.engagingnetworks.net/pages/conditional-content-in-pages) | Partial | EN dependencies show or hide fields and questions inside a form block based on other answers, and a hidden mandatory field stops being mandatory. EN conditional content swaps text and form blocks by supporter profile. ENgrid's classes work on any element, react to amount, frequency, and URL arguments, and also run on thank you pages. Use EN dependencies for form fields and ENgrid classes for everything else. See the [detailed comparison](#conditional-content-detailed-comparison) |
| [Single-page multistep](/docs/v2/single-page-multistep) | Multi-page Page Builder forms | Partial | EN splits a form across pages, with a page load between steps. ENgrid keeps every step on one page. Smart Pages have their own built-in step flow |
| [ExitIntentLightbox](/docs/v2/exit-intent-lightbox) | [Abandonment](https://knowledge.engagingnetworks.net/pages/abandonment) reminder emails | Partial | Different approach to the same problem. EN (release 6.3.0, June 2026) emails donors who started a gift and left. EN has to know who the donor is: they came from an EN email or a chained page, entered their email on an earlier step of a multi-page form, or had a gift rejected. It only works on live pages. ENgrid's lightbox asks visitors to stay before they leave. The two work well together |
| [PostDonationEmbed](/docs/v2/post-donation-embed) | Smart Pages lightbox opened from a Page Builder thank you page, pre-filled from the first gift | Partial | Added in release 6.6.0 (October 2026). The follow-up form has to be a Smart Page, while PostDonationEmbed works with any ENgrid donation page |
| [CountryRedirect](/docs/v2/country-redirect-controls#country-redirect) | [Processing rules: redirect](https://knowledge.engagingnetworks.net/pages/processing-rules-redirect-and-filter) | Partial | EN redirects based on submitted values after the donor clicks submit, and the rule isn't compatible with Pay via PayPal. CountryRedirect sends the donor to the right page as soon as they pick a country |
| [SupporterHub](/docs/v2/supporter-hub) | [Supporter Hub](https://knowledge.engagingnetworks.net/pages/supporter-hub): the page where supporters log in with their email and open overlays to manage recurring gifts, card details, and giving history | Builds on native | **EN** provides the hub and its overlays. To change a card, the donor has to click a separate "Update" button before the card field can be edited. Since release 6.4.0 (July 2026), the Update Recurring Donation gadget processes one update however many times the donor clicks. **ENgrid** opens the card update form as soon as the donor clicks the card field, and ignores repeat clicks on any hub submit button for 10 seconds. It also adds keyboard and screen reader support: gadgets work as buttons, overlays act as labelled dialogs that close with ESC, and login and save messages are read aloud. When ENgrid's LiveCurrency is on, it also keeps the amount buttons in the overlays visible |
| [EventTickets](/docs/v2/event-tickets) | [Event pages](https://knowledge.engagingnetworks.net/pages/events): the ticket block that lists each ticket type and its price | Builds on native | **EN** shows each ticket price as a plain number next to a separate currency code, for example `USD 50.00`. **ENgrid** hides the code and shows the price with its currency symbol, formatted for the donor's browser language (`$50`, `€100`, `£1,000`). It drops `.00` on whole amounts when the browser language uses a period for decimals, and keeps real cents, like `$50.50` |

### Analytics and embedding

| ENgrid component | Native EN feature | Overlap | Notes |
| ---------------- | ----------------- | ------- | ----- |
| [DataLayer](/docs/v2/gtm-datalayer) | `pageJson` ("Expose transaction details") and [Google Analytics added to your templates](https://knowledge.engagingnetworks.net/pages/adding-google-analytics-tracking-on-your-pages) | Builds on native | EN exposes page and transaction data in `pageJson` and leaves the analytics setup to your template. ENgrid pushes that data, plus form interaction events, to the GTM data layer |
| [IFrame](/docs/v2/embedding-engrid) | [Embedding pages in iframes](https://knowledge.engagingnetworks.net/pages/embedding-pages-in-iframes) | Builds on native | EN supports iframe embeds at a fixed height and points to a third-party library for resizing. ENgrid resizes embedded pages to fit their content, and the [Iframe Queue](/docs/v2/iframe-queue) handles embedded forms submitted in sequence |

---

## Upsell lightbox: detailed comparison

ENgrid has two upsell modals. FrequencyUpsell is the older one, and ENgrid is phasing it out in favor of UpsellLightbox.

| Capability | EN Upsell Pop-Up Lightbox | ENgrid UpsellLightbox | ENgrid FrequencyUpsell |
| ---------- | ------------------------- | --------------------- | ---------------------- |
| Status | Active | Active. Use this one for new ENgrid upsells | Being phased out in favor of UpsellLightbox |
| Setup | Shared component under Pages > Shared Components, added to a page under Processing Rules. Content uses a WYSIWYG or HTML editor | `EngridUpsell` object in a code block on the page | `EngridFrequencyUpsell` object in a code block on the page |
| Who can edit it | Content editors, in the EN interface | Anyone comfortable editing a JavaScript object in a code block | Same as UpsellLightbox |
| Which gifts trigger it | Single to Recurring (one-time gifts) and Recurring Increase (existing recurring gifts), each with its own display settings | One-time gifts by default. Monthly and annual gifts can trigger it too (`oneTime`, `monthly`, `annual`). Quarterly and semi-annual gifts can't | Any frequencies listed in `upsellFromFrequency` (default: one-time) |
| Target frequency | Recurring. EN's docs don't mention annual or other frequencies | Any EN frequency through `upsellToFrequency`, or per amount range through `amountRange[].frequency`, which wins. Every default range sets `monthly`, so define your own `amountRange` when you change the target | One frequency in `upsellFrequency`: monthly, quarterly, semi-annual, or annual (default: annual) |
| Suggested amount rules | Unlimited ranges per currency. The suggestion is a percentage or a flat amount (Recurring Increase: a percentage or flat addition) | `amountRange` entries with `max` and `suggestion`. A suggestion can be a JavaScript formula that uses `amount`, and `minAmount` sets a floor | One `upsellAmount` function of the current amount (default: the same amount) |
| Other amount field in the lightbox | No. The donor only sees the calculated suggestion (confirmed in an EN sandbox, November 2026) | Yes (`otherAmount`, `otherLabel`) | No |
| Processing fee | No. The suggestion is calculated from the original gift only and doesn't include the fee cover (confirmed in an EN sandbox, November 2026) | Amounts shown in the lightbox include the fee when the donor has chosen to cover it | Same as UpsellLightbox |
| Image | Optional, left or right on desktop (650x480 landscape recommended), hidden on mobile by default | Optional, left or right (`image`, `imagePosition`, 480x650 portrait recommended) | No image option. Style it with `customClass` |
| Closing | The X and the decline button process the original gift. Clicking outside doesn't close it. An optional auto-submit timer processes the original gift after a set time | `canClose` allows the X, ESC, and clicking outside. `submitOnClose` decides whether closing submits the original gift | No X by default, and clicking outside never closes it. ESC always closes it, and `showCloseX` adds the X. Closing counts as a decline. `submitOnClose` decides whether closing submits the original gift or keeps the donor on the page |
| Payment methods | Never shown for digital wallet transactions | Doesn't run for EN digital wallets, because EN doesn't call `enOnSubmit` for them. `disablePaymentMethods` turns it off for other payment types you list (always off for Vantiv `applepay`) | Doesn't run for EN digital wallets, for the same reason |
| A/B testing | Not part of the lightbox. EN's [page split test](/docs/v2/native-testing) can compare two pages with different lightboxes | Not built in | Built in: set `abTest: true` with a list of variants. Each visitor keeps one variant for 1 day by default (stored in a cookie, change it with `cookieDurationDays`), and the variant is pushed to the data layer |
| Reporting | Built in: Quick Reports (displays, conversions, average amount, conversion rate), CSV export, and an Upsells category in Supporter Lookup | Write the original amount to a field (`upsellOriginalGiftAmountFieldName`) and conversion details to `conversionField`. ENgrid also pushes `ENGRID_UPSELL` data to the [GTM data layer](/docs/v2/gtm-datalayer) | `onOpen`, `onAccept`, and `onDecline` callbacks for your own tracking |
| Requirements and limits | "Expose transaction details" turned on, a Payment Currency field on the page, and a live payment per currency. Not supported on one-click pages | `pageJson` ("Expose transaction details") on page 1 of a Donation or Premium Donation page | Doesn't run when an EN upsell lightbox or ENgrid UpsellLightbox is on the page |

Our recommendation: start with EN's lightbox for a standard one-time to monthly ask. Content editors can change it without touching code, and you get conversion reporting without building anything. Switch to ENgrid's UpsellLightbox when the ask needs something EN doesn't offer: an other amount field inside the lightbox, an annual or quarterly target (set `upsellToFrequency` and your own `amountRange`), formula-based suggestions, or fee-inclusive amounts. Use one or the other on a page, not both. Don't start new pages with FrequencyUpsell: UpsellLightbox now covers its main use (one-time to annual). FrequencyUpsell still does two things UpsellLightbox doesn't: a built-in A/B test, and upsells from quarterly or semi-annual gifts.

---

## Fee cover: detailed comparison

| Capability | EN Fee Cover form field | ENgrid Tip Jar pseudo-field |
| ---------- | ----------------------- | --------------------------- |
| Setup | Add "Fee Cover" as a form field in a form block | Paste the custom checkbox HTML into a code block |
| Fee formula | Flat fee, percentage, or both, with an optional maximum | Percentage plus a fixed amount (`data-processing-fee-percent-added`, `data-processing-fee-fixed-amount-added`), no maximum |
| Label and default state | Set in the field settings, including pre-checked or unchecked | Set in the HTML |
| Page types | Any fundraising page, and Event pages that take payment. On a multi-page form, only the page that processes the gift | Donation pages using ENgrid |
| How the fee is recorded | Added to the gift amount. Fundraising reports show the average fee and the percentage of donors who covered fees | Added to the gift amount on submit. EN has no record that the donor chose to cover fees |
| Digital wallet gifts | EN's article doesn't cover them. Test a wallet gift before launch | The fee isn't added: ENgrid adds it in `enOnSubmit`, which EN doesn't call for wallet gifts |
| Works with ENgrid | Yes. ENgrid reads EN's fee calculation for live variables, upsell amounts, and the Apple Pay total | Yes |

Our recommendation: use EN's Fee Cover field. You get fee reporting, editors can change the percentage without code, and the ENgrid components that show amounts already account for it. The pseudo-field also misses digital wallet gifts.

---

## Donation amounts and ask strings: detailed comparison

EN has two native ways to control the amount buttons. Swap lists change the list when the donor changes frequency. Next suggested gift (NSG) personalizes the list from the donor's giving history. ENgrid's SwapAmounts does the first job from code and lets NSG win when EN provides it, and [StickyNSG](/docs/v2/sticky-nsg) keeps NSG amounts for later visits.

| Capability | EN swap lists | EN Next suggested gift (NSG) | ENgrid SwapAmounts |
| ---------- | ------------- | ---------------------------- | ------------------ |
| Setup | Page Builder: a dependency on the frequency field with a field update that swaps the Donation Amount list ([how-to](/docs/v2/currency-donation-amounts#native-ask-string-swap-lists)) | An NSG component with amount rules, turned on in the Donation Amount field settings | `window.EngridAmounts` in the theme, or in a code block on one page |
| What changes the amounts | Any condition a dependency supports, usually frequency | The donor's highest previous or most recent gift | The selected frequency, with one list per frequency |
| Personalized amounts | No. Every donor sees the same list | Yes, for donors who arrive from a broadcast link or page chaining and have gift history | No, but EN's NSG amounts are used instead when present, unless you set `overrideNSG: true`. With StickyNSG, NSG amounts come back on later visits for 30 days, or until the donor gives |
| Default amount | Set in the swap list. A swap list default overrides NSG amounts. When the donor changes frequency, EN keeps their amount: it stays selected if the new list has it, and moves into Other if it doesn't (confirmed in an EN sandbox, November 2026) | Comes from the NSG rules | `default` per frequency. `stickyDefault: true` reselects it on every frequency change, otherwise the donor's pick is kept |
| Amounts from the URL | `?transaction.donationAmt=` preselects an amount, and it stays selected when the donor switches frequency and back (confirmed in an EN sandbox, November 2026) | No | `?engrid-amounts=15,25,50,100` replaces the one-time and monthly lists, and `transaction.donationAmt` sets the default |
| Reuse across pages | Save the form block to the library. Changes can take up to an hour to reach other pages that use it | One component on many pages. It can't be edited after launch, only retired and replaced | One setting in the theme covers every page, and a code block overrides it on a single page |
| Who can edit it | Editors in Page Builder, through several nested pop-ups | Editors, in the NSG component | Someone comfortable editing a JavaScript object |
| Limits | Not on one-click pages. Up to 15 field updates per form block | Not on one-click pages. Only works with select with input or radio with input fields. Test emails show only the fallback text. Needs Previous Contribution turned on in Account Settings | The NSG check covers the one-time and monthly lists only |

Our recommendation: if the client uses NSG, set the default lists with SwapAmounts instead of EN swap lists. A swap list that sets a default amount overrides NSG, so donors coming from an email lose their personalized amounts. If the client doesn't use NSG and editors change amounts often, EN swap lists let them do it without code. Pick one per page: with both on the page, EN's swap and ENgrid's can race each other when the page loads.

---

## Conditional content: detailed comparison

Three tools overlap here. EN Form dependencies and ENgrid's helper classes react to what the donor picks on the page. EN Conditional content works differently: it picks a version of a block from the supporter's profile when the page loads.

| Capability | EN Form dependencies | EN Conditional content | ENgrid helper classes |
| ---------- | -------------------- | ---------------------- | --------------------- |
| Setup | Page Builder: Forms > Dependencies, as IF/THEN rules | Page Builder: attach profiles to the page, turn them on for each block (in the block's Manage Profiles window since release 6.1.0), and write one version of the block per profile | A class on the block in Page Builder, such as `showifamount-greaterthan-100` or `engrid__supporterquestions600302-Y`. No code needed |
| What it can show or hide | Fields and questions inside the page's form blocks | Text blocks and form blocks. Every version of a form block must have the same fields | Any block you can add a class to: text, images, code blocks, or whole form blocks |
| What decides it | Any field or question in the campaign, including earlier pages, with operators (is equal to, contains, is greater than, has changed, and more) combined with AND/OR | The supporter's profile, up to 20 profiles per page. Only works when the supporter arrives from a campaign link or an EN redirect | Donation amount (less than, between, and other operators), frequency, tribute and shipping checkboxes, payment type, any radio or checkbox value, and whether a question is on the page. [DataHide](/docs/v2/data-and-url-parameters#data-hide) can also hide blocks from a URL parameter |
| Text fields and selects as conditions | Yes | Doesn't apply | No. Radio and checkbox fields only |
| Other actions | Calculate a value into a field, or redirect as soon as a value is picked | None | None. [RequiredIfVisible](/docs/v2/form-field-enhancements#input-required-visibility) makes a field required only while it's shown |
| Hidden fields on submit | EN ignores them, and a hidden mandatory field stops being mandatory | Doesn't apply | Hidden fields stay in the form, and EN still enforces them: an empty mandatory field hidden by an ENgrid class blocks the submit (confirmed in an EN sandbox, November 2026). Leave these fields optional in EN, and add RequiredIfVisible when they should be required while shown. [ShowHideRadioCheckboxes](/docs/v2/show-hide-radio-checkboxes) also resets hidden fields to their original value |
| Thank you pages | Conditions can use the fields from earlier pages (confirmed in an EN sandbox, November 2026), but the actions still only show or hide form fields and questions. A text block can't change by amount or frequency | Not mentioned in EN's docs | Yes. Amount and frequency classes read the completed gift, and the radio and checkbox classes work there too |
| Multi-page forms | Yes. A dependency on a later page can use a field from an earlier page (confirmed in an EN sandbox, November 2026) | Not mentioned in EN's docs | ShowHideRadioCheckboxes keeps the donor's choice across pages in session storage |

Our recommendation: use EN dependencies when the thing to hide is a form field or question. EN then ignores the hidden field on submit, so you don't need RequiredIfVisible. Use ENgrid classes for everything else on the page (copy, images, impact messages), for content that depends on the amount, and on thank you pages. Use EN conditional content only for profile-based personalization from email campaigns.

---

## Smart Pages-only features

These EN features overlap with ENgrid components, but EN only offers them on Smart Pages. ENgrid can't run on Smart Pages, so on Page Builder pages the ENgrid component (or the Page Builder option listed) is still the way to get them.

| Smart Pages feature | EN release | On Page Builder, use |
| ------------------- | ---------- | -------------------- |
| Fundraising progress bar, with external totals added in 6.6.0 | 6.2.0 (April 2026) | EN [Display widgets](https://knowledge.engagingnetworks.net/pages/display-widgets) or ENgrid [ProgressBar](/docs/v2/progress-bar) |
| Impact text for each suggested amount | 6.2.0 (April 2026) | ENgrid [ShowIfAmount](/docs/v2/currency-donation-amounts#show-if-amount) |
| Recurring gift nudge | 6.2.0 (April 2026) | ENgrid [Upsell Checkbox](/docs/v2/upsells#donation-upsell-checkbox) and the [giving frequency helper classes](/docs/v2/conditional-content-helper-classes#giving-frequency) |
| Automatic country detection | 6.3.0 (June 2026) | ENgrid [AutoCountrySelect](/docs/v2/auto-fill-smart-defaults#auto-country-select) |
| Screen reader support (aria labels, error and step announcements) | 6.3.0 (June 2026) | ENgrid [A11y](/docs/v2/form-field-enhancements#accessibility-a11y) |
| Website lightbox embed, with open on page load (6.3.0) and an abandonment widget (6.5.0) | 6.1.2 (April 2026) | The [WordPress Promotions Plugin](/docs/v2/wordpress-promotions-plugin-overview), [Homepage Takeover](/docs/v2/homepage-takeover), and ENgrid [ExitIntentLightbox](/docs/v2/exit-intent-lightbox) |
| Minimum donation amounts for one-time and recurring gifts | 6.5.0 (September 2026) | EN Donation Amount [validators](https://knowledge.engagingnetworks.net/pages/managing-validators) with ENgrid [MinMaxAmount](/docs/v2/currency-donation-amounts#min-max-amount) |
| Preselect amount and frequency with URL parameters | 6.5.0 (September 2026) | EN [URL pre-population](https://knowledge.engagingnetworks.net/youraccount/pre-populating-form-fields), ENgrid [UrlToForm](/docs/v2/data-and-url-parameters#url-to-form), or `?engrid-amounts=` with [SwapAmounts](/docs/v2/currency-donation-amounts#swap-amounts) |

---

## ENgrid components with no native equivalent

We didn't find a Page Builder equivalent for [Ticker](/docs/v2/ticker), [MobileCTA](/docs/v2/mobile-cta), [ClickToExpand](/docs/v2/click-to-expand), [MediaAttribution](/docs/v2/media-attribution), [Page Backgrounds](/docs/v2/page-backgrounds), [Page Background Rotation](/docs/v2/page-background-rotation), [Embedded Ecard](/docs/v2/embedded-ecard), [Iframe Queue](/docs/v2/iframe-queue), [Opt-In Ladder](/docs/v2/opt-in-ladder), [UniversalOptIn](/docs/v2/form-field-enhancements#universal-opt-in), [Expand Region Name](/docs/v2/expand-region-name), [Skip Link](/docs/v2/skip-link), or the [Debug Tools](/docs/v2/debug-tools). The same goes for [TidyContact](/docs/v2/tidycontact) address standardization. EN's guidance for address lookup is to add a third-party service, such as Loqate, to your page template ([EN article](https://knowledge.engagingnetworks.net/pages/uk-address-validation-with-loqate)).

---

## Sources

EN Knowledge Base articles used for this comparison:

- [Upsell Pop-Up Lightboxes](https://knowledge.engagingnetworks.net/pages/upsell-pop-up-lightboxes)
- [Fundraising Processing Fee Cover Option](https://knowledge.engagingnetworks.net/pages/fundraising-processing-fee-cover-option)
- [Next suggested gift (NSG)](https://knowledge.engagingnetworks.net/pages/next-suggested-gift)
- [Managing Validators](https://knowledge.engagingnetworks.net/pages/managing-validators)
- [Form Dependencies](https://knowledge.engagingnetworks.net/pages/form-dependencies)
- [Field updates](https://knowledge.engagingnetworks.net/pages/field-updates)
- [Conditional Content in pages](https://knowledge.engagingnetworks.net/pages/conditional-content-in-pages)
- [Display widgets](https://knowledge.engagingnetworks.net/pages/display-widgets)
- [Premium gift block](https://knowledge.engagingnetworks.net/pages/premium-gift-block)
- [Digital Wallets (Apple Pay, Google Pay, PayPal One Touch, Venmo)](https://knowledge.engagingnetworks.net/fundraising/digital-wallets-apple-pay-google-pay-paypal-one-to)
- [Enhancing Security at Engaging Networks (VGS)](https://knowledge.engagingnetworks.net/softwaresecurityandprivacy/enhancing-security-at-engaging-networks)
- [Pre-populating form fields](https://knowledge.engagingnetworks.net/youraccount/pre-populating-form-fields)
- [Locales](https://knowledge.engagingnetworks.net/pagebuilder/locales)
- [Processing rules: redirect and filter](https://knowledge.engagingnetworks.net/pages/processing-rules-redirect-and-filter)
- [Abandonment](https://knowledge.engagingnetworks.net/pages/abandonment)
- [Embedding pages in iframes](https://knowledge.engagingnetworks.net/pages/embedding-pages-in-iframes)
- [Adding Google Analytics tracking on your pages](https://knowledge.engagingnetworks.net/pages/adding-google-analytics-tracking-on-your-pages)
- [Supporter Hub](https://knowledge.engagingnetworks.net/pages/supporter-hub)
- [Events](https://knowledge.engagingnetworks.net/pages/events)
- [UK address validation with Loqate](https://knowledge.engagingnetworks.net/pages/uk-address-validation-with-loqate)
- [Smart Pages](https://knowledge.engagingnetworks.net/pages/smart-pages)
- [2026 Release Notes](https://knowledge.engagingnetworks.net/newsupdates/2026-release-notes) and [2025 Release Notes](https://knowledge.engagingnetworks.net/newsupdates/2025-release-notes)

See also: [ENgrid Features Overview](/docs/v2/features-overview) and [Multivariate and A/B Testing](/docs/v2/native-testing).
