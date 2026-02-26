---
title: Input Placeholders
description: Learn how ENgrid adds placeholder text to form fields.
---

ENgrid can automatically add placeholder text to form input fields, providing visual hints about what data is expected in each field.

## Activation

Add the `add-input-placeholders` data attribute to the `<body>` tag to enable this feature.

## Default Placeholders

ENgrid includes a comprehensive set of default placeholders for common EN form fields including:

- First Name, Last Name, Email, Phone Number
- Address fields (Address 1, Address 2, City, Region, Postal Code)
- Donation amount "Other" field
- Credit card expiry fields
- Bank account fields
- Honoree/In-Memory fields
- Shipping and billing fields

Context-aware selectors are used — for example, when a phone number field is mandatory, the placeholder shows "Phone Number" instead of "Phone Number (Optional)".

## Customization

### Theme-Level Override

Override default placeholders in your ENgrid theme options:

```ts
const options: Options = {
  Placeholders: {
    "#en__field_supporter_firstName": "Your First Name",
    "#en__field_supporter_lastName": "Your Last Name",
  },
}
```

### Page-Level Override

Override placeholders for a specific page using `EngridPageOptions`:

```js
window.EngridPageOptions = {
  Placeholders: {
    "#en__field_supporter_firstName": "Prénom",
    "#en__field_supporter_lastName": "Nom de famille",
  },
};
```

Page-level overrides take precedence over theme-level overrides, which take precedence over defaults.
