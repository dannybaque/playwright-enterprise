import { test, expect } from '@playwright/test';

test.describe('Suite 5 - Toggle de Tema Claro/Oscuro', () => {
  test('TC-019: Toggle de tema es visible en el navbar', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.getByRole('button', { name: /switch between dark and light mode/i });
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toHaveAttribute('aria-label', /.+/);
  });
});
