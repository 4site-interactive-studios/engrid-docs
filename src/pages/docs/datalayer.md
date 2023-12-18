---
title: GTM / DataLayer
description: Quidem magni aut exercitationem maxime rerum eos.

---

## Page Load

When the page loads, it pushes the entire Engaging Networks `pageJson` into the DataLayer as GTM Custom Events and GTM Custom Variables. Each of those follows a different naming pattern.


### GTM Custom Events Naming Format 
```
dataLayer.push({event: "EN_PAGEJSON_LABEL"})
```

### GTM Custom Variables Naming Format
```
dataLayer.push({"EN_PAGEJSON_LABEL", "EN_PAGEJSON_VALUE"})
```

Note, that values are in all caps, and we replace spaces in the `pageJson` values with a `-`. Also, there is no single place where Engaging Networks lists all possible values that can or will appear on the pageJson, so you just have to test and document what you see.

With the above implementation, in GTM you will be able to set up Custom Triggers and Variables to fire the corresponding logic based on the different giving and form conditions.


### Examples of Donation Custom Events

| Variable                          | Description                        |
| --------------------------------- | ---------------------------------- |
| `EN_PAGEJSON_GIFTPROCESS-TRUE`    | A donation was successfully made   |
| `EN_PAGEJSON_RECURRING`           | A recurring donation was made      |



### Example Donation Variables ( screenshot: [https://cln.sh/T4GhF4](https://cln.sh/T4GhF4) )

 Variable                              | Description                          |
| ------------------------------------- | ------------------------------------ |
| `"EN_PAGEJSON_TRANSACTIONTYPE": "FCS"` | Fundraising Credit/Debit Single      |
| `"EN_PAGEJSON_TRANSACTIONTYPE": "FCR"` | Fundraising Credit/Debit Recurring   |
| `"EN_PAGEJSON_TRANSACTIONTYPE": "FBS"` | Fundraising Bank Single              |
| `"EN_PAGEJSON_TRANSACTIONTYPE": "FBR"` | Fundraising Bank Recurring           |
| `"EN_PAGEJSON_TRANSACTIONTYPE": "FBR"` | Fundraising In Memoriam              |
| `"EN_PAGEJSON_TRANSACTIONTYPE": "FCH"` | Fundraising Check                    |
| `"EN_PAGEJSON_TRANSACTIONTYPE": "FOC"` | Fundraising One Click                |
| `"EN_PAGEJSON_AMOUNT": 102`            |    |
| `"EN_PAGEJSON_FEECOVER": 2`            |   |
| `"EN_PAGEJSON_CURRENCY": "USD"`        |   |


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

Example of submitting an Email Subscription page type and landing on its thank you page.


```
dataLayer.push({
  event: "EN_SUBMISSION_SUCCESS_EMAILSUBSCRIBEFORM"
})
```
---

## Google Optimize 

Google Optimize with the anti-flicker snipper will kill your page load performance both perceived and real. In a test we ran where the only difference is Google Optimize being enabled/disabled we saw the page with it enabled load 241% slower than the one with it disabled ([8.7 seconds vs 3.6 seconds](https://d.pr/i/aFEb53)).

If you need Google Optimize consider creating a dedicated Page Template for it and using that page template only on select pages while testing them.