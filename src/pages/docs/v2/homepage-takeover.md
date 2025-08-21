---
title: Homepage Takeover
description: This page shows how to set up a website homepage takeover using Engaging Networks and GTM so your donation form can "take over" a site visitor's screen.
---

## Overview

A Homepage Takeover is a sitewide redirect to a designated Engaging Networks (EN) page that runs only on specific dates. It’s implemented via a Google Tag Manager (GTM) tag with a very high firing priority (e.g., 999999) so that it loads quickly on the page. When active, all visitors are redirected to the EN landing page, and any URL arguments from the original request are preserved during the redirect.

This can be useful to drive traffic to your donate form or call attention to a big fundraising campaign, like end of year.

---

## How It Works

*   On the EN page, a conditional message bar appears at the top, giving visitors the option to return to the page they came from.
*   When they return, a special `no-redirect` URL argument is appended.
*   The GTM tag detects this argument and sets a 24-hour suppression cookie, ensuring visitors aren’t redirected again during that period—even if the argument disappears on subsequent page loads.

---

## Setup Instructions

### On the EN page

1.  Create a new code block called “Homepage Takeover Redirect Back” using the following code, then save it to the component library and add it to the bottom of both the landing page and the thank-you page:

```javascript
/* Code to be added to the page(s) the visitor will have been redirected to */

(function() {
  const queryParams = new URLSearchParams(window.location.search);
  const isRedirected = queryParams.has("was-redirected");
  const isInIframe = window.self !== window.top;
  const originatingUrlParam = queryParams.get("originating-url");
  const originatingUrlCookie = getCookie("originatingUrl");

  // Get cookie by name
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let c of ca) {
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
  }

  // Set cookie with expiration (in seconds)
  function setCookie(name, value, seconds) {
    const date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  }

  // Save originating URL to cookie if present
  if (originatingUrlParam) {
    setCookie("originatingUrl", originatingUrlParam, 1800);

    // Remove the originating-url argument from the URL
    queryParams.delete("originating-url");
    const newQueryString = queryParams.toString();
    const newUrl = `${window.location.pathname}${newQueryString ? '?' + newQueryString : ''}`;

    // Update the browser URL without reloading the page
    window.history.replaceState(null, "", newUrl);
  }

  const originatingUrl = originatingUrlParam || originatingUrlCookie;

  // Declare bar outside of the if block so it can be accessed globally within the function
  let bar;

  // Function to adjust the body's margin based on the banner height
  function adjustBodyMargin() {
    if (bar) {
      const barHeight = bar.offsetHeight;
      document.body.style.marginTop = `${barHeight}px`;
    }
  }

  // Show banner if redirected, in iframe, or cookie exists
  if (isRedirected || isInIframe || originatingUrlCookie) {
    bar = document.createElement("div");
    bar.style = "position:fixed;top:0;width:100%;background-color:#00689f;color:#fff;padding:15px 10px;text-align:center;z-index:9999;box-sizing:border-box;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;";
    
    // Create return link
    const returnLink = document.createElement("a");
    returnLink.href = originatingUrl || "#";
    returnLink.innerHTML = "Click here to continue to example.org";
    returnLink.style = "color:#ffffff;text-decoration:underline;";
    
    // Append elements to banner
    bar.appendChild(returnLink);
    document.body.appendChild(bar);

    // Use requestAnimationFrame to ensure the banner is fully rendered before adjusting margin
    requestAnimationFrame(adjustBodyMargin);

    // Handle window resize
    window.addEventListener('resize', adjustBodyMargin);

    // Handle return link click
    returnLink.addEventListener("click", function(e) {
      e.preventDefault();
      queryParams.delete("was-redirected");
      queryParams.delete("originating-url");

      // Redirect back using the original URL from the cookie, adding `no-redirect`
      const originalUrl = new URL(originatingUrl || document.referrer || "/");
      originalUrl.searchParams.set("no-redirect", "");

      window.location.href = originalUrl.toString();
    });
  }
})();
```

### In GTM
#### Create a Tag
Create a tag named “Homepage Takeover” (set Tag Firing Priority to a very high number, e.g., 999999) and use the following code. Set the specific takeover date(s) and the target EN page URL(s). You may include URL arguments for tracking (e.g., ?source=homepage_takeover). If you’re scheduling multiple days with the same EN page, repeat the URL configuration for each date.

```javascript
<script>
/* Added by 4Site Studios

This script manages time-based redirections for specific dates on our landing pages. It checks the current date and, if it matches a target date, redirects users to a designated URL for that day. The script also includes a suppression feature: it sets a cookie to prevent multiple redirects within a 24-hour period and allows users to opt out of redirection by  adding a 'no-redirect' parameter to the URL. Additionally, any query parameters from the original URL are preserved and passed along to the redirect destination.
*/
  
(function() {
var urlsByDate = {
    "12-03": "https://support.example.org/page/12345/donate/1",
    "12-30": "https://support.example.org/page/54321/donate/1",
    "12-31": "https://support.example.org/page/12345/donate/1",
    "06-30": "https://support.example.org/page/54321/donate/1"
};

var suppressionCookie = "redirectSuppressed";
var queryParams = new URLSearchParams(window.location.search);

// Function to set a cookie with an expiration date
function setCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Days to milliseconds
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

// If no-redirect is present, set the suppression cookie for 24 hours and exit
if (queryParams.has("no-redirect")) {
    setCookie(suppressionCookie, "true", 1); // Set suppression cookie for 1 day
    return;
}

// Check for suppression cookie
if (document.cookie.indexOf(suppressionCookie) !== -1) {
    return; // Suppression is active, so exit
}

// Function to build redirect URL with original parameters, was-redirected, and originating URL
function buildRedirectUrl(redirectUrl) {
    var redirectParams = new URLSearchParams(queryParams.toString());
    redirectParams.append("was-redirected", "");
    redirectParams.append("originating-url", window.location.href);
    var separator = redirectUrl.indexOf('?') === -1 ? '?' : '&';
    return redirectUrl + separator + redirectParams.toString();
}

// Get the current date or the simulated date from query params
function getCurrentOrSimulatedDate() {
    var simulateDate = queryParams.get("simulate-date");
    if (simulateDate && /^\d{2}-\d{2}$/.test(simulateDate)) {
    return simulateDate; // Use the simulated date if provided and valid
    }
    var today = new Date();
    return String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0');
}

// Check if the date is one of the specified target dates
var todayFormatted = getCurrentOrSimulatedDate();

if (urlsByDate[todayFormatted]) {
    // Set the suppression cookie before redirecting to prevent further redirects
    setCookie(suppressionCookie, "true", 1); // Set suppression cookie for 1 day

    // Redirect to the corresponding URL
    window.location.href = buildRedirectUrl(urlsByDate[todayFormatted]);
}
})();
</script>

```
#### Preview Your Changes in GTM
*   Use GTM’s Preview Mode to test your setup.
*   Because the redirect is date-based, you can simulate a future date by appending the `simulate-date` parameter to your site URL.
*  Example: `https://example.org?simulate-date=06-30`

This will trigger the takeover as if it were live on June 30.

#### Publish Your Changes

Once you've tested your changes, publish your updated GTM container.

---

### Final Note on Implementation

While GTM is a convenient way to implement homepage takeovers, another fast and reliable approach is to add the JavaScript inline in your website’s `<head>` section.

*   This ensures the redirect happens as early as possible in the page load.
*   It also guarantees functionality for visitors running ad blockers (which may prevent GTM-based scripts from firing).