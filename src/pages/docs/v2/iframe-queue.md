---
title: Iframe Queue
description: Submit a sequence of embedded Engaging Networks forms one at a time, passing field data through postMessage instead of ?chain.
---

## Overview

The Iframe Queue submits a chain of embedded EN pages sequentially. Each iframe is created only after the previous one finishes, whether by reaching its Thank You page, erroring, or timing out. Field values are passed into each iframe with `postMessage` instead of EN's `?chain` URL parameter.

Use it when a parent page needs to record several EN submissions without the user seeing or clicking anything extra. The original use case was three Quick Customer Builder (QCB) opt-ins (double opt-in email, postal mail, mobile phone) firing after a donation.

{% callout type="warning" title="Why this exists" %}
Engaging Networks' platform loses roughly 40% of records when several hidden iframes submit in parallel using `?chain`. The fix tracked as EN-2802 / EN-2803 was to drop `?chain` and load the iframes one at a time. This component generalises that pattern so any consumer can reuse it.
{% /callout %}

## Enable the component in your theme

Iframe Queue is opt-in, the same way the [Opt-in Ladder](/docs/v2/opt-in-ladder) is. It is exported from `@4site/engrid-scripts` but it is **not** auto-instantiated by ENgrid core. If your theme never constructs it, no listeners are registered, no singleton is allocated, and no `window.EngridIframeQueue` lookup happens.

1. Open your theme's `index.ts` file.
2. Add this import to the top:

   ```ts
   import { IframeQueue } from '@4site/engrid-scripts'
   ```

3. Add this line to the `onLoad` property of the `options` object:

   ```ts
   new IframeQueue()
   ```

4. Save the file, run `npm run build`, and upload the new assets to your Engaging Networks account.

## Basic usage

Once the component is constructed, enqueue items from anywhere in your theme code:

```ts
import { IframeQueue, IframeQueueEvents } from '@4site/engrid-scripts'

const queue = IframeQueue.getInstance()

queue.enqueue({
  url: 'https://support.example.org/page/123456/data/1',
  fields: { 'supporter.emailAddress': 'donor@example.org' },
  autoSubmit: true,
  onComplete: () => console.log('opt-in recorded'),
  onError: (error) => console.error('failed:', error.message),
})

queue.process() // returns a Promise<void>
```

`enqueue()` accepts one item at a time. `enqueueAll(items)` accepts an array. `process()` resolves when the queue drains and rejects on the first failure.

## Item configuration

Every queued item is an `IframeQueueItem`:

| Property | Description | Default |
| -------- | ----------- | ------- |
| `url` | Full URL of the EN page to load. Any `?chain` parameter is stripped automatically. | required |
| `fields` | Map of field name to value. Each entry is sent into the embedded form via the populate message. Field names match the form input's `name` attribute (e.g. `supporter.emailAddress`). | `{}` |
| `autoSubmit` | If `true`, the embedded page submits the form once fields are populated. | `true` |
| `timeout` | Milliseconds to wait for the Thank You ping before treating the item as failed. | `30000` |
| `container` | Element to append the iframe to. | `document.body` |
| `iframeStyle` | Override the iframe's inline styles. | visually hidden |
| `onComplete` | Per-item success callback. | none |
| `onError` | Per-item failure callback. Receives an `Error`. | none |
| `keepIframeOnError` | If `true`, the queue leaves a failed iframe in the DOM and repositions it as a visible overlay for inspection. | `false` |

{% callout title="Tip" %}
If an embedded form refuses to submit, the most common cause is that EN's validators have not yet seen the populated values, so `en__submit--disabled` is still on the submit button. The queue's embedded-mode handler dispatches `change` and `blur` events after each `setFieldValue` to cover this, and clears any remaining disabled state before clicking submit. If you still see issues, watch the iframe's console. `keepIframeOnError: true` makes that easy.
{% /callout %}

## Declarative configuration

If you'd rather set the queue up from the EN page itself, define `window.EngridIframeQueue` before the ENgrid bundle loads:

