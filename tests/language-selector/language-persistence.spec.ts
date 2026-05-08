import { test, expect } from '@playwright/test';

test.describe('Suite 4 - Selector de Lenguaje de Programación', () => {
  test('TC-018: La selección de lenguaje persiste al navegar a Docs y regresar', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('tab', { name: 'Python' }).first().click();
    await expect(page.getByRole('tab', { name: 'Python' }).first()).toHaveAttribute(
      'aria-selected',
      'true'
    );

    await page.getByRole('link', { name: 'Docs' }).click();
    await expect(page).toHaveURL(/\/docs\/intro/);
    await expect(page.getByRole('tab', { name: 'Python' }).first()).toHaveAttribute(
      'aria-selected',
      'true'
    );

    await page.goBack();
    await expect(page).toHaveURL('https://playwright.dev/');
    await expect(page.getByRole('tab', { name: 'Python' }).first()).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });
});
