---
title: Working on your ENgrid theme code
description: Quidem magni aut exercitationem maxime rerum eos.

---


## Making changes to the SCSS or JS files

For SCSS you’ll find the majority of your code in the `/src/sass/page-template-styles.scss` file. 

The majority of styles can be customized via CSS custom properties.

{% callout title="You should know!" %}
These properties are named with the convention: `{component__name}-{property_name}_{modifier}`.
{% /callout %}




For JS your theme will contain a `/src/scripts/main.js` file. Here you can add any extra JavaScript customizations you might need. `/src/index.ts` is the entry point for loading the ENgrid application. You can modify the Options here to customize the ENgrid components loaded and their functionality. 

Refer to the [engrid-scripts](https://github.com/4site-interactive-studios/engrid-scripts) source for more information.

### Previewing your changes

When working localling your can add `?assets=local` to your URL and ENgrid will load your local assets from `https://your-repo-name.test`.

To preview remote changes on a Github repository, first create a Git branch with your changes on it and push that to Github. 

Then, you can use the assets URL parameter `?assets=your-branch-name` to load in those assets from Github without needing to deploy them elsewhere.

---

## Building and deploying production files

Once you’re happy with everything, you can compile the final assets with


```shell
npm run build
```

Then, upload the engrid.min.css and `engrid.min.js` files from your `/dist` folder to Engaging Networks, overwriting the existing assets.

{% callout title="You should know!" %}
Before doing this you should thoroughly test your changes using a Github branch, especially if you’re upgrading engrid-scripts versions.
{% /callout %}

It may take some time for Engaging Network to refresh its cached assets. Until then, you can preview the changes by using the `?assets=flush URL parameter`, which will apply cache-busting to the assets.





