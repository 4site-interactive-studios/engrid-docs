---
title: Live Variables
description: Learn how to display dynamic text that updates in real-time based on donation amounts, frequencies, and processing fees
---

## Overview

The `LiveVariables` component creates dynamic text that updates in real-time based on form interactions, donation amounts, frequencies, and processing fees.

Live variables allow you to show:
- Current donation amount in text
- Submit button with dynamic amount
- Upsell amounts based on current donation
- Frequency changes reflected in text
- Processing fee calculations

## Available Live Variable Classes

| Class | Updates With | Example Output |
| --- | --- | --- |
| `.live-giving-amount` | Current amount + fees | `$50.00` |
| `.live-giving-upsell-amount` | Suggested upsell amount | `$25.00` |
| `.live-giving-upsell-amount-raw` | Raw upsell value (no formatting) | `25` |
| `.live-giving-frequency` | Selected frequency | `monthly` or empty |

## Submit Button with Amount

Add `$AMOUNT` and `$FREQUENCY` to submit button text:

```html
<!-- In EN Page Builder -->
<button>Donate $AMOUNT $FREQUENCY</button>
```

**Output:**
- One-time $50: "Donate $50.00"
- Monthly $25: "Donate $25.00 monthly"
- Annual $100: "Donate $100.00 annually"

## Live Amount in Content

Show current donation amount anywhere on the page:

```html
<p>You are about to donate <span class="live-giving-amount"></span>.</p>
```

**Updates to:**
```html
<p>You are about to donate <span class="live-giving-amount">
  <span class="live-variable-currency">$</span>
  <span class="live-variable-amount">50.00</span>
</span>.</p>
```

## Upsell Amount Display

Show suggested monthly upsell amount:

```html
<p>Or make an even bigger impact with a monthly gift of 
   <span class="live-giving-upsell-amount"></span>!</p>
```

### Calculation

- Takes current one-time amount
- Divides by 12 (monthly multiplier)
- Rounds up to nearest $5

**Example:**
- $60 one-time → $5/month upsell
- $120 one-time → $10/month upsell
- $240 one-time → $20/month upsell

## Frequency Display

Show current frequency selection:

```html
<p>Your <span class="live-giving-frequency"></span> gift will help...</p>
```

**Output:**
- Monthly selected: "Your monthly gift will help..."
- One-time selected: "Your gift will help..." (empty span)
- Annual selected: "Your annual gift will help..."

## Monthly Upsell Links

Create clickable links that switch to monthly giving:

```html
<a href="#" class="monthly-upsell form-submit">
  Switch to monthly giving of <span class="live-giving-upsell-amount"></span>
</a>
```

### Behavior

1. Selects "Yes" for recurring donation
2. Selects "Other" amount radio
3. Fills other amount with upsell value
4. Submits the form (because of `form-submit` class)

**Without auto-submit:**
```html
<a href="#" class="monthly-upsell">
  Switch to monthly giving
</a>
```

## Processing Fees

Live variables automatically include processing fees in displayed amounts:

```typescript
const displayAmount = donationAmount + processingFee;
```

So if user selects $50 + $2 fee, `.live-giving-amount` shows $52.

## Number Formatting

Respects ENgrid currency options:

```javascript
window.EngridOptions = {
  DecimalSeparator: ".",    // US: "." EU: ","
  ThousandsSeparator: ",",  // US: "," EU: "."
  DecimalPlaces: 2
};
```

**US Format:** `$1,234.56`
**EU Format:** `€1.234,56`

## Complete Example

Donation page with live variables:

```html
<div class="donation-summary">
  <h3>Your Donation</h3>
  <p>You are donating <strong class="live-giving-amount"></strong>
     <span class="live-giving-frequency"></span>.</p>
     
  <div class="upsell-box">
    <p>Make an even bigger impact!</p>
    <p>A monthly gift of <strong class="live-giving-upsell-amount"></strong>
       provides sustained support.</p>
    <a href="#" class="monthly-upsell form-submit btn btn-secondary">
      Switch to Monthly
    </a>
  </div>
</div>

<!-- Submit button -->
<button class="en__submit">
  Donate $AMOUNT $FREQUENCY
</button>
```

## Events Integration

Live variables subscribe to ENgrid events:

```typescript
// Updates when amount changes
_amount.onAmountChange.subscribe(() => this.changeLiveAmount());

// Updates when frequency changes  
_frequency.onFrequencyChange.subscribe(() => this.changeLiveFrequency());

// Updates when processing fees change
_fees.onFeeChange.subscribe(() => this.changeLiveAmount());

// Disables submit during processing
_form.onSubmit.subscribe(() => ENGrid.disableSubmit("Processing..."));
```

## Best Practices

1. **Clear Labeling**: Make it obvious what amounts represent
2. **Test Amounts**: Verify calculations with various amounts
3. **Mobile Display**: Ensure amounts are readable on mobile
4. **Currency Symbol**: Shows automatically based on page currency
5. **Decimal Places**: Configure based on currency norms
6. **Processing Fees**: Include or exclude based on your needs
7. **Upsell Calculations**: Test that upsell amounts make sense

## Troubleshooting

### Amounts not updating:
- Verify class names are exact (case-sensitive)
- Check if amount field is properly configured
- Ensure ENgrid events are firing
- Look for JavaScript console errors

### Wrong currency symbol:
- Check page currency setting in EN
- Verify `CurrencySymbol` option if customized
- Test with different currency configurations

### Upsell amount seems wrong:
- Default multiplier is 1/12 (monthly from annual)
- Amounts round up to nearest $5
- Verify source amount is correct

### See also:

- [LiveFrequency](./currency-donation-amounts#live-frequency)
