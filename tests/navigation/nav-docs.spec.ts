import { test, expect } from '@playwright/test';

test.describe('Suite 2 - Navegación Principal (Navbar)', () => {
  test("TC-003: Click en 'Docs' navega a la introducción", async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/playwright\.dev/);

    await page.getByRole('link', { name: 'Docs' }).click();

    await expect(page).toHaveURL('/docs/intro');
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    await expect(page.locator('aside.theme-doc-sidebar-container')).toBeVisible();
  });
});
