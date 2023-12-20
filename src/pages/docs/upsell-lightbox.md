---
title: Monthly Donation Upsell Lightbox
description: Quidem magni aut exercitationem maxime rerum eos.

---

Drop this Code Block into your donation page to trigger an Upsell Lightbox whenever a one-time gift is made.

## Options
| Property        | Description                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| `image`         | Image URL to load on the Upsell Lightbox.                                     |
| `imagePosition` | You can set "left" or "right" to choose the position of the image.             |
| `title`         | Title of the Upsell Lightbox. Variables allowed (see below).                  |
| `paragraph`     | Sub-title of the Upsell Lightbox. Variables allowed (see below).              |
| `yesLabel`      | Label used on the "Yes" button. Variables allowed (see below).                |
| `noLabel`       | Label used on the "No" button. Variables allowed (see below).                 |
| `otherAmount`   | Set it to true if you want to show the "other amount" field on the Upsell Lightbox. false otherwise. |
| `otherLabel`    | Label used on the "other amount" field.                                       |
| `upsellOriginalGiftAmountFieldName`     | The field "name" to record the original gift amount into when the donor is successfully converted by the upsell lightbox from a one-time to recurring gift. Useful for calculating the conversion / lifetime value gained through the use of the upsell lightbox. The field does not need to be present on the page via page builder, it is automatically added via Javascript. And it is best to use the Other 1, Other 2, Other 3, or Other 4 field as these fields live on the transaction record rather than the supporter record. 
|    | E.g. transaction.othamt1  |
|   | Screenshot: [https://d.pr/i/tqciIF](https://d.pr/i/tqciIF) |
| `amountRange`      | Array with the amount suggestions range. It follows this format:     | 
```javascript
amountRange: [
    { max: 10, suggestion: 0 },
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
```

The donation amount is compared to each `max` property and, when it's lower or equal, we'll return the equivalent `suggestion` value. If the suggested amount is 0 the lightbox will not display.

As you can see in the example above, you can also use javascript code as the **"suggestion"** property. When using javascript code (inside quotes) to calculate your suggestion, use the special word `amount`. That word will get replaced by the dynamic one-time amount.

* **canClose** - `true` or `false` to enable/disable the close functions/button.

* **submitOnClose** - `true` or `false` to enable/disable the form submission when closing the lightbox. It only works if **canClose** is `true`.

* **debug** - `true` or `false` to enable/disable console notifications.

You can omit any option that you don't need to change the default value.

## Variables

Some options allows variables, that will get replaced by dynamic values:

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


## Upsell Links

These links contain a special class, when clicked or unclicked, this will cause the Donation Frequency to change from one-time to the defined recurrancy. In the example below `"MONTHLY"` is appended to the end of the `"setRecurrFreq-"` class name which corresponds to the value of the recurring frequency desired.

These links can be combined with the Utility classes that hide/show a component based on giving frequency.


```html
<a class="setRecurrFreq-MONTHLY" href="#">Make this a MONTHLY recurring gift!</a>
```

## Upsell Pseudo Checkbox

These pseudo checkboxes mirror the markup of Engaging Networks checkboxes so they get styled the same, but their values are never saved or submitted as part of the form submission. If the pseudo checkbox contains the correct special `"value"` and `"name"`, when selected or unselected, this will cause the Donation Frequency to change from one-time to the defined recurrancy, or vice versa. In the example below `"MONTHLY"` is set as the value and name is set as `"engrid.recurrfreq"` which will cause the Recurring Frequency field to toggle between One Time and Monthly when the checkbox is toggled.

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

## Exit intent lightbox 

A lightbox that asks the user to confirm exiting the page can be configured to show on any page. To activate it, add a code block to the page with: \

 ```Javascript
<script>
const EngridExitIntent = {
	enabled: true,
}
</script>
```


#### The lightbox has additional configurations options for:

| Property                         | Description                                                                                   |
|----------------------------------|-----------------------------------------------------------------------------------------------|
| `Title`                          | The headline copy of the lightbox                                                             |
| `Text`                           | The body copy of the lightbox                                                                 |
| `buttonText`                     | The button label text                                                                         |
| `buttonLink`                     | Where clicking the button will send the user to                                               |
| ` cookieName`                   | Name of the cookie used to prevent the lightbox opening more than once                        |
| ` cookieDuration`               | Expiry length of the cookie                                                                   |
| `triggers.visibilityState`    | Boolean - if the lightbox should trigger on visibilityState changes (e.g., changing tab)      |
| ` triggers.mousePosition`       | Boolean - if the lightbox should trigger on mousePosition (e.g., the mouse goes towards the close button) |
