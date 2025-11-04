---
title: Auto-Submit Form
description: Learn how to automatically submit a form when a page loads using ENgrid's Autosubmit feature.
---

The `Autosubmit` component allows you to automatically submit a form when a page loads by adding a URL parameter. This is useful for seamless multi-step flows, pre-populated forms, or automated testing scenarios.

## How It Works

When a page loads with `?autosubmit=Y` in the URL, the component will automatically submit the form after a brief delay, assuming:
- The form hasn't already been submitted (no submission failure)
- All required fields are properly filled
- The Engaging Networks framework has loaded

## Usage

Add the `autosubmit=Y` parameter to your page URL:

```
https://example.org/page/1234/donate/1?autosubmit=Y
```

## Common Use Cases

### Multi-Step Form Flows

Automatically progress through multi-step forms when data is pre-populated:

```
https://example.org/page/1234/donate/1?chain&supporter.firstName=John&supporter.lastName=Doe&autosubmit=Y
```

### Seamless Redirects

After processing on an intermediate page, automatically submit to continue the flow:

```javascript
// On intermediate processing page
window.location.href = `https://example.org/page/1234/donate/2?chain&autosubmit=Y`;
```

### Pre-Populated Forms

When forms are fully pre-populated via URL parameters or other means:

```
https://example.org/page/1234/donate/1?supporter.emailAddress=user@example.com&supporter.firstName=John&transaction.donationAmt=50&autosubmit=Y
```

## Technical Details

### Email Address Handling

The component automatically fixes a known Engaging Networks issue where email addresses containing `+` characters don't work properly with the `?chain` parameter. It replaces spaces with `+` in email addresses before submission.

### Safety Checks

The component only auto-submits if:
- No submission failure has occurred (`checkSubmissionFailed()` returns false)
- The Engaging Networks JavaScript framework is loaded
- The `autosubmit` parameter is exactly `"Y"`

### When It Runs

- Runs automatically on page load
- Only executes once per page load
- Does not run if there was a previous submission failure

## Example: Complete Flow

```javascript
// Step 1: User fills personal details
// Step 2: Auto-submit to donation amount page
window.location.href = `https://example.org/page/1234/donate/2?chain&autosubmit=Y`;

// The form will automatically submit and proceed to the next step
```

## Best Practices

- **Use with `?chain`**: Always include `?chain` when using `autosubmit=Y` to preserve form data
- **Pre-populate Required Fields**: Ensure all required fields are filled before using auto-submit
- **Test Thoroughly**: Test auto-submit flows to ensure they work as expected
- **Handle Errors**: Be prepared for cases where auto-submit might fail due to validation errors

## Limitations

- Will not submit if there are validation errors
- Will not submit if the Engaging Networks framework hasn't loaded
- Will not submit if there was a previous submission failure
- Requires all mandatory fields to be properly filled

## Debugging

If auto-submit isn't working:

1. Check the browser console for errors
2. Verify that `?autosubmit=Y` is in the URL (case-sensitive)
3. Ensure all required fields are filled
4. Check that the Engaging Networks framework has loaded
5. Verify there were no previous submission failures

