import { test, expect } from '@playwright/test';

test.describe('Suite 3 - Búsqueda', () => {
  test('TC-011: Búsqueda con término inexistente muestra mensaje de sin resultados', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /search/i }).click();

    const searchModal = page.locator('.DocSearch-Modal');
    await expect(searchModal).toBeVisible();

    const searchInput = page.locator('.DocSearch-Input');
    await expect(searchInput).toBeFocused();

    await searchInput.fill('xyzterminoquenoexiste99999');

    await expect(page.locator('.DocSearch-NoResults')).toBeVisible();
    await expect(page.locator('.DocSearch-Hits')).not.toBeVisible();
    await expect(searchModal).toBeVisible();
  });
});
