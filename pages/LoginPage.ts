import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly username: Locator;
    readonly password: Locator;
    readonly submit: Locator;
  
  constructor(page: Page) {
    super(page);
    this.username = page.getByRole('textbox',{name: 'username'})
    this.password = page.getByRole('textbox',{name: 'password'})
    this.submit = page.getByRole('button',{name: 'Login'})
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }
}