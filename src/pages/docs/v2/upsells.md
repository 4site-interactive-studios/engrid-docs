---
title: Upsells
description: Learn about the various upsell options available in ENgrid.
---

## Donation: Tip Jar

The Processing Fee Checkbox is a Pseudo EN field. Meaning it matches EN's field markup so that it gets styled the same, but it is not an Engaging Networks field. It only looks like one. We then use the interaction with that field to determine.


```html
<!-- Custom Checkbox using the same markup as Engaging Networks --><!-- The value of the checbox is usd as a % to calculate the processing fee -->
<div class="en__field en__field--checkbox en__field--000000 en__field--processing_fees pseudo-en-field">
	<!--<label class="en__field__label en__field__label==positionabove">Processing Fees</label>-->
	<div class="en__field__element en__field__element--checkbox">
		<div class="en__field__item">
			<input class="en__field__input en__field__input--checkbox" data-processing-fee-fixed-amount-added=".30" data-processing-fee-percent-added="2.9" id="en__field_supporter_processing_fees" name="supporter.processing_fees" type="checkbox" value="Y"><label class="en__field__label en__field__label--item" for="en__field_supporter_processing_fees">I'd like to cover all transaction fees so that 100% of my donation goes to the Rainforest Action Network!</label>
		</div>
	</div>
</div>

```

