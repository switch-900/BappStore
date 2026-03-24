# BApp Store

**BApp Store** is the community submission layer for [0rdinals.com/bapp-store](https://0rdinals.com/bapp-store) — a creator marketplace for Bitcoin inscription apps.

A **BApp** is a small React component that generates inscription-ready content in the browser. You build the creative tool. The platform wraps it with live preview, inscription options, and the **Inscribe** button that sends directly to the [Oodinals](https://oodinals.com) pipeline.

---

## How to submit

### 1. Fork this repo

Click **Fork** at the top right of this page.

### 2. Create your submission folder

```
submissions/
  your-bapp-slug/
    index.tsx       ← your React component
    manifest.json   ← BApp metadata
    preview.png     ← example output screenshot (optional but helpful)
```

Copy the starter files:

```bash
cp template/MyBAppTemplate.tsx submissions/your-bapp-slug/index.tsx
cp template/manifest.json      submissions/your-bapp-slug/manifest.json
```

### 3. Build your BApp

Your component receives one prop — `onOutput` — and calls it whenever the content changes:

```tsx
'use client';

import type { BAppProps } from '../../types/bapp';

export default function MyBApp({ onOutput }: BAppProps) {
  // call onOutput({ content, contentType, fileName, title }) when ready
  // call onOutput(null) when there's nothing to inscribe yet
}
```

See [`template/MyBAppTemplate.tsx`](template/MyBAppTemplate.tsx) for a full working example, and [`examples/`](examples/) for three real BApps to learn from.

### 4. Fill in `manifest.json`

```json
{
  "name": "My BApp Name",
  "slug": "my-bapp-name",
  "description": "One sentence: what does this create?",
  "icon": "🎨",
  "category": "Art",
  "tags": ["svg", "generative"],
  "outputTypes": ["image/svg+xml"],
  "creatorName": "your-handle",
  "creatorAddress": "bc1p...",
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

**Categories:** `Art` · `HTML & Web` · `Image` · `3D` · `Utility` · `Community` · `Game`

### 5. Open a Pull Request

Open a PR against `main`. Use the PR template — fill in all sections. I'll review it and add approved BApps to the live store.

---

## Rules

- ✅ Component must implement `BAppProps` — call `onOutput` on every change, `onOutput(null)` when empty
- ✅ Content must be self-contained — no external API or fetch calls at inscription time
- ✅ Use the [styling classes](#styling) below so your BApp fits the dark platform theme
- ❌ No hardcoded wallet addresses — put developer fee config in `manifest.json`
- ❌ No trackers, analytics, or third-party script loads
- ❌ No content that violates copyright or platform policies

---

## Output types

| `contentType` | Use a... |
|---|---|
| `image/svg+xml` | `string` |
| `text/html;charset=utf-8` | `string` |
| `text/plain` | `string` |
| `application/json` | `string` |
| `image/png` / `image/webp` | `Blob` |
| `model/gltf-binary` | `Blob` |

---

## Styling

The platform runs a dark theme with Tailwind. Use these classes in your component so it looks native:

| Class | What it styles |
|---|---|
| `input-base` | Text inputs and selects (dark bg, themed border + focus ring) |
| `text-text` | Primary text |
| `text-text-dim` | Label / subdued text |
| `text-text-muted` | Placeholder / hint text |
| `bg-input` | Input background `#1e1e26` |
| `border-border` | Standard border `#2a2a35` |
| `text-punk` | Cyan accent `#22d3ee` |
| `text-accent2` | Teal accent `#00d4aa` |
| `font-mono` | JetBrains Mono |

Toggle buttons:
```tsx
className={`px-3 py-1 rounded text-xs font-mono border transition-colors ${
  active
    ? 'border-punk text-punk bg-punk/10'
    : 'border-border text-text-dim hover:border-border-light'
}`}
```

---

## Examples

| File | Category | Output |
|---|---|---|
| [GenerativeTextApp.tsx](examples/GenerativeTextApp.tsx) | Art | `image/svg+xml` |
| [SvgPatternApp.tsx](examples/SvgPatternApp.tsx) | Art | `image/svg+xml` |
| [HtmlCardApp.tsx](examples/HtmlCardApp.tsx) | HTML & Web | `text/html` |

---

## Questions?

Open an [issue](https://github.com/switch-900/BappStore/issues).
