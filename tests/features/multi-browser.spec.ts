import { test, expect } from '@playwright/test';

test.describe('Suite 7 - Secciones de Features en la Página Principal', () => {
  test('TC-025: Sección de soporte multi-navegador es visible', async ({ page }) => {
    await page.goto('/');

    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' })
    );
    await page.waitForTimeout(500);

    await expect(page.getByText(/Chromium/i).first()).toBeVisible();
    await expect(page.getByText(/Firefox/i).first()).toBeVisible();
    await expect(page.getByText(/WebKit/i).first()).toBeVisible();
  });
});
