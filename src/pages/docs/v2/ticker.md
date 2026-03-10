---
title: Ticker
description: Learn how to add animated content tickers to your ENgrid pages
---

## Overview

The `Ticker` component creates an animated scrolling ticker that displays a randomized list of items (like donor names, locations, or messages). Items are shuffled daily using a seed based on the date and page ID.

### How It Works

The ticker:
1. Finds an element with class `engrid-ticker`
2. Extracts list items from within the ticker
3. Shuffles items using a daily seed (date + page ID)
4. Selects a subset based on time of day
5. Renders an animated CSS-based ticker

{% callout title="You should know!" %}
The ticker uses the same shuffled order for all users on a given day for a specific page, creating consistency while still providing variety day-to-day.
{% /callout %}

### Basic Implementation

Create a list with class `engrid-ticker`:

```html
<div class="engrid-ticker" data-total="50">
  <ul>
    <li>John from New York donated $50</li>
    <li>Sarah from California donated $100</li>
    <li>Mike from Texas donated $25</li>
    <li>Emma from Florida donated $75</li>
    <!-- Add more items -->
  </ul>
</div>
```

### Configuration

| Attribute | Type | Description | Default |
| --- | --- | --- | --- |
| `data-total` | `number` | How many items to display in the ticker | `50` |

### Shuffling Algorithm

The ticker uses a deterministic shuffle based on:
- Current date (day of month)
- Page ID from Engaging Networks

```javascript
seed = new Date().getDate() + ENGrid.getPageID()
items = shuffleSeed.shuffle(items, seed)
```

This ensures:
- Same order for all users on the same day
- Different order each day
- Consistent order for the same page

### Time-Based Selection

Items are selected based on the current time, creating a "sliding window":

```javascript
const hour = now.getHours()
const minute = now.getMinutes()
let pointer = Math.round((hour * 60 + minute) / 5)
```

- Updates every 5 minutes
- Different users see different subsets throughout the day
- Creates the illusion of real-time updates

### Rendered Structure

The ticker transforms into this structure:

```html
<div class="en__component en__component--ticker">
  <div id="engrid-ticker">
    <div class="ticker">
      <div class="ticker__item">John from New York donated $50</div>
      <div class="ticker__item">Sarah from California donated $100</div>
      <div class="ticker__item">Mike from Texas donated $25</div>
      <!-- More items -->
    </div>
  </div>
</div>
```

### Styling

The ticker uses CSS custom properties for animation:

```javascript
ticker.style.setProperty("--ticker-size", tickerWidth)
```

Example CSS for animated scrolling:

```css
.ticker {
  display: flex;
  width: fit-content;
  animation: scroll var(--ticker-duration, 60s) linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-1 * var(--ticker-size, 1000px)));
  }
}

.ticker__item {
  flex-shrink: 0;
  padding: 10px 20px;
  white-space: nowrap;
}
```

### Complete Example

```html
<div class="engrid-ticker" data-total="30">
  <ul>
    <li>Amanda donated $50 • 5 minutes ago</li>
    <li>Robert donated $100 • 12 minutes ago</li>
    <li>Lisa donated $25 • 18 minutes ago</li>
    <li>David donated $75 • 24 minutes ago</li>
    <li>Jennifer donated $150 • 31 minutes ago</li>
    <li>Michael donated $50 • 37 minutes ago</li>
    <li>Sarah donated $200 • 42 minutes ago</li>
    <li>James donated $30 • 48 minutes ago</li>
    <li>Emily donated $85 • 54 minutes ago</li>
    <li>Christopher donated $120 • 1 hour ago</li>
    <!-- Add 20+ more items for variety -->
  </ul>
</div>

<style>
.ticker {
  display: flex;
  animation: scroll 120s linear infinite;
  background: #f5f5f5;
  padding: 15px 0;
}

@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-1 * var(--ticker-size))); }
}

.ticker__item {
  padding: 0 30px;
  white-space: nowrap;
  font-size: 16px;
  color: #333;
}
</style>
```

### Debug Logging

Enable debug mode to see information about the ticker's shuffling and rendering process in the browser console.

Look for `[🔁 Ticker]` in console logs.


## Best Practices

### Ticker
1. **Sufficient Items**: Provide at least 30-50 items for good variety
2. **Consistent Format**: Keep all ticker items in a similar format
3. **Appropriate Speed**: Adjust animation duration for readability
4. **Mobile Optimization**: Test ticker on mobile devices
5. **Realistic Content**: Use believable donor names and amounts
6. **Privacy**: Use first names only or anonymize donor information

## Troubleshooting

### Ticker Not Appearing
- Ensure element has class `engrid-ticker`
- Verify list items exist inside the ticker element
- Check that ENGrid page ID is available
- Look for console logs from EngridLogger

### Ticker Not Animating
- Verify CSS animations are working in browser
- Check that `--ticker-size` property is set
- Ensure ticker width is calculated correctly
- Test CSS animation duration

## Related Components

- [Progress Bar](./progress-bar) can be used alongside the ticker to show campaign progress
