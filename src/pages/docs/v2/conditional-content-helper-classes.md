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

The `DataHide` component allows you to hide page elements by adding URL parameters. This is useful for creating cleaner embedded iframe experiences or hiding specific sections when embedding pages.

### Hide any element via URL arguments using a Class or ID

By using one of the following you can hide any content based on its class or ID with a URL argument.

Add URL parameters in the format:

```
?engrid_hide[element-name]=type
```

Where:
- `element-name` is the ID or class name of the element you want to hide
- `type` is either `"id"` or `"class"` (defaults to `"class"` if not specified)

Example: [https://website.org/page/12345/donate/1?engrid_hide[header-logo]=id](https://website.org/page/12345/donate/1?engrid_hide[header-logo]=id)

### Examples

#### Hide by Class Name

To hide all elements with a specific class name:

```
https://example.org/page/1234/donate/1?engrid_hide[body-headerOutside]=class
```

This will hide all elements with the class `body-headerOutside`.

#### Hide by ID

To hide an element by its ID:

```
https://example.org/page/1234/donate/1?engrid_hide[header]=id
```

This will hide the element with the ID `header`.

#### Hide Multiple Elements

You can hide multiple elements by adding multiple parameters:

```
https://example.org/page/1234/donate/1?engrid_hide[body-headerOutside]=class&engrid_hide[body-banner]=class&engrid_hide[content-footer]=class
```

### Common Use Cases

#### Embedding Pages in iFrames

When embedding an ENgrid page in an iframe, you often want to hide certain sections to create a cleaner embedded experience:

```html
<iframe
  src="https://example.org/page/1234/donate/1?chain&engrid_hide[body-headerOutside]=class&engrid_hide[body-banner]=class&engrid_hide[content-footer]=class"
  width="100%"
  scrolling="no"
  class="engrid-iframe"
  frameborder="0"
></iframe>
```

#### Selective Content Display

Hide specific sections based on campaign parameters or user preferences:

```
https://example.org/page/1234/donate/1?campaign=email&engrid_hide[page-backgroundImage]=class
```

### How It Works Technically

1. The component reads URL parameters that start with `engrid_hide[]`
2. It extracts the element identifier and type (id or class)
3. It finds matching elements in the DOM
4. It adds the `hidden-via-url-argument` attribute to hide the elements
5. CSS rules in ENgrid styles hide elements with this attribute

### Notes

- Elements are hidden using the `hidden-via-url-argument` attribute
- The component works automatically - no configuration needed
- Hidden elements can be shown again in debug mode
- Multiple elements can be hidden in a single URL
- Both class names and IDs are supported

---

## Hide / Show based on presence of question

{% callout title="You should know!" %}
These classes can also be used on thank you pages
{% /callout %}

The `ShowIfPresent` component allows you to show or hide content based on whether specific supporter questions (opt-in fields) are present on the page. This is particularly useful when opt-in questions are conditionally rendered by Engaging Networks based on supporter status.

### How It Works

When a supporter comes from a campaign link and is already opted in, Engaging Networks may not render the opt-in question on the page. The `ShowIfPresent` component detects whether these questions are present and shows or hides content accordingly.

Special classes can be used to hide elements if certain supporter questions are present or absent on the page. Typically, this can be used to hide elements, such as lead-in copy, when an opt-in question is not rendered on the page because the supporter came from a campaign link and is already opted in, so EN doesn't render the question on the page. But it can be used in other ways too.

### Usage

Add special CSS classes to elements you want to conditionally show/hide:

#### Single Question

```
engrid__supporterquestions{id}-present
engrid__supporterquestions{id}-absent
```

Where `{id}` is the ID of the supporter question field.

#### Multiple Questions (OR Logic)

```
engrid__supporterquestions{id1}__supporterquestions{id2}-present
engrid__supporterquestions{id1}__supporterquestions{id2}-absent
```

When using multiple questions, the element will show if **any** of the specified questions is present (for `-present`) or absent (for `-absent`).

### Finding the Question ID

To find the supporter question ID:

1. Inspect the opt-in field on the page
2. Look for the `name` attribute, which will be in the format `supporter.questions.{id}`
3. Use just the numeric `{id}` part in the class name

Example: If the field name is `supporter.questions.12345`, use `12345` in the class:

```html
<div class="engrid__supporterquestions12345-present">
  This content shows when question 12345 is present
</div>
```

{% callout title="You should know!" %}
The `{id}` is the id of the supporter question. This can be found by inspecting the element on the page
{% /callout %}

### Examples

#### Show Content When Question is Present

```html
<div class="engrid__supporterquestions12345-present">
  <p>You can opt in to receive our newsletter!</p>
</div>
```

This content will only display if supporter question 12345 is rendered on the page.

#### Hide Content When Question is Present

```html
<div class="engrid__supporterquestions12345-absent">
  <p>This message shows when the opt-in question is NOT on the page.</p>
  <p>This might happen if the supporter is already opted in.</p>
</div>
```

#### Multiple Questions

```html
<!-- Show if EITHER question 12345 OR 67890 is present -->
<div class="engrid__supporterquestions12345__supporterquestions67890-present">
  <p>At least one of these opt-ins is available.</p>
</div>

<!-- Show if EITHER question is absent -->
<div class="engrid__supporterquestions12345__supporterquestions67890-absent">
  <p>Neither opt-in question is available on this page.</p>
</div>
```

### Common Use Cases

#### Conditional Opt-In Messaging

Show different messaging based on whether opt-in questions are available:

```html
<!-- Show if newsletter opt-in is available -->
<div class="engrid__supporterquestions12345-present">
  <p>Check the box below to receive our monthly newsletter!</p>
</div>

<!-- Show if newsletter opt-in is NOT available (already opted in) -->
<div class="engrid__supporterquestions12345-absent">
  <p>You're already subscribed to our newsletter. Thank you!</p>
</div>
```

### Technical Details

- The component automatically detects elements with these classes
- It checks for the presence of supporter question fields by their `name` attribute
- Elements are hidden using `display: none` when conditions are not met
- For multiple questions with `-present`, content shows if **any** question is present
- For multiple questions with `-absent`, content shows if **any** question is absent

### Notes

- Question IDs must match exactly (case-sensitive)
- The component uses AND logic within each class (all specified questions must meet the condition)
- Multiple classes can be combined on the same element for complex conditions
- Works automatically - no configuration needed

---
