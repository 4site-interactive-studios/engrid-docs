---
title: Exit intent lightbox
description: Learn about ENgrid's exit intent lightbox feature and how to configure it for your Engaging Networks page.
---

A lightbox that asks the user to confirm exiting the page can be configured to show on any page. To activate it, add a code block to the page with:

```javascript
<script>
window.EngridExitIntent = {
  enabled: true,
}
</script>
```

## Configuration Options

The lightbox has additional configuration options:

| Property                  | Type    | Default | Description                                                                                               |
|--------------------------|---------|---------|-----------------------------------------------------------------------------------------------------------|
| `enabled`                | boolean | `false` | Whether the exit intent lightbox is enabled                                                              |
| `title`                  | string  | `"We are sad that you are leaving"` | The headline copy of the lightbox                                                                         |
| `text`                   | string  | `"Would you mind telling us why you are leaving this page?"` | The body copy of the lightbox                                                                             |
| `buttonText`             | string  | `"Send us your comments"` | The button label text                                                                                     |
| `buttonLink`             | string  | `"https://www.4sitestudios.com/"` | Where clicking the button will send the user to                                                           |
| `cookieName`             | string  | `"engrid-exit-intent-lightbox"` | Name of the cookie used to prevent the lightbox opening more than once                                    |
| `cookieDuration`         | number  | `30` | Expiry length of the cookie in days                                                                       |
| `triggers.visibilityState` | boolean | `true` | If the lightbox should trigger on visibilityState changes (e.g., changing tab)                  |
| `triggers.mousePosition` | boolean | `true` | If the lightbox should trigger on mousePosition (e.g., the mouse goes towards the close button) |

## Default Configuration

If you don't specify a value, the following defaults are used:

```javascript
window.EngridExitIntent = {
  enabled: false,
  title: "We are sad that you are leaving",
  text: "Would you mind telling us why you are leaving this page?",
  buttonText: "Send us your comments",
  buttonLink: "https://www.4sitestudios.com/",
  cookieName: "engrid-exit-intent-lightbox",
  cookieDuration: 30,
  triggers: {
    visibilityState: true,
    mousePosition: true,
  },
}
```

## Example

```javascript
<script>
window.EngridExitIntent = {
  enabled: true,
  title: "Wait! Don't leave yet!",
  text: "Sign up for our newsletter to stay connected.",
  buttonText: "Subscribe Now",
  buttonLink: "/newsletter",
  cookieName: "custom-exit-intent",
  cookieDuration: 7,
  triggers: {
    visibilityState: true,
    mousePosition: false,
  },
}
</script>
```
