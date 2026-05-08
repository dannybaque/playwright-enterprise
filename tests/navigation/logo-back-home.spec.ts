import { test, expect } from '@playwright/test';

test.describe('Suite 2 - Navegación Principal (Navbar)', () => {
  test('TC-006: El logo navega de regreso a la página principal', async ({ page }) => {
    await page.goto('/docs/intro');
    await expect(page).toHaveURL(/\/docs\/intro/);
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

    await page.getByRole('link', { name: /playwright logo/i }).click();

    await expect(page).toHaveURL(/^https:\/\/playwright\.dev\/?$/);
    await expect(
      page.getByRole('heading', { name: /Playwright enables reliable/i })
    ).toBeVisible();
  });
});
