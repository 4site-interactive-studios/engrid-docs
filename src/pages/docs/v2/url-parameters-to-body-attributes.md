---
title: URL Parameters to Body Attributes
description: Learn how to convert URL parameters into body data attributes for dynamic styling and functionality.
---

The `UrlParamsToBodyAttrs` component automatically converts URL parameters that start with `data-engrid-` into body data attributes. This allows you to control page styling and behavior via URL parameters.

## How It Works

When a URL contains parameters starting with `data-engrid-`, the component automatically:
1. Reads the parameter name
2. Strips the `data-engrid-` prefix
3. Adds the remaining part as a body data attribute with the parameter value

## Usage

Add URL parameters in the format:

```
?data-engrid-{attribute-name}={value}
```

The component will automatically set `data-engrid-{attribute-name}={value}` on the `<body>` element.

## Examples

### Basic Usage

```
https://example.org/page/1234/donate/1?data-engrid-theme=dark
```

This will add `data-engrid-theme="dark"` to the `<body>` element.

### Multiple Attributes

```
https://example.org/page/1234/donate/1?data-engrid-theme=dark&data-engrid-layout=compact
```

This sets both `data-engrid-theme="dark"` and `data-engrid-layout="compact"` on the body.

## Common Use Cases

### Theme Switching

Use URL parameters to switch themes:

```
?data-engrid-theme=dark
?data-engrid-theme=light
```

Then use CSS to style based on the body attribute:

```css
body[data-engrid-theme="dark"] {
  background-color: #000;
  color: #fff;
}
```

### Layout Control

Control page layouts via URL:

```
?data-engrid-layout=compact
?data-engrid-layout=expanded
```

### Feature Flags

Enable or disable features:

```
?data-engrid-show-upsell=true
?data-engrid-hide-footer=true
```

## Combining with Other Features

You can combine URL parameters with conditional content helper classes:

```
?data-engrid-campaign=summer
```

Then use CSS or JavaScript to show/hide content based on the body attribute:

```css
body[data-engrid-campaign="summer"] .summer-only {
  display: block;
}
```

## Technical Details

- The component runs automatically on page load
- Only parameters starting with `data-engrid-` are processed
- The `data-engrid-` prefix is removed from the attribute name
- Values are set as-is (no encoding/decoding)
- Multiple parameters can be set in a single URL

## Example: Complete URL

```
https://example.org/page/1234/donate/1?data-engrid-theme=dark&data-engrid-layout=compact&data-engrid-campaign=summer&engrid_hide[footer]=class
```

This will:
- Set `data-engrid-theme="dark"` on body
- Set `data-engrid-layout="compact"` on body
- Set `data-engrid-campaign="summer"` on body
- Hide elements with class `footer`

