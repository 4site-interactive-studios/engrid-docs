---
title: Amount
description: Learn about gift amount options in ENgrid.
---

## Gift Amount Helper Classes
Makes the Gift Amount Radio Inputs look like Buttons. Also works as a page level class.

```
radio-to-buttons_donationAmt
```

When the Radio to Buttons class is added you can change the number of buttons by including a second helper class or by defining your own values in CSS.

| Class                     | Description             |
| ------------------------- | ----------------------- |
| `donation-amount_count_1` | Shows 1 button per row  |
| `donation-amount_count_2` | Shows 2 buttons per row |
| `donation-amount_count_3` | Shows 3 buttons per row |
| `donation-amount_count_4` | Shows 4 buttons per row |
| `donation-amount_count_5` | Shows 5 buttons per row |

---

## Live Giving Amounts
Added as classes on content) ([example](https://d.pr/v/zjkzde))

- `live-giving-amount`
    - If $60 one-time is selected without Processing Fee
        - $60 = **$60**
    - If $60 one-time is selected with Processing Fee
        - $60 + Processing Fee ($60 \* .029 + $0.30) = **$62.04**
- `live-giving-frequency`
    - If $60 one-time is selected
        - The value is `blank`
    - If $60 monthly is selected
        - The value is `monthly` because the value in the frequency selector is `monthly`
- `live-giving-upsell-amount`
    - If $60 `one-time` is selected without Processing Fee
        - $60 / 12 months = $5 (Rounded up by $5) = **$5**
    - If $60.01 `one-time` is selected without Processing Fee
        - $60.01 / 12 months = $5.00083 (Rounded up by $5) = **$10**
    - If $60 `one-time` is selected with Processing Fee
        - $60 + Processing Fee ($60 \* .029 + $0.30) = $62.04
        - $62.04 / 12 months = $5.17 (Rounded up by $5) = **$10**
    - If $60.01 `one-time` is selected with Processing Fee
        - $60.01 + Processing Fee ($60.01 \* .029 + $0.30) = $62.040
        - $62.040 / 12 months = $5.17 (Rounded up by $5) = **$10**
- `live-giving-upsell-amount-raw`
    - Same as `live-giving-upsell-amount` but no `$` symbol prefixed

---
## Hide / Show content based on amount


{% callout title="You should know!" %}
These classes can also be used on thank you pages
{% /callout %}

Utility classes to hide/show a component based on giving amount.

```
showifamount-{operand}-{value}
```

{% callout title="You should know!" %}
`showifamount`- classes can also be used on thank you pages
{% /callout %}

**Operands:**

- lessthan - Shows component when giving amount is less than {value} - Example:

```
showifamount-lessthan-10

```

- lessthanorequalto - Shows component when giving amount is less than or equal to {value} - Example:

```
showifamount-lessthanorequalto-10
```

- equalto - Shows component when giving amount is exactly equal to {value} - Example:

```
showifamount-equalto-10
```

- greaterthanorequalto - Shows component when giving amount is greater than or equal to {value} - Example:

```
showifamount-greaterthanorequalto-10
```

- greaterthan - Shows component when giving amount is greater than {value} - Example:

```
showifamount-greaterthan-10
```

- between - Shows component when giving amount is between {valuemin} and {valuemax} - Example:

```
showifamount-between-10-100
```

---

## Native Ask String / Swap Lists

This is documentation about managing the ask string swap list in Engaging Networks and is not specific to ENgrid, but it comes up often enough that we have a step-by-step guide. Here is how to update One-time or Monthly giving amounts on a page that uses a Form Component with a Swap List.

| Step | Instruction                                                                                                        | Screenshot                            |
|------|--------------------------------------------------------------------------------------------------------------------|---------------------------------------|
| 1    | Edit the Form Component with the “Donation Amount” field.                                                          | [screenshot](https://cln.sh/xQVrHW62) |
| 2    | If linked, unlink the Form Component from the Component Library.                                                   | [screenshot](https://cln.sh/7RxGjNSJ) |
| 3    | Save the form component back to the component library with an appropriate name that includes the amounts.          | [screenshot](https://cln.sh/hdVVVhyn) |
| 4    | Click the Dependencies icon.                                                                                       | [screenshot](https://cln.sh/xzySrCx3) |
| 5    | Click the pencil (edit) icon on your desired option in the pop-up.                                                 | [screenshot](https://cln.sh/jr1hVC5V) |
| 6    | Manage the “Swap List” by clicking the pencil icon next to the associated Swap List.                               | [screenshot](https://cln.sh/HChLSdLj) |
| 7    | Click the pencil icon next to the Monthly Swap List in the pop-up.                                                 | [screenshot](https://cln.sh/x6LMD9nq) |
| 8    | Edit the pre-defined giving amounts for Monthly.                                                                   | -                                     |
| 9    | IMPORTANT: Ensure the value is updated when changing the label.                                                    | [screenshot](https://cln.sh/bx5S20Gf) |
| 10   | **IMPORTANT**: The last option should always be “Other” with a value of “other”.                                   | [screenshot](https://cln.sh/BFZSlWJr) |
| 11   | **IMPORTANT**: Understand how the default amount for the One-time Swap List works.                                 | [recording](https://cln.sh/HrqSd22t)  |
| 12   | Save the swap list, and close the pop-up.                                                                          | [screenshot](https://cln.sh/lZ7Nlg5k) |
| 13   | Save the alternative content, and close the pop-up.                                                                | [screenshot](https://cln.sh/vlRWNxKb) |
| 14   | Save the field update.                                                                                             | [screenshot](https://cln.sh/m7d36hVP) |
| 15   | Save the dependency configuration, and close the pop-up.                                                           | [screenshot](https://cln.sh/SGn8zdQS) |
| 16   | Save the page.                                                                                                     | [screenshot](https://cln.sh/wyp1wnY8) |
| 17   | Note the instant changes on the page you were editing if the form is saved to the Library.                         | -                                     |
| 18   | Be aware that other pages using the same Library Form Component could take up to 1hr for the changes to propagate. | -                                     |

## Custom Ask String / Swap Lists

### EngridAmounts

Using the `window.EngridAmounts` variable you can set dynamic amounts at the page level.

Example:

```
<script>
window.EngridAmounts = {
  "onetime": {
    amounts: {
      "10": 10,
      "30": 30,
      "50": 50,
      "100": 100,
      "Other": "other",
    },
    default: 30,
  },
  "monthly": {
    amounts: {
      "5": 5,
      "15": 15,
      "25": 25,
      "30": 30,
      "Other": "other",
    },
    default: 15,
  },
};
</script>
```
