# Static Assets — Generation Brief

> Lives at the **repo root** so it's easy to find. Do not delete; treat as the running art-direction doc.

This file enumerates every illustration, animation, photograph, or 3D render the design needs **but the code cannot generate cheaply at runtime**. For each item the brief includes: source of the idea (which inspiration site), where in the codebase it slots in, target dimensions, file format(s), motion notes, and acceptance criteria.

Once an asset is delivered, drop it into `src/assets/marketing/<slug>/` (create the folder when first used) and update the row's "Status" column to `Delivered`.

Conventions:
- **Static raster**: AVIF + WebP fallbacks, `srcset` at 1x/2x/3x.
- **Vector / icons**: SVG, optimized with `svgo --multipass`, no embedded raster.
- **Looping motion**: WebM (VP9) + MP4 (H.264) fallback, ≤3s loop, ≤250 KB on `lg+`, ≤120 KB if also used on mobile.
- **3D**: glTF/GLB only if we plan to render live in Three.js; otherwise a pre-rendered video is preferred.

---

## A. Brand-leitmotif assets (highest priority)

### A1. **DV Core** — single iconic 3D form, the brand's leitmotif
*Inspiration: `inspirations/mastra/` (metaball+spokes), `inspirations/obsidianos/` (sculptural rocks), `inspirations/lemurianlabs/` (spectrum gradient).*
- **What**: A faceted, glowing **kernel/lattice** sculpture that reads as "computation crystallized". Imagine a low-poly icosahedron whose faces are gently extruded with neon-green inner light bleeding through hairline seams. The form should feel architected, not organic — closer to a kernel grid than a flame.
- **Variants needed**:
  - `dv-core-large.glb` — for the home `<app-hero-canvas>`. Camera orbits slowly; supports `prefers-reduced-motion` static frame.
  - `dv-core-small.svg` — flat SVG for footer mark, favicon, and small inline reuse.
  - `dv-core-still.webp` (1280x1280, 2560x2560 @2x) — fallback hero image when WebGL is disabled or for blog OG images.
  - `dv-core-loop.webm` + `.mp4` (1280x1280, 24fps, 3s loop, ≤250 KB) — mobile fallback.
- **Color**: black background; primary highlights at `#00ff66` (neon) and `#6bff83` (neon-bright); seam glow `#c0c1ff` (indigo-soft) at 30% intensity; ambient surface dark graphite `#1c241c`.
- **Motion**: 3s breath cycle (subtle inner glow pulse), plus 12s slow rotation on Y axis; never any camera shake.
- **Slots in codebase**:
  - `src/app/components/hero-canvas.ts` — replace current particle-torus with the GLB if we go live, OR mount the WebM via `app-leitmotif-asset`.
  - `src/app/components/footer.ts` — small SVG mark left of copyright.
  - `src/index.html` — `apple-touch-icon` and `og:image` use the still.

### A2. **Per-product spoke labels for `app-spoke-graph`**
*Inspiration: `inspirations/mastra/01-above-fold.png` (radial labels around the metaball).*
- **What**: Set of 4–8 monochrome line icons (neutral white at 90% opacity) per product, each ≤32×32, sized for the spoke endpoints in the SVG graph. We need **distinct icons per concept** — see lists per product below. We can author these ourselves with `lucide-angular` if you prefer; flag here in case you want a custom set.
- **Sets**:
  - **Optimemory**: Profile, Partition, Stitch, Serve.
  - **HyperRAG**: Ingest, Index, Retrieve, Compose, Serve.
  - **DeepTuner**: Trace, Tune, Verify, Deploy.
- **Format**: SVG, 32×32 viewport, stroke 1.5, neutral; one accent variant in `currentColor` so we can tint per module token.
- **Slot**: passed as `module.icon` into `app-spoke-graph`.

---

## B. Hero / section illustrations

### B1. **Topographic wireframe wave** (background accent for hero)
*Inspiration: `inspirations/mantisgrid/01-above-fold.png` (warped grid contours).*
- **What**: A wireframe / contour-line mesh that sits behind the hero text on `home.ts` (and optionally section headers on product pages). Subtle parallax. Two-tone version: neon-green primary, indigo-soft secondary.
- **Format**: SVG (animatable) preferred, 1920×1080 with safe-area padding so a 1024-wide crop reads well; or a WebM at 24fps if SVG path animation is too heavy.
- **Motion**: drift at 0.05px/frame on the X axis, infinite loop. Pause on `prefers-reduced-motion`.
- **Slot**: dropped behind the `home.ts` hero text inside `<app-hero-canvas>` parent (z-index between the WebGL background and the headline).

