# Deep Variance Website - Image Assets Required

This document lists all images that need to be generated via Adobe Firefly Image 3 (Content type: Graphic) as specified in the design prompt.

## Hero Background
**File:** `public/hero-bg.webp` (1920x1080)
**Prompt:**
"Dark graphite background, abstract GPU chip die architecture top-down view, fine white circuit trace lines forming a precise grid, subtle electric cyan (#00C2FF) glow emanating from center processor cores, deep navy and charcoal tones, no text, no labels, ultra-sharp technical illustration style, infrastructure aesthetic, 16:9 aspect ratio, high contrast, photorealistic technical render with minimal stylization"

**Usage:** Hero section background (opacity 0.12, blend-mode: screen)

---

## Final CTA Background
**File:** `public/cta-bg.webp` (960x720)
**Prompt:**
"Abstract dark background showing multiple GPU nodes in a data center rack, soft electric cyan energy lines flowing between nodes suggesting data paths and optimization, deep navy and charcoal palette, no text, no faces, photorealistic render, infrastructure aesthetic, dramatic side lighting, 4:3 aspect ratio, high contrast technical illustration, subtle depth of field"

**Usage:** Final CTA section right-side decorative panel (40% opacity)

---

## Benchmarks Page Background
**File:** `public/benchmarks-bg.webp`
**Prompt:**
"Dark graphite background with abstract data visualization, horizontal bar charts and scatter plots rendered as glowing cyan light traces on a dark grid, technical dashboard aesthetic, no numbers or text, pure geometric form, infrastructure analysis aesthetic, 16:9, high contrast"

**Usage:** Benchmarks page hero background (opacity 0.08)

---

## Platform Page Hero
**File:** `public/platform-hero.webp`
**Prompt:**
"Abstract data center inside-view cross-section of server rack interior, multiple GPU cards visible, electric cyan energy flows between cards representing data paths, dark industrial aesthetic, no text, photorealistic hardware render, dramatic ambient lighting, 16:9 aspect ratio"

**Usage:** Platform page hero section

---

## Product Hero Images

### OptiMemory Hero
**File:** `public/optimemory-hero.webp`
**Prompt:**
"Abstract data center VRAM memory visualization, top-down grid of luminous teal-green (#00E5A0) memory blocks arranged in perfect contiguous rows, contrasted with scattered fragmented gray blocks on the left side, dark graphite background, no text, photorealistic technical render, memory architecture aesthetic, subtle glow from occupied blocks, 16:9 aspect ratio"

**Usage:** OptiMemory product page hero

### HyperRAG Hero
**File:** `public/hyperrag-hero.webp`
**Prompt:**
"Abstract neural cache network visualization, interconnected nodes glowing in deep violet (#7B61FF) and indigo, showing branching cache paths and fast-path routing between request nodes, dark navy background, luminous energy flows, no text, no labels, technical infrastructure aesthetic, photorealistic render, 16:9 aspect ratio, high contrast"

**Usage:** HyperRAG product page hero

### DeepTuner Hero
**File:** `public/deeptuner-hero.webp`
**Prompt:**
"Abstract GPU kernel architecture visualization from inside a compute die, amber orange (#FF8C42) energy pathways flowing through a dark silicon grid, showing optimized routing versus unoptimized paths, high-contrast technical render, no text, dark graphite background, photorealistic style, deep depth of field, 16:9 aspect ratio, precision hardware aesthetic"

**Usage:** DeepTuner product page hero

---

## Use Case Card Images

### Enterprise AI
**File:** `public/usecase-enterprise.webp` (4:3)
**Prompt:**
"Abstract representation of enterprise AI server farm, rows of luminous GPU nodes, dark navy and charcoal background, subtle teal green efficiency glow over nodes, aerial isometric view, no text, no faces, technical render, 4:3"

**Usage:** Use cases - Enterprise AI card

### HPC/Research
**File:** `public/usecase-hpc.webp` (4:3)
**Prompt:**
"Abstract academic supercomputer cluster, interconnected compute nodes shown as glowing grid, amber orange and cyan accent lights, dark background, isometric technical render, no text, infrastructure aesthetic, 4:3"

**Usage:** Use cases - HPC/Research card

### GPU Providers
**File:** `public/usecase-providers.webp` (4:3)
**Prompt:**
"Abstract GPU infrastructure provider visualization, dense rack topology with multiple nodes with colored utilization indicators (green = efficient, red = wasted), dark graphite background, photorealistic render, 4:3"

**Usage:** Use cases - GPU Providers card

---

## Argus Dashboard Icon (Future/Optional)
**File:** `public/argus-icon-hero.webp` (1:1)
**Prompt:**
"Minimal flat icon design, signal spike waveform inside a rounded dark square, electric cyan (#00C2FF) waveform line on deep graphite background, single heartbeat pulse shape, clean vector illustration, 1:1 aspect ratio, no gradients, no text"

**Usage:** Internal reference / future dashboard branding

---

## Implementation Checklist

- [ ] Generate all 11 images via Adobe Firefly Image 3
- [ ] Export as WebP format (primary)
- [ ] Create PNG fallbacks for each image
- [ ] Place in `/public/` directory
- [ ] Add `<picture>` elements with WebP + PNG fallback where appropriate
- [ ] Add `loading="lazy"` to all images except hero (use `loading="eager"` or `fetchpriority="high"`)
- [ ] Verify all images load correctly in production build
- [ ] Optimize file sizes (target: <200KB per image for hero, <150KB for cards)

---

## Notes

- All images use the Deep Variance color palette: DV Blue (#00C2FF), OptiMemory Green (#00E5A0), HyperRAG Violet (#7B61FF), DeepTuner Amber (#FF8C42)
- No text, labels, or UI elements in any images (pure technical visualization)
- Dark graphite/navy background palette throughout
- High-contrast, infrastructure/technical aesthetic
- Mix-blend-mode and masking applied in CSS, not in source images
