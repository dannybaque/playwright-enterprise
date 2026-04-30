import { test, expect } from '@playwright/test';

test('should navigate to Docs section when clicking Docs link',async({page})=>{
  await page.goto('https://playwright.dev');

  await page.getByRole('link',{name: 'Testing documentation'}).click();

  await expect(page).toHaveURL(/\/docs\/intro/);
});