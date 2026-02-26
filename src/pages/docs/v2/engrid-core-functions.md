---
title: ENGrid Core Functions
description: The abstract ENGrid class provides core utility methods and helpers for interacting with Engaging Networks forms, fields, and page data
---

## Overview

The `ENGrid` abstract class is the foundation of the ENgrid framework, providing a comprehensive set of static utility methods for working with Engaging Networks forms and data. This class centralizes DOM helpers, Engaging Networks integrations, and shared utilities that are used throughout the ENgrid ecosystem.

{% callout title="You should know!" %}
The ENGrid class is abstract and cannot be instantiated directly. All methods are static and can be called via `ENGrid.methodName()`.
{% /callout %}

## Form and Field Methods

### Getting Form Elements

| Method | Description | Returns |
| ------ | ----------- | ------- |
| `ENGrid.enForm` | Returns the Engaging Networks form element | `HTMLFormElement` |
| `ENGrid.getField(name)` | Gets a form field by its name attribute | `Element \| null` |
| `ENGrid.getFieldValue(name)` | Gets the value(s) of a form field. Multiple values are comma-separated | `string` |

**Example:**
```typescript
// Get the form
const form = ENGrid.enForm;

// Get a specific field
const emailField = ENGrid.getField("supporter.emailAddress");

// Get field value
const email = ENGrid.getFieldValue("supporter.emailAddress");
```

### Setting Field Values

The `setFieldValue` method intelligently sets values on any field type, automatically handling selects, radios, and checkboxes.

```typescript
ENGrid.setFieldValue(
  name: string,
  value: unknown,
  parseENDependencies: boolean = true,
  dispatchEvents: boolean = false
)
```

| Parameter | Description | Default |
| --------- | ----------- | ------- |
| `name` | Field name attribute | Required |
| `value` | Value to set | Required |
| `parseENDependencies` | Whether to trigger EN dependency parsing | `true` |
| `dispatchEvents` | Whether to dispatch change/blur events | `false` |

**Example:**
```typescript
// Set a text field
ENGrid.setFieldValue("supporter.firstName", "John");

// Set a select dropdown
ENGrid.setFieldValue("transaction.paycurrency", "USD");

// Set a radio button
ENGrid.setFieldValue("transaction.recurrpay", "Y", true, true);
```

### Creating Hidden Fields

```typescript
ENGrid.createHiddenInput(name: string, value: string = "")
```

Creates a properly structured hidden input field within the Engaging Networks form markup, automatically positioning it before the submit button.

**Example:**
```typescript
ENGrid.createHiddenInput("utm_source", "email_campaign");
```

## Page Information Methods

### Page State

| Method | Description | Returns |
| ------ | ----------- | ------- |
| `ENGrid.getPageID()` | Returns the current page ID | `number` |
| `ENGrid.getClientID()` | Returns the EN client ID | `number` |
| `ENGrid.getDataCenter()` | Returns 'us' or 'ca' based on client ID | `string` |
| `ENGrid.getPageNumber()` | Returns the current page number | `number \| null` |
| `ENGrid.getPageCount()` | Returns total number of pages | `number \| null` |
| `ENGrid.isThankYouPage()` | Checks if current page is the thank you page | `boolean` |
| `ENGrid.getGiftProcess()` | Returns gift process status | `boolean \| null` |

### Page Type Detection

`ENGrid.getPageType()` returns a normalized page type string:

| Return Value | EN Page Types |
| ------------ | ------------- |
| `DONATION` | donation, premiumgift, p2pdonation, p2pcheckout |
| `ECARD` | e-card |
| `SURVEY` | otherdatacapture, survey |
| `EMAILTOTARGET` | emailtotarget |
| `ADVOCACY` | advocacypetition |
| `SUBSCRIBEFORM` | emailsubscribeform |
| `EVENT` | event |
| `SUPPORTERHUB` | supporterhub |
| `UNSUBSCRIBE` | unsubscribe |
| `TWEETPAGE` | tweetpage |
| `UNKNOWN` | Unknown or unavailable |

**Example:**
```typescript
if (ENGrid.getPageType() === "DONATION") {
  // Donation-specific logic
}

if (ENGrid.isThankYouPage()) {
  // Thank you page logic
}
```

## URL Parameter Methods

### getUrlParameter

```typescript
ENGrid.getUrlParameter(name: string)
```

