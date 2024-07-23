---
title: WordPress Promotions Plugin Overview
description: Information about the 4Site WordPress Promotions Plugin
---

Built by 4Site Studios to solve your on-site promotional needs, our plugin helps launch fundraising lightboxes, pushdowns, pop-ups, embedded donation experiences, and so much more.

Imagine scheduling a sitewide fundraising lightbox to appear for a week before automatically coming down and being replaced by a sitewide pushdown for two more weeks promoting signups for your latest campaign. Or tailoring that fundraising lightbox so its imagery and contents correspond to different sitewide landing pages. That's just a taste of what the Promotions Plugin can do. All promotions can be managed with no coding experience, but you can always add your own custom HTML, CSS, and JavaScript.

## Overview

The Promotions Plugin evolved from the need to create various types of on-site promotions like lightboxes and overlays for multiple clients using WordPress. Initially built as individual solutions, these promotions were unified into a single framework to facilitate easier updates and feature enhancements across clients.

## Features

**Promotion Types**

- **EN Multistep Lightbox**: Creates a multistep lightbox that includes an embedded Engaging Networks donation page. Must be used with purpose-built EN multistep pages. [Example]
- **EN Lightbox**: Displays a single-step embedded Engaging Networks page, ideal for newsletter signups and petitions.
- **CTA Lightbox**: Features one or more calls to action with customizable styling. [Example 1] / [Example 2]
- **Overlay**: Can appear as a modal or full site takeover with donation buttons that pass their values to a corresponding Engaging Networks Donation page.
- **Pushdown**: Creates a banner at the top of the page that links to another page, either as text or an image. [Example]
- **Roll Up**: A small modal at the bottom of the screen that follows the user as they scroll until closed.
- **Floating Tab**: Adds a floating tab to your website that can link to a page or trigger another promotion like the Multistep Donation Lightbox. [Example]
- **Raw Code**: Lets you run custom HTML, CSS, and JavaScript.

**Trigger Options**

- Each promotion can be triggered immediately, after a set number of seconds, after a specific number of pixels scrolled, after a percentage of the page scrolled, on exit intent, or via a custom JavaScript trigger.
- Define suppression cookie names and expiration times to prevent visitors from being overwhelmed by promotions.
- Specify display rules for all pages or specific URL patterns with suppression lists to control visibility.
- Only the most recently created promotion will be shown if multiple lightbox-type promotions are scheduled on the same page.

**Blocks & Shortcodes**

- Provides a Gutenberg block and shortcode to embed an Engaging Networks form. The block can be found under the "Embeds" category.
- The shortcode is `[en-form]`. Refer to `en-form/README.md` for more information.

**Advanced Features**

- **Scheduling**: Schedule promotions to run down to the minute with support for Cloudflare cache busting. Plan your campaigns and let everything run on autopilot.
- **EN Shortcode and Gutenberg Support**: Embed Engaging Networks pages built with our ENgrid page template framework inline with your content, keeping actions contextual.

**User-Friendly Interface**

- Designed for content admins to easily manage and deploy promotions.

[![Promotions Listing Page](/images/promotions-plugin-listing.png)](/images/promotions-plugin-listing.png)
[![Promotions Form](/images/promotions-plugin-form.png)](/images/promotions-plugin-form.png)

## Documentation and Customization

To enhance usability, the plugin includes detailed written documentation, ensuring new users can confidently navigate and utilize the features. While the interface is designed to be user-friendly, the option to add custom HTML, CSS, and JavaScript provides flexibility for advanced customization.

## Integration

The plugin integrates seamlessly with Engaging Networks forms, creating unified and effective user experiences. It also supports standalone promotions, allowing for versatile applications across different client needs.

## Development Notes

- The URL for the multistep donation lightbox script must be specified in the Promotions Options page for the multistep donation promo type to work.
- Critical code for this plugin is located in the `/public/` folder.
- ACF (Advanced Custom Fields) is required for the plugin to function. It uses two fieldsets: "Foursite WordPress Promotions Plugin" and "Promotions Settings."
- ACF fields are imported via `/includes/acf-fields.php`, a PHP export of the fields.

## Custom Post-Type Registration

- Custom post-type registration and the ACF options page are both managed in `/admin/options.php`.

## Testing Considerations

- Verify the order of promotions (by date DESC) and ensure scheduled promotions take precedence over always-on promotions.
- Ensure only one overlay/modal type promotion shows at a time.
- Verify all trigger types work correctly: scroll length (pixels), scroll length (percentage), exit intent, JavaScript trigger, and time delay.
- Ensure the floating tab promo correctly launches the lightbox modal even if another lightbox has already opened.
- Test all six types of promotions: Multistep Lightbox, Raw Code, Pushdown, Floating Tab, Overlay, and Roll Up.

## Installation

1. Download the latest zipped version of the plugin from [GitHub](https://github.com/4site-interactive-studios/4site-wordpress-promotions).
2. Unzip and rename the source directory to `4site-wordpress-promotions`.
3. Move the directory to the `wp-content/plugins` directory of your WordPress installation.
4. Install the latest version of Advanced Custom Fields Pro.
5. Activate ACF from the Plugins administration.
6. Activate the Promotions plugin from the Plugins administration.
