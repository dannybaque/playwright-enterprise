import { test, expect } from '@playwright/test';

test.describe('Suite 8 - Responsividad', () => {
  test('TC-031: Vista tablet (768px) - Layout correcto', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

    await expect(
      page.getByRole('heading', { name: /Playwright enables reliable/i })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  });
});
