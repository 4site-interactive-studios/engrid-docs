---
title: Google Tag Manager (GTM DataLayer Setup)
description: Maximize your Engaging Networks platform's tracking capabilities by integrating Google Tag Manager and DataLayer with ENgrid. Learn how to capture custom events, define variables, and optimize your user data collection for more informed decisions and strategies.

---

4Site’s ENgrid automatically takes all of the available data from your Engaging Networks pages and pushes it to Google Tag Manager’s data layer as individual events. In order to take advantage of this data and use it in your reporting in Google Analytics, Google Ads, Meta, and more, you’ll need to create a set of variables, triggers, and tags in your Google Tag Manager (GTM) container that will capture the data when a user lands on and interacts with your page.

When your Engaging Networks page loads on a user's screen, it pushes the entire Engaging Networks `pageJson` into the DataLayer as GTM Custom Events and GTM Custom Variables. This allows you to see details like donation amount, donation frequency, currency, and more in GTM, GA4, Meta, and other analytics platforms you might use. Each of those follows a different naming pattern.

This guide walks you through all of the variables, triggers, and tags you’ll need to set up in GTM if you’re using ENgrid.



# Google Tag Manager Setup for EN Variables, Triggers & Tags

## Naming Conventions:

In your Google Tag Manager account:

- Ensure all **variables** you create start with `"EN"`  
- Ensure all **triggers** you create start with `"EN"`  
- Ensure the **three tags** you will set up are descriptive of their functions, so something like:  
  1. Meta Pixel (if you’re using Meta ads in your marketing)  
  2. Meta \- Conversion \- EN Successful Donation  
  3. GA4 \- Conversion \- EN Successful Donation

---

## Step 1: Add EN Variables

In GTM, **variables** are used to pull dynamic values from your site—like donation amounts, supporter names, and transaction IDs.

**Note**: All of the variables listed below are **already being pushed into the Data Layer** as part of various events (like successful donations, recurring page loads, and errors). You do **not** need to write custom JavaScript to define them—they’re there, and we’re just telling GTM how to listen for them.

### To add each EN variable:

1. In your GTM container, go to **Variables** from the left-hand menu.  
2. Scroll down to **User-Defined Variables**, and click **New**.  
3. Choose **"Data Layer Variable"** as the type.  
4. Set the **Data Layer Variable Name** exactly as shown in the table below.  
5. Save.

Here are the variables you need to create:

| GTM Variable Name | Data Layer Variable Name |
| :---- | :---- |
| ENgrid pageJson \- Transaction ID | `EN_PAGEJSON_TRANSACTIONID` |
| ENgrid pageJson \- Supporter ID | `EN_PAGEJSON_SUPPORTERID` |
| ENgrid pageJson \- Recurring Frequency | `EN_RECURRING_FREQUENCIES` |
| ENgrid pageJson \- Recurring | `EN_PAGEJSON_RECURRING` |
| ENgrid pageJson \- Receipt Number | `EN_PAGEJSON_RECEIPTNUMBER` |
| ENgrid pageJson \- Payment Type | `EN_PAGEJSON_PAYMENTTYPE` |
| ENgrid pageJson \- Page Type | `EN_PAGEJSON_PAGETYPE` |
| ENgrid pageJson \- Page Redirect Present | `EN_PAGEJSON_REDIRECTPRESENT` |
| ENgrid pageJson \- Page Number | `EN_PAGEJSON_PAGENUMBER` |
| ENgrid pageJson \- Page Name | `EN_PAGEJSON_PAGENAME` |
| ENgrid pageJson \- Page Count | `EN_PAGEJSON_PAGECOUNT` |
| ENgrid pageJson \- Locale | `EN_PAGEJSON_LOCALE` |
| ENgrid pageJson \- Gift Process | `EN_PAGEJSON_GIFTPROCESS` |
| ENgrid pageJson \- Fee Cover Amount | `EN_PAGEJSON_FEECOVER` |
| ENgrid pageJson \- Donation Frequency | `EN_PAGEJSON_TRANSACTIONTYPE` |
| ENgrid pageJson \- Donation Currency | `EN_PAGEJSON_CURRENCY` |
| ENgrid pageJson \- Donation Amount | `EN_PAGEJSON_AMOUNT` |
| ENgrid pageJson \- Country | `EN_PAGEJSON_COUNTRY` |
| ENgrid pageJson \- Client ID | `EN_PAGEJSON_CLIENTID` |
| ENgrid pageJson \- Campaign Page ID | `EN_PAGEJSON_CAMPAIGNPAGEID` |
| ENgrid pageJson \- Campaign ID | `EN_PAGEJSON_CAMPAIGNID` |

