---
title: Session Storage
description: All the different ways ENgrid uses Session Storage in the browser.
---

- **engrid-transaction-recurring-frequency** - Contains the frequency of a completed gift (one-off, monthly, etc)
- **ENGRID_END_OF_GIFT_PROCESS_EVENTS** - Used by the Upsell Lightbox component. An array of events to push to dataLayer after a donation is completed; for example on the donation thank you page.
- **original** - Used by the Upsell Lightbox component: Contains the original donation amount value when the upsell lightbox is used.
- **engrid_debug_panel** - Used by the Debug Panel component. Used to persist if the debug panel is active across page views.

## Client Specific Storage

- **(WWF only) engrid-ttt-data** - Contains tweet-to-target data for custom TTT functionality. Remembers the targets a user has already tweeted.
