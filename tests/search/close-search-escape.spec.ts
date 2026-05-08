import { test, expect } from '@playwright/test';

test.describe('Suite 3 - Búsqueda', () => {
  test('TC-012: Cerrar el panel de búsqueda con la tecla Escape', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /search/i }).click();

    const searchModal = page.getByRole('searchbox');
    await expect(searchModal).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(searchModal).not.toBeVisible();
    await expect(
      page.getByRole('heading', { name: /Playwright enables reliable/i })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  });
});
