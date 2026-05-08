import { test, expect } from '@playwright/test';

test.describe('Suite 7 - Secciones de Features en la Página Principal', () => {
  test('TC-027: Sección de Auto-wait es visible', async ({ page }) => {
    await page.goto('/');

    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' })
    );
    await page.waitForTimeout(500);

    const autoWaitHeading = page.getByRole('heading', { name: /auto.?wait/i });
    const actionabilityText = page.getByText(/actionabilit/i).first();

    const hasAutoWait = (await autoWaitHeading.count()) > 0;
    const section = hasAutoWait ? autoWaitHeading : actionabilityText;

    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section).not.toBeHidden();
  });
});
