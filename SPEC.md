# Deep Variance — Project Specification

Quick-start reference for AI agents and contributors. Read this before editing any file.

---

## Tech Stack

| Layer | Version | Notes |
|---|---|---|
| Framework | Angular 20 | Standalone components only — no NgModules |
| Build | Angular CLI + Vite | `ng build` / `ng serve` |
| Styling | TailwindCSS 3.4.11 | Utility-first; `@tailwindcss/typography` for blog |
| Icons | `lucide-angular` 0.577+ | Import individual icons, declare in class |
| SSR | `@angular/ssr` + Express | `server.ts` entry; `main.server.ts` for SSR bootstrap |
| CMS | Sanity (hosted) | Blog only — `studio/` contains schema |
| Package manager | npm | |

---

## Project Structure

```
src/
  app/
    pages/          # Route-level page components (one file = one route)
    components/     # Shared UI (header, footer, blog-card, developer-snippet)
    services/       # sanity.service.ts — Sanity GROQ + portable text → HTML
    app.routes.ts   # All route definitions
    app.config.ts   # App providers (Router, HttpClient)
    app.ts          # Root component (scroll-to-top on navigation)
    app.html        # Shell: header / main(pt-16) / footer
  environments/     # environment.ts + environment.prod.ts (Sanity config)
  styles.css        # @tailwind base/components/utilities + global overrides
  index.html        # Meta tags, OG, fonts, gtag
studio/             # Sanity Studio (CMS schema only — not part of Angular build)
```

---

## Products

| Product | Route | Status | PyPI Package |
|---|---|---|---|
| Optimemory | `/optimemory` | Available | `deep-variance` |
| HyperRAG | `/hyperrag` | Beta | `dv-hyperrag` |
| DeepTuner (AI GPU Tuner) | `/deeptuner` | Early Access | — (private beta) |

**Removed products (do not re-add):** Autopilot, LLM Tuner (quantizer).

---

## Routing

All routes are in `src/app/app.routes.ts`. Home is eager; all product/utility pages are lazy-loaded.

```typescript
// Pattern for adding a new page
{ path: 'my-page', loadComponent: () => import('./pages/my-page').then(m => m.MyPageComponent) }
```

Blog routes have `data: { prerender: false }` — they are dynamic (Sanity CMS).

---

## Design System

### Colors (tailwind.config.js)
- `primary` — `#7C3AED` (purple) — CTAs, links, primary accents
- `dark` — `#0B0B0D` — headings, dark text
- Product accents: emerald (Optimemory), amber (HyperRAG), purple (DeepTuner / primary)

### Typography
- **Headings:** `font-header` → Bricolage Grotesque (Google Fonts)
- **Body:** `font-sans` → Manrope (Google Fonts)
- **Logo only:** Inter (rsms.me) via `logo-text` class in header/footer

### Layout conventions
- Container: `container mx-auto px-6`
- Page top padding: `pt-16 md:pt-24` (clears fixed header)
- Section spacing: `py-10 md:py-14`
- Cards: `rounded-2xl border border-slate-100 shadow-sm`
- Dark sections: `bg-slate-900 text-white rounded-[2rem] md:rounded-[3rem]`
- Grid backgrounds: `bg-grid-slate-900/[0.04]` (light) / `bg-grid-white/[0.04]` (dark)

### Common patterns
```html
<!-- Grid + blur hero background -->
<div class="absolute inset-0 bg-grid-slate-900/[0.04] -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
<div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/10 blur-[120px] rounded-full -z-20"></div>

<!-- Primary CTA pill -->
<a class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
```

---

## Adding a New Page

1. Create `src/app/pages/my-page.ts` with a standalone `@Component`.
2. Set `<title>` and meta tags in the constructor via `inject(Title)` / `inject(Meta)`.
3. Set canonical URL via `inject(DOCUMENT)`.
4. Register the route in `app.routes.ts`.
5. Add to header megamenu + mobile menu (`header.ts`) and footer products list (`footer.ts`).

---

## Adding a New Component

Create `src/app/components/my-component.ts`. Import it directly in whichever page/component uses it via `imports: [MyComponent]`.

