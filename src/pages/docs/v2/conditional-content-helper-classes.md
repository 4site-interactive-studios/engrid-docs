---
title: Conditional Content Helper Classes
description: Learn how use Conditional Content Helper Classes in ENgrid.
---

## Hide / Show based on another fields value


### In Memorial / In Honor Giving (add to form component)

A utility class to hide/show a component based on in memorial / in honor giving.

- `inmem-Y` = Show component if tribute giving option is checked and value is `Y`

---

### Giving Frequency

{% callout title="You should know!" %}
Giving frequency utility classes can also be used on thank you pages
{% /callout %}

Utility classes to hide/show a component based on giving frequency.

| Class                                  | Description                                                  | Usable on Thank You Pages |
|----------------------------------------|--------------------------------------------------------------|---------------------------|
| `recurring-frequency-y-hide`           | Hides component when recurring gift frequency is Y           | Yes                       |
| `recurring-frequency-y-show`           | Shows component when recurring gift frequency is Y           | Yes                       |
| `recurring-frequency-n-hide`           | Hides component when recurring gift frequency is N           | Yes                       |
| `recurring-frequency-n-show`           | Shows component when recurring gift frequency is N           | Yes                       |
| `recurring-frequency-annual-hide`      | Hides component when recurring gift frequency is Annual      | Yes                       |
| `recurring-frequency-annual-show`      | Shows component when recurring gift frequency is Annual      | Yes                       |
| `recurring-frequency-monthly-hide`     | Hides component when recurring gift frequency is Monthly     | Yes                       |
| `recurring-frequency-monthly-show`     | Shows component when recurring gift frequency is Monthly     | Yes                       |
| `recurring-frequency-onetime-hide`     | Hides component when recurring gift frequency is One-Time    | Yes                       |
| `recurring-frequency-onetime-show`     | Shows component when recurring gift frequency is One-Time    | Yes                       |
| `recurring-frequency-quarterly-hide`   | Hides component when recurring gift frequency is Quarterly   | Yes                       |
| `recurring-frequency-quarterly-show`   | Shows component when recurring gift frequency is Quarterly   | Yes                       |
| `recurring-frequency-semi-annual-hide` | Hides component when recurring gift frequency is Semi-Annual | Yes                       |
| `recurring-frequency-semi-annual-show` | Shows component when recurring gift frequency is Semi-Annual | Yes                       |

---

### Gift Type

Utility classes to hide/show a component based on gift type.

| Class                 | Description                                    | Usable on Thank You Pages |
| --------------------- | ---------------------------------------------- | ------------------------- |
| `giveBySelect-Card`   | Show component when Give by Card is selected   | Yes                       |
| `giveBySelect-ACH`    | Show component when Give by Check is selected  | Yes                       |
| `giveBySelect-Paypal` | Show component when Give by Paypal is selected | Yes                       |

---

### Hide any element based on the selected value of a checkbox or radio select field

{% callout title="You should know!" %}
These classes can also be used on thank you pages
{% /callout %}

{% callout title="You should know!" %}
Note that this does not work for other field types (e.g. Select, Input, Textarea, etc..)
{% /callout %}

To start you need to get the root name of the field you want to base this condition on. The easiest way to do this is to grab it from the top level Label. By using this you can hide an element based on the value of another Checkbox or Radio select fields.

Steps for creating a custom class:

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
4. Remove the `_` after `supporter` and anywhere else they appear
- `engrid__supporterquestions600302`
5. Now you have your base class, and you can append the value that will be used so that the content with that class will only be visible when that value is selected. By appending a hyphen and the field value`-Y` this class will make it so the encapsulated is only visible when that corresponding field's value is `Y`, otherwise it will be hidden.
- `engrid__supporterquestions600302-Y`

---

### Dynamic Content Based on Amount (added as classes on content)

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

**Animation classes for dynamic content:**

| Class                    | Description                                      |
| ------------------------ | ------------------------------------------------ |
| `animate-replace`        | Will animate the content switch using scale      |
| `animate-vertical-slide` | Will animate the content switch using max-height |

---

## Hide / Show based on URL arguments

### Hide any element via URL arguments using a Class or ID

By using one of the following you can hide any content based on its class or ID with a URL argument.

Example: [https://website.org/page/12345/donate/1?engrid_hide[header-logo]=id](https://website.org/page/12345/donate/1?engrid_hide[header-logo]=id)

```
engrid_hide[element]=id
engrid_hide[element]=class
```

---

## Hide / Show based on presence of question

{% callout title="You should know!" %}
These classes can also be used on thank you pages
{% /callout %}

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
