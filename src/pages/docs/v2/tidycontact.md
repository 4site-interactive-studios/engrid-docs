---
title: TidyContact
description: How to integrate TidyContact into your ENGrid installation
---

TidyContact is an additional functionality built into ENGrid that allows addresses submitted on Engaging Networks forms to be validated by 4Site's Address Standardization API. Using this implementation requires a cid issued by 4Site.

TidyContact Email, which validates email addresses, is configured separately with its own option. See [TidyContact Email](#tidycontact-email) below.

To learn more about TidyContact in general, you can visit [our product demonstration site](https://www.4sitestudios.com/products/4site-tidycontact-address/).

## Create Custom Supporter Fields (Optional)

If you would like TidyContact Address to record the results of the API call, including the original user entered address, the date the call was made, and the returned status, then you need to create three custom supporter fields on your Engaging Networks Account to store this information. The field type should be "hidden" and you will need to add the fields to a form in order to get their actual source code `names`. When creating the three custom fields, we suggest the following field names:

- TidyContact Address Record
- TidyContact Address Date
- TidyContact Address Status

After you've created them, add them to a testing form and then inspect the source code of the page to get their values. For example, this markup of a hidden field has the code-level name `supporter.NOT_TAGGED_3`.

```html
<input
  type="hidden"
  class="en__field__input en__field__input--hidden"
  name="supporter.NOT_TAGGED_3"
  value=""
/>
```

Make note of each as you will need to add these three field names to the ENGrid configuration in your client theme. You do not need to include the fields on the page itself, our code will automatically add them.

## Configuration Options

Every option can be configured in your client theme options. 

- **cid** - Address Standardization Client ID (**required**).
- **page_types** - What type of Engaging Networks pages (advocacy, donation, etc) TidyContact is permitted to run on, by default runs on all pages.
- **record_field** - Address Standardization Record. Set the field name to store the Address Standardization Record Data. Usually a hidden field.
- **date_field** - Address Standardization Date. Set a field name to store the date. Every time the Address Standardization service is called, this field will be updated.
- **status_field** - Address Standardization Status. Set a field name to store the status of the last Address Standardization attempt.
- **countries** - Countries that are allowed to use the API, if empty, all countries are allowed.
- **country_fallback** - Fallback country if the country field is not found
- **us_zip_divider** - The divider used in US zip codes
- **address_enable** - Enable address fields to be processed by TidyContact `default: true`
- **address_fields** - Individual configuration of what fields TidyContact should be looking at to parse addresses, typically these should be left as default which will read the standard Engaging Networks configuration
- **phone_enable** - Enable phone fields to be processed by TidyContact 
- **phone_country_from_ip** - Corrects phone number country codes based on IP location
- **phone_preferred_countries** - Prioritize listing country codes on the list

## TidyContact Email

TidyContact Email validates the supporter's email address in real time: when the supporter leaves the email field and again on submit. Unlike TidyContact Address and Phone, it runs on its own script hosted by the TidyContact Email relay. ENgrid's `TidyContactEmail` option loads that script for you with the right settings, at the right moment (after ENgrid's own validation hooks are in place), so there is no `<script>` tag to paste into the page template.

### Enable it

Add the option to your client theme and set the client key issued by 4Site:

```ts
const options: Options = {
  TidyContactEmail: {
    clientKey: "<CLIENT_UUID>",
  },
};
```

To turn it off on a single page, add `window.EngridPageOptions = { TidyContactEmail: false };` to that page.

The client key is public (it ends up in the page source), so 4Site restricts each key to the client's own domains. Make sure the domain your Engaging Networks pages are served from is on that list, otherwise the form still submits but no email is validated.

### Configuration options

- **clientKey** - TidyContact Email client ID (**required**).
- **relayUrl** - TidyContact Email relay. `default: https://email-validator.4sitestudios.com`
- **version** - Version of the TidyContact Email script. `"v1"` always gets the latest fixes; an exact version such as `"1.0.0"` freezes it. `default: "v1"`
- **scriptUrl** - Full script URL override, for local or staging builds only.
- **timeoutMs** - How long to wait for the relay before letting the form through without validation. `default: 3000`
- **hardBlock** - When `true`, an invalid email blocks submission. When `false`, the supporter sees the error but can still submit. If the service is slow or unavailable, the form always submits. `default: false`
- **prefillSkip** - Does not check the email Engaging Networks prefilled on the supporter's first visit to the page. `default: true`
- **enRecognition** - Reports supporters arriving from Engaging Networks campaign links. Leave it off unless 4Site asks you to enable it. `default: false`
- **pageTypes** - Which Engaging Networks page types (`"DONATION"`, `"SUBSCRIBEFORM"`, etc.) TidyContact Email runs on. By default it runs on all pages with an email field.

### When it does not run

ENgrid skips TidyContact Email (and logs the reason with `?debug=true`) when:

- `clientKey` is missing
- the URL has `?bypassemailvalidation`
- the page has no email field, or its page type is not in `pageTypes`
- NeverBounce or FreshAddress is also enabled (only one email validator per page is supported)
- the TidyContact Email script was already added to the page manually

You can check whether it loaded in the browser console with `document.body.dataset.engridTidycontactEmail`, which returns `"loading"`, `"loaded"` or `"error"`.
