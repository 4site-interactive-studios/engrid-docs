---
title: Ecard To Target
description: This page shows how to use ENgrid's Ecard To Target functionality
---

ENgrid can transform your standard eCard pages into a targeted advocacy action.  Your eCard page will function similar to an Email To Target page, with the eCard being sent to a predefined target.

## Creating an Ecard To Target Page

Creating an eCard to target page is simple. Just add a code block to your page that defines the `window.EngridEcardToTarget` variable.

It looks like this:

```html
<script>
  window.EngridEcardToTarget = {
    targetName: "Michael Thomas", // your target's full name
    targetEmail: "MichaelT@4sitestudios.com", // your target's email address
  }
</script>
```
It is also possible to add multiple targets to the page. They will all receive the same eCard.

```html
<script>
  window.EngridEcardToTarget = {
    targets: [
      {
        targetName: "Michael Thomas",
        targetEmail: "MichaelT@4sitestudios.com",
      },
      {
        targetName: "Bryan Casler",
        targetEmail: "Bryan@4sitestudios.com",
      },
    ]
  }
</script>
```

## Configuration Options

There are additional options you can set to customize the behavior and appearance of the page:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `targetName` | string | `""` | **Required** (if `targets` not provided): The target's full name. Either provide `targetName` and `targetEmail`, or use the `targets` array |
| `targetEmail` | string | `""` | **Required** (if `targets` not provided): The target's email address. Either provide `targetName` and `targetEmail`, or use the `targets` array |
| `targets` | Array<{targetName: string, targetEmail: string}> | `[]` | **Required** (if `targetName`/`targetEmail` not provided): An array of target objects. Each target should have a `targetName` and `targetEmail` property. All targets will receive the same eCard |
| `hideSendDate` | boolean | `true` | If `true`, hides the send date field on the form |
| `hideTarget` | boolean | `true` | If `true`, hides the target field on the form |
| `hideMessage` | boolean | `true` | If `true`, hides the message field on the form |
| `addSupporterNameToMessage` | boolean | `false` | If `true`, automatically adds the supporter's name to the end of the message |

### Complete Configuration Example

```html
<script>
  window.EngridEcardToTarget = {
    // Single target approach
    targetName: "Michael Thomas",
    targetEmail: "MichaelT@4sitestudios.com",
    
    // OR multiple targets approach
    targets: [
      {
        targetName: "Michael Thomas",
        targetEmail: "MichaelT@4sitestudios.com",
      },
      {
        targetName: "Bryan Casler",
        targetEmail: "Bryan@4sitestudios.com",
      },
    ],
    
    // Optional customization
    hideSendDate: true,
    hideTarget: true,
    hideMessage: true,
    addSupporterNameToMessage: false,
  }
</script>
```

**Note:** You can use either the single target approach (`targetName` + `targetEmail`) or the multiple targets approach (`targets` array), or both. If both are provided, all targets (including the single target) will be added to the recipients list. Duplicate targets are automatically removed.


