---
title: Email Validation
description: Learn about ENgrid's email validation integrations with NeverBounce and FreshAddress.
---

ENgrid supports two third-party email validation services that verify supporter email addresses in real-time before form submission: **NeverBounce** and **FreshAddress**.

## NeverBounce

NeverBounce validates email addresses in real-time as the supporter types, preventing invalid emails from being submitted.

### Configuration

NeverBounce is configured in your ENgrid theme options:

```ts
const options: Options = {
  NeverBounce: {
    apiKey: "your-api-key",
    dateField: "supporter.NOT_TAGGED_12", // Optional: field to store validation date
    statusField: "supporter.NOT_TAGGED_13", // Optional: field to store validation status
    dateFormat: "MM/DD/YYYY", // Optional: date format
  },
}
```

### Options

| Property | Description |
|----------|-------------|
| `apiKey` | Your NeverBounce API key |
| `dateField` | Optional EN field name to record the validation date |
| `statusField` | Optional EN field name to record the validation result (e.g., "valid", "invalid") |
| `dateFormat` | Optional date format string |

### Behavior

- Validates the email field (`#en__field_supporter_emailAddress`) after the user stops typing (1.5 second delay)
- Adds CSS classes to the email field wrapper for styling: `NB-result`, `NB-valid`, `NB-invalid`, etc.
- On form submission, blocks submission if the email is invalid and shows an error message
- Has a configurable timeout (default 10 seconds) via `NeverBounceTimeout` option
- Supports bypass emails — certain email patterns can skip validation

### Timeout

You can configure the NeverBounce timeout in your options:

```ts
const options: Options = {
  NeverBounceTimeout: 10000, // milliseconds, default is 10000
}
```

---

## FreshAddress

FreshAddress is an alternative email validation service that provides real-time email verification and correction suggestions.

### Configuration

FreshAddress is configured in your ENgrid theme options:

```ts
const options: Options = {
  FreshAddress: {
    apiKey: "your-api-key",
    dateField: "supporter.NOT_TAGGED_12", // Optional
    statusField: "supporter.NOT_TAGGED_13", // Optional
    dateFormat: "MM/DD/YYYY", // Optional
  },
}
```

### Behavior

- Validates the email field when the user leaves the field (on blur)
- Can suggest corrected email addresses (e.g., fixing typos in domain names)
- Adds validation status CSS classes for styling
- Blocks form submission if the email is flagged as invalid
