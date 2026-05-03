# Inspiration Synthesis → DV Landing

This file consolidates the per-site inspiration MDs into a **prioritized list of changes** mapped to the existing DV pages and components. It is the working brief for the next implementation pass. Content/copy is out of scope for now; everything below is structural, visual, or interactional.

> **Conventions used below**
> - "P0" = high-impact, low-risk, do first.
> - "P1" = adopt soon, may need a small new component.
> - "P2" = stretch, depends on assets we don't have yet (see `../STATIC_ASSETS.md`).
> - File paths are relative to the workspace root.

---

## 1. Cross-cutting / Global

| ID | Pattern | Sources | Where it lands | Priority |
|----|---------|---------|----------------|----------|
| G1 | **Spectrum-gradient hero line**, line 2 dimmed-or-gradient, line 1 neutral white | Lemurian, Mantis, Mirai | `home.ts` hero, product page heroes (smaller scale) | P0 |
| G2 | **Status / event pill above hero** (live · beta · workshop · paper) | Mantis, Mastra | `app.html` (above `<app-header>`) or per-page `home.ts` | P0 |
| G3 | **Top promo banner** (full-width, dismissible, persists via `localStorage`) | Neon | `app.html` | P1 |
| G4 | **News / press strip** under nav (eyebrow + `NEW` pill + highlighted phrase + `→ Read`) | Lemurian | `header.ts` slot | P1 |
| G5 | **Floating action bar** appears after scrolling 1 viewport, glass pill with anchors + CTA | Saaspo | New `app-floating-action-bar` mounted in `app.html` (long routes only) | P1 |
| G6 | **Sticky section-rail** (left col labels, right col content; active label highlights on scroll) | Neon | New `app-section-rail` on Optimemory, HyperRAG, DeepTuner | P0 |
| G7 | **Tool/integration logo strip** ("Works with PyTorch, JAX, vLLM, TensorRT, …") | Neon | Each product page below hero | P0 |
| G8 | **Inline mono command pill in hero row** (`pip install deepvariance` + Quickstart link side-by-side) | Mastra | All product pages, optionally home | P0 |
| G9 | **Per-module color tokens** (`module-rag`, `module-mem`, `module-eval`, …) used only as borders/dots/labels; neon stays "you are here" | Mastra, CallSine | `tailwind.config.js`, then propagated | P1 |
| G10 | **Light-section interlude** (one elevated near-white "manifesto" card between dark sections) | Neon | Home: between products bento and blog teasers | P2 |
| G11 | **Editorial serif** added as `font-editorial` token, used **only** on blog post titles + a single manifesto block | Obsidian | `tailwind.config.js`, `index.html` (font link), `blog-post.ts`, optional manifesto card | P2 |
| G12 | **Single iconic 3D leitmotif** (the "DV core") reused across home + product heroes + footer mark, with product-specific spoke labels | Mastra, Obsidian | `hero-canvas.ts` (or new `app-leitmotif-asset`); needs static fallback (see `STATIC_ASSETS.md`) | P1 |
| G13 | **`prefers-reduced-motion` everywhere**: pause animated terminals, hero canvas, gradient shimmer | Trymirai (negative example: minimal motion) | Existing components — audit for compliance | P0 |

---

## 2. Per-page proposals

### 2.1 `src/app/pages/home.ts`

| Change | Source(s) | Notes |
|--------|-----------|-------|
| Replace eyebrow + H1 with a **two-line headline**: line 1 white, line 2 either gradient (G1) or dimmed; **drop secondary CTA** if a single-action confidence move is desired (Trymirai), otherwise keep both | Mantis, Mirai, Lemurian | Use `app-spectrum-headline` directive; dim alternative just sets `text-on-surface-variant` |
| Add **status/event pill** above the headline | Mantis, Mastra | `app-status-pill` + (later) `app-event-pill` |
| Add **inline `pip install deepvariance` command pill + `Quickstart →`** on the line below the CTAs | Mastra | New `app-command-row` |
| Add a **`Trusted by / Works with` logo strip** under hero (frameworks: PyTorch, JAX, vLLM, TensorRT, SGLang, Triton) | Neon, Mastra, Mantis | New `app-tool-strip`; grayscale by default, color on hover |
| Replace mixed-size product bento with a **2-up "Cloud / Edge"-style split** for the two flagship products + a 3rd row for the third — each card has dashboard preview on top, eyebrow + H3 + 3 bullet feature checks + deep link | Mantis | Update `app-glass-card` "media-top" variant |
| Below products, add a **`STEP 1..4` horizontal pipeline** showing the canonical DV flow (`PROFILE → PARTITION → STITCH → SERVE` as the headline pattern, even if shown abstractly) | CallSine | New `app-pipeline-row` |
| Insert a **light-elevated manifesto card** (G10) before the blog teasers — short editorial serif headline (e.g., "We build the runtime under the runtime.") with one mono refrain block | Lemurian, Obsidian, Neon | Conditional on `font-editorial` being available |
| Keep the existing Three.js hero canvas; **bind the leitmotif** so the same form recurs in product pages | Mastra | See G12 |

