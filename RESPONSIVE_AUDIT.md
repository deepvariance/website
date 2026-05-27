# Responsive Layout Audit

**Date:** 2026-05-24  
**Viewport:** Mobile 390×844, Tablet 768×1024, Desktop 1440×900  
**Evidence:** `screenshots/responsive/{page}/` (captured via `node audit-responsive.mjs`)  
**Method:** Visual review of Playwright screenshots; file hints from codebase cross-check only.

---

## Executive summary — top 5 systemic issues

1. **Header bar overflow on mobile (all 18 routes)** — The floating header fits logo + visible “Contact us →” + hamburger in ~390px; the menu toggle is **clipped at the right edge** on fold shots across home, platform, product pages, use-cases, legal, etc. (`screenshots/responsive/*/mobile-fold.png`). See `src/app/components/header.scss` (`.dv-header__inner` padding; `.dv-actions` still shows `.btn-primary` in running build despite `@media (max-width: 1023px) { display: none }` intent).

2. **Benchmarks table unusable below desktop width** — Seven-column table with `min-width: 36rem` is **cut off** on mobile and tablet; Hardware / Workload / Result / Status columns are not readable. Parent `.benchmarks-page { overflow-x: clip }` likely **suppresses** horizontal scroll on `.tab-content { overflow-x: auto }`. (`screenshots/responsive/benchmarks/mobile-full.png`, `tablet-full.png`).

3. **Product hero graphics wider than viewport** — Tailwind product pages use full-bleed hero art that **clips horizontally**: HyperRAG diagram (left document nodes off-screen), DeepTuner GPU grid (4th column clipped), OptiMemory (headline/copy below fold—hero image only). (`hyperrag/mobile-fold.png`, `deeptuner/mobile-fold.png`, `optimemory/mobile-fold.png`).

4. **Mobile menu overlay incomplete** — Open menu is a card overlay **without a dimmed backdrop**; hero CTAs (“See the platform”) remain visible and compete with menu CTAs. Duplicate “Contact us” in header + menu. (`home/mobile-menu-open.png`, `platform/mobile-menu-open.png`).

5. **Inconsistent responsive patterns (SCSS vs Tailwind)** — SCSS pages (home, platform, pricing) generally stack sections; Tailwind use-case pages keep **2-column stat grids** on 390px (cramped labels); platform hero **stack diagram stays horizontal** on mobile (illegible labels). Legal cookie table lacks effective mobile treatment despite `overflow-x-auto` wrapper in source.

---

## Per-page checklist

| Page | Mobile OK? | Tablet OK? | Issues (severity) |
|------|------------|------------|-------------------|
| home | Partial | Yes | Header toggle clipped (P1); menu lacks backdrop, hero CTA bleeds through (P2); hero side-by-side CTAs tight (P2) |
| platform | Partial | Partial | Header clipped (P1); hero diagram horizontal, tiny labels (P2); “What changes / What stays” 2-col cramped on tablet (P2) |
| optimemory | Partial | Yes | Header clipped (P1); no headline above fold—hero image only (P2); full page otherwise stacks OK |
| hyperrag | No | Yes | Header clipped (P1); **hero diagram clipped left** (P1); rest stacks on full-page |
| deeptuner | Partial | Partial | Header clipped (P1); **hero 4-col GPU grid clipped right** (P1); 2×2 feature grid cramped (P2) |
| benchmarks | **No** | **No** | **Table columns clipped, no scroll** (P0); header cramped (P1) |
| docs | Partial | Yes | Header clipped (P1); large gap before footer (P2) |
| pricing | Partial | Yes | Header clipped (P1); pricing cards stack OK; extra vertical whitespace (P2) |
| use-cases | Partial | Yes | Header clip / menu sliver (P1); index stacks well on full-page |
| use-case-hpc | Partial | Yes | Header clipped (P1); 2-col stat cards cramped (P2) |
| use-case-gpu-providers | Partial | Yes | Same as HPC |
| use-case-enterprise | Partial | Yes | Same; stat card text wraps heavily |
| use-case-research | Partial | Yes | Same |
| use-case-manufacturing | Partial | Yes | Same |
| company | Partial | Yes | Header clipped (P1) |
| blog | Partial | Yes | Header clipped (P1) |
| privacy-policy | Partial | Yes | Header clipped (P1); long monospace body (P2) |
| terms | Partial | Yes | Header clipped (P1); large hero gap (P2) |
| cookie-policy | No | Partial | Header clipped (P1); **cookie table TYPE/PURPOSE clipped or cramped** (P1) |