Retrieves URL parameters from the current page, with support for array parameters.

**Features:**
- Returns parameter value as string
- Returns `true` for parameters without values (`?debug`)
- Returns array of objects for array parameters (`?tags[]=value1&tags[]=value2`)
- Returns `null` if parameter doesn't exist

**Example:**
```typescript
// Standard parameter: ?source=email
const source = ENGrid.getUrlParameter("source"); // "email"

// Flag parameter: ?debug
const debug = ENGrid.getUrlParameter("debug"); // true

// Array parameter: ?tags[]=tag1&tags[]=tag2
const tags = ENGrid.getUrlParameter("tags[]"); // [{tags: "tag1"}, {tags: "tag2"}]
```

## Body Data Attributes

ENgrid uses `data-engrid-*` attributes on the body element to store state and configuration.

| Method | Description |
| ------ | ----------- |
| `ENGrid.setBodyData(name, value)` | Sets a data attribute on body. Pass `false` to remove |
| `ENGrid.getBodyData(name)` | Gets a data attribute value from body |
| `ENGrid.hasBodyData(name)` | Checks if body has a data attribute |

**Example:**
```typescript
// Set attribute: <body data-engrid-page-type="DONATION">
ENGrid.setBodyData("page-type", "DONATION");

// Get attribute
const pageType = ENGrid.getBodyData("page-type");

// Check existence
if (ENGrid.hasBodyData("debug")) {
  console.log("Debug mode active");
}

// Remove attribute
ENGrid.setBodyData("some-flag", false);
```

## Options and Configuration

### getOption

```typescript
ENGrid.getOption<K extends keyof Options>(key: K): Options[K] | null
```

Retrieves values from `window.EngridOptions` configuration object.

**Example:**
```typescript
const debug = ENGrid.debug; // Shorthand for getOption("Debug")
const currencySymbol = ENGrid.getOption("CurrencySymbol");
```

### Mode Flags

| Property | Description |
| -------- | ----------- |
| `ENGrid.debug` | Returns `true` if Debug option is enabled |
| `ENGrid.demo` | Returns `true` if URL contains `?mode=DEMO` |

## Currency Methods

| Method | Description | Returns |
| ------ | ----------- | ------- |
| `ENGrid.getCurrencySymbol()` | Returns currency symbol for selected currency | `string` (default: "$") |
| `ENGrid.getCurrencyCode()` | Returns 3-letter currency code | `string` (default: "USD") |

The currency symbol can be customized via `data-currency-symbol` attribute on currency options or through `CurrencySymbol` option.

**Example:**
```typescript
const symbol = ENGrid.getCurrencySymbol(); // "$" or "€" etc.
const code = ENGrid.getCurrencyCode(); // "USD", "EUR", etc.
```

## Payment Type Methods

| Method | Description |
| ------ | ----------- |
| `ENGrid.getPaymentType()` | Returns the current payment type value |
| `ENGrid.setPaymentType(type)` | Sets the payment type and dispatches change event |

**Example:**
```typescript
// Get current payment type
const paymentType = ENGrid.getPaymentType();

// Set payment type
ENGrid.setPaymentType("card"); // or "paypal", "check", etc.
```

## Number and Amount Formatting

### formatNumber

```typescript
ENGrid.formatNumber(
  number: string | number,
  decimals: number = 2,
  dec_point: string = ".",
  thousands_sep: string = ","
)
```

Formats a number with specified decimal places and separators.

**Example:**
```typescript
ENGrid.formatNumber(1234.56); // "1,234.56"
ENGrid.formatNumber(1234.56, 0); // "1,235"
ENGrid.formatNumber(1234.56, 2, ",", "."); // "1.234,56"
```

### cleanAmount

```typescript
ENGrid.cleanAmount(amount: string): number
```

Parses and cleans amount strings into numeric values, handling various formats and validating proper number structure.

**Example:**
```typescript
ENGrid.cleanAmount("$1,234.56"); // 1234.56
ENGrid.cleanAmount("1.234,56"); // 1234.56
ENGrid.cleanAmount("1,234"); // 1234
```

## Date Formatting

```typescript
ENGrid.formatDate(date: Date, format: string = "MM/DD/YYYY")
```

Formats a Date object into a string with the specified format.

