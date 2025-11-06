---
title: Google Tag Manager (GTM DataLayer Setup)
description: Maximize your Engaging Networks platform's tracking capabilities by integrating Google Tag Manager and DataLayer with ENgrid. Learn how to capture custom events, define variables, and optimize your user data collection for more informed decisions and strategies.
---

4Site's ENgrid automatically takes all of the available data from your Engaging Networks pages and pushes it to Google Tag Manager's as GTM Custom Events and GTM Custom Variables. In order to take advantage of this data and use it in your reporting in Google Analytics, Google Ads, Meta, and more, you'll need to create a set of variables, triggers, and tags in your Google Tag Manager (GTM) container that will capture the data when a user lands on and interacts with your page.

When your Engaging Networks page loads on a user's screen, ENgrid automatically pushes all available data to the DataLayer in a single event called `pageJsonVariablesReady`. This event contains all `pageJson` properties (prefixed with `EN_PAGEJSON_*`), URL parameters (prefixed with `EN_URLPARAM_*`), recurring frequencies (for donation pages), and submission success variables. This allows you to see details like donation amount, donation frequency, currency, and more in GTM, GA4, Meta, and other analytics platforms you might use.

**Key Benefits:**

- **Automatic Data Pushing**: ENgrid automatically pushes all available data from Engaging Networks pages to the Data Layer
- **Comprehensive Tracking**: Capture donation amounts, supporter ID's, transaction IDs, and more
- **Multi-Platform Support**: Use data in Google Analytics, Google Ads, Meta, and other analytics platforms

This guide walks you through all of the variables, triggers, and tags you'll need to set up in GTM if you're using ENgrid.

---

# Prerequisites

Before setting up GTM with ENgrid, ensure you have:

1. **ENgrid Enabled**: Your Engaging Networks pages must be using ENgrid
2. **Transaction Details Exposed**: In your Engaging Networks Account Settings > Account Preferences, check the box to "Expose transaction details" to enable the `pageJson` object
3. **GTM Container**: Access to your Google Tag Manager container
4. **Meta Pixel ID** (if using Meta ads): Your Facebook/Meta Pixel ID for conversion tracking
5. **GA4 Configuration** (if using Google Analytics): Your GA4 Measurement ID

---

# Google Tag Manager Setup for EN Variables, Triggers & Tags

## Naming Conventions Best Practices:

In your Google Tag Manager account:

