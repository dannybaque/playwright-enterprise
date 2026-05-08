import { test, expect } from '@playwright/test';

test.describe('Suite 3 - Búsqueda', () => {
  test('TC-008: Abrir el panel de búsqueda con click en el icono', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/playwright\.dev/);

    await page.getByRole('button', { name: /search/i }).click();

    await expect(page.getByRole('searchbox')).toBeVisible();
    await expect(page.getByRole('searchbox')).toBeFocused();
    await expect(page.getByRole('searchbox')).toHaveAttribute('placeholder', /.+/);
  });
});
