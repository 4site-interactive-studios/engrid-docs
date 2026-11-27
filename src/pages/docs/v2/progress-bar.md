---
title: Progress Bar
description: Learn how to add visual progress indicators to your ENgrid pages
---

## Progress Bar

The `ProgressBar` component displays visual progress through multi-page forms or campaigns, showing users how far they've progressed or how close a campaign is to its goal.

### How It Works

The progress bar:
1. Looks for an element with `data-engrid-progress-indicator` attribute
2. Calculates percentage based on page number or custom amount
3. Animates the progress bar fill on page load
4. Displays percentage text overlay

### Basic Implementation

Add a span element with the data attribute anywhere on your page:

```html
<span data-engrid-progress-indicator></span>
```

The component automatically generates this structure:

```html
<span data-engrid-progress-indicator>
  <div class="indicator__wrap">
    <span class="indicator__progress" style="transform: scaleX(0.5);"></span>
    <span class="indicator__percentage">50<span class="indicator__percentage-sign">%</span></span>
  </div>
</span>
```

### Configuration Attributes

| Attribute | Type | Description | Default |
| --- | --- | --- | --- |
| `max` | `number` | Maximum value for percentage calculation | `100` |
| `amount` | `number` | Custom amount to display (overrides page calculation) | `0` |

### Form Page Progress

For multi-page forms, the progress calculates automatically:

```html
<!-- On page 1 of 3: shows 33% -->
<!-- On page 2 of 3: shows 67% -->
<!-- On page 3 of 3: shows 100% -->
<span data-engrid-progress-indicator></span>
```

**Calculation:**
```javascript
percentage = Math.ceil((pageNumber / pageCount) * maxValue)
```

### Campaign Goal Progress

For campaign goal tracking, set a custom amount:

```html
<!-- Shows 75% if $75,000 raised toward $100,000 goal -->
<span data-engrid-progress-indicator 
      max="100000" 
      amount="75000"></span>
```

**Calculation:**
```javascript
percentage = Math.ceil(amountValue) > Math.ceil(maxValue) 
  ? maxValue 
  : amountValue
```

{% callout title="You should know!" %}
If the amount exceeds max, it caps at 100%. This prevents the progress bar from overflowing.
{% /callout %}

### Animation

The progress bar animates using CSS transforms:
- Starts at the previous page's percentage (or 0 on page 1)
- Animates to the current percentage using `requestAnimationFrame`
- Uses `transform: scaleX()` for smooth, GPU-accelerated animation

```css
.indicator__progress {
  transform: scaleX(0);
  transition: transform 0.5s ease;
}
```

### Styling

The component creates these CSS classes for styling:

| Class | Element | Purpose |
| --- | --- | --- |
| `indicator__wrap` | Container | Wraps progress bar and percentage |
| `indicator__progress` | Bar | The filled progress bar (uses scaleX) |
| `indicator__percentage` | Text | The percentage number |
| `indicator__percentage-sign` | Symbol | The % symbol |

Example styling:

```css
.indicator__wrap {
  position: relative;
  width: 100%;
  height: 40px;
  background: #e0e0e0;
  border-radius: 20px;
  overflow: hidden;
}

.indicator__progress {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #4CAF50, #45a049);
  transform-origin: left;
  transition: transform 0.6s ease;
}

.indicator__percentage {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: bold;
  color: #333;
  z-index: 1;
}
```

### Complete Example

```html
<!-- Multi-page form progress -->
<div class="progress-container">
  <h3>Your Progress</h3>
  <span data-engrid-progress-indicator></span>
  <p>Complete all pages to finish your registration</p>
</div>

<!-- Campaign goal progress -->
<div class="campaign-progress">
  <h3>Campaign Goal</h3>
  <span data-engrid-progress-indicator 
        max="50000" 
        amount="35750"></span>
  <p>$35,750 raised of $50,000 goal</p>
</div>
```

## Best Practices

### Progress Bar
1. **Clear Context**: Add descriptive text above/below the progress bar
2. **Realistic Goals**: Set achievable max values for campaign goals
3. **Visual Hierarchy**: Make progress bars prominent but not overwhelming
4. **Accessibility**: Ensure sufficient color contrast for the progress bar
5. **Responsive Design**: Test at different screen widths

## Troubleshooting

### Progress Bar Not Appearing
- Verify element has `data-engrid-progress-indicator` attribute
- Check if on a multi-page form (pageCount and pageNumber must exist)
- Ensure ENGrid is properly initialized
- Look for JavaScript console errors

### Progress Bar Not Animating
- Confirm CSS transitions are not disabled
- Check if `requestAnimationFrame` is supported
- Verify percentage changed from previous value

## Related Components

- [Ticker](./ticker) works great on donation pages to show social proof
