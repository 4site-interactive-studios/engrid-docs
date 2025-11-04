---
title: Setting Body Attributes via Click Handlers
description: Learn how to set body data attributes by clicking elements with special classes.
---

The `SetAttr` component allows you to set body data attributes by clicking on elements with specific CSS classes. This enables dynamic styling and behavior changes based on user interactions.

## How It Works

Add a class in the format `setattr--{attribute}--{value}` to any clickable element. When clicked, the component will automatically set the specified data attribute on the `<body>` element.

## Usage

Add the class `setattr--{attribute}--{value}` to any element that can be clicked.

### Class Format

```
setattr--{attribute-name}--{value}
```

Where:
- `{attribute-name}` is the data attribute name (without the `data-engrid-` prefix)
- `{value}` is the value to set for that attribute

## Examples

### Basic Example

```html
<button class="setattr--theme--dark">Switch to Dark Theme</button>
```

When clicked, this will set `data-engrid-theme="dark"` on the `<body>` element.

### Complete Example

```html
<div class="theme-selector">
  <button class="setattr--theme--dark">Dark Theme</button>
  <button class="setattr--theme--light">Light Theme</button>
  <button class="setattr--theme--auto">Auto Theme</button>
</div>
```

### Multiple Attributes

You can set multiple attributes by adding multiple classes:

```html
<button class="setattr--theme--dark setattr--layout--compact">
  Dark Compact Mode
</button>
```

This will set both `data-engrid-theme="dark"` and `data-engrid-layout="compact"` when clicked.

## Common Use Cases

### Theme Switching

Create theme toggle buttons:

```html
<div class="theme-switcher">
  <button class="setattr--theme--light">Light</button>
  <button class="setattr--theme--dark">Dark</button>
</div>
```

Then style based on the body attribute:

```css
body[data-engrid-theme="dark"] {
  background-color: #000;
  color: #fff;
}

body[data-engrid-theme="light"] {
  background-color: #fff;
  color: #000;
}
```

### Layout Control

Toggle between different layouts:

```html
<button class="setattr--layout--compact">Compact View</button>
<button class="setattr--layout--expanded">Expanded View</button>
```

### Feature Toggles

Show/hide features dynamically:

```html
<button class="setattr--show-upsell--true">Show Upsell</button>
<button class="setattr--show-upsell--false">Hide Upsell</button>
```

## How Attributes Are Set

- The component listens for clicks on elements with classes starting with `setattr--`
- It extracts the attribute name and value from the class name
- It automatically adds the `data-engrid-` prefix to the attribute name
- The attribute is set on the `<body>` element

## Example: Full Implementation

```html
<div class="page-controls">
  <button class="setattr--theme--dark">Dark Mode</button>
  <button class="setattr--layout--sidebar">Sidebar Layout</button>
  <button class="setattr--show-advanced--true">Show Advanced</button>
</div>

<style>
  body[data-engrid-theme="dark"] {
    background: #000;
    color: #fff;
  }
  
  body[data-engrid-layout="sidebar"] .main-content {
    display: grid;
    grid-template-columns: 250px 1fr;
  }
  
  body[data-engrid-show-advanced="true"] .advanced-options {
    display: block;
  }
</style>
```

## Technical Notes

- The component runs automatically - no configuration needed
- Works with any clickable element (buttons, links, divs, etc.)
- The `data-engrid-` prefix is automatically added
- Multiple `setattr--` classes can be on the same element
- Attribute names should not include `data-engrid-` in the class (it's added automatically)