These variables are made available **within GTM automatically when one of the EN events fires**, such as `EN_SUCCESSFUL_DONATION`.

---

## Step 2: Add EN Triggers

Triggers tell GTM *when* to run a tag—like right after a successful donation or when a form loads.

These are **Custom Event Triggers**, meaning they fire based on named events your website is already sending to the GTM Data Layer.

### To create each EN trigger:

1. Click **"Triggers"** in the left menu.  
2. Click **"New"**, and give it the name listed below.  
3. Select **Trigger Type: Custom Event**.  
4. Enter the **Event Name** exactly as shown.  
5. Leave "This trigger fires on" set to **All Custom Events**.  
6. Save.

Here are the EN triggers to add:

| Trigger Name | Event Name |
| :---- | :---- |
| EN Successful Donation | `EN_SUCCESSFUL_DONATION` |
| EN\_SUBMISSION\_SUCCESS\_\* | `^EN_SUBMISSION_SUCCESS_(.+)$` |

Each of these events also sends the EN variables listed above into the Data Layer—so the triggers and variables work hand in hand.

  
---

## Step 3: Add These Tags

Let’s connect everything together using **three key tags** that fire when someone completes a donation (and beyond, in the case of the Meta Pixel).

---

### 1\. Meta Pixel

This tag fires on every page to track page activity within your Meta Events Manager.

#### Instructions:

