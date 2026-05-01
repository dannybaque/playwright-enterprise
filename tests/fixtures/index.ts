import { test as base, expect } from '@playwright/test';
import { HomePage } from './../../pages/HomePage';

type MyFixtures = {
    homePage: HomePage;

};

export const test = base.extend<MyFixtures>({
    homePage : async({page}, use)=>{
        const homePage = new HomePage(page);
        await homePage.goTo();
        await use(homePage);
    },
});

export {expect} from '@playwright/test';