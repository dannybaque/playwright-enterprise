import { test, expect } from '@playwright/test';

test.describe('Suite 5 - Toggle de Tema Claro/Oscuro', () => {
  test('TC-020: Cambiar al modo oscuro', async ({ page }) => {
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

    const bodyBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    expect(bodyBg).toBeTruthy();
  });
});