```html
<script>
  window.EngridIframeQueue = {
    items: [
      {
        url: "https://support.example.org/page/123456/data/1",
        fields: { "supporter.emailAddress": "donor@example.org" },
        autoSubmit: true
      }
    ],
    autoStart: true
  }
</script>
```

`autoStart` defaults to `true` when `items` is non-empty. The queue picks the config up on construction and calls `process()` after `DOMContentLoaded`.

## Events

The component dispatches lifecycle events through `IframeQueueEvents`, a singleton modelled after `RememberMeEvents`. Subscribe from anywhere; you do not need a reference to the queue itself:

```ts
import { IframeQueueEvents } from '@4site/engrid-scripts'

const events = IframeQueueEvents.getInstance()

events.onChainComplete.subscribe(() => {
  // every item succeeded; safe to do work that conflicted with the chain
})

events.onChainError.subscribe(({ message, failedItem, cause }) => {
  console.error('chain aborted:', message, failedItem, cause)
})

events.onItemStart.subscribe((item) => { /* ... */ })
events.onItemComplete.subscribe((item) => { /* ... */ })
events.onItemError.subscribe(({ item, error }) => { /* ... */ })
```

| Event | Payload | When it fires |
| ----- | ------- | ------------- |
| `onChainComplete` | none | The queue drained successfully. |
| `onChainError` | `{ message, failedItem?, cause? }` | The queue aborted due to a failure. |
| `onItemStart` | `IframeQueueItem` | An item is about to be loaded. |
| `onItemComplete` | `IframeQueueItem` | An item's iframe reached its Thank You page. |
| `onItemError` | `{ item, error }` | An item failed. The queue aborts after this. |

## How field data reaches the iframe

The queue uses three `postMessage` types, all prefixed with `engrid-iframe-queue:`.

**Parent to iframe (populate).** Sent on the iframe's `load` event.

```ts
{
  type: 'engrid-iframe-queue:populate',
  pageId: 123456,
  fields: { 'supporter.emailAddress': 'donor@example.org' },
  autoSubmit: true,
}
```

**Iframe to parent (thank-you).** Sent once when the embedded EN page reaches its Thank You page. This ping is emitted by ENgrid's iFrame component (`iframe.ts`), not by the queue itself, so it works whether or not the embedded page is using the queue.

```ts
{
  type: 'engrid-iframe-queue:thank-you',
  pageId: 123456,
  pageNumber: 2,
  pageCount: 2,
  url: 'https://support.example.org/page/123456/data/2',
}
```

**Iframe to parent (error).** Sent if populate or submit throws inside the embedded page.

```ts
{
  type: 'engrid-iframe-queue:error',
  pageId: 123456,
  message: 'description of the failure',
}
```

The parent matches inbound messages two ways: `event.source` identity (only messages from this specific iframe are accepted) and `pageId` (the Page ID parsed from the queued URL must match the one on the ping). Origin strings are not matched, because EN may serve embedded pages from a different subdomain than the host page.

{% callout type="warning" title="Embedded pages need an ENgrid bundle" %}
The thank-you ping is dispatched by ENgrid's iFrame component on the embedded Thank You page. If the embedded EN page is not running an ENgrid bundle, no ping is ever emitted and the queue will time out waiting. The simplest fix is to make sure the page has the same ENgrid bundle loaded as the parent.
{% /callout %}

## URL normalisation

Before each iframe is created, the queue rewrites the item URL:

1. Any `chain` query parameter is removed. The queue replaces what `?chain` did, so it should not be present.
2. A short list of loader and dev-mode parameters is inherited from the parent page:

   ```
   assets, engridjs, engridcss, repo-name, repo-owner, debug, mode
   ```

   For each parameter, the item URL wins if it already specifies it. Otherwise, the queue checks the parent's URL parameters, then `window.EngridLoader[key]`. The result is logged with the source of each inherited value.

The practical effect: pinning your bundle source on the parent page (with `?assets=local` or `window.EngridLoader = { assets: 'local' }`) automatically pins it on the queued iframes too, which is what you want during local development.

## Debugging

### Keep failed iframes for inspection

