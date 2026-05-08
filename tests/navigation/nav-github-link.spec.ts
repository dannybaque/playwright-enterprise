import { test, expect } from '@playwright/test';

test.describe('Suite 2 - Navegación Principal (Navbar)', () => {
  test('TC-007: El enlace de GitHub abre el repositorio correcto', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/playwright\.dev/);

    const githubLink = page.locator('a[href="https://github.com/microsoft/playwright"]').first();

    await expect(githubLink).toHaveAttribute('href', 'https://github.com/microsoft/playwright');
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', /noopener/);
  });
});
