import { test, expect } from '@playwright/test';

test.describe('Suite 10 - Documentación (Flujos internos)', () => {
  test('TC-039: Selector de lenguaje en la documentación cambia los ejemplos de código', async ({ page }) => {
    await page.goto('/docs/intro');
    await expect(page).toHaveURL(/\/docs\/intro/);

    await page.getByRole('tab', { name: 'Python' }).click();

    const codeBlock = page.locator('.prism-code, pre code, [class*="codeBlock"]').first();
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toContainText(/async_playwright|playwright/);

    await page.getByRole('tab', { name: 'Java' }).click();

    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toContainText('com.microsoft.playwright');
  });
});
