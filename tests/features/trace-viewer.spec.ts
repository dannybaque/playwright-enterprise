import { test, expect } from '@playwright/test';

test.describe('Suite 7 - Secciones de Features en la Página Principal', () => {
  test('TC-028: Sección de Trace Viewer / herramientas de debugging es visible', async ({ page }) => {
    await page.goto('/');

    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    );
    await page.waitForTimeout(500);

    await expect(page.getByText('Trace Viewer', { exact: false })).toBeVisible();
    await expect(page.getByText(/videos?|record/i).first()).toBeVisible();
    await expect(page.getByText(/screenshots?/i).first()).toBeVisible();
    await expect(page.getByText(/inspector/i).first()).toBeVisible();
  });
});
