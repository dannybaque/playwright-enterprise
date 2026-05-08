import { test, expect } from '@playwright/test';

test.describe('Suite 4 - Selector de Lenguaje de Programación', () => {
  test('TC-015: Cambiar lenguaje a Python actualiza los ejemplos de código', async ({ page }) => {
    await page.goto('/');

    const typescriptTab = page.getByRole('tab', { name: 'TypeScript' });
    await expect(typescriptTab).toBeVisible();
    await expect(typescriptTab).toHaveAttribute('aria-selected', 'true');

    const pythonTab = page.getByRole('tab', { name: 'Python' });
    await pythonTab.click();

    await expect(pythonTab).toHaveAttribute('aria-selected', 'true');
    await expect(typescriptTab).toHaveAttribute('aria-selected', 'false');

    const codeBlock = page.locator('.tabs-container .prism-code, pre code').first();
    await expect(codeBlock).toContainText(/async_playwright|playwright/i);
  });
});
