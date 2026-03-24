# BApp Store — Community Submissions

> **BApp Store** is part of [0rdinals.com](https://0rdinals.com) — a suite of creator tools for Bitcoin inscriptions.

A **BApp** (Bitcoin App) is a small, self-contained React component that generates inscription-ready content directly in the browser. The 0rdinals platform wraps your BApp with:

- Live content preview
- Advanced inscription options (parent, delegate, metadata, encoding)
- The **Inscribe** button that sends directly into the [Oodinals](https://oodinals.com) inscription pipeline

You only build the creative part.

---

## How to Submit a BApp

1. **Fork** this repository
2. **Create** your BApp in `submissions/your-bapp-slug/`
   - `index.tsx` — your React component (see the [template](template/MyBAppTemplate.tsx))
   - `manifest.json` — metadata describing your BApp (see [below](#manifest-format))
   - `preview.png` *(optional)* — a screenshot or example output (~800×600)
3. **Test** your component locally — it must implement the [`BAppProps`](types/bapp.ts) interface
4. **Open a Pull Request** using the PR template — fill in all sections
5. I'll review and, if approved, add it to the live BApp Store

---

## BApp Rules

- ✅ Must implement `BAppProps` — receive `onOutput`, call it with `BAppOutput`
- ✅ Must call `onOutput(null)` when there's nothing valid to inscribe yet
- ✅ Content must be self-contained — no external fetch calls at inscription time
- ✅ Must work offline / in a sandboxed environment
- ✅ Use the design tokens in the [styling guide](#styling-guide) so it fits the dark theme
- ❌ No hardcoded wallet addresses (use `manifest.json` for developer fees)
- ❌ No tracking pixels, analytics, or external script loads
- ❌ No content that violates copyright or platform policies

---

## Manifest Format

Every submission needs a `manifest.json` alongside `index.tsx`:

```json
{
  "name": "My BApp Name",
  "slug": "my-bapp-name",
  "description": "One sentence: what does this BApp create?",
  "icon": "🎨",
  "category": "Art",
  "tags": ["svg", "generative", "color"],
  "outputTypes": ["image/svg+xml"],
  "creatorName": "your-handle",
  "creatorAddress": "bc1p...",
  "version": "1.0.0",
  "featured": false,
  "developerFee": {
    "enabled": false,
    "address": "bc1p...",
    "amountSats": 1000,
    "mode": "item"
  }
}
```

**Categories:** `Art` · `HTML & Web` · `Image` · `3D` · `Utility` · `Community` · `Game`

---

## Styling Guide

The platform uses a dark theme. Use these CSS classes (defined via Tailwind) so your BApp looks native:

| Class | Purpose |
|---|---|
| `input-base` | All text inputs and selects |
| `text-text` | Primary text |
| `text-text-dim` | Subdued / label text |
| `text-text-muted` | Placeholder / hint text |
| `bg-card` | Card background |
| `bg-input` | Input background (`#1e1e26`) |
| `border-border` | Standard border |
| `text-punk` | Accent cyan (`#22d3ee`) |
| `text-accent2` | Accent teal (`#00d4aa`) |
| `font-mono` | JetBrains Mono |
| `font-display` | Syne (headings) |

For button toggles use:
```tsx
className={`px-3 py-1 rounded text-xs font-mono border transition-colors ${
  active
    ? 'border-punk text-punk bg-punk/10'
    : 'border-border text-text-dim hover:border-border-light'
}`}
```

---

## Output Types

Your `onOutput` call must include a valid `contentType`. Supported MIME types:

| Type | Notes |
|---|---|
| `image/svg+xml` | Inline SVG string |
| `text/html;charset=utf-8` | Full HTML document |
| `text/plain` | Plain text |
| `application/json` | JSON data |
| `image/png` | PNG `Blob` |
| `image/webp` | WebP `Blob` |
| `model/gltf-binary` | GLB `Blob` |

---

## Examples

| BApp | Category | Output |
|---|---|---|
| [Generative Text](examples/GenerativeTextApp.tsx) | Art | SVG |
| [SVG Pattern Generator](examples/SvgPatternApp.tsx) | Art | SVG |
| [HTML Card Maker](examples/HtmlCardApp.tsx) | HTML & Web | HTML |

---

## Questions?

Open an [issue](https://github.com/switch-900/BappStore/issues) or reach out on-chain.
