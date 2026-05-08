import { test, expect } from '@playwright/test';

test.describe('Suite 5 - Toggle de Tema Claro/Oscuro', () => {
  test('TC-021: Cambiar de modo oscuro de vuelta a claro', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.getByRole('button', { name: /switch between dark and light mode/i });
    const htmlElement = page.locator('html');

    const initialTheme = await htmlElement.getAttribute('data-theme');
    if (initialTheme !== 'dark') {
      await themeToggle.click();
      await expect(htmlElement).toHaveAttribute('data-theme', 'dark');
    }

    await themeToggle.click();

    await expect(htmlElement).not.toHaveAttribute('data-theme', 'dark');
  });
});
