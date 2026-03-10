---
title: Payment Methods and Digital Wallets
description: Digital wallet integration including Apple Pay, Google Pay, PayPal, Venmo, DAF, and payment method selection
---

## Overview

ENgrid provides comprehensive support for digital wallets and alternative payment methods beyond traditional credit cards. These components handle detection, setup, and integration with Stripe, PayPal, and Donor Advised Fund (DAF) services.

---

## Digital Wallets

The `DigitalWallets` class manages multiple digital wallet providers and integrates them into the payment flow.

### Supported Payment Methods

| Method | Provider | Description |
| ------ | -------- | ----------- |
| **Apple Pay** | Stripe | Apple's contactless payment method |
| **Google Pay** | Stripe | Google's digital wallet |
| **PayPal One Touch** | PayPal | Quick PayPal checkout |
| **Venmo** | PayPal | Mobile payment service |
| **Donor Advised Fund (DAF)** | Chariot | DAF contribution processing |

### How It Works

The component:
1. Checks for `#en__digitalWallet` element presence
2. Detects which wallet providers have loaded
3. Adds wallet options to the payment type field
4. Sets body data attributes for CSS styling
5. Uses MutationObserver to detect delayed wallet loading

### Body Data Attributes

For each payment method, a data attribute is set:

| Attribute | Value | Meaning |
| --------- | ----- | ------- |
| `data-engrid-payment-type-option-stripedigitalwallet` | `true`/`false` | Stripe wallets available |
| `data-engrid-payment-type-option-apple-pay` | `true`/`false` | Apple Pay available |
| `data-engrid-payment-type-option-google-pay` | `true`/`false` | Google Pay available |
| `data-engrid-payment-type-option-paypal-one-touch` | `true`/`false` | PayPal available |
| `data-engrid-payment-type-option-venmo` | `true`/`false` | Venmo available |
| `data-engrid-payment-type-option-daf` | `true`/`false` | DAF available |

### CSS Styling

```css
/* Show/hide payment method UI based on availability */
body[data-engrid-payment-type-option-apple-pay="true"] .apple-pay-promo {
  display: block;
}

body[data-engrid-payment-type-option-apple-pay="false"] .apple-pay-button {
  display: none;
}

/* Style active digital wallet containers */
.showif-stripedigitalwallet-selected {
  display: none;
}

body[data-engrid-payment-type="stripedigitalwallet"] .showif-stripedigitalwallet-selected {
  display: block;
}
```

### Wallet Containers

Digital wallet buttons are organized in containers:

```html
<div id="en__digitalWallet__stripeButtons__container">
  <!-- Apple Pay and Google Pay buttons -->
</div>

<div id="en__digitalWallet__paypalTouch__container">
  <!-- PayPal and Venmo buttons -->
</div>

<div id="en__digitalWallet__chariot__container">
  <!-- DAF button -->
</div>
```

### GiveBySelect Integration

Wallet containers automatically receive `giveBySelect-*` classes for integration with the GiveBySelect component:

- `.giveBySelect-stripedigitalwallet`
- `.giveBySelect-paypaltouch`
- `.giveBySelect-daf`

### Delayed Loading

If wallets haven't loaded when ENgrid initializes, MutationObserver watches for their appearance:

```javascript
// Watches container for child nodes being added
observer.observe(node, { childList: true, subtree: true });
```

Once detected, the appropriate setup method runs and the observer disconnects.

### Fallback Behavior

If digital wallets are not enabled or don't load:
- All payment type options are set to `false`
- If default payment type is `stripedigitalwallet`, it's switched to `card`

---

## Apple Pay

The `ApplePay` class handles Apple Pay-specific functionality including merchant validation and payment token processing.

{% callout title="You should know!" %}
Apple Pay requires additional merchant configuration variables to be set globally before ENgrid loads.
{% /callout %}

### Required Global Variables

These must be defined before ENgrid initialization:

```javascript
window.merchantIdentifier = "merchant.your.identifier";
window.merchantDomainName = "donate.yourorg.com";
window.merchantDisplayName = "Your Organization";
window.merchantSessionIdentifier = "session_id";
window.merchantNonce = "nonce_value";
window.merchantEpochTimestamp = timestamp;
window.merchantSignature = "signature";
window.merchantCountryCode = "US";
window.merchantCurrencyCode = "USD";
window.merchantSupportedNetworks = ["visa", "masterCard", "amex"];
window.merchantCapabilities = ["supports3DS"];
window.merchantTotalLabel = "Your Organization";
```

### Apple Pay Availability Detection

The component checks two conditions:
1. `ApplePaySession` exists in window (browser supports Apple Pay)
2. `canMakePaymentsWithActiveCard()` returns true (user has Apple Pay set up)

If either fails, the Apple Pay option is hidden.

### Payment Flow

