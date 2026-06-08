# Deep Variance marketing site — production & code quality review

**Date:** 2026-06-04  
**Branch reviewed:** `fixes/june-4` (latest: `f1cbd94`)  
**Scope:** Marketing app only (`src/app/` excluding active dashboard routes). Dashboard code exists but is **not** wired in `app.routes.ts` — treated as WIP, not production surface.

---

## Executive summary

| Area | Score | Verdict |
|------|-------|---------|
| **Ship marketing site** | 7/10 | Build passes, SSR/prerender on, smoke e2e green. Safe to deploy with known gaps. |
| **Production readiness (full)** | 5/10 | No CI, thin tests, dependency advisories, 81MB `public/`, docs IA broken, no visual regression in CI. |
| **Code quality** | 6.5/10 | P0 routing/data wins; still heavy inline templates and dual styling systems. |
| **Design system** | 5.5/10 | Strong SCSS tokens exist; Tailwind duplicates them; adoption is inconsistent. |
| **Separation of concerns** | 6/10 | Data layer for modules/use-cases good; presentation still monolithic in body components. |

**Bottom line:** The site is **deployable** for a marketing launch. It is **not** “production ready in every aspect” until P1 hardening (CI, design-system enforcement, template extraction, perf/a11y pass) is done. Do not merge `dashboard/` to `main` until isolated.

---

## Folder structure (current)

```
src/
├── app/
│   ├── components/          # Shared UI (chrome + features mixed)
│   │   ├── page-hero.*      # NEW — shared hero shell
│   │   ├── module-faq-section.ts
│   │   ├── module-benchmark-table.ts
│   │   ├── bench-bars.ts    # HyperRAG-only; should move to features/
│   │   ├── header|footer|glass-card|cta-button|…
│   ├── data/                # Source of truth for copy/config
│   │   ├── modules.ts
│   │   ├── module-page.config.ts
│   │   ├── use-cases.ts
│   │   └── challenge-callout.ts
│   ├── directives/
│   ├── pages/               # Route components
│   │   ├── module-detail/   # platform/:slug shell + bodies/
│   │   ├── use-case-detail.*
│   │   ├── home|platform|use-cases|docs|get-started|legal|blog|not-found
│   │   └── *.ts with inline `template:` (legal, blog, use-cases hub)
│   ├── services/            # seo, page-seo, sanity
│   └── dashboard/           # ORPHAN — not in app.routes.ts
├── styles/                  # Design tokens (SCSS partials)
│   ├── _tokens.scss
│   ├── _typography.scss
│   ├── _buttons.scss
│   ├── _panels.scss
│   ├── _module-card.scss
│   └── _hero-grid.scss
└── styles.scss              # Global entry + Tailwind layers

public/                      # 81MB — images (39 PNG + 23 WebP + legacy)
e2e/                         # Playwright smoke
scripts/visual-check.mjs     # Manual visual capture (not CI)
```

**Healthy patterns**

- `data/` for modules, use-cases, and page config — clear content vs code split for detail routes.
- Lazy `loadComponent` on heavy routes.
- Chrome components (`header`, `footer`) use external `.html` + `.scss`.

**Structural debt**

- **Three styling channels:** SCSS tokens (`$text-muted`), CSS variables (`:root`), and Tailwind theme (`text-on-surface-variant`) — same concepts, three sources.
- **Module bodies** (`bodies/*.ts`) are 300–530 lines of inline HTML each — P0 consolidated routes, not presentation.
- **`components/` is flat** — no `primitives/` vs `features/` vs `layout/` boundary (BOARD CL-4).
- **`dashboard/`** increases repo noise and audit surface without shipping value.

---

## Design system audit

### What exists (good foundation)

| Layer | Location | Notes |
|-------|----------|-------|
| Primitives | `styles/_tokens.scss` | Colors, type scale, spacing, z-index, motion — well documented |
| CSS variables | `styles.scss` `:root` | Subset exposed for runtime/Tailwind overlap |
| Global type | `styles/_typography.scss` | `:where(h1–h5)` + utility classes |
| Components | `_buttons.scss`, `_panels.scss`, `_module-card.scss`, `_hero-grid.scss` | Real system pieces |
| UI components | `glass-card`, `cta-button`, `status-pill`, `section-header`, `page-hero` | Composable primitives |

### Gaps (not “properly implemented” yet)

1. **No single source of truth**  
   - `$grid-max: 1440px` (SCSS) vs `max-w-[1440px]` (Tailwind, repeated ~30× in templates) vs `maxWidth.container-max` (Tailwind config, barely used).  
   - `$font-size-h2` clamp vs `text-h2: 30px` in Tailwind vs ad hoc `text-3xl md:text-4xl` in templates.

