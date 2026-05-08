import { test, expect } from '@playwright/test';

test.describe('Suite 9 - Accesibilidad', () => {
  test('TC-033: Navegación completa solo con teclado', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Community' })).toBeVisible();
    await expect(page.getByRole('link', { name: /GitHub/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /search/i })).toBeVisible();

    const getStartedLink = page.getByRole('link', { name: 'Get started' }).first();
    await getStartedLink.focus();
    await expect(getStartedLink).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/docs\/intro/);

    await page.keyboard.press('Shift+Tab');
    await expect(page.locator(':focus')).toBeVisible();
  });
});
