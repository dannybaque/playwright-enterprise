import { test, expect } from '@playwright/test';

test.describe('Suite 3 - Búsqueda', () => {
  test('TC-013: Búsqueda acepta caracteres especiales sin romper la UI', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /search/i }).click();

    await expect(page.getByRole('searchbox')).toBeVisible();
    await expect(page.getByRole('searchbox')).toBeFocused();

    await page.getByRole('searchbox').fill('<script>alert(1)</script>');
    await expect(page.getByRole('searchbox')).toHaveValue('<script>alert(1)</script>');
    await expect(page.getByRole('searchbox')).toBeVisible();

    await page.getByRole('searchbox').clear();
    await page.getByRole('searchbox').fill("page.$$('div')");
    await expect(page.getByRole('searchbox')).toHaveValue("page.$$('div')");
    await expect(page.getByRole('searchbox')).toBeVisible();
  });
});