2. **No design-system contract document**  
   - BOARD DS-1 (`docs/DESIGN-SYSTEM.md`) is still todo. Contributors cannot know when to use SCSS vs Tailwind vs a component.

3. **Dual CTA systems**  
   - `app-cta-button` (component) and `.btn-primary` / `.btn-secondary` (`_buttons.scss`) both exist. Header uses component; some globals reference class buttons.

4. **Inline styles persist**  
   - `style="color:#8a8a8a"` in module bodies, hyperrag bench pills, stack-viz — bypass tokens.

5. **PageHero vs `page-hero-grid`**  
   - New `PageHeroComponent` uses SCSS tokens; hub pages (`use-cases.ts`, `home`) still duplicate `page-hero-grid` markup manually.

6. **Typography drift**  
   - Marketing copy uses arbitrary Tailwind sizes (`text-[2rem]`, `md:text-[3.7rem]`) instead of `$font-size-*` or `type-*` mixins.

### Recommended design-system target (minimal, not over-engineered)

```
styles/
  tokens/           # _colors, _type, _space, _layout (split _tokens.scss)
  components/       # _button, _panel, _hero (existing partials)
  utilities/        # .type-h1, .layout-container, .section-padding

src/app/
  components/
    primitives/     # glass-card, cta-button, status-pill
    layout/         # page-hero, section-header, section-rail
    features/       # bench-bars, stack-viz, module-faq-section
```

**Rules (enforce in CONTRIBUTING.md)**

| Use case | Use |
|----------|-----|
| Color, spacing, type scale | SCSS `$tokens` only; mirror to `:root` if needed for Tailwind |
| Layout width / section padding | `.layout-container` + `.section-block` classes (one implementation) |
| Interactive controls | `app-cta-button` only |
| Cards / panels | `app-glass-card` + `panel-box` classes |
| Page heroes | `app-page-hero` only |
| One-off marketing layout | Tailwind utilities, **no new hex values** |

---

## Separation of concerns & patterns

### Done well

| Pattern | Example |
|---------|---------|
| **Data-driven routes** | `findModule()`, `findUseCase()`, `getModulePageConfig()` |
| **Shell + body** | `ModuleDetailComponent` + slug bodies — correct direction |
| **SEO service** | Central `SeoService`; `setPageSeo()` helper on new pages |
| **Standalone components** | Angular 20 style, tree-shakeable |
| **Lazy loading** | Platform, modules, use-cases, legal, blog |

### Violations / smells

| Issue | Severity | Detail |
|-------|----------|--------|
| **God templates** | High | `hyperrag-body.component.ts` ~528 lines inline HTML + chart data |
| **Mixed concerns in bodies** | Medium | Bodies own layout, copy, icons, benchmark datasets, and styles |
| **Hub still inline** | Medium | `use-cases.ts` ~170 lines template; should use `PageHeroComponent` |
| **Legal/blog inline** | Low | Acceptable for static pages until `LegalLayoutComponent` |
| **Constructor side effects** | Medium | `ModuleDetailComponent` / `UseCaseDetailComponent` navigate on bad slug in `constructor` — prefer `resolve` or functional guard |
| **Duplicate SEO paths** | Low | Mix of `seo.set()` and `setPageSeo()` — standardize on helper |
| **`innerHTML` in use-case-detail** | Low | Static data in repo; Angular sanitizes. Document trust boundary. Blog uses `bypassSecurityTrustHtml` for CMS — correct but high risk if Sanity compromised |

### Suggested layering (strict but lean)

```
Route page (thin)
  → loads data (data/*.ts)
  → composes layout (PageHero, SectionRail, MarketingPageLayout)
  → projects feature sections (ModuleOptimemorySectionsComponent with external .html)
```

Do **not** add NgRx, facades, or abstract factories — current app size does not need them.

---

## Production readiness checklist

### Build & deploy

| Item | Status | Notes |
|------|--------|-------|
| `ng build` (production) | ✅ | Passes on `fixes/june-4` |
| SSR + prerender | ✅ | `angular.json` prerender enabled |
| Vercel headers | ✅ | `vercel.json` — cache, X-Frame-Options, nosniff, Permissions-Policy |
| CSP | ❌ | No Content-Security-Policy header |
| HSTS | ⚠️ | Typically Vercel-managed; not in repo |
| Environment config | ⚠️ | Sanity IDs in `environment*.ts` (public by design) |
| Package name | ⚠️ | `fusion-angular-tailwind-starter` — rename for ops clarity (PT-4) |

### Bundle & assets

