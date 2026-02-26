---
title: Payment Security (Stripe & VGS)
description: Learn how ENgrid enhances Stripe Financial Connections and customizes VGS secure payment fields
---

## Stripe Financial Connections

The `StripeFinancialConnections` component improves Engaging Networks' implementation of Stripe Financial Connections by fixing UI issues when the Stripe modal is opened and closed.

### Overview

Stripe Financial Connections allows donors to securely link their bank accounts for ACH payments. When users click to connect their bank, a Stripe modal appears. ENgrid enhances this experience by properly managing the submit button state.

### Key Enhancement

**Problem**: When the Stripe modal closes, the form's submit button remains disabled, preventing users from completing their donation.

**Solution**: ENgrid detects when the Stripe modal closes and automatically re-enables the submit button.

### How It Works

The component uses a `MutationObserver` to watch for changes to the DOM:

1. **Modal Opens**: Detects when Stripe adds the modal to the page
2. **Modal Closes**: Detects when Stripe removes the modal from the page
3. **Button Re-enabled**: Calls `ENGrid.enableSubmit()` when modal closes

### Implementation

```typescript
// Automatically initialized by ENgrid
new StripeFinancialConnections();
```

No configuration needed - the component runs automatically when ENgrid initializes.

### Detection Logic

The component identifies Stripe modals by checking for:
- Element with `data-react-aria-top-layer` attribute
- Contains an iframe with `js.stripe.com` in the source

```typescript
// Stripe modal node detection
node.hasAttribute("data-react-aria-top-layer") &&
node.querySelector('iframe[src*="js.stripe.com"]')
```

### Debug Logging

When debug mode is enabled, the component logs modal state changes:

```
🏛️ Stripe Financial Connections modal opened.
🏛️ Stripe Financial Connections modal closed.
```

Enable debug mode:
```javascript
window.EngridOptions = {
  debug: true
};
```

### Best Practices

1. **No Action Required**: The component works automatically
2. **Test Flows**: Always test the complete bank connection flow
3. **Monitor Console**: Check for debug logs if issues occur
4. **Don't Disable**: This component fixes a critical UX issue

---

## VGS (Very Good Security)

The `VGS` component allows you to customize VGS secure payment fields, which handle sensitive credit card data through isolated iframes that never expose card details to your page.

### Overview

VGS (Very Good Security) provides PCI-compliant payment fields by rendering credit card inputs in isolated iframes. ENgrid enhances VGS by:
- Providing better default styling
- Allowing comprehensive customization
- Fixing EN's implementation issues
- Adding smart validation
- Managing card expiration logic

{% callout title="You should know!" %}
VGS fields are rendered in secure iframes that prevent access to sensitive card data, maintaining PCI compliance.
{% /callout %}

### Configuration

Configure VGS options through `EngridOptions`:

```javascript
EngridOptions = {
  VGS: {
    "transaction.ccnumber": {
      showCardIcon: true,
      placeholder: "•••• •••• •••• ••••",
      validations: ["required", "validCardNumber"],
      css: {
        fontSize: "16px",
        color: "#333",
        padding: "12px"
      }
    },
    "transaction.ccvv": {
      showCardIcon: false,
      placeholder: "CVV",
      hideValue: false,
      validations: ["required", "validCardSecurityCode"]
    },
    "transaction.ccexpire": {
      placeholder: "MM/YY",
      validations: ["required", "validCardExpirationDate"]
    }
  }
};
```

### VGS Field Configuration

#### transaction.ccnumber (Card Number)

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `showCardIcon` | `boolean` | Show card brand icon (Visa, MC, etc.) | `true` |
| `placeholder` | `string` | Placeholder text | `"•••• •••• •••• ••••"` |
| `autoComplete` | `string` | HTML autocomplete attribute | `"cc-number"` |
| `validations` | `array` | VGS validation rules | `["required", "validCardNumber"]` |
| `validCardBrands` | `array \| null` | Restrict accepted card types | `null` (all brands) |
| `icons` | `object` | Custom base64 card icons | Default card icon |
| `css` | `object` | Custom CSS styles | ENgrid defaults |

