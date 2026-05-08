import { test, expect } from '@playwright/test';

test.describe('Suite 7 - Secciones de Features en la Página Principal', () => {
  test('TC-029: Los bloques de código tienen syntax highlighting', async ({ page }) => {
    await page.goto('/');

    const codeBlock = page.locator('pre').first();
    await expect(codeBlock).toBeVisible();

    const highlightedTokens = page.locator('pre span[class*="token"]');
    await expect(highlightedTokens.first()).toBeVisible();
    const tokenCount = await highlightedTokens.count();
    expect(tokenCount).toBeGreaterThan(1);

    const codeBlockBg = await codeBlock.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor
    );
    const bodyBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    expect(codeBlockBg).not.toBe(bodyBg);

    await page.getByRole('tab', { name: 'Python' }).click();

    await expect(codeBlock).toBeVisible();
    const pythonTokens = page.locator('pre span[class*="token"]');
    expect(await pythonTokens.count()).toBeGreaterThan(1);
  });
});
