---
title: Ecard To Target
description: This page shows how to use ENgrid's Ecard To Target functionality
---

ENgrid can transform your standard eCard pages into a targeted advocacy action.  Your eCard page will function similar to an Email To Target page, with the eCard being sent to a predefined target.

## Creating an Ecard To Target Page

Creating an eCard to target page is simple. Just add a code block to your page that defines the `window.EngridEcardToTarget` variable.

It looks like this;

```html
<script>
  window.EngridEcardToTarget = {
    targetName: "Michael Thomas", // your target's full name
    targetEmail: "MichaelT@4sitestudios.com", // your target's email address
  }
</script>
```

There are also some additional options you can set to customise the behaviour and look of the page. 

Here are the full options, along with their default configuration:

```html
<script>
  window.EngridEcardToTarget = {
    targetName: "", // your target's full name
    targetEmail: "", // your target's email 
    hideSendDate: true, // OPTIONAL: hide the send date field
    hideTarget: true, // OPTIONAL: hide the target field
    hideMessage: true, // OPTIONAL: hide the message field
    addSupporterNameToMessage: false, // OPTIONAL: automatically add the supporter's name to the end of the message
</script>
```


