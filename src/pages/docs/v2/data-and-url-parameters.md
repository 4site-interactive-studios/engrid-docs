---
title: Data Attributes and URL Parameters
description: Components that manage body data attributes, URL-based hiding and replacement, clickable attribute setters, and URL-to-form field mapping
---
<!-- DataAttributes, DataHide, DataReplace, SetAttr, UrlParamsToBodyAttrs, UrlToForm,  -->
## Overview

ENgrid provides several components for managing page state through data attributes and URL parameters. These tools enable dynamic page behavior, analytics tracking, and URL-based customization.

---

## Data Attributes

The `DataAttributes` class automatically adds numerous data attributes to the `<body>` element to reflect page state, enabling CSS-based styling and JavaScript feature detection.

### Automatically Set Attributes

#### Platform & Page Info

| Attribute | Value | Description |
| --------- | ----- | ----------- |
| `data-engrid-page-type` | EN page type | Raw EN page type (donation, e-card, etc.) |
| `data-engrid-currency-code` | Currency code | Active currency (USD, EUR, etc.) |
| `data-engrid-country` | Country code | Selected country (updates on change) |
| `data-engrid-payment-type` | Payment method | Selected payment type (card, paypal, etc.) |
| `data-engrid-apple-pay-available` | `true`/`false` | Whether Apple Pay is available |
| `data-engrid-demo` | (empty) | Present when `?mode=DEMO` in URL |
| `data-engrid-first-page` | (empty) | Present on first page of multi-page form |
| `data-engrid-last-page` | (empty) | Present on final/thank you page |
| `data-engrid-css-has-selector` | `false` | Present if browser doesn't support `:has()` |

#### Page Section Detection

For each page section, a `data-engrid-no-{section}` attribute is added if the section is empty:

| Attribute | Indicates |
| --------- | --------- |
| `data-engrid-no-page-alert` | Page alert section is empty |
| `data-engrid-no-content-header` | Content header is empty |
| `data-engrid-no-body-headerOutside` | Header outside area is empty |
| `data-engrid-no-body-header` | Body header is empty |
| `data-engrid-no-body-title` | Body title is empty |
| `data-engrid-no-body-banner` | Body banner is empty |
| `data-engrid-body-banner` | `empty` - Banner has no image/video |
| `data-engrid-no-body-bannerOverlay` | Banner overlay is empty |
| `data-engrid-no-body-top` | Body top section is empty |
| `data-engrid-no-body-main` | Body main section is empty |
| `data-engrid-no-body-bottom` | Body bottom section is empty |
| `data-engrid-no-body-footer` | Body footer is empty |
| `data-engrid-no-body-footerOutside` | Footer outside area is empty |
| `data-engrid-no-content-footerSpacer` | Footer spacer is empty |
| `data-engrid-no-content-preFooter` | Pre-footer is empty |
| `data-engrid-no-content-footer` | Content footer is empty |
| `data-engrid-no-page-backgroundImage` | Background image section is empty |
| `data-engrid-no-page-backgroundImageOverlay` | Background overlay is empty |
| `data-engrid-no-page-customCode` | Custom code section is empty |

#### Footer Position

| Attribute | Description |
| --------- | ----------- |
| `data-engrid-footer-above-fold` | Footer is visible without scrolling |
| `data-engrid-footer-below-fold` | Footer requires scrolling to see |

### Donation Page Specific

On donation pages, additional attributes track form options:

| Attribute | Description | Example Values |
| --------- | ----------- | -------------- |
| `data-engrid-visible-frequency` | Number of visible frequency options | `1`, `2`, `3` |
| `data-engrid-visible-gift-amount` | Number of visible amount options | `4`, `5`, `6` |

These update dynamically:
- When frequency changes (amounts may show/hide)
- Via MutationObserver watching donation amount field
- On initial page load

### Other Amount Currency Symbol

The "other amount" field gets a currency symbol data attribute:

```html
<div class="en__field__item--other" data-currency-symbol="$">
  <!-- Other amount input -->
</div>
```

### CSS Usage Examples

```css
/* Hide banner on pages where it's empty */
body[data-engrid-no-body-banner] .body-banner {
  display: none;
}

/* Different styles for different page types */
body[data-engrid-page-type="donation"] .special-message {
  display: block;
}

/* Style based on frequency options */
body[data-engrid-visible-frequency="1"] .frequency-selector {
  display: none; /* Hide frequency selector if only one option */
}

/* Apple Pay specific styling */
body[data-engrid-apple-pay-available="true"] .apple-pay-button {
  display: inline-block;
}

/* Country-specific content */
body[data-engrid-country="US"] .us-only-content {
  display: block;
}
```

### Dynamic Updates

Several attributes update automatically:
- **Country**: Updates when country field changes
- **Payment Type**: Updates when payment method changes  
- **Visible Gift Amount**: Updates via MutationObserver and frequency changes
- **Currency Code**: Set once on load