| Item | Status | Notes |
|------|--------|-------|
| Main bundle | ✅ ~47KB | `main-*.js` — reasonable |
| `public/` size | ❌ **81MB** | Many legacy PNGs; PE-2 image audit required |
| HyperRAG charts | ⚠️ | `bench-bars` + `bench-all-models` ~960 lines; eager in hyperrag chunk |
| Prism.js | ⚠️ | Global CSS + CommonJS allowed; code pages only |
| Budgets | ✅ | 600kB warning / 1.2MB error initial |

### Security

| Item | Status | Notes |
|------|--------|-------|
| `npm audit` | ⚠️ | Moderate: `@angular/ssr` open redirect (fix 20.3.27), transitive `hono` |
| No secrets in repo | ✅ | Sanity project ID is public client config |
| External links | ✅ | `rel="noopener noreferrer"` on `cta-button` external |
| XSS surface | ⚠️ | Blog `bypassSecurityTrustHtml`; use-case `innerHTML` from static data |
| Dashboard mock auth | ⚠️ | Dead code; remove or isolate branch to avoid accidental wire-up |

### Testing & QA

| Item | Status | Notes |
|------|--------|-------|
| Unit tests | ❌ | `app.spec.ts` (2 tests) + `sanity.service.spec.ts` only |
| E2E smoke | ✅ | 18 Playwright tests (9 routes × 2 projects) |
| Visual regression | ❌ | `visual-check.mjs` local only; not in CI |
| a11y | ❌ | No axe/Playwright a11y; mobile menu focus order unverified |
| Invalid slug handling | ⚠️ | Redirects to fake URL → 404; works but odd UX |

### CI/CD & process

| Item | Status | Notes |
|------|--------|-------|
| GitHub Actions | ❌ | No `.github/workflows` |
| PR `ng build` | ❌ | DO-2 |
| Lint (ESLint) | ❌ | Not configured |
| Format (Prettier) | ⚠️ | Config in `package.json` only; no pre-commit |
| CONTRIBUTING | ❌ | DO-1 |
| Dependabot | ❌ | DO-3 |

### Content & IA

| Item | Status | Notes |
|------|--------|-------|
| Docs subroutes | ❌ | `/docs/*` all redirect to `/docs` — broken footer links (CM-3) |
| MODULES FAQ placement | ⚠️ | FAQ/benchmark appended **after** body CTA on module pages |
| Orphan markdown | ⚠️ | `content/`, multiple `*_REVIEW.md` / audit docs at root — not wired to app |

### Observability

| Item | Status | Notes |
|------|--------|-------|
| Error tracking | ❌ | No Sentry/etc. |
| Analytics | ❓ | Not reviewed in code (may be in `index.html`) |
| Logging (SSR) | ❓ | Default Express SSR only |

---

## Code quality details

### TypeScript & Angular

- **Strictness:** Standard Angular TS config; no major `any` abuse observed in marketing paths.
- **Signals:** Used on home/platform/hyperrag bench; mixed with classic fields elsewhere — acceptable, don’t force migration.
- **Change detection:** All standalone; no unnecessary `OnPush` — fine at current scale; add `OnPush` to heavy chart components when profiling.
- **Imports:** Body components correctly use `../../../` paths — fragile; feature folders would shorten.

### Template hygiene

| Metric | Count | Target |
|--------|-------|--------|
| Files with inline `` template: ` `` | ~35 | <15 (legal/blog/hub only) |
| `max-w-[1440px]` duplicates | ~30 | 0 (use `.layout-container`) |
| `pt-20 md:pt-24` header offset duplicates | ~5 | 1 (`MarketingPageLayout`) |

### Styling conflicts to resolve

```scss
// SCSS
$text-muted: #737373;

// Tailwind
'on-surface-variant': '#a3a3a3',  // NOT the same as $text-secondary (#a3a3a3) vs $text-muted (#737373)
```

`outline` in Tailwind = `#737373` aligns with `$text-muted`. `on-surface-variant` = `$text-secondary`. Templates use both interchangeably — visually close but breaks semantic consistency.

### P0 consolidation assessment

| Ticket | Done? | Gap |
|--------|-------|-----|
| FP-1 module route | ✅ | Bodies still 3 large files, not one template |
| FP-2 use-case route | ✅ | Hub not refactored to shared hero |
| FP-3 PageHero | ✅ | Not adopted on hub/home/platform index |
| CM-1 MODULES wire | ⚠️ | FAQ/benchmark only on shell; install/steps not in shared partials |
| CM-2 use-cases data | ✅ | |

---

## Performance notes

