# Saaspo — UI/UX Inspiration

URL: https://saaspo.com/
Captured: `01-above-fold.png`, `02-full-page.png`, `03-second-fold.png`, `04-third-fold.png`

## Snapshot
- A directory/aggregator of SaaS landing pages and design references.
- Not a peer competitor — we mine it for **interaction patterns**, **filter UIs**, and **thumbnail framing**.

## Visual identity
- Black background, high-contrast white type, **electric green** accent (`#00ff7f`-ish — exactly our neon).
- Tiny green numeric counters next to nav items ("Pages 2981", "Sections 709") — turns nav into a status display.
- All thumbnails sit inside a **faux browser frame** (mac traffic-lights + URL bar) — instantly conveys "this is a website".

## Hero pattern
- Big H1 left, subtitle, sponsor row.
- **Newsletter capture card** floats to the right of the hero (rounded square, ~30% of width). Email input + green "Subscribe" button.
- Above the gallery: filter row — `Page Types ▾`, `Industry ▾`, `Style ▾`, `Assets ▾`, `Stack ▾` — and a tabs row `Pages / Sections / OG images`.

## Interaction patterns to steal
1. **Live numeric counters in nav** ("Customers 23", "Posts 14"). Tiny but feels alive. We could surface `Posts` count or `Routes shipped` count beside our header links.
2. **Filterable card grid** — exactly what `/use-cases` could become if we frame each industry/use-case as a card and let users filter by `vertical / model class / deployment target / stage`.
3. **Floating action bar at bottom-center** — pill with `Pages + / Sections / OG Images / Subscribe`. Same pattern can host `Quick links: Optimemory / HyperRAG / DeepTuner / Pricing` on long pages, in a glass pill that appears after `100vh` of scroll.
4. **Faux-browser thumbnail frame** for case-study or screenshot cards — we already have `app-code-window` (mac traffic lights). Make a sibling `app-browser-frame` that wraps an image/iframe and stamps a URL bar with the customer's domain.
5. **Sponsor strip below the hero** with vendor logos — easy "Trusted by" pattern but rendered as colorful filled brand tiles instead of grayscaled wordmarks. Reads more confident.

## Microcopy / tone
- Direct, descriptive, no marketing fluff ("A curated collection of the best SaaS landing pages on the web. Quickly find the design inspiration you're looking for with our **filters**.")
- Single-word link styling: green underlined ("filters.").

## What to copy or adapt for DV
1. **Filter UI for `/use-cases`** — turn the existing 5-card bento into a filterable grid with chips: `Vertical (Healthcare, Finance, …) / Model class (LLM, VLM, RecSys) / Deployment (Cloud, On-prem, Edge) / Stage (Inference, Fine-tune, Training)`. Use plain client-side `signal()` filters in Angular; no backend needed.
2. **Sticky floating action bar** that appears after the user scrolls one viewport on long pages (Optimemory, HyperRAG). Glass pill, rounded full, gentle bottom margin. Buttons: jump-to-section anchors + a "Talk to us" CTA.
3. **Live counters in header** — show `posts • N` next to the Blog link, computed from the Sanity result. Sets a "this site is updated" tone.
4. **Browser-frame thumbnail wrapper** for blog hero images and any future customer-story modules.
5. **Newsletter CTA card** docked next to a hero (e.g., on `blog.ts`) — currently we don't have a newsletter capture; this is a simple way to start.

## What to avoid copying
- Saaspo is a directory, so its homepage is **basically a search UI**. Don't pivot DV's home into a directory; only borrow the filter-UI pattern for the use-cases page where it is genuinely useful.
- Their bottom action bar competes with cookie banners; design ours to defer if a banner is present (z-index / collision).

## Concrete component proposals
- `app-filter-chips` — array of group `{label, options[]}`; emits selection state; Tailwind chips with neon ring on active.
- `app-floating-action-bar` — appears after `IntersectionObserver` reports below-fold; contains slotted children.
- `app-browser-frame` — mac chrome + URL bar + content slot.
- `app-newsletter-card` — name + email + green submit; same FormSubmit endpoint as pricing form.
