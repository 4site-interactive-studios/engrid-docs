---
title: Conditional Content Helper Classes
description: Learn how use Conditional Content Helper Classes in ENgrid.
---

## Hide / Show based on another fields value


### In Memorial / In Honor Giving

A utility class to hide/show a component based on in memorial / in honor giving. Add to your form content and it will automatically show or hide based on the value of the tribute giving field.

- `inmem-Y` = Show component if tribute giving option is checked and value is `Y`

### Shipping Fields

A utility class to hide/show a component based on if the supporter has a separate shipping address (for Premium Gifts).

- `shipenabled-Y` = Show component if Shipping is checked and value is `Y`

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

- See [Give By Select](./payment-methods-digital-wallets#give-by-select) for more details on these classes and how to use them.

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

- [ShowIfAmount](./currency-donation-amounts#show-if-amount)

---

## Hide / Show based on URL arguments

- See [DataHide](./data-and-url-parameters#data-hide)

---

## Hide / Show based on presence of question

The `ShowIfPresent` component controls element visibility based on whether specific supporter questions are present or absent on the page.

### Overview

Use special class names to show/hide elements depending on whether EN renders certain supporter questions. Common use case: hiding opt-in language when supporter is already opted in.

{% callout title="You should know!" %}
These classes can also be used on thank you pages
{% /callout %}

### How It Works

When supporters arrive via certain campaign links and are already opted in, EN doesn't render the opt-in question. This component lets you conditionally show/hide content based on this.

### Class Name Format

```
engrid__supporterquestions{id}-present
engrid__supporterquestions{id}-absent
```

**`-present`**: Element shows ONLY when question is on page
**`-absent`**: Element shows ONLY when question is NOT on page

### Finding Question IDs

Inspect the supporter question element to find its ID:

```html
<input type="checkbox" 
       name="supporter.questions.123456" 
       id="en__field_supporter_questions_123456">
```

The ID is the number: `123456`

### Single Question Examples

**Show only when opt-in is present:**
```html
<div class="engrid__supporterquestions123456-present">
  <p>Please check the box above to hear from us!</p>
</div>
```

**Show only when opt-in is absent:**
```html
<div class="engrid__supporterquestions123456-absent">
  <p>You're already subscribed to our updates!</p>
</div>
```

### Multiple Questions (OR Logic)

Combine multiple questions using double underscores:

```
engrid__supporterquestions{id1}__supporterquestions{id2}-present
engrid__supporterquestions{id1}__supporterquestions{id2}-absent
```

**Logic:**
- `-present`: Show if EITHER question is present
- `-absent`: Show if EITHER question is absent

### Multiple Question Example

```html
<!-- Show if EITHER question 12345 OR question 67890 is present -->
<div class="engrid__supporterquestions12345__supporterquestions67890-present">
  <p>Please answer the question(s) above.</p>
</div>

<!-- Show if EITHER question is absent -->
<div class="engrid__supporterquestions12345__supporterquestions67890-absent">
  <p>You're all set!</p>
</div>
```

### Real-World Use Cases

**1. Opt-in Instructions:**
```html
<!-- Only show instructions when opt-in checkbox is visible -->
<div class="engrid__supporterquestions123456-present">
  <p><strong>Stay Connected!</strong> Check the box above to receive email updates.</p>
</div>
```

**2. Already Opted-In Message:**
```html
<!-- Show when supporter is already opted in (question hidden) -->
<div class="engrid__supporterquestions123456-absent">
  <p>✓ You're already subscribed to our email list.</p>
</div>
```

**3. Multiple Opt-In Options:**
```html
<!-- Show instructions if ANY opt-in question is present -->
<div class="engrid__supporterquestions100__supporterquestions200__supporterquestions300-present">
  <h4>Communication Preferences</h4>
  <p>Select how you'd like to hear from us above.</p>
</div>
```

**4. All Questions Answered:**
```html
<!-- Show thank you when no questions are displayed -->
<div class="engrid__supporterquestions100__supporterquestions200-absent">
  <p>Thank you! Your preferences are already set.</p>
</div>
```

### How It Works Internally

1. Component finds all elements with `engrid__supporterquestions` classes
2. Extracts question IDs from class names
3. Checks if questions exist on page: `document.getElementsByName('supporter.questions.123456')`
4. Hides elements if conditions aren't met

**Hiding logic:**
```typescript
// For -present classes: hide if question is absent
if (action.type === 'present' && questionAbsent) {
  element.style.display = 'none';
}

// For -absent classes: hide if question is present
if (action.type === 'absent' && questionPresent) {
  element.style.display = 'none';
}
```

### Debug Logging

Enable debug mode to see visibility actions

Look for [👀 ShowIfPresent] in console:
```
[👀 ShowIfPresent] Conditions not met, hiding elements with class engrid__supporterquestions123456-present
```

### Complex Example

Complete opt-in flow with conditional messaging:

```html
<div class="opt-in-section">
  <!-- Instructions when opt-in is visible -->
  <div class="engrid__supporterquestions123456-present">
    <h4>Stay in Touch</h4>
    <p>Check the box below to receive our monthly newsletter with impact stories and campaign updates.</p>
  </div>
  
  <!-- The actual opt-in question (rendered by EN) -->
  <!-- supporter.questions.123456 -->
  
  <!-- Confirmation when already opted in -->
  <div class="engrid__supporterquestions123456-absent alert alert-success">
    <strong>You're already subscribed!</strong>
    <p>You'll continue receiving updates at the email address you provided.</p>
  </div>
</div>
```

### Multiple Preference Questions

```html
<!-- Email opt-in: 100, SMS opt-in: 200, Mail opt-in: 300 -->

<!-- Header shows if ANY preference question is visible -->
<div class="engrid__supporterquestions100__supporterquestions200__supporterquestions300-present">
  <h3>Communication Preferences</h3>
  <p>Choose how you'd like to stay connected:</p>
</div>

<!-- Individual question instructions -->
<div class="engrid__supporterquestions100-present">
  <label class="preference-label">
    <strong>Email:</strong> Receive our monthly newsletter
  </label>
</div>

<div class="engrid__supporterquestions200-present">
  <label class="preference-label">
    <strong>SMS:</strong> Get urgent action alerts
  </label>
</div>

<!-- All preferences already set message -->
<div class="engrid__supporterquestions100__supporterquestions200__supporterquestions300-absent">
  <div class="alert alert-info">
    <p>✓ Your communication preferences are already configured.</p>
  </div>
</div>
```

#### Best Practices

1. **Test Both States**: Test with questions present and absent
2. **Clear Messaging**: Make it obvious why content is showing/hiding
3. **Accessibility**: Ensure hidden content doesn't break page flow
4. **Mobile Testing**: Verify conditional content works on mobile
5. **Question IDs**: Double-check question IDs match exactly
6. **Multiple Questions**: Use OR logic thoughtfully
7. **Fallback Content**: Consider what shows if JS fails to load

#### Troubleshooting

**Elements not hiding/showing:**
- Verify question ID is correct (inspect the input's `name` attribute)
- Check class name syntax exactly matches pattern
- Ensure question actually exists/doesn't exist on page
- Enable debug mode to see what component is doing
- Check for CSS `!important` rules overriding `display: none`

**Wrong question targeted:**
- Inspect the form to find correct question ID
- Question IDs are numbers only (no letters)
- Use browser DevTools to verify question name attribute

**Multiple questions not working:**
- Ensure using double underscores: `__` between questions
- Verify both question IDs are correct
- Remember it's OR logic, not AND logic