1. **LCP candidates:** Hero images (`*-hero.webp`) — verify `fetchpriority="high"` on all module heroes (PageHero supports it on desk blend images).
2. **HyperRAG route:** Pulls bench components + large inline dataset — lazy-load charts (`@defer`) or split data to `data/hyperrag-benchmarks.ts`.
3. **Prerender:** Module slugs should static-generate; confirm `MODULE_SLUGS` used in prerender config if custom routes needed.
4. **Sass mixed-decls warnings:** Build warns; fix in PE-4 to avoid future Sass breakage.

---

## Accessibility (spot check)

| Area | Finding |
|------|---------|
| Header | `aria-label` on menu toggle and logo ✅ |
| Section rail | `ariaLabel` input ✅; hidden below `2xl` |
| Bench toggles | Plain `<button>` — need `aria-pressed` |
| Focus order | Mobile menu — not audited |
| Color contrast | Grayscale on black — generally OK; `#737373` on `#000` for small text — verify WCAG |
| Motion | Animations in Tailwind config — respect `prefers-reduced-motion` globally ❌ |

---

## Dashboard (out of scope but affects repo health)

- **~20 files** under `src/app/dashboard/` with mock API, auth guard, interceptors.
- **Risk:** Future merge accidentally exposes half-built product surface.
- **Action:** Keep on feature branch only; add `README` in `dashboard/` stating “not production”; or move to `packages/console` monorepo later (FP-6).

---

## Prioritized remediation plan

### Blockers before calling “production ready” (1–2 weeks)

1. **CI pipeline** — `ng build`, `npm run test:e2e`, optional `npm audit --audit-level=high`.
2. **Design system v1** — `docs/DESIGN-SYSTEM.md` + `.layout-container` + migrate `max-w-[1440px]`.
3. **Extract module bodies** — `bodies/*.html` + `*.scss`; move benchmark data to `data/`.
4. **Docs IA** — real pages or fix footer links (CM-3).
5. **`npm audit fix`** — bump `@angular/ssr` to patched version.
6. **Image diet** — `public/` audit; WebP-only, delete unused PNGs (PE-2).
7. **Visual regression** — commit baselines or Percy/Chromatic in CI (QA-2).

### High value, low risk (P1)

- `MarketingPageLayout` (FP-4) — `pt-*`, container, optional rail slot.
- Adopt `PageHeroComponent` on `use-cases` hub, `home`, `platform` index.
- `setPageSeo()` everywhere; remove direct `seo.set` duplication.
- Route guard for invalid `platform/:slug` / `use-cases/:slug` → `NotFoundComponent`.
- ESLint + Angular recommended rules.
- `@defer` HyperRAG benchmark block.

### Nice to have (P2)

- Legal layout component.
- `prefers-reduced-motion`.
- CSP header (start report-only).
- Component inventory in README.
- Rename npm package.

---

## Suggested “done” definition for production + quality

Use this checklist before merging `fixes/june-4` → `main`:

- [ ] CI green: build + e2e on PR
- [ ] Zero high npm audit vulnerabilities
- [ ] `public/` < 25MB or documented CDN strategy
- [ ] DESIGN-SYSTEM.md merged; no new inline hex in templates
- [ ] All marketing routes in smoke + 1 use-case + 1 invalid slug test
- [ ] Docs links resolve or removed from footer
- [ ] Module FAQ appears before CTA or explicitly accepted
- [ ] Visual baselines for home, platform, 3 modules, use-cases
- [ ] Dashboard not in `main` routes

---

## Appendix: file inventory (marketing)

### External templates (good)

`home`, `platform`, `get-started`, `docs`, `header`, `footer`, `page-hero`, `module-detail`, `use-case-detail`

### Inline templates (refactor candidates)

| File | ~Lines | Priority |
|------|--------|----------|
| `bodies/hyperrag-body.component.ts` | 528 | P1 |
| `bodies/optimemory-body.component.ts` | 350 | P1 |
| `bodies/deeptuner-body.component.ts` | 299 | P1 |
| `use-cases.ts` | 171 | P1 |
| `privacy-policy.ts` / `terms.ts` / `cookie-policy.ts` | 150–185 | P2 (LegalLayout) |
| `bench-bars.ts` / `bench-all-models.ts` | 523 / 438 | P1 (feature folder + data) |
| `stack-viz.ts` | 279 | P2 |

### Data files (keep growing here)

- `modules.ts` — module copy, benchmarks, FAQs ✅
- `use-cases.ts` — full funnel copy ✅
- `module-page.config.ts` — hero/SEO/rail ✅
- **Missing:** `hyperrag-benchmarks.ts`, section copy for bodies if templates extracted

---

*Generated from static analysis, `ng build`, `npm run test:e2e`, and repository scan on `fixes/june-4`.*