### 2.2 `src/app/pages/optimemory.ts`

| Change | Source(s) | Notes |
|--------|-----------|-------|
| Add **sticky `app-section-rail`** with `Hero / How it works / VMM stitching / Performance / Code / Compatibility / Roadmap` | Neon | Side rail visible on `lg+`; collapsed `<details>` on small |
| Replace static SVG hero illustration with the **DV-core leitmotif** rendered with Optimemory-flavored spoke labels (`Profile / Partition / Stitch / Serve`) | Mastra | `app-spoke-graph` |
| Convert the current vertical step layout into a **horizontal `app-pipeline-row`** with color-coded `STEP 1..4` pills | CallSine | Use `step-1..4` color tokens |
| Replace the abstract VMM-stitching SVG with an **animated terminal "tape"** showing kernel stitches happening (typed) — keeps it real | Mirai | New `app-typed-terminal` |
| Add **integration tool strip** | Neon | `app-tool-strip` |
| Add **inline command row** in the hero | Mastra | `app-command-row` |
| Move benchmarks (if any) to **`app-bench-bars`** — horizontal bars with hardware/model dropdowns | Mirai | |

### 2.3 `src/app/pages/hyperrag.ts`

| Change | Source(s) | Notes |
|--------|-----------|-------|
| Same `app-section-rail` as Optimemory | Neon | |
| Convert "How HyperRAG works" 3-step row into a **vertical accordion** — each step pairs a small mock on the left with copy + 3 bullets on the right | Mirai | New `app-accordion` |
| Promote the benchmark **table** into the new **`app-bench-bars`** with `Model` + `Hardware` dropdowns, `± stddev`, "Higher is better" annotation | Mirai | Keeps the numbers, adds the visual |
| Replace static prefix-trie SVG with a **typed terminal** that shows trie growth (`+ "deep" → +"variance" → +"core" …`) | Mirai | |
| Add **per-module spokes** to the leitmotif: `Index / Retrieve / Compose / Serve` | Mastra | |
| Add a **`Most retrieval stacks…` challenge section** above the model presets — 3 callout cards naming failure modes (one-size embeddings, static chunking, no compose) | CallSine | New `app-challenge-callouts` |

### 2.4 `src/app/pages/deeptuner.ts`

| Change | Source(s) | Notes |
|--------|-----------|-------|
| Same `app-section-rail` | Neon | |
| Hero: **dimmed-line-2 + single CTA** (Mirai pattern); add inline `dv tune --target=H100` command pill | Mirai, Mastra | |
| Convert "future research" cards to a **lifecycle arc** if the cards represent stages | Mastra | Optional; only if natural |
| Replace optimization-curves SVG with a **subtle typed-trace terminal** that emits `iter 12 — loss=…` lines | Mirai | |

### 2.5 `src/app/pages/use-cases.ts`

| Change | Source(s) | Notes |
|--------|-----------|-------|
| Convert the 5-card bento into a **filterable directory** with chip groups: `Vertical / Model class / Deployment / Stage` | Saaspo | New `app-filter-chips` + signal-driven filtering |
| Each card uses the **`app-browser-frame`** wrapper with a screenshot/mock if available | Saaspo | Optional fallback to plain glass card |
| Per-vertical detail sections become **magazine-spread rows** with hairline dividers between sub-points | Obsidian | New `app-magazine-row` |

### 2.6 `src/app/pages/pricing.ts`

| Change | Source(s) | Notes |
|--------|-----------|-------|
| Add a **manifesto / challenge block** above the form: "Most LLM serving stacks are just shrunken cloud setups." with 3 callout cards | CallSine, Lemurian | `app-challenge-callouts` |
| Add a **3-up alliterative card row** (e.g., `Performance / Portability / Predictability`) just below the manifesto | Lemurian | Reuse `app-glass-card` |
| Keep contact form glass styling and `businessEmailValidator`; place form inside an `app-magazine-row` for premium feel | Obsidian | Optional |

### 2.7 `src/app/pages/roadmap.ts`

| Change | Source(s) | Notes |
|--------|-----------|-------|
| Convert glass timeline into **nested arc visualization** — `Released / Beta / Research` arcs | Mastra | New `app-arc-timeline`; data shape minor migration |
| Add **filter chips** (Released | Beta | Research | All) above the visualization | Saaspo | |

### 2.8 `src/app/pages/blog.ts` + `blog-post.ts` + `blog-card.ts`

