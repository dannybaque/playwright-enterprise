import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage{

    readonly heading: Locator;
    readonly docs: Locator;


    constructor(page: Page){
        super(page);
        this.heading = page.getByRole('heading',{name:'Playwright enables reliable web automation for testing, scripting, and AI agents.'})
        this.docs = page.getByRole('link',{name: 'Docs'})

    }
    async goTo(){
        await this.page.goto('https://playwright.dev');
    }

}