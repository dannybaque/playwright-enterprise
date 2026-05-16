import { test as base, expect, Page } from '@playwright/test';
import { HomePage } from './../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

type MyFixtures = {
    homePage: HomePage;
    authenticatedPage: Page;

};

export const test = base.extend<MyFixtures>({
    homePage : async({page}, use)=>{
        const homePage = new HomePage(page);
        await homePage.goTo();
        await use(homePage);
    },
authenticatedPage: async ({ browser }, use) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Login directo en el fixture
  const loginPage = new LoginPage(page);
  await page.goto('https://the-internet.herokuapp.com/login');
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
  await page.waitForURL('**/secure');
  
  await use(page);
  await context.close();
},
});

export {expect} from '@playwright/test';