---

## Detailed findings

### P0 — Critical

#### P0-1: Benchmarks table data inaccessible (mobile + tablet)

- **Screenshot:** `screenshots/responsive/benchmarks/mobile-fold.png`, `mobile-full.png`, `tablet-full.png`, `tablet-fold.png`
- **Description:** Only Product, Metric, and partial Baseline columns visible; Hardware (“HA…”), Workload, Result, and Status (“REPRODUCIBLE”) are cut off. No visible horizontal scroll affordance in screenshots.
- **Suggested fix:**
  - Remove or replace `overflow-x: clip` on `.benchmarks-page` in `src/app/pages/benchmarks.scss` so `.tab-content` scroll works; add visible scroll hint (shadow/fade).
  - Alternatively: card layout per row under `768px`, or hide low-priority columns.
  - Table: `.benchmark-table { min-width: 36rem }` forces width—keep min-width only inside scroll wrapper.

---

### P1 — High

#### P1-1: Global header — hamburger toggle clipped (18/18 pages)

- **Screenshots:** All `screenshots/responsive/*/mobile-fold.png` (e.g. `home/mobile-fold.png`, `pricing/mobile-fold.png`, `use-case-hpc/mobile-fold.png`)
- **Description:** Right edge of viewport clips the `.dv-mobile-toggle` (three lines / menu icon). “Contact us →” remains in header on mobile, crowding the bar.
- **Suggested fix:** `src/app/components/header.scss` — enforce hiding header CTA below `1024px` (verify specificity); reduce logo mark size or shorten CTA label on `<480px`; add `padding-right` on `.dv-header__inner`; ensure `.dv-actions { min-width: 0 }` and toggle `flex-shrink: 0` only on toggle; consider `max-width: calc(100vw - 2rem)` on inner bar.

#### P1-2: HyperRAG hero diagram horizontal overflow

- **Screenshot:** `screenshots/responsive/hyperrag/mobile-fold.png`
- **Description:** Central hex diagram extends past left edge; input document icons clipped.
- **Suggested fix:** `src/app/pages/hyperrag.ts` (inline template) — wrap hero image in `overflow-hidden` container; use `max-w-full h-auto` / `object-fit: contain`; scale asset or swap to mobile-specific crop.

#### P1-3: DeepTuner hero GPU grid does not reflow

- **Screenshot:** `screenshots/responsive/deeptuner/mobile-fold.png`, `mobile-full.png` (hero rows)
- **Description:** Four GPU icons per row; rightmost column partially off-screen.
- **Suggested fix:** Tailwind grid in `src/app/pages/deeptuner.ts` — `grid-cols-2` default, `sm:grid-cols-4` at larger breakpoints; or single-column on `<640px`.

#### P1-4: Cookie Policy — cookies table clipped on mobile

- **Screenshot:** `screenshots/responsive/cookie-policy/mobile-fold.png`, `mobile-full.png`
- **Description:** “Cookies We Use” table: TYPE column shows “Analy…” truncated at container edge.
- **Suggested fix:** `src/app/pages/cookie-policy.ts` — ensure parent of `overflow-x-auto` is not clipped; stack rows as cards (`md:table` pattern); reduce columns on mobile (hide Provider, show in card subtitle).

#### P1-5: Platform hero stack diagram unreadable on mobile

- **Screenshot:** `screenshots/responsive/platform/mobile-fold.png`, `mobile-full.png`
- **Description:** Models / Frameworks / Deep Variance Stack remain in horizontal rows; labels too small to read.
- **Suggested fix:** `src/app/pages/platform.scss` + `platform.html` — vertical stack below `768px`; optional simplified SVG for mobile.

---

### P2 — Medium

#### P2-1: Mobile menu — no backdrop; duplicate CTAs

- **Screenshot:** `screenshots/responsive/home/mobile-menu-open.png`, `platform/mobile-menu-open.png`
- **Description:** Menu card floats over content; “See the platform” visible under menu; “Contact us” in header and menu footer.
- **Suggested fix:** `header.scss` `.dv-mobile-menu` — add full-viewport `::backdrop` or sibling overlay (`position: fixed; inset: 0; background: rgba(0,0,0,.6)`); hide header CTA when menu open.