#### transaction.ccvv (CVV)

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `showCardIcon` | `boolean` | Show CVV icon | `false` |
| `placeholder` | `string` | Placeholder text | `"CVV"` |
| `hideValue` | `boolean` | Mask CVV input | `false` |
| `autoComplete` | `string` | HTML autocomplete attribute | `"cc-csc"` |
| `validations` | `array` | VGS validation rules | `["required", "validCardSecurityCode"]` |
| `css` | `object` | Custom CSS styles | ENgrid defaults |

#### transaction.ccexpire (Expiration)

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `placeholder` | `string` | Placeholder text | `"MM/YY"` |
| `autoComplete` | `string` | HTML autocomplete attribute | `"cc-exp"` |
| `validations` | `array` | VGS validation rules | `["required", "validCardExpirationDate"]` |
| `css` | `object` | Custom CSS styles | ENgrid defaults |

### Custom Card Icons

Card icons must be base64-encoded images. Here's an example with custom icons:

```javascript
EngridOptions = {
  VGS: {
    "transaction.ccnumber": {
      icons: {
        cardPlaceholder: "data:image/svg+xml,%3Csvg...",
        visa: "data:image/svg+xml,%3Csvg...",
        mastercard: "data:image/svg+xml,%3Csvg...",
        amex: "data:image/svg+xml,%3Csvg...",
        discover: "data:image/svg+xml,%3Csvg..."
      }
    }
  }
};
```

{% callout title="Information" %}
Icons cannot be URLs - they must be base64-encoded data URIs for security reasons.
{% /callout %}

### Restricting Card Brands

Limit which card brands are accepted:

```javascript
EngridOptions = {
  VGS: {
    "transaction.ccnumber": {
      validCardBrands: [
        { type: "visa" },
        { type: "mastercard" },
        { type: "discover" }
      ]
    }
  }
};
```

This prevents American Express, Diners Club, and other brands.

### Default Styling

ENgrid automatically inherits styles from CSS custom properties:

```css
:root {
  --input_font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --input_font-size: 16px;
  --input_color: #333;
  --input_padding: 12px;
  --input_placeholder-color: #999;
  --input_placeholder-opacity: 1;
  --input_placeholder-font-weight: normal;
}
```

VGS fields inherit these values, ensuring consistency with native form fields.

### Custom CSS Styling

Override styles for individual fields:

```javascript
EngridOptions = {
  VGS: {
    "transaction.ccnumber": {
      css: {
        fontFamily: "'Open Sans', sans-serif",
        fontSize: "18px",
        color: "#000",
        padding: "14px",
        border: "2px solid #ddd",
        borderRadius: "4px",
        "&::placeholder": {
          color: "#aaa",
          opacity: "0.8",
          fontWeight: "300"
        },
        "&:focus": {
          borderColor: "#4CAF50",
          outline: "none"
        }
      }
    }
  }
};
```

### Smart Expiration Handling

ENgrid adds intelligent logic to expiration date fields:

**Month Selection Logic:**
- If user selects a month before current month
- Automatically disables the current year option
- Prevents invalid past expiration dates

**Year Selection Logic:**
- If user selects current year
- Automatically disables months before current month
- Prevents invalid past expiration dates

Example:
```
Current date: June 2024

User selects "May" (month 5):
→ Year 2024 becomes disabled (can't select past)

User selects "2024" (year):
→ Months Jan-May become disabled (can't select past)
```

### Validation Integration

The VGS component integrates with ENgrid's form validation:

```typescript
// Validates VGS fields on form submit
// Checks for empty card number
// Checks for empty CVV
// Displays error messages
// Scrolls to first error
```

Error messages appear using ENgrid's standard error styling.

### Implementation Details

#### Global Variable

ENgrid sets `window.enVGSFields` with your configuration:

