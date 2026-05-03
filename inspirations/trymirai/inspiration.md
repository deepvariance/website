# Try Mirai — UI/UX Inspiration

URL: https://trymirai.com/?ref=saaspo.com
Captured: `01-above-fold.png`, `02-full-page.png`, `03-second-fold.png`, `04-third-fold.png`

## Snapshot
- "Fastest inference engine for Apple Silicon." Edge-inference SDK, peer-tier infra product.
- The single most relevant peer for our UI tone: minimal, technical, benchmark-driven.

## Visual identity
- **Palette**: pure black (`#000`), white type, **single cyan accent** for CTAs in tables/charts (`#00e5ff`-ish). Even more restrained than Lemurian — single accent, no gradients.
- **Type**: minimal sans (Inter / Söhne); H1 ~72px, secondary line in 50–60% opacity. Body `0.95rem`, line-height 1.55.
- **Chrome**: single horizontal line under the nav. Nav is icon-light: discord/X/github icons on the right plus three text links.
- **Layout**: extreme negative space; everything sits on a single column with strict alignment to a 12-column grid.

## Hero pattern
- **Two-line headline where line two is dimmed** ("Your models. Every Apple device." / "The fastest inference engine for Apple Silicon."). The dimming alone creates hierarchy — no eyebrow needed.
- **Single white pill CTA "Talk to us →"** — single action, no secondary CTA. Confidence move.
- **Massive product mock immediately below the hero** — Mac desktop screenshot at full bleed, the chat window centered, real terminal text streaming. Removes the "what does it actually look like" question instantly.

## Section patterns to steal
- **"Convert. / Distribute. / Run."** as a vertical accordion, each panel pairs a terminal animation on the left with a copy panel + 3 checkmark bullets on the right. Each accordion item expands with smooth height transition. Reuses one screenshot motif (terminal) repeated across panels for visual continuity.
- **Benchmark visualizer** at the bottom: dropdowns for `Model` + `Chip`, then horizontal bar charts comparing `Mirai (cyan)` vs `MLX (gray)` for `Prompt t/s` and `Generation t/s`, plus a numeric `± stddev` next to each bar.
- "Higher is better" inline annotation in cyan — a small but powerful reading aid.

## Animation / FX
- Almost none. The only motion is the typed text in terminals and a subtle bar fill animation in benchmarks.
- The minimalism makes the few animations land.

## Microcopy / tone
- "What Apple Silicon delivers today with Mirai." — confident, present-tense, situates the value in user-relatable hardware.
- Section titles are full sentences with periods — reads more like a paper than a brochure.

## What to copy or adapt for DV
1. **Hero with dimmed second line** — kill the eyebrow on `home.ts` and rely on opacity contrast between line 1 (white) and line 2 (45–55% white). Cleaner hierarchy.
2. **Single CTA confidence move** for product pages: above-fold should expose only one primary action ("Request access" / "Read paper"). Secondary actions live below.
3. **Real product mock under each product hero** — currently we use abstract SVGs for VMM stitching, prefix-trie, optimization curves. **Add a real screenshot or rendered terminal under each product hero**, sized like Mirai's: full-width-with-margin, dark frame, centered window inside.
4. **Animated terminal "tape"** — replace static `app-code-window` content with a typed-out animation (timer-based, no library). Use it on Optimemory + HyperRAG hero areas.
5. **Benchmark visualizer with dropdowns** — we already have a benchmark table on HyperRAG; **promote it** to a horizontal bar-chart with cyan bars for HyperRAG and gray bars for baselines, with model + hardware dropdowns. Add `± stddev` and "Higher is better" microcopy. (See `STATIC_ASSETS.md` — no new art required, just CSS/SVG bars.)
6. **Vertical accordion for "How HyperRAG works"** — three steps as expandable rows, each pairing a small visual on the left with copy on the right. Replace the current 3-card row to add interaction depth.

## What to avoid copying
- Mirai's home is **almost too sparse** — we have more story to tell across 3 products. Don't strip the bento grid; just borrow Mirai's restraint per section.
- The single-CTA hero only works because their offer ("Talk to us") is unambiguous. We may want primary + secondary on home; reduce to single only on product pages.

## Concrete component proposals
- `app-bench-bars` — `[rows]` input where each row is `{ label, value, stddev?, accent?: 'neon' | 'muted' }`; renders animated horizontal bars; supports dropdown filters.
- `app-typed-terminal` — `[lines]` input; types each line with a configurable delay; pauses on `prefers-reduced-motion`.
- `app-hero-product-mock` — wrapper that displays a screenshot/SVG with the same dark-frame styling Mirai uses (border, soft glow, mac chrome optional).