### B2. **Vertical "data rain" hero animation per product**
*Inspiration: `inspirations/neon/01-above-fold.png` (vertical bars / playhead pulse).*
- **What**: Three short vertical-bar animations, one per product, themed differently:
  - Optimemory: bars representing **memory page partitions**, with a bright "playhead" sweeping across. Color: neon + dim graphite.
  - HyperRAG: bars representing **trie depths** that grow upward as the loop progresses. Color: neon + indigo accent.
  - DeepTuner: bars representing **loss curves** with a single bright bar that "settles". Color: neon + violet accent.
- **Format**: WebM + MP4, 1920×600, 24fps, 5s loop, ≤350 KB on `lg+`. Provide a 1024×320 mobile variant ≤120 KB.
- **Slot**: full-bleed hero background on each product page (above the `app-section-rail`), behind the headline, with a 70% black gradient overlay for legibility.
- **Note**: If you'd rather not produce three videos, we can render these in Canvas2D ourselves at runtime — let us know.

### B3. **Product dashboard mocks** (high-fidelity)
*Inspiration: `inspirations/mantisgrid/03-second-fold.png` (dashboard cards), `inspirations/trymirai/01-above-fold.png` (full Mac chrome screenshot).*
- **What**: Three high-fidelity screenshots / Figma-rendered images of fictional DV dashboards used as the **media-top** hero of each product card on `home.ts` and as the **floating product mock** under each product page hero.
  - `optimemory-dashboard.png` — kernel partition timeline + GPU memory map.
  - `hyperrag-dashboard.png` — retrieval trace, top-k rerank table, latency breakdown.
  - `deeptuner-dashboard.png` — optimization run grid, before/after metric pair.
- **Format**: AVIF + WebP fallback, 2400×1500 master + 1200×750 @1x. Background dark `#0c160c`. Use `IBM Plex Mono` for any tabular numbers, `Inter` for chrome, `Space Grotesk` for tab titles.
- **Slot**: `app-glass-card[variant=media-top]` and `app-hero-product-mock`.
- **Acceptance criteria**: every number must be plausible and consistent with our marketing claims; avoid lorem ipsum; reuse colors from `tailwind.config.js`.

### B4. **Manifesto block 3D / texture asset**
*Inspiration: `inspirations/obsidianos/01-above-fold.png` (rocks), `inspirations/obsidianos/03-second-fold.png` (3D fluid sphere).*
- **What**: One restrained "object on a black field" still — a faceted block with a faint inner light, sitting at the right of the manifesto block on `home.ts`. Should NOT be a sphere or rock (Obsidian owns those metaphors); a **layered slab** suggesting layered compute is on-brand.
- **Format**: AVIF + WebP, 1600×1600 master, plus a 800×800 @1x.
- **Slot**: right column of the light-elevated manifesto card. Optional: small loop video alternative.

---

## C. Diagram / graph artwork

### C1. **Pipeline step icons** (4 minimal icons in step pills)
*Inspiration: `inspirations/callsine/01-above-fold.png` (color-pill steps with icons).*
- **What**: A coherent set of step-pill icons — `find / research / generate / deploy`-style — but tuned for our pipelines. We need 4 per pipeline; reuse where possible.
- **Format**: SVG, 24×24, stroke 1.5, currentColor.
- **Slot**: `app-step-pill`.

### C2. **Tool / framework logos for `app-tool-strip`**
*Inspiration: `inspirations/neon/04-third-fold.png` (Cursor / Windsurf / Cline / Zed / OpenAI), `inspirations/mastra/01-above-fold.png` (Marsh / Replit / Netlify / Docker / Plaid / Elastic).*
- **What**: Official monochrome (white at 70% opacity) logos for: PyTorch, JAX, vLLM, TensorRT, SGLang, Triton, NVIDIA, AMD ROCm, Hugging Face. Plus, optionally, customer / press logos as we accumulate them.
- **Format**: SVG, single color (`currentColor` for tinting). Use trademark-compliant assets only — pull from each project's brand kit.
- **Slot**: `app-tool-strip`.

