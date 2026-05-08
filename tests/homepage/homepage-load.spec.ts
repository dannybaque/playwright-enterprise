import { test, expect } from '@playwright/test';

test.describe('Suite 1 - Carga y Renderizado de la Página Principal', () => {
  test('TC-001: Carga correcta de la página principal', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
    await expect(page.getByRole('link', { name: /playwright logo/i })).toBeVisible();

    await expect(
      page.getByRole('heading', {
        name: 'Playwright enables reliable end-to-end testing for modern web apps.',
      })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();

    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Community' })).toBeVisible();
    await expect(page.getByRole('link', { name: /GitHub/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /search/i })).toBeVisible();

    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight * 0.5, behavior: 'smooth' })
    );
    await page.waitForTimeout(500);

    await expect(page.getByText(/chromium|firefox|webkit/i).first()).toBeVisible();
    await expect(page.getByText(/TypeScript|JavaScript|Python|Java|\.NET/i).first()).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.body.scrollWidth > window.innerWidth
    );
    expect(hasHorizontalOverflow).toBe(false);

    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    );
    await page.waitForTimeout(500);

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByText(/Microsoft|Copyright|©/i).first()).toBeVisible();
  });
});
