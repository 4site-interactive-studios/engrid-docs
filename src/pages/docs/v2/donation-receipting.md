---
title: Donation Receipt Management with ENgrid and Page Builder
description: Learn the essentials of managing fundraising receipts with ENgrid and Page Builder, including how to create and customize receipts for various scenarios, and effectively attach and resend them in your donor communications.

---

## Managing Fundraising Receipts 

**Pages > Components > Tickets & Receipts**

[https://e-activist.com/index.html#receipt](https://e-activist.com/index.html#receipt)

There are seven types of receipts you can create, but OC only makes use of

* **Original Receipt** - For when someone makes a gift. [More information here](https://www.engagingnetworks.support/knowledge-base/fundraising-receipt/)
* **Replacement Receipt** - A replacement of an Original Receipt. [More information here](https://www.engagingnetworks.support/knowledge-base/gadgets-single-donations/) under the “Issuing a replacement receipt” heading.
* **Split Receipt** - When only one portion of the donation is eligible for a receipt. [More information here](https://www.engagingnetworks.support/knowledge-base/split-receipt/).
* **Annual Receipt** - Generating a list of transactions over a date range. These receipts can only be generated using the “Year End Receipting” batch process.  [More information here](http://www.engagingnetworks.support/knowledge-base/annual-receipting/).

Documentation: [https://support.engagingnetworks.net/fundraising-receipt](https://www.engagingnetworks.support/knowledge-base/fundraising-receipt/)


## Attaching a receipt link in a Thank You email 

Go to **Pages > Manage Pages** and edit the campaign (donation) page you want to add the receipt to. On the right-hand toolbar, click on Auto-responders and then Thank you email. If you haven't created a thank you email yet, you can create a new thank you email now. You can select the receipt from the dropdown. You can insert a link to this receipt in the email body with the WYSIWYG editor. Receipts sent in this way can be resent.

Screencast of inserting a receipt link: [https://d.pr/v/RNaK4V](https://d.pr/v/RNaK4V)


### Adding custom receipts scenarios (e.g. Recurring, Amount, Country, etc..) 

While in the **"Thank you email"** auto-responder pop-up click the green **"+"** tab to add custom receipting scenarios.

Screencast of adding custom receipt scenarios [https://d.pr/v/VcgTth](https://d.pr/v/VcgTth)


## Receipts with Premiums (Split Receipts) 

For receipts that take into account tax differences for donations that get premiums, use split receipts.


### Premium Scenario 
If a gift of $50 is made, and a $15 tshirt premium is received. The following values can be used:

* Donation: $50
* Value Advantage: $15
* Eligible Gift Amount: $35

We can present these values in any way we desire. For example:

Donation: $50 \
Tax Deductible Contribution: $35 

    Your Tax Deductible Contribution is calculated as your donation less any premium gift received.

* Premium Gifts Received: $15

Example PDF "Split Receipt" (not related to above scenario): [https://d.pr/i/4C3KjE](https://d.pr/i/4C3KjE)


## Re-sending a "Regular" receipt

Go to **Data & Reports > Look up Supporter** and search for your supporter in question. View their profile. From the “Single Donation” gadget you can reissue a copy of an original receipt, issue a replacement receipt, refund a donation, or change the tax status.

Click to expand the transaction and select **“Replacement Receipt”**. From the expanded area that appears choose the template for the Receipt from the “Replacement receipt:” dropdown. Then enter a sender email. Then you can ignore or choose a **“Select Template:”** option which just helps pre-populate email copy that prefecases the attached receipt. \
 \
Screencast of resending a receipt: [https://d.pr/v/ucWHNB](https://d.pr/v/ucWHNB)

Received email for **"Replacement Receipt"**: [https://d.pr/i/b0dCkk](https://d.pr/i/b0dCkk)


### Recurring Gift Receipting 

Not an option. According to EN support 
>We don't issue receipts for recurring donations because they are one part gift of a whole.


## Resending a "Premium Gift" receipt 

Same as a regular receipt but now you can resend the **"Original receipt"** along with a **"Replacement receipt"**

Screenshot of options: [https://d.pr/i/AJIzCc](https://d.pr/i/AJIzCc)


### Replacement Receipt vs Original Receipt 

A **“Replacement Receipt”** is similar to an original receipt but will create a new receipt ID when generated.


## Sending Annual Receipts 

Annual Receipting is done manually and in **"Batches"**. Following the instructions listed on the documentation: [https://support.engagingnetworks.net/annual-receipting](https://support.engagingnetworks.net/annual-receipting)

**NOTE: There is no way to "Test" annual receipting**


## Receipt for notification email 

**Account settings > Account Preferences > Attach receipt** for notification email (checkbox).

If this checkbox is ticked, we will also attach a copy of the receipt to your internal notification email for each successful transaction.


## To Be Documented v

* Split receipting copy / layout
* Copy that goes in email when resending a receipt