---

## Data Hide

The `DataHide` class hides page elements based on URL parameters, useful for testing layouts or creating variant pages without template changes.

### Usage

**Format:**
```
?engrid_hide[element-name]=id
?engrid_hide[element-name]=class
```

**Multiple elements:**
```
?engrid_hide[header]=class&engrid_hide[footer-social]=id
```

### Examples

#### Hide by Class
```
?engrid_hide[body-banner]=class
```

Hides all elements with class `body-banner`.

#### Hide by ID
```
?engrid_hide[special-promo]=id
```

Hides element with ID `special-promo`.

#### Hide Multiple Elements
```
?engrid_hide[body-banner]=class&engrid_hide[social-share]=class&engrid_hide[promo-banner]=id
```

### How It Works

1. Parses URL for `engrid_hide[]` parameters
2. Extracts element name and type (id/class)
3. Finds matching elements
4. Adds attribute `hidden-via-url-argument` to each

### CSS Integration

```css
[hidden-via-url-argument] {
  display: none !important;
}
```

### Common Use Cases

**Testing Layouts:**
```
?engrid_hide[body-header]=class
```

**Variant Testing:**
```
?engrid_hide[default-banner]=class
```

**iFrame Opt-in Ladders:**
```
?engrid_hide[body-header]=class&engrid_hide[body-footer]=class
```

---

## Data Replace

The `DataReplace` class replaces merge tags in page content with values from URL parameters, enabling personalized or dynamic content.

You can hide content with the `.hide-until-merged` class which will set it to invisible until after the merge has completed.

***ALL*** values for URL arguments used by these merge fields must be URL-encoded