Processing Fee Checkbox Code Block: [https://pastebin.com/raw/7n4k0kPM](https://pastebin.com/raw/7n4k0kPM)

```javascript
 data-processing-fee-percent-added="2.9"
 ```
* Multiplies the Gift Amount by this percent.

```javascript
data-processing-fee-fixed-amount-added=".30"
```
* After calculating the gift amount with `data-processing-fee-percent-added` this amount in cents is added to the total.

---

## Donation: Upsell Lightbox

Drop this Code Block into your donation page to trigger an Upsell Lightbox whenever a one-time gift is made.

## Configuration Options

The Upsell Lightbox is configured via `window.EngridUpsell`. All options are optional and will use defaults if not specified.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `image` | string | `"https://picsum.photos/480/650"` | Image URL to load on the Upsell Lightbox |
| `imagePosition` | `"left"` \| `"right"` | `"left"` | Position of the image on the lightbox |
| `title` | string | See defaults | Title of the Upsell Lightbox. Variables allowed (see Variables section below) |
| `paragraph` | string | See defaults | Sub-title/body text of the Upsell Lightbox. Variables allowed |
| `yesLabel` | string | See defaults | Label used on the "Yes" button. Variables allowed |
| `noLabel` | string | See defaults | Label used on the "No" button. Variables allowed |
| `otherAmount` | boolean | `true` | If `true`, shows the "other amount" field on the Upsell Lightbox. Set to `false` to hide it |
| `otherLabel` | string | `"Or enter a different monthly amount:"` | Label used on the "other amount" field |
| `upsellOriginalGiftAmountFieldName` | string | `""` | The field "name" to record the original gift amount into when the donor is successfully converted by the upsell lightbox from a one-time to recurring gift. Useful for calculating conversion/lifetime value. The field does not need to be present on the page via page builder, it is automatically added via Javascript. Best to use Other 1, Other 2, Other 3, or Other 4 field (e.g., `transaction.othamt1`) as these fields live on the transaction record rather than the supporter record. [Screenshot reference](https://d.pr/i/tqciIF) |
| `amountRange` | Array<{max: number, suggestion: number \| string}> | See defaults | Array with the amount suggestions range. The donation amount is compared to each `max` property and, when it's lower or equal, returns the equivalent `suggestion` value. If the suggested amount is 0, the lightbox will not display. You can use JavaScript code as the `suggestion` property (inside quotes) - use the special word `amount` which will be replaced by the dynamic one-time amount |
| `minAmount` | number | `0` | Never accept less than this amount |
| `canClose` | boolean | `true` | If `true`, enables the close functions/button. If `true`, you can close the lightbox by clicking the close button (top right), pressing ESC, or clicking outside the lightbox |
| `submitOnClose` | boolean | `false` | If `true`, enables form submission when closing the lightbox. Only works if `canClose` is `true` |
| `oneTime` | boolean | `true` | If `true`, the upsell only runs for one-time donations |
| `annual` | boolean | `false` | If `true`, the upsell also runs for annual donations |
| `disablePaymentMethods` | string[] | `[]` | Array of payment method values to disable when the upsell is accepted |
| `skipUpsell` | boolean | `false` | If `true`, skips the upsell entirely. Useful to disable the upsell programmatically |
| `conversionField` | string | `""` | The field name to store the upsell conversion data |
| `upsellCheckbox` | `false` \| {label: string, location: string, cssClass: string} | `false` | If not `false`, shows a checkbox to upsell. Use this to show a checkbox option instead of (or in addition to) the lightbox |

### Default Values

```javascript
window.EngridUpsell = {
  image: "https://picsum.photos/480/650",
  imagePosition: "left",
  title: "Will you change your gift to just {new-amount} a month to boost your impact?",
  paragraph: "Make a monthly pledge today to support us with consistent, reliable resources during emergency moments.",
  yesLabel: "Yes! Process My <br> {new-amount} monthly gift",
  noLabel: "No, thanks. Continue with my <br> {old-amount} one-time gift",
  otherAmount: true,
  otherLabel: "Or enter a different monthly amount:",
  upsellOriginalGiftAmountFieldName: "",
  amountRange: [
    { max: 10, suggestion: 5 },
    { max: 15, suggestion: 7 },
    { max: 20, suggestion: 8 },
    { max: 25, suggestion: 9 },
    { max: 30, suggestion: 10 },
    { max: 35, suggestion: 11 },
    { max: 40, suggestion: 12 },
    { max: 50, suggestion: 14 },
    { max: 100, suggestion: 15 },
    { max: 200, suggestion: 19 },
    { max: 300, suggestion: 29 },
    { max: 500, suggestion: "Math.ceil((amount / 12)/5)*5" },
  ],
  minAmount: 0,
  canClose: true,
  submitOnClose: false,
  oneTime: true,
  annual: false,
  disablePaymentMethods: [],
  skipUpsell: false,
  conversionField: "",
  upsellCheckbox: false,
}
```

### Amount Range

The `amountRange` array determines the suggested upsell amount based on the current donation amount. The donation amount is compared to each `max` property, and when it's lower or equal, the corresponding `suggestion` value is returned. If the suggested amount is 0, the lightbox will not display.

You can use JavaScript code as the `suggestion` property (inside quotes). When using JavaScript code, use the special word `amount` which will be replaced by the dynamic one-time amount.

Example:
```javascript
amountRange: [
  { max: 10, suggestion: 0 },  // No upsell for donations $10 or less
  { max: 15, suggestion: 7 },
  { max: 20, suggestion: 8 },
  { max: 25, suggestion: 9 },
  { max: 30, suggestion: 10 },
  { max: 500, suggestion: "Math.ceil((amount / 12)/5)*5" },  // Calculated suggestion
]
```

## Variables

Some options allow variables, that will get replaced by dynamic values:

* `{new-amount}` - Will get replaced by the current suggested upsell amount based on the `amountRange` option.

* `{old-amount}` - Will get replaced by the current one-time amount this user is trying to give.


### Features

* It only runs if you're on the first page of a donation page. If you add the script to other pages, you'll not get any output errors.
* It works alongside the `enOnSubmit`, so it's future proof.
* To improve performance, it will not render anything to the page if you're not on the first step of a Donation Page.
* If **canClose** is `true`, you can close the lightbox by clicking on the close button (top right), by pressing the ESC key, or by clicking anywhere outside the lightbox.
* When you change the **"different amount"** field, it will update the YES button at the same time, so the user will not have doubt about the amount.
* You don't need to worry about any HTML or CSS.
* It has no external dependency.


### Upsell Lightbox Code


* Current Code Block: [https://pastebin.com/raw/uwTMeweU](https://pastebin.com/raw/uwTMeweU)
* Legacy Code Block [https://pastebin.com/raw/D9mjV5dP](https://pastebin.com/raw/D9mjV5dP)

## Donation: Upsell Checkbox

These pseudo checkboxes mirror the markup of Engaging Networks checkboxes so they get styled the same, but their values are never saved or submitted as part of the form submission. If the pseudo checkbox contains the correct special `value` and `name`, when selected or unselected, this will cause the Donation Frequency to change from one-time to the defined recurrancy, or vice versa. In the example below `MONTHLY` is set as the value and name is set as `engrid.recurrfreq` which will cause the Recurring Frequency field to toggle between One Time and Monthly when the checkbox is toggled.

These checkboxes can be combined with the Utility classes that hide/show a component based on giving frequency.


 ```html
  <tr>
   <td>
<!-- Custom Checkbox using the same markup as Engaging Networks -->
<div class="en__field en__field--checkbox en__field--000000 en__field--make_monthy pseudo-en-field has-value">
    <div class="en__field__element en__field__element--checkbox has-value">
        <div class="en__field__item">
            <input class="en__field__input en__field__input--checkbox" id="en__field_supporter_make_monthly" name="engrid.recurrfreq" type="checkbox" value="MONTHLY"> <label class="en__field__label en__field__label--item" for="en__field_supporter_make_monthly">Make this a MONTHLY recurring gift!</label>
        </div>
    </div>
</div>
   </td>
  </tr>
```

---
