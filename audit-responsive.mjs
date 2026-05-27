/**
 * Responsive layout audit — captures full-page screenshots at mobile / tablet / desktop.
 * Usage: node audit-responsive.mjs [baseUrl]
 * Requires: dev server running (default http://localhost:4200)
 */
import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.argv[2] ?? 'http://localhost:4200';
const OUT_DIR = 'screenshots/responsive';

const VIEWPORTS = [
  { id: 'mobile', width: 390, height: 844, isMobile: true },
  { id: 'tablet', width: 768, height: 1024, isMobile: false },
  { id: 'desktop', width: 1440, height: 900, isMobile: false },
];

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/platform', name: 'platform' },
  { path: '/platform/optimemory', name: 'optimemory' },
  { path: '/platform/hyperrag', name: 'hyperrag' },
  { path: '/platform/deeptuner', name: 'deeptuner' },
  { path: '/docs', name: 'docs' },
  { path: '/get-started', name: 'get-started' },
  { path: '/use-cases', name: 'use-cases' },
  { path: '/use-cases/hpc-infrastructure', name: 'use-case-hpc' },
  { path: '/use-cases/gpu-providers', name: 'use-case-gpu-providers' },
  { path: '/use-cases/enterprise-training', name: 'use-case-enterprise' },
  { path: '/use-cases/research-institutions', name: 'use-case-research' },
  { path: '/use-cases/manufacturing', name: 'use-case-manufacturing' },
  { path: '/blog', name: 'blog' },
  { path: '/privacy-policy', name: 'privacy-policy' },
  { path: '/terms', name: 'terms' },
  { path: '/cookie-policy', name: 'cookie-policy' },
];

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    isMobile: vp.isMobile,
    hasTouch: vp.isMobile,
  });
  const page = await context.newPage();

  for (const { path: route, name } of PAGES) {
    const url = `${BASE}${route}`;
    const dir = path.join(OUT_DIR, name);
    await mkdir(dir, { recursive: true });

    try {
      console.log(`→ ${name} @ ${vp.id}`);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
      await page.waitForTimeout(600);

      // Above-the-fold
      await page.screenshot({
        path: path.join(dir, `${vp.id}-fold.png`),
        fullPage: false,
      });

      // Full page
      await page.screenshot({
        path: path.join(dir, `${vp.id}-full.png`),
        fullPage: true,
      });

      // Mobile: open nav menu and capture
      if (vp.isMobile) {
        const toggle = page.locator('.dv-mobile-toggle');
        if (await toggle.count()) {
          await toggle.click();
          await page.waitForTimeout(400);
          await page.screenshot({
            path: path.join(dir, `${vp.id}-menu-open.png`),
            fullPage: false,
          });
          await toggle.click().catch(() => {});
        }
      }

      console.log(`  ✓ ${vp.id}`);
    } catch (err) {
      console.error(`  ✗ ${name} @ ${vp.id}:`, err.message);
    }
  }

  await context.close();
}

await browser.close();
console.log(`\n✓ Screenshots saved under ${OUT_DIR}/`);
