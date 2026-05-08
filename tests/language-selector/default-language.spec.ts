import { test, expect } from '@playwright/test';

test.describe('Suite 4 - Selector de Lenguaje de Programación', () => {
  test('TC-014: El selector de lenguaje es visible con TypeScript por defecto', async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    await page.goto('/');

    const typescriptTab = page.getByRole('tab', { name: 'TypeScript' });
    await expect(typescriptTab).toBeVisible();
    await expect(typescriptTab).toHaveAttribute('aria-selected', 'true');

    await expect(page.getByRole('tab', { name: 'JavaScript' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Python' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Java' })).toBeVisible();
    await expect(page.getByRole('tab', { name: '.NET' })).toBeVisible();
  });
});
