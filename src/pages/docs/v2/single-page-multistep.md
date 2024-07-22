---
title: Single-Page Multistep Form
description: How to set up and use a single page multistep form
---

{% callout title="Information" %}
The single-page multistep form is not available by default in your ENgrid theme and requires some extra set up. If you are interested in this feature, please contact us for more information.
{% /callout %}

## Overview

The single-page multistep form splits your form into multiple stages on a single page, breaking it down into smaller, more manageable sections.

## How it works

4Site will set up a reference page for you to use as a template. The page will work exactly like any other ENgrid donation page, but with some enhancements to create the multistep experience.

- You will see some extra custom code blocks on the page. These are used to create the multistep form.
- Several of these code blocks will be for the "Stepper" element (that shows the user the steps available on the form, and the current active step). You can customize the form's layout by dragging elements in page builder between these stepper code blocks. 
- For example, elements between the first and second stepper element will all be displayed on the first step of the form. Elements between the second and third stepper element will be displayed on the second step, and so on. You can add extra steps by copying the stepper code block.

In most cases, you won't need to make any extra changes to the page. All the regular ENgrid page functionality will work as expected.

## Advanced customization

The multistep form makes use of the following data attributes to control the form's behavior. You can use these atrributes to add custom styling or behaviour to your form.

- `data-engrid-multistep-active-step` - This attribute is added to the page's `body` element and signals which step number is current active on the page. For example, `data-engrid-multistep-active-step="1"` means the first step is active on the page.
- `data-engrid-multistep-step` - This attribute is added to all your form elements and signals which form step the element is part of. For example, `data-engrid-multistep-step="1"` means the element is associated with the first step of the form, and will only be displayed when the first step is active. This attribute is added automatically to all form elements between stepper code blocks.
- `data-multistep-change-step` - This attribute is added to elements that, when clicked, will change the currently active step. For example, `data-multistep-change-step="2"` means that when the element is clicked, the form will move to the second step. When the step is changed, form validation for the active step will be triggered.
