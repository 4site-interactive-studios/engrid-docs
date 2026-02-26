---
title: Currency and Donation Amounts
description: Components for managing currency selection, live currency updates, donation amount labeling, other amounts, amount validation, and dynamic amount swapping
---

## Overview

ENgrid provides comprehensive tools for managing currencies and donation amounts, including custom currency options, live symbol updates, amount validation, and dynamic amount list swapping based on frequency.

---

## Custom Currency

The `CustomCurrency` class allows you to customize currency options per country, enabling regional donation forms with appropriate currency choices.

### Configuration

```javascript
EngridOptions = {
  CustomCurrency: {
    label: "Give with [$$$]",  // [$$$] = currency code, [$] = symbol
    default: {
      USD: "$",
      GBP: "£",
      EUR: "€"
    },
    countries: {
      US: { USD: "$" },
      GB: { GBP: "£" },
      DE: { EUR: "€" },
      FR: { EUR: "€" },
      CA: { CAD: "$", USD: "$" }
    }
  }
};
```

### Label Placeholders

| Placeholder | Replaced With | Example |
| ----------- | ------------- | ------- |
| `[$$$]` | Currency code | `Give with USD` |
| `[$]` | Currency symbol | `Give with $` |

**Example label patterns:**
- `"Give with [$$$]"` → `"Give with USD"`
- `"Donate in [$] [$$$]"` → `"Donate in $ USD"`
- `"[$]"` → `"$"`

### How It Works

1. **On load**: Checks selected country (or defaults to "default")
2. **Loads currencies**: Populates currency field with appropriate options
3. **Country change**: Updates currency options when country changes
4. **Auto-selects**: Selects first currency and triggers change event

### Country Integration

