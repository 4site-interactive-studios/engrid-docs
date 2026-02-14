---
title: URL Parameters
description: Learn how ENgrid uses URL parameters to populate forms, set body attributes, and control page behavior.
---

ENgrid provides several features that leverage URL parameters to control page behavior, populate form fields, and set data attributes.

## URL to Form

The URL to Form feature automatically populates form fields from URL query parameters. The parameter name must match the form field's `name` attribute.

### Example

```
https://support.example.org/page/12345/donate/1?supporter.firstName=Jane&supporter.lastName=Doe
```

### Behavior

- **Checkbox fields:** Set to checked if the URL value is `"true"`, `"Y"`, or `"1"`
- **Text/textarea/email fields:** Only sets the value if the field is currently empty (preserves existing values)
- **Select/radio/hidden fields:** Always sets the value

{% callout title="Note" %}
This does NOT work with "pseudo" form fields (non-real EN form fields). For native EN merge fields, see the [Dynamic Content](/docs/v2/dynamic-content-from-url-arguments) documentation.
{% /callout %}

---

## URL Parameters to Body Attributes

URL parameters that start with `data-engrid-` are automatically copied onto the `<body>` element as data attributes. This allows you to control page styling and behavior via URL parameters.

### Example

```
https://support.example.org/page/12345/donate/1?data-engrid-layout=centercenter1col
```

This would add `data-engrid-layout="centercenter1col"` to the `<body>` element.

---

## Set Attributes

The Set Attr feature allows you to set HTML attributes on page elements using a declarative syntax. Elements with `data-engrid-set-attr` can dynamically set attributes on other elements based on configuration.

---

## US-Only Form

The US-Only Form feature restricts a form to US addresses only. When enabled, it:

- Hides the country field
- Sets the country to "US" automatically
- Can show/hide form sections based on whether the form is US-only
