import { test, expect } from '@playwright/test';

test.describe('Suite 12 - Performance y Métricas', () => {
  test('TC-042: Página principal carga en menos de 5 segundos', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/', { waitUntil: 'load' });
    const loadTime = Date.now() - startTime;

    expect(
      loadTime,
      `Page load took ${loadTime}ms, expected less than 5000ms`
    ).toBeLessThan(5000);

    const headingStartTime = Date.now();
    await expect(
      page.getByRole('heading', { name: /Playwright enables reliable/i })
    ).toBeVisible({ timeout: 3000 });
    const headingTime = Date.now() - headingStartTime;

    expect(
      headingTime,
      `Heading visible in ${headingTime}ms, expected less than 3000ms`
    ).toBeLessThan(3000);
  });
});
