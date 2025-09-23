---
title: Custom Premium
description: Learn how to create dynamic premium gift configurations based on donation amounts and frequencies in ENgrid.
---

The CustomPremium component allows you to create sophisticated premium gift configurations that dynamically show or hide premium items based on donation amounts and frequencies. This enables Page Builders to use different premium configurations on the same page through URL parameters or other dynamic conditions.

{% callout title="Important!" %}
This component only works on Premium Donation Pages that have a "Premium gift block" configured to show all products with no frequency and amount limits. The CustomPremium component will handle the desired filtering based on your configuration.
{% /callout %}

## How It Works

The CustomPremium component:

1. **Monitors Changes**: Watches for donation amount and frequency changes
2. **Filters Products**: Shows only premium gifts that meet the minimum amount requirements for the selected frequency
3. **Manages Selection**: Automatically selects appropriate defaults when the current selection becomes invalid
4. **Handles Visibility**: Hides the entire premium block when no gifts meet the criteria
5. **Clears Fields**: Automatically clears variant fields when no premium is selected

## Configuration

Configure the CustomPremium component by setting `window.EngridPageOptions.CustomPremium` with your desired rules:

### Basic Structure

```javascript
window.EngridPageOptions.CustomPremium = {
  frequency: {
    products: { productId: minimumAmount },
    default: 'productId', // or "0" for "No Premium"
  },
}
```

### Configuration Options

- **Frequency Keys**: `"onetime"`, `"monthly"`, `"annual"`, or any custom frequency
- **Product IDs**: String keys representing your premium gift product IDs
- **Minimum Amounts**: Numeric values representing the minimum donation amount required
- **Default**: The product ID to select by default for this frequency, or `"0"` for "No Premium"

## Examples

### Single Premium Configuration

```javascript
window.EngridPageOptions.CustomPremium = {
  onetime: {
    products: { 3760: 75 },
    default: '3760',
  },
  monthly: {
    products: { 3760: 15 },
    default: '3760',
  },
  annual: {
    products: { 3760: 75 },
    default: '3760',
  },
}
```

### Multiple Premiums with Different Thresholds

```javascript
window.EngridPageOptions.CustomPremium = {
  onetime: {
    products: {
      3759: 25, // Product 3759 requires $25+
      3760: 50, // Product 3760 requires $50+
      3761: 100, // Product 3761 requires $100+
    },
    default: '3759',
  },
  monthly: {
    products: {
      3759: 10, // Same products, lower monthly thresholds
      3760: 15,
      3761: 25,
    },
    default: '3759',
  },
}
```

### Dynamic Configuration with URL Parameters

This example shows how to create multiple premium configurations and switch between them based on URL parameters:

```html
<script>
  // Define different premium configurations
  const v1Combo75 = {
    onetime: {
      products: { 3760: 75 },
      default: '3760',
    },
    monthly: {
      products: { 3760: 15 },
      default: '3760',
    },
    annual: {
      products: { 3760: 75 },
      default: '3760',
    },
  }

  const v1Combo35 = {
    onetime: {
      products: { 3760: 35 },
      default: '3760',
    },
    monthly: {
      products: { 3760: 10 },
      default: '3760',
    },
    annual: {
      products: { 3760: 35 },
      default: '3760',
    },
  }

  const v1Combo25 = {
    onetime: {
      products: { 3760: 25 },
      default: '3760',
    },
    monthly: {
      products: { 3760: 10 },
      default: '3760',
    },
    annual: {
      products: { 3760: 25 },
      default: '3760',
    },
  }

  const v2Combo75 = {
    onetime: {
      products: { 3759: 75 },
      default: '3759',
    },
    monthly: {
      products: { 3759: 15 },
      default: '3759',
    },
    annual: {
      products: { 3759: 75 },
      default: '3759',
    },
  }

  // Map URL parameters to configurations
  const premiumMap = {
    'v1-combo-75': v1Combo75,
    'v1-combo-35': v1Combo35,
    'v1-combo-25': v1Combo25,
    'v2-combo-75': v2Combo75,
  }

  // Get premium parameter from URL or use default
  const urlPremium =
    new URLSearchParams(window.location.search).get('premium') || 'v1-combo-75'
  const chosenPremium = premiumMap[urlPremium] || v1Combo75

  // Apply the selected configuration
  window.EngridPageOptions = window.EngridPageOptions || {}
  window.EngridPageOptions.CustomPremium = chosenPremium
</script>
```

