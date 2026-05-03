# MantisGrid AI — UI/UX Inspiration

URL: https://mantisgrid.ai/
Captured: `01-above-fold.png`, `02-full-page.png`, `03-second-fold.png`, `04-third-fold.png`

## Snapshot
- Autonomous reliability platform for AI infra (cloud + edge).
- Direct adjacency to DV: same buyer, same vocabulary (uptime, utilization, business intent).
- Aesthetic: navy/black with electric blue + magenta wireframe accents. Crisp Inter-style sans, dashboard-forward.

## Visual identity
- **Palette**: blue-black background `#070d1a`-ish, body slate `#9aa3b6`, primary `electric blue #2f6bff`, magenta wireframe accents `#a855f7`. Headlines white, second line gradient `cyan→teal`.
- **Type**: Inter / Geist style. Headline weight 700, subhead 500. Numbers in monospace within dashboard previews.
- **Wireframe motif**: warped grid surfaces (left magenta, right blue) wrapping behind the hero — like topographic contours bent in 3D space. Strong, ownable.

## Hero pattern
- **Status pill**: `• MantisGrid AI is now live` — green dot, pill-shaped, centered above headline. Excellent at communicating "we ship".
- **Two-line headline, gradient on the second line** ("Run AI Infrastructure / & Workloads Reliably"). Mirrors Lemurian's pattern but in cool blues.
- **Two CTAs**: solid blue "Join Early Access →" + outlined "Book Demo" — same hierarchy DV already uses with `btn-primary-glow` + `btn-glass`.
- **Trust strip**: "TRUSTED BY INNOVATORS RUNNING AI TRAINING AND INFERENCE INFRASTRUCTURE" (no logos when none yet — clever way to fake-it-til-logos-arrive).

## Layout & IA highlights
- **Dual-product split** under hero: "MantisGrid Cloud" vs "MantisGrid Edge — AI in the Box". Two glass cards, **dashboard preview at top, eyebrow pill, H3, paragraph, 3 bullets with green check icons, deep-link**. This is exactly the pattern we should use for `home.ts` to advertise Optimemory + HyperRAG + DeepTuner — scaled to 3 cards in a row.
- **3-up "Unified View / Track Business Goals / Autonomous Reliability"**: each cell is a dashboard screenshot above a 3-line caption. Image-first feature explanation.
- **"How it Works" with vertical numbered stepper on the left + cinematic dashboard demo on the right**, with the magenta wireframe wave continuing as a connector. Strong sense of cohesion.

## Animation / FX
- Wireframe grid waves likely SVG paths animated with a slow pan / parallax — the sort of asset we should pair with our WebGL background.
- Status pill has a subtle pulsing dot (we already have `animate-pulse-glow` in the Tailwind config — apply it).
- Card hovers lift subtly (translate-y + shadow blue glow).

## Microcopy / tone
- Confident & enterprise: "uptime, utilization, cost efficiency, aligned with your business intent".
- Headlines that explicitly invite skepticism ("One Platform. Any Cloud. Any Edge. Reliable AI.") — repetitive structure with periods works on a dark background.

## What to copy or adapt for DV
1. **Status pill above hero** on `home.ts` ("• Optimemory v1.2 now in private beta"). One-liner, dot color modulates by state (green=live, amber=beta, blue=preview).
2. **Two-up product split with dashboard preview cards** — replace the current static-image bento on the home page with side-by-side glass cards, each with a fake (or real) dashboard preview at top and 3 bulleted feature lines + a deep link below. Right now our home product bento mixes sizes; this keeps comparable products at parity.
3. **3-up "image-first feature" row** for Optimemory and HyperRAG pages: SVG/animated diagram on top, 3-line caption below. Easier to scan than our current full-bleed feature grids.
4. **Vertical numbered stepper + right-side artwork** for "How HyperRAG works" and the Optimemory pipeline. Already partly present, but tightening the alignment (left=steps, right=art) will read better.
5. **Wireframe topographic motif** — generate (see `STATIC_ASSETS.md`) a low-poly contour wave SVG to slot behind hero/section-headers as a non-WebGL accent. Cheap, no JS cost.

## What to avoid copying
- Their hero has **two** wireframe waves (left + right) which crowds the headline on small screens; we should keep it to one accent and let the WebGL gradient do the rest.
- The dashboard previews look great because they're high-fidelity. If we use placeholders, they will feel cheap; commit to a polished mock or skip it.

## Concrete component proposals
- `app-status-pill` (variants: live / beta / preview / soon) — single line, pulsing dot, optional arrow link.
- Update `app-glass-card` to support a "media-top" variant (image/SVG occupies top 55–60% with internal padding 0; content below).
- New `app-stepper` component: ordered list with neon vertical rail, big numbers, hover states; mountable beside any artwork on the right.
