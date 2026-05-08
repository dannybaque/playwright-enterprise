import { test, expect } from '@playwright/test';

test.describe('Suite 3 - Búsqueda', () => {
  test('TC-009: Abrir el panel de búsqueda con atajo de teclado Ctrl+K / Cmd+K', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/playwright\.dev/);

    await page.keyboard.press('Control+K');

    await expect(page.getByRole('searchbox')).toBeVisible();
    await expect(page.getByRole('searchbox')).toBeFocused();
  });
});