#### P2-2: Use-case pages — 2-column stat grids on 390px

- **Screenshots:** `use-case-hpc/mobile-fold.png`, `use-case-gpu-providers/mobile-fold.png`, etc.
- **Description:** Side-by-side metric cards squeeze multi-line labels (“Throughput on attention kernels”).
- **Suggested fix:** Tailwind in `src/app/pages/use-case-*.ts` — `grid-cols-1 sm:grid-cols-2` for stat blocks.

#### P2-3: OptiMemory — no value prop above the fold

- **Screenshot:** `screenshots/responsive/optimemory/mobile-fold.png`
- **Description:** Full viewport below header is hero artwork; H1 and copy appear only after scroll (`optimemory/mobile-full.png`).
- **Suggested fix:** Reorder hero in `optimemory.ts` — text block before image on mobile (`flex-col-reverse` or separate mobile layout).

#### P2-4: Docs / legal — excessive vertical whitespace

- **Screenshots:** `docs/mobile-full.png`, `terms/mobile-fold.png`, `privacy-policy/mobile-fold.png`
- **Description:** Large empty band between main card and footer on short-content pages.
- **Suggested fix:** Reduce `min-height` / section padding on placeholder pages; `docs.ts`, legal page templates.

#### P2-5: Home — hero CTAs side-by-side at 390px

- **Screenshot:** `home/mobile-full.png`, `home/tablet-full.png`
- **Description:** “Contact us” and “See the platform” fit but with minimal side margin; risk at 320px.
- **Suggested fix:** `home.scss` — `flex-direction: column` below `480px` for `.hero-cta` group.

#### P2-6: Platform — “What changes / What stays” two columns on tablet

- **Screenshot:** `screenshots/responsive/platform/tablet-full.png` (mid-page section)
- **Description:** Narrow twin columns on 768px; line length poor.
- **Suggested fix:** `platform.scss` — single column below `1024px`.

#### P2-7: DeepTuner — diagram text illegible on mobile

- **Screenshot:** `deeptuner/mobile-full.png` (studio analysis section)
- **Description:** Technical diagram scaled down; code/node labels unreadable.
- **Suggested fix:** Hide diagram on `<768px` and show bullet summary, or use taller scrollable figure.

#### P2-8: Pricing — long page whitespace between sections

- **Screenshot:** `pricing/mobile-full.png`
- **Description:** Large gaps between pricing cards and “Pilot workflow”.
- **Suggested fix:** `pricing.scss` section spacing tokens for mobile.

---

## Severity totals

| Severity | Count | Notes |
|----------|-------|-------|
| **P0** | **1** | Benchmarks table (blocks reading benchmark data on mobile + tablet) |
| **P1** | **5** | Header clip (site-wide), HyperRAG hero, DeepTuner hero grid, cookie table, platform diagram |
| **P2** | **8** | Menu UX, use-case grids, optimemory fold, whitespace, CTAs, platform tablet columns, deeptuner diagram, pricing spacing |

*Header clipping is classified P1 (toggle partially visible, may still be tappable) but affects every route and should be fixed with P0 urgency.*

---

## Screenshot index

```
screenshots/responsive/
├── home/
├── platform/
├── optimemory/
├── hyperrag/
├── deeptuner/
├── benchmarks/
├── docs/
├── pricing/
├── use-cases/
├── use-case-hpc/
├── use-case-gpu-providers/
├── use-case-enterprise/
├── use-case-research/
├── use-case-manufacturing/
├── company/
├── blog/
├── privacy-policy/
├── terms/
└── cookie-policy/
```

Each folder contains: `mobile-fold.png`, `mobile-full.png`, `mobile-menu-open.png` (where menu exists), `tablet-fold.png`, `tablet-full.png`, `desktop-fold.png`, `desktop-full.png`.

---

## Recommended fix order

1. Benchmarks table scroll / mobile layout (P0)  
2. Header mobile layout — hide duplicate CTA, fix toggle clip (P1, all pages)  
3. HyperRAG + DeepTuner hero assets (P1)  
4. Cookie policy table (P1)  
5. Platform diagram + use-case stat grids (P1/P2)  
6. Mobile menu backdrop + CTA deduplication (P2)

---

*Audit performed by screenshot review only; no source files were modified.*
