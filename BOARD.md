# Engineering board — Deep Variance website

**Branch:** `fixes/june-4`  
**Visual QC:** `npm run visual:check` (Playwright screenshots). `browser-use` CLI not installed in this environment; use Playwright scripts under `scripts/`.

**Status:** `todo` | `doing` | `done` | `blocked`

---

## P0 — Foundation (sprint 1)

| ID | Dept | Status | Ticket |
|----|------|--------|--------|
| FP-1 | Frontend platform | todo | **Module detail page** — `platform/:slug` + `ModuleDetailComponent` driven by `MODULES` / `findModule()`; remove duplicate optimemory/hyperrag/deeptuner page components |
| FP-2 | Frontend platform | todo | **Use-case detail page** — single route + `data/use-cases.ts`; remove 5 duplicate use-case TS files |
| FP-3 | Frontend platform | todo | **`PageHeroComponent`** — shared hero (dot grid, glow, optional image, KPI slot) |
| FP-5 | Frontend platform | done | **404 route** — `{ path: '**', ... }` + `NotFoundComponent` |
| CL-1 | Component library | done | **Remove unused components** — accordion, filter-chips, stat-strip, pipeline-row, step-pill, tool-strip, challenge-callouts; `ChallengeCallout` → `data/challenge-callout.ts` |
| CL-2 | Component library | done | **Remove dead animation code** — `GsapAnimationsService`, `scroll-reveal`, `count-up` (gsap removed from deps) |
| CL-3 | Component library | done | **Remove unused `three` / `@types/three`** from dependencies |
| CM-1 | Content / data | todo | **Wire `MODULES` to module detail** — hero, benchmarks, FAQs, install snippet from data |
| QA-1 | QA | done | **Playwright smoke + visual capture** — `e2e/smoke.spec.ts`, `scripts/visual-check.mjs`, `npm run test:e2e` / `npm run visual:check` |
| FP-7 | Frontend platform | done | **`setPageSeo()` helper** — `src/app/services/page-seo.ts` (adopt on pages incrementally) |

---

## P1 — Consolidation (sprint 2)

| ID | Dept | Status | Ticket |
|----|------|--------|--------|
| FP-4 | Frontend platform | todo | **`MarketingPageLayout`** — header offset, container, optional section rail slot |
| FP-6 | Frontend platform | todo | **Dashboard isolation** — feature branch only until auth/API complete; no partial merge to `main` |
| FP-7 | Frontend platform | done | **`setPageSeo()` helper** — `page-seo.ts`; migrate remaining pages incrementally |
| DS-1 | Design system | todo | **Design system map** — `docs/DESIGN-SYSTEM.md` (tokens → SCSS → components) |
| DS-2 | Design system | todo | **`app-module-card`** — extract from `.module-card` SCSS + platform markup |
| DS-3 | Design system | todo | **CTA standard** — `app-cta-button` vs `btn-primary` decision + migration |
| DS-4 | Design system | todo | **Section title standard** — `app-section-header` vs `.section-title` |
| DS-5 | Design system | todo | **`SectionBlockComponent`** — eyebrow + title + subhead + projection |
| CL-4 | Component library | todo | **Component inventory table** in README (Primitive / Feature / Chrome) |
| CL-5 | Component library | todo | **Relocate HyperRAG charts** — `bench-bars`, `bench-all-models` under feature folder |
| CM-2 | Content / data | todo | **Centralize use-case copy** in `data/use-cases.ts` |
| CM-3 | Content / data | todo | **IA link audit** — footer/header/routes aligned; fix `/docs/*` redirects or pages |
| PT-1 | Page templates | todo | **External templates** — product pages → `.html` + `.scss` (or FP-1 outcome) |
| PT-2 | Page templates | todo | **Use-case templates** — via FP-2 |
| PT-3 | Page templates | todo | **Legal layout component** — privacy, terms, cookie |
| PE-1 | Performance | todo | **Bundle audit** after dep cleanup; lazy-load HyperRAG chart code |
| PE-2 | Performance | todo | **Image audit** — WebP, dimensions, `fetchpriority` on LCP |
| QA-2 | QA | todo | **Visual regression** — baseline screenshots in CI |
| QA-3 | QA | todo | **Unit tests** — `SeoService`, `findModule()`, Sanity helpers |
| DO-1 | DevOps | todo | **CONTRIBUTING.md** — when to add component vs SCSS |
| DO-2 | DevOps | todo | **CI** — `ng build` on PR |

---

## P2 — Polish (sprint 3)

| ID | Dept | Status | Ticket |
|----|------|--------|--------|
| DS-6 | Design system | todo | **Tailwind vs SCSS rules** in CONTRIBUTING |
| DS-7 | Design system | todo | **Chrome spacing audit** — header/footer vs page density |
| CM-4 | Content | todo | **Copy vs layout split** in data files |
| CM-5 | Content | todo | **Copy review** — filler labels, em dashes, duplicate CTAs |
| PT-4 | Page templates | todo | **Rename npm package** to `deepvariance-website` |
| PE-3 | Performance | todo | **Prerender audit** — blog vs static routes |
| PE-4 | Performance | todo | **Fix Sass mixed-decls warnings** |
| QA-4 | QA | todo | **CI screenshot job** (nightly) |
| QA-5 | QA | todo | **a11y pass** — mobile menu, section rail, focus order |
| DO-3 | DevOps | todo | **Dependabot** — review 15 reported vulns |
| DO-4 | DevOps | todo | **`.gitignore` screenshots** unless intentional |
| CL-6 | Component library | todo | **Storybook** (optional) for primitives |
| PD-1 | Product / dashboard | todo | **Dashboard merge** when complete |
| PD-2 | Product / dashboard | todo | **Dashboard uses marketing tokens** |
| PD-3 | Product / dashboard | todo | **Footer “Console” link** when dashboard public |

---

## Changelog (fixes/june-4)

| Date | IDs | Notes |
|------|-----|-------|
| 2026-05-24 | FP-5, CL-1–3, QA-1, FP-7 | 404 page; removed 9 dead files; dropped three/gsap deps; Playwright e2e + visual-check; module SEO canonical paths fixed |
| 2026-05-24 | — | Board created |
