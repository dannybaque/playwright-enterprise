import { test, expect } from '@playwright/test';

test.describe('Suite 2 - Navegación Principal (Navbar)', () => {
  test("TC-005: Click en 'Community' navega a la página de comunidad", async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/playwright\.dev/);

    await page.getByRole('link', { name: 'Community' }).click();

    await expect(page).toHaveURL(/\/community/);
    await expect(page.getByRole('link', { name: /Discord/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Stack Overflow/i })).toBeVisible();
  });
});
