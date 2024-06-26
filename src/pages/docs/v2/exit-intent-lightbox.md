---
title: Exit intent lightbox
description: Learn about ENgrid's exit intent lightbox feature and how to configure it for your Engaging Networks page.
---

A lightbox that asks the user to confirm exiting the page can be configured to show on any page. To activate it, add a code block to the page with: \

 ```Javascript
<script>
const EngridExitIntent = {
	enabled: true,
}
</script>
```


## The lightbox has additional configurations options for:

| Property                   | Description                                                                                               |
|----------------------------|-----------------------------------------------------------------------------------------------------------|
| `Title`                    | The headline copy of the lightbox                                                                         |
| `Text`                     | The body copy of the lightbox                                                                             |
| `buttonText`               | The button label text                                                                                     |
| `buttonLink`               | Where clicking the button will send the user to                                                           |
| ` cookieName`              | Name of the cookie used to prevent the lightbox opening more than once                                    |
| ` cookieDuration`          | Expiry length of the cookie                                                                               |
| `triggers.visibilityState` | Boolean - if the lightbox should trigger on visibilityState changes (e.g., changing tab)                  |
| ` triggers.mousePosition`  | Boolean - if the lightbox should trigger on mousePosition (e.g., the mouse goes towards the close button) |
