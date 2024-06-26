---
title: Payment Types
description: Learn about payment types options in ENgrid.
---

## Give by Select
#### Code Example for Card, Paypal, and Check

```html
<!-- Custom Radio Buttons using the same markup as Engaging Networks -->
<div class="en__component en__component--formblock give-by-select">
<div class="en__field en__field--radio en__field--000000 en__field--giveBySelect en__mandatory pseudo-en-field">
<div class="en__field__element en__field__element--radio">
<div class="en__field__item card"><input checked="checked" class="en__field__input en__field__input--radio" id="en__field_transaction_giveBySelect0" name="transaction.giveBySelect" type="radio" value="Card" /> <label class="en__field__label en__field__label--item" for="en__field_transaction_giveBySelect0">Card</label></div>

<div class="en__field__item paypal"><input class="en__field__input en__field__input--radio" id="en__field_transaction_giveBySelect1" name="transaction.giveBySelect" type="radio" value="Paypal" /> <label class="en__field__label en__field__label--item" for="en__field_transaction_giveBySelect1">PayPal</label></div>

<div class="en__field__item check"><input class="en__field__input en__field__input--radio" id="en__field_transaction_giveBySelect2" name="transaction.giveBySelect" type="radio" value="Check" /> <label class="en__field__label en__field__label--item" for="en__field_transaction_giveBySelect2">Check</label></div>
</div>
</div>
</div>
```
[https://pastebin.com/raw/PKkAgjfD](https://pastebin.com/raw/PKkAgjfD)

## Give by Select Helper Classes

The Give by Select pseudo field has its own markup; if it has the `en__field--give-by-select` class, then no additional classes are needed. You can change the number of buttons by including a second helper class or by defining your own values in CSS.

| Class                    | Description             |
| ------------------------ | ----------------------- |
| `give-by-select_count_1` | Shows 1 button per row  |
| `give-by-select_count_2` | Shows 2 buttons per row |
| `give-by-select_count_3` | Shows 3 buttons per row |
| `give-by-select_count_4` | Shows 4 buttons per row |
| `give-by-select_count_5` | Shows 5 buttons per row |

Utility classes to hide/show a component based on gift type.

| Class                 | Description                                    | Usable on Thank You Pages |
| --------------------- | ---------------------------------------------- | ------------------------- |
| `giveBySelect-Card`   | Show component when Give by Card is selected   | Yes                       |
| `giveBySelect-ACH`    | Show component when Give by Check is selected  | Yes                       |
| `giveBySelect-Paypal` | Show component when Give by Paypal is selected | Yes                       |

---

## PayPal Billing Agreement

{% callout title="Example Text " %}
PayPal Billing Agreement: By submitting this form, you agree to allow Organization Name to take funds from your account on a recurring basis.

{% /callout %}
