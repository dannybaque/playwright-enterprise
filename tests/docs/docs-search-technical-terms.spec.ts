import { test, expect } from '@playwright/test';

test.describe('Suite 10 - Documentación (Flujos internos)', () => {
  test('TC-038: El buscador dentro de la documentación encuentra términos técnicos', async ({ page }) => {
    await page.goto('/docs/intro');

    await page.keyboard.press('Control+K');
    await expect(page.getByRole('searchbox')).toBeVisible();

    await page.getByRole('searchbox').fill('page.goto');

    const firstResult = page.locator('.DocSearch-Hit a').first();
    await expect(firstResult).toBeVisible({ timeout: 10000 });

    await firstResult.click();

    await expect(page).toHaveURL(/\/docs\/api\/class-page|goto/i, { timeout: 10000 });
  });
});
