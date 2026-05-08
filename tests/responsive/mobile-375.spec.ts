import { test, expect } from '@playwright/test';

test.describe('Suite 8 - Responsividad', () => {
  test('TC-030: Vista móvil (375px) - Menú hamburguesa funcional', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

    await expect(page.locator('.navbar__items--right')).not.toBeVisible();

    const hamburgerButton = page.locator('.navbar__toggle');
    await expect(hamburgerButton).toBeVisible();

    await hamburgerButton.click();

    const sidebar = page.locator('.navbar-sidebar');
    await expect(sidebar).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'API' })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'Community' })).toBeVisible();

    await sidebar.getByRole('link', { name: 'Docs' }).click();
    await expect(page).toHaveURL(/\/docs\/intro/);
  });
});
