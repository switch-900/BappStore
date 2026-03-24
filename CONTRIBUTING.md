# BApp Store — Contribution Guide

## Quick start

```bash
# 1. Fork and clone the repo
git clone https://github.com/YOUR_HANDLE/BappStore.git
cd BappStore

# 2. Create your submission directory
mkdir submissions/your-bapp-slug

# 3. Copy the template
cp template/MyBAppTemplate.tsx submissions/your-bapp-slug/index.tsx
cp template/manifest.json      submissions/your-bapp-slug/manifest.json

# 4. Build your BApp, fill in the manifest, then open a PR
```

---

## The BApp contract

Your component must:

```tsx
'use client';

import type { BAppProps } from '../../types/bapp';

export default function YourBApp({ onOutput }: BAppProps) {
  // call onOutput(output) when content is ready
  // call onOutput(null) when nothing to inscribe yet
}
```

That's the entire API surface. The platform handles everything else.

---

## Manifest fields

| Field | Required | Description |
|---|---|---|
| `name` | ✅ | Display name |
| `slug` | ✅ | URL-safe, kebab-case, unique |
| `description` | ✅ | One sentence |
| `icon` | ✅ | Single emoji |
| `category` | ✅ | One of the 7 categories |
| `tags` | ✅ | Array of keyword strings |
| `outputTypes` | ✅ | Array of MIME types |
| `creatorName` | ✅ | Your handle |
| `creatorAddress` | — | Bitcoin address (for credit / dev fee) |
| `version` | ✅ | Semver string |
| `featured` | — | Leave `false` — set by the maintainer |
| `developerFee` | — | Set `enabled: false` if unused |

---

## Review criteria

Submissions are accepted if they:

1. Implement the `BAppProps` contract correctly
2. Produce valid, self-contained inscribable content
3. Match the platform's dark theme via the documented CSS classes
4. Contain no external network calls, trackers, or hardcoded addresses
5. Are original work (or you hold rights to the content)
6. Are interesting / useful to the inscription community

---

## After approval

Once your PR is merged, your BApp will appear in the BApp Store at [0rdinals.com/bapp-store](https://0rdinals.com/bapp-store) in the next release. You'll be credited as the creator.