```javascript
window.enVGSFields = {
  "transaction.ccnumber": { /* config */ },
  "transaction.ccvv": { /* config */ },
  "transaction.ccexpire": { /* config */ }
};
```

{% callout title="You should know!" %}
ENgrid reinitializes VGS after setting options because EN's JavaScript loads before ENgrid. This is a necessary workaround.
{% /callout %}

#### Mutation Observer

The component uses a `MutationObserver` to:
1. Remove duplicate iframes that EN creates
2. Clear validation errors when fields become valid
3. Ensure proper VGS initialization

### Payment Type Detection

If no payment type is set, VGS automatically sets it to "card":

```typescript
if (ENGrid.getPaymentType() === "") {
  ENGrid.setPaymentType("card");
}
```

### Complete Example

```javascript
EngridOptions = {
  VGS: {
    "transaction.ccnumber": {
      showCardIcon: true,
      placeholder: "Card Number",
      validCardBrands: [
        { type: "visa" },
        { type: "mastercard" },
        { type: "amex" }
      ],
      validations: ["required", "validCardNumber"],
      css: {
        fontSize: "16px",
        fontFamily: "'Helvetica Neue', sans-serif",
        color: "#333",
        padding: "14px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        "&::placeholder": {
          color: "#999"
        },
        "&:focus": {
          borderColor: "#4CAF50"
        }
      }
    },
    "transaction.ccvv": {
      showCardIcon: false,
      placeholder: "Security Code",
      hideValue: true,
      validations: ["required", "validCardSecurityCode"],
      css: {
        fontSize: "16px",
        padding: "14px"
      }
    },
    "transaction.ccexpire": {
      placeholder: "MM / YY",
      validations: ["required", "validCardExpirationDate"],
      css: {
        fontSize: "16px",
        padding: "14px"
      }
    }
  }
};
```

### Debug Logging

Enable debug logging to see VGS activity:

```javascript
window.EngridOptions = {
  debug: true,
  VGS: { /* config */ }
};
```

Debug output includes:
- Options loaded
- Form validation results
- Expiration field logic
- VGS initialization status

Look for the 💳 emoji in the console.

### Troubleshooting

**VGS fields not appearing:**
- Verify `.en__field--vgs` element exists
- Check EN has VGS properly configured
- Look for JavaScript console errors
- Ensure page has payment type field

**Styling not applying:**
- Check CSS syntax in configuration
- Verify custom properties are defined
- Use browser DevTools to inspect iframe
- Remember: fields are in secure iframes

**Validation not working:**
- Ensure validations array includes required rules
- Check payment type is set correctly
- Verify form validation is running
- Look for `.vgs-collect-container__empty` class

**Expiration logic issues:**
- Verify both month and year fields exist
- Check field names match `transaction.ccexpire`
- Ensure current date logic is correct
- Test around month/year boundaries

### Security Considerations

1. **Never Log Card Data**: VGS iframes prevent access to sensitive data
2. **Base64 Icons Only**: URLs are not allowed for security
3. **PCI Compliance**: VGS handles all PCI requirements
4. **iframe Isolation**: Card data never touches your page's JavaScript

### Best Practices

1. **Test Card Brands**: Verify accepted brands work correctly
2. **Mobile First**: Test on mobile devices (especially 16px font size for iOS)
3. **Clear Placeholders**: Use descriptive placeholder text
4. **Consistent Styling**: Match VGS fields to your native inputs
5. **Error Messages**: Ensure error messages are clear and helpful
6. **Expiration UX**: Test expiration field logic thoroughly
7. **Validation Feedback**: Provide immediate validation feedback

### Related Components

- [Digital Wallets](./payment-methods-digital-wallets#digital-wallets) - Alternative to credit card payments
- [Give by Select](./payment-methods-digital-wallets#give-by-select) - Payment method selector
- [Form Validation](./form-validation) - Integrates with ENgrid validation system

### See also

- [PCI Compliance Document](./pci-compliance)