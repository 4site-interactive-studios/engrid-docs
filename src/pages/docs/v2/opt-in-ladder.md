---
title: Opt-in Ladder
description: Learn how to create an opt-in ladder on your Thank You pages.
---

With this component, you can embed an opt-in ladder on your Thank You pages, inviting your users to a series of opt-ins, one at a time. This is a great way to increase your opt-in rates and engage your users with your content.

## How it works

- If the page is not embedded in an iframe, and there are EN's Opt-In fields on the page, we will store the values to sessionStorage upon Form Submit.
- If the page is embedded in an iframe and on a Thank You Page, we will look for .optin-ladder elements, compare the values to sessionStorage, and show the next checkbox in the ladder, removing all but the first match.
- If the page is embedded in an iframe and on a Thank You Page, and the child iFrame is also a Thank You Page, we will look for a sessionStorage that has the current ladder step and the total number of steps.
- If the current step is less than the total number of steps, we will redirect to the first page. If the current step is equal to the total number of steps, we will show the Thank You Page.

## How to enable the Opt-in Ladder to your ENgrid Theme

Before setting up the Opt-in Ladder, you need to enable this component in your theme. To do this, follow these steps:

1. Open your theme's `index.ts` file.
2. Add the following code to the top of the file:

   ```ts
   import { OptInLadder } from '@4site/engrid-scripts'
   ```

3. Add the following code to the `onLoad` property of the `options` object:

   ```ts
   new OptInLadder()
   ```

4. Save the file.
5. Run the `npm run build` command to build your theme.
6. Upload the new assets to your Engaging Networks account.

## Creating an Opt-in Ladder Page on Engaging Networks

An Opt-in Ladder page is a simple Data Capture page with a series of opt-in fields. Each Form Block with an opt-in field is preceded by a Text Block with the heading of the opt-in. The Text Block is followed by the Form Block, and both have a CSS class of `optin-ladder`.

1. Create a new Data Capture page.
2. Add an invisible E-mail field to the page.
3. Add a Text Block to the page, for the first opt-in heading.
4. The Text Block should have a CSS class of `optin-ladder` AND a CSS class with the same ID of the opt-in field. Example, if the Opt-in field ID is `102600`, the Text Block should have the CSS class `optin-ladder optin-ladder-102600`. This way, the text block will be connected to the opt-in field, and when that step is completed, both Text Block and Form Block will be removed from the page.
5. Add a Form Block to the page, with the opt-in field. The Form Block should have a CSS class of `optin-ladder`. You don't need to add the same ID to the Form Block.
   {% callout title="Tip" %}
   You can add as many fields as you want to the Form Block, but only one Opt-in field.
   Example: If you want to add a checkbox inviting the user to get your SMS updates, you can also add the Mobile Phone field to the Form Block.
   {% /callout %}
6. Repeat steps 3-5 for each opt-in you want to add to the ladder.
7. Add a Submit Button to the page.
8. Create a Thank You page for the Opt-in Ladder. Every time a user completes a step, they will be redirected back to the Opt-in Ladder page, until they complete all the steps. When they complete the last step, they will see the Thank You page.

{% callout type="warning" title="Keep in mind!" %}
If the user loading the Opt-In ladder page has already completed all the steps, they will not see the ladder, and the iFrame will be hidden instead of showing the Thank You page on the iFrame.
{% /callout %}

## Adding the Opt-in Ladder to your Thank You Page

To add the Opt-in Ladder to your Thank You page, follow these steps:

1. Open your Donation or Advocacy page.
2. On the Thank You page, add a Code Block with an iFrame pointing to the Opt-in Ladder page:

   ```html
   <iframe
     loading="lazy"
     width="100%"
     scrolling="no"
     class="engrid-iframe"
     src="https://{URL_TO_OPTIN_LADDER_PAGE}/data/1?chain&engrid_hide[body-headerOutside]=class&engrid_hide[body-banner]=class&engrid_hide[content-footer]=class&engrid_hide[page-backgroundImage]=class"
     frameborder="0"
     allowfullscreen
     allowpaymentrequest="true"
     allow="payment"
   ></iframe>
   ```

3. Replace `{URL_TO_OPTIN_LADDER_PAGE}` with the URL of the Opt-in Ladder page.
4. Save the page.

That's it! Now, when a user completes the donation or advocacy form, they will see the Opt-in Ladder on the Thank You page.

{% callout type="warning" title="IMPORTANT!" %}
You need to keep the `?chain` parameter in the URL of the iFrame. This parameter is used to load the supporter's data from the parent page to the iFrame, and it will populate the E-mail field on the Opt-in Ladder page.
{% /callout %}
