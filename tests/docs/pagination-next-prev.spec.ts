import { test, expect } from '@playwright/test';

test.describe('Suite 10 - Documentación (Flujos internos)', () => {
  test('TC-037: Paginación Next/Previous al final de las páginas de docs', async ({ page }) => {
    await page.goto('/docs/intro');

    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight }));
    await page.waitForTimeout(300);

    const nextButton = page.getByRole('link', { name: /next/i }).last();
    await expect(nextButton).toBeVisible();

    await nextButton.click();

    const currentUrl = page.url();
    expect(currentUrl).not.toContain('/docs/intro');

    const prevButton = page.getByRole('link', { name: /previous/i }).first();
    await expect(prevButton).toBeVisible();

    await prevButton.click();
    await expect(page).toHaveURL(/\/docs\/intro/);
  });
});
