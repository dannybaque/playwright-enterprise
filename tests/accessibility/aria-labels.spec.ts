import { test, expect } from '@playwright/test';

test.describe('Suite 9 - Accesibilidad', () => {
  test('TC-034: Atributos aria-label en elementos de iconos', async ({ page }) => {
    await page.goto('/');

    const githubLink = page.locator('a[href*="github.com/microsoft/playwright"]').first();
    const githubLabel = await githubLink.getAttribute('aria-label');
    expect(githubLabel || await githubLink.textContent()).toBeTruthy();

    const themeToggle = page.getByRole('button', { name: /switch between dark and light mode/i });
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toHaveAttribute('aria-label', /.+/);

    const searchButton = page.getByRole('button', { name: /search/i });
    await expect(searchButton).toBeVisible();
    await expect(searchButton).toHaveAttribute('aria-label', /.+/);

    const logo = page.getByRole('link', { name: /playwright/i }).first();
    await expect(logo).toBeVisible();
  });
});
