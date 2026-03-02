---
title: Deferred Asset Loading
description: This page shows how ENgrid automatically lazy loads images and background videos for better performance
---

## Overview

The Deferred Asset Loading component (SrcDefer) improves page load performance by lazy loading images and background videos. Instead of loading all media assets immediately when the page loads, it defers loading until needed, which makes pages load faster and reduces bandwidth usage.

{% callout title="You should know!" %}
This component runs automatically when ENgrid detects elements with `data-src` attributes. No configuration is required.
{% /callout %}

## How It Works

The component processes two types of media:

1. **Images** - Converts `data-src` to `src` with browser-native lazy loading
2. **Background Videos** - Loads video sources and auto-plays them as muted, looping backgrounds

## Using Lazy-Loaded Images

Instead of using a standard `src` attribute, use `data-src`:

```html
<!-- Standard image (loads immediately) -->
<img src="image.jpg" alt="Description" />

<!-- Lazy-loaded image (loads when needed) -->
<img data-src="image.jpg" alt="Description" />
```

ENgrid automatically:
- Sets `decoding="async"` for off-thread image processing
- Sets `loading="lazy"` for native browser lazy loading
- Converts `data-src` to `src` to trigger the download
- Adds `data-engrid-data-src-processed="true"` to mark it as processed
- Removes the `data-src` attribute

## Using Background Videos

For background videos, use `data-src` on the `<source>` elements:

```html
<video>
  <source data-src="background-video.mp4" type="video/mp4" />
  <source data-src="background-video.webm" type="video/webm" />
</video>
```

ENgrid automatically:
- Converts `data-src` to `src` on all video sources
- Sets the video to muted, auto-play, and loop
- Hides video controls
- Starts playback immediately

## Performance Benefits

### Faster Initial Page Load

By deferring non-critical images:
- The page becomes interactive sooner
- Users see content faster
- Critical resources load first

### Reduced Bandwidth Usage

With lazy loading:
- Images below the fold only load when scrolled into view
- Users who don't scroll down don't download those images
- Mobile users save data

### Optimized Video Loading

Background videos:
- Don't block page rendering
- Load after critical content
- Auto-play only after they're ready

## Technical Details

### Image Processing

For each image with `data-src`:

1. `decoding="async"` - Decodes image asynchronously off the main thread
2. `loading="lazy"` - Browser determines when to download based on viewport
3. `src` set from `data-src` - Triggers actual download
4. Marked as processed - Prevents duplicate processing

### Video Processing

For each video with source elements:

1. All `<source>` elements with `data-src` are processed
2. Video element is replaced to trigger browser reload
3. Video is configured with:
   - `muted = true` - Required for autoplay
   - `controls = false` - Hides browser controls
   - `loop = true` - Continuous playback
   - `playsInline = true` - Plays inline on mobile
4. `play()` is called to start playback

## Browser Compatibility

The component uses modern browser features:

- **Native lazy loading** (`loading="lazy"`) - Supported in all modern browsers
- **Async decoding** (`decoding="async"`) - Progressive enhancement, gracefully degrades
- **Video autoplay** - Requires muted attribute (which ENgrid sets automatically)

## Examples

### Simple Lazy-Loaded Image

```html
<img data-src="hero-image.jpg" alt="Hero" />
```

Result after processing:
```html
<img src="hero-image.jpg" 
     alt="Hero" 
     decoding="async" 
     loading="lazy" 
     data-engrid-data-src-processed="true" />
```

### Background Video

```html
<div class="video-background">
  <video>
    <source data-src="background.mp4" type="video/mp4" />
  </video>
</div>
```

Result: Video loads, plays automatically, muted and looping.