**Supported tokens:**
- `YYYY` - 4-digit year
- `YY` - 2-digit year
- `MM` - 2-digit month
- `DD` - 2-digit day

**Example:**
```typescript
const date = new Date("2024-03-15");
ENGrid.formatDate(date); // "03/15/2024"
ENGrid.formatDate(date, "YYYY-MM-DD"); // "2024-03-15"
ENGrid.formatDate(date, "DD/MM/YY"); // "15/03/24"
```

## Submit Button Control

| Method | Description |
| ------ | ----------- |
| `ENGrid.disableSubmit(label)` | Disables submit button and shows loader with optional label |
| `ENGrid.enableSubmit()` | Re-enables submit button and restores original text |

Both methods return `false` if the submit button is not found.

**Example:**
```typescript
// Disable with custom message
ENGrid.disableSubmit("Processing payment...");

// Later, re-enable
ENGrid.enableSubmit();
```

## Error Handling

### Field Validation Errors

```typescript
ENGrid.setError(element: string | HTMLElement, errorMessage: string)
ENGrid.removeError(element: string | HTMLElement)
```

Adds or removes EN-styled validation errors on form fields.

**Example:**
```typescript
const emailField = document.querySelector(".en__field--emailAddress");
ENGrid.setError(emailField, "Please enter a valid email address");

// Later, clear the error
ENGrid.removeError(emailField);
```

### Watch for Errors

```typescript
ENGrid.watchForError(callback: Function)
```

Runs a callback function whenever an error is displayed on the page. The callback is automatically deduplicated based on function name.

**Example:**
```typescript
ENGrid.watchForError(() => {
  console.log("Form validation error occurred");
  // Custom error handling logic
});
```

## DOM Utilities

### HTML Manipulation

```typescript
ENGrid.addHtml(
  html: string | HTMLElement,
  target: string = "body",
  position: string = "before"
)
```

Inserts HTML before or after a target element.

**Example:**
```typescript
ENGrid.addHtml("<div class='custom-banner'>Welcome!</div>", ".en__component", "before");
ENGrid.addHtml("<p>Footer text</p>", ".en__submit", "after");
```

### Remove HTML

```typescript
ENGrid.removeHtml(target: string)
```

Removes an element from the DOM.

### Element Visibility

```typescript
ENGrid.isVisible(element: HTMLElement): boolean
ENGrid.isInViewport(element: HTMLElement): boolean
```

Checks if an element is visible or currently in the viewport.

**Example:**
```typescript
const submitButton = document.querySelector(".en__submit");
if (!ENGrid.isInViewport(submitButton)) {
  submitButton.scrollIntoView();
}
```

## Script Loading

```typescript
ENGrid.loadJS(
  url: string,
  onload: (() => void) | null = null,
  head: boolean = true
)
```

Dynamically loads an external JavaScript file.

**Example:**
```typescript
ENGrid.loadJS("https://example.com/script.js", () => {
  console.log("Script loaded");
}, true);
```

## Utility Methods

### checkNested

```typescript
ENGrid.checkNested(obj: any, ...args: string[])
```

Safely checks if nested properties exist on an object.

**Example:**
```typescript
// Check if window.EngagingNetworks.require._defined.enjs exists
if (ENGrid.checkNested(window, "EngagingNetworks", "require", "_defined", "enjs")) {
  // Safe to access window.EngagingNetworks.require._defined.enjs
}
```

### deepMerge

```typescript
ENGrid.deepMerge(target: any, source: any)
```

Deep merges two objects, recursively merging nested objects.

### slugify

```typescript
ENGrid.slugify(text: string)
```

Converts text to URL-friendly slug format.

**Example:**
```typescript
ENGrid.slugify("Hello World!"); // "hello-world"
ENGrid.slugify("Special $% Characters"); // "special-characters"
```

## Engaging Networks Integration

### Parse Dependencies

```typescript
ENGrid.enParseDependencies()
```

Triggers Engaging Networks dependency parsing system, which handles field show/hide logic configured in EN. This is automatically called by `setFieldValue` unless disabled.

{% callout title="You should know!" %}
This method filters out dependencies targeting the donation amount field to prevent conflicts with ENgrid's amount handling.
{% /callout %}

**Example:**
```typescript
// Manually trigger dependency parsing
ENGrid.enParseDependencies();

// Disable automatic parsing when setting field
ENGrid.setFieldValue("country", "US", false);
```
