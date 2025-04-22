---
title: Post-Donation Donation
description: Add a Donation page to your Thank You page
---

## How it works

The Post-Donation Embed feature allows you to embed a donation form directly on your thank you page, giving supporters the opportunity to make an additional donation immediately after completing their first transaction, with minimal friction in a auto-filled form.

This component:

- Only works on Thank You pages
- Only functions when the current page is NOT embedded as an iframe
- Searches for an `<engrid-post-donation>` tag on your thank you page
- Replaces this tag with an iframe containing your donation form
- Automatically passes supporter data from the first donation to the embedded form

## How to enable the Post-Donation to your ENgrid Theme

ENgrid includes this feature by default - no additional setup is required in your theme. Simply ensure you're using ENgrid version that includes the Post-Donation Embed component (**>v0.21.0**).

## Adding the Post-Donation to your Thank You Page

Add the `<engrid-post-donation>` tag to your thank you page where you want the donation form to appear:

```html
<engrid-post-donation></engrid-post-donation>
```

### Configuration Options

The tag supports these attributes:

1. **src** (optional): Specify the URL of the donation page to embed

   ```html
   <engrid-post-donation
     src="https://support.example.org/page/12345/donate/1"
   ></engrid-post-donation>
   ```

   {% callout type="install" title="Heads Up" %}
   The `src` attribute is optional. If not provided, the current page's URL will be used, but with "/donate/2" replaced by "/donate/1". More details on this to set up your page to act both as a parent donation page and a post-donation page below.
   {% /callout %}

2. **params** (optional): Additional URL parameters to pass to the iframe

   ```html
   <engrid-post-donation
     params="engrid_hide[body-headerOutside]=class&engrid_hide[body-banner]=class&engrid_hide[content-header]=class&engrid_hide[content-footer]=class&engrid_hide[page-backgroundImage]=class&engrid_hide[en__field--paycurrency]=class&engrid_hide[charity-logos-wrapper]=class&engrid_hide[en__field__item--other]=class&engrid_hide[en__field--recurrfreq]=class&transaction.recurrfreq=ONETIME&transaction.donationAmt=10"
   ></engrid-post-donation>
   ```

   On the example above, we are hiding the header and footer of the page, as well as the currency selector and the "Other" amount field. We are also setting the default donation amount to 10 and the frequency to "One Time".

3. **amounts** (optional): Comma-separated list of donation amounts to display
   ```html
   <engrid-post-donation amounts="5,10,15"></engrid-post-donation>
   ```

### Complete Example

```html
<engrid-post-donation
  src="https://support.example.org/page/12345/donate/1"
  params="engrid_hide[body-headerOutside]=class&engrid_hide[body-banner]=class&engrid_hide[content-header]=class&engrid_hide[content-footer]=class&engrid_hide[page-backgroundImage]=class&engrid_hide[en__field--paycurrency]=class&engrid_hide[charity-logos-wrapper]=class&engrid_hide[en__field__item--other]=class&engrid_hide[en__field--recurrfreq]=class&transaction.recurrfreq=ONETIME&transaction.donationAmt=10"
  amounts="5,10,15"
>
</engrid-post-donation>
```

## Creating a Post-Donation Page on Engaging Networks

You can either create a new page to use exclusively as an embedded donation page, or you can use the same page as both a parent donation page and a post-donation page.

### Creating a New Page

1. Create a new donation page in your Engaging Networks account.
2. Hide all the fields you don't want to show on the post-donation page. This includes the header, footer, and any other elements that are not relevant to the donation process.
3. Set the payment methods and amounts you want to offer on the post-donation page.
4. Save the page and publish it.
5. Copy the URL of the page.
6. Open the Donation Page you want to use as a Parent page.
7. Go to the "Thank You" tab and add the `<engrid-post-donation>` tag to the thank you page.
8. Add the URL of the new page to the `src` attribute of the `<engrid-post-donation>` tag.
9. Save the changes and make a Test Donation to see the post-donation page in action.

### Using the Same Page for Both Parent Donation and Post-Donation

You can use the same page for both parent donation and post-donation by relying on ENgrid's custom CSS classes to show/hide elements based on whether the page is being viewed as a standalone page or as an embedded iframe:

#### `hideif-iframe`

This class will hide the element when the page is embedded as an iframe. You can add this class to every Text Block, Image Block, or any other element you want to hide when the page is embedded.

#### `showif-iframe`

This class will show the element only when the page is embedded as an iframe. You can add this class to every Text Block, Image Block, or any other element you want to show when the page is embedded.

**Notes:**

- The Post-Donation Embed only works on thank you pages and when the page is not itself embedded as an iframe.
- The `src` attribute is optional. If not provided, the current page's URL will be used, but with "/donate/2" replaced by "/donate/1".
- The `params` attribute allows you to pass additional parameters to the embedded form, such as suggested donation amounts or currency.

{% callout type="warning" title="IMPORTANT!" %}
We will automatically add the `?chain` parameter in the URL of the iFrame. This parameter is used to load the supporter's data from the parent page to the iFrame. This way, we can hide all the fields and show only the amounts and Payment Methods.
{% /callout %}
