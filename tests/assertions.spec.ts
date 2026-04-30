import { test, expect } from '@playwright/test';

test('should validate playwright homepage content', async({page})=>{
    await page.goto('https://playwright.dev');

    await expect.soft(page).toHaveURL('https://playwright.dev');

    await expect.soft(page.getByRole('link', {name: 'Get started'})).toBeVisible();

    await expect.soft(page.getByRole('link',{name: 'Docs'})).toBeVisible();

    await expect(page).toHaveTitle(/Playwright/);

})