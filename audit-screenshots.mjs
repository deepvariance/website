import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

await mkdir('screenshots/audit', { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ 
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

const pages = [
  { url: 'http://localhost:4200/', name: 'home' },
  { url: 'http://localhost:4200/platform', name: 'platform' },
  { url: 'http://localhost:4200/get-started', name: 'get-started' },
];

for (const { url, name } of pages) {
  console.log(`\n→ ${name}`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  
  // Viewport (above the fold)
  await page.screenshot({ 
    path: `screenshots/audit/${name}-fold.png`,
    fullPage: false,
  });
  console.log(`  ✓ fold`);
  
  // Get total page height
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const sectionHeight = 900;
  const numSections = Math.ceil(height / sectionHeight);
  
  // Screenshot each section by scrolling
  for (let i = 0; i < numSections; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * sectionHeight);
    await page.waitForTimeout(300);
    await page.screenshot({ 
      path: `screenshots/audit/${name}-s${i+1}.png`,
      fullPage: false,
    });
    console.log(`  ✓ section ${i+1}/${numSections}`);
  }
}

await browser.close();
console.log('\n✓ done');
