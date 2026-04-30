import test, { Page, Locator, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('should validate heading', async({page})=>{
    const homepage = new HomePage(page);
    await homepage.goTo();
    await expect(homepage.heading).toBeVisible();
    await expect(homepage.docs).toBeVisible();
})