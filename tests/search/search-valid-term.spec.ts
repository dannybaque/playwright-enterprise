import { test, expect } from '@playwright/test';

test.describe('Suite 3 - Búsqueda', () => {
  test('TC-010: Búsqueda con término válido muestra resultados relevantes', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Control+K');
    await expect(page.getByRole('searchbox')).toBeVisible();

    await page.getByRole('searchbox').fill('locator');

    const firstResult = page.locator('.DocSearch-Hit a').first();
    await expect(firstResult).toBeVisible({ timeout: 10000 });
    await expect(firstResult).toContainText(/locator/i);

    await firstResult.click();

    await expect(page).toHaveURL(/\/docs\/(locators|api\/class-locator)/i, { timeout: 10000 });
  });
});
