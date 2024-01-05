---
title: ENgrid Page Builder Components and Features
description: A guide to Page Builder components and features. Learn how to set body data attributes via URL or code blocks, manage universal opt-ins, and utilize currency symbols and lazy loading for a more dynamic and engaging user experience.

---

## Setting body data attributes via URL and Code Blocks 

### Via Code Block 

You can set `data-engrid-` attributes on the body using a code block using the `setEnGridBodyDataAttribute` function which is available globally via the page template.

For example, to change the page layout you can make a code block like this: 

```javascript
<script>
    setEnGridBodyDataAttribute('layout', 'leftleft1col');
</script>
```

### Via URL

To set attributes via URL, any URL parameter that begins with `data-engrid-` will be updated or added to the body. For example, to change the page layout, you would add the URL parameter `data-engrid-layout=leftleft1col`

{% callout title="You should know!" %}
Attributes set via the URL will take priority over those set via code blocks. This is to ensure that there is a predictable priority to how attributes are set: default > code block > URL parameter.
{% /callout %}


---
## Universal Opt-in 

In the event you want to have one visible radio select opt-in, that controls the values of several hidden radio select opt-ins, you can use this feature to control that behavior. This can be combined with the `i#-hide` classes to visually hide those subsequent opt-ins from the supporter.


### .universal-opt-in 

By adding `.universal-opt-in` to a form block this will cause any user selection made on a radio select to impact the values of the other radio selects in the same form block. If a user selects `Y` on any radio select in the form block, all other radio selects in the form block will have their value set to `Y`. And if they select `N` on any radio select in the form block, then all other radio selects in the form block will be set to `N`.

Recording: [https://cln.sh/LknTlt7t](https://cln.sh/LknTlt7t) 



### .universal-opt-in_null

By adding `.universal-opt-in_null` to a form block this will cause any user selection made on a radio select to impact the values of the other radio selects in the same form block. If a user selects `Y` on any radio select in the form block, all other radio selects in the form block will have their value set to `Y`. And if they select `N` on any radio select in the form block, then all other radio selects in the form block will be set to `Null`.

Recording: [https://cln.sh/9CbxlW9s](https://cln.sh/9CbxlW9s)

----

## Currency Symbols

You can add these to any code block, copy block, field label, or the submit button text. The symbol will reference the on-page Currency field to derive it's value. If that field is not present it will default to any option defined on the client theme. If that's not present then it will fallback to `$/USD`.

There is currently support for the following: `USD|$`, `GBP|£`, `EUR|€`
* `[$]` - Will add the currency symbol (e.g., $)
* `[$$$]` - Will add the three letter currency code (e.g., USD)


---

## Lazy Loading
### Example Lazy Loaded Image

```html
<img alt="Guidestar" data-src="https://website.org/guidestar.png"
height="100" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="100" />
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

```html
 E.g. "<img alt="Elephant" data-src="https://imgur.com/elephant.jpg"  data-attribution-source="© Photographer's Name" data-attribution-source-link="[https://www.google.com](https://www.google.com)" height="1080" width="1920">

```
---

## Banner and Background Video 

You can add video to the Body Banner or Page Background Image sections.

```javascript
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

## Letter-to-Target (Senate)

The US Senate API requires Title's to be submitted and conform to one of the five defined options below. Using different titles or not including them will result in the submission not being accepted.

* Ms
* Mrs
* Miss
* Mr
* Dr
 ---


### Invisible Placeholder Pixel 

```javascript
src="src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
```

----


