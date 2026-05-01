import { test, expect } from './fixtures/index';


test('test fixture', async({homePage})=>{
    await expect(homePage.heading).toBeVisible();
    await expect(homePage.docs).toBeVisible();

})