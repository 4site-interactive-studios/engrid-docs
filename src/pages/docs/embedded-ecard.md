---
title: Embedded Ecard
description: This page shows how to use ENgrid's embedded eCard functionality to create a donation page that also includes an option to send an eCard along with the donation.
---

Using ENgrid, you can embed an eCard page seamlessly into another ENgrid page, such as your donation page. This allows your supporters to send an eCard along with their donation all within the same page.

## Preparing an eCard page to be embedded

Any eCard page using ENgrid can be embedded into another ENgrid page.  However, there are a couple things to note about form fields on the page and you will likely want to add some extra custom styles to the eCard page to make it look good when embedded.

For form fields:

1. You must have an **email address field** on the eCard page.
2. You must **not** have any form fields (except the ecard block) that don't also exist on the parent page.
3. You must have a **submit button** on the eCard page.

Some custom styling tips for preparing an eCard page to be embedded:

1. **Hide all ENgrid sections except `body-main`** - this will clean up the page and make it look better when embedded, so that only the form is visible.
2. **Hide all sections within `body-main` except the eCard block** - this will ensure that only the eCard form is visible. The supporter does not need to enter their personal details again, so we can hide those fields.

```css 
/* Hide all page sections except body-main */
body[data-engrid-page-type="e-card"][data-engrid-embedded] .en__component--advrow > div:not(.body-main) {
  display: none;
}
/* Hide all sections within body-main except the eCard block */
body[data-engrid-page-type="e-card"][data-engrid-embedded] .body-main > *:not(.en__component--ecardblock) {
  display: none;
}
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


