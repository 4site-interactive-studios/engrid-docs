---
title: Version and Deprecated Features
description: Version information and graceful handling of deprecated ENgrid features
---

## Version

The `version.ts` file exports the current ENgrid version number:

```typescript
export const AppVersion = "0.24.1";
```

### Usage

```typescript
import { AppVersion } from ".";

console.log(`ENgrid Version: ${AppVersion}`);
```

The version is automatically updated during the build process via the `write-version.js` script and is used throughout ENgrid for:
- Debug logging
- Error reporting
- Feature compatibility checks
- Analytics tracking

{% callout title="Information" %}
The version number follows semantic versioning (MAJOR.MINOR.PATCH) and is managed automatically by the ENgrid build process.
{% /callout %}
