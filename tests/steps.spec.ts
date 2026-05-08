import { test,expect } from '@playwright/test';

test('should complete full flow', async ({ page }) => {
  await test.step('Navigate to home', async () => {
    await page.goto('/');
  });

  await test.step('Click Docs link', async () => {
    await page.getByRole('link', { name: 'Get started' }).click();
  });

  await test.step('Verify docs page', async () => {
    await expect(page).toHaveURL(/\/docs\/intro/);
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
});