import { test, expect } from '@playwright/test';

test.describe('Suite 4 - Selector de Lenguaje de Programación', () => {
  test('TC-017: Cambiar lenguaje a .NET actualiza los ejemplos de código', async ({ page }) => {
    await page.goto('/');

    const dotnetTab = page.getByRole('tab', { name: '.NET' });
    await dotnetTab.click();

    await expect(dotnetTab).toHaveAttribute('aria-selected', 'true');

    const codeBlock = page.locator('pre code').first();
    await expect(codeBlock).toContainText(/using Microsoft\.Playwright|Microsoft\.Playwright/);
  });
});
