# Deep Variance — Project Specification

Quick-start reference for contributors and AI agents. Read before editing any file.

---

## Tech Stack

| Layer | Version | Notes |
|---|---|---|
| Framework | Angular 20 | Standalone components only — no NgModules |
| Build | Angular CLI + Vite | `ng serve` / `ng build` |
| Styling | TailwindCSS 3.4.11 | Utility-first; custom `desk` breakpoint at 940px; `@tailwindcss/typography` for blog |
| Icons | `lucide-angular` 0.577+ | Import individual icons, declare in component class |
| SSR | `@angular/ssr` + Express | `server.ts` entry; `main.server.ts` for SSR bootstrap |
| CMS | Sanity (hosted) | Blog only |
| Deploy | Vercel | Config in `vercel.json` |

---

## Design Language

- **Palette**: pure black (`#000`) background, greyscale type, white primary actions
- **Fonts**: Space Grotesk (headings/UI), IBM Plex Mono (body/code)
- **Breakpoints**: `sm` 640px · `md` 768px · `desk` 940px (hero layout switch) · `lg` 1024px · `xl` 1280px
- **Max content width**: 1440px (`max-w-[1440px] mx-auto`)
- **Tone**: B2B SaaS, investor-first, no fluff

---

## UI/UX Inspiration Sources

When making design decisions or seeking UI/UX references, draw from these sources:

| Site | URL | Key takeaways |
|---|---|---|
| Mastra | https://mastra.ai | Black/greyscale palette, clean B2B SaaS, static hero viz, left-aligned hero |
| Lemurian Labs | https://lemurianlabs.com | Architecture diagrams, technical depth, bento layouts |
| Mantis Grid | https://mantisgrid.ai | AI infra aesthetic, dark professional tone |
| Neon | https://neon.com | Developer-focused, minimal, strong typography hierarchy |
| Try Mirai | https://trymirai.com | Smooth scroll, section transitions |
| Obsidian OS | https://obsidianos.com | Sculptural illustrations, greyscale 3D |
| Callsine | https://callsine.com | B2B conversion patterns, CTA placement |
| SaaSpo | https://saaspo.com | SaaS landing page pattern library |

---

## Key Files

```
src/
  app/
    pages/         # Route-level components (home, pricing, use-cases, product pages, legal)
    components/    # Shared UI (header, footer, stack-viz, stat-strip, cta-button, …)
    services/      # seo.service.ts
  styles.css       # Global styles, design tokens, Tailwind base
  index.html       # Shell, meta tags, font imports

tailwind.config.js # Theme tokens (colours, fonts, breakpoints, animations)
vercel.json        # Deployment config
```

---

## Active Public Assets

| File | Usage |
|---|---|
| `gpu-hero-v3.png` | Hero section GPU illustration |
| `logo-mark.svg` | Header + footer logo mark |
| `wordmark-traced.svg` | Header + footer wordmark |
| `pytorch-logo.png` | Works alongside strip |
| `tensorflow-logo.png` | Works alongside strip |
| `vllm-logo.png` | Works alongside strip |
| `sglang-logo.png` | Works alongside strip |
| `favicon.ico / .jpeg / .svg` | Browser + OG icon |
| `meta-dv.png` | OG social preview image |
| `robots.txt / sitemap.xml` | SEO |
