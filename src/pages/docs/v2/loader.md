---
title: ENGrid Loader
description: The Loader class manages dynamic asset loading, allowing developers to swap ENgrid CSS and JavaScript files for local development and testing
---

## Overview

The ENgrid Loader provides a mechanism to dynamically load different versions of ENgrid assets (CSS and JavaScript) without modifying the Engaging Networks page template. This is particularly useful for local development, testing different branches, or flushing caches.

{% callout title="You should know!" %}
The Loader respects URL parameters, `window.EngridLoader` configuration, and data attributes on the script tag for maximum flexibility.
{% /callout %}

## How It Works

The Loader checks for asset configuration in this priority order:
1. URL parameters (`?assets=local`, `?engridcss=false`, etc.)
2. `window.EngridLoader` object
3. Data attributes on the ENgrid script tag

If custom assets are specified, the Loader replaces the default ENgrid files with the requested versions.

## Configuration Options

### URL Parameters

You can control the Loader behavior via URL parameters:

| Parameter | Description | Example Values |
| --------- | ----------- | -------------- |
| `assets` | Specifies which assets to load | `local`, `flush`, `main`, branch name |
| `engridcss` | Controls CSS loading | `false` to skip CSS |
| `engridjs` | Controls JavaScript loading | `false` to skip JS |
| `repo-name` | Override the repository name | `engrid-custom-theme` |

### Using window.EngridLoader

You can also configure the Loader via JavaScript before ENgrid loads:

```javascript
window.EngridLoader = {
  assets: "main",
  "repo-name": "engrid-custom-theme"
};
```

### Data Attributes

Configuration can be embedded directly in the script tag:

```html
<script src="engrid.js" data-assets="local" data-repo-name="engrid-theme"></script>
```

## Asset Loading Modes

### Local Development

Load ENgrid from your local development server:

```
?assets=local
```

This loads assets from `https://engrid-{theme}.test/dist/`

{% callout title="Tip" %}
Local mode is perfect for testing changes before deployment. Make sure your local server is running! For tips on setting up a local server, see [Developing with Engrid](./developing-with-engrid)
{% /callout %}

### Branch/Environment Loading

Load ENgrid from a specific branch or environment:

```
?assets=main
?assets=feature-branch
?assets=staging
```

This loads from: `https://s3.amazonaws.com/engrid-dev.4sitestudios.com/engrid-{theme}/{branch}/`

Reflecting built out versions from 4Site's github repositories.

### Cache Flush

Force browsers to reload assets by appending a timestamp:

```
?assets=flush
```

This adds a version parameter to the current asset URLs to bypass cache.

### Skip CSS or JS

Disable CSS or JavaScript loading entirely:

```
?engridcss=false
?engridjs=false
```

When CSS is skipped, a yellow banner displays "ENGRID CSS UNLOADED" and basic fallback styles are applied.

## Repository Name Override

By default, the Loader constructs the repository name as `engrid-{theme}` where `{theme}` comes from `data-engrid-theme` on the body element. You can override this:

```javascript
window.EngridLoader = {
  "repo-name": "engrid-custom-client"
};
```

Or via URL:
```
?repo-name=engrid-custom-client
```

## Examples

### Example 1: Local Development

```
https://example.engagingnetworks.app?assets=local
```

Loads:
- `https://engrid-example.test/dist/engrid.css`
- `https://engrid-example.test/dist/engrid.js`

### Example 2: Test Specific Branch

```
https://example.engagingnetworks.app?assets=feature-new-modal
```

Loads assets from the `feature-new-modal` branch on S3.

### Example 3: Skip CSS for Testing

```
https://example.engagingnetworks.app?engridcss=false
```

Loads JavaScript only, displays yellow warning banner, and applies minimal fallback CSS.

### Example 4: Test Custom Repository

```
https://example.engagingnetworks.app?assets=main&repo-name=engrid-nonprofit-a
```

Loads assets from `engrid-nonprofit-a` repository instead of default theme repository.

### Example 5: Flush Cache

```
https://example.engagingnetworks.app?assets=flush
```

Adds timestamp to current asset URLs to force fresh download.

## Loading Behavior

The Loader runs early in the ENgrid initialization process. Here's what happens:

1. **Check if already loaded**: If `data-engrid-loaded="true"` is set on body, skip reloading
2. **Process skip flags**: Remove CSS/JS elements if `engridcss=false` or `engridjs=false`
3. **Determine asset URLs**: Based on configuration, construct appropriate URLs
4. **Replace/inject assets**: Update href/src attributes or inject new elements
5. **Set loaded flag**: Mark body with `data-engrid-loaded="true"`
6. **Reload if needed**: Return `true` to trigger page reload with new assets

{% callout title="Warning" %}
When the Loader determines assets need to be swapped, it triggers a page reload. This ensures all ENgrid features initialize with the correct files.
{% /callout %}

## Debug Logging

When debug mode is enabled (`?debug=true`), the Loader outputs detailed console messages with gold background and 🔁 emoji prefix:

```
🔁 [ENgrid Loader] LOADING LOCAL
🔁 [ENgrid Loader] Replacing stylesheet: https://engrid-example.test/dist/engrid.css
🔁 [ENgrid Loader] Injecting script: https://engrid-example.test/dist/engrid.js
✅ [ENgrid Loader] LOADED
```

## Common Use Cases

### QA Testing

Test a pull request before merging:
```
?assets=pr-branch-name
```

### Client Demos

Show a feature without deploying:
```
?assets=demo-branch
```

### Troubleshooting Caching Issues

Force fresh assets:
```
?assets=flush
```

### CSS-Only Testing

Test without ENgrid JavaScript:
```
?engridjs=false
```

### Build Your Own ENgrid Features

Develop locally with live reload:
```
?assets=local
```

## Integration with Build Process

The Loader works seamlessly with ENgrid's build and deployment pipeline:

1. Developers push branches to GitHub
2. GitHub Actions build and deploy to S3
3. The Loader can fetch those assets via `?assets=branch-name`
4. No changes needed to the EN page template

This workflow enables rapid iteration and testing without touching production code.
