# Obsidian (financial advisor OS) — UI/UX Inspiration

URL: https://obsidianos.com/?ref=saaspo.com
Captured: `01-above-fold.png`, `02-full-page.png`, `03-second-fold.png`, `04-third-fold.png`

## Snapshot
- All-in-one platform for financial advisers (AI practice management + custody + execution).
- Different vertical, but the **luxury / craft** branding moves are masterful and we can borrow the centerpiece-3D-asset playbook.

## Visual identity
- **Palette**: ink-black `#0a0a0a` backgrounds, a sliver of warm-orange/lava accent inside hero artwork, ivory/white type. Looks expensive.
- **Type**: a **serif display** (likely "PP Editorial New" / "Financier" / NY) used for **all headlines** including section heads. Body is a clean sans (Inter/Söhne). The serif/sans pairing is deliberate — feels editorial, financial-paper, premium.
- **Centerpiece motif**: 3D rendered **obsidian rocks** (jagged stone with orange glow seams) flanking the hero, plus a 3D **fluid/flame ball** asset later in the page that glows from inside. The product is "obsidian" → the metaphor is concrete, ownable, photographic.
- **CTA pills**: white pill with black text — high contrast, single CTA above the fold.

## Hero pattern
- **Centered hero**: serif H1 (two lines), short subtitle, single white pill CTA. No social proof above the fold; the rocks themselves serve as the brand statement.
- **Floating product mock card** sits below, half-overlapping the hero — a dark glassy schedule app (Mon, 22 Sept 2025 / Welcome to your day, Sophie / Meetings list / Tasks list).
- **Cookie / disclosure pill** bottom-right, glass styled — even legal furniture is on-brand.

## Section patterns to steal
- **2-up "Save Time & Grow AUM" bento**: left card features a 3D fluid sphere over a "Recording meeting" mini-UI, right card overlays a glassy "Return by fund" chart over a stone background. **The 3D sphere is the hero asset reused at smaller scale**, creating recognizable "moments" across sections — a leitmotif strategy.
- **AI Practice Management / Execution & Custody** 2-up below; clear two-pillar product story.
- **"The platform that scales your firm"** section: serif headline, then sub-segments (`Independent firms`, `Day plan`, `AI search`) listed with horizontal divider rules + small captions and a large product mock on the right. Reads like a sectioned magazine spread.
- Sections **alternate full-bleed dark with deeply textured imagery**, then occasionally white-card insets — keeps it from feeling monotone.

## Animation / FX
- Subtle 3D parallax on the rocks (likely a few translate-on-scroll layers + small rotation; not a real engine).
- The flame/sphere is plausibly an MP4/WebM autoplay — small file, looped — not WebGL.
- Card hover scaling minimal (1.01x) and chrome-style border highlight.

## Microcopy / tone
- Single-sentence, high-aspiration claims ("The all-in-one platform for financial advisers").
- Section heads are full sentences in serif, with subline in sans — the tonal split is part of the brand.
- "Get Started For Free" → soft, low-friction CTA verb.

## What to copy or adapt for DV
1. **Hero 3D leitmotif** — own a single 3D form (e.g., a faceted, glowing **DV core**: an octahedron / kernel-shape that lives in the hero, then reappears small in product cards and footer). This is exactly the role the Three.js home-hero ring plays today; commit to **a single reusable shape** across the home + product page heroes (use different camera angles instead of different shapes). Rock-as-mascot is over-fitted to "obsidian"; for DV the asset would be a stitched lattice or kernel form.
2. **Serif accent for one-off headlines** — introduce an editorial serif (e.g., "Fraunces" or "PP Editorial New") **only** for blog post headlines and the manifesto/quote section. Do not replace Space Grotesk; pair them. Limited use will read as intentional rather than inconsistent.
3. **Floating product mock half-overlapping the hero** — easy way to add depth and a "real interface" promise. Apply to `home.ts` after the WebGL hero: a glass-framed dashboard mock that sits at the bottom of the hero and overlaps the section beneath. (Already partly done with our compatibility section; we can lift it visually.)
4. **2-up bento with reused 3D leitmotif at small scale** — when we redesign the "Why DeepVariance" section, dock the kernel asset inside one card at 30% size — the same form, different angle, same neon halo.
5. **Magazine-spread sections** with serif heading, horizontal hairline rules between sub-segments, sub-caption + body, image floating on the right. Excellent for `roadmap.ts` "Vision" intro and the long-form blog index.

## What to avoid copying
- Heavy serif throughout will read as fashion/financial; for AI infra it can feel off. Restrict serif to **manifesto + blog**.
- Their stone images are massive PNGs — we should avoid >300KB hero images; use AVIF/WebP and constrain hero asset to <250KB.
- The cookie banner overlap looks fine here, but we should make sure ours doesn't compete with our floating action bar.

## Concrete component proposals
- `app-leitmotif-asset` — wrapper that loads the chosen DV core asset (Three.js scene re-used or a static SVG) at variable size, with neon halo.
- `app-magazine-row` — left column: serif headline + sub-list with `<hr>` dividers and small captions; right column: image / mock; renders as a single column on `sm`.
- `font-editorial` Tailwind family — `["'Fraunces'", "ui-serif", "Georgia", "serif"]`.
- Optional: a small `app-stone-frame` component for blog cover images (a dark inset border with corner-only highlight).
