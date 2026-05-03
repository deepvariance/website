# Lemurian Labs — UI/UX Inspiration

URL: https://lemurianlabs.com/
Captured: `01-above-fold.png`, `02-full-page.png`, `03-second-fold.png`, `04-third-fold.png`

## Snapshot
- AI compiler/runtime ("Tachyon") for accelerated software, post-kernel era.
- Same audience as DV (ML systems / infra / GPU).
- Aesthetic: pure-black, monospace-leaning, prose-as-product. Almost zero chrome.

## Visual identity
- **Palette**: 95% black + soft graphite cards, accent is a multi-color spectrum gradient (orange → pink → magenta → violet → cobalt → cyan).
- **Type**: Geometric techno-display for the H1 ("ONE STACK / UNLIMITED POSSIBILITIES"); IBM Plex / mono for body, paragraphs set as if from a terminal log.
- **Cards**: Hairline-stroked dark rectangles, very low contrast — the spectrum gradient and italic mono prose carry the design.

## Hero pattern that works
- **2-line headline, second line is a rainbow gradient**. The gradient runs across letters horizontally; first line stays neutral white. Big visual punch from a single text element, no other graphic needed.
- **Press-release / news strip directly under the nav** with `NEW` pill, `PRESS RELEASE — …`, and a short rainbow underline highlighting names ("Kim Polese and MIT's Saman Amarasinghe → Read"). Cheap, classy way to socialize milestones.
- **No image, no 3D**. Confidence through restraint.

## Layout & IA notes
- Hero → typewriter prose ("The Kernel Programming Era Is Over.") → blue-accented manifesto block ("WE HAVE BUILT TACHYON") → 3-up cards (`Productivity / Performance / Portability`) → "Why this matters". The whole homepage reads like a one-pager essay with cards as section breaks.
- Alliterative 3-card pattern is repeatable — three P's, three C's, etc. Each card: 1 short eyebrow, 2–3 sentence bullets, no icon. Sober.

## Microcopy / tone
- Decreasing-information rhythm: long prose → short manifesto bullets → "We call this shift **ACCELERATED SOFTWARE**." (set in the same display face for emphasis).
- Refrains ("No more kernels. / No more fragmentation. / No more …") — adopt for our pricing/manifesto sections.

## What to copy or adapt for DV
1. **Spectrum-gradient line in the home hero**. We currently use neon-only. A second line in a multi-stop gradient (we can constrain it to neon → indigo → violet to stay on-brand) would lift home `<h1>` from "good" to "memorable". Use `bg-clip-text` with `linear-gradient(90deg, #6bff83, #00ff66, #3131c0, #c0c1ff)`.
2. **Announcement bar pattern under the nav**: `<div class="news-strip">NEW · PRESS RELEASE — <highlighted phrase> → Read</div>`. Slot for blog post / launch / paper. Add to `WebsiteHeaderComponent` as an optional input-driven slot.
3. **Manifesto rhythm in `pricing.ts` or a new `/manifesto` block**: monospace prose paragraphs interleaved with short bullet refrains. We have IBM Plex Mono already; just need a typography variant.
4. **3-up "what it gives you" alliterative cards** as a re-usable section above the contact form on `pricing.ts` or above CTA on each product page.

## What to avoid copying
- Their pages have **almost no visual hierarchy beyond type**, which only works because the prose is excellent. We want imagery + glass — keep the WebGL background and bento grid, but borrow their typography intensity for one hero moment per page.
- Their nav strip's spectrum-highlighted phrase is risky in dark mode — keep contrast checked (AA minimum on highlighted text).

## Concrete component proposals
- `app-news-strip` (eyebrow pill + label + highlighted phrase + read link) — drop into `app.html` above `<app-header>`, persistent across routes; controlled by a Sanity field.
- `app-spectrum-headline` directive that wraps a `<span>` and applies the gradient + animated `background-position` shimmer (3s loop, paused with `prefers-reduced-motion`).
