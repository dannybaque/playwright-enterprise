import { test, expect } from '@playwright/test';

test.describe('Suite 2 - Navegación Principal (Navbar)', () => {
  test("TC-004: Click en 'API' navega a la referencia de API", async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/playwright\.dev/);

    await page.getByRole('link', { name: 'API' }).click();

    await expect(page).toHaveURL(/\/docs\/api\//);
    await expect(page.locator('aside.theme-doc-sidebar-container')).toBeVisible();
  });
});