- [Encode to URL-encoded format](https://www.urlencoder.org/)
- [Screenshot Example](https://share.cleanshot.com/PO83Qf)

{% callout title="You should know!" %}
This feature works similar to inserting EN supporter data. If you're looking to inject content relating to supporter or page data, use those merge tags. You can learn more about Engaging Networks [page tags here](https://knowledge.engagingnetworks.net/pages/page-tags).
{% /callout %}

### Merge Tag Format

```
{engrid_data~[key]~[default_value]}
```

- `key`: URL parameter name
- `default_value`: Optional fallback value (No value = hidden)

### URL Parameter Format

```
?engrid_data[key]=value
```

### Examples

#### Basic Replacement

**HTML:**
```html
<div class="en__component--copyblock">
  <p>Thank you for helping {engrid_data~[animal]~animals}!</p>
</div>
```

**URL:**
```
?engrid_data[animal]=elephants
```

**Result:**
```html
<p>Thank you for helping elephants!</p>
```

**Without URL parameter:**
```html
<p>Thank you for helping animals!</p>
```

#### Multiple Merge Tags

**HTML:**
```html
<h2>Support {engrid_data~[campaign]~Our Mission}</h2>
<p>Your {engrid_data~[gift_type]~generous} donation makes a difference!</p>
```

**URL:**
```
?engrid_data[campaign]=Clean Water Initiative&engrid_data[gift_type]=monthly
```

**Result:**
```html
<h2>Support Clean Water Initiative</h2>
<p>Your monthly donation makes a difference!</p>
```

#### Line Breaks

Line breaks in URL values (encoded as `\n` or `\\n`) are converted to `<br>` tags:

**URL:**
```
?engrid_data[address]=123 Main St\nSuite 100\nNew York, NY 10001
```

**Result:**
```html
123 Main St<br>Suite 100<br>New York, NY 10001
```

### Supported Elements

Merge tags are replaced in:
- `.en__component--copyblock` (copy blocks)
- `.en__component--codeblock` (code blocks)
- `.en__field` (form fields)

### Page State Attribute

After processing, the body receives:
```html
<body data-engrid-merge-tags-processed="">
```

This can trigger CSS or JavaScript that depends on replacement completion.

### Use Cases

#### In Memorium

```
?engrid_data[inmem_name]=John&engrid_data[last_gift]=50
```

```html
<p>Thank you for your last gift of ${engrid_data~[last_gift]~25} in memory of ${engrid_data~[inmem_name]~those we've lost}</p>
```

#### Campaign-Specific Content

```
?engrid_data[campaign_goal]=10000&engrid_data[raised]=7500
```

```html
<p>We've raised ${engrid_data~[raised]~0} of our ${engrid_data~[campaign_goal]~10,000} goal!</p>
```

#### Dynamic Matching Gift

```
?engrid_data[match_multiplier]=2&engrid_data[match_donor]=The Smith Foundation
```

```html
<div class="match-callout">
  Your gift will be matched {engrid_data~[match_multiplier]~1}x by {engrid_data~[match_donor]~a generous donor}!
</div>
```

---

## Set Attribute

The `SetAttr` module enables clickable elements to set body data attributes, useful for toggling UI states or features.

### Format

Add class to clickable element:
```
setattr--{attribute}--{value}
```

The `data-engrid-` prefix is automatically added if not present.

### Examples

#### Toggle Feature

**HTML:**
```html
<button class="setattr--hide-fast-address--true">
  Hide Address Details
</button>

<button class="setattr--hide-fast-address--false">
  Show Address Details
</button>
```

**Result:**
Clicking sets `<body data-engrid-hide-fast-address="true">` or `"false"`.

#### Set Page View

**HTML:**
```html
<div class="view-switcher">
  <button class="setattr--view-mode--grid">Grid View</button>
  <button class="setattr--view-mode--list">List View</button>
</div>
```

**CSS:**
```css
body[data-engrid-view-mode="grid"] .items {
  display: grid;
}

body[data-engrid-view-mode="list"] .items {
  display: flex;
  flex-direction: column;
}
```

#### Multiple Attributes

```html
<button class="setattr--theme--dark setattr--contrast--high">
  Dark High Contrast
</button>
```

### Use Cases

- UI theme switchers
- Layout mode toggles
- Feature show/hide controls
- Accessibility options
- View preferences

---

## URL Parameters to Body Attributes

The `UrlParamsToBodyAttrs` class automatically converts URL parameters starting with `data-engrid-` into body data attributes.

### Usage

**URL:**
```
?data-engrid-theme=blue&data-engrid-variant=minimal
```

**Result:**
```html
<body data-engrid-theme="blue" data-engrid-variant="minimal">
```

### Example

```
?data-engrid-theme=blue
```

```css
body[data-engrid-theme="blue"] .hero-message {
  color: blue;
}
```

---

## URL to Form

The `UrlToForm` class pre-fills form fields from URL parameters, enabling personalized donation pages and reducing friction. 

{% callout title="You should know!" %}
Note that this system does not work with our "Pseudo" form fields which mirror the styles and format of Engaging Networks form fields, but they are not _`real`_ form fields.
{% /callout %}

### Behavior

- Only fills empty fields (preserves user input)
- Exception: Non-text fields (selects, radios) are always set
- Checkbox handling: `true`, `Y`, or `1` = checked

### Examples

#### Pre-fill Supporter Info

The target field is case sensitive and can be found by inspecting the field and retrieving it's `name` For example this is the First Name field.

```javascript
<input id="en__field_supporter_firstName" type="text" 
class="en__field__input en__field__input--text" 
name="supporter.firstName" value="" placeholder="First Name">
```

**URL:**
```
?supporter.firstName=Sarah
```

**Result:**
First name field is pre-filled (if empty).

#### Set Donation Amount

**URL:**
```
?transaction.donationAmt=100&transaction.recurrpay=Y
```

**Result:**
- $100 amount selected
- Monthly frequency selected

#### Checkbox Fields

**URL:**
```
?transaction.tribute=Y&supporter.questions.123=true
```

**Result:**
Both checkboxes are checked.

### Protected Fields

Text, textarea, and email fields are **only** filled if empty. This prevents overwriting user input if they navigate back.

### Use Cases

#### Email Campaign Links

```
https://donate.org/page?supporter.firstName=John&source=email_campaign
```

#### Matching Gift

```
?transaction.donationAmt=500&custom.company=ABC%20Corp&custom.match=2x
```

#### Event Registration

```
?supporter.firstName=Jane&supporter.lastName=Doe&custom.event_id=2024_gala
```

#### Suggested Donations

```
?transaction.donationAmt=50&transaction.recurrpay=Y&custom.appeal=year_end
```

### Debugging

Enable debug mode to see which fields are set:

```
?debug=true&supporter.firstName=Test
```

Console output:
```
🔗 [ENgrid UrlToForm] Set: supporter.firstName to Test
```

---

## Best Practices

### 1. Use Data Attributes for Styling

Prefer data attributes over class manipulation:

```css
/* Good */
body[data-engrid-payment-type="paypal"] .card-fields {
  display: none;
}

/* Avoid */
body.paypal-selected .card-fields {
  display: none;
}
```

### 2. Provide Defaults for Merge Tags

Always include fallback values:
```html
{engrid_data~[name]~Friend}
```

### 3. Document Custom URL Parameters

If using custom `data-engrid-*` parameters in your client theme, document them for your team:
```
?data-engrid-campaign=spring2024
?data-engrid-segment=major-donor
```

### 4. Test URL Pre-fill Edge Cases

- User edits pre-filled field
- User navigates back
- Invalid/missing parameters
- Special characters in values

### 5. Monitor URL Length

Long URLs can break and become unwieldy when users attempt to share a page they've visted:
```
# Keep under 2000 characters
?engrid_data[message]=<very long text>
```

Use shortcodes or redirect services for complex data.