1. **User selects Apple Pay** and clicks submit
2. **Validation triggered**: Apple Pay session created with donation amount
3. **Merchant validation**: ENgrid calls EN's Apple Pay validation endpoint
4. **User authorizes**: Payment sheet appears for Touch ID/Face ID
5. **Token generated**: Apple Pay provides encrypted payment token
6. **Form submission**: Token added to hidden field `PkPaymentToken`, form submits

### Apple Pay Session

```javascript
const request = {
  supportedNetworks: ["visa", "masterCard", "amex"],
  merchantCapabilities: ["supports3DS"],
  countryCode: "US",
  currencyCode: "USD",
  total: {
    label: "Your Organization",
    amount: 100.00
  }
};

const session = new ApplePaySession(1, request);
```

### Validation Endpoint

ENgrid communicates with EN's Apple Pay service:

```
/ea-dataservice/rest/applepay/validateurl?url={validationURL}&merchantIdentifier=...
```

### Token Storage

The payment token is stored in a hidden field:

```html
<input type="hidden" name="PkPaymentToken" id="applePayToken" value="{encrypted_token}">
```

### Error Handling

- **Session canceled**: Alert shown, form error dispatched
- **Validation failed**: Logged to console, session fails
- **No Apple Pay setup**: Option hidden from page

---

## Give By Select

The `GiveBySelect` class manages payment method selection via custom radio buttons, allowing greater design flexibility than the standard payment type dropdown.

### Usage

Create radio buttons with name `transaction.giveBySelect`:

```html
<input type="radio" name="transaction.giveBySelect" value="card" data-default="true">
<label>Credit Card</label>

<input type="radio" name="transaction.giveBySelect" value="paypal">
<label>PayPal</label>

<input type="radio" name="transaction.giveBySelect" value="stripedigitalwallet">
<label>Apple Pay / Google Pay</label>
```

### Default Selection

Use `data-default="true"` to mark the default payment method:

```html
<input type="radio" name="transaction.giveBySelect" value="card" data-default="true">
```

{% callout title="Tip" %}
For a more enhanced default, see about enabling [Preferred Payment Methods](./preferred-payment-method) on your client theme.
{% /callout %}

### How It Works

1. **Syncs with payment type field**: When giveBySelect changes, updates `transaction.paymenttype`
2. **Initial state**: Sets giveBySelect based on current payment type
3. **Frequency integration**: Checks visibility when frequency changes
4. **Auto-adjustment**: If selected payment becomes hidden, switches to first visible option

### Card Variant Handling

Multiple card type values are normalized to "card":

```javascript
const cardTypes = [
  "card", "visa", "mastercard", "amex", "discover",
  "diners", "jcb", "vi", "mc", "ax", "dc", "di", "jc"
];
```

If payment type is any of these, the `giveBySelect` option with value "card" is selected.

### Visibility Management

The component monitors payment option visibility:

```javascript
isSelectedPaymentVisible(): boolean
```

Returns `false` if the currently selected payment method's container is hidden (display: none).

### Auto-Correction

If frequency change hides the selected payment method:

1. Component waits 300ms for CSS transitions
2. Finds first visible payment option
3. Programmatically clicks its label
4. Updates payment type field

**Example:**
- User selects Apple Pay on one-time frequency
- User switches to monthly
- Apple Pay is hidden (not supported for recurring)
- Component auto-selects first visible option (e.g., card)

### Integration with Digital Wallets

GiveBySelect works seamlessly with digital wallets:

```html
<!-- Stripe Wallets -->
<input type="radio" name="transaction.giveBySelect" value="stripedigitalwallet">

<!-- PayPal/Venmo -->
<input type="radio" name="transaction.giveBySelect" value="paypaltouch">

<!-- DAF -->
<input type="radio" name="transaction.giveBySelect" value="daf">
```

### Give by Select Helper Classes

The Give by Select pseudo field has its own markup; if it has the `en__field--give-by-select` class, then no additional classes are needed. You can change the number of buttons by including a second helper class or by defining your own values in CSS.

| Class                    | Description             |
| ------------------------ | ----------------------- |
| `give-by-select_count_1` | Shows 1 button per row  |
| `give-by-select_count_2` | Shows 2 buttons per row |
| `give-by-select_count_3` | Shows 3 buttons per row |
| `give-by-select_count_4` | Shows 4 buttons per row |
| `give-by-select_count_5` | Shows 5 buttons per row |

Utility classes to hide/show a component based on gift type.

| Class                 | Description                                    | Usable on Thank You Pages |
| --------------------- | ---------------------------------------------- | ------------------------- |
| `giveBySelect-Card`   | Show component when Give by Card is selected   | Yes                       |
| `giveBySelect-ACH`    | Show component when Give by Check is selected  | Yes                       |
| `giveBySelect-Paypal` | Show component when Give by Paypal is selected | Yes                       |

#### CSS Patterns

