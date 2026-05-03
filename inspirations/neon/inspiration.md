# Neon (Postgres for the AI era) — UI/UX Inspiration

URL: https://neon.com/?ref=saaspo.com
Captured: `01-above-fold.png`, `02-full-page.png`, `03-second-fold.png`, `04-third-fold.png`

## Snapshot
- Serverless Postgres positioned for AI agents and teams. (Now part of Databricks.)
- Marketing site is a master-class in **alternating light/dark sections**, **sticky section nav**, and **hero animation**.

## Visual identity
- **Hero palette**: black background, vivid green vertical-bar animation that reads like a holographic "data rain" or a column-store visualizer. White headline + soft white CTAs.
- **Body**: cream/light section after the dark hero — improves scannability and breaks up the dark monotony.
- **Type**: Geist-like sans, headline 600/700, generous tracking. Body 1.6 line-height, dark gray on light, white on dark.
- **Eyebrow**: small "A DATABRICKS COMPANY" with company glyph — owns the acquisition story.

## Hero pattern
- **Top promo banner**: full-width, dark, single line "Team accounts with unlimited members now available to everyone! Invite your teammates… ›". Persistent until dismissed.
- **Full-bleed animated visual** behind the hero — looks like instanced vertical bars at varying opacities/heights with one bright "playhead" column. Likely WebGL/canvas-driven; visually represents columnar data, fits the product.
- **Bold left-aligned headline + 2 CTAs** (white pill + dark pill).
- **Logo strip directly under hero** on white-ish gradient — DoorDash, BCG, Retool, Meta, Bitso. Authoritative.

## Layout & IA highlights — **the killer pattern**
- A dark "AI" feature section laid out as **left rail of section labels** (`AI / Advanced Autoscaling / Instant Branching / Auth Included / Production-Grade Features`) and a **right column that scrolls through the content**, with the active label highlighted.
- The active section's right side shows: a giant headline ("Postgres for the AI Engineering era."), 2-line subhead, and a stacked code-window mock with `$ npx neonctl init` + a "Try for yourself" pill that copies the command.
- **Section transitions inside that container** — when you scroll, the rail items become active in turn, the right side updates with a new visual; reads like a tabbed deep-dive without the click.
- Below: tool-strip ("Connect MCP clients to Neon: Cursor, Windsurf, Cline, Zed, OpenAI") with stacked logos. Beautifully positioned because it answers "what tools work?" right when the agent-buyer is reading.

## Animation / FX
- The vertical-bar hero animation is the **single brand moment**. Reuse it as a header for product pages too (rotating different colors per product).
- Soft fade-in on scroll for each rail step.
- Code-window has a blinking caret and looks pre-typed (not animated typing — keeps it fast).

## Microcopy / tone
- "Postgres for the AI Engineering era." → product proof in 6 words.
- "Integrate with a single command and the LLM does the hard work." → demo-grade promise.
- Imperative section labels read like a feature inventory ("Advanced Autoscaling", "Instant Branching", "Auth Included").

## What to copy or adapt for DV
1. **Sticky section-rail navigation on long product pages** (Optimemory, HyperRAG, DeepTuner). Left column lists `Hero / How it works / Performance / Code / Compatibility / Roadmap` and stays sticky while content scrolls. Use `IntersectionObserver` to highlight active section. Already a good fit because our pages are tall.
2. **Product-themed hero animation per product**: keep the WebGL background app-wide, **add a per-page hero "data visualizer"** scoped to the hero section. Optimemory could show animated VMM blocks merging (we already have a static SVG — promote it to a canvas/Lottie). HyperRAG could show prefix-trie growth.
3. **Promo banner above the header** — reuse Lemurian's news-strip idea but in Neon's full-width banner style; pin until dismissed (localStorage key per release).
4. **Tool/integration logo strip** — "Works with: PyTorch, JAX, vLLM, TensorRT, SGLang, Triton" on each product page. Cheap credibility.
5. **Light-section interlude** — currently every section is dark glass. Insert one "white-card" or near-white section between two dark blocks (e.g., the manifesto/quote moment) to break monotony. Maintain accessibility.
6. **Inline copyable command pill** in heroes — `$ pip install deepvariance` pill with copy icon. We already have `app-code-window`; add a slim `app-copy-pill` for short single-line commands.

## What to avoid copying
- Mid-page **light** sections can clash with our deep-tech aesthetic if not done well; prefer a softened dark-glass elevated panel ("surface-bright" instead of true white) to keep brand cohesion.
- Their hero animation is heavy; our home already has Three.js — don't add a second WebGL piece without lazy-loading.

## Concrete component proposals
- `app-section-rail` — sticky left rail; `[sections]` input; emits active-id; supports keyboard nav.
- `app-promo-banner` — top-of-page bar; dismissible (localStorage); slot for content.
- `app-copy-pill` — `[command]` input; `$ ` prefix; copy-to-clipboard with toast.
- `app-tool-strip` — array of `{ name, logoSrc }`; renders stacked or compact row; supports grayscale-on-default + color-on-hover.
