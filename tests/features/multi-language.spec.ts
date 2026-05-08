import { test, expect } from '@playwright/test';

test.describe('Suite 7 - Secciones de Features en la Página Principal', () => {
  test('TC-026: Sección de soporte multi-lenguaje es visible', async ({ page }) => {
    await page.goto('/');

    const languageTabList = page.getByRole('tablist').first();
    await languageTabList.scrollIntoViewIfNeeded();

    await expect(page.getByRole('tab', { name: 'TypeScript' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'JavaScript' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Python' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Java' })).toBeVisible();
    await expect(page.getByRole('tab', { name: '.NET' })).toBeVisible();
  });
});