```css
/* Hide payment method containers by default */
.giveBySelect-card,
.giveBySelect-paypal,
.giveBySelect-stripedigitalwallet {
  display: none;
}

/* Show container when its payment method is selected */
[data-engrid-payment-type="card"] .giveBySelect-card,
[data-engrid-payment-type="paypal"] .giveBySelect-paypal,
[data-engrid-payment-type="stripedigitalwallet"] .giveBySelect-stripedigitalwallet {
  display: block;
}
```

### Frequency-Specific Payment Methods

Show/hide payment methods based on frequency:

```css
/* Hide Apple Pay for recurring */
body[data-engrid-frequency="monthly"] input[value="stripedigitalwallet"],
body[data-engrid-frequency="annual"] input[value="stripedigitalwallet"] {
  display: none;
}
```

### Real-World Example

```html
<!-- Custom Radio Buttons using the same markup as Engaging Networks -->
<div class="en__component en__component--formblock give-by-select">
  <div class="en__field en__field--radio en__field--000000 en__field--giveBySelect en__mandatory pseudo-en-field">
  <div class="en__field__element en__field__element--radio">
    <div class="en__field__item card"><input checked="checked" class="en__field__input en__field__input--radio" id="en__field_transaction_giveBySelect0" name="transaction.giveBySelect" type="radio" value="Card" /> <label class="en__field__label en__field__label--item" for="en__field_transaction_giveBySelect0">Card</label></div>

    <div class="en__field__item paypal"><input class="en__field__input en__field__input--radio" id="en__field_transaction_giveBySelect1" name="transaction.giveBySelect" type="radio" value="Paypal" /> <label class="en__field__label en__field__label--item" for="en__field_transaction_giveBySelect1">PayPal</label></div>

    <div class="en__field__item check"><input class="en__field__input en__field__input--radio" id="en__field_transaction_giveBySelect2" name="transaction.giveBySelect" type="radio" value="Check" /> <label class="en__field__label en__field__label--item" for="en__field_transaction_giveBySelect2">Check</label></div>
    </div>
  </div>
</div>
<!-- Payment method specific fields that show on selection -->
<div class="giveBySelect-card">
  <!-- Credit card fields -->
</div>

<div class="giveBySelect-paypal">
  <!-- PayPal button container -->
</div>

<div class="giveBySelect-stripedigitalwallet">
  <!-- Apple Pay / Google Pay buttons -->
</div>
```

### PayPal Billing Agreement

{% callout title="Example Text " %}
PayPal Billing Agreement: By submitting this form, you agree to allow Organization Name to take funds from your account on a recurring basis.

{% /callout %}


---

## Best Practices

### 1. Test All Payment Methods

Verify each payment method works:
- Credit card processing
- Apple Pay (requires Apple device/Safari)
- Google Pay (requires Chrome/Android)
- PayPal One Touch
- Venmo
- DAF (if applicable)

### 2. Provide Fallbacks

Always offer credit card as fallback:

```html
<input type="radio" name="transaction.giveBySelect" 
       value="card" data-default="true">
```

### 3. Handle Frequency Restrictions

Some payment methods don't support recurring:

```css
/* Hide Apple Pay for recurring */
body[data-engrid-frequency="monthly"] .payment-option-applepay {
  display: none;
}
```

### 4. Loading States

Digital wallets may load slowly. Show loading indicators:

```css
.giveBySelect-stripedigitalwallet:empty::after {
  content: "Loading...";
}
```

### 5. Mobile Optimization

Digital wallets are popular on mobile. Optimize UI:

```css
@media (max-width: 768px) {
  .payment-methods {
    flex-direction: column;
  }
  
  .payment-option {
    width: 100%;
  }
}
```

### 6. Clear Visual Feedback

Make selected payment method obvious:

```css
input[name="transaction.giveBySelect"]:checked + label {
  border: 2px solid #007bff;
  background: #e7f3ff;
}
```

### 7. Security Considerations

- Never log payment tokens in production
- Use HTTPS for all payment processing
- Follow PCI compliance guidelines
- Don't cache payment information

---

## Troubleshooting

### Apple Pay Not Showing

**Cause**: Browser doesn't support Apple Pay or user hasn't set it up  
**Solution**: Check console for "applePayEnabled" log. Ensure on Safari/iOS.

### Digital Wallets Loading Slowly

**Cause**: External script delays  
**Solution**: Use MutationObserver (built-in). Consider loading indicator.

### Payment Method Not Syncing

**Cause**: GiveBySelect and payment type field out of sync  
**Solution**: Check console for "GiveBySelect" logs. Verify field names match.

### Recurring Payments Failing

**Cause**: Payment method doesn't support recurring  
**Solution**: Hide incompatible methods or show warning message.

### Default Payment Not Selected

**Cause**: `data-default="true"` not set or digital wallet still loading  
**Solution**: Add default attribute. Give By Select will apply it when wallet loads.
