---
title: Embedding ENgrid
description: Techniques for Integrating Engaging Networks Pages. Learn how to seamlessly embed one Engaging Networks page into another and integrate ENgrid into your WordPress site with our dedicated iframe plugin.
---

## Embedding one EN page inside another EN page

Should you want to embed one Engaging Networks page in another (e.g. Embedded donation page on donation thank you page) simply add a code block with your desired URL; just **be sure to include ?chain** at the end.

```javascript
<iframe loading='lazy' width='100%' scrolling='no' class='engrid-iframe' src='https://lorem.ipsum.org/page/123456/donate/1?chain' frameborder='0' allowfullscreen></iframe>
```

[Also read about the embedded ecard component](/docs/v2/embedded-ecard)

For flows that need to submit several embedded EN forms in sequence (for example, a chain of opt-in QCBs after a donation), use the [Iframe Queue](/docs/v2/iframe-queue) instead of stacking `?chain` iframes. The queue passes field data via `postMessage` and waits on each Thank You page before advancing.

---

## Embedding an EN page inside WordPress

The plugin allows you to enter shortcodes for Engaging Networks pages using ENgrid and they will be inserted into the WordPress page seamlessly.

* [https://github.com/4site-interactive-studios/en-iframe](https://github.com/4site-interactive-studios/en-iframe)
---
