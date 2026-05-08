import { test, expect } from '@playwright/test';

test.describe('Suite 8 - Responsividad', () => {
  test('TC-032: Vista desktop grande (1440px) - Contenido centrado correctamente', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    await expect(page).toHaveTitle(/Playwright/);

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(hasHorizontalOverflow).toBe(false);

    await expect(
      page.getByRole('heading', { name: /Playwright enables reliable/i })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Community' })).toBeVisible();
  });
});
