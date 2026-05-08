import { test, expect } from '@playwright/test';

test.describe('Suite 6 - Botones de Llamada a la Acción (CTA)', () => {
  test("TC-024: Click en 'Get started' navega a /docs/intro", async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Playwright/);

    const getStartedLink = page.getByRole('link', { name: 'Get started' }).first();
    await expect(getStartedLink).toBeVisible();
    await expect(getStartedLink).toBeEnabled();

    await getStartedLink.click();

    await expect(page).toHaveURL(/\/docs\/intro/);
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
});
