---
title: Adblocker Helper Script
description: A script to help you identify adblockers and provide a better user experience.
---

# Detecting Adblockers for a Better User Experience

Adblockers are widely used by internet users to block intrusive or unwanted advertisements. However, they can also interfere with essential site functionality, analytics, or important messages. Detecting the presence of adblockers allows you to:

- Inform users when critical features are being blocked
- Offer alternative content or instructions
- Gather analytics on adblocker usage
- Provide a smoother, more transparent user experience

## Using the Adblocker Detection Script

A simple and effective adblocker detection script is available at:

**Script URL:** [https://apps.4sitestudios.com/adblocker-detection/adblocker-detection.js](https://apps.4sitestudios.com/adblocker-detection/adblocker-detection.js)

You can see a live demo and test page here:

**Test Page:** [https://apps.4sitestudios.com/adblocker-detection/ad_test.html](https://apps.4sitestudios.com/adblocker-detection/ad_test.html)

### How to Use the Script

1. **Include the Script in Your HTML**

   Add the following line to your HTML `<head>` or before your closing `</body>` tag:

   ```html
   <script src="https://apps.4sitestudios.com/adblocker-detection/adblocker-detection.js"></script>
   ```

2. **Listen for Detection Results**

   The script sets a global variable `window.hasAdBlocker` and dispatches a custom event `adblocker-detection` on the `window` object when detection completes. You can listen for this event to update your UI or take action:

   ```js
   window.addEventListener('adblocker-detection', function (e) {
     const hasAdBlocker = e.detail.hasAdBlocker
     if (hasAdBlocker) {
       // User is blocking ads
       // Show a message or take action
     } else {
       // No adblocker detected
     }
   })
   ```

   If the detection has already run, you can check `window.hasAdBlocker` directly:

   ```js
   if (window.hasAdBlocker === true) {
     // Adblocker detected
   } else if (window.hasAdBlocker === false) {
     // No adblocker detected
   }
   ```

3. **Example: Displaying a Message**

   Here is a minimal example based on the [test page](https://apps.4sitestudios.com/adblocker-detection/ad_test.html):

   ```html
   <h1>Blocking ADS? <span></span></h1>
   <script>
     const writeResponse = (message, className) => {
       const span = document.querySelector('h1 span')
       span.textContent = message
       span.className = className
     }
     document.addEventListener('DOMContentLoaded', function () {
       if (window.hasAdBlocker === null || window.hasAdBlocker === undefined) {
         window.addEventListener('adblocker-detection', function (e) {
           const hasAdBlocker = e.detail.hasAdBlocker
           if (hasAdBlocker) {
             writeResponse('Yes, you are blocking ads!', 'red')
           } else {
             writeResponse('No, you are not blocking ads!', 'green')
           }
         })
       } else {
         // Detection already ran
         const hasAdBlocker = window.hasAdBlocker
         if (hasAdBlocker) {
           writeResponse('Yes, you are blocking ads!', 'red')
         } else {
           writeResponse('No, you are not blocking ads!', 'green')
         }
       }
     })
   </script>
   ```

This approach ensures you can gracefully inform users about adblocker usage and adapt your site's behavior accordingly.
