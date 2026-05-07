import { test,expect } from './fixtures/index';

test.describe.serial('nombre del grupo',()=>{
    test('Paso 1',async({homePage}) =>{
        await expect(homePage.heading).toBeVisible();
    });
    test('Paso 2',async({homePage,page}) =>{
        await expect(page).toHaveURL(/playwright.dev/);
    })
})