Works automatically with [AutoCountrySelect component](./auto-fill-smart-defaults#auto-country-select). If a visitor from France arrives:
1. Country detected as "FR"
2. Currency options load from `countries.FR`
3. If not defined, falls back to `default`

### Page-Level Override

Override for specific pages:

```html
<script>
window.EngridPageOptions = {
  CustomCurrency: {
    label: "Donate in [$] ([$$$])",
    default: {
      EUR: "€",
      GBP: "£"
    },
    countries: {
      GB: { GBP: "£" },
      FR: { EUR: "€" }
    }
  }
};
</script>
```

### Multiple Currencies Per Country

Some countries support multiple currencies:

```javascript
countries: {
  CA: {
    CAD: "CA$",
    USD: "US$"
  }
}
```

The currency dropdown will show:
- Give with CAD
- Give with USD

### Example: Global Non-Profit

```javascript
CustomCurrency: {
  label: "Give with [$]",
  default: {
    USD: "$",
    EUR: "€",
    GBP: "£"
  },
  countries: {
    US: { USD: "$" },
    CA: { CAD: "C$", USD: "US$" },
    GB: { GBP: "£", EUR: "€" },
    FR: { EUR: "€" },
    DE: { EUR: "€" },
    AU: { AUD: "A$", USD: "US$" },
    NZ: { NZD: "NZ$", AUD: "A$" }
  }
}
```

---

## Live Currency

The `LiveCurrency` class dynamically updates currency symbols and codes throughout the page content when the currency selection changes.

### Placeholders

Use these placeholders in copy blocks, code blocks, field labels, and buttons:

| Placeholder | Updates To | Example |
| ----------- | ---------- | ------- |
| `[$]` | Currency symbol | `$`, `€`, `£` |
| `[$$$]` | Currency code | `USD`, `EUR`, `GBP` |

### Where It Works

Placeholders are replaced in:
- `.en__component--copyblock` (Copy blocks)
- `.en__component--codeblock` (Code blocks)
- `.en__field label` (Form field labels)
- `.en__submit` (Submit button)

### Exclusions

Script blocks are skipped to avoid breaking code:

```html
<script>
  // [$] placeholders here are NOT replaced
  var amount = [$];
</script>
```

### Example Usage

**Copy Block:**
```html
<div class="en__component--copyblock">
  <p>Your gift of [$]100 will provide meals for 10 families.</p>
  <p>All donations are processed in [$$$].</p>
</div>
```

**When USD selected:**
```
Your gift of $100 will provide meals for 10 families.
All donations are processed in USD.
```

**When EUR selected:**
```
Your gift of €100 will provide meals for 10 families.
All donations are processed in EUR.
```

### Dynamic Updates

The component updates automatically when:
- Currency field changes
- Donation amount changes
- Donation frequency changes
- Processing fees change

### Body Data Attribute

When active, body receives:
```html
<body data-engrid-live-currency="active">
```

### Implementation Details

Placeholders are converted to HTML spans:

```html
<!-- Before -->
Donate [$]50 in [$$$]

<!-- After -->
Donate <span class="engrid-currency-symbol">$</span>50 in <span class="engrid-currency-code">USD</span>
```

This allows the values to be updated without searching/replacing the entire DOM.

### Mutation Observer

Watches the donation amount field for changes (e.g., when frequency swaps amount buttons):

```javascript
observer.observe(targetNode, { childList: true });
```

When amounts update, currency symbols are reapplied.

### Example: Multi-Currency Appeal

```html
<div class="appeal-content">
  <h2>Support Clean Water Access</h2>
  <p>Your donation of [$]100 provides clean water for 5 families.</p>
  <p>Monthly gifts of [$]25 support ongoing water projects.</p>
  <p>All amounts shown in [$$$]. Tax receipts issued in your currency.</p>
</div>
```

---

## Amount Helper Classes

Makes the Gift Amount and/or Frequency Count Radio Inputs look like Buttons. Also works as a page level class.

```
radio-to-buttons_donationAmt
radio-to-buttons_recurrpay
```

When the Radio to Buttons class is added you can change the number of buttons by including a second helper class or by defining your own values in CSS.

| Class                     | Description             |
| ------------------------- | ----------------------- |
| `donation-amount_count_1` | Shows 1 button per row  |
| `donation-amount_count_2` | Shows 2 buttons per row |
| `donation-amount_count_3` | Shows 3 buttons per row |
| `donation-amount_count_4` | Shows 4 buttons per row |
| `donation-amount_count_5` | Shows 5 buttons per row |
| `recurring-frequency_count_1` | Shows 1 button per row  |
| `recurring-frequency_count_2` | Shows 2 buttons per row |
| `recurring-frequency_count_3` | Shows 3 buttons per row |
| `recurring-frequency_count_4` | Shows 4 buttons per row |
| `recurring-frequency_count_5` | Shows 5 buttons per row |

---

## Amount Label

The `AmountLabel` class automatically adds currency symbols to donation amount labels that contain only numbers.

### Enabling

```javascript
EngridOptions = {
  AddCurrencySymbol: true
};
```

### How It Works

On donation pages, scans all `.en__field--donationAmt label` elements:
1. Checks if label text is numeric (after removing commas/periods)
2. If numeric, prepends currency symbol
3. Runs on page load and when frequency changes

### Example

**Before:**
```html
<label>25</label>
<label>50</label>
<label>100</label>
<label>Other Amount</label>
```

**After (USD):**
```html
<label>$25</label>
<label>$50</label>
<label>$100</label>
<label>Other Amount</label> <!-- Not changed, not numeric -->
```

### Frequency Compatibility

Re-runs when frequency changes to handle swapped amounts:

```javascript
_frequency.onFrequencyChange.subscribe(() => {
  setTimeout(this.fixAmountLabels, 100);
});
```

### Non-Numeric Labels Preserved

Labels with text are not modified:

- `"Other Amount"` ✓ Preserved
- `"Most Popular"` ✓ Preserved
- `"100"` → `"$100"` ✗ Modified

---

## Other Amount

The `OtherAmount` class manages the "other amount" input field, handling automatic selection, value formatting, and validation.

### How it works

1. Scans for the other amount input field (`transaction.donationAmt.other`)
2. Adds the features listed below to the input field

### Features

#### 1. Auto-Select Other Radio

When user clicks or types in the other amount field:
- Last radio button is automatically selected
- Other amount wrapper is made visible

#### 2. Value Cleaning

Uses `ENGrid.cleanAmount()` to format input:

| User Types | Cleaned To |
| ---------- | ---------- |
| `$100` | `100` |
| `1,000.50` | `1000.50` |
| `€50` | `50` |
| `1.234,56` | `1234.56` |

#### 3. Decimal Handling

If the cleaned amount has decimals, it's formatted to 2 places:

```javascript
100.5 → 100.50
25.999 → 26.00
```

#### 4. Zero Amount Handling

If user clears field or enters 0:
- On blur, reverts to previously selected amount
- Prevents $0 donations

#### 5. Accessibility Enhancements

Automatically sets:
- `aria-label="Enter your custom donation amount"`
- `inputmode="decimal"` (optimized mobile keyboard)
- `autocomplete="off"` (no suggestions)
- `data-lpignore="true"` (prevents LastPass auto-fill)

### Debug Logging

Enable debug mode to see field changes handled.

Look for `[💰 OtherAmount]` in console logs.

---

## Min/Max Amount

The `MinMaxAmount` class validates donation amounts against minimum and maximum thresholds, supporting both static and frequency-based validation.

### Configuration

#### Static Min/Max

```javascript
EngridOptions = {
  MinAmount: 5,
  MaxAmount: 100000,
  MinAmountMessage: "Minimum donation is $5",
  MaxAmountMessage: "Maximum donation is $100,000",
  UseAmountValidatorFromEN: false
};
```

{% callout title="You should know!" %}
When `UseAmountValidatorFromEN` is set to true, it will prioritize EN validator settings.
{% /callout %}

#### Use EN Validators

Pull min/max from Engaging Networks field validators:

```javascript
EngridOptions = {
  UseAmountValidatorFromEN: true
};
```

This reads the amount validator configured in EN and applies those rules. This also uses the error messages set in EN.

### Frequency-Based Validation

EN's FAMNT (Frequency Amount) validator format:

```
SINGLE:10~100000|MONTHLY:5~100000|QUARTERLY:25~100000|ANNUAL:25~100000
```

When enabled, min/max change based on selected frequency:

| Frequency | Min | Max |
| --------- | --- | --- |
| One-time | $10 | $100,000 |
| Monthly | $5 | $100,000 |
| Quarterly | $25 | $100,000 |
| Annual | $25 | $100,000 |

### Validation Timing

#### 1. Live Validation

Runs 1 second after amount changes:
- Shows error message immediately
- Doesn't prevent form submission
- Allows user to correct without submitting

#### 2. Submit Validation

Runs on form submission attempt:
- Blocks submission if invalid
- Focuses other amount field
- Shows error message

### Error Display

Errors are shown on the `.en__field--withOther` container:

```javascript
ENGrid.setError(
  ".en__field--withOther",
  "Minimum donation is $5"
);
```

### Zero Amount Handling

If other amount field has focus and amount is 0:
- Validation is skipped
- Allows user to type without immediate error

### Example: Frequency-Based

**One-time donor selects $3:**
- Error: "Minimum donation is $10"

**Switches to monthly, amount still $3:**
- Error cleared (monthly min is $5)
- But still invalid (below $5)
- New error: "Minimum donation is $5"

**User enters $8:**
- Error cleared
- Can proceed

### Debug Logging

Enable debug mode to see field changes handled.

Look for `[🔢 MinMaxAmount]` in console logs.

---

## Swap Amounts

The `SwapAmounts` component dynamically changes available donation amounts when frequency changes, allowing different amount options for one-time vs. recurring gifts.

### Configuration

```javascript
window.EngridAmounts = {
  onetime: {
    amounts: {
      "25": 25,
      "50": 50,
      "100": 100,
      "250": 250,
      "Other": "other"
    },
    default: 50,
    stickyDefault: false
  },
  monthly: {
    amounts: {
      "10": 10,
      "25": 25,
      "50": 50,
      "100": 100,
      "Other": "other"
    },
    default: 25,
    stickyDefault: true
  }
};
```

{% callout title="You should know!" %}
When the number of amounts differs from one frequency to another, the number of selectable options changes which may be jarring for the end user.
{% /callout %}

### Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| `amounts` | Object | Label-value pairs for amount buttons |
| `default` | Number | Which amount is pre-selected |
| `stickyDefault` | Boolean | Force default selection on every swap |

### Sticky Default

**When `false` (default):**
- Respects user's current selection
- Only resets to default if submission failed or page loads

**When `true`:**
- Always selects the configured default on frequency change
- Ignores user's previous selection
- Useful for campaigns with specific ask ladders

### URL-Based Amounts

Override amounts via URL:

```
?engrid-amounts=15,25,50,100
```

Creates identical amount lists for all frequencies.

With default amount:
```
?engrid-amounts=15,25,50,100&transaction.donationAmt=50
```

### How It Works

1. **Frequency changes** (e.g., one-time → monthly)
2. **Config looked up** for new frequency
3. **EN's swapList called** with new amounts
4. **Default selected** (unless sticky or user changed)
5. **Amount loads** from new selection

### Amount Object Structure

```javascript
amounts: {
  "Label": value,
  "25": 25,           // Label: "25", Value: 25
  "Other": "other"    // Label: "Other", Value: "other"
}
```

### Example Use Cases

#### Different Amount Ladders

```javascript
onetime: {
  amounts: { "50": 50, "100": 100, "250": 250, "500": 500, "Other": "other" },
  default: 100
},
monthly: {
  amounts: { "10": 10, "25": 25, "50": 50, "100": 100, "Other": "other" },
  default: 25
}
```

#### Premium Gift Thresholds

```javascript
onetime: {
  amounts: { "500": 500, "1000": 1000, "2500": 2500, "Other": "other" },
  default: 1000,
  stickyDefault: true  // Always show $1000 when one-time selected
}
```

#### Sustainer Focus

```javascript
monthly: {
  amounts: { "5": 5, "10": 10, "15": 15, "25": 25, "Other": "other" },
  default: 15,
  stickyDefault: true
},
onetime: {
  amounts: { "25": 25, "50": 50, "Other": "other" },
  default: 50
}
```

### Debug Logging

Enable debug mode to see swaps handled.

Look for `[💰 SwapAmounts]` in console logs.

---

## Native Ask String / Swap Lists

This is documentation about managing the ask string swap list in Engaging Networks and is not specific to ENgrid, but it comes up often enough that we have a step-by-step guide. Here is how to update One-time or Monthly giving amounts on a page that uses a Form Component with a Swap List.

| Step | Instruction                                                                                                        | Screenshot                            |
|------|--------------------------------------------------------------------------------------------------------------------|---------------------------------------|
| 1    | Edit the Form Component with the “Donation Amount” field.                                                          | [screenshot](https://cln.sh/xQVrHW62) |
| 2    | If linked, unlink the Form Component from the Component Library.                                                   | [screenshot](https://cln.sh/7RxGjNSJ) |
| 3    | Save the form component back to the component library with an appropriate name that includes the amounts.          | [screenshot](https://cln.sh/hdVVVhyn) |
| 4    | Click the Dependencies icon.                                                                                       | [screenshot](https://cln.sh/xzySrCx3) |
| 5    | Click the pencil (edit) icon on your desired option in the pop-up.                                                 | [screenshot](https://cln.sh/jr1hVC5V) |
| 6    | Manage the “Swap List” by clicking the pencil icon next to the associated Swap List.                               | [screenshot](https://cln.sh/HChLSdLj) |
| 7    | Click the pencil icon next to the Monthly Swap List in the pop-up.                                                 | [screenshot](https://cln.sh/x6LMD9nq) |
| 8    | Edit the pre-defined giving amounts for Monthly.                                                                   | -                                     |
| 9    | IMPORTANT: Ensure the value is updated when changing the label.                                                    | [screenshot](https://cln.sh/bx5S20Gf) |
| 10   | **IMPORTANT**: The last option should always be “Other” with a value of “other”.                                   | [screenshot](https://cln.sh/BFZSlWJr) |
| 11   | **IMPORTANT**: Understand how the default amount for the One-time Swap List works.                                 | [recording](https://cln.sh/HrqSd22t)  |
| 12   | Save the swap list, and close the pop-up.                                                                          | [screenshot](https://cln.sh/lZ7Nlg5k) |
| 13   | Save the alternative content, and close the pop-up.                                                                | [screenshot](https://cln.sh/vlRWNxKb) |
| 14   | Save the field update.                                                                                             | [screenshot](https://cln.sh/m7d36hVP) |
| 15   | Save the dependency configuration, and close the pop-up.                                                           | [screenshot](https://cln.sh/SGn8zdQS) |
| 16   | Save the page.                                                                                                     | [screenshot](https://cln.sh/wyp1wnY8) |
| 17   | Note the instant changes on the page you were editing if the form is saved to the Library.                         | -                                     |
| 18   | Be aware that other pages using the same Library Form Component could take up to 1hr for the changes to propagate. | -                                     |

---

## Show If Amount

The `ShowIfAmount` class conditionally shows/hides page elements based on the selected donation amount using class-based operators.

{% callout title="You should know!" %}
These classes can also be used on thank you pages
{% /callout %}

### Class Format

```
showifamount-{operator}-{value}
```

### Supported Operators

| Class | Condition | Example |
| ----- | --------- | ------- |
| `showifamount-lessthan-{n}` | Amount < n | `showifamount-lessthan-100` |
| `showifamount-lessthanorequalto-{n}` | Amount ≤ n | `showifamount-lessthanorequalto-50` |
| `showifamount-equalto-{n}` | Amount = n | `showifamount-equalto-25` |
| `showifamount-greaterthanorequalto-{n}` | Amount ≥ n | `showifamount-greaterthanorequalto-100` |
| `showifamount-greaterthan-{n}` | Amount > n | `showifamount-greaterthan-250` |
| `showifamount-between-{min}-{max}` | min < Amount < max | `showifamount-between-100-500` |

### Usage

```html
<div class="showifamount-greaterthanorequalto-100">
  <p>Thank you for your generous gift of $100 or more!</p>
</div>

<div class="showifamount-lessthan-50">
  <p>Every dollar counts! Consider increasing your gift.</p>
</div>

<div class="showifamount-between-50-100">
  <p>You're so close to unlocking our $100 match!</p>
</div>
```

### How It Works

1. Searches for elements with `showifamount` classes
2. Subscribes to amount changes
3. Evaluates each operator against current amount
4. Adds/removes `.engrid-open` class

### CSS Integration

```css
/* Hide by default */
[class*="showifamount"] {
  display: none;
}

/* Show when condition met */
[class*="showifamount"].engrid-open {
  display: block;
}
```

### Animated Transitions

| Class                    | Description                                      |
| ------------------------ | ------------------------------------------------ |
| `animate-replace`        | Will animate the content switch using scale      |
| `animate-vertical-slide` | Will animate the content switch using max-height |

### Thank You Page Support

On thank you pages, uses `window.pageJson.amount` instead of live amount.

### Example: Impact Messaging

```html
<div class="showifamount-lessthan-25">
  <p>Your gift provides school supplies for 1 child.</p>
</div>

<div class="showifamount-between-25-100">
  <p>Your gift provides school supplies for 3 children.</p>
</div>

<div class="showifamount-greaterthanorequalto-100">
  <p>Your gift provides school supplies for an entire classroom!</p>
  <img src="classroom.jpg" alt="Children in classroom">
</div>
```

### Example: Upsell Messaging

```html
<div class="showifamount-lessthan-100">
  <div class="upsell-message">
    <strong>Increase to $100</strong> to unlock a 2x match!
  </div>
</div>
```

---

## Live Frequency

The `LiveFrequency` class replaces merge tags in page content with the current donation frequency, dynamically updating when frequency changes.

### Merge Tags

| Tag | Case | Example Output |
| --- | ---- | -------------- |
| `[[frequency]]` | lowercase | `one-time`, `monthly`, `annual` |
| `[[Frequency]]` | Capitalized | `One-time`, `Monthly`, `Annual` |
| `[[FREQUENCY]]` | UPPERCASE | `ONE-TIME`, `MONTHLY`, `ANNUAL` |

### Usage

```html
<div class="en__component--copyblock">
  <p>Your [[frequency]] gift makes a lasting impact!</p>
  <p>[[Frequency]] donors are our most valued supporters.</p>
  <p>GIVE [[FREQUENCY]] TODAY!</p>
</div>
```

**When monthly selected:**
```
Your monthly gift makes a lasting impact!
Monthly donors are our most valued supporters.
GIVE MONTHLY TODAY!
```

**When one-time selected:**
```
Your one-time gift makes a lasting impact!
One-time donors are our most valued supporters.
GIVE ONE-TIME TODAY!
```

### Where It Works

Merge tags are replaced in:
- `.en__component--copyblock` (Copy blocks)
- `.en__component--codeblock` (Code blocks)
- `.en__field label` (Form field labels)
- `.en__submit` (Submit button)

### Dynamic Updates

Updates automatically when:
- Frequency changes
- Donation amount changes (triggers re-scan)

### Implementation

Merge tags are converted to spans:

```html
<!-- Before -->
Your [[frequency]] gift

<!-- After -->
Your <span class="engrid-frequency engrid-frequency--lowercase">monthly</span> gift
```

This allows updates without re-parsing the entire DOM.

### Example: Dynamic Appeal

```html
<h2>Become a [[Frequency]] Champion</h2>
<p>
  [[Frequency]] donors like you provide consistent support that helps us plan for the future.
  Your [[frequency]] commitment will:
</p>
<ul>
  <li>Provide stable funding for our programs</li>
  <li>Reduce administrative costs</li>
  <li>Enable long-term planning</li>
</ul>
<p><strong>Join our [[frequency]] giving community today!</strong></p>
```

### See also:

- [LiveVariables](./live-variables)

---

## Set Recurrence Frequency

The `setRecurrFreq` class provides alternative ways to set donation frequency using links or checkboxes instead of standard radio buttons.

### Link-Based Frequency Selection

Add class `setRecurrFreq-{frequency}` to any link:

```html
<a href="#" class="setRecurrFreq-monthly">Give Monthly</a>
<a href="#" class="setRecurrFreq-quarterly">Give Quarterly</a>
<a href="#" class="setRecurrFreq-annual">Give Annually</a>
<a href="#" class="setRecurrFreq-onetime">Give Once</a>
```

Clicking the link:
1. Prevents default link action
2. Sets `transaction.recurrfreq` field
3. Triggers frequency change event
4. Updates all frequency-dependent elements

### Checkbox-Based Frequency

Create checkbox with name `engrid.recurrfreq`:

```html
<input type="checkbox" name="engrid.recurrfreq" value="monthly" id="monthly-checkbox">
<label for="monthly-checkbox">Make this a monthly gift</label>
```

Checkbox behavior:
- **Checked**: Sets to specified frequency, sets `transaction.recurrpay` to "Y"
- **Unchecked**: Reverts to one-time, sets `transaction.recurrpay` to "N"

### Initial State

On page load, checkbox is checked/unchecked based on current frequency selection.

### Syncing

When frequency changes (e.g., via radio buttons), checkboxes automatically update:
- Matching frequency: Checked
- Non-matching frequency: Unchecked

### Example: Upsell Checkbox

```html
<div class="frequency-upsell">
  <input type="checkbox" name="engrid.recurrfreq" value="monthly" id="make-monthly">
  <label for="make-monthly">
    <strong>Yes!</strong> Make this a monthly gift and multiply your impact
  </label>
</div>
```

### Example: Frequency Tabs

```html
<div class="frequency-tabs">
  <a href="#" class="setRecurrFreq-onetime tab">One-Time</a>
  <a href="#" class="setRecurrFreq-monthly tab active">Monthly</a>
  <a href="#" class="setRecurrFreq-annual tab">Annual</a>
</div>

<style>
.tab { padding: 10px 20px; border: 1px solid #ccc; }
.tab.active { background: #007bff; color: white; }
</style>

<script>
// Highlight active tab based on frequency
document.querySelectorAll('.setRecurrFreq-onetime, .setRecurrFreq-monthly, .setRecurrFreq-annual').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});
</script>
```

### Example: Hero CTA

```html
<div class="hero-cta">
  <h1>Become a Monthly Hero</h1>
  <p>Join 5,000 monthly donors making a difference every day.</p>
  <a href="#donate-form" class="btn btn-primary setRecurrFreq-monthly">
    Give Monthly
  </a>
</div>
```

Clicking the button:
1. Sets frequency to monthly
2. Scrolls to form (#donate-form)
3. Monthly amounts appear
4. User ready to complete donation

---

## Best Practices

### 1. Test All Currencies

Verify formatting for each supported currency:
- USD: $100.00
- EUR: €100,00 or €100.00
- GBP: £100.00

### 2. Consistent Amount Ladders

Use psychology-backed progression:
- Small: $25, $50, $100
- Medium: $50, $100, $250
- Large: $100, $250, $500

### 3. Monthly vs. One-Time

Monthly amounts should be ~25% of one-time:
- One-time: $100
- Monthly: $25

### 4. Always Include "Other"

Always provide an "Other" option:
```javascript
amounts: {
  "25": 25,
  "50": 50,
  "100": 100,
  "Other": "other"  // ← Essential
}
```

### 5. Set Reasonable Limits

```javascript
MinAmount: 5,    // Covers processing costs
MaxAmount: 100000  // Prevents typos/fraud
```

### 6. Clear Error Messages

Be specific about requirements:
```
❌ "Invalid amount"
✅ "Minimum donation is $5"
✅ "Maximum donation is $100,000 per transaction"
```

### 7. Mobile Optimization

Other amount field:
- `inputmode="decimal"` for numeric keyboard
- Large enough to tap easily (44x44px minimum)
- Clear/visible on mobile

### 8. Live Currency for International

For multi-currency forms:
```html
<p>Your [$]100 gift provides meals for 5 families.</p>
```

Auto-updates when currency changes.

---

## Troubleshooting

### Currency Symbol Not Updating

**Cause**: LiveCurrency not enabled or placeholders misspelled  
**Solution**: Use `[$]` for symbol, `[$$$]` for code (case-sensitive)

### Amount Swap Not Working

**Cause**: `window.EngridAmounts` not defined or wrong frequency keys  
**Solution**: Ensure keys match: "onetime", "monthly", "quarterly", "annual"

### Min/Max Not Enforcing

**Cause**: Options not set or validation not subscribed  
**Solution**: Check `MinAmount`/`MaxAmount` in options, verify on donation page

### Other Amount Reverting

**Cause**: Zero amount handling triggering  
**Solution**: Intended behavior when field is $0 on blur
