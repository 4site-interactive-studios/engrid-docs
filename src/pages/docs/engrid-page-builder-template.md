---
title: ENgrid and Page BuilderTemplate Structure and Optimization
description: Learn about the intricacies Engaging Network's Page Builder and ENgrid templates. This guide provides a detailed breakdown of template structures, optimization techniques, and best practices to supercharge your page's performance and design.

---

Engaging Network's Page Buidler Templates are the HTML wrapper for your pages.

To view your templates, and to edit and create new ones, go to Pages > Components > Templates.

![Alt text](https://www.engagingnetworks.support/wp-content/uploads/2019/03//PB_Templates_02.png)

## ENGrid Template Structure

The order of content and assets in the page template is intentional. Below is the breakdown of the logic and reasoning for everything.

### Header Template ([example markup](https://github.com/4site-interactive-studios/engrid-scripts/blob/main/reference-materials/html/page-template-example/page-template-header-example.html)) 

#### Initialize the GTM Data Layer (assumes GTM is needed)
Has to come before everything, might as well be the first thing.
#### Commented out copy of Google Optimize w/ anti-flicker snippet
Commented out because even if it's not used, if it's turned on it will dramatically slow down page load time.
#### Favicons
Usually copied directly from organizational website
#### Meta Tags
    These tags are here to provide Page Template level defaults for social sharing that can then be overwritten when Social Sharing Settings are configured on an individual page. This was extensively tested, no tags more / no tags less should be used. See: [GitHub Issue #12](https://github.com/4site-interactive-studios/en-wishlist/issues/12)
```javascript
<!-- Sharing Meta Tags Used by Facebook-->
<title>${page~title} | TBD-ORG-NAME - TBD-ORG-TAGLINE>/title>
<meta property="og:type" content="website">
<meta property="fb:app_id" content="1234567890"><!-- Optional -->

<!-- Social Sharing Meta Tags Used by Twitter-->
<meta property="twitter:account_id" content="0987654321"><!-- Optional -->
<meta name="twitter:site" content="@ABC"><!-- @username of website -->
<meta name="twitter:creator" content="@XYZ"><!-- @username of content creator -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://via.placeholder.com/1024x512.png?text=1024x512">
<meta name="twitter:title" content="${page~title}">
<meta name="twitter:description" content="Up to 160 character long description">
```

#### Preconnection 
Begin the DNS handshake process for all URLs that will load assets. Replace the below with your domains in priority order of access.
```javascript
<link rel="preconnect" href="//c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com">
<link rel="preconnect" href="//e-activist.com">
<link rel="preconnect" href="//www.googletagmanager.com">
<link rel="preconnect" href="//[www.google-analytics.com](www.google-analytics.com)">
```

#### Get color on the page with inline CSS

```html
<style>
    body{
        background-color: #BFBFBF;
        opacity: 0;
        }

    body[data-engrid-embedded]{
        background-color: transparent !important;
         }
</style>

```

#### Preload 
Start to download the theme's CSS and logo before any other asset is downloaded.
```html
   <link rel="preload" href="TBD.css" as="style">
   <link rel="preload" href="TBD.svg" as="image">
```
#### Noscript Message
A message for visitors without javascript enabled. Not really needed but wins points on some automated "Accessibility" testing software.

#### Detect if in an iFrame 
Detect if the page is being served in an iFrame and add the corresponding class to the body so that it never renders in the wrong visual state.

```javascript
    <script>
        if(window.self !== window.top){        document.getElementsByTagName("BODY")[0].setAttribute("data-engrid-embedded", "");
          };
    </script>
```      
#### Load ENGrid's CSS file
We load our CSS file here so that it comes after Engaging Network's CSS file which is inserted in `<head>`. If our CSS file in added right before `</head>`, Engaging Network's file will still come after it requiring you to use !important or other methods for winning CSS specificity when applying your styles.

In our testing a single CSS file performed better than multiple CSS files. This assumes a CSS file of reasonable size.


#### Preload fonts 
Download render critical fonts without the need to read our CSS file first
```javascript
    <link rel="preload" href="TBD1.woff" as="font" type="font/woff" crossorigin>
    <link rel="preload" href="TBD2.woff" as="font" type="font/woff" crossorigin>
    <link rel="preload" href="TBD3.woff" as="font" type="font/woff" crossorigin> 
```
---
## Footer ([example markup](https://github.com/4site-interactive-studios/engrid-scripts/blob/main/reference-materials/html/page-template-example/page-template-footer-example.html))

#### Additional Default meta tags 
Like the other default meta tags, this exact setup is required for the optimal configuration

```html
<!-- More Sharing Meta Tags Used by Facebook-->
<!-- EN adds these tags just before &lt;body> so you need them here to override them -->
<link rel="image_src" href="https://via.placeholder.com/1024x512.png?text=1024x512"/>
<meta name="title" content="${page~title}">
<meta name="description" content="Up to 255 character long description">
```

#### Load ENGrid's JS file
Loaded asynchronously and loaded here so our JS file here so it comes after all page content.
 ```html
 <script async src="TBD.js"></script>
```        
#### Render Critical Javascript
Javascript that moves DOM components
* Contained in `main.js`, but also included here as to not wait for it
Javascript that loads lazy loaded images
 * Contained in main.js, but also included here as to not wait for it
#### Google Tag Manager
Add your GTM script here

#### ThreatMetrix
Our customized implementation of ThreatMetrix placed here so that it minimizes the impact on page load experience while still retaining support for the service.
#### Custom CSS
Place your temporary custom CSS here. Eventually all styles should be moved into the main.css file, but you can place them here until that happens.

---
### Baked In Page Buider Layouts

Body Custom Attribute values for `"data-engrid-layout"`

* `leftleft1col`
* `centerleft1col`
* `centercenter1col`
* `centercenter2col`
* `centerright1col`
* `rightright1col`


Example code block to your page, change to use the desired layout class: 
```
<script>
    const engrid = document.getElementsByTagName("BODY")[0];
    engrid.setAttribute("data-engrid-layout", "centercenter1col");
</script>
```

[https://pastebin.com/raw/8jUMByU0](https://pastebin.com/raw/8jUMByU0)

---


## Error Styling 
### Body Custom Attribute for `data-engrid-errors` 

```
fancy
```
---
 
## Add HTML

For the addHtml function, the html parameter can be either a string (example: `<strong>`Fernando`</strong>`) or an Element.

* The target should be a string for query selector (example: `body` , or `.en__submit`).
* The position defaults to `"before"`, but can be set as `"after"`.
* Combining only those 2 positions with the target element, you can add your component anywhere you want in the page.

```javascript
 addHtml(html, target, position)
```

## Remove HTML 

The removeHtml function expects a string for query selector (example: body , or .en__submit).

```
removeHtml(target)
```

---
## ThreatMetrix 

If you are implementing ThreatMetrix, be aware their suggested implementation kills page load performance. We have an alternative route that neuters how aggressively they profile the visitor and this approach has worked well enough for our clients. Your mileage may vary and if it's not stopping scammers / spammers, try reverting to their suggested installation.

Once you have their suggested embed code, you need to pull a few bits of client specific information out of it. In the code below replace the iFrame's `ORGID` and `SESSIONID_PREFIX` with their corresponding values which you can infer from your embed code. Then insert that updated markup as the last bit before the page template's closing `</body>` tag.

  

```html
<tr>
   <td>
<!-- Start ThreatMetrix Profiling Tag -->
<!-- The default ThreatMetrix installation murders page load performance -->
<!-- To optimize it we have removed the <script> tag and rely on the <iframe> for profiling 100% of site traffic -->
<iframe style="width: 100px; height: 100px; border: 0; position: absolute; top: -5000px;" src="https://h.online-metrix.net/fp/tags.js?org_id=ORGID&session_id=SESSIONID_PREFIX-${page~sessionId}&page_id=1"></iframe>
<!-- End ThreatMetrix Profiling Tag -->
   </td>
  </tr>
```