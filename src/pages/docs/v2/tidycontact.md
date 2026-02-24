---
title: TidyContact
description: How to integrate TidyContact into your ENGrid installation
---

TidyContact is an additional functionality built into ENGrid that allows addresses submitted on Engaging Networks forms to be validated by 4Site's Address Standarization API. Using this implementation requires a cid issued by 4Site.

## Create Custom Supporter Fields (Optional)

If you would like TidyContact Address to record the results of the API call, including the original user entered address, the date the call was made, and the returned status, then you need to create three custom supporter fields on your Engaging Networks Account to store this information. The field type should be "hidden" and you will need to add the fields to a form in order to get their actual source code `names`. When creating the three custom fields, we suggest the following field names:

- TidyContact Address Record
- TidyContact Address Date
- TidyContact Address Status

After you've created them, add them to a testing form and then inspect the source code of the page to get their values. For example this example markup of hidden field has a code level name of `supporter.NOT_TAGGED_3`.

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
- **page_types** - What type of Engaging Network pages (advocacy, donation, etc) TidyContact is permitted to run on, by default runs on all pages.
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
