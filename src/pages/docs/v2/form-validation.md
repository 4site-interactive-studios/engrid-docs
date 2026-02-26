---
title: Form Validation Components
description: Email validation services (NeverBounce, FreshAddress), custom validators, and postal code validation for data quality
---

## Overview

ENgrid provides several validation components to ensure data quality and reduce bounce rates. These validators run client-side and integrate with the form submission process.

---

## EN Custom Validators

The `ENValidators` class enables client-side validation using Engaging Networks' custom validator configurations.

### Enabling

```javascript
EngridOptions = {
  ENValidators: true
};
```

{% callout title="You should know!" %}
This feature is behind a flag and must be explicitly enabled in your options.
{% /callout %}

### How It Works

1. Reads custom validators configured in Engaging Networks backend
2. Attaches validation logic to fields with `CUST` (custom) validator types
3. Validates fields on input (live validation) and before form submission
4. Prevents submission if validation fails

### What Gets Validated

The component automatically discovers fields with custom validators from:
```javascript
window.EngagingNetworks.require._defined.enValidation.validation.validators
```

For each custom validator, it extracts:
- **Field**: Which form field to validate
- **Regex**: Regular expression pattern for validation
- **Message**: Error message to display

### Validation Behavior

#### Live Validation
As users type, the field is validated against its regex pattern:
- **Valid**: Error message is removed
- **Invalid**: Error message is displayed
- **Empty**: No validation (empty field validation is handled separately)

#### Submit Validation
Before form submission:
- All fields with custom validators are checked
- First invalid field receives focus
- Form submission is blocked if any field is invalid

### Example

**EN Backend Configuration:**
- Field: `supporter.phoneNumber`
- Type: `CUST` (Custom)
- Regex: `^\d{3}-\d{3}-\d{4}$`
- Message: "Phone must be in format ###-###-####"

**Result:**
Field validates in real-time and prevents submission if pattern doesn't match.

### Debug Output

```
🧐 [ENgrid ENValidators] Live Validate supporter.phoneNumber with ^\d{3}-\d{3}-\d{4}$
```

---

## US Postal Code Validator

The `PostalCodeValidator` class validates and formats US ZIP codes in the format `#####` or `#####-####`.

### Enabling

```javascript
EngridOptions = {
  PostalCodeValidator: true
};
```

### Features

#### 1. US ZIP Code Validation

Validates postal codes when:
- Country is "US", "USA", or "United States" (case-insensitive)
- Country field is empty (defaults to US)
- No country field exists on form

#### 2. Live Formatting

Automatically formats as user types:

| User Types | Field Shows |
| ---------- | ----------- |
| `12345` | `12345` |
| `12345-` | `12345-` |
| `123456` | `12345-6` |
| `12345-6789` | `12345-6789` |

Accepts multiple separator inputs (`-`, `+`, ` `) but standardizes to configured separator.

#### 3. Flexible Separators

The separator character can be configured via TidyContact options:

```javascript
EngridOptions = {
  PostalCodeValidator: true,
  TidyContact: {
    us_zip_divider: "-" // or "+" or " "
  }
};
```

Supported separators:
- `-` (dash) - default
- `+` (plus)
- ` ` (space)

#### 4. Optional ZIP Codes

If the postal code field is not marked as `.en__mandatory`, empty values are considered valid.

### Validation Rules

**Valid Formats:**
- `12345` (5 digits)
- `12345-6789` (5+4 digits with separator)

**Invalid:**
- Letters or special characters
- Incorrect digit counts
- Wrong separator placement

### Error Messages

```
Please enter a valid ZIP Code of ##### or #####-####
```

The error displays the actual configured separator in the message.

### International Forms

The validator only runs for US addresses. For other countries, native EN validation applies.

---

## NeverBounce Email Validation

The `NeverBounce` class integrates NeverBounce's email validation service to reduce bounce rates and improve deliverability.

{% callout title="You should know!" %}
NeverBounce is a 3rd-party API! You will need an API key from NeverBounce to use this feature.
{% /callout %}

### Configuration

```javascript
EngridOptions = {
  NeverBounce: {
    apiKey: "your-api-key-here",
    dateField: "nb_date",           // Optional, stores validation date
    statusField: "nb_status",        // Optional, stores validation status
    dateFormat: "MM/DD/YYYY"        // Optional, date format
  },
  NeverBounceTimeout: 10000 // Optional, validation timeout in ms (default: 10000)
};
```

### Features

#### 1. Real-Time Email Validation

As users enter their email, NeverBounce checks:
- Syntax validity
- Domain existence
- Mailbox existence
- Disposable email detection
- Role-based account detection

#### 2. Visual Feedback

The widget provides inline feedback:
- "Validating..." (while checking)
- "Email validated!" (valid email)
- "Invalid email" (failed validation)

#### 3. Validation States

NeverBounce returns one of these statuses:
- **valid**: Email is deliverable
- **invalid**: Email is not deliverable
- **disposable**: Temporary email service
- **catchall**: Domain accepts all emails
- **unknown**: Could not be verified

#### 4. Bypass Options

Bypass validation for testing:

```
?bypassemailvalidation
```

Or use the EN test email domain "noaddress.ea"

### Hidden Fields

The component can store validation results in hidden fields for tracking:

```javascript
dateField: "nb_date"      // Stores validation timestamp
statusField: "nb_status"   // Stores validation status
```

These fields are automatically created if they don't exist.

### Timeout Handling

If NeverBounce doesn't respond within the timeout period (default 10 seconds):
- Validation is bypassed
- Form submission is allowed
- Debug logs the timeout

The NeverBounce widget timeout is set to 1 second less than the configured timeout to ensure proper handling.

### Smart Loading

The component intelligently loads the NeverBounce widget:
- **Pre-filled Email**: Doesn't validate (assumes returning donor)
- **Empty Field**: Loads widget on first change event
- **Invalid Field**: Doesn't call the API if the email is invalid (Missing a @/.)
- **Programmatic Fill**: Detects and skips validation

This reduces unnecessary API calls and improves performance.

### Example Usage

```javascript
// Page Options
EngridOptions = {
  NeverBounce: {
    apiKey: "private_abc123xyz789",
    dateField: "supporter.nb_validation_date",
    statusField: "supporter.nb_validation_status",
    dateFormat: "YYYY-MM-DD"
  }
};
```

### Debug Output

```
📧 [ENgrid NeverBounce] E-mail Field Found
📧 [ENgrid NeverBounce] Init Function
📧 [ENgrid NeverBounce] Validation Complete: valid
```

---

## FreshAddress Email Validation

The `FreshAddress` class integrates FreshAddress's email intelligence and validation service.

{% callout title="You should know!" %}
FreshAddress requires jQuery and their client-side library to be loaded on the page. See prerequisites below.
{% /callout %}

### Prerequisites

Add these scripts to your page template before ENgrid:

```html
<!-- jQuery (required by FreshAddress) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>

<!-- FreshAddress Library -->
<script src="//api.freshaddress.biz/js/lib/freshaddress-client-7.0.min.js?token=YOUR_TOKEN"></script>
```

### Configuration

```javascript
EngridOptions = {
  FreshAddress: {
    dateField: "fa_date",           // Optional, stores validation date
    statusField: "fa_status",        // Optional, stores validation status
    messageField: "fa_message",      // Optional, stores validation message
    dateFieldFormat: "yyyy-MM-dd",  // Optional, date format
    proxyUrl: "https://proxy.example.com"  // Optional, proxy for API calls
  }
};
```

The date, status, and message fields should be set to untagged supporter fields in order to be saved with supporter records. For example `supporter.NOT_TAGGED_1`

### Features

#### 1. Email Intelligence

FreshAddress provides:
- Real-time email validation
- Typo correction suggestions
- Domain validation
- Mailbox verification

#### 2. Hidden Field Management

The component automatically creates and manages three hidden fields:

| Field | Default Name | Purpose |
| ----- | ------------ | ------- |
| Date | `fa_date` | Validation timestamp |
| Status | `fa_status` | Validation result status |
| Message | `fa_message` | Validation message |

#### 3. Smart Loading

Similar to NeverBounce:
- Skips validation for pre-filled emails
- Detects programmatically filled fields
- Reduces unnecessary API calls

### Validation Status

FreshAddress sets the status field to one of:
- **Valid**: Email is deliverable
- **Invalid**: Email has issues
- **Unknown**: Could not validate

### Date Format

Customize the date format using standard tokens:

```javascript
dateFieldFormat: "yyyy-MM-dd"  // 2024-12-31
dateFieldFormat: "MM/DD/YYYY"  // 12/31/2024
dateFieldFormat: "DD-MM-YY"    // 31-12-24
```

### Global Status Variable

FreshAddress sets a global status variable:

```javascript
window.FreshAddressStatus = "idle" | "validating" | "complete"
```

This can be used by other scripts to check validation state.

### Proxy Configuration

For environments requiring a proxy:

```javascript
FreshAddress: {
  proxyUrl: "https://your-proxy-server.com/freshaddress"
}
```

### Debug Output

```
📧 [ENgrid FreshAddress] E-mail Field Found
📧 [ENgrid FreshAddress] Date Field Not Found. Creating...
📧 [ENgrid FreshAddress] Validation Complete: Valid
```

---

## Comparison: NeverBounce vs FreshAddress

| Feature | NeverBounce | FreshAddress |
| ------- | ----------- | ------------ |
| **Real-time Validation** | ✅ Yes | ✅ Yes |
| **Typo Correction** | ❌ No | ✅ Yes |
| **jQuery Required** | ❌ No | ⚠️ Yes |
| **Widget UI** | ✅ Built-in | ⚠️ Custom |
| **Timeout Control** | ✅ Yes | ⚠️ Limited |
| **Bypass Testing** | ✅ URL param | ❌ Manual |
| **Smart Loading** | ✅ Yes | ✅ Yes |
| **Hidden Fields** | ✅ Auto-created | ✅ Auto-created |

### When to Use Each

**NeverBounce:**
- Modern stack (no jQuery)
- Need timeout control
- Existing NeverBounce contract

**FreshAddress:**
- Already using jQuery
- Need typo suggestions
- Existing FreshAddress contract

---

## Best Practices

### 1. Enable Only One Email Validator

Don't enable both NeverBounce and FreshAddress simultaneously. Choose one based on your needs.

### 2. Set Appropriate Timeouts

```javascript
NeverBounceTimeout: 10000 // 10 seconds is usually sufficient
```

Too short: Legitimate validations may fail  
Too long: Users wait too long

### 3. Track Validation Results

Use the optional hidden fields to track validation in Engaging Networks. You'll need to create untagged fields.

```javascript
dateField: "supporter.NOT_TAGGED_3"
statusField: "supporter.NOT_TAGGED_4"
```

### 4. Test Thoroughly

Test with:
- Valid emails
- Invalid emails
- Typos
- Disposable emails
- Role accounts (info@, admin@)

### 5. Provide Bypass for Staff

Allow staff to bypass validation for testing:

```
?bypassemailvalidation
```

Or add specific emails to bypass list in theme code.

### 6. Monitor Validation Rates

Track validation field data to monitor:
- Validation success rates
- Most common invalid patterns
- User experience impact
