---
title: Conditionally Require Fields
description: Learn how to conditionally require fields in your Engaging Networks forms using ENgrid.
---

Add the `i-required` class to a form component which will require every visible field; this is great for fields that are conditionally hidden like In Memorial fields. If a field is hidden it will not be required. Alternatively if you only want to require only some fields, not all of them, in the form component when it's visible you can use `i#-required` where `#` indicated the field number (e.g. the first field would get `i1-required`).

{% callout title="You should know!" %}
Form submissions for digital wallets do not trigger EN's form validation, and in turn our form validation does not trigger either because it depends on EN's. Submitting a form with a digital wallet does however trigger validation for the minimally required fields for that payment processor (e.g. Email Address). As an example, this means you could submit a PayPal OneTouch donation with only your email address filled out. There's nothing we can do about this at the moment and we have submitted it as feedback to EN.
{% /callout %}
