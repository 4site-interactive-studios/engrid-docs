---
title: Advocacy & Email-to-Target Features
description: Learn how ENgrid enhances advocacy, email-to-target, and ecard forms with additional functionality
---

## Advocacy

The `Advocacy` component enhances advocacy and email-to-target pages by making recipient selection more user-friendly.

### Overview

On Engaging Networks advocacy pages, users select recipients (e.g., legislators, decision-makers) before sending messages. By default, clicking on the recipient's name or details doesn't select their checkbox. The Advocacy component fixes this by making the entire recipient row clickable.

### Automatic Activation

The component automatically runs on:
- Advocacy pages (`pageType: "ADVOCACY"`)
- Email-to-target pages (`pageType: "EMAILTOTARGET"`)

No configuration required - it initializes automatically when ENgrid loads.

### How It Works

1. Finds all elements with class `.en__contactDetails__rows`
2. Adds click event listeners to each recipient row
3. When clicked, toggles the associated checkbox

### User Experience

**Before ENgrid:**
- User must click only the small checkbox to select a recipient
- Clicking the name or details does nothing

**After ENgrid:**
- User can click anywhere on the recipient row
- Checkbox toggles accordingly
- More accessible and intuitive

### Technical Details

```typescript
// Automatically detects recipient rows
const contactItems = document.querySelectorAll(".en__contactDetails__rows");

// Makes entire row clickable
contactItems.forEach(contact => {
  contact.addEventListener("click", () => {
    // Toggles the checkbox
    checkbox.checked = !checkbox.checked;
  });
});
```

### Debug Logging

Enable debug mode to see checkbox toggling:

Look for `👨‍⚖️ Advocacy` in console logs.

---

## Add Name to Message

The `AddNameToMessage` component automatically appends the supporter's name to advocacy messages when name shortcodes aren't present.

### Overview

On email-to-target pages, it's common for supporters to sign their messages with their names. This component automatically adds the supporter's first and last name to the message field when they tab away from those fields.

{% callout title="You should know!" %}
The component only runs if the message doesn't already contain name shortcodes like `{user_data~First Name}` or `{user_data~Last Name}`.
{% /callout %}

### Automatic Activation

Runs automatically on:
- Email-to-target pages only (`pageType: "EMAILTOTARGET"`)

### How It Works

1. Checks if the message contains name shortcodes
2. If no shortcodes found:
   - When First Name field loses focus (blur), adds first name to message
   - When Last Name field loses focus, adds last name after first name
3. Names are added only once (tracked by boolean flags)

### Example

**Initial message:**
```
Dear Senator,

I urge you to support this important legislation.

Sincerely,
```

**After user enters name fields:**
```
Dear Senator,

I urge you to support this important legislation.

Sincerely,
John Smith
```

### Technical Details

```typescript
// Watches for blur events on name fields
firstName.addEventListener("blur", (e) => {
  if (!addedFirstName) {
    addedFirstName = true;
    message.value = message.value.concat("\n" + target.value);
  }
});

lastName.addEventListener("blur", (e) => {
  if (!addedLastName) {
    addedLastName = true;
    message.value = message.value.concat(" " + target.value);
  }
});
```

### Shortcode Detection

The component checks for these patterns in the contact message:
- `{user_data~First Name}`
- `{user_data~Last Name}`

If one or more are found, the component doesn't run, allowing EN's merge tags to handle name insertion.

### Best Practices
1. **Use Shortcodes When Possible**: Prefer EN's built-in merge tags
2. **Message Format**: Ensure message template has space for name at end
3. **Test Order**: Verify names appear in correct order (first, then last)

---

## Ecard to Target

ENgrid can transform your standard eCard pages into a targeted advocacy action.  Your eCard page will function similar to an Email To Target page, with the eCard being sent to a predefined target.

### Overview

Use this when you want supporters to send ecards to predefined recipients (e.g., elected officials, corporate executives) rather than letting them choose their own recipients.

### Configuration

Configure via `window.EngridEcardToTarget` by adding a code block to your page:

```javascript
window.EngridEcardToTarget = {
  targets: [
    {
      targetName: "Senator Jane Smith",
      targetEmail: "senator@example.gov"
    },
    {
      targetName: "Representative John Doe",
      targetEmail: "rep@example.gov"
    }
  ],
  hideTarget: true,
  hideMessage: false,
  hideSendDate: true,
  addSupporterNameToMessage: true
};
```

