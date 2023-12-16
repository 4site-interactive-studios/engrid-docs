---
title: ENGrid in Page Builder
description: Quidem magni aut exercitationem maxime rerum eos.

---
## Give By Selector Example
#### Code Example for Card, Paypal, and Check 

```
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

## PayPal Billing Agreement 


### Example Text 

PayPal Billing Agreement: By submitting this form, you agree to allow **Organization Name** to take funds from your account on a recurring basis.

---

## Baked In Layouts

Body Custom Attribute values for `"data-engrid-layout"`

* `leftleft1col`
* `centerleft1col`
* `centercenter1col`
* `centercenter2col`
* `centerright1col`
* `rightright1col`

Example code block to your page, change to use the desired layout class: [https://pastebin.com/raw/8jUMByU0](https://pastebin.com/raw/8jUMByU0)

---

## Live Variables

### Submit Button Gift Amount and Gift Frequency

You can add these to the submit button label

* `$AMOUNT` - Will add the amount with the currency symbol (e.g., $50). If the amount has a decimal value, it will show (e.g., $25.15). If that decimal value is ".00" it will trim it (e.g., $25)
* `$FREQUENCY` - Will show the currency recurring frequency value (e.g., "Donate $25 Monthly", "Donate $100 Annually") and displays nothing for one-time gifts (e.g., "Donate $50).

---

### Currency Symbols

You can add these to any code block, copy block, field label, or the submit button text. The symbol will reference the on-page Currency field to derive it's value. If that field is not present it will default to any option defined on the client theme. If that's not present then it will fallback to `$/USD`.

There is currently support for the following: `USD|$`, `GBP|£`, `EUR|€`
* `[$]` - Will add the currency symbol (e.g., $)
* `[$$$]` - Will add the three letter currency code (e.g., USD)

---

## Input Placeholders

### Body Custom Attribute

```
 data-engrid-add-input-placeholders
```
---

## Error Styling 
### Body Custom Attribute for `data-engrid-errors` 

```
fancy
```
---

## Payment Type Field Values 
### Case Insensitive

| Payment Method | Variants                                      |
| -------------- | --------------------------------------------- |
| `amex`         | 'amex', 'american express', 'americanexpress', 'amx', 'ax' |
| `visa`         | 'visa', 'vi'                                  |
| `mastercard`   | 'mastercard', 'master card', 'mc'             |
| `discover`     | 'discover', 'di'                              |
| `check`        | 'ach'                                         |
| `paypal`       | 'paypal'                                      |


---

## Populating Form Fields with URL Arguments 

Engaging Networks by default allows you to populate any managed form fields by specifying URL arguments with the target field and its value. The target field is case sensitive and can be found by inspecting the field and retrieving it's `name` For example this is the First Name field.


```
<input id="en__field_supporter_firstName" type="text" class="en__field__input en__field__input--text" name="supporter.firstName" value="" placeholder="First Name">
```

You can populate the first name field by adding it to a URL

```
example.com?supporter.firstName=John
```


And you can specify multiple fields


```
example.com?supporter.firstName=Jane&supporter.lastName=Doe
```

{% callout title="You should know!" %}
Note that this system does not work with our "Pseudo" form fields which mirror the styles and format of Engaging Networks form fields, but they are not `_real_` form fields.
{% /callout %}


---

## Lazy Loading
### Example Lazy Loaded Image

```
<img alt="Guidestar" data-src="https://website.org/guidestar.png" height="100" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="100" />
```

---

### Invisible Placeholder Pixel 

```
src="src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
```

---

## Media Attribution

On any image you can add the following Custom Attributes

Attribute                           | Description                                                               |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `data-attribution-source`           | The text that is visible                                                  |
| `data-attribution-source-link`      | Make the attribution a clickable link                                     |
| `data-attribution-hide-overlay`     | If this is present, the overlay will not be generated                     |
| `data-attribution-source-tooltip`   | The text that will appear in a tooltip when `<figattribution>` is hovered or focused |

```
 E.g. "<img alt="Elephant" data-src="https://imgur.com/elephant.jpg"  data-attribution-source="© Photographer's Name" data-attribution-source-link="[https://www.google.com](https://www.google.com)" height="1080" width="1920">

```
---

## Banner and Background Video 

You can add video to the Body Banner or Page Background Image sections.

```shell
<video width="1680" height="692" style="aspect-ratio: 1680/692" poster="https://example.org/...poster.jpg">
<source data-src="https://example.org/...video.mp4" type="video/mp4"
</video>
```
[https://pastebin.com/raw/KFMs1XKs](https://pastebin.com/raw/KFMs1XKs)

The video file URL must reference the source video (e.g. mp4) and not a streaming video (e.g. Youtube). You should also include a poster image which is an image that will be shown before the video has finished downloading. It will also be used on mobile devices that do not support embedded videos.

A background video added using data-src will lazy load and have three attributes added to it (Mute, Autoplay, Loop).

The `<video>` tag should include the native height / width of the video, not the height / width you want it to display at.

**How to prevent CLS (Cumulative Layout Shift) with videos**

You want to add the same native height / width values to an `aspect-ratio` declaration inside a style attribute on the `<video>` tag. This should be done for `_any video_` placed on the page.

Doing this extra step allows for the browser to properly, and responsively, size the `<video>` before it's downloaded by the browser. This can improve the experience for both desktop and slow mobile users because it prevents the page from jumping after the video loads in.

Recordings
* Desktop on cable connection: [https://cln.sh/CJUeT4](https://cln.sh/CJUeT4)
* Mobile on slow connection: [https://cln.sh/3LD25m](https://cln.sh/3LD25m)

---

## Processing Fee / Tip Jar Checkbox 

The Processing Fee Checkbox is a Pseudo EN field. Meaning it matches EN's field markup so that it gets styled the same, but it is not an Engaging Networks field. It only looks like one. We then use the interaction with that field to determine.


```shell
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

```
 data-processing-fee-percent-added="2.9"
 ```
* Multiplies the Gift Amount by this percent.

```
data-processing-fee-fixed-amount-added=".30"
```
 * After calculating the gift amount with `"data-processing-fee-percent-added"` this amount in cents is added to the total.