| Change | Source(s) | Notes |
|--------|-----------|-------|
| Use `app-browser-frame` for blog-card cover images | Saaspo | |
| Use `font-editorial` (G11) on `<h1>` of blog-post template for a quiet editorial feel | Obsidian | Constrain — body remains Inter |
| Add a **small "posts • N" counter** beside the Blog nav link (header) | Saaspo | Computed from Sanity result; cached briefly |
| Add an **`app-newsletter-card`** in the blog index hero | Saaspo | Single email input, FormSubmit endpoint |

---

## 3. Components to add (with file targets)

```
src/app/components/
  status-pill.ts           // Mantis — `live | beta | preview | soon`
  event-pill.ts            // Mastra — pulsing dot, label, date, link
  promo-banner.ts          // Neon — top banner; dismissible (localStorage)
  news-strip.ts            // Lemurian — `NEW · LABEL — phrase → Read`
  floating-action-bar.ts   // Saaspo — appears after 1vh scroll
  section-rail.ts          // Neon — sticky left rail w/ active highlight
  tool-strip.ts            // Neon, Mastra, Mantis — logo row
  command-row.ts           // Mastra — inline copyable pill + secondary link
  copy-pill.ts             // Neon — single-line copyable command
  pipeline-row.ts          // CallSine — 4-up step cards w/ color pills
  step-pill.ts             // CallSine — `STEP N — LABEL`
  challenge-callouts.ts    // CallSine — challenge headline + 3 callout cards
  bench-bars.ts            // Mirai — horizontal bars + dropdowns
  typed-terminal.ts        // Mirai — animated terminal lines
  hero-product-mock.ts     // Mirai — dark-frame product screenshot wrapper
  browser-frame.ts         // Saaspo — mac chrome + URL bar wrapper
  filter-chips.ts          // Saaspo — chip groups with signal output
  newsletter-card.ts       // Saaspo — email capture card
  magazine-row.ts          // Obsidian — left list w/ hairlines + right image
  spoke-graph.ts           // Mastra — central node + labelled radial spokes
  arc-timeline.ts          // Mastra — nested phase arcs
  accordion.ts             // Mirai — vertical accordion w/ left mock + right copy
  leitmotif-asset.ts       // Obsidian, Mastra — wraps the DV core (three.js or static)
```

## 4. `tailwind.config.js` additions (proposed)

```js
// inside theme.extend:
fontFamily: {
  // existing keys unchanged
  editorial: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
},
colors: {
  // existing keys unchanged; new "step" + "module" namespaces:
  step: {
    1: '#00ff66', // neon
    2: '#7e7eff', // indigo soft (from existing palette)
    3: '#a855f7', // violet
    4: '#f59e0b', // amber
  },
  module: {
    rag:    '#7be88a',
    mem:    '#8be3ff',
    router: '#c0c1ff',
    eval:   '#ffb74d',
    kernel: '#6bff83',
    trace:  '#ff7eb6',
  },
},
backgroundImage: {
  'spectrum-headline':
    'linear-gradient(90deg, #6bff83 0%, #00ff66 30%, #3131c0 65%, #c0c1ff 100%)',
  'dotted-grid':
    'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
},
backgroundSize: {
  'dotted-grid': '24px 24px',
},
```

## 5. Suggested implementation order

1. **G1 + G8 + G7** on home (spectrum headline, command row, tool strip) — biggest visual delta for least code.
2. **G2** status/event pill — header polish, one component.
3. **G6** sticky section-rail across the 3 product pages — improves the longest pages instantly.
4. **CallSine pipeline row** + **Mirai accordion** + **Mirai bench-bars** — the three biggest content-pattern upgrades; build sequentially.
5. **Mastra spoke-graph + leitmotif** — once the static asset is ready (see `STATIC_ASSETS.md`).
6. **Saaspo filterable use-cases** — needs UX writing for chips and acceptance from product side.
7. **Obsidian editorial serif** + **manifesto block** — last; design judgement call after items 1–6 land.

## 6. Inspiration screenshots (where to look while building)

- **G1** spectrum hero → `inspirations/lemurianlabs/01-above-fold.png`, `inspirations/mantisgrid/01-above-fold.png`
- **G6** sticky rail → `inspirations/neon/03-second-fold.png`, `inspirations/neon/04-third-fold.png`
- **CallSine pipeline** → `inspirations/callsine/01-above-fold.png`
- **Mirai bench-bars** → `inspirations/trymirai/04-third-fold.png`
- **Mastra spoke-graph + leitmotif** → `inspirations/mastra/01-above-fold.png`, `inspirations/mastra/03-second-fold.png`
- **Mantis dual-product split** → `inspirations/mantisgrid/03-second-fold.png`
- **Obsidian magazine row** → `inspirations/obsidianos/04-third-fold.png`
- **Saaspo filters + browser frames** → `inspirations/saaspo/01-above-fold.png`
