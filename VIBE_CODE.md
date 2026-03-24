# BApp Vibe Code Prompt Sheet

Copy the block below, fill in **YOUR IDEA** at the bottom, and hand the whole thing to any AI (ChatGPT, Claude, Copilot, etc.).  
It will return a ready-to-submit BApp component.

---

## ✂️ Copy everything below this line

---

### Context

I am building a **BApp** — a small React component that runs in a browser, generates inscription-ready content, and submits it to the Bitcoin blockchain via the Oodinals platform.

The platform runtime wraps my component. I only need to build the creative/generative part. The wrapper handles:
- Live content preview (auto-renders SVG, HTML, JSON, images)
- Advanced inscription options panel
- The Inscribe button that triggers the pipeline

---

### My component's only job

Receive one prop — `onOutput` — and call it every time the generated content changes:

```ts
interface BAppProps {
  onOutput: (output: BAppOutput | null) => void;
}

interface BAppOutput {
  content: string | Blob;   // string for SVG/HTML/text/JSON, Blob for PNG/WebP/GLB
  contentType: string;      // MIME type
  fileName?: string;        // suggested filename
  title?: string;           // shown in the platform UI
}
```

Call `onOutput(null)` when there is nothing valid to output yet (e.g. empty input).

---

### File structure for my submission

```
submissions/my-bapp-slug/
  index.tsx       ← the component (what you will generate)
  manifest.json   ← filled in at the bottom of this prompt
```

---

### Rules the component must follow

1. `'use client';` at the top (Next.js client component)
2. Import type only: `import type { BAppProps } from '../../types/bapp';`
3. Default export: `export default function MyBAppName({ onOutput }: BAppProps)`
4. Call `onOutput` inside a `useEffect` that lists every state value it depends on
5. Call `onOutput(null)` when output is invalid/empty
6. No external API calls or `fetch()` — all generation is local, in-browser
7. All state in `useState`, all derived values in `useMemo` or `useCallback`
8. No hardcoded wallet addresses

---

### Styling — use these Tailwind classes so the BApp matches the dark platform theme

| Element | Class to use |
|---|---|
| Any text input or select | `input-base w-full mt-1` |
| Label wrapper | `<label className="block">` |
| Label text | `<span className="text-xs font-mono uppercase tracking-wide text-text-dim">` |
| Section spacing | `<div className="space-y-4">` or `<div className="space-y-5">` |
| Range slider | `className="w-full mt-2 accent-punk"` |
| Color picker | `className="mt-1 h-8 w-full rounded border border-border bg-input cursor-pointer"` |
| Active toggle button | `border-punk text-punk bg-punk/10` |
| Inactive toggle button | `border-border text-text-dim hover:border-border-light` |
| Toggle button base | `px-3 py-1 rounded text-xs font-mono border transition-colors` |

Dark theme color values (for inline styles if needed):
- Background: `#0a0a0c` (deep) · `#18181e` (card) · `#1e1e26` (input)
- Border: `#2a2a35`
- Text: `#e8e6e3` (primary) · `#8a8895` (dim) · `#5a5868` (muted)
- Accent cyan (punk): `#22d3ee`
- Accent teal: `#00d4aa`
- Accent orange: `#ff6b35`
- Bitcoin orange: `#f7931a`

---

### Component structure template

```tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { BAppProps } from '../../types/bapp';

export default function MyBAppName({ onOutput }: BAppProps) {
  // --- state ---
  const [value, setValue] = useState('');

  // --- generation ---
  const generate = useCallback(() => {
    // build and return content string or Blob
  }, [/* deps */]);

  useEffect(() => {
    if (!value.trim()) { onOutput(null); return; }
    const content = generate();
    onOutput({ content, contentType: 'image/svg+xml', fileName: 'output.svg', title: value });
  }, [value, generate, onOutput]);

  // --- ui ---
  return (
    <div className="space-y-5">
      {/* optional: inline live preview */}

      {/* controls */}
      <label className="block">
        <span className="text-xs font-mono uppercase tracking-wide text-text-dim">Label</span>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} className="input-base w-full mt-1" />
      </label>
    </div>
  );
}
```

---

### Supported output MIME types

| Output | contentType |
|---|---|
| SVG image | `image/svg+xml` |
| HTML page | `text/html;charset=utf-8` |
| Plain text | `text/plain` |
| JSON data | `application/json` |
| PNG image (Blob) | `image/png` |
| WebP image (Blob) | `image/webp` |
| 3D model (Blob) | `model/gltf-binary` |

---

### Examples of real BApps for reference

**Generative Text** — user types text, picks font/color/alignment, outputs `image/svg+xml`  
**SVG Pattern Generator** — grid/radial/diagonal patterns of geometric shapes, outputs `image/svg+xml`  
**HTML Card Maker** — title + body + footer + color preset, outputs `text/html;charset=utf-8` as a full HTML document

---

### Now build my BApp

**MY IDEA:**
> [describe your BApp here — what it creates, what controls it has, what the output looks like]

Please generate:

1. `index.tsx` — the complete, working React component following all the rules and styling above
2. `manifest.json` — filled in based on my idea, using this schema:

```json
{
  "name": "",
  "slug": "",
  "description": "",
  "icon": "",
  "category": "",
  "tags": [],
  "outputTypes": [],
  "creatorName": "",
  "creatorAddress": "",
  "version": "1.0.0",
  "featured": false,
  "developerFee": {
    "enabled": false,
    "address": "",
    "amountSats": 0,
    "mode": "item"
  }
}
```

Categories to pick from: `Art` · `HTML & Web` · `Image` · `3D` · `Utility` · `Community` · `Game`

---

✂️ End of prompt