When an item fails, the queue normally removes its iframe. Two ways to keep it around instead:

- Per item: set `keepIframeOnError: true`.
- Globally during development: turn on ENgrid debug mode (`window.EngridOptions.Debug = true` or append `?debug=true`). Every failed item is kept automatically.

A retained iframe is repositioned to the top-right corner of the viewport (600 × 500, red border) with a `title` attribute showing the error. Right-click the iframe and choose **Inspect frame** to drop into its DevTools.

### Console logs

The queue logs through `EngridLogger` under the name `IframeQueue` with a train emoji prefix. Useful lines to grep for:

- `Item start: <url> (pageId X, timeout Yms)`
- `Posting populate to iframe (pageId=X, fieldCount=N, autoSubmit=...)`
- `Inherited parent params on iframe URL: assets=local (from parent EngridLoader)`
- `Item complete: <url> (pageId X)`
- `Item failed, iframe kept in DOM for inspection: <error>`
- `Ignoring thank-you ping with mismatched pageId (expected A, got B)`

### Common failure modes

| Symptom | Likely cause |
| ------- | ------------ |
| Item times out after 30 seconds | The embedded page is not running an ENgrid bundle, so no thank-you ping is emitted. |
| Submit button never fires | EN validators see the populated values as invalid. Open the kept iframe and look at the form state. |
| Wrong item completes | The queued URL's Page ID does not match the ping's `pageId`. Check the URL for typos. |

## Migration from `?chain` and `setTimeout`

If you currently chain hidden iframes by appending them one after another with a fixed delay, replace the timer with an enqueue. Where you had:

```ts
// old pattern, unreliable
const f1 = document.createElement('iframe')
f1.src = 'https://support.example.org/page/A/data/1?chain'
f1.style.display = 'none'
document.body.appendChild(f1)

setTimeout(() => {
  const f2 = document.createElement('iframe')
  f2.src = 'https://support.example.org/page/B/data/1?chain'
  f2.style.display = 'none'
  document.body.appendChild(f2)
}, 3500)
```

…use the queue:

```ts
import { IframeQueue } from '@4site/engrid-scripts'

const queue = IframeQueue.getInstance()
queue.enqueueAll([
  {
    url: 'https://support.example.org/page/A/data/1',
    fields: { 'supporter.emailAddress': email },
  },
  {
    url: 'https://support.example.org/page/B/data/1',
    fields: { 'supporter.emailAddress': email },
  },
])
queue.process()
```

The queue waits on the real Thank-You-page ping instead of a fixed delay, so you do not have to guess at a timeout. It also works in the cases where 3.5 seconds was not long enough.

## Public API reference

`IframeQueue`

```ts
class IframeQueue {
  static getInstance(): IframeQueue
  readonly isProcessing: boolean
  readonly size: number               // pending items, not counting the in-flight one
  enqueue(item: IframeQueueItem): void
  enqueueAll(items: IframeQueueItem[]): void
  process(): Promise<void>            // idempotent: returns in-flight promise if already running
  clear(): void                       // empties queue and signals in-flight item to abort
}
```

`IframeQueueEvents`

```ts
class IframeQueueEvents {
  static getInstance(): IframeQueueEvents
  readonly onChainComplete: ISignal
  readonly onChainError:    ISimpleEvent<IframeQueueErrorPayload>
  readonly onItemStart:     ISimpleEvent<IframeQueueItem>
  readonly onItemComplete:  ISimpleEvent<IframeQueueItem>
  readonly onItemError:     ISimpleEvent<{ item: IframeQueueItem; error: Error }>
}
```

`ENGrid.getPageIdFromUrl(url)`

A static helper added to the `ENGrid` class. Parses the numeric Page ID out of an EN URL of the form `https://<host>/page/<id>/<slug>/<page-number>`. Returns `0` if it can't parse. The queue uses this to match Thank You pings against the queued URL; you can use it independently if you need to derive a Page ID from a URL string.

```ts
import { ENGrid } from '@4site/engrid-scripts'

ENGrid.getPageIdFromUrl('https://support.example.org/page/123456/data/1') // => 123456
```
