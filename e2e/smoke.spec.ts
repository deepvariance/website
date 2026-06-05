import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/platform',
  '/platform/optimemory',
  '/platform/hyperrag',
  '/platform/deeptuner',
  '/use-cases',
  '/use-cases/hpc-infrastructure',
  '/get-started',
  '/docs',
];

for (const path of routes) {
  test(`loads ${path}`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.ok()).toBeTruthy();
    await expect(page.locator('app-header')).toBeAttached();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('app-footer')).toBeAttached();
  });
}

test('404 shows not-found page', async ({ page }) => {
  const res = await page.goto('/this-route-does-not-exist');
  expect(res?.ok()).toBeTruthy();
  await expect(page.locator('app-not-found')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
});
