import { test, expect } from '@playwright/test';

test.describe('Suite 5 - Toggle de Tema Claro/Oscuro', () => {
  test('TC-023: El modo oscuro se aplica consistentemente en las secciones de código', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.getByRole('button', { name: /switch between dark and light mode/i });
    await expect(themeToggle).toBeVisible();
    await themeToggle.click();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const homeCodeBlock = page.locator('pre').first();
    await expect(homeCodeBlock).toBeVisible();

    await page.goto('/docs/intro');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const docsCodeBlock = page.locator('pre').first();
    await expect(docsCodeBlock).toBeVisible();
  });
});
