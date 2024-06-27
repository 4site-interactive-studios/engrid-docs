---
title: Replace Banner Media with Background Media
description: Learn how to Replace Banner Media with Background Media in ENgrid.
---

By adding a data attribute to the body you can control under what circumstances the background should replace or act as the banner on the layout's breakpoint.

```
data-replace-banner-with-background="if-background-exists"
```

- Replaces the banner media if the background contains an image or video.

```
data-replace-banner-with-background="if-background-image"
```

- Replaces the banner media ONLY if the background contains an image.

```
`data-replace-banner-with-background="if-background-video"`
```

- Replaces the banner media ONLY if the background contains a video.

```
`data-replace-banner-with-background="if-banner-empty"`
```

- Replaces the banner media ONLY if the banner does not contain media and the background contains an image or video.
