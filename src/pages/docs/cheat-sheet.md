---
title: ENgrid Special Classes Cheat Sheet - Enhancing Form Interactivity and Design
description: Use special classes in ENgrid to transform your Engaging Networks forms. This cheat sheet covers classes for expanding components, adjusting form field visibility, managing in-memorial options, customizing gift amounts, and more, providing you with the tools to create dynamic and responsive fundraising pages..
---

## Click To Expand (add to form component)

Utility class that makes a form component collapsed with clicked to expanded

```
Click-to-expand
```

`Inline code`

You can add a second class to the same component (e.g., `click-to-expand click-to-expand-mobile` ), and this will cause this section to only appear as a "click-to-expand" on mobile. When viewed on desktop, the entire contents of the area will remain visible ( [recording](https://cln.sh/rsb696qg) ).

---

### Form Field Helper Classes (Up to 10 per form component)

Utility classes to hide form fields (e.g "i1" = 1st field) in a component or just its label

| Class           | Description                                                                |
| --------------- | -------------------------------------------------------------------------- |
| `i1-hide`       | Hides the entire 1st field both visually and from screen readers           |
| `i1-hide-label` | Hides the 1st field's label visually but not for screen readers            |
| `i1-start`      | Indicates the 1st field is at the start of its visual row in the form flow |
| `i1-end`        | Indicates the 1st field is at the end of its visual row in the form flow   |
| `i1-20`         | 20% width                                                                  |
| `i1-25`         | 25% width                                                                  |
| `i1-33`         | 33% width                                                                  |
| `i1-50`         | 50% width                                                                  |
| `i1-66`         | 66% width                                                                  |
| `i1-75`         | 75% width                                                                  |
| `i1-100`        | 100% width, does not need the iX-start or iX-end helper classes            |
| `i1-m50`        | 50% width on the ENgrid Mobile breakpoint, not client theme                |
| `i1-m100`       | 100% width on the ENgrid Mobile breakpoint, not client theme               |

---

### In Memorial / In Honor Giving (add to form component)

A utility class to hide/show a component based on in memorial / in honor giving.

- `inmem-Y` = Show component if tribute giving option is checked and value is `Y`

---

### Gift Frequency (add to form component)

Makes the Gift Frequency Radio Inputs look like Buttons. Also works as a page level class.

```
radio-to-buttons_recurrpay
```

When the Radio to Buttons class is added you can change the number of buttons by including a second helper class or by defining your own values in CSS.

| Class                         | Description             |
| ----------------------------- | ----------------------- |
| `recurring-frequency_count_1` | Shows 1 button per row  |
| `recurring-frequency_count_2` | Shows 2 buttons per row |
| `recurring-frequency_count_3` | Shows 3 buttons per row |
| `recurring-frequency_count_4` | Shows 4 buttons per row |
| `recurring-frequency_count_5` | Shows 5 buttons per row |

{% callout title="You should know!" %}
Giving frequency utility classes can also be used on thank you pages
{% /callout %}

Utility classes to hide/show a component based on giving frequency.

| Class                                  | Description                                                  |
| -------------------------------------- | ------------------------------------------------------------ |
| `recurring-frequency-y-hide`           | Hides component when recurring gift frequency is Y           |
| `recurring-frequency-y-show`           | Shows component when recurring gift frequency is Y           |
| `recurring-frequency-n-hide`           | Hides component when recurring gift frequency is N           |
| `recurring-frequency-n-show`           | Shows component when recurring gift frequency is N           |
| `recurring-frequency-annual-hide`      | Hides component when recurring gift frequency is Annual      |
| `recurring-frequency-annual-show`      | Shows component when recurring gift frequency is Annual      |
| `recurring-frequency-monthly-hide`     | Hides component when recurring gift frequency is Monthly     |
| `recurring-frequency-monthly-show`     | Shows component when recurring gift frequency is Monthly     |
| `recurring-frequency-onetime-hide`     | Hides component when recurring gift frequency is One-Time    |
| `recurring-frequency-onetime-show`     | Shows component when recurring gift frequency is One-Time    |
| `recurring-frequency-quarterly-hide`   | Hides component when recurring gift frequency is Quarterly   |
| `recurring-frequency-quarterly-show`   | Shows component when recurring gift frequency is Quarterly   |
| `recurring-frequency-semi-annual-hide` | Hides component when recurring gift frequency is Semi-Annual |
| `recurring-frequency-semi-annual-show` | Shows component when recurring gift frequency is Semi-Annual |

---

### Gift Amount (add to form component)

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

### Give by Select (add to form component) AKA Gift Type

The Give by Select pseudo field has its own markup; if it has the `en__field--give-by-select` class, then no additional classes are needed. You can change the number of buttons by including a second helper class or by defining your own values in CSS.

| Class                    | Description             |
| ------------------------ | ----------------------- |
| `give-by-select_count_1` | Shows 1 button per row  |
| `give-by-select_count_2` | Shows 2 buttons per row |
| `give-by-select_count_3` | Shows 3 buttons per row |
| `give-by-select_count_4` | Shows 4 buttons per row |
| `give-by-select_count_5` | Shows 5 buttons per row |

Utility classes to hide/show a component based on gift type.

| Class                 | Description                                    |
| --------------------- | ---------------------------------------------- |
| `giveBySelect-Card`   | Show component when Give by Card is selected   |
| `giveBySelect-ACH`    | Show component when Give by Check is selected  |
| `giveBySelect-Paypal` | Show component when Give by Paypal is selected |

---

### Hide any element via URL arguments using a Class or ID

By using one of the following you can hide any content based on its class or ID with a URL argument.

Example: [https://website.org/page/12345/donate/1?engrid_hide[header-logo]=id](https://website.org/page/12345/donate/1?engrid_hide[header-logo]=id)

```
engrid_hide[element]=id
engrid_hide[element]=class
```

---

### Hide any element based on the selected value of a select dropdown, checkbox, or radio select field

{% callout title="You should know!" %}
Note that this does not work for other field types (e.g. Input, Textarea, etc..)
{% /callout %}

By using this you can hide an element based on the value of another Select, Checkbox, or Radio select fields. To start you need to get the root name of the field you want to base this condition on. The easiest way to do this is to grab it from the top level Label.

Steps for creating a custom class to hide an element based on the value of another select, checkbox, or radio select field:

Example Label:

```
<label for="en__field_supporter_questions_600302" class="en__field__label" style="" id="en__field__label--e4hhk">I would like to get text messages:</label>
```

1. Grab the `for` value from the label of the field you want to base this conditional class around
   - `en__field_supporter_questions_600302`
2. Change `en` to `engrid`
   - `engrid__field_supporter_questions_600302`
3. Remove the word `field_` and note the remaining double underscore after `engrid`
   - `engrid__supporter_questions_600302`
4. Remove the `_` after `supporter`
   - `engrid__supporterquestions_600302`
5. Now you have your base class, and you can append the value that will be used so that the content with that class will only be visible when that value is selected. By appending a hyphen and the field value`-Y` this class will make it so the encapsulated is only visible when that corresponding field's value is `Y`, otherwise it will be hidden.
   - `engrid__supporterquestions_600302-Y`

---

### Hide an element based on if other question(s) are present or absent on the page

Special classes can be used to hide elements if certain supporter questions are present or absent on the page.

Typically, this can be used to hide elements, such as lead-in copy, when an opt-in question is not rendered on the page because the supporter came from a campaign link and is already opted in, so EN doesn't render the question on the page. But it can be used in other ways too.

The class format looks like this:

- Show this element when the supporter question is present:

```
engrid__supporterquestions{id}-present
```

- Show this element when the supporter question is absent:

```
engrid__supporterquestions{id}-absent
```

{% callout title="You should know!" %}
The `{id}` is the id of the supporter question. This can be found by inspecting the element on the page
{% /callout %}

It's also possible to combine multiple questions using the following format. These examples show 2 questions, but you can use as many as you like:

- Show this element when EITHER question is present:

```
engrid__supporterquestions{id1}__supporterquestions{id2}-present
```

- Show this element when EITHER question is absent:

```
engrid__supporterquestions{id1}__supporterquestions{id2}-absent
```

---

### Custom Merge Fields and URL Based Content (Dynamic Content)

You can create merge fields on the fly by any name you give them which in turn can be populated with URL arguments. These merge fields can have default fallback values that will be used if no URL argument is present or they can have no default fallback value in which case they will disappear if no URL argument is present.

`_ALL_` values for URL arguments used by these merge fields must be URL-encoded

- [Encode to URL-encoded format](https://www.urlencoder.org/)
- [Screenshot Example](https://share.cleanshot.com/PO83Qf)

You can also hide content with the `.hide-until-merged` class which will set it to invisible until after the merge has completed.

Example: Title

```
<h1 class="hide-until-merged">{engrid_data~[title]}</h1>

&engrid_data[title]=Give%20Today%21
```

Example: Inline Copy

```
<p>{engrid_data~[body-lead]~[Protect Our Oceans with a Monthly or One-Time Gift Today]}</p>

&engrid_data[body-lead]=Thanks%20for%20signing%20the%20XYZ%20petition%2C%20can%20you%20take%20one%20more%20step%20and%20do%20this%3F
```

Example: Image

```
<img data-src="{engrid_data~[background-image-url]~[https://via.placeholder.com/1280x720]}">

&engrid_data[background-image-url]=https%3A%2F%2Fexample.com%2Fmy-image.jpg
```

---

### Live Giving Amounts (added as classes on content) ([example](https://d.pr/v/zjkzde))

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

### Dynamic Content Based on Amount (added as classes on content)

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

**Animation classes for dynamic content:**

| Class                    | Description                                      |
| ------------------------ | ------------------------------------------------ |
| `animate-replace`        | Will animate the content switch using scale      |
| `animate-vertical-slide` | Will animate the content switch using max-height |

---

### Conditionally Required Fields

Add the `i-required` class to a form component which will require every visible field; this is great for fields that are conditionally hidden like In Memorial fields. If a field is hidden it will not be required. Alternatively if you only want to require only some fields, not all of them, in the form component when it's visible you can use `i#-required` where `#` indicated the field number (e.g. the first field would get `i1-required`).

{% callout title="You should know!" %}
Form submissions for digital wallets do not trigger EN's form validation, and in turn our form validation does not trigger either because it depends on EN's. Submitting a form with a digital wallet does however trigger validation for the minimally required fields for that payment processor (e.g. Email Address). As an example, this means you could submit a PayPal OneTouch donation with only your email address filled out. There's nothing we can do about this at the moment and we have submitted it as feedback to EN.
{% /callout %}

---

### Miscellaneous

- `form-submit`
  - Causes the form to submit when the element is clicked
- `manual-form-layout` (Experimental, might not work)
  - Removes any opinionated styling (e.g First and Last name are 50% width) from form field widths. All form fields take up 100% width.
- `inline-country`
  - Forces the country field to display visually inside and at the end of the next field, which should be the Address field. Screenshot: [https://d.pr/i/NgZsl3](https://d.pr/i/NgZsl3)
- `forceUncheck`
  - Only works on "Subscription Management" pages AKA unsubscribe pages with the url path "/subscription". For email list with only one subscription option, a user clicking the unsubscribe link in an email will be dropped onto an Unsubscribe page with their account details pre-populates. This present a usability issue because the user sees their email, a checkbox that is checked for staying subscribed to the email list, and an unsubscribe (submit) button. They will click the button assuming that it will unsubscribe, but in reality they needed to uncheck the checkbox first to update their preferences before submitting the form. This class will cause all checkboxes inside to be unchecked. It can be combined with the "hide" class to also visually hide the choice altogether streamlining the unsubscribe experience even further.
- `edit-warning` - [https://d.pr/i/11bENF](https://d.pr/i/11bENF)
  - Visually style the component to present a warning to the user that they should unlink the component from the library before editing. This class is not able to tell when the component is unlinked and will continue to appear until the class is removed.
- `edit-lock` - [https://d.pr/i/vsA4ao](https://d.pr/i/vsA4ao)
  - Visually style the component to present a warning to the user that they are looking at a component which should be edited from the component library. It also visually hides the "edit" action for the component. Note, if you can't edit the component you can't tell what its name is and what you should look for in the component library. The only way to remove the class is to edit the component or inspect the page in your browser and manually remove the class so you can see the "edit" action again.

---

### Replace Banner Media with Background Media

By adding a data attribute to the body you can control under what circumstances the background should replace or act as the banner on the layout's breakpoint.

```
data-replace-banner-with-background="if-background-exists"
```

- Replaces the banner media if the background contains an image or video.

```
data-replace-banner-with-background="if-background-image"
```

- Replaces the banner media ONLY if the background contains an image.

```
`data-replace-banner-with-background="if-background-video"`
```

- Replaces the banner media ONLY if the background contains a video.

```
`data-replace-banner-with-background="if-banner-empty"`
```

- Replaces the banner media ONLY if the banner does not contain media and the background contains an image or video.