- Ensure all **variables** you create start with `"EN"`
- Ensure all **triggers** you create start with `"EN"`
- Ensure the **tags** you will set up are descriptive of their functions, so something like:
  1. Meta Pixel (if you're using Meta ads in your marketing)
  2. Meta \- Conversion \- EN Successful Donation
  3. GA4 \- Conversion \- EN Successful Donation

---

## Step 1: Add EN Variables

In GTM, **variables** are used to pull dynamic values from your site—like donation amounts, supporter ID's, and transaction IDs.

**Important Notes:**

- All of the variables listed below are **already being pushed into the Data Layer** as part of the `pageJsonVariablesReady` event that fires on every page load
- You do **not** need to write custom JavaScript to define them—they're there, and we're just telling GTM how to listen for them
- You will create "Data Layer Variable" types, setting the Data Layer Variable Name exactly as provided
- The `pageJsonVariablesReady` event fires once per page load and contains all the variables listed below

### To add each EN variable:

1. In your GTM container, go to **Variables** from the left-hand menu.
2. Scroll down to **User-Defined Variables**, and click **New**.
3. Choose **"Data Layer Variable"** as the type.
4. Set the **Data Layer Variable Name** exactly as shown in the table below.
5. Save.

Here are the variables you need to create:

| GTM Variable Name                        | Data Layer Variable Name      |
| :--------------------------------------- | :---------------------------- |
| ENgrid pageJson \- Transaction ID        | `EN_PAGEJSON_TRANSACTIONID`   |
| ENgrid pageJson \- Supporter ID          | `EN_PAGEJSON_SUPPORTERID`     |
| ENgrid pageJson \- Recurring Frequency   | `EN_RECURRING_FREQUENCIES` _(array of frequency values)_ |
| ENgrid pageJson \- Recurring             | `EN_PAGEJSON_RECURRING`       |
| ENgrid pageJson \- Receipt Number        | `EN_PAGEJSON_RECEIPTNUMBER`   |
| ENgrid pageJson \- Payment Type          | `EN_PAGEJSON_PAYMENTTYPE`     |
| ENgrid pageJson \- Page Type             | `EN_PAGEJSON_PAGETYPE`        |
| ENgrid pageJson \- Page Redirect Present | `EN_PAGEJSON_REDIRECTPRESENT` |
| ENgrid pageJson \- Page Number           | `EN_PAGEJSON_PAGENUMBER`      |
| ENgrid pageJson \- Page Name             | `EN_PAGEJSON_PAGENAME`        |
| ENgrid pageJson \- Page Count            | `EN_PAGEJSON_PAGECOUNT`       |
| ENgrid pageJson \- Locale                | `EN_PAGEJSON_LOCALE`          |
| ENgrid pageJson \- Gift Process          | `EN_PAGEJSON_GIFTPROCESS`     |
| ENgrid pageJson \- Fee Cover Amount      | `EN_PAGEJSON_FEECOVER`        |
| ENgrid pageJson \- Donation Frequency    | `EN_PAGEJSON_TRANSACTIONTYPE` |
| ENgrid pageJson \- Donation Currency     | `EN_PAGEJSON_CURRENCY`        |
| ENgrid pageJson \- Donation Amount       | `EN_PAGEJSON_AMOUNT`          |
| ENgrid pageJson \- Country               | `EN_PAGEJSON_COUNTRY`         |
| ENgrid pageJson \- Client ID             | `EN_PAGEJSON_CLIENTID`        |
| ENgrid pageJson \- Campaign Page ID      | `EN_PAGEJSON_CAMPAIGNPAGEID`  |
| ENgrid pageJson \- Campaign ID           | `EN_PAGEJSON_CAMPAIGNID`      |

---

## Step 2: Add EN Triggers

Triggers tell GTM _when_ to run a tag—like right after a successful donation, when a form loads, or when a user interacts with form fields.

These are **Custom Event Triggers**, meaning they fire based on named events your EN page is already sending to the GTM Data Layer.

---

### To create each EN trigger:

1. Click **"Triggers"** in the left menu.
2. Click **"New"**, and give it the name listed below.
3. Select **Trigger Type: Custom Event**.
4. Enter the **Event Name** exactly as shown.
5. Leave "This trigger fires on" set to **All Custom Events**.
6. Save.

Here are the EN triggers to add:

| Trigger Name                     | Event Name                        |
| :------------------------------- | :-------------------------------- |
| EN pageJson Variables Ready      | `pageJsonVariablesReady`           |
| EN Form Value Updated             | `EN_FORM_VALUE_UPDATED`            |
| EN Submission With Email Opt-In   | `EN_SUBMISSION_WITH_EMAIL_OPTIN`   |
| EN Submission Without Email Opt-In | `EN_SUBMISSION_WITHOUT_EMAIL_OPTIN` |

**Important Notes:**

- The `pageJsonVariablesReady` event fires on every page load and contains all `EN_PAGEJSON_*` variables, `EN_URLPARAM_*` variables, `EN_RECURRING_FREQUENCIES` (for donation pages), and `EN_SUBMISSION_SUCCESS_{PAGETYPE}` variables when on the final page
- To detect a successful donation, use the `pageJsonVariablesReady` trigger with a condition: `EN_PAGEJSON_GIFTPROCESS` equals `"TRUE"`
- The `EN_SUBMISSION_SUCCESS_{PAGETYPE}` is a variable (not an event) that appears in the `pageJsonVariablesReady` event payload when `pageNumber` equals `pageCount` (i.e., on the final page)
- `EN_FORM_VALUE_UPDATED` fires whenever a user changes a form field value (blur for text inputs, change for checkboxes/radios/selects)
- The submission opt-in/out events fire when a form is submitted, indicating whether the user checked an email opt-in checkbox

---

## Step 3: Add These Tags

Let's connect everything together using **tags** that fire when someone completes a donation (and beyond, in the case of the Meta Pixel).

---

### 1\. Meta Pixel

This tag fires on every page to track page activity within your Meta Events Manager.

#### Instructions:

1. Go to **Tags** \> **New**
2. Name it: `Meta Pixel` (or something similar if you already had an old Meta Pixel tag prior to moving onto ENgrid)
3. Choose **Tag Type "Facebook Pixel" from the Gallery of built-in tags**.
4. Paste in your Meta Pixel base code (tip: create a variable with your Meta Pixel ID and enter it into this tag as a variable. That way, if your Pixel ID ever changes, you can update it on the variable and not have to do so across all your tags in GTM). Screenshot: [https://cln.sh/FPdS6SnV](https://cln.sh/FPdS6SnV)
5. Under "Advanced Settings" \> "Tag firing options," select "Once per event."
6. Add the **Trigger**: `All Pages`
7. Save

---

### 2\. Facebook \- Conversion \- EN Successful Donation

This tag tells Facebook when someone completes a donation.

#### Instructions:

1. Go to **Tags** \> **New**
2. Name it: `Facebook - Conversion - EN Successful Donation` (or something similar if you already had an old Meta Pixel tag prior to moving onto ENgrid)
3. Choose **Tag Type "Facebook Pixel" from the Gallery of built-in tags**.
4. Paste in your Meta Pixel base code (tip: create a variable with your Meta Pixel ID and enter it into this tag as a variable. That way, if your Pixel ID ever changes, you can update it on the variable and not have to do so across all your tags in GTM).
5. Make sure object properties "value" and "currency" are added (screenshot: [https://cln.sh/660bJHLP](https://cln.sh/660bJHLP))
6. For the **Trigger**, create a custom trigger:
   - Select **Trigger Type: Custom Event**
   - Event name: `pageJsonVariablesReady`
   - Add a condition: `EN_PAGEJSON_GIFTPROCESS` equals `"TRUE"`
   - Name it: `EN Successful Donation` (or similar)
   - Save the trigger, then assign it to this tag

---

### 3\. GA4 \- Conversion \- EN Successful Donation

This tag sends a conversion event to Google Analytics 4 whenever a donation is successful.

#### Instructions:

1. Go to **Tags** \> **New**
2. Name it: `GA4 - Conversion - EN Successful Donation` (or something similar within your naming conventions).
3. Choose **Tag Type**: `GA4 Event`
4. Select your **GA4 Configuration Tag** (or enter the Measurement ID manually, ideally as its own variable so it's easier to swap out if it changes down the line).
5. Set **Event Name** to: `purchase`
6. Under **Event Parameters**, create a new variable called `"EN Donation - GA4 Event Parameters"` (or something similar in your naming convention).
7. Add the following event parameters by clicking the lego icon and selecting the variables you just created. Full list below for reference:

| Parameter Name                                                                      | Value                                         |
| :---------------------------------------------------------------------------------- | :-------------------------------------------- |
| ENgrid pageJson \- Locale                                                           | `{{ENgrid pageJson - Locale}}`                |
| ENgrid pageJson \- Page Name                                                        | `{{ENgrid pageJson - Page Name}}`             |
| ENgrid pageJson \- Page Number                                                      | `{{ENgrid pageJson - Page Number}}`           |
| ENgrid pageJson \- Page Redirect Present                                            | `{{ENgrid pageJson - Page Redirect Present}}` |
| ENgrid pageJson \- Page Type                                                        | `{{ENgrid pageJson - Page Type}}`             |
| ENgrid pageJson \- Payment Type                                                     | `{{ENgrid pageJson - Payment Type}}`          |
| ENgrid pageJson \- Receipt Number                                                   | `{{ENgrid pageJson - Receipt Number}}`        |
| ENgrid pageJson \- Recurring Donation Made                                          | `{{ENgrid pageJson - Recurring}}`             |
| ENgrid pageJson \- Recurring Frequency                                              | `{{ENgrid pageJson - Recurring Frequency}}`   |
| ENgrid pageJson \- Transaction ID                                                   | `{{ENgrid pageJson - Transaction ID}}`        |
| ENgrid pageJson \- Supporter ID _(note: this can be listed under "User properties)_ | `{{ENgrid pageJson - Supporter ID}}`          |
| ENgrid pageJson \- Donation Amount                                                  | `{{ENgrid pageJson - Donation Amount}}`        |

8. For the **Trigger**, create a custom trigger:
   - Select **Trigger Type: Custom Event**
   - Event name: `pageJsonVariablesReady`
   - Add a condition: `EN_PAGEJSON_GIFTPROCESS` equals `"TRUE"`
   - Name it: `EN Successful Donation` (or similar)
   - Save the trigger, then assign it to this tag

9. Click **Save**

Tip: The variables listed above are already being pushed to the data layer as part of the `pageJsonVariablesReady` event, so this tag will automatically pull the correct values at the right time when the gift process condition is met.

---

# Testing and Validation

After setting up your GTM configuration:

1. **Preview Mode**: Use GTM's Preview mode to test your setup
2. **Data Layer Inspection**: Check the browser console to see events being pushed
3. **Real-Time Reports**: Verify data appears in GA4 and Meta Events Manager
4. **Test Transactions**: Complete test donations to ensure conversion tracking works

---

# Troubleshooting

**Common Issues:**

- **Variables not populating**: Ensure the Data Layer Variable Names match exactly
- **Events not firing**: Check that triggers are set to "All Custom Events" (when applicable)
- **Missing data**: Verify "Expose transaction details" is enabled in Engaging Networks
- **GTM not loading**: Ensure GTM is properly installed on your pages and you're not running an Ad Blocker

---

# pageJson Properties

The `pageJson` object may include the following properties (not all are always present):

- `amount`: The amount of the donation (if made)
- `appealCode`: The Appeal Code (if applicable)
- `campaignId`: The master campaign ID
- `campaignPageId`: The page-builder’s campaign ID, as seen in the URL
- `clientId`: Your organisation’s (subaccount) unique ID
- `country`: The supporter’s tagged Country value
- `currency`: The currency of the donation (if made), e.g. USD
- `donationLogId`: The unique ID of the donation, if made
- `giftProcess`: Boolean (true or false) – whether a donation has been made or not
- `locale`: The locale code, e.g. en-US
- `pageCount`: The number of pages in the campaign
- `pageName`: The internal name of your page-builder campaign
- `pageNumber`: The page number of the campaign
- `pageType`: The page type, one of advocacypetition, click2call, datacapture, donation, e-card, e-commerce, event, emailsubscribeform, emailtotarget, membership, peer-to-peerevent, premiumgift, splitpage, staticpage, supporterhub, survey, tweetpage, unsubscribe
- `paymentType`: The payment type of a donation if applicable, e.g. VISA
- `receiptNumber`: The receipt number
- `recurring`: Boolean (true or false) – whether the donation was recurring or not, if applicable
- `redirectPresent`: Boolean (true or false) – whether a redirect is present in the page structure
- `supporterId`: The unique ID of the supporter, generated after submission
- `trackingId`: The tracking ID seen in the URL (if applicable)
- `transactionType`: The three-letter campaign type of the donation, if made, e.g. FCR
- `upsell`: Details on upsell lightbox include originalAmount (donation amount originally selected by supporter), name (lightbox name), and conversion (single to recurring or recurring upgrade)
- `transactionId`: The unique ID of the donation, generated after submission
- E-commerce fields: `cartItems`, `productVariants`, `index`, `productVariantId`, `quantity`, `bestPrice`, `quantitySold`, `optionNames`, `price`, `salesPrice`, etc.

Not all properties are always present. For example, `supporterId` and `country` are only available after submission.

For a full list of possible `pageJson` properties, see EN's documentation [Expose transaction details (pageJson)](https://knowledge.engagingnetworks.net/datareports/expose-transaction-details-pagejson).

---

# Field Exclusion and Hashing

Some fields are excluded from the DataLayer for privacy/security reasons:

**Excluded fields:**

- Credit Card: `transaction.ccnumber`, `transaction.ccexpire.delimiter`, `transaction.ccexpire`, `transaction.ccvv`, `supporter.creditCardHolderName`
- Bank: `supporter.bankAccountNumber`, `supporter.bankAccountType`, `transaction.bankname`, `supporter.bankRoutingNumber`

**Hashed fields:** (values are base64-encoded before being pushed)

- Supporter contact/address: `supporter.emailAddress`, `supporter.phoneNumber`, `supporter.phoneNumber2`, `supporter.address1`, `supporter.address2`, `supporter.address3`
- In Honor/Memory: `transaction.infemail`, `transaction.infadd1`, `transaction.infadd2`, `transaction.infadd3`
- Billing address: `supporter.billingAddress1`, `supporter.billingAddress2`, `supporter.billingAddress3`

---

# Event Value Transformations

- String values are transformed to uppercase, spaces replaced with dashes, and `:-` replaced with `-`.
- Boolean values are transformed to `"TRUE"` or `"FALSE"`.
- Numeric values are preserved as numbers (not converted to strings) to allow analytics platforms to properly infer number vs string types.

---

# Premium Gift Handling

When the field name is `en__pg` (premium gift), the `EN_FORM_VALUE_UPDATED` event includes:

- `enFieldName`
- `enFieldLabel` (always "Premium Gift")
- `enFieldValue` (gift name)
- `enProductId` (from `transaction.selprodvariantid`)

---

# End of Gift Process Events (Advanced)

ENgrid stores certain events in sessionStorage at the end of the gift process and replays them on the next page load. This is an advanced feature for tracking multi-step flows and ensuring all events are captured.

## Developer API

If you need to add custom events or variables that should be pushed to the DataLayer after a successful donation (when the gift process page loads), you can use these public methods:

### `addEndOfGiftProcessEvent(eventName, eventProperties)`

Adds a custom event that will be pushed to the DataLayer when the gift process page loads.

**Parameters:**
- `eventName` (string): The name of the event to push
- `eventProperties` (object, optional): Additional properties to include with the event

**Example:**
```javascript
window._dataLayer.addEndOfGiftProcessEvent('custom_donation_event', {
  donationSource: 'email_campaign',
  campaignName: 'Summer Appeal'
});
```

### `addEndOfGiftProcessVariable(variableName, variableValue)`

Adds a custom variable that will be pushed to the DataLayer when the gift process page loads.

**Parameters:**
- `variableName` (string): The name of the variable (will be converted to uppercase)
- `variableValue` (any, optional): The value of the variable

**Example:**
```javascript
window._dataLayer.addEndOfGiftProcessVariable('custom_donation_source', 'email_campaign');
```

**How it works:**

1. When you call these methods during the donation flow, the events/variables are stored in `sessionStorage`
2. When the gift process page loads (detected by `ENGrid.getGiftProcess()` returning `true`), all stored events/variables are automatically pushed to the DataLayer
3. The stored data is then cleared from `sessionStorage`

This ensures that events and variables captured during the donation process are available on the confirmation/thank you page for proper tracking.

---

# Comprehensive Examples

## Example: pageJson on a Petition Page

Page 1 (before submission):

```js
var pageJson = {
  clientId: 94,
  pageCount: 2,
  pageName: 'ENCC17 petition',
  giftProcess: false,
  campaignId: 4757,
  campaignPageId: 6565,
  pageNumber: 1,
  locale: 'en-GB',
}
```

Page 2 (after submission):

```js
var pageJson = {
  clientId: 94,
  pageCount: 2,
  pageName: 'ENCC17 petition',
  giftProcess: false,
  campaignId: 4757,
  campaignPageId: 6565,
  supporterId: 2259636,
  country: 'GBR',
  pageNumber: 2,
  locale: 'en-GB',
}
```

## Example: pageJson on a Donation Page

Page 1 (before donation):

```js
var pageJson = {
  pageName: 'ENCC17 Donation page',
  clientId: 94,
  giftProcess: false,
  pageCount: 2,
  pageNumber: 1,
  campaignId: 4789,
  campaignPageId: 6665,
  locale: 'en-GB',
}
```

Page 2 (after donation):

```js
var pageJson = {
  pageName: 'ENCC17 Donation page',
  clientId: 94,
  giftProcess: true,
  donationLogId: 550154,
  pageCount: 2,
  pageNumber: 2,
  amount: 30,
  receiptNumber: 0,
  campaignId: 4789,
  campaignPageId: 6665,
  paymentType: 'TEST: VISA',
  recurring: false,
  supporterId: 2259636,
  country: 'GBR',
  locale: 'en-GB',
  currency: 'GBP',
  transactionType: 'FCS',
}
```
