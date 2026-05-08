import { test, expect } from '@playwright/test';

test.describe('Suite 5 - Toggle de Tema Claro/Oscuro', () => {
  test('TC-022: La preferencia de tema persiste al recargar la página', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.getByRole('button', { name: /switch between dark and light mode/i });
    await expect(themeToggle).toBeVisible();

    const htmlElement = page.locator('html');
    const initialTheme = await htmlElement.getAttribute('data-theme');
    if (initialTheme === 'dark') {
      await themeToggle.click();
      await expect(htmlElement).not.toHaveAttribute('data-theme', 'dark');
    }

    await themeToggle.click();
    await expect(htmlElement).toHaveAttribute('data-theme', 'dark');

    await page.reload();

    await expect(themeToggle).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});
