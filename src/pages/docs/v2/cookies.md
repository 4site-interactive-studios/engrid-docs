---
title: Cookies
description: All the different ways ENgrid stores cookies and manages browser cookies
---

## Standard ENGrid Cookies

- **engrid-autofill** - Used by ENgrid's [RememberMe](./remember-me) component ( when enabled ). Stores autofill data on the configured remote URL.
- **engrid-state-supporter.region** - Contains the supporters states/region for repopulating after server-side errors.
- **engrid-sticky-nsg** - Used by the [Sticky Next Suggested Gift](./sticky-nsg) feature to store the next suggested gift values across multiple visits to donation pages.
- **engrid-sticky-prepop** - Used by the [Sticky Pre-population](./sticky-prepopulation) feature to store pre-population values across multiple visits to pages.


## Cookie Utilities

The `Cookie` module provides a simple API for managing browser cookies with TypeScript support.

### Importing

```typescript
import * as cookie from "@4site/engrid-scripts";
```

### Basic Operations

#### Set a Cookie

```typescript
cookie.set('name', 'value');
```

#### Get a Cookie

```typescript
const value = cookie.get('name'); // Returns: 'value' or undefined
```

#### Remove a Cookie

```typescript
cookie.remove('name');
```

#### Get All Cookies

```typescript
const allCookies = cookie.getAll(); // Returns: { name: 'value', ... }
```

### Cookie Options

You can configure cookie behavior with `CookieAttributes`:

```typescript
export interface CookieAttributes {
  expires?: Date | number;    // Date object or number of days
  domain?: string;            // Domain for cookie
  path?: string;              // Path for cookie (default: "/")
  secure?: boolean;           // HTTPS only
  sameSite?: "strict" | "lax" | "none";  // CSRF protection
}
```

### Examples with Options

#### Expires After 7 Days

```typescript
cookie.set('name', 'value', { expires: 7 });
```

#### Set Path

```typescript
cookie.set('name', 'value', { expires: 7, path: '/donations' });
```

#### Secure Cookie (HTTPS Only)

```typescript
cookie.set('sessionId', 'abc123', {
  expires: 1,
  secure: true,
  sameSite: 'strict'
});
```

#### Set Expiration Date

```typescript
const expirationDate = new Date('2025-12-31');
cookie.set('promo', 'holiday2025', { expires: expirationDate });
```

#### Remove with Specific Path

```typescript
cookie.remove('name', { path: '/donations' });
```

### Real-World Examples

#### Remember User Preference

```typescript
// Save user's currency preference for 30 days
cookie.set('preferredCurrency', 'EUR', { expires: 30 });

// Later, retrieve it
const currency = cookie.get('preferredCurrency') || 'USD';
```

#### Session Management

```typescript
// Set session cookie (expires when browser closes)
cookie.set('sessionId', generateSessionId());

// Check if session exists
if (cookie.get('sessionId')) {
  // User has active session
}
```

#### Form Pre-fill from Cookie

```typescript
// Save supporter email for 90 days
cookie.set('supporter_email', 'donor@example.com', { expires: 90 });

// Pre-fill form on next visit
const savedEmail = cookie.get('supporter_email');
if (savedEmail) {
  ENGrid.setFieldValue('supporter.emailAddress', savedEmail);
}
```

#### GDPR-Compliant Consent Tracking

```typescript
// Set consent cookie with strict security
cookie.set('consent', 'analytics:true,marketing:false', {
  expires: 365,
  secure: true,
  sameSite: 'lax'
});

// Check consent
const consent = cookie.get('consent');
if (consent && consent.includes('analytics:true')) {
  // Initialize analytics
}
```

### Special Features

#### URL Encoding

The module automatically handles URL encoding/decoding for cookie names and values, with special character support:

```typescript
cookie.set('user-data', 'name@example.com'); // Automatically encoded
const data = cookie.get('user-data'); // Automatically decoded
```

#### Numeric Expiration

When you provide a number for `expires`, it's interpreted as days from now:

```typescript
cookie.set('temp', 'value', { expires: 0.5 }); // Expires in 12 hours
cookie.set('long', 'value', { expires: 365 }); // Expires in 1 year
```

### Best Practices

{% callout title="Tip" %}
Always set a path when creating cookies to ensure they can be properly removed later.
{% /callout %}

1. **Use descriptive names**: `supporter_email` not `se`
2. **Set appropriate expiration**: Don't keep data longer than needed
3. **Use secure flag**: For sensitive data on HTTPS sites
4. **Implement sameSite**: Protect against CSRF attacks
5. **Handle missing cookies**: Always provide fallback values

```typescript
// Good practice
const savedAmount = cookie.get('last_donation_amount') || '25';
ENGrid.setFieldValue('transaction.donationAmt', savedAmount);
```

### Browser Compatibility

The cookie utilities work in all modern browsers and gracefully handle:
- Invalid cookie names/values (silently ignored)
- Special characters (automatically encoded)
- Different date formats
- Missing cookies (returns `undefined`)

### Integration with ENgrid

Common ENgrid patterns using cookies:

```typescript
// Save form state
const saveFormState = () => {
  const amount = ENGrid.getFieldValue('transaction.donationAmt');
  const frequency = ENGrid.getFieldValue('transaction.recurrpay');
  
  cookie.set('form_amount', amount, { expires: 30 });
  cookie.set('form_frequency', frequency, { expires: 30 });
};

// Restore form state
const restoreFormState = () => {
  const amount = cookie.get('form_amount');
  const frequency = cookie.get('form_frequency');
  
  if (amount) ENGrid.setFieldValue('transaction.donationAmt', amount);
  if (frequency) ENGrid.setFieldValue('transaction.recurrpay', frequency);
};
```

## See also

- [Session Storage](./session-storage)