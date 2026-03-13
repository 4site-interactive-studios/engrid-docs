---
title: Deploying ENgrid Assets
description: Learn how to deploy your custom ENgrid assets to Engaging Networks for production use.
---

## Overview

Once you've customized your ENgrid theme and are ready to deploy your changes to production, you'll need to build the production files and upload them to Engaging Networks. This process involves generating the minified CSS and JS files and replacing the existing assets in your Engaging Networks account.

## Building production files

To build your client theme, run the following command in your terminal:

```shell
npm run build
```

Then, upload the `engrid.min.css` and `engrid.min.js` files from your `/dist` folder to Engaging Networks, overwriting the existing assets.

{% callout title="You should know!" %}
Before doing this you should thoroughly test your changes using a Github branch, especially if you're upgrading engrid versions. See [previewing your changes](./developing-with-engrid#previewing-your-changes) for more details.
{% /callout %}

It may take some time for Engaging Networks to refresh its cached assets. Until then, you can preview the changes by using the `?assets=flush` URL parameter, which will apply cache-busting to the assets.

{% callout title="Helpful tip!" %}
If you've been changing the template files in Engaging Networks, you may want to update the URL for the uploaded files in your template to ensure you’re loading the correct assets.
{% /callout %}

## Removing development/debug assets, copies, code blocks, and test settings

Make sure to remove any development and debugging assets, copies, code blocks, and settings from your Engaging Networks pages before deploying to production. This includes:

### Page Builder Blocks

- If you've been making use of code blocks in your page builder pages for development and debugging purposes, you should remove these before deploying to production. This includes any code blocks that load local/branch assets (e.g., `window.EngridLoader`) or include debug elements.

- If you've been changing text copies to display debug information, make sure to change these back to the intended production copy.

- Any links and iframes used on your pages should be scrubbed of URL parameters used for testing and development (e.g., `?assets=branch-name`, `?debug=true`, etc.) to ensure the correct production experience for users.

- Any copies, code blocks, and form blocks that you "Unlinked" from the library for testing purposes should be relinked and updated to the new production content, so long as the reason for unlinking was not entirely for testing purposes. This will ensure you can continue to make global updates to these blocks in the future, and that the client is using the correct production content.

  - Make note of any blocks that were unlinked for non-testing reasons (e.g., to make customizations that are not compatible with the library version) so you can ensure these are updated with the correct production content and relinked if possible, especially if this is the responsibility of the client after handoff.

### Page Builder Settings

#### Transitioning a page from development to production

- **On payment pages**, ensure you change the payment gateway from "Test" to "Live" to avoid test transactions.

- Move the page from the "Testing" folder to the appropriate production folder in Engaging Networks.

- Check the "Clear data" option in the Page Builder settings to ensure that any test data is cleared from the page. **IF AND ONLY IF** you are sure you want to clear all data from the page, as this action cannot be undone.

- Set the page status to "Live" in Engaging Networks to ensure the page is publicly accessible.

- Check if "Automatically Expire" is enabled or should be enabled.

- Check the page name and title for accuracy and update if needed.

  - When creating reference pages, put "Reference" in the page name.

#### Development pages not intended for production use

- Remove any test pages that were created for development purposes, unless these are intended to be used as reference pages for the client after handoff. 

  - You may choose to keep these pages in the development folder as "Closed" for future reference.

---

{% callout title="Information" %}
For a non-technical overview of the release and deployment process, see [Release Cycle & Code Updates](/docs/v2/release-cycle).
{% /callout %}