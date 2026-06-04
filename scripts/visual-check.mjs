#!/usr/bin/env node
/**
 * Visual QC — captures full-page screenshots for key routes (desktop + mobile).
 * Usage: npm run visual:check
 * Requires dev server on BASE_URL (default http://localhost:4200) or set SKIP_WEB_SERVER=0 with playwright webServer.
 */
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const baseURL = process.env['BASE_URL'] ?? 'http://localhost:4200';
const outDir = process.env['VISUAL_OUT'] ?? 'screenshots/visual-check';

const routes = [
  { path: '/', name: 'home' },
  { path: '/platform', name: 'platform' },
  { path: '/platform/optimemory', name: 'optimemory' },
  { path: '/platform/hyperrag', name: 'hyperrag' },
  { path: '/platform/deeptuner', name: 'deeptuner' },
  { path: '/use-cases', name: 'use-cases' },
  { path: '/get-started', name: 'get-started' },
  { path: '/docs', name: 'docs' },
];

const viewports = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 390, height: 844 },
];

async function waitForApp(page) {
  await page.waitForSelector('main', { timeout: 30_000 });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();

  let failed = 0;

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    for (const route of routes) {
      const url = `${baseURL}${route.path}`;
      const file = `${outDir}/${route.name}-${vp.label}.png`;
      try {
        const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
        if (!res?.ok()) throw new Error(`HTTP ${res?.status()}`);
        await waitForApp(page);
        await page.screenshot({ path: file, fullPage: true });
        console.log(`✓ ${file}`);
      } catch (err) {
        failed += 1;
        console.error(`✗ ${route.path} (${vp.label}):`, err.message);
      }
    }

    await context.close();
  }

  await browser.close();

  if (failed > 0) {
    console.error(`\n${failed} capture(s) failed`);
    process.exit(1);
  }

  console.log(`\nVisual check complete → ${outDir}/`);
}

main();