With this setup, you can use different URLs to show different premium configurations:

- `your-beautiful-ngo.org/page/1234/donate/1?premium=v1-combo-75`
- `your-beautiful-ngo.org/page/1234/donate/1?premium=v1-combo-35`
- `your-beautiful-ngo.org/page/1234/donate/1?premium=v2-combo-75`

## Alternative Configuration Format

You can also use a flatter structure without the explicit `"products"` object:

```javascript
window.EngridPageOptions.CustomPremium = {
  onetime: {
    3760: 75,
    3761: 100,
    default: '3760',
  },
  monthly: {
    3760: 15,
    3761: 25,
    default: '3760',
  },
}
```

## Behavior Details

### Selection Logic

1. **Valid Selection**: If the current selection meets the minimum amount, it remains selected
2. **Invalid Selection**: If the current selection doesn't meet the minimum:
   - Try to select the configured default (if it meets the minimum)
   - If default doesn't meet minimum, select "No Premium"
3. **Frequency Change**: When frequency changes and default is "0" or missing, automatically select "No Premium"
4. **No Visible Gifts**: When no gifts meet the criteria, hide the premium block and select "No Premium"

### Visual Feedback

The component provides smooth visual transitions:

- **Processing State**: Fades out immediately when changes occur
- **Ready State**: Fades in after processing (500ms delay)
- **Hidden State**: Completely hides the premium block when no gifts are available

### Form Integration

- Automatically clears the `transaction.selprodvariantid` field when "No Premium" is selected
- Prevents form submission with invalid premium selections
- Works seamlessly with Engaging Networks' premium gift functionality

## Setup Requirements

1. **Premium Donation Page**: Must be set up as a Premium Donation Page type
2. **Premium Gift Block**: Must include a premium gift block component
3. **All Products Visible**: Configure the premium block to show all products without frequency or amount restrictions
4. **Product IDs**: Know the product IDs for each premium gift you want to configure

## Best Practices

### URL Parameter Strategy

- Use descriptive parameter names that make testing easy
- Provide fallback configurations for invalid parameters
- Document your parameter options for other team members

### Amount Thresholds

- Set realistic thresholds based on your fundraising goals
- Consider different thresholds for different frequencies (monthly can be lower)
- Test with various donation amounts to ensure smooth transitions

### Default Selection

- Always specify a default for each frequency
- Use `"0"` as default if you want "No Premium" selected by default
- Ensure defaults are achievable with reasonable donation amounts

### Testing

- Test all frequency and amount combinations
- Verify URL parameter switching works correctly
- Check that premium block hides appropriately when no gifts are available
- Confirm form submission works with and without premium selections

## Troubleshooting

### Premium Block Not Appearing

- Verify the page is set as Premium Donation Page type
- Check that premium gift block component is added to the page
- Ensure all products are visible in the premium block configuration

### Products Not Filtering

- Confirm product IDs match exactly (as strings in configuration)
- Verify minimum amounts are set as numbers, not strings
- Check browser console for any JavaScript errors

### Selection Issues

- Ensure default product IDs exist and are valid
- Check that default products meet their own minimum requirements
- Verify "No Premium" option (product ID "0") is available

{% callout title="Need Help?" %}
If you're having trouble with the CustomPremium component, check the browser console for detailed logging. The component provides extensive logging to help diagnose configuration and behavior issues.
Make sure you have `?debug=true` or `&debug=log` in the URL to enable logging.
{% /callout %}
