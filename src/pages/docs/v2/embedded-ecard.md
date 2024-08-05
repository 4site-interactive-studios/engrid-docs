---
title: Embedded Ecard
description: This page shows how to use ENgrid's embedded eCard functionality to create a donation page that also includes an option to send an eCard along with the donation.
---

Using ENgrid, you can embed an eCard page seamlessly into another ENgrid page, such as your donation page. This allows your supporters to send an eCard along with their donation all within the same page.

## Preparing an eCard page to be embedded

Any eCard page using ENgrid can be embedded into another ENgrid page.  However, there are a couple things to note about form fields on the page and you may want to add some extra custom styles to the eCard page to make it look optimal when embedded.

For form fields:

1. You must have an **email address field** on the eCard page.
2. You must **not** have any form fields (except the ecard block) that don't also exist on the parent page.
3. You must have a **submit button** on the eCard page.

For custom styling:

1. By default ENgrid will **hide all ENgrid sections except `body-main`** and **hide all sections within `body-main` except the eCard block** - this will give you the cleanest look for the embedded eCard form.
2. Double check how the embedded form looks to see if you need any more custom styling. In most cases you should not, but depending on your client theme you may need to add some extra styles.

### Single recipient eCards

If you're only allowing a single recipient for the eCard, then you can optionally add CSS to hide the "add recipient" or "+" button. This will make the form look cleaner and more intuitive for the user.

The Embedded Ecard component will then take the values of the "Name" and "Email" fields and use them as the recipient's name and email address, without the user needing to click the "Add recipient" button.

Below is an example of how to hide the "Add recipient" button with a code block:

```html
<style>
  .en__ecarditems__addrecipient {
    display: none;
  }
</style>
```


## Embedding an eCard page

On your parent page, in the custom code section, add a code block with the following content:

```html
<script>
  window.EngridEmbeddedEcard = {
    pageUrl: "", // Put the full URL of the eCard page here
  };
</script>
```

Now reload your page and you should see a checkbox that, when selected, will display the eCard form.

There are some additional options for this code block that can be used to adjust the position of the checkbox and its copy:

```html
<script>
  window.EngridEmbeddedEcard = {
    pageUrl: "", // The full URL of the eCard page
    headerText: "Send an Ecard notification of your gift", // The header text for the eCard section
    checkboxText: "Yes, I would like to send an ecard to announce my gift.", // The text next to the checkbox
    anchor: ".en__field--donationAmt", // The CSS selector for the element which we want to place the eCard section relative to
    placement: "afterend", // The placement of the eCard section relative to the anchor element: beforebegin, afterbegin, beforeend, afterend
  };
</script>
```
## On your thank you page

On the thank you page, you can use the custom class `showif-embedded-ecard-sent` to add some content that will only be visible if the eCard was sent.
