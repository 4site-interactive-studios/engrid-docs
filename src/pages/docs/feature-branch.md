---
title: Loading a Github Feature Branch
description: How to load a GitHub Feature Branch via a code block
---

## Loading a GitHub Feature Branch via code block

To load a GitHub feature branch via a code block, instead of the URL patter `?assets=` you can simply use the following.

```javascript
<script>
    window.EngridLoader = {
        assets: 'feature-branch-name'
    }
</script>
```

### IMPORTANT

When using the asset loader via a code block or via URL, the feature branch assets are downloaded from GitHub to a 4Site hosted AWS server. This is meant for development and testing purposes only and there is no gurantee about the performance of these hosted resources. As of May 17th, 2024 the assets will remain even after the feature branch is deleted, however this might change without notice. Additionally any updates pushed to the feature branch will be mirrored to AWS typically withing 5 minutes, but often less.
