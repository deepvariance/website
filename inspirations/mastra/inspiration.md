# Mastra (TypeScript agent framework) — UI/UX Inspiration

URL: https://mastra.ai/?ref=saaspo.com
Captured: `01-above-fold.png`, `02-full-page.png`, `03-second-fold.png`, `04-third-fold.png`

## Snapshot
- TypeScript framework for AI agents (RAG, MCP, Memory, Tools, Workflows, Evals).
- Closest neighbor in vibe and audience to DV — and arguably the strongest **single-asset hero leitmotif** of the bunch.

## Visual identity
- **Palette**: black `#000`, near-white type, a **per-feature accent palette** (each module on the spoke graph uses a distinct color: green for RAG, white for Tools, magenta for Auth, orange for Networks, etc.). This converts the modular product into a **legend** the user learns once and reuses.
- **Type**: Geist/Inter sans, headline weight 700, monospace for code (`npm create mastra` pill).
- **Iconography**: each module has a unique generative icon (radial dot pattern, spiral, hexagon node) — they look like product DNA.

## Hero pattern — **the standout**
- Hero copy on the left, **giant centered metaball/blob "system core"** on the right with **labelled spokes** radiating outward, each spoke ending in a colored circle that contains the module icon and a label (`Tools`, `MCP`, `RAG`, `Memory`, `Workflows`, `Networks`, `Observability`, `Evals`, `Deployments`, `Auth`).
- Above the headline: small green-dot **LIVE WORKSHOP** event pill that links to the workshop page. Dual purpose: brand + community signal.
- **Inline mono command pill**: `npm create mastra` with a copy icon, sitting on the same line as a "Quickstart ↗" link. Two CTAs in one row of mono — smart.
- Logo strip directly under the hero (Marsh, Replit, Netlify, Docker, Iterable, Plaid, Elastic).

## Repeating leitmotif
- The blob reappears in the next section ("Build and iterate") with arrows pointing to a CLI install panel and a System Prompt panel. **Same hero asset, two different scenes** — the visual continuity is the point.
- Below: 6 dark icon tiles arranged in a row — the same module icons from the hero spokes, now as feature entries. The user has already learned them.

## Section patterns
- **"Build and iterate"** with a tagged `[ Agent Framework ]` pill above; the system-prompt mock has small tagged labels (`Sage`, `Max`, `Alex`) — colored chips in green/orange/magenta, again pulling from the hero palette.
- **Monospace data art**: a dense block of randomized characters with colored highlights — looks like a dump but reads as "this is observability". Reused as an aesthetic element.
- **"Run your agents in a local dev server / Your developer studio"** — 2-up clear pairing, glass cards with mocks above.
- **Observability platform** section uses **nested arcs** (Prototype → Staging → Prod), each arc colored to match a stage; tags mounted on the arc curves. Excellent way to show a lifecycle visually.
- **Code blocks with inline highlights** — selectively colored words for emphasis, otherwise bone-white text on near-black.

## Animation / FX
- The metaball is plausibly a particle simulation or pre-rendered video; either way it pulses gently.
- Spoke labels probably fade-in on hover with the matching color.
- Logo strip is static.

## Microcopy / tone
- "Ship more capable agents." — strong present-tense verb.
- "Mastra is the modern TypeScript framework for AI-powered applications and agents." — positions the language and the product class in one line.
- Module labels are all single words, all-caps in code panels.

## What to copy or adapt for DV
1. **Single iconic hero asset reused as a leitmotif** — adopt one **DV core** (a faceted lattice/kernel) that appears in:
   - Home hero (large, centered or right of headline, fully animated).
   - Product page heroes (same asset, smaller, with **product-specific spokes/labels**: Optimemory's spokes = "Profile / Partition / Stitch / Serve"; HyperRAG's = "Ingest / Index / Retrieve / Serve"; DeepTuner's = "Trace / Tune / Verify / Deploy").
   - Footer mark / favicon (tiny static SVG).
2. **Spoke graph as product anatomy** — replace static feature grids on each product page with a labelled spoke graph: the DV core in the middle, 4–8 modules ringing it, each spoke labelled with a phrase. Hover/tap a node → highlight + tooltip. Use SVG with `<line>` connectors and `<g>` clusters; cheap and accessible.
3. **Inline command pill in hero copy row** — `pip install deepvariance` (or `dv init`) sitting on the same text line as a "Quickstart →" link. Single row, dual CTA.
4. **Per-module color tokens** — extend our palette with 6–8 muted module accents (`module-rag`, `module-mem`, `module-router`, `module-eval`, `module-router`) used in spokes/chips/icons but never as background. Strict rule: **only the active module gets neon green**; siblings use their own muted accent. Keeps neon as the "you are here" signal.
5. **Lifecycle arcs visualization** — for `roadmap.ts`: convert the timeline into nested arcs (Released / Beta / Research) similar to Mastra's Observability arcs. Each arc colored to match its phase; milestones positioned on the arc curve.
6. **Workshop / event pill above hero** — when DV runs a webinar / paper drop / conference talk, surface a "LIVE WORKSHOP — Thu Apr 30" pill above the headline with green dot. Cross-route, dismissable.

## What to avoid copying
- The blob is gorgeous but **expensive on mobile** if rendered live. Plan a **pre-rendered MP4/WebM** fallback at <250KB for mobile, with the live WebGL shape only on `lg+`.
- Multi-color module accents can fight our neon if used as backgrounds — restrict to **borders, dots, and labels**.
- Do NOT replicate the "monospace data dump" purely as decoration; it reads great here but on closer inspection it's noise. We should do real-looking traces (sampled from actual telemetry) so a developer audience doesn't smell theater.

## Concrete component proposals
- `app-spoke-graph` — `[modules]` input where each module is `{ id, label, color, x?, y? }`; renders SVG with central node, radial connectors, labelled end-nodes; supports `[active]` input for highlighting.
- `app-event-pill` — `[label]`, `[date]`, `[href]`; green dot pulses; appears above hero; dismissable per route.
- `app-arc-timeline` — `[milestones]`, `[phases]`; renders nested SVG arcs with stage labels; useful for `roadmap.ts`.
- `app-command-row` — inline mono pill + secondary link; renders `<code>` with copy icon and a separate `<a>` next to it on the same baseline.
- `tailwind.config.js`: add `module-{rag,mem,router,eval,kernel,trace}` color tokens (muted, not neon).
