import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const pages = [
    { url: 'http://localhost:4200/', name: 'home' },
    { url: 'http://localhost:4200/platform', name: 'platform' },
    { url: 'http://localhost:4200/platform#optimemory', name: 'platform-optimemory' },
    { url: 'http://localhost:4200/platform#hyperrag', name: 'platform-hyperrag' },
    { url: 'http://localhost:4200/platform#deeptuner', name: 'platform-deeptuner' },
    { url: 'http://localhost:4200/get-started', name: 'get-started' },
  ];

  for (const { url, name } of pages) {
    try {
      console.log(`Capturing ${name}...`);
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.screenshot({ 
        path: `screenshots/${name}.png`, 
        fullPage: true 
      });
      console.log(`✓ Saved screenshots/${name}.png`);
    } catch (error) {
      console.error(`✗ Failed to capture ${name}:`, error.message);
    }
  }

  await browser.close();
  console.log('\n✓ All screenshots captured');
})();