### Configuration Options

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `targets` | `array` | Array of target objects with `targetName` and `targetEmail` | `[]` |
| `targetName` | `string` | (Deprecated) Single target name | `""` |
| `targetEmail` | `string` | (Deprecated) Single target email | `""` |
| `hideTarget` | `boolean` | Hide the recipient selection area | `false` |
| `hideMessage` | `boolean` | Hide the message textarea | `false` |
| `hideSendDate` | `boolean` | Hide the future delivery date selector | `false` |
| `addSupporterNameToMessage` | `boolean` | Append supporter's name to message on submit | `false` |

### Multiple Recipients

You can add multiple targets:

```javascript
window.EngridEcardToTarget = {
  targets: [
    { targetName: "CEO Amanda Wilson", targetEmail: "ceo@company.com" },
    { targetName: "Board Chair Robert Chen", targetEmail: "board@company.com" },
    { targetName: "VP Marketing Sarah Johnson", targetEmail: "vp@company.com" }
  ],
  hideTarget: true
};
```

The component:
- Removes duplicate targets automatically
- Clicks "Add Recipient" button for each target
- Fills in name and email fields programmatically

### Backward Compatibility

Legacy single-target configuration is still supported:

```javascript
window.EngridEcardToTarget = {
  targetName: "Senator Jane Smith",
  targetEmail: "senator@example.gov",
  hideTarget: true
};
```

This gets converted internally to the `targets` array format.

### Hide Form Elements

Control which parts of the ecard form are visible:

```javascript
window.EngridEcardToTarget = {
  targets: [{ targetName: "CEO", targetEmail: "ceo@company.com" }],
  hideTarget: true,      // Hide recipient fields
  hideMessage: false,    // Show message field
  hideSendDate: true     // Hide delivery date
};
```

**Use cases:**
- `hideTarget: true` - When recipients are predefined
- `hideMessage: true` - When using a standardized message
- `hideSendDate: true` - When cards should send immediately

### Add Supporter Name

Automatically append the supporter's name to the message:

```javascript
window.EngridEcardToTarget = {
  targets: [{ targetName: "Senator", targetEmail: "senator@gov.com" }],
  addSupporterNameToMessage: true
};
```

**Before submission:**
```
Dear Senator,

Please support this legislation.
```

**After submission:**
```
Dear Senator,

Please support this legislation.
John Smith
```

The name is added only once, on form submission, and uses the values from `supporter.firstName` and `supporter.lastName` fields.

### Complete Example

Corporate accountability campaign:

```javascript
window.EngridEcardToTarget = {
  targets: [
    {
      targetName: "CEO Jane Smith",
      targetEmail: "ceo@example.com"
    },
    {
      targetName: "Example Board of Directors",
      targetEmail: "board@example.com"
    }
  ],
  hideTarget: true,              // Hide recipient fields (already set)
  hideMessage: false,            // Let supporters personalize
  hideSendDate: true,            // Send immediately
  addSupporterNameToMessage: true // Auto-sign the message
};
```
### Best Practices

1. **Validate Emails**: Ensure target email addresses are correct
2. **Test Hiding**: Verify hidden elements don't cause validation issues
3. **Multiple Targets**: Test with various numbers of recipients
4. **Message Length**: Consider message length limits when auto-signing
5. **Accessibility**: Don't hide critical information that users need to see

### Requirements

The component requires:
- `.en__ecardrecipients__name input` - Name field
- `.en__ecardrecipients__email input` - Email field
- `.en__ecarditems__addrecipient` - Add recipient button

If these elements are missing, an error is logged.

### Troubleshooting

**Recipients not added:**
- Verify `EngridEcardToTarget` object exists in window
- Check that both `targetName` and `targetEmail` are provided
- Ensure ecard form elements are present
- Look for errors in browser console

**Elements not hiding:**
- Confirm hide options are set to `true`
- Check CSS isn't overriding `.hide` class
- Verify elements exist on the page

**Name not appended:**
- Ensure `addSupporterNameToMessage: true` is set
- Verify first name and last name fields have values
- Check that form submission is completing
- Name is added only once per form submission

### Debug Logging

Enable debug mode to see ecard operations

Look for `[📧 EcardToTarget]` in the console showing:
- Options loaded
- Recipients added
- Supporter name appended