### C3. **Arc-timeline phase art for `roadmap.ts`**
*Inspiration: `inspirations/mastra/04-third-fold.png` (Prototype / Staging / Prod arcs).*
- **What**: We can render arcs in pure SVG, but we need three small badge marks: `RELEASED`, `BETA`, `RESEARCH`. Each badge: a 40×16 pill SVG with our color tokens.
- **Format**: SVG.
- **Slot**: `app-arc-timeline`.

---

## D. Decorative textures

### D1. **Dotted-grid background tile**
*Inspiration: `inspirations/callsine/01-above-fold.png` (paper-feel dotted grid).*
- **What**: 24×24 transparent PNG/SVG with a single 1px dot at the corner; tile via CSS `background-repeat: repeat`. (Already proposed as a CSS `radial-gradient` in the synthesis — flag here in case we want a richer texture variant.)
- **Slot**: behind `roadmap.ts` and `pricing.ts` glass cards.

### D2. **Hairline divider rule**
*Inspiration: `inspirations/obsidianos/04-third-fold.png` (magazine-spread hairlines).*
- **What**: 1px gradient SVG `<line>` with neon-fading ends. Reusable component, but we need a single "spec" SVG for the dev to mimic exactly. Easy: 320×1 with a 0%→8%→100% opacity ramp on the `linearGradient`.
- **Slot**: `app-magazine-row` between sub-list items.

---

## E. Open-graph / social cards

### E1. **OG cover for each route** (12 routes)
- **What**: One 1200×630 image per public route, branded consistently (DV core mark on left, page title in Space Grotesk on right, neon underline). Use the leitmotif still (A1) as the left third.
- **Format**: AVIF + PNG (PNG is the broadest-supported OG format).
- **Slot**: referenced in `SeoService` per route.
- **Routes**: `/`, `/optimemory`, `/hyperrag`, `/deeptuner`, `/use-cases`, `/pricing`, `/roadmap`, `/blog`, `/blog/:slug` (pattern; backed by post hero in Sanity), `/privacy-policy`, `/terms-of-service`, `/cookie-policy`.

---

## F. Photography (low priority — only if used)

### F1. **Team / about photography**
- We currently have no `/about` page. If you ever add one, brief is: dark backdrop, single subject, high contrast — same tone as Obsidian's centerpiece imagery.

---

## Status table

| ID | Asset | Status | Notes |
|----|-------|--------|-------|
| A1 | DV Core (GLB + SVG + still + WebM) | ☐ Pending | Must land before "leitmotif" pass. |
| A2 | Spoke icons per product | ☐ Pending | Or use Lucide subset; mark final source. |
| B1 | Topographic wireframe wave | ☐ Pending | SVG preferred. |
| B2 | Per-product data-rain animations (×3) | ☐ Pending | Or runtime canvas; decide. |
| B3 | Dashboard mocks (×3) | ☐ Pending | High effort; highest visual return on product pages. |
| B4 | Manifesto block art | ☐ Pending | Optional but recommended. |
| C1 | Step-pill icons (×4 per pipeline) | ☐ Pending | Minimal; could DIY. |
| C2 | Tool / framework logos | ☐ Pending | Pull from official brand kits. |
| C3 | Phase badge SVGs | ☐ Pending | Trivial — can DIY. |
| D1 | Dotted-grid tile | ☐ Pending | CSS gradient is fine; only ask if you want texture. |
| D2 | Hairline divider rule | ☐ Pending | Trivial — can DIY. |
| E1 | OG cards (×12 routes) | ☐ Pending | Required for shareable launch. |
| F1 | Photography | ☐ Out of scope (no /about route yet). |

---

## What I will *not* ask you for

- **Iconography for navigation / UI controls** — handled with `lucide-angular`.
- **Hero WebGL backgrounds** — handled by `webgl-background.ts` (raw GLSL, persistent across routes).
- **Code highlighting themes** — handled by Prism (lazy-loaded for blog posts).
- **Loading skeletons / spinners** — we'll style with Tailwind.

If anything in this brief feels heavy, ping me — most items have a "DIY in code" fallback. The **ones to prioritize sourcing are A1, B2, and B3**; everything else can be filled in with CSS/SVG runtime tricks.