---

## Blog (Sanity CMS)

- Posts are fetched via GROQ HTTP API in `SanityService`.
- Portable text blocks are converted to HTML client-side in `blocksToHtml()`.
- Prism syntax highlighting is applied after render in `blog-post.ts` via `isPlatformBrowser` guard.
- Blog routes have `prerender: false` — server-rendering happens at request time.
- **Do not prerender blog routes.** Adding `prerender: true` will fail at build time.

---

## SSR Notes

- `src/main.ts` — browser bootstrap
- `src/main.server.ts` — server bootstrap (Angular Universal)
- `server.ts` — Express server for SSR
- `window` / `document` access must be guarded with `isPlatformBrowser(platformId)` or `inject(DOCUMENT)`.
- `ViewportScroller` is used for scroll restoration — offset `[0, 80]` for fixed header.

---

## Key Files Quick Reference

| File | Purpose |
|---|---|
| `src/app/app.html` | Root shell template |
| `src/app/app.routes.ts` | All routes |
| `src/app/components/header.ts` | Fixed nav, megamenu, mobile menu |
| `src/app/components/footer.ts` | Site footer with product/legal links |
| `src/app/pages/home.ts` | Main landing page |
| `src/app/pages/hyperrag.ts` | HyperRAG product page (benchmarks live here) |
| `src/app/pages/optimemory.ts` | Optimemory product page |
| `src/app/pages/deeptuner.ts` | DeepTuner (AI GPU Tuner) product page |
| `src/app/pages/pricing.ts` | Pricing + contact form (FormSubmit) |
| `src/app/pages/roadmap.ts` | Product roadmap timeline |
| `src/app/pages/use-cases.ts` | Industry use cases |
| `src/app/services/sanity.service.ts` | Sanity GROQ client + portable text parser |
| `src/styles.css` | Global styles + Tailwind layers |
| `tailwind.config.js` | Theme tokens (colors, fonts, animations) |
| `src/index.html` | HTML entry: meta, OG, fonts, JSON-LD, gtag |
| `src/environments/environment.ts` | Sanity project config (dev) |
| `vercel.json` | Vercel deployment config |

---

## Development Commands

```bash
npm start          # Dev server (http://localhost:4200)
npm run build      # Production build → dist/
npm run watch      # Watch build (dev config)
npm test           # Jasmine/Karma unit tests
node dist/fusion-angular-tailwind-starter/server/server.mjs  # SSR preview
```

---

## HyperRAG Benchmark Data

Benchmarks live in `src/app/pages/hyperrag.ts` in `allBenchmarkData`. The default tab is `qwen7b` and the UI supports `qwen7b`, `llama8b`, `qwen14b`, and `llama70b`.

- Qwen2.5 7B peak: **2.95× speedup** (Hyperscale, 56.4 ms → 19.1 ms)
- Llama 3 70B peak: **2.01× speedup** (Rewriter-Reranker, 225.7 ms → 112.2 ms)

Across paradigms, current benchmark tables show roughly **1.95× to 2.95×** speedup depending on model and workload profile.

---

## DeepTuner — AI GPU Tuner (Research Background)

The AI GPU Tuner component is inspired by *FlipFlop* (ICSE '26 — Rajput et al.), a static PTX analysis framework for energy-efficient GPU kernel configuration:

- Analyzes CUDA PTX without runtime execution
- Jointly optimizes thread block shape (block_x × block_y) and GPU power cap
- Achieves **up to 79% energy savings** and **106% throughput gains** on MHA kernels
- Reduces optimization search space by **93.4%** (4.4 configs tested vs. 66 total)
- **172,986× faster** than exhaustive dynamic tuning
- Validated on RTX 5000 Ada (Hopper) and RTX 3070 (Ampere)

**Do not name FlipFlop directly** in any user-facing copy. Use "AI GPU Tuner" or "static PTX analysis".

---

## Contact / Form

The contact form in `pricing.ts` posts to `https://formsubmit.co/ajax/founders@deepvariance.com`. It validates business emails (blocks disposable providers) and requires name + email + message.