1. Go to **Tags** \> **New**  
2. Name it: `Meta Pixel` (or something similar if you already had an old Meta Pixel tag prior to moving onto ENgrid)  
3. Choose **Tag Type “Facebook Pixel” from the Gallery of built-in tags**.  
4. Paste in your Meta Pixel base code (tip: create a variable with your Meta Pixel ID and enter it into this tag as a variable. That way, if your Pixel ID ever changes, you can update it on the variable and not have to do so across all your tags in GTM). Screenshot: [https://cln.sh/FPdS6SnV](https://cln.sh/FPdS6SnV)  
5. Under “Advanced Settings” \> “Tag firing options,” select “Once per event.”  
6. Add the **Trigger**: `All Pages`  
7. Save

---

### 2\. Facebook \- Conversion \- EN Successful Donation

This tag tells Facebook when someone completes a donation.

#### Instructions:

1. Go to **Tags** \> **New**  
2. Name it: `Facebook - Conversion - EN Successful Donation` (or something similar if you already had an old Meta Pixel tag prior to moving onto ENgrid)  
3. Choose **Tag Type “Facebook Pixel” from the Gallery of built-in tags**.  
4. Paste in your Meta Pixel base code (tip: create a variable with your Meta Pixel ID and enter it into this tag as a variable. That way, if your Pixel ID ever changes, you can update it on the variable and not have to do so across all your tags in GTM).  
5. Make sure object properties “value” and “currency” are added (screenshot: [https://cln.sh/660bJHLP](https://cln.sh/660bJHLP))  
6. Make sure this tag is associated with the firing trigger “EN Successful Donation” as in the screenshot above.

---

### 3\. GA4 \- Conversion \- EN Successful Donation

This tag sends a conversion event to Google Analytics 4 whenever a donation is successful.

#### Instructions:

1. Go to **Tags** \> **New**  
2. Name it: `GA4 - Conversion - EN Successful Donation` (or something similar within your naming conventions).  
3. Choose **Tag Type**: `GA4 Event`  
4. Select your **GA4 Configuration Tag** (or enter the Measurement ID manually, ideally as its own variable so it’s easier to swap out if it changes down the line).  
5. Set **Event Name** to: `purchase`  
6. Under **Event Parameters**, create a new variable called `“EN Donation - GA4 Event Parameters”` (or something similar in your naming convention).  
7. Add the following event parameters by clicking the lego icon and selecting the variables you just created. Full list below for reference:  
   

| Parameter Name | Value |
| :---- | :---- |
| ENgrid pageJson \- Locale | `{{ENgrid pageJson - Locale}}` |
| ENgrid pageJson \- Page Name | `{{ENgrid pageJson - Page Name}}` |
| ENgrid pageJson \- Page Number | `{{ENgrid pageJson - Page Number}}` |
| ENgrid pageJson \- Page Redirect Present | `{{ENgrid pageJson - Page Redirect Present}}` |
| ENgrid pageJson \- Page Type | `{{ENgrid pageJson - Page Type}}` |
| ENgrid pageJson \- Payment Type | `{{ENgrid pageJson - Payment Type}}` |
| ENgrid pageJson \- Receipt Number | `{{ENgrid pageJson - Receipt Number}}` |
| ENgrid pageJson \- Recurring Donation Made | `{{ENgrid pageJson - Recurring}}` |
| ENgrid pageJson \- Recurring Frequency | `{{ENgrid pageJson - Recurring Frequency}}` |
| ENgrid pageJson \- Transaction ID | `{{ENgrid pageJson - Transaction ID}}` |
| ENgrid pageJson \- Supporter ID *(note: this can be listed under “User properties)* | `{{ENgrid pageJson - Supporter ID}}` |

8. For the **Trigger**, choose: `EN Successful Donation`  
     
9. Click **Save**

Tip: The variables listed above are already being pushed to the data layer when the `EN_SUCCESSFUL_DONATION` event fires, so this tag will automatically pull the correct values at the right time.  

### Examples of Donation Custom Events

When you test your pages, you will see events with their associated data being pushed into GTM. A couple of examples can be found below.

| Variable                          | Description                        |
| --------------------------------- | ---------------------------------- |
| `EN_PAGEJSON_GIFTPROCESS-TRUE`    | A donation was successfully made   |
| `EN_PAGEJSON_RECURRING`           | A recurring donation was made      |



### Example Donation Variables ( screenshot: [https://cln.sh/T4GhF4](https://cln.sh/T4GhF4) )



 Variable                              | Description                          |
| ------------------------------------- | ------------------------------------ |
| `EN_PAGEJSON_TRANSACTIONTYPE: "FCS"` | Fundraising Credit/Debit Single       |
| `EN_PAGEJSON_TRANSACTIONTYPE: "FCR"` | Fundraising Credit/Debit Recurring   |
| `EN_PAGEJSON_TRANSACTIONTYPE: "FBS"` | Fundraising Bank Single              |
| `EN_PAGEJSON_TRANSACTIONTYPE: "FBR"` | Fundraising Bank Recurring           |
| `EN_PAGEJSON_TRANSACTIONTYPE: "FBR"` | Fundraising In Memoriam              |
| `EN_PAGEJSON_TRANSACTIONTYPE: "FCH"` | Fundraising Check                    |
| `EN_PAGEJSON_TRANSACTIONTYPE: "FOC"` | Fundraising One Click                |
| `EN_PAGEJSON_AMOUNT: 102`            |                                      |
| `EN_PAGEJSON_FEECOVER: 2`            |                                     |
| `EN_PAGEJSON_CURRENCY: "USD"`        |                                     |


### On page load we trigger an event and record all the gift frequency options on the page 

GTM Event: `EN_RECURRING_FREQUENCIES`

Example of loading a page with One-time and Monthly donation options

```
dataLayer.push({
  event: "EN_RECURRING_FREQUENCIES",
  'EN_RECURRING_FREQEUENCIES': ["ONETIME", "MONTHLY"]
})
```

### On field changes, we trigger an event and record the field name, label, and value 

GTM Event: `EN_FORM_VALUE_UPDATED`

Fields that are **excluded**: [https://cln.sh/FZwmk1sQ](https://cln.sh/FZwmk1sQ)

```
// Credit Card
transaction.ccnumber
transaction.ccexpire.delimiter
transaction.ccexpire
transaction.ccvv
supporter.creditCardHolderName
// Bank Account
supporter.bankAccountNumber
supporter.bankAccountType
transaction.bankname
```


`supporter.bankRoutingNumber` \
 \
Fields that get their values **hashed**: [https://cln.sh/2JldnGGg](https://cln.sh/2JldnGGg)

```
// Supporter Address, Phone Numbers, and Address
supporter.emailAddress
supporter.phoneNumber
supporter.phoneNumber2
supporter.address1
supporter.address2
supporter.address3

// In Honor/Memory Inform Email and Address
transaction.infemail
transaction.infadd1
transaction.infadd2
transaction.infadd3

// Billing Address
supporter.billingAddress1
supporter.billingAddress2
supporter.billingAddress3
```


Example of switching from one-time to monthly.

```
dataLayer.push({
  event: "EN_FORM_VALUE_UPDATED",
  enFieldName: "transaction.recurrfreq",
  enFieldLabel: "Recurring Frequency",
  enFieldValue: "MONTHLY"
})
```

### On a successful, final form submission

Note: Triggered when the current pageNumber is equal to the pageCount. \
GTM Event: `EN_SUBMISSION_SUCCESS_{Page Type}`

For example, if you submit an Email Subscription page type and land on its thank you page., this event will be triggered.


```
dataLayer.push({
  event: "EN_SUBMISSION_SUCCESS_EMAILSUBSCRIBEFORM"
})
```
