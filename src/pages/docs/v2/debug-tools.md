---
title: Debug Tools & Development Panel
description: Learn how to use ENgrid's powerful debugging tools including the debug panel, hidden field viewer, and live variables
---
<!-- DebugPanel -->
## Debug Panel

The `DebugPanel` is a comprehensive development tool that provides quick access to common development tasks, form testing, and ENgrid configuration options.

{% callout title="You should know!" %}
The debug panel is a development tool that appears when debug mode is enabled. It's not meant for production use.
{% /callout %}

### Activation

The debug panel appears automatically when:
- `?debug=true` is in the URL, OR
- `?assets=local` is in the URL, OR
- `window.EngridOptions.debug = true` is set

### Panel Features

The debug panel provides access to:

1. **Quick-fill** - Pre-fill forms with test data
2. **Layout Switcher** - Change page layouts on the fly
3. **Theme Switcher** - Test different themes
4. **Submit Controls** - Submit or force-submit forms
5. **Branding HTML** - Toggle style guide display
6. **Edit Link** - Quick link to EN page editor
7. **Debug Session** - Control debug mode state

### Debug Panel Interface

The panel appears as a floating button in the corner labeled "Debug". Click to expand it.

```
┌─────────────────────┐
│ Debug           [X] │
├─────────────────────┤
│ Edit page           │
│ Quick-fill: [▼]     │
│ Layout: [▼]         │
│ ☐ Embedded layout   │
│ ☐ Debug layout      │
│ ☐ Branding HTML     │
│ Theme: [_____]      │
│ Sub-theme: [_____]  │
│ [Submit form]       │
│ Force submit form   │
│ End debug           │
└─────────────────────┘
```

### Quick-Fill Options

Pre-fill forms with test data for rapid testing:

| Option | Fields Filled |
| --- | --- |
| **Quick-fill - Complete** | Unique PI + Senate Address + Stripe Visa |
| **Personal Info - General** | Reusable test supporter info |
| **Personal Info - Unique** | Unique timestamped email (no duplicates) |
| **US Address - w/ Senate Rep** | 20 W 34th St, New York, NY (has representatives) |
| **US Address - w/o Senate Rep** | 3431 14th St NW, Washington, DC |
| **US Address - Nonexistent** | Invalid address for testing validation |
| **CC - Paysafe - Visa** | Valid Paysafe test card |
| **CC - Paysafe - Visa (Invalid)** | Invalid card for error testing |
| **CC - Paysafe - Mastercard** | Valid Paysafe test Mastercard |
| **CC - Stripe - Visa** | Valid Stripe test card (4242...) |

### Quick-Fill Data Examples

**Personal Info - Unique:**
```javascript
{
  "supporter.firstName": "4Site 20240225-1430",
  "supporter.lastName": "Studio",
  "supporter.emailAddress": "en-test+20240225-1430@4sitestudios.com",
  "supporter.phoneNumber": "555-555-5555"
}
```

**CC - Stripe - Visa:**
```javascript
{
  "transaction.ccnumber": "4242424242424242",
  "transaction.ccexpire": "12/27",
  "transaction.ccvv": "111"
}
```

### Layout Switcher

Dynamically change the page layout:

```typescript
// Changes data-layout attribute on body
ENGrid.setBodyData("layout", "centered-content");
```

Available layouts are populated from your theme configuration.

### Theme Switcher

Test different themes without changing EN page settings:

```typescript
// Changes data-theme attribute on body
ENGrid.setBodyData("theme", "ocean-blue");
ENGrid.setBodyData("subtheme", "dark-mode");
```

**Theme field**: Sets main theme name
**Sub-theme field**: Sets variation/sub-theme

These override the theme set in EN Page Builder.

### Submit Controls

**Submit form button:**
- Clicks the actual submit button
- Runs all validation
- Triggers ENgrid events

**Force submit form link:**
- Bypasses ENgrid entirely
- Calls native form.submit()
- Skips validation (useful for testing error handling)

### Embedded & Debug Layout

**Embedded layout checkbox:**
```typescript
// Adds data-embedded="true" to body
// Useful for testing iframe/embedded styles
```

**Debug layout checkbox:**
```typescript
// Adds data-debug="layout" to body
// Typically shows layout guides/grid
```

### Branding HTML Toggle

Shows/hides the comprehensive HTML style guide:

```typescript
brandingHtml.show(); // Loads and displays all example HTML
brandingHtml.hide(); // Hides example HTML
```

See Branding HTML documentation for details.

### Edit Page Link

Quick link to edit the current page in EN:

```javascript
// Opens in new tab:
https://[datacenter].engagingnetworks.app/index.html#pages/[pageID]/edit
```

Automatically detects data center (us, ca, eu) and page ID.

### End Debug

Removes the debug panel and clears debug session:

```typescript
// Removes debug panel from DOM
element.remove();

// Clears session storage flag
window.sessionStorage.removeItem('engrid_debug_panel');
```

Debug mode will restart if page is reloaded with `?debug=true` in URL.

### Session Persistence

The debug panel uses session storage to track debug state:

```typescript
// Sets when panel opens
window.sessionStorage.setItem('engrid_debug_panel', 'active');

// Checked to prevent duplicate panels
if (sessionStorage.getItem('engrid_debug_panel')) {
  // Panel already active
}
```

### Local Development Mode

When `?assets=local` is in URL, additional options appear:

- Embedded layout toggle
- Debug layout toggle
- Branding HTML toggle
- Sub-theme field

These are typically only useful when developing locally.

---

## Debug Hidden Fields

The `DebugHiddenFields` component converts hidden input fields into visible text fields when debug mode is enabled, making it easy to see and edit hidden values.

### Automatic Activation

Runs automatically when debug mode is enabled.

### How It Works

1. Finds all hidden input fields within EN components
2. Converts `type="hidden"` to `type="text"`
3. Adds proper EN field styling classes
4. Creates a label showing the field name
5. Wraps in proper field container markup

### Targeted Fields

Looks for hidden fields matching these selectors:
```css
.en__component--row [type='hidden'][class*='en_']
.engrid-added-input[type='hidden']
```

### Ignored Fields

Some fields are intentionally ignored:
- `transaction.paycurrency` - Currency field (can break payment processing)

### Before/After Example

**Before (hidden):**
```html
<input type="hidden" name="supporter.appealCode" value="ABC123">
```

**After (visible in debug mode):**
```html
<div class="en__field en__field--text hide" data-unhidden>
  <label class="en__field__label">Hidden field: supporter.appealCode</label>
  <div class="en__field__element en__field__element--text">
    <input type="text" name="supporter.appealCode" value="ABC123" 
           class="en__field__input en__field__input--text">
  </div>
</div>
```

### Debug Logging

Enable debug mode to see which fields are being converted:

```
🫣 Switching the following type 'hidden' fields to type 'text':
supporter.appealCode, supporter.campaignId, transaction.paycurrency
```

### Best Practices

1. **Development Only**: Only enable in development environments
2. **Check Hidden Values**: Verify hidden fields have correct values
3. **Testing Flows**: Test how hidden fields affect form submission
4. **Appeal Codes**: Common use for debugging tracking parameters
5. **Campaign IDs**: Verify campaign tracking is working

### Common Hidden Fields

- `supporter.appealCode` - Campaign tracking
- `supporter.campaignId` - Campaign identifier  
- `supporter.emailAddress` - Pre-filled email (sometimes hidden)
- `transaction.donationAmt` - Pre-set donation amount
- `supporter.questions.[id]` - Hidden question responses

---

## Logger

The `EngridLogger` class provides a styled console logging system that only outputs when debug mode is enabled, keeping production consoles clean.

### Creating a Logger

```typescript
import { EngridLogger } from ".";

const logger = new EngridLogger(
  prefix?: string,
  color?: string,
  background?: string,
  emoji?: string
);
```

| Parameter | Description | Default |
| --------- | ----------- | ------- |
| `prefix` | Text prefix for log messages (e.g., "MyFeature") | `""` |
| `color` | Text color for styled output | `"black"` |
| `background` | Background color for styled output | `"white"` |
| `emoji` | Custom emoji prefix | Auto-selected based on color |

### Auto-Emoji Selection

If no custom emoji is provided, the logger automatically selects an emoji based on color:

| Color | Emoji |
| ----- | ----- |
| `red` | 🔴 |
| `green` | 🟢 |
| `blue` | 🔵 |
| `yellow` | 🟡 (sets background to black) |
| `purple` | 🟣 |
| `black` | ⚫ |

### Example Usage

```typescript
const logger = new EngridLogger("MyFeature", "blue", "white", "🚀");

logger.log("Feature initialized");
logger.success("Operation completed");
logger.warn("Potential issue detected");
logger.danger("Critical error");
logger.error("Exception occurred");
```

### Log Methods

| Method | Description | Icon | Use Case |
| ------ | ----------- | ---- | -------- |
| `log()` | Standard log message | Custom emoji | General debugging |
| `success()` | Success message | ✅ | Confirmation of successful operations |
| `danger()` | Critical warning | ⛔️ | Serious issues requiring attention |
| `warn()` | Warning message | Custom emoji | Potential problems |
| `error()` | Error message | Custom emoji | Exception handling |
| `dir()` | Directory output | Custom emoji | Object inspection |

### Debug Mode Behavior

{% callout title="You should know!" %}
All logger methods are no-ops (do nothing) unless debug mode is enabled via `ENGrid.debug` or `?debug=log` URL parameter.
{% /callout %}

**When debug is disabled:**
- All log methods return empty functions
- Zero performance impact
- Clean production console

**When debug is enabled:**
- Styled, emoji-prefixed console output
- Color-coded by severity/type
- Easy visual scanning of logs

### Example Output

When debug is enabled, you'll see styled console output like:

```
🚀 [ENgrid MyFeature] Feature initialized
✅ [ENgrid MyFeature] Operation completed
⛔️ [ENgrid MyFeature] Critical error
```

Each message includes:
- Emoji indicator
- Prefix in brackets
- Your custom message
- Styled with configured colors

### Real-World Example

```typescript
class DigitalWallets {
  private logger = new EngridLogger("DigitalWallets", "purple", "white", "💳");
  
  constructor() {
    this.logger.log("Initializing digital wallets");
    
    if (this.isStripeAvailable()) {
      this.logger.success("Stripe SDK loaded");
    } else {
      this.logger.danger("Stripe SDK not found");
    }
  }
  
  processPayment() {
    try {
      // Payment logic
      this.logger.success("Payment processed");
    } catch (error) {
      this.logger.error("Payment failed", error);
    }
  }